// ── Setup Diagram ───────────────────────────────────────────────────────────
//
// Interactive diagrams for strategy pages. Ships with five templates:
//   "orb"           Opening Range Breakout
//   "vwapPullback"  VWAP Pullback
//   "gapFill"       Gap Fill
//   "srBounce"      Support/Resistance Bounce
//   "trendFollow"   Trend Following (EMA pullback, intraday)
//
// All templates are intraday-focused and prop-firm compatible — no swing
// holds, no overnight risk.
//
// ── Usage ──────────────────────────────────────────────────────────────────
//
// 1. Add a `diagram` field to a strategy in lib/strategyGuides.js.
//    Each template's expected data shape is documented above its function.
//
// 2. In StrategyGuideClient.js, diagrams render via:
//      {strategy.diagram && <SetupDiagram diagram={strategy.diagram} color={strategy.color} />}
//
// Strategies without a `diagram` field render nothing.

"use client";
import { useState } from "react";
import { C, F } from "@/lib/constants";

// ── Shared shell ────────────────────────────────────────────────────────────

function DiagramShell({ title, color, steps, children }) {
  const [step, setStep] = useState(1);
  const activeColor = color || C.teal;
  const activeCaption = steps[step - 1];

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px 16px", marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, margin: "0 0 4px" }}>SETUP DIAGRAM</p>
          <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, fontWeight: 500, margin: 0 }}>{title}</p>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {steps.map((s, i) => {
            const n = i + 1;
            const active = step === n;
            return (
              <button key={n} onClick={() => setStep(n)}
                style={{
                  padding: "5px 10px",
                  background: active ? `${activeColor}2E` : "transparent",
                  border: `1px solid ${active ? `${activeColor}80` : C.border}`,
                  borderRadius: 3,
                  color: active ? activeColor : C.textMuted,
                  fontFamily: F.mono, fontSize: 10, cursor: "pointer",
                  transition: "all 0.15s",
                }}>
                {n} {s.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        {typeof children === "function" ? children(step) : children}
      </div>

      <div style={{ padding: "10px 14px", background: `${activeColor}0D`, borderLeft: `2px solid ${activeColor}`, borderRadius: "0 4px 4px 0", fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>
        <span style={{ color: activeColor, fontFamily: F.mono, marginRight: 8 }}>{step}.</span>
        {activeCaption.text}
      </div>
    </div>
  );
}

// ── Shared chart primitives ─────────────────────────────────────────────────

const VB_W = 600;
const VB_H = 320;
const CHART_TOP = 30;
const CHART_BOTTOM = 290;
const CHART_LEFT = 50;
const CHART_RIGHT = 590;

function makePriceToY(pMin, pMax) {
  return (p) => CHART_TOP + ((pMax - p) / (pMax - pMin)) * (CHART_BOTTOM - CHART_TOP);
}

function makeYTicks(pMin, pMax, step) {
  const ticks = [];
  for (let p = pMax; p >= pMin; p -= step) ticks.push(p);
  return ticks;
}

function GridAndAxis({ priceToY, yTicks }) {
  return (
    <g>
      {yTicks.map((p, i) => (
        <g key={p}>
          <line
            x1={CHART_LEFT} y1={priceToY(p)} x2={CHART_RIGHT} y2={priceToY(p)}
            stroke={i === yTicks.length - 1 ? "rgba(93,202,165,0.1)" : "rgba(93,202,165,0.05)"}
            strokeWidth="1" />
          <text
            x={CHART_LEFT - 6} y={priceToY(p) + 4} textAnchor="end"
            fill={C.textMuted} fontFamily={F.mono} fontSize="9">
            {p.toLocaleString()}
          </text>
        </g>
      ))}
    </g>
  );
}

function Candle({ x, open, close, high, low, priceToY, color, highlight, width }) {
  const yOpen = priceToY(open);
  const yClose = priceToY(close);
  const yHigh = priceToY(high);
  const yLow = priceToY(low);
  const bodyTop = Math.min(yOpen, yClose);
  const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
  const w = width || 8;
  return (
    <g>
      <line x1={x} y1={yLow} x2={x} y2={yHigh}
        stroke={highlight ? C.textPrimary : C.textMuted} strokeWidth="1" />
      <rect x={x - w / 2} y={bodyTop} width={w} height={bodyH}
        fill={color}
        stroke={highlight ? C.textPrimary : "none"}
        strokeWidth={highlight ? 1.5 : 0} />
    </g>
  );
}

function LevelMarker({ x, y, color, label, labelOffset, xEnd }) {
  const labelY = labelOffset === "above" ? y - 5 : y + 13;
  return (
    <g>
      <circle cx={x} cy={y} r="4" fill={color} stroke={C.bgCard} strokeWidth="1.5" />
      <line x1={x + 4} y1={y} x2={xEnd || CHART_RIGHT} y2={y}
        stroke={color} strokeWidth="0.8" strokeDasharray="2,3" />
      <text x={(xEnd || CHART_RIGHT) - 5} y={labelY} textAnchor="end"
        fill={color} fontFamily={F.mono} fontSize="10">
        {label}
      </text>
    </g>
  );
}

// ── Template 1: ORB ─────────────────────────────────────────────────────────
//
// Data shape:
//   { type: "orb", title, priceRange: [min, max], orHigh, orLow, entry, stop, target }

function OrbDiagram({ diagram, color }) {
  const { title, priceRange, orHigh, orLow, entry, stop, target } = diagram;
  const accent = color || C.teal;

  const orWidth = orHigh - orLow;
  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    { label: "range", text: `Mark the high and low of the first 15 minutes after the open. The opening range is ${orLow.toLocaleString()} to ${orHigh.toLocaleString()} — a ${orWidth}-point range. Narrow ranges relative to the 20-day average produce the highest-probability breakouts.` },
    { label: "break",  text: `Wait for a 5-minute candle to close above the OR high (for longs) or below the OR low (for shorts). A wick poking above isn't enough — you need a clean close beyond the level, ideally on above-average volume.` },
    { label: "entry",  text: `Enter at the breakout candle close (${entry.toLocaleString()}). Stop goes on the opposite side of the opening range (${stop.toLocaleString()}). Target is 1x the OR width projected from the breakout (${target.toLocaleString()}). Risk: ${riskPts}pts. Reward: ${rewardPts}pts.` },
    { label: "full",   text: `The full setup. Narrow opening range, clean breakout on a 5-min close above ${orHigh.toLocaleString()}, entry at ${entry.toLocaleString()}, stop at ${stop.toLocaleString()}, target at ${target.toLocaleString()}. On trend days price continues past target as the session develops.` },
  ];

  const [pMin, pMax] = priceRange;
  const priceToY = makePriceToY(pMin, pMax);
  const yTicks = makeYTicks(pMin, pMax, 10);

  const yHigh = priceToY(orHigh);
  const yLow = priceToY(orLow);
  const breakX = 320;

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img" aria-label={`Opening range breakout diagram. Step ${step} of 4.`}>

          <GridAndAxis priceToY={priceToY} yTicks={yTicks} />

          <g>
            <Candle x={80}  open={orLow + 7}  close={orLow + 3}  high={orHigh - 2} low={orLow - 1}   color={C.coral} priceToY={priceToY} />
            <Candle x={110} open={orLow + 4}  close={orHigh - 3} high={orHigh - 1} low={orLow + 2}   color={C.green} priceToY={priceToY} />
            <Candle x={140} open={orHigh - 4} close={orHigh - 1} high={orHigh}     low={orHigh - 5}  color={C.green} priceToY={priceToY} />
            <Candle x={170} open={orHigh - 1} close={orHigh - 3} high={orHigh - 1} low={orHigh - 4}  color={C.coral} priceToY={priceToY} />
            <Candle x={200} open={orHigh - 3} close={orHigh - 1} high={orHigh}     low={orHigh - 5}  color={C.green} priceToY={priceToY} />
            <Candle x={230} open={orHigh - 1} close={orHigh - 0.5} high={orHigh}   low={orLow + 5}   color={C.green} priceToY={priceToY} />
          </g>

          {step >= 1 && (
            <g>
              <rect x={60} y={yHigh} width={190} height={yLow - yHigh}
                fill={`${accent}14`} stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
              <line x1={60} y1={yHigh} x2={CHART_RIGHT} y2={yHigh}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" />
              <line x1={60} y1={yLow} x2={CHART_RIGHT} y2={yLow}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" />
              <text x={260} y={yHigh + 5} fill={accent} fontFamily={F.mono} fontSize="10">
                OR high · {orHigh.toLocaleString()}
              </text>
              <text x={260} y={yLow + 10} fill={accent} fontFamily={F.mono} fontSize="10">
                OR low · {orLow.toLocaleString()}
              </text>
              <text x={66} y={yHigh - 5} fill={accent} fontFamily={F.mono} fontSize="9" opacity="0.7">
                opening range · first 15min
              </text>
            </g>
          )}

          {step >= 2 && (
            <g>
              <Candle x={260} open={orHigh - 1} close={orHigh + 1} high={orHigh + 3} low={orHigh - 2} color={C.green} priceToY={priceToY} />
              <Candle x={290} open={orHigh + 1} close={orHigh + 3} high={orHigh + 5} low={orHigh}     color={C.green} priceToY={priceToY} />
            </g>
          )}

          {step >= 2 && (
            <g>
              <Candle x={breakX} open={orHigh + 1} close={orHigh + 4} high={orHigh + 5} low={orHigh - 1}
                color={C.green} priceToY={priceToY} highlight width={12} />
              <text x={breakX} y={priceToY(orHigh + 5) - 6} textAnchor="middle"
                fill={C.textPrimary} fontFamily={F.mono} fontSize="10">breakout candle</text>
              <text x={breakX} y={priceToY(orHigh + 5) - 18} textAnchor="middle"
                fill={C.textMuted} fontFamily={F.mono} fontSize="8">5-min close above OR high</text>
            </g>
          )}

          {step >= 3 && <LevelMarker x={breakX + 18} y={priceToY(entry)}  color={accent}  label={`entry · ${entry.toLocaleString()}`} labelOffset="above" />}
          {step >= 3 && <LevelMarker x={breakX + 18} y={priceToY(stop)}   color={C.coral} label={`stop · ${stop.toLocaleString()} · -${riskPts}pts`} labelOffset="below" />}
          {step >= 3 && <LevelMarker x={breakX + 18} y={priceToY(target)} color={C.amber} label={`target · ${target.toLocaleString()} · +${rewardPts}pts`} labelOffset="above" />}

          {step >= 4 && (
            <g>
              <Candle x={360} open={orHigh + 4}  close={orHigh + 7}  high={orHigh + 8}  low={orHigh + 3}  color={C.green} priceToY={priceToY} />
              <Candle x={390} open={orHigh + 7}  close={orHigh + 9}  high={orHigh + 11} low={orHigh + 6}  color={C.green} priceToY={priceToY} />
              <Candle x={420} open={orHigh + 9}  close={orHigh + 11} high={orHigh + 12} low={orHigh + 8}  color={C.green} priceToY={priceToY} />
              <Candle x={450} open={orHigh + 11} close={orHigh + 13} high={orHigh + 14} low={orHigh + 10} color={C.green} priceToY={priceToY} />
              <Candle x={480} open={orHigh + 13} close={target - 0.5} high={target}    low={orHigh + 12} color={C.green} priceToY={priceToY} />
            </g>
          )}

          <text x={CHART_LEFT + 10} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">8:30 open</text>
          <text x={260} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">8:45 · OR set</text>
          {step >= 4 && (
            <text x={CHART_RIGHT - 115} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">target hit</text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template 2: VWAP Pullback ───────────────────────────────────────────────
//
// Data shape:
//   { type: "vwapPullback", title, priceRange: [min, max], vwapStart, vwapEnd, entry, stop, target }

function VwapPullbackDiagram({ diagram, color }) {
  const { title, priceRange, vwapStart, vwapEnd, entry, stop, target } = diagram;
  const accent = color || C.purple;

  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    { label: "trend",    text: `Identify a trend day early. Price is above a sloping VWAP and has stayed above it for the first 30-60 minutes. Strong open drive, narrow opening range, institutional flow in one direction. This is the prerequisite — don't take VWAP pullbacks on choppy days.` },
    { label: "pullback", text: `Wait for price to pull back toward VWAP. The pullback should be shallow (3-5 points on ES) and ideally on declining volume. Price touches or gets within 1-2 points of VWAP. Don't chase the initial trend move — let price come to you.` },
    { label: "entry",    text: `Enter on the rejection. A 5-minute candle dips toward VWAP, wicks below, then closes above. Enter at ${entry.toLocaleString()}. Stop ${riskPts} points below VWAP at ${stop.toLocaleString()}. Target the prior swing high at ${target.toLocaleString()}. Risk-reward: 1:${(rewardPts / riskPts).toFixed(1)}.` },
    { label: "full",     text: `The full setup. VWAP slopes upward, price respects it as dynamic support, pullback produces a clean rejection candle, trade works back to prior highs as the trend resumes. Multiple pullbacks per day on a strong trend — each one is a fresh entry opportunity.` },
  ];

  const [pMin, pMax] = priceRange;
  const priceToY = makePriceToY(pMin, pMax);
  const yTicks = makeYTicks(pMin, pMax, 5);

  const vwapX1 = CHART_LEFT + 20;
  const vwapX2 = CHART_RIGHT - 10;
  const vwapY1 = priceToY(vwapStart);
  const vwapY2 = priceToY(vwapEnd);

  const vwapAt = (x) => {
    const t = (x - vwapX1) / (vwapX2 - vwapX1);
    return vwapStart + t * (vwapEnd - vwapStart);
  };

  const entryX = 310;

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img" aria-label={`VWAP pullback diagram. Step ${step} of 4.`}>

          <GridAndAxis priceToY={priceToY} yTicks={yTicks} />

          {step >= 1 && (
            <g>
              <line x1={vwapX1} y1={vwapY1} x2={vwapX2} y2={vwapY2}
                stroke={accent} strokeWidth="1.8" />
              <text x={vwapX1 + 4} y={vwapY1 - 6} fill={accent} fontFamily={F.mono} fontSize="10" opacity="0.9">
                VWAP (rising)
              </text>
              <text x={vwapX2} y={vwapY2 + 14} textAnchor="end" fill={accent} fontFamily={F.mono} fontSize="9" opacity="0.7">
                institutional benchmark
              </text>
            </g>
          )}

          <g>
            {[
              { x: 90,  offset: 4,  color: C.green, size: 3 },
              { x: 120, offset: 6,  color: C.green, size: 3 },
              { x: 150, offset: 8,  color: C.green, size: 2 },
              { x: 180, offset: 9,  color: C.coral, size: 1.5 },
              { x: 210, offset: 10, color: C.green, size: 2 },
              { x: 240, offset: 11, color: C.green, size: 2.5 },
              { x: 270, offset: 9,  color: C.coral, size: 2 },
            ].map((c, i) => {
              const vwap = vwapAt(c.x);
              const open  = vwap + c.offset - c.size / 2;
              const close = c.color === C.green ? vwap + c.offset + c.size / 2 : vwap + c.offset - c.size / 2 - 0.5;
              const high  = Math.max(open, close) + 1;
              const low   = Math.min(open, close) - 1;
              return (
                <Candle key={i} x={c.x} open={open} close={close} high={high} low={low}
                  color={c.color} priceToY={priceToY} />
              );
            })}
          </g>

          {step >= 2 && (
            <g>
              {[
                { x: 280, offset: 6, size: 3 },
                { x: 295, offset: 3, size: 2 },
                { x: 310, offset: 0.5, size: 1.5 },
              ].map((c, i) => {
                const vwap = vwapAt(c.x);
                const open  = vwap + c.offset + c.size / 2;
                const close = vwap + c.offset - c.size / 2;
                const high  = open + 0.5;
                const low   = vwap - 1.5;
                return (
                  <Candle key={i} x={c.x} open={open} close={close} high={high} low={low}
                    color={C.coral} priceToY={priceToY} />
                );
              })}
              <text x={300} y={priceToY(vwapAt(300)) + 26} textAnchor="middle"
                fill={C.textMuted} fontFamily={F.mono} fontSize="9">pullback to VWAP</text>
            </g>
          )}

          {step >= 2 && (() => {
            const vwap = vwapAt(entryX);
            const open  = vwap + 0.5;
            const close = vwap + 3;
            const high  = vwap + 3.5;
            const low   = vwap - 2;
            return (
              <g>
                <Candle x={entryX} open={open} close={close} high={high} low={low}
                  color={C.green} priceToY={priceToY}
                  highlight={step >= 3} width={step >= 3 ? 12 : 8} />
                {step >= 3 && (
                  <>
                    <text x={entryX} y={priceToY(high) - 6} textAnchor="middle"
                      fill={C.textPrimary} fontFamily={F.mono} fontSize="10">rejection candle</text>
                    <text x={entryX} y={priceToY(high) - 18} textAnchor="middle"
                      fill={C.textMuted} fontFamily={F.mono} fontSize="8">wicks below VWAP, closes above</text>
                  </>
                )}
              </g>
            );
          })()}

          {step >= 3 && <LevelMarker x={entryX + 18} y={priceToY(entry)}  color={accent}  label={`entry · ${entry.toLocaleString()}`} labelOffset="above" />}
          {step >= 3 && <LevelMarker x={entryX + 18} y={priceToY(stop)}   color={C.coral} label={`stop · ${stop.toLocaleString()} · -${riskPts}pts`} labelOffset="below" />}
          {step >= 3 && <LevelMarker x={entryX + 18} y={priceToY(target)} color={C.amber} label={`target · ${target.toLocaleString()} · +${rewardPts}pts`} labelOffset="above" />}

          {step >= 4 && (
            <g>
              {[
                { x: 345, offset: 5,  size: 3 },
                { x: 375, offset: 8,  size: 3 },
                { x: 405, offset: 10, size: 2.5 },
                { x: 435, offset: 12, size: 3 },
                { x: 465, offset: 14, size: 3 },
                { x: 495, offset: 16, size: 2 },
              ].map((c, i) => {
                const vwap = vwapAt(c.x);
                const open  = vwap + c.offset - c.size / 2;
                const close = vwap + c.offset + c.size / 2;
                const high  = close + 1;
                const low   = open - 0.5;
                return (
                  <Candle key={i} x={c.x} open={open} close={close} high={high} low={low}
                    color={C.green} priceToY={priceToY} />
                );
              })}
            </g>
          )}

          <text x={CHART_LEFT + 10} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">9:30 open</text>
          <text x={entryX} y={CHART_BOTTOM + 20} textAnchor="middle" fill={C.textMuted} fontFamily={F.mono} fontSize="9">10:15 · entry</text>
          {step >= 4 && (
            <text x={CHART_RIGHT - 60} y={CHART_BOTTOM + 20} textAnchor="end" fill={C.textMuted} fontFamily={F.mono} fontSize="9">11:45 · target</text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template 3: Gap Fill ────────────────────────────────────────────────────
//
// Data shape:
//   { type: "gapFill", title, priceRange: [min, max], priorClose, openPrice, entry, stop, target }
//
// Canonical gap-up fade short. For gap-down + long, same pedagogy mirrored.

function GapFillDiagram({ diagram, color }) {
  const { title, priceRange, priorClose, openPrice, entry, stop, target } = diagram;
  const accent = color || C.amber;

  const gapSize = Math.abs(openPrice - priorClose);
  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    { label: "gap",   text: `Yesterday's close was ${priorClose.toLocaleString()}. Today opens at ${openPrice.toLocaleString()} — a ${gapSize}-point gap up. Small gap, no major catalyst, light overnight volume. These are the gaps most likely to fill within the session.` },
    { label: "fail",  text: `Wait for confirmation the gap won't run. Price tests above the opening range but fails to hold. A 5-minute candle closes back inside the range. Volume on the attempted breakout is below average. This is the fade signal.` },
    { label: "entry", text: `Short at ${entry.toLocaleString()} (just below the failed breakout). Stop at ${stop.toLocaleString()} (above the session high, ${riskPts}pts). Target is ${target.toLocaleString()} — yesterday's close, where the gap completes. Risk-reward: 1:${(rewardPts / riskPts).toFixed(1)}.` },
    { label: "fill",  text: `The gap fills. Price drifts lower through the session, reaches yesterday's close, target hit. Consider partial profit at the halfway point — gap fills sometimes stall at 50% before completing, giving you a chance to lock in gains.` },
  ];

  const [pMin, pMax] = priceRange;
  const priceToY = makePriceToY(pMin, pMax);
  const yTicks = makeYTicks(pMin, pMax, 5);

  const priorCloseY = priceToY(priorClose);
  const openY = priceToY(openPrice);

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img" aria-label={`Gap fill diagram. Step ${step} of 4.`}>

          <GridAndAxis priceToY={priceToY} yTicks={yTicks} />

          <g>
            <Candle x={70}  open={priorClose + 2} close={priorClose + 0.5} high={priorClose + 3} low={priorClose} color={C.coral} priceToY={priceToY} />
            <Candle x={95}  open={priorClose + 0.5} close={priorClose}     high={priorClose + 1} low={priorClose - 0.5} color={C.coral} priceToY={priceToY} />
            <text x={70} y={priorCloseY - 26} fill={C.textMuted} fontFamily={F.mono} fontSize="9">yesterday</text>
          </g>

          {step >= 1 && (
            <g>
              <line x1={CHART_LEFT} y1={priorCloseY} x2={CHART_RIGHT} y2={priorCloseY}
                stroke={accent} strokeWidth="1" strokeDasharray="3,4" opacity="0.7" />
              <text x={CHART_LEFT + 6} y={priorCloseY - 5} fill={accent} fontFamily={F.mono} fontSize="10">
                prior close · {priorClose.toLocaleString()}
              </text>
            </g>
          )}

          {step >= 1 && (
            <g>
              <rect x={130} y={openY} width={CHART_RIGHT - 130} height={priorCloseY - openY}
                fill={`${accent}0D`} />
              <text x={135} y={(openY + priorCloseY) / 2 + 3} fill={accent} fontFamily={F.mono} fontSize="9" opacity="0.8">
                gap · {gapSize}pts
              </text>
            </g>
          )}

          <g>
            <Candle x={160} open={openPrice}     close={openPrice + 2} high={openPrice + 3} low={openPrice - 1} color={C.green} priceToY={priceToY} />
            <Candle x={185} open={openPrice + 2} close={openPrice + 3} high={openPrice + 4} low={openPrice + 1} color={C.green} priceToY={priceToY} />
            <Candle x={210} open={openPrice + 3} close={openPrice + 4} high={openPrice + 5} low={openPrice + 2} color={C.green} priceToY={priceToY} />
            <text x={160} y={openY - 10} fill={C.textMuted} fontFamily={F.mono} fontSize="9">today open</text>
          </g>

          {step >= 2 && (
            <g>
              <Candle x={240} open={openPrice + 4} close={openPrice + 5} high={openPrice + 6} low={openPrice + 3.5} color={C.green} priceToY={priceToY} />
              <Candle x={265} open={openPrice + 5} close={openPrice + 2.5} high={openPrice + 6.5} low={openPrice + 2}
                color={C.coral} priceToY={priceToY} highlight width={12} />
              <text x={265} y={priceToY(openPrice + 6.5) - 8} textAnchor="middle"
                fill={C.textPrimary} fontFamily={F.mono} fontSize="10">failed breakout</text>
              <text x={265} y={priceToY(openPrice + 6.5) - 20} textAnchor="middle"
                fill={C.textMuted} fontFamily={F.mono} fontSize="8">wick above, closes back inside</text>
            </g>
          )}

          {step >= 3 && <LevelMarker x={280} y={priceToY(entry)}  color={accent}  label={`short · ${entry.toLocaleString()}`} labelOffset="above" />}
          {step >= 3 && <LevelMarker x={280} y={priceToY(stop)}   color={C.coral} label={`stop · ${stop.toLocaleString()} · -${riskPts}pts`} labelOffset="above" />}
          {step >= 3 && <LevelMarker x={280} y={priceToY(target)} color={C.green} label={`target · ${target.toLocaleString()} · +${rewardPts}pts`} labelOffset="below" />}

          {step >= 4 && (
            <g>
              {[
                { x: 310, open: entry,         close: entry - 2 },
                { x: 335, open: entry - 2,     close: entry - 3.5 },
                { x: 360, open: entry - 3.5,   close: entry - 5 },
                { x: 385, open: entry - 5,     close: entry - 6 },
                { x: 410, open: entry - 6,     close: entry - 7 },
                { x: 435, open: entry - 7,     close: entry - 7.5 },
                { x: 460, open: entry - 7.5,   close: entry - 8.5 },
                { x: 485, open: entry - 8.5,   close: target + 0.5 },
              ].map((c, i) => (
                <Candle key={i} x={c.x} open={c.open} close={c.close}
                  high={Math.max(c.open, c.close) + 0.5} low={Math.min(c.open, c.close) - 1}
                  color={C.coral} priceToY={priceToY} />
              ))}
            </g>
          )}

          <text x={CHART_LEFT + 30} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">prior session</text>
          <text x={185} y={CHART_BOTTOM + 20} textAnchor="middle" fill={C.textMuted} fontFamily={F.mono} fontSize="9">today 8:30</text>
          {step >= 4 && (
            <text x={CHART_RIGHT - 60} y={CHART_BOTTOM + 20} textAnchor="end" fill={C.textMuted} fontFamily={F.mono} fontSize="9">~10:30 · filled</text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template 4: S/R Bounce ──────────────────────────────────────────────────
//
// Data shape:
//   { type: "srBounce", title, priceRange: [min, max], levelHigh, levelLow, entry, stop, target }

function SrBounceDiagram({ diagram, color }) {
  const { title, priceRange, levelHigh, levelLow, entry, stop, target } = diagram;
  const accent = color || C.coral;

  const levelMid = (levelHigh + levelLow) / 2;
  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    { label: "level",    text: `Pre-market, identify a confluence zone. In this example: yesterday's value area low, yesterday's session low, and a weekly high-volume node all cluster between ${levelLow.toLocaleString()} and ${levelHigh.toLocaleString()}. Three independent reasons the level matters — each draws buyers on its own.` },
    { label: "approach", text: `Price sells off into the zone. Wait for price to actually touch the level before acting. Drawing lines in advance is prep; trading them happens when price arrives. Don't anticipate. Let it get there.` },
    { label: "reject",   text: `The reaction candle. Price wicks below the level but closes back inside the zone — a hammer or rejection candle. This is the setup signal. A candle that closes below the level on strong volume invalidates the setup.` },
    { label: "entry",    text: `Enter at ${entry.toLocaleString()} (one tick above the rejection candle close). Stop at ${stop.toLocaleString()} (below the confluence zone, ${riskPts}pts). Target at ${target.toLocaleString()} — the session's opening price. Risk-reward: 1:${(rewardPts / riskPts).toFixed(1)}.` },
  ];

  const [pMin, pMax] = priceRange;
  const priceToY = makePriceToY(pMin, pMax);
  const yTicks = makeYTicks(pMin, pMax, 5);

  const levelHighY = priceToY(levelHigh);
  const levelLowY = priceToY(levelLow);
  const rejectX = 310;

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img" aria-label={`Support and resistance bounce diagram. Step ${step} of 4.`}>

          <GridAndAxis priceToY={priceToY} yTicks={yTicks} />

          {step >= 1 && (
            <g>
              <rect x={CHART_LEFT} y={levelHighY} width={CHART_RIGHT - CHART_LEFT} height={levelLowY - levelHighY}
                fill={`${accent}14`} stroke={accent} strokeWidth="0.8" strokeDasharray="3,3" />
              <text x={CHART_RIGHT - 5} y={levelHighY - 5} textAnchor="end"
                fill={accent} fontFamily={F.mono} fontSize="10">
                confluence · {levelLow.toLocaleString()}-{levelHigh.toLocaleString()}
              </text>
              <text x={CHART_LEFT + 6} y={levelLowY + 12} fill={accent} fontFamily={F.mono} fontSize="9" opacity="0.7">
                yesterday VAL + session low + HVN
              </text>
            </g>
          )}

          <g>
            {[
              { x: 80,  open: levelHigh + 14, close: levelHigh + 12, high: levelHigh + 15, low: levelHigh + 11 },
              { x: 110, open: levelHigh + 12, close: levelHigh + 10, high: levelHigh + 13, low: levelHigh + 9 },
              { x: 140, open: levelHigh + 10, close: levelHigh + 8,  high: levelHigh + 11, low: levelHigh + 7 },
              { x: 170, open: levelHigh + 8,  close: levelHigh + 6,  high: levelHigh + 9,  low: levelHigh + 5 },
            ].map((c, i) => (
              <Candle key={i} x={c.x} open={c.open} close={c.close} high={c.high} low={c.low}
                color={C.coral} priceToY={priceToY} />
            ))}
          </g>

          {step >= 2 && (
            <g>
              {[
                { x: 200, open: levelHigh + 6,   close: levelHigh + 4 },
                { x: 230, open: levelHigh + 4,   close: levelHigh + 2 },
                { x: 260, open: levelHigh + 2,   close: levelHigh + 0.5 },
                { x: 285, open: levelHigh + 0.5, close: levelHigh - 1 },
              ].map((c, i) => (
                <Candle key={i} x={c.x} open={c.open} close={c.close}
                  high={Math.max(c.open, c.close) + 0.5} low={Math.min(c.open, c.close) - 1}
                  color={C.coral} priceToY={priceToY} />
              ))}
              <text x={240} y={priceToY(levelHigh + 8) - 4} textAnchor="middle"
                fill={C.textMuted} fontFamily={F.mono} fontSize="9">price descends into level</text>
            </g>
          )}

          {step >= 3 && (() => {
            const open  = levelLow + 1;
            const close = levelMid + 1;
            const high  = levelMid + 2;
            const low   = levelLow - 3;
            return (
              <g>
                <Candle x={rejectX} open={open} close={close} high={high} low={low}
                  color={C.green} priceToY={priceToY} highlight width={12} />
                <text x={rejectX} y={priceToY(high) - 8} textAnchor="middle"
                  fill={C.textPrimary} fontFamily={F.mono} fontSize="10">rejection candle</text>
                <text x={rejectX} y={priceToY(high) - 20} textAnchor="middle"
                  fill={C.textMuted} fontFamily={F.mono} fontSize="8">wicks below, closes inside zone</text>
              </g>
            );
          })()}

          {step >= 4 && <LevelMarker x={rejectX + 20} y={priceToY(entry)}  color={accent}  label={`entry · ${entry.toLocaleString()}`} labelOffset="above" />}
          {step >= 4 && <LevelMarker x={rejectX + 20} y={priceToY(stop)}   color={C.coral} label={`stop · ${stop.toLocaleString()} · -${riskPts}pts`} labelOffset="below" />}
          {step >= 4 && <LevelMarker x={rejectX + 20} y={priceToY(target)} color={C.green} label={`target · ${target.toLocaleString()} · +${rewardPts}pts`} labelOffset="above" />}

          {step >= 4 && (
            <g>
              {[
                { x: 345, offset: 3 },
                { x: 375, offset: 5 },
                { x: 405, offset: 7 },
                { x: 435, offset: 9 },
                { x: 465, offset: 11 },
                { x: 495, offset: 13 },
              ].map((c, i) => {
                const open  = levelHigh + c.offset - 1;
                const close = levelHigh + c.offset + 1;
                return (
                  <Candle key={i} x={c.x} open={open} close={close}
                    high={close + 0.5} low={open - 0.5}
                    color={C.green} priceToY={priceToY} />
                );
              })}
            </g>
          )}

          <text x={CHART_LEFT + 10} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">9:30 open</text>
          {step >= 3 && (
            <text x={rejectX} y={CHART_BOTTOM + 20} textAnchor="middle" fill={C.textMuted} fontFamily={F.mono} fontSize="9">~10:40 · reaction</text>
          )}
          {step >= 4 && (
            <text x={CHART_RIGHT - 60} y={CHART_BOTTOM + 20} textAnchor="end" fill={C.textMuted} fontFamily={F.mono} fontSize="9">lunch · target</text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template 5: Trend Following (intraday, EMA pullback) ────────────────────
//
// Data shape:
//   { type: "trendFollow", title, priceRange: [min, max],
//     fastEmaStart, fastEmaEnd, slowEmaStart, slowEmaEnd,
//     entry, stop, target }
//
// Uses a 9-EMA / 21-EMA pullback on a 5-minute chart. Intraday, prop-firm
// friendly, flat by end of session. No swing/daily exposure.

function TrendFollowDiagram({ diagram, color }) {
  const {
    title, priceRange,
    fastEmaStart, fastEmaEnd,
    slowEmaStart, slowEmaEnd,
    entry, stop, target,
  } = diagram;
  const accent = color || C.blue;

  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    { label: "trend",    text: `Confirm the trend on the 5-minute chart. Fast EMA (9) is above slow EMA (21), both sloping up. Price has been making higher highs and higher lows since the open. This is the prerequisite — trend-following only works when a trend actually exists.` },
    { label: "pullback", text: `Wait for the pullback to the fast EMA. Price drifts back from the recent high, retracing toward the 9-EMA. Pullbacks are normal inside trends — the goal is to enter on this pullback, not to chase the initial thrust.` },
    { label: "entry",    text: `Enter on the bounce from the fast EMA. A 5-minute candle touches or slightly pierces the 9-EMA, then closes back above it. Enter at ${entry.toLocaleString()}. Stop at ${stop.toLocaleString()} (below the slow EMA, ${riskPts}pts). Target the prior intraday high at ${target.toLocaleString()}. Risk-reward: 1:${(rewardPts / riskPts).toFixed(1)}.` },
    { label: "full",     text: `The trade develops. Price resumes the trend and extends to new intraday highs. Trail stops under each new higher low as the move develops. Flat by session end — no overnight exposure. On a strong trend day, 2-3 of these pullback entries can all work.` },
  ];

  const [pMin, pMax] = priceRange;
  const priceToY = makePriceToY(pMin, pMax);
  const yTicks = makeYTicks(pMin, pMax, 5);

  const emaX1 = CHART_LEFT + 20;
  const emaX2 = CHART_RIGHT - 10;
  const fastY1 = priceToY(fastEmaStart);
  const fastY2 = priceToY(fastEmaEnd);
  const slowY1 = priceToY(slowEmaStart);
  const slowY2 = priceToY(slowEmaEnd);

  const fastEmaAt = (x) => {
    const t = (x - emaX1) / (emaX2 - emaX1);
    return fastEmaStart + t * (fastEmaEnd - fastEmaStart);
  };

  const entryX = 320;

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img" aria-label={`Intraday trend following with EMA pullback diagram. Step ${step} of 4.`}>

          <GridAndAxis priceToY={priceToY} yTicks={yTicks} />

          {step >= 1 && (
            <g>
              <line x1={emaX1} y1={fastY1} x2={emaX2} y2={fastY2}
                stroke={accent} strokeWidth="1.8" />
              <line x1={emaX1} y1={slowY1} x2={emaX2} y2={slowY2}
                stroke={accent} strokeWidth="1.5" opacity="0.5" strokeDasharray="4,3" />
              <text x={emaX1 + 4} y={fastY1 - 6} fill={accent} fontFamily={F.mono} fontSize="10">
                9 EMA
              </text>
              <text x={emaX1 + 4} y={slowY1 + 14} fill={accent} fontFamily={F.mono} fontSize="10" opacity="0.7">
                21 EMA
              </text>
            </g>
          )}

          <g>
            {[
              { x: 75,  offset: 3 },
              { x: 100, offset: 4 },
              { x: 125, offset: 3.5 },
              { x: 150, offset: 5 },
              { x: 175, offset: 6 },
              { x: 200, offset: 5 },
              { x: 225, offset: 7 },
              { x: 250, offset: 6 },
              { x: 275, offset: 5 },
            ].map((c, i) => {
              const fast = fastEmaAt(c.x);
              const open  = fast + c.offset - 1;
              const close = fast + c.offset + 1;
              return (
                <Candle key={i} x={c.x} open={open} close={close}
                  high={close + 0.5} low={open - 0.5}
                  color={C.green} priceToY={priceToY} />
              );
            })}
          </g>

          {step >= 2 && (
            <g>
              {[
                { x: 295, offset: 4 },
                { x: 310, offset: 2 },
                { x: 320, offset: 0.5 },
              ].map((c, i) => {
                const fast = fastEmaAt(c.x);
                const open  = fast + c.offset + 1;
                const close = fast + c.offset - 0.5;
                return (
                  <Candle key={i} x={c.x} open={open} close={close}
                    high={open + 0.5} low={fast - 1.5}
                    color={C.coral} priceToY={priceToY} />
                );
              })}
              <text x={305} y={priceToY(fastEmaAt(305)) - 22} textAnchor="middle"
                fill={C.textMuted} fontFamily={F.mono} fontSize="9">pullback to 9 EMA</text>
            </g>
          )}

          {step >= 3 && (() => {
            const fast = fastEmaAt(entryX);
            const open  = fast + 0.5;
            const close = fast + 2.5;
            const high  = fast + 3;
            const low   = fast - 1.5;
            return (
              <g>
                <Candle x={entryX} open={open} close={close} high={high} low={low}
                  color={C.green} priceToY={priceToY} highlight width={12} />
                <text x={entryX} y={priceToY(high) - 6} textAnchor="middle"
                  fill={C.textPrimary} fontFamily={F.mono} fontSize="10">bounce candle</text>
                <text x={entryX} y={priceToY(high) - 18} textAnchor="middle"
                  fill={C.textMuted} fontFamily={F.mono} fontSize="8">wicks to EMA, closes above</text>
              </g>
            );
          })()}

          {step >= 3 && <LevelMarker x={entryX + 20} y={priceToY(entry)}  color={accent}  label={`entry · ${entry.toLocaleString()}`} labelOffset="above" />}
          {step >= 3 && <LevelMarker x={entryX + 20} y={priceToY(stop)}   color={C.coral} label={`stop · ${stop.toLocaleString()} · -${riskPts}pts`} labelOffset="below" />}
          {step >= 3 && <LevelMarker x={entryX + 20} y={priceToY(target)} color={C.amber} label={`target · ${target.toLocaleString()} · +${rewardPts}pts`} labelOffset="above" />}

          {step >= 4 && (
            <g>
              {[
                { x: 355, offset: 4 },
                { x: 385, offset: 6 },
                { x: 415, offset: 7 },
                { x: 445, offset: 9 },
                { x: 475, offset: 10 },
                { x: 505, offset: 12 },
              ].map((c, i) => {
                const fast = fastEmaAt(c.x);
                const open  = fast + c.offset - 1;
                const close = fast + c.offset + 1;
                return (
                  <Candle key={i} x={c.x} open={open} close={close}
                    high={close + 0.5} low={open - 0.5}
                    color={C.green} priceToY={priceToY} />
                );
              })}
            </g>
          )}

          <text x={CHART_LEFT + 10} y={CHART_BOTTOM + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">9:30 open</text>
          {step >= 3 && (
            <text x={entryX} y={CHART_BOTTOM + 20} textAnchor="middle" fill={C.textMuted} fontFamily={F.mono} fontSize="9">~11:00 · entry</text>
          )}
          {step >= 4 && (
            <text x={CHART_RIGHT - 60} y={CHART_BOTTOM + 20} textAnchor="end" fill={C.textMuted} fontFamily={F.mono} fontSize="9">pm · target</text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template registry ───────────────────────────────────────────────────────

const templates = {
  orb: OrbDiagram,
  vwapPullback: VwapPullbackDiagram,
  gapFill: GapFillDiagram,
  srBounce: SrBounceDiagram,
  trendFollow: TrendFollowDiagram,
};

// ── Main export ─────────────────────────────────────────────────────────────

export default function SetupDiagram({ diagram, color }) {
  if (!diagram || !diagram.type) return null;
  const Template = templates[diagram.type];
  if (!Template) return null;
  return <Template diagram={diagram} color={color} />;
}
