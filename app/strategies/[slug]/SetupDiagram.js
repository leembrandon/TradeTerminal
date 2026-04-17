// ── Setup Diagram ───────────────────────────────────────────────────────────
//
// Interactive diagram for strategy pages. Currently ships with one template:
// "orb" (Opening Range Breakout). More templates can be added alongside —
// see the `templates` registry at the bottom of the file.
//
// ── Usage ──────────────────────────────────────────────────────────────────
//
// 1. Add a `diagram` field to a strategy in lib/strategyGuides.js. For ORB:
//
//    diagram: {
//      type: "orb",
//      title: "Opening Range Breakout · ES · 5-min",
//      priceRange: [5180, 5220],          // y-axis min/max
//      orHigh: 5210,
//      orLow: 5200,
//      entry: 5207,
//      stop: 5194,
//      target: 5220,
//    }
//
// 2. In StrategyGuideClient.js, import and render after the header/TL;DR
//    block and before the sections:
//
//      import SetupDiagram from "./SetupDiagram";
//      ...
//      {strategy.diagram && <SetupDiagram diagram={strategy.diagram} color={strategy.color} />}
//
// Strategies without a `diagram` field render nothing — safe to add
// incrementally.

"use client";
import { useState } from "react";
import { C, F } from "@/lib/constants";

// ── Shared UI chrome (used by all templates) ─────────────────────────────────

function DiagramShell({ title, color, steps, children }) {
  const [step, setStep] = useState(1);
  const activeColor = color || C.teal;
  const activeCaption = steps[step - 1];

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "20px 22px 16px", marginBottom: 32 }}>
      {/* Header + step controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
        <div>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, margin: "0 0 4px" }}>SETUP DIAGRAM</p>
          <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, fontWeight: 500, margin: 0 }}>{title}</p>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
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

      {/* SVG renders here — template-specific */}
      <div style={{ marginBottom: 14 }}>
        {typeof children === "function" ? children(step) : children}
      </div>

      {/* Caption */}
      <div style={{ padding: "10px 14px", background: `${activeColor}0D`, borderLeft: `2px solid ${activeColor}`, borderRadius: "0 4px 4px 0", fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>
        <span style={{ color: activeColor, fontFamily: F.mono, marginRight: 8 }}>{step}.</span>
        {activeCaption.text}
      </div>
    </div>
  );
}

// ── ORB template ────────────────────────────────────────────────────────────

function OrbDiagram({ diagram, color }) {
  const { title, priceRange, orHigh, orLow, entry, stop, target } = diagram;
  const accent = color || C.teal;

  // Build the captions the shell uses
  const orWidth = orHigh - orLow;
  const riskPts = Math.abs(entry - stop);
  const rewardPts = Math.abs(target - entry);

  const steps = [
    {
      label: "range",
      text: `Mark the high and low of the first 15 minutes after the open. The opening range is ${orLow.toLocaleString()} to ${orHigh.toLocaleString()} — a ${orWidth}-point range. Narrow ranges relative to the 20-day average produce the highest-probability breakouts.`,
    },
    {
      label: "break",
      text: `Wait for a 5-minute candle to close above the OR high (for longs) or below the OR low (for shorts). A wick poking above isn't enough — you need a clean close beyond the level, ideally on above-average volume.`,
    },
    {
      label: "entry",
      text: `Enter at the breakout candle close (${entry.toLocaleString()}). Stop goes on the opposite side of the opening range (${stop.toLocaleString()}). Target is 1x the OR width projected from the breakout (${target.toLocaleString()}). Risk: ${riskPts}pts. Reward: ${rewardPts}pts.`,
    },
    {
      label: "full",
      text: `The full setup. Narrow opening range, clean breakout on a 5-min close above ${orHigh.toLocaleString()}, entry at ${entry.toLocaleString()}, stop at ${stop.toLocaleString()}, target at ${target.toLocaleString()}. On trend days price continues past target as the session develops.`,
    },
  ];

  // ── SVG coordinate system ─────────────────────────────────────────────────
  // viewBox: 600 x 320
  // price axis: priceRange[0] = bottom (y=290), priceRange[1] = top (y=30)
  // time axis: 8:30 at x=60, later candles progress right

  const VB_W = 600;
  const VB_H = 320;
  const chartTop = 30;
  const chartBottom = 290;
  const chartLeft = 50;
  const chartRight = 590;

  const [pMin, pMax] = priceRange;
  const priceToY = (p) => chartTop + ((pMax - p) / (pMax - pMin)) * (chartBottom - chartTop);

  // Build y-axis ticks at 10-point intervals
  const yTicks = [];
  for (let p = pMax; p >= pMin; p -= 10) yTicks.push(p);

  // Key price levels in SVG units
  const yHigh = priceToY(orHigh);
  const yLow = priceToY(orLow);
  const yEntry = priceToY(entry);
  const yStop = priceToY(stop);
  const yTarget = priceToY(target);

  // Opening range box bounds (first 15 min = first 6 candles at 5-min = x 60 to 250)
  const orBoxX = 60;
  const orBoxW = 190;

  // Breakout candle position
  const breakX = 320;

  return (
    <DiagramShell title={title} color={accent} steps={steps}>
      {(step) => (
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} style={{ width: "100%", height: "auto", display: "block" }}
          role="img"
          aria-label={`Opening range breakout diagram. Step ${step} of 4.`}>

          {/* Background grid + y-axis labels */}
          {yTicks.map((p, i) => (
            <g key={p}>
              <line
                x1={chartLeft} y1={priceToY(p)} x2={chartRight} y2={priceToY(p)}
                stroke={i === yTicks.length - 1 ? "rgba(93,202,165,0.1)" : "rgba(93,202,165,0.05)"}
                strokeWidth="1" />
              <text
                x={chartLeft - 6} y={priceToY(p) + 4} textAnchor="end"
                fill={C.textMuted} fontFamily={F.mono} fontSize="9">
                {p.toLocaleString()}
              </text>
            </g>
          ))}

          {/* Opening range candles (6 × 5-min, stylized) — always visible */}
          <g>
            {[
              { x: 80, open: orLow + 7, close: orLow + 3, high: orHigh - 2, low: orLow - 1, color: C.coral },
              { x: 110, open: orLow + 4, close: orHigh - 3, high: orHigh - 1, low: orLow + 2, color: C.green },
              { x: 140, open: orHigh - 4, close: orHigh - 1, high: orHigh, low: orHigh - 5, color: C.green },
              { x: 170, open: orHigh - 1, close: orHigh - 3, high: orHigh - 1, low: orHigh - 4, color: C.coral },
              { x: 200, open: orHigh - 3, close: orHigh - 1, high: orHigh, low: orHigh - 5, color: C.green },
              { x: 230, open: orHigh - 1, close: orHigh - 0.5, high: orHigh, low: orLow + 5, color: C.green },
            ].map((c, i) => {
              const yOpen = priceToY(c.open);
              const yClose = priceToY(c.close);
              const yHighC = priceToY(c.high);
              const yLowC = priceToY(c.low);
              const bodyTop = Math.min(yOpen, yClose);
              const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
              return (
                <g key={i}>
                  <line x1={c.x} y1={yLowC} x2={c.x} y2={yHighC} stroke={C.textMuted} strokeWidth="1" />
                  <rect x={c.x - 4} y={bodyTop} width="8" height={bodyH} fill={c.color} />
                </g>
              );
            })}
          </g>

          {/* Opening range box (step 1+) */}
          {step >= 1 && (
            <g>
              <rect x={orBoxX} y={yHigh} width={orBoxW} height={yLow - yHigh}
                fill={`${accent}14`} stroke={accent} strokeWidth="1" strokeDasharray="3,3" />
              <line x1={orBoxX} y1={yHigh} x2={chartRight} y2={yHigh}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" />
              <line x1={orBoxX} y1={yLow} x2={chartRight} y2={yLow}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2,4" opacity="0.5" />
              <text x={orBoxX + orBoxW + 10} y={yHigh + 5} fill={accent} fontFamily={F.mono} fontSize="10">
                OR high · {orHigh.toLocaleString()}
              </text>
              <text x={orBoxX + orBoxW + 10} y={yLow + 10} fill={accent} fontFamily={F.mono} fontSize="10">
                OR low · {orLow.toLocaleString()}
              </text>
              <text x={orBoxX + 6} y={yHigh - 5} fill={accent} fontFamily={F.mono} fontSize="9" opacity="0.7">
                opening range · first 15min
              </text>
            </g>
          )}

          {/* Post-OR approach candles (step 2+) */}
          {step >= 2 && (
            <g>
              {[
                { x: 260, open: orHigh - 1, close: orHigh + 1, high: orHigh + 3, low: orHigh - 2, color: C.green },
                { x: 290, open: orHigh + 1, close: orHigh + 3, high: orHigh + 5, low: orHigh, color: C.green },
              ].map((c, i) => {
                const yOpen = priceToY(c.open);
                const yClose = priceToY(c.close);
                const yHighC = priceToY(c.high);
                const yLowC = priceToY(c.low);
                const bodyTop = Math.min(yOpen, yClose);
                const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
                return (
                  <g key={i}>
                    <line x1={c.x} y1={yLowC} x2={c.x} y2={yHighC} stroke={C.textMuted} strokeWidth="1" />
                    <rect x={c.x - 4} y={bodyTop} width="8" height={bodyH} fill={c.color} />
                  </g>
                );
              })}
            </g>
          )}

          {/* Breakout candle — highlighted (step 2+) */}
          {step >= 2 && (() => {
            const bOpen = orHigh + 1;
            const bClose = orHigh + 4;
            const bHigh = orHigh + 5;
            const bLow = orHigh - 1;
            const yOpen = priceToY(bOpen);
            const yClose = priceToY(bClose);
            const yHighC = priceToY(bHigh);
            const yLowC = priceToY(bLow);
            const bodyTop = Math.min(yOpen, yClose);
            const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
            return (
              <g>
                <line x1={breakX} y1={yLowC} x2={breakX} y2={yHighC} stroke={C.textPrimary} strokeWidth="1" />
                <rect x={breakX - 6} y={bodyTop} width="12" height={bodyH}
                  fill={C.green} stroke={C.textPrimary} strokeWidth="1.5" />
                <text x={breakX} y={yHighC - 6} textAnchor="middle"
                  fill={C.textPrimary} fontFamily={F.mono} fontSize="10">breakout candle</text>
                <text x={breakX} y={yHighC - 18} textAnchor="middle"
                  fill={C.textMuted} fontFamily={F.mono} fontSize="8">5-min close above OR high</text>
              </g>
            );
          })()}

          {/* Entry marker (step 3+) */}
          {step >= 3 && (
            <g>
              <circle cx={breakX + 18} cy={yEntry} r="4" fill={accent} stroke={C.bgCard} strokeWidth="1.5" />
              <line x1={breakX + 22} y1={yEntry} x2={chartRight} y2={yEntry}
                stroke={accent} strokeWidth="0.8" strokeDasharray="2,3" />
              <text x={chartRight - 5} y={yEntry - 5} textAnchor="end"
                fill={accent} fontFamily={F.mono} fontSize="10">
                entry · {entry.toLocaleString()}
              </text>
            </g>
          )}

          {/* Stop marker (step 3+) */}
          {step >= 3 && (
            <g>
              <circle cx={breakX + 18} cy={yStop} r="4" fill={C.coral} stroke={C.bgCard} strokeWidth="1.5" />
              <line x1={breakX + 22} y1={yStop} x2={chartRight} y2={yStop}
                stroke={C.coral} strokeWidth="0.8" strokeDasharray="2,3" />
              <text x={chartRight - 5} y={yStop + 13} textAnchor="end"
                fill={C.coral} fontFamily={F.mono} fontSize="10">
                stop · {stop.toLocaleString()} · -{riskPts}pts
              </text>
            </g>
          )}

          {/* Target marker (step 3+) */}
          {step >= 3 && (
            <g>
              <circle cx={breakX + 18} cy={yTarget} r="4" fill={C.amber} stroke={C.bgCard} strokeWidth="1.5" />
              <line x1={breakX + 22} y1={yTarget} x2={chartRight} y2={yTarget}
                stroke={C.amber} strokeWidth="0.8" strokeDasharray="2,3" />
              <text x={chartRight - 5} y={yTarget - 5} textAnchor="end"
                fill={C.amber} fontFamily={F.mono} fontSize="10">
                target · {target.toLocaleString()} · +{rewardPts}pts
              </text>
            </g>
          )}

          {/* Continuation candles toward target (step 4) */}
          {step >= 4 && (
            <g>
              {[
                { x: 360, open: orHigh + 4, close: orHigh + 7, high: orHigh + 8, low: orHigh + 3 },
                { x: 390, open: orHigh + 7, close: orHigh + 9, high: orHigh + 11, low: orHigh + 6 },
                { x: 420, open: orHigh + 9, close: orHigh + 11, high: orHigh + 12, low: orHigh + 8 },
                { x: 450, open: orHigh + 11, close: orHigh + 13, high: orHigh + 14, low: orHigh + 10 },
                { x: 480, open: orHigh + 13, close: target - 0.5, high: target, low: orHigh + 12 },
              ].map((c, i) => {
                const yOpen = priceToY(c.open);
                const yClose = priceToY(c.close);
                const yHighC = priceToY(c.high);
                const yLowC = priceToY(c.low);
                const bodyTop = Math.min(yOpen, yClose);
                const bodyH = Math.max(Math.abs(yOpen - yClose), 2);
                return (
                  <g key={i}>
                    <line x1={c.x} y1={yLowC} x2={c.x} y2={yHighC} stroke={C.textMuted} strokeWidth="1" />
                    <rect x={c.x - 4} y={bodyTop} width="8" height={bodyH} fill={C.green} />
                  </g>
                );
              })}
            </g>
          )}

          {/* X-axis labels */}
          <text x={chartLeft + 10} y={chartBottom + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">
            8:30 open
          </text>
          <text x={orBoxX + orBoxW + 10} y={chartBottom + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">
            8:45 · OR set
          </text>
          {step >= 4 && (
            <text x={chartRight - 115} y={chartBottom + 20} fill={C.textMuted} fontFamily={F.mono} fontSize="9">
              target hit
            </text>
          )}
        </svg>
      )}
    </DiagramShell>
  );
}

// ── Template registry ───────────────────────────────────────────────────────
//
// Add new templates here as you build them. Each template is a component that
// takes { diagram, color } as props. The template chooses which data fields
// from `diagram` it needs.

const templates = {
  orb: OrbDiagram,
  // vwapPullback: VwapPullbackDiagram,   // future
  // gapFill: GapFillDiagram,              // future
  // srBounce: SrBounceDiagram,            // future
  // trendFollow: TrendFollowDiagram,      // future
};

// ── Main export ─────────────────────────────────────────────────────────────

export default function SetupDiagram({ diagram, color }) {
  if (!diagram || !diagram.type) return null;
  const Template = templates[diagram.type];
  if (!Template) return null;
  return <Template diagram={diagram} color={color} />;
}
