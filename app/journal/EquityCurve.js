"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { C, F } from "@/lib/constants";

// ── Helpers ──────────────────────────────────────────────────────────────────

function calcTradePnl(trade, CONTRACTS) {
  if (trade.pnlMode === "direct") {
    if (!trade.pnlManual) return null;
    const amount = Math.abs(parseFloat(trade.pnlManual));
    if (isNaN(amount)) return null;
    return trade.pnlResult === "loss" ? -amount : amount;
  }
  const spec = CONTRACTS.find(c => c.value === trade.contract);
  if (!spec || !spec.pointValue) return null;
  const entry = parseFloat(trade.entry);
  const exit = parseFloat(trade.exit);
  const qty = parseInt(trade.qty) || 1;
  if (isNaN(entry) || isNaN(exit)) return null;
  const diff = trade.direction === "long" ? exit - entry : entry - exit;
  return diff * spec.pointValue * qty;
}

function sessionPnl(session, CONTRACTS) {
  let total = 0;
  let hasAny = false;
  session.trades.forEach(t => {
    const pnl = calcTradePnl(t, CONTRACTS);
    if (pnl !== null && !isNaN(pnl)) { total += pnl; hasAny = true; }
  });
  return hasAny ? total : null;
}

function fmtDollar(v) {
  const abs = Math.abs(v);
  const prefix = v >= 0 ? "+" : "-";
  return `${prefix}$${abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtDateLong(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

// ── Contract specs (duplicated from JournalClient to keep the component self-contained) ──

const CONTRACTS = [
  { value: "ES", tickSize: 0.25, tickValue: 12.50, pointValue: 50 },
  { value: "MES", tickSize: 0.25, tickValue: 1.25, pointValue: 5 },
  { value: "NQ", tickSize: 0.25, tickValue: 5.00, pointValue: 20 },
  { value: "MNQ", tickSize: 0.25, tickValue: 0.50, pointValue: 2 },
  { value: "YM", tickSize: 1, tickValue: 5.00, pointValue: 5 },
  { value: "MYM", tickSize: 1, tickValue: 0.50, pointValue: 0.5 },
  { value: "RTY", tickSize: 0.1, tickValue: 5.00, pointValue: 50 },
  { value: "M2K", tickSize: 0.1, tickValue: 0.50, pointValue: 5 },
  { value: "CL", tickSize: 0.01, tickValue: 10.00, pointValue: 1000 },
  { value: "MCL", tickSize: 0.01, tickValue: 1.00, pointValue: 100 },
  { value: "GC", tickSize: 0.10, tickValue: 10.00, pointValue: 100 },
  { value: "MGC", tickSize: 0.10, tickValue: 1.00, pointValue: 10 },
  { value: "SI", tickSize: 0.005, tickValue: 25.00, pointValue: 5000 },
  { value: "NG", tickSize: 0.001, tickValue: 10.00, pointValue: 10000 },
  { value: "ZN", tickSize: 0.015625, tickValue: 15.625, pointValue: 1000 },
  { value: "ZB", tickSize: 0.03125, tickValue: 31.25, pointValue: 1000 },
  { value: "6E", tickSize: 0.00005, tickValue: 6.25, pointValue: 125000 },
  { value: "OTHER", tickSize: null, tickValue: null, pointValue: null },
];

// ── Range options ────────────────────────────────────────────────────────────

const RANGES = [
  { value: 7, label: "7D" },
  { value: 30, label: "30D" },
  { value: 90, label: "90D" },
  { value: 0, label: "ALL" },
];

// ── Teaser (shown when 1-2 sessions have P&L) ──────────────────────────────

function EquityCurveTeaser({ count }) {
  const needed = 3 - count;
  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: "14px 16px", marginBottom: 24,
      display: "flex", alignItems: "center", gap: 12,
    }}>
      {/* Mini placeholder chart icon */}
      <svg width="28" height="18" viewBox="0 0 28 18" fill="none" style={{ flexShrink: 0, opacity: 0.4 }}>
        <polyline points="2,16 8,10 14,13 20,5 26,8" stroke={C.teal} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="5" r="2" fill={C.teal} opacity="0.5" />
      </svg>
      <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
        Log {needed} more session{needed !== 1 ? "s" : ""} with P&L to see your equity curve
      </p>
    </div>
  );
}

// ── Main chart component ────────────────────────────────────────────────────

function EquityCurveChart({ dataPoints }) {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [range, setRange] = useState(30);
  const [showDrawdown, setShowDrawdown] = useState(false);
  const [hovered, setHovered] = useState(-1);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filter data by selected range
  const filtered = useMemo(() => {
    if (range === 0) return dataPoints;
    const today = new Date();
    const cutoff = new Date(today);
    cutoff.setDate(cutoff.getDate() - range);
    const cutoffStr = cutoff.toISOString().split("T")[0];
    return dataPoints.filter(d => d.date >= cutoffStr);
  }, [dataPoints, range]);

  // Compute stats for visible range
  const stats = useMemo(() => {
    if (filtered.length === 0) return { periodPnl: 0, peak: 0, maxDD: 0, sessions: 0 };
    const startCum = filtered.length > 0 ? (filtered[0].cum - filtered[0].pnl) : 0;
    const endCum = filtered[filtered.length - 1].cum;
    const periodPnl = endCum - startCum;
    let peak = -Infinity;
    let maxDD = 0;
    filtered.forEach(d => {
      peak = Math.max(peak, d.cum);
      const dd = peak - d.cum;
      maxDD = Math.max(maxDD, dd);
    });
    return { periodPnl, peak, maxDD, sessions: filtered.length };
  }, [filtered]);

  // Draw canvas
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const rect = wrap.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    ctx.scale(dpr, dpr);
    const W = rect.width;
    const H = rect.height;
    ctx.clearRect(0, 0, W, H);

    const data = filtered;
    if (data.length < 2) return;

    const pad = { t: 16, r: 12, b: 8, l: 52 };
    const cw = W - pad.l - pad.r;
    const ch = H - pad.t - pad.b;

    const vals = data.map(d => d.cum);
    let minV = Math.min(0, ...vals);
    let maxV = Math.max(0, ...vals);
    const valRange = maxV - minV || 1;
    minV -= valRange * 0.1;
    maxV += valRange * 0.1;

    const x = i => pad.l + (i / (data.length - 1)) * cw;
    const y = v => pad.t + (1 - (v - minV) / (maxV - minV)) * ch;

    // Horizontal grid
    ctx.strokeStyle = "rgba(93,202,165,0.07)";
    ctx.lineWidth = 0.5;
    const gridSteps = 4;
    for (let i = 0; i <= gridSteps; i++) {
      const val = minV + (maxV - minV) * (i / gridSteps);
      const yy = y(val);
      ctx.beginPath(); ctx.moveTo(pad.l, yy); ctx.lineTo(W - pad.r, yy); ctx.stroke();
      // Y-axis labels
      ctx.fillStyle = C.textMuted;
      ctx.font = `9px ${F.mono}`;
      ctx.textAlign = "right";
      const abs = Math.abs(Math.round(val));
      const label = val >= 0 ? `+$${abs.toLocaleString()}` : `-$${abs.toLocaleString()}`;
      ctx.fillText(label, pad.l - 6, yy + 3);
    }

    // Zero line
    if (minV < 0 && maxV > 0) {
      ctx.strokeStyle = "rgba(93,202,165,0.2)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath(); ctx.moveTo(pad.l, y(0)); ctx.lineTo(W - pad.r, y(0)); ctx.stroke();
      ctx.setLineDash([]);
    }

    // Drawdown overlay
    if (showDrawdown) {
      let peak = -Infinity;
      // Fill between peak line and equity curve
      ctx.fillStyle = "rgba(240,153,123,0.08)";
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        peak = Math.max(peak, data[i].cum);
        const px = x(i);
        if (i === 0) ctx.moveTo(px, y(peak));
        else ctx.lineTo(px, y(peak));
      }
      for (let i = data.length - 1; i >= 0; i--) {
        ctx.lineTo(x(i), y(data[i].cum));
      }
      ctx.closePath();
      ctx.fill();

      // Peak ceiling dashed line
      peak = -Infinity;
      ctx.strokeStyle = "rgba(240,153,123,0.35)";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      for (let i = 0; i < data.length; i++) {
        peak = Math.max(peak, data[i].cum);
        if (i === 0) ctx.moveTo(x(i), y(peak));
        else ctx.lineTo(x(i), y(peak));
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Main equity line
    ctx.strokeStyle = C.teal;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.beginPath();
    data.forEach((d, i) => {
      if (i === 0) ctx.moveTo(x(i), y(d.cum));
      else ctx.lineTo(x(i), y(d.cum));
    });
    ctx.stroke();

    // Gradient fill under the line (above zero)
    ctx.save();
    ctx.beginPath();
    data.forEach((d, i) => {
      if (i === 0) ctx.moveTo(x(i), y(d.cum));
      else ctx.lineTo(x(i), y(d.cum));
    });
    ctx.lineTo(x(data.length - 1), y(0));
    ctx.lineTo(x(0), y(0));
    ctx.closePath();
    ctx.clip();
    const grad = ctx.createLinearGradient(0, pad.t, 0, H - pad.b);
    grad.addColorStop(0, "rgba(93,202,165,0.15)");
    grad.addColorStop(1, "rgba(93,202,165,0.0)");
    ctx.fillStyle = grad;
    ctx.fillRect(pad.l, pad.t, cw, ch);
    ctx.restore();

    // Data point dots
    data.forEach((d, i) => {
      const color = d.pnl >= 0 ? C.green : C.coral;
      const isHovered = hovered === i;
      const r = isHovered ? 5 : 3;
      ctx.beginPath();
      ctx.arc(x(i), y(d.cum), r, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      if (isHovered) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    });
  }, [filtered, hovered, showDrawdown]);

  // Draw on mount, data change, hover, resize
  useEffect(() => { draw(); }, [draw]);
  useEffect(() => {
    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [draw]);

  // Mouse interaction
  const handleMouseMove = useCallback((e) => {
    const wrap = wrapRef.current;
    if (!wrap || filtered.length < 2) return;
    const rect = wrap.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const pad = { l: 52, r: 12 };
    const cw = rect.width - pad.l - pad.r;
    const ratio = (mx - pad.l) / cw;
    const idx = Math.round(ratio * (filtered.length - 1));
    if (idx >= 0 && idx < filtered.length) {
      setHovered(idx);
      setTooltipPos({
        x: mx > rect.width / 2 ? mx - 150 : mx + 16,
        y: 20,
      });
    } else {
      setHovered(-1);
    }
  }, [filtered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(-1);
  }, []);

  // Touch interaction for mobile
  const handleTouchMove = useCallback((e) => {
    if (!e.touches.length) return;
    const touch = e.touches[0];
    const wrap = wrapRef.current;
    if (!wrap || filtered.length < 2) return;
    const rect = wrap.getBoundingClientRect();
    const mx = touch.clientX - rect.left;
    const pad = { l: 52, r: 12 };
    const cw = rect.width - pad.l - pad.r;
    const ratio = (mx - pad.l) / cw;
    const idx = Math.round(ratio * (filtered.length - 1));
    if (idx >= 0 && idx < filtered.length) {
      setHovered(idx);
      setTooltipPos({ x: mx > rect.width / 2 ? mx - 150 : mx + 16, y: 20 });
    }
    e.preventDefault();
  }, [filtered]);

  const handleTouchEnd = useCallback(() => {
    setHovered(-1);
  }, []);

  const hoveredData = hovered >= 0 && hovered < filtered.length ? filtered[hovered] : null;

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8,
      padding: "16px 16px 12px", marginBottom: 24,
    }}>
      {/* Header row: label + P&L + range buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>EQUITY CURVE</span>
          <span style={{
            fontFamily: F.mono, fontSize: 14, fontWeight: 600,
            color: stats.periodPnl >= 0 ? C.green : C.coral,
          }}>
            {fmtDollar(stats.periodPnl)}
          </span>
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {RANGES.map(r => {
            const active = range === r.value;
            return (
              <button key={r.value} onClick={() => setRange(r.value)}
                style={{
                  padding: "3px 8px", borderRadius: 3, cursor: "pointer",
                  fontFamily: F.mono, fontSize: 10,
                  border: `1px solid ${active ? C.teal : C.border}`,
                  background: active ? `${C.teal}1A` : "transparent",
                  color: active ? C.teal : C.textMuted,
                  transition: "all 0.15s",
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${C.teal}44`; e.currentTarget.style.color = C.textSecondary; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats row: peak, max drawdown, session count, drawdown toggle */}
      <div style={{ display: "flex", gap: 16, marginBottom: 12, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.5 }}>PEAK</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green, marginLeft: 6 }}>{fmtDollar(stats.peak)}</span>
        </div>
        <div>
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.5 }}>MAX DD</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: stats.maxDD > 0 ? C.coral : C.textMuted, marginLeft: 6 }}>
            {stats.maxDD > 0 ? `-$${stats.maxDD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "--"}
          </span>
        </div>
        <div>
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.5 }}>SESSIONS</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary, marginLeft: 6 }}>{stats.sessions}</span>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button onClick={() => setShowDrawdown(!showDrawdown)}
            style={{
              padding: "3px 8px", borderRadius: 3, cursor: "pointer",
              fontFamily: F.mono, fontSize: 9, letterSpacing: 0.5,
              border: `1px solid ${showDrawdown ? `${C.coral}66` : C.border}`,
              background: showDrawdown ? `${C.coral}1A` : "transparent",
              color: showDrawdown ? C.coral : C.textMuted,
              transition: "all 0.15s",
            }}
            onMouseEnter={e => { if (!showDrawdown) { e.currentTarget.style.borderColor = `${C.coral}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!showDrawdown) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}
          >
            DRAWDOWN
          </button>
        </div>
      </div>

      {/* Chart canvas */}
      <div ref={wrapRef} style={{ position: "relative", width: "100%", height: 200 }}
        onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />

        {/* Tooltip */}
        {hoveredData && (
          <div style={{
            position: "absolute", left: tooltipPos.x, top: tooltipPos.y,
            background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: 4,
            padding: "8px 10px", pointerEvents: "none", zIndex: 10, whiteSpace: "nowrap",
          }}>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textSecondary, marginBottom: 4 }}>
              {fmtDateLong(hoveredData.date)}
            </p>
            <p style={{
              fontFamily: F.mono, fontSize: 12, fontWeight: 600, marginBottom: 2,
              color: hoveredData.pnl >= 0 ? C.green : C.coral,
            }}>
              Day: {fmtDollar(hoveredData.pnl)}
            </p>
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>
              Total: {fmtDollar(hoveredData.cum)}
            </p>
          </div>
        )}
      </div>

      {/* Date range labels */}
      {filtered.length >= 2 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, padding: "0 4px" }}>
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>{fmtDate(filtered[0].date)}</span>
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>{fmtDate(filtered[filtered.length - 1].date)}</span>
        </div>
      )}

      {/* Legend */}
      <div style={{
        borderTop: `1px solid ${C.border}`, marginTop: 10, paddingTop: 10,
        display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 12, height: 2, background: C.teal, borderRadius: 1 }} />
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>Cumulative P&L</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.green }} />
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>Green day</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.coral }} />
          <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>Red day</span>
        </div>
        {showDrawdown && (
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 12, height: 6, background: `${C.coral}1A`, borderTop: `1px dashed ${C.coral}` }} />
            <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>Drawdown</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Exported wrapper (handles data prep + threshold logic) ──────────────────

export default function EquityCurve({ sessions }) {
  // Build data points: only sessions with calculable P&L, sorted chronologically
  const dataPoints = useMemo(() => {
    const withPnl = sessions
      .map(s => ({ date: s.date, pnl: sessionPnl(s, CONTRACTS) }))
      .filter(d => d.pnl !== null)
      .sort((a, b) => a.date.localeCompare(b.date));

    let cum = 0;
    return withPnl.map(d => {
      cum += d.pnl;
      return { date: d.date, pnl: d.pnl, cum };
    });
  }, [sessions]);

  // 0 sessions with P&L: render nothing (existing empty state handles this)
  if (dataPoints.length === 0) return null;

  // 1-2 sessions with P&L: show teaser
  if (dataPoints.length < 3) {
    return <EquityCurveTeaser count={dataPoints.length} />;
  }

  // 3+ sessions with P&L: show full chart
  return <EquityCurveChart dataPoints={dataPoints} />;
}
