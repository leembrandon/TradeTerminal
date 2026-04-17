"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { fetchSessions, fetchPlaybooks as fetchPlaybooksRemote, upsertSession, deleteSession as deleteSessionRemote } from "@/lib/storage";
import NavBar from "@/app/NavBar";
import EquityCurve from "./EquityCurve";

const JOURNAL_KEY = "tt_journal_v2";
const PLAYBOOK_KEY = "tt_playbooks";

// ── Contract specs for auto P&L calculation ─────────────────────────────────

const CONTRACTS = [
  { value: "ES", label: "ES", tickSize: 0.25, tickValue: 12.50, pointValue: 50 },
  { value: "MES", label: "MES", tickSize: 0.25, tickValue: 1.25, pointValue: 5 },
  { value: "NQ", label: "NQ", tickSize: 0.25, tickValue: 5.00, pointValue: 20 },
  { value: "MNQ", label: "MNQ", tickSize: 0.25, tickValue: 0.50, pointValue: 2 },
  { value: "YM", label: "YM", tickSize: 1, tickValue: 5.00, pointValue: 5 },
  { value: "MYM", label: "MYM", tickSize: 1, tickValue: 0.50, pointValue: 0.5 },
  { value: "RTY", label: "RTY", tickSize: 0.1, tickValue: 5.00, pointValue: 50 },
  { value: "M2K", label: "M2K", tickSize: 0.1, tickValue: 0.50, pointValue: 5 },
  { value: "CL", label: "CL", tickSize: 0.01, tickValue: 10.00, pointValue: 1000 },
  { value: "MCL", label: "MCL", tickSize: 0.01, tickValue: 1.00, pointValue: 100 },
  { value: "GC", label: "GC", tickSize: 0.10, tickValue: 10.00, pointValue: 100 },
  { value: "MGC", label: "MGC", tickSize: 0.10, tickValue: 1.00, pointValue: 10 },
  { value: "SI", label: "SI", tickSize: 0.005, tickValue: 25.00, pointValue: 5000 },
  { value: "NG", label: "NG", tickSize: 0.001, tickValue: 10.00, pointValue: 10000 },
  { value: "ZN", label: "ZN", tickSize: 0.015625, tickValue: 15.625, pointValue: 1000 },
  { value: "ZB", label: "ZB", tickSize: 0.03125, tickValue: 31.25, pointValue: 1000 },
  { value: "6E", label: "6E", tickSize: 0.00005, tickValue: 6.25, pointValue: 125000 },
  { value: "OTHER", label: "Other", tickSize: null, tickValue: null, pointValue: null },
];

// ── Options ──────────────────────────────────────────────────────────────────

const DIRECTIONS = [
  { value: "long", label: "Long", color: C.green },
  { value: "short", label: "Short", color: C.coral },
];

const FOLLOWED_PLAN = [
  { value: "yes", label: "Yes", color: C.green },
  { value: "mostly", label: "Mostly", color: C.amber },
  { value: "no", label: "No", color: C.coral },
];

const EMOTIONS = [
  { value: "disciplined", label: "Disciplined" },
  { value: "patient", label: "Patient" },
  { value: "confident", label: "Confident" },
  { value: "anxious", label: "Anxious" },
  { value: "frustrated", label: "Frustrated" },
  { value: "overtraded", label: "Overtraded" },
  { value: "revenge-traded", label: "Revenge traded" },
  { value: "fomo", label: "FOMO" },
];

const MARKET_CONDITIONS = [
  { value: "trending", label: "Trending" },
  { value: "choppy", label: "Choppy" },
  { value: "range-bound", label: "Range-bound" },
  { value: "low-volume", label: "Low volume" },
  { value: "high-volatility", label: "High volatility" },
  { value: "news-driven", label: "News-driven" },
];

const MISTAKES = [
  { value: "moved-stop", label: "Moved stop" },
  { value: "sized-too-big", label: "Sized too big" },
  { value: "chased-entry", label: "Chased entry" },
  { value: "no-setup", label: "No setup" },
  { value: "held-too-long", label: "Held too long" },
  { value: "cut-too-early", label: "Cut too early" },
  { value: "traded-during-news", label: "Traded during news" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
function todayStr() { return new Date().toISOString().split("T")[0]; }

function blankTrade() {
  return {
    id: uid(), contract: "ES", direction: "long",
    pnlMode: "direct",
    pnlResult: "win",
    entry: "", exit: "", qty: "1",
    pnlManual: "",
    plannedRisk: "", plannedTarget: "",
    playbookId: "", followedPlan: "",
    emotions: [], marketConditions: [],
    mistakes: [], note: "",
  };
}

function blankSession(date) {
  return {
    id: uid(), date: date || todayStr(),
    trades: [blankTrade()],
    whatWorked: "", whatDidnt: "", notes: "",
  };
}

function calcTradePnl(trade) {
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

function calcActualRR(trade) {
  const pnl = calcTradePnl(trade);
  const risk = parseFloat(trade.plannedRisk);
  if (pnl === null || isNaN(pnl) || isNaN(risk) || risk === 0) return null;
  return pnl / Math.abs(risk);
}

function sessionPnl(session) {
  let total = 0;
  let hasAny = false;
  session.trades.forEach(t => {
    const pnl = calcTradePnl(t);
    if (pnl !== null && !isNaN(pnl)) { total += pnl; hasAny = true; }
  });
  return hasAny ? total : null;
}

function sessionResult(session) {
  const pnl = sessionPnl(session);
  if (pnl === null) return session.trades.length === 0 ? "no-trade" : "unknown";
  if (pnl > 0) return "green";
  if (pnl < 0) return "red";
  return "breakeven";
}

const RESULT_META = {
  green: { label: "Green day", color: C.green },
  red: { label: "Red day", color: C.coral },
  breakeven: { label: "Breakeven", color: C.amber },
  "no-trade": { label: "No trade", color: C.textMuted },
  unknown: { label: "Pending", color: C.textMuted },
};

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatPnl(pnl) {
  if (pnl === null || pnl === undefined || isNaN(pnl)) return "--";
  const prefix = pnl > 0 ? "+" : "";
  return `${prefix}$${pnl.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ── Calendar Helpers ────────────────────────────────────────────────────────

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay; // Sunday-start
  const days = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

// Abbreviate dollar amounts for compact cell display
// 12345 -> "$12k", -1234 -> "-$1.2k", 567 -> "$567"
function formatPnlCompact(pnl) {
  if (pnl === null || pnl === undefined || isNaN(pnl)) return "";
  const abs = Math.abs(pnl);
  const sign = pnl < 0 ? "-" : "";
  if (abs >= 10000) return `${sign}$${Math.round(abs / 1000)}k`;
  if (abs >= 1000) return `${sign}$${(abs / 1000).toFixed(1)}k`;
  return `${sign}$${Math.round(abs)}`;
}

function monthLabel(year, month) {
  return new Date(year, month, 1).toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function padDateStr(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

// ── Reusable Components ──────────────────────────────────────────────────────

function Label({ children, color }) {
  return <label style={{ display: "block", fontFamily: F.mono, fontSize: 11, color: color || C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{children}</label>;
}

function ChipSelect({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(active ? "" : opt.value)}
            style={{ padding: "7px 14px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
              background: active ? `${opt.color}22` : C.bgCard, border: `1px solid ${active ? `${opt.color}66` : C.border}`, color: active ? opt.color : C.textMuted }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${opt.color}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
            {active && <span style={{ marginRight: 4 }}>&#10003;</span>}{opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ChipMulti({ selected, onChange, options, color }) {
  const accent = color || C.teal;
  const toggle = (value) => { if (selected.includes(value)) onChange(selected.filter(v => v !== value)); else onChange([...selected, value]); };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <button key={opt.value} onClick={() => toggle(opt.value)}
            style={{ padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
              background: active ? `${accent}22` : C.bgCard, border: `1px solid ${active ? `${accent}66` : C.border}`, color: active ? accent : C.textMuted }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
            {active && <span style={{ marginRight: 4 }}>&#10003;</span>}{opt.label}
          </button>
        );
      })}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text", style: s = {}, ...rest }) {
  return (
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none", transition: "border-color 0.2s", ...s }}
      onFocus={e => e.target.style.borderColor = `${C.teal}66`}
      onBlur={e => e.target.style.borderColor = C.border} {...rest} />
  );
}

// ── Mini Calendar ───────────────────────────────────────────────────────────

function MiniCalendar({ year, month, sessions, today, onDayClick, onPrev, onNext, onToday }) {
  const days = getCalendarDays(year, month);

  // Build a map: dateStr -> { pnl, tradeCount, result }
  const sessionMap = {};
  sessions.forEach(s => {
    sessionMap[s.date] = {
      pnl: sessionPnl(s),
      tradeCount: s.trades.length,
      result: sessionResult(s),
    };
  });

  // Sunday-start
  const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Monthly P&L (only counts days in the visible month with a logged P&L)
  const monthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  let monthlyPnl = 0;
  let monthlyHasAny = false;
  sessions.forEach(s => {
    if (s.date.startsWith(monthPrefix) && sessionMap[s.date]?.pnl !== null) {
      monthlyPnl += sessionMap[s.date].pnl;
      monthlyHasAny = true;
    }
  });

  // Chunk days into rows of 7 so we can append a weekly-summary cell per row
  const rows = [];
  for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));

  const cellColor = (result) => {
    if (result === "green") return { bg: `${C.green}14`, border: `${C.green}40`, text: C.green };
    if (result === "red") return { bg: `${C.coral}14`, border: `${C.coral}40`, text: C.coral };
    if (result === "breakeven") return { bg: `${C.amber}14`, border: `${C.amber}40`, text: C.amber };
    return null;
  };

  // Today button shown only when viewing a different month
  const now = new Date();
  const viewingCurrentMonth = year === now.getFullYear() && month === now.getMonth();

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 16px 12px", marginBottom: 24 }}>
      {/* Month header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <button onClick={onPrev} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 13, cursor: "pointer", padding: "4px 10px", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.teal}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>{"<"}</button>
        <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500, color: C.textPrimary }}>{monthLabel(year, month)}</span>
        <button onClick={onNext} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 13, cursor: "pointer", padding: "4px 10px", transition: "color 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.color = C.teal}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>{">"}</button>
      </div>

      {/* Monthly P&L + Today button row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, minHeight: 18 }}>
        <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>MONTH</span>
        {monthlyHasAny ? (
          <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: monthlyPnl > 0 ? C.green : monthlyPnl < 0 ? C.coral : C.textMuted }}>
            {formatPnl(monthlyPnl)}
          </span>
        ) : (
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>--</span>
        )}
        {!viewingCurrentMonth ? (
          <button onClick={onToday} style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, letterSpacing: 0.5, cursor: "pointer", padding: "2px 8px", transition: "color 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.teal}
            onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>TODAY</button>
        ) : <span style={{ width: 48 }} />}
      </div>

      {/* Day-of-week headers + "Wk" column */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr) 0.9fr", gap: 2, marginBottom: 4 }}>
        {DOW.map(d => (
          <div key={d} style={{ textAlign: "center", fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.5, padding: "2px 0" }}>{d}</div>
        ))}
        <div style={{ textAlign: "center", fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.5, padding: "2px 0" }}>Wk</div>
      </div>

      {/* Weekly rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {rows.map((week, rowIdx) => {
          // Weekly P&L across the days in this row (logged sessions only)
          let weekPnl = 0;
          let weekHasAny = false;
          week.forEach(day => {
            if (day === null) return;
            const ds = padDateStr(year, month, day);
            const entry = sessionMap[ds];
            if (entry && entry.pnl !== null) {
              weekPnl += entry.pnl;
              weekHasAny = true;
            }
          });
          const weekColor = weekHasAny ? (weekPnl > 0 ? C.green : weekPnl < 0 ? C.coral : C.amber) : C.textMuted;

          return (
            <div key={rowIdx} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr) 0.9fr", gap: 2 }}>
              {week.map((day, i) => {
                if (day === null) return <div key={`empty-${rowIdx}-${i}`} />;
                const ds = padDateStr(year, month, day);
                const entry = sessionMap[ds];
                const result = entry?.result;
                const pnl = entry?.pnl ?? null;
                const isToday = ds === today;
                const hasEntry = !!result;
                const hasPnl = pnl !== null;
                const isFuture = ds > today;
                const colors = result ? cellColor(result) : null;

                return (
                  <button key={ds} onClick={() => !isFuture && onDayClick(ds, hasEntry)}
                    title={hasPnl ? `${formatDate(ds)} · ${formatPnl(pnl)} · ${entry.tradeCount} trade${entry.tradeCount === 1 ? "" : "s"}` : formatDate(ds)}
                    style={{
                      aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      background: isToday ? `${C.teal}12` : colors ? colors.bg : "transparent",
                      border: isToday ? `1px solid ${C.teal}66` : colors ? `1px solid ${colors.border}` : "1px solid transparent",
                      borderRadius: 6, cursor: isFuture ? "default" : "pointer",
                      opacity: isFuture ? 0.3 : 1,
                      padding: 0,
                      transition: "all 0.15s",
                      overflow: "hidden",
                    }}
                    onMouseEnter={e => { if (!isFuture && !isToday && !colors) e.currentTarget.style.borderColor = `${C.teal}33`; }}
                    onMouseLeave={e => { if (!isFuture && !isToday && !colors) e.currentTarget.style.borderColor = "transparent"; }}>
                    <span style={{ fontFamily: F.mono, fontSize: 10, lineHeight: 1, color: isToday ? C.teal : hasEntry ? C.textPrimary : C.textMuted }}>{day}</span>
                    {hasPnl && (
                      <span style={{ fontFamily: F.mono, fontSize: 9, fontWeight: 500, lineHeight: 1.2, marginTop: 3, letterSpacing: "-0.3px", color: colors.text, whiteSpace: "nowrap" }}>{formatPnlCompact(pnl)}</span>
                    )}
                    {hasEntry && !hasPnl && (
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: C.textMuted, marginTop: 3 }} />
                    )}
                  </button>
                );
              })}
              {/* Pad any short final row so the week cell aligns */}
              {Array.from({ length: 7 - week.length }).map((_, i) => (
                <div key={`pad-${rowIdx}-${i}`} />
              ))}
              {/* Weekly summary cell */}
              <div style={{
                aspectRatio: "1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                background: weekHasAny ? `${weekColor}0A` : "transparent",
                borderLeft: weekHasAny ? `2px solid ${weekColor}55` : `1px solid ${C.border}`,
                borderTop: "1px solid transparent", borderRight: "1px solid transparent", borderBottom: "1px solid transparent",
                borderRadius: 0, padding: 0, overflow: "hidden",
              }}>
                <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 0.3 }}>W{rowIdx + 1}</span>
                {weekHasAny ? (
                  <span style={{ fontFamily: F.mono, fontSize: 9, fontWeight: 500, lineHeight: 1.2, marginTop: 3, letterSpacing: "-0.3px", color: weekColor, whiteSpace: "nowrap" }}>{formatPnlCompact(weekPnl)}</span>
                ) : (
                  <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>--</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Trade Editor Row ─────────────────────────────────────────────────────────

const PRIMARY_CONTRACTS = ["ES", "MES", "NQ", "MNQ", "CL", "GC"];

function TradeEditor({ trade, index, playbooks, onChange, onRemove, canRemove }) {
  const [showAllContracts, setShowAllContracts] = useState(false);
  const update = (field, value) => onChange({ ...trade, [field]: value });
  const pnl = calcTradePnl(trade);
  const actualRR = calcActualRR(trade);
  const isDirect = trade.pnlMode === "direct";
  const visibleContracts = showAllContracts ? CONTRACTS : CONTRACTS.filter(c => PRIMARY_CONTRACTS.includes(c.value));

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px", marginBottom: 10 }}>
      {/* Trade header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: 1 }}>TRADE {index + 1}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {pnl !== null && !isNaN(pnl) && (
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
          )}
          {actualRR !== null && (
            <span style={{ fontFamily: F.mono, fontSize: 11, color: actualRR >= 0 ? C.green : C.coral, padding: "2px 6px", background: `${actualRR >= 0 ? C.green : C.coral}12`, borderRadius: 3 }}>{actualRR >= 0 ? "+" : ""}{actualRR.toFixed(1)}R</span>
          )}
          {canRemove && (
            <button onClick={onRemove} style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", padding: "2px 6px" }}
              onMouseEnter={e => e.currentTarget.style.color = C.coral}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>&#10005;</button>
          )}
        </div>
      </div>

      {/* Contract chips */}
      <div style={{ marginBottom: 12 }}>
        <Label>Contract</Label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {visibleContracts.map(c => {
            const active = trade.contract === c.value;
            return (
              <button key={c.value} onClick={() => update("contract", c.value)}
                style={{ padding: "7px 14px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 12, fontWeight: active ? 600 : 400, transition: "all 0.15s",
                  background: active ? `${C.teal}22` : C.bg, border: `1px solid ${active ? `${C.teal}66` : C.border}`, color: active ? C.teal : C.textMuted }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${C.teal}44`; e.currentTarget.style.color = C.textSecondary; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
                {active && <span style={{ marginRight: 4 }}>&#10003;</span>}{c.label}
              </button>
            );
          })}
          {!showAllContracts && (
            <button onClick={() => setShowAllContracts(true)}
              style={{ padding: "7px 12px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, background: "transparent", border: `1px dashed ${C.border}`, color: C.textMuted }}>
              more...
            </button>
          )}
          {showAllContracts && (
            <button onClick={() => setShowAllContracts(false)}
              style={{ padding: "7px 12px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, background: "transparent", border: `1px dashed ${C.border}`, color: C.textMuted }}>
              less
            </button>
          )}
        </div>
      </div>

      {/* Direction + Qty */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ flex: "1 1 160px" }}>
          <Label>Direction</Label>
          <ChipSelect value={trade.direction} onChange={v => update("direction", v || "long")} options={DIRECTIONS} />
        </div>
        <div style={{ flex: "0 0 80px" }}>
          <Label>Qty</Label>
          <Input value={trade.qty} onChange={v => update("qty", v)} type="number" placeholder="1" style={{ width: "100%" }} />
        </div>
      </div>

      {/* P&L Mode toggle */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Label>P&L</Label>
          <div style={{ display: "flex", gap: 2, background: C.bg, borderRadius: 4, padding: 2 }}>
            {[{ value: "direct", label: "$ Amount" }, { value: "prices", label: "Entry/Exit" }].map(mode => (
              <button key={mode.value} onClick={() => update("pnlMode", mode.value)}
                style={{ padding: "4px 10px", borderRadius: 3, border: "none", cursor: "pointer", fontFamily: F.mono, fontSize: 10,
                  background: trade.pnlMode === mode.value ? C.bgSurface : "transparent",
                  color: trade.pnlMode === mode.value ? C.textPrimary : C.textMuted, transition: "all 0.15s" }}>
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        {isDirect ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 4 }}>
              {[{ value: "win", label: "Win", color: C.green }, { value: "loss", label: "Loss", color: C.coral }].map(opt => {
                const active = trade.pnlResult === opt.value;
                return (
                  <button key={opt.value} onClick={() => update("pnlResult", opt.value)}
                    style={{ padding: "7px 16px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 12, fontWeight: active ? 600 : 400, transition: "all 0.15s",
                      background: active ? `${opt.color}22` : C.bg, border: `1px solid ${active ? `${opt.color}66` : C.border}`, color: active ? opt.color : C.textMuted }}>
                    {active && <span style={{ marginRight: 4 }}>&#10003;</span>}{opt.label}
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flex: "0 1 180px" }}>
              <span style={{ fontFamily: F.mono, fontSize: 16, color: trade.pnlResult === "loss" ? C.coral : C.green }}>$</span>
              <Input value={trade.pnlManual} onChange={v => update("pnlManual", v.replace(/^-/, ""))} type="number" placeholder="0.00" style={{ flex: 1 }} step="any" min="0" />
            </div>
            {trade.pnlManual && (
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: trade.pnlResult === "loss" ? C.coral : C.green }}>
                {trade.pnlResult === "loss" ? "-" : "+"}${parseFloat(trade.pnlManual || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 140px" }}>
              <Input value={trade.entry} onChange={v => update("entry", v)} type="number" placeholder="Entry price" style={{ width: "100%" }} step="any" />
            </div>
            <div style={{ flex: "1 1 140px" }}>
              <Input value={trade.exit} onChange={v => update("exit", v)} type="number" placeholder="Exit price" style={{ width: "100%" }} step="any" />
            </div>
          </div>
        )}
      </div>

      {/* Risk & Reward */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 140px" }}>
          <Label color={C.coral}>Planned risk $</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted }}>$</span>
            <Input value={trade.plannedRisk} onChange={v => update("plannedRisk", v)} type="number" placeholder="0" style={{ flex: 1 }} step="any" />
          </div>
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <Label color={C.green}>Planned target $</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted }}>$</span>
            <Input value={trade.plannedTarget} onChange={v => update("plannedTarget", v)} type="number" placeholder="0" style={{ flex: 1 }} step="any" />
          </div>
        </div>
        {trade.plannedRisk && trade.plannedTarget && parseFloat(trade.plannedRisk) > 0 && (
          <div style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: 2 }}>
            <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 4 }}>PLANNED R:R</span>
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: C.amber }}>
              1:{(parseFloat(trade.plannedTarget) / parseFloat(trade.plannedRisk)).toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Playbook chips */}
      {playbooks.length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <Label>Playbook (optional)</Label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {trade.playbookId && (
              <button onClick={() => { update("playbookId", ""); update("followedPlan", ""); }}
                style={{ padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted }}>
                None
              </button>
            )}
            {playbooks.map(pb => {
              const active = trade.playbookId === pb.id;
              return (
                <button key={pb.id} onClick={() => update("playbookId", active ? "" : pb.id)}
                  style={{ padding: "6px 12px", borderRadius: 4, cursor: "pointer", fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
                    background: active ? `${C.blue}22` : C.bg, border: `1px solid ${active ? `${C.blue}66` : C.border}`, color: active ? C.blue : C.textMuted }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${C.blue}44`; e.currentTarget.style.color = C.textSecondary; } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
                  {active && <span style={{ marginRight: 4 }}>&#10003;</span>}{pb.name || "Untitled"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {trade.playbookId && (
        <div style={{ marginBottom: 12 }}>
          <Label>Followed plan?</Label>
          <ChipSelect value={trade.followedPlan} onChange={v => update("followedPlan", v)} options={FOLLOWED_PLAN} />
        </div>
      )}

      {/* Emotions */}
      <div style={{ marginBottom: 8 }}>
        <Label color={C.purple}>Emotional state (optional)</Label>
        <ChipMulti selected={trade.emotions} onChange={v => update("emotions", v)} options={EMOTIONS} color={C.purple} />
      </div>

      {/* Market conditions */}
      <div style={{ marginBottom: 8 }}>
        <Label color={C.blue}>Market conditions (optional)</Label>
        <ChipMulti selected={trade.marketConditions} onChange={v => update("marketConditions", v)} options={MARKET_CONDITIONS} color={C.blue} />
      </div>

      {/* Mistakes */}
      <div style={{ marginBottom: 8 }}>
        <Label color={C.coral}>Mistakes (optional)</Label>
        <ChipMulti selected={trade.mistakes} onChange={v => update("mistakes", v)} options={MISTAKES} color={C.coral} />
      </div>

      {/* Note */}
      <div>
        <Label>Note (optional)</Label>
        <Input value={trade.note} onChange={v => update("note", v)} placeholder="Quick note about this trade" style={{ width: "100%" }} />
      </div>
    </div>
  );
}

// ── Trade View Row ───────────────────────────────────────────────────────────

function TradeView({ trade, index, playbooks }) {
  const pnl = calcTradePnl(trade);
  const actualRR = calcActualRR(trade);
  const dirMeta = DIRECTIONS.find(d => d.value === trade.direction) || DIRECTIONS[0];
  const pb = playbooks.find(p => p.id === trade.playbookId);
  const followedMeta = FOLLOWED_PLAN.find(f => f.value === trade.followedPlan);
  const hasRisk = trade.plannedRisk && parseFloat(trade.plannedRisk) > 0;
  const hasTarget = trade.plannedTarget && parseFloat(trade.plannedTarget) > 0;
  const plannedRR = hasRisk && hasTarget ? (parseFloat(trade.plannedTarget) / parseFloat(trade.plannedRisk)).toFixed(1) : null;

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${dirMeta.color}`, borderRadius: 4, padding: "14px 16px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>#{index + 1}</span>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{trade.contract}</span>
          <span style={{ padding: "2px 8px", background: `${dirMeta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: dirMeta.color }}>{dirMeta.label}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{trade.qty || 1}ct</span>
          {trade.pnlMode !== "direct" && trade.entry && trade.exit && (
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{trade.entry} → {trade.exit}</span>
          )}
          {pb && <span style={{ padding: "2px 8px", background: `${C.blue}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.blue }}>{pb.name || "Untitled"}</span>}
          {followedMeta && <span style={{ padding: "2px 8px", background: `${followedMeta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: followedMeta.color }}>Plan: {followedMeta.label}</span>}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {actualRR !== null && (
            <span style={{ fontFamily: F.mono, fontSize: 11, color: actualRR >= 0 ? C.green : C.coral, padding: "2px 6px", background: `${actualRR >= 0 ? C.green : C.coral}12`, borderRadius: 3 }}>{actualRR >= 0 ? "+" : ""}{actualRR.toFixed(1)}R</span>
          )}
          {pnl !== null && !isNaN(pnl) && (
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
          )}
        </div>
      </div>
      {(hasRisk || hasTarget || plannedRR) && (
        <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
          {hasRisk && <span style={{ fontFamily: F.mono, fontSize: 10, color: C.coral }}>Risk: ${trade.plannedRisk}</span>}
          {hasTarget && <span style={{ fontFamily: F.mono, fontSize: 10, color: C.green }}>Target: ${trade.plannedTarget}</span>}
          {plannedRR && <span style={{ fontFamily: F.mono, fontSize: 10, color: C.amber }}>Planned 1:{plannedRR}</span>}
        </div>
      )}
      {trade.emotions && trade.emotions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {trade.emotions.map(em => (
            <span key={em} style={{ padding: "2px 6px", background: `${C.purple}12`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.purple }}>{EMOTIONS.find(o => o.value === em)?.label || em}</span>
          ))}
        </div>
      )}
      {trade.marketConditions && trade.marketConditions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 6, flexWrap: "wrap" }}>
          {trade.marketConditions.map(mc => (
            <span key={mc} style={{ padding: "2px 6px", background: `${C.blue}12`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.blue }}>{MARKET_CONDITIONS.find(o => o.value === mc)?.label || mc}</span>
          ))}
        </div>
      )}
      {trade.mistakes && trade.mistakes.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {trade.mistakes.map(m => (
            <span key={m} style={{ padding: "2px 6px", background: `${C.coral}12`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.coral }}>{MISTAKES.find(o => o.value === m)?.label || m}</span>
          ))}
        </div>
      )}
      {trade.note && <p style={{ fontSize: 12, color: C.textSecondary, marginTop: 6, lineHeight: 1.5 }}>{trade.note}</p>}
    </div>
  );
}

// ── Session Editor ───────────────────────────────────────────────────────────

function SessionEditor({ session, playbooks, isNew, onSave, onDelete, onBack, sessions }) {
  const [s, setS] = useState(session);
  const [expanded, setExpanded] = useState(!isNew);
  const [saved, setSaved] = useState(false);
  const [dateConflict, setDateConflict] = useState(false);

  const updateField = (field, value) => {
    if (field === "date") {
      const existing = sessions?.find(sess => sess.date === value && sess.id !== s.id);
      setDateConflict(!!existing);
    }
    setS(prev => ({ ...prev, [field]: value }));
  };
  const updateTrade = (index, trade) => { const trades = [...s.trades]; trades[index] = trade; setS(prev => ({ ...prev, trades })); };
  const addTrade = () => setS(prev => ({ ...prev, trades: [...prev.trades, blankTrade()] }));
  const removeTrade = (index) => setS(prev => ({ ...prev, trades: prev.trades.filter((_, i) => i !== index) }));

  const totalPnl = sessionPnl(s);
  const result = sessionResult(s);
  const meta = RESULT_META[result];
  const wins = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p > 0; }).length;
  const losses = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p < 0; }).length;

  const handleSave = () => {
    if (dateConflict) return;
    onSave(s);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>{"<"} back to journal</button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!isNew && <button onClick={onDelete} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.coral} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>delete</button>}
          {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
          <button onClick={handleSave} disabled={dateConflict}
            style={{ padding: "8px 20px", background: dateConflict ? `${C.textMuted}1A` : `${C.teal}1A`, border: `1px solid ${dateConflict ? C.textMuted : C.teal}44`, borderRadius: 4, color: dateConflict ? C.textMuted : C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: dateConflict ? "not-allowed" : "pointer", transition: "background 0.2s", opacity: dateConflict ? 0.5 : 1 }}
            onMouseEnter={el => { if (!dateConflict) el.currentTarget.style.background = `${C.teal}33`; }}
            onMouseLeave={el => { if (!dateConflict) el.currentTarget.style.background = `${C.teal}1A`; }}>{isNew ? "log session" : "save changes"}</button>
        </div>
      </div>

      <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 6, lineHeight: 1.15 }}>
        {isNew ? "Log Trades" : `Session: ${formatDate(s.date)}`}
      </h2>

      {/* Live summary */}
      {s.trades.some(t => calcTradePnl(t) !== null) && (
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
          <span style={{ padding: "4px 10px", background: `${meta.color}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: meta.color }}>{meta.label}</span>
          <span style={{ fontFamily: F.mono, fontSize: 20, fontWeight: 600, color: totalPnl >= 0 ? C.green : C.coral }}>{formatPnl(totalPnl)}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{s.trades.length} trade{s.trades.length !== 1 ? "s" : ""} · {wins}W {losses}L</span>
        </div>
      )}

      {/* Date */}
      <div style={{ marginBottom: 24 }}>
        <Label>Date</Label>
        <input type="date" value={s.date} onChange={e => updateField("date", e.target.value)}
          style={{ padding: "10px 14px", background: C.bgCard, border: `1px solid ${dateConflict ? C.coral : C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none", colorScheme: "dark" }}
          onFocus={e => e.target.style.borderColor = dateConflict ? C.coral : `${C.teal}66`}
          onBlur={e => e.target.style.borderColor = dateConflict ? C.coral : C.border} />
        {dateConflict && (
          <p style={{ fontFamily: F.mono, fontSize: 11, color: C.coral, marginTop: 6 }}>
            A session already exists for this date. Go back and edit that session instead.
          </p>
        )}
      </div>

      {/* Trades */}
      <div style={{ marginBottom: 20 }}>
        <Label>Trades</Label>
        {s.trades.map((trade, i) => (
          <TradeEditor key={trade.id} trade={trade} index={i} playbooks={playbooks}
            onChange={t => updateTrade(i, t)}
            onRemove={() => removeTrade(i)}
            canRemove={s.trades.length > 1} />
        ))}
        <button onClick={addTrade} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", background: `${C.teal}0D`, border: `1px dashed ${C.teal}44`, borderRadius: 6, color: C.teal, fontFamily: F.mono, fontSize: 12, cursor: "pointer", marginTop: 4 }}>
          + add trade
        </button>
      </div>

      <div style={{ height: 1, background: C.border, marginBottom: 24 }} />

      {/* Session reflection (expandable) */}
      <button onClick={() => setExpanded(!expanded)}
        style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", background: "transparent", border: "none", color: C.textSecondary, fontFamily: F.mono, fontSize: 12, cursor: "pointer", marginBottom: expanded ? 20 : 8, width: "100%" }}>
        <span style={{ color: C.teal, transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>{">"}</span>
        {expanded ? "hide session reflection" : "add session reflection (optional)"}
      </button>

      {expanded && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <Label color={C.green}>What worked</Label>
            <textarea value={s.whatWorked} onChange={e => updateField("whatWorked", e.target.value)} placeholder="Setups that played out, good decisions" rows={3}
              style={{ width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none", resize: "vertical", lineHeight: 1.7 }}
              onFocus={e => e.target.style.borderColor = `${C.green}66`} onBlur={e => e.target.style.borderColor = C.border} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Label color={C.coral}>What didn't work</Label>
            <textarea value={s.whatDidnt} onChange={e => updateField("whatDidnt", e.target.value)} placeholder="Bad entries, missed exits, rules broken" rows={3}
              style={{ width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none", resize: "vertical", lineHeight: 1.7 }}
              onFocus={e => e.target.style.borderColor = `${C.coral}66`} onBlur={e => e.target.style.borderColor = C.border} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Label>Notes</Label>
            <textarea value={s.notes} onChange={e => updateField("notes", e.target.value)} placeholder="Anything else. Observations, context, lessons." rows={3}
              style={{ width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none", resize: "vertical", lineHeight: 1.7 }}
              onFocus={e => e.target.style.borderColor = `${C.teal}66`} onBlur={e => e.target.style.borderColor = C.border} />
          </div>
        </div>
      )}

      {/* Bottom save */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, padding: "20px 0", borderTop: `1px solid ${C.border}`, marginBottom: 28 }}>
        {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
        <button onClick={handleSave} disabled={dateConflict}
          style={{ padding: "8px 20px", background: dateConflict ? `${C.textMuted}1A` : `${C.teal}1A`, border: `1px solid ${dateConflict ? C.textMuted : C.teal}44`, borderRadius: 4, color: dateConflict ? C.textMuted : C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: dateConflict ? "not-allowed" : "pointer", opacity: dateConflict ? 0.5 : 1 }}
          onMouseEnter={el => { if (!dateConflict) el.currentTarget.style.background = `${C.teal}33`; }}
          onMouseLeave={el => { if (!dateConflict) el.currentTarget.style.background = `${C.teal}1A`; }}>{isNew ? "log session" : "save changes"}</button>
      </div>
    </div>
  );
}

// ── Session Viewer ───────────────────────────────────────────────────────────

function SessionViewer({ session, playbooks, onEdit, onBack }) {
  const s = session;
  const pnl = sessionPnl(s);
  const result = sessionResult(s);
  const meta = RESULT_META[result];
  const wins = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p > 0; }).length;
  const losses = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p < 0; }).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>{"<"} back to journal</button>
        <button onClick={onEdit} style={{ padding: "8px 20px", background: `${C.blue}1A`, border: `1px solid ${C.blue}44`, borderRadius: 4, color: C.blue, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: "pointer" }}>edit session</button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", background: `${meta.color}22`, color: meta.color, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>{meta.label}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{s.trades.length} trade{s.trades.length !== 1 ? "s" : ""} · {wins}W {losses}L</span>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>{formatDate(s.date)}</h1>
        {pnl !== null && <p style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</p>}
      </div>

      {/* Trade list */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 10 }}>TRADES</p>
        {s.trades.map((trade, i) => <TradeView key={trade.id} trade={trade} index={i} playbooks={playbooks} />)}
      </div>

      {/* Session reflection */}
      {(s.whatWorked || s.whatDidnt) && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 32 }}>
          {s.whatWorked && (
            <div style={{ padding: "16px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.green}`, borderRadius: 4 }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: 1, marginBottom: 8 }}>WHAT WORKED</p>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{s.whatWorked}</p>
            </div>
          )}
          {s.whatDidnt && (
            <div style={{ padding: "16px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.coral}`, borderRadius: 4 }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, marginBottom: 8 }}>WHAT DIDN'T</p>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{s.whatDidnt}</p>
            </div>
          )}
        </div>
      )}

      {s.notes && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>NOTES</p>
          {s.notes.split("\n").map((line, i) => <p key={i} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: line ? 8 : 16 }}>{line || "\u00A0"}</p>)}
        </div>
      )}
    </div>
  );
}

// ── Stats Panel ──────────────────────────────────────────────────────────────

function StatsPanel({ sessions, playbooks }) {
  const allTrades = sessions.flatMap(s => s.trades);
  const tradesWithPnl = allTrades.filter(t => calcTradePnl(t) !== null);
  const totalPnl = tradesWithPnl.reduce((s, t) => s + calcTradePnl(t), 0);
  const winTrades = tradesWithPnl.filter(t => calcTradePnl(t) > 0);
  const lossTrades = tradesWithPnl.filter(t => calcTradePnl(t) < 0);
  const tradeWinRate = tradesWithPnl.length > 0 ? Math.round((winTrades.length / tradesWithPnl.length) * 100) : 0;
  const avgWin = winTrades.length > 0 ? winTrades.reduce((s, t) => s + calcTradePnl(t), 0) / winTrades.length : 0;
  const avgLoss = lossTrades.length > 0 ? lossTrades.reduce((s, t) => s + calcTradePnl(t), 0) / lossTrades.length : 0;

  const tradesWithRR = allTrades.filter(t => calcActualRR(t) !== null);
  const winRRTrades = tradesWithRR.filter(t => calcTradePnl(t) > 0);
  const avgWinRR = winRRTrades.length > 0 ? winRRTrades.reduce((s, t) => s + calcActualRR(t), 0) / winRRTrades.length : null;

  const tradesWithTarget = allTrades.filter(t => {
    const target = parseFloat(t.plannedTarget);
    const pnl = calcTradePnl(t);
    return target > 0 && pnl !== null;
  });
  const hitTarget = tradesWithTarget.filter(t => calcTradePnl(t) >= parseFloat(t.plannedTarget)).length;
  const targetRate = tradesWithTarget.length > 0 ? Math.round((hitTarget / tradesWithTarget.length) * 100) : null;

  const sessionsWithPnl = sessions.filter(s => sessionPnl(s) !== null);
  const greenDays = sessionsWithPnl.filter(s => sessionPnl(s) > 0).length;
  const dayWinRate = sessionsWithPnl.length > 0 ? Math.round((greenDays / sessionsWithPnl.length) * 100) : 0;

  const pbCounts = {};
  allTrades.forEach(t => { if (t.playbookId) pbCounts[t.playbookId] = (pbCounts[t.playbookId] || 0) + 1; });
  const topPbId = Object.entries(pbCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topPb = playbooks.find(p => p.id === topPbId);

  const contractCounts = {};
  allTrades.forEach(t => { contractCounts[t.contract] = (contractCounts[t.contract] || 0) + 1; });
  const topContract = Object.entries(contractCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "--";

  const stats = [
    { label: "Sessions", value: sessions.length, color: C.textPrimary },
    { label: "Total trades", value: allTrades.length, color: C.textPrimary },
    { label: "Trade win rate", value: tradesWithPnl.length > 0 ? `${tradeWinRate}%` : "--", color: tradeWinRate >= 50 ? C.green : tradeWinRate > 0 ? C.coral : C.textMuted },
    { label: "Day win rate", value: sessionsWithPnl.length > 0 ? `${dayWinRate}%` : "--", color: dayWinRate >= 50 ? C.green : dayWinRate > 0 ? C.coral : C.textMuted },
    { label: "Total P&L", value: tradesWithPnl.length > 0 ? formatPnl(totalPnl) : "--", color: totalPnl > 0 ? C.green : totalPnl < 0 ? C.coral : C.textMuted },
    { label: "Avg win", value: winTrades.length > 0 ? formatPnl(avgWin) : "--", color: C.green },
    { label: "Avg loss", value: lossTrades.length > 0 ? formatPnl(avgLoss) : "--", color: C.coral },
    { label: "Avg win R:R", value: avgWinRR !== null ? `${avgWinRR.toFixed(1)}R` : "--", color: C.amber },
    { label: "Target hit", value: targetRate !== null ? `${targetRate}%` : "--", color: targetRate !== null && targetRate >= 50 ? C.green : C.textMuted },
    { label: "Top contract", value: topContract, color: C.teal },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 10, marginBottom: 24 }}>
      {stats.map(s => (
        <div key={s.label} style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>{s.label.toUpperCase()}</p>
          <p style={{ fontFamily: F.mono, fontSize: 17, color: s.color, fontWeight: 500 }}>{s.value}</p>
        </div>
      ))}
      {topPb && (
        <div style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>TOP PLAYBOOK</p>
          <p style={{ fontFamily: F.mono, fontSize: 13, color: C.blue, fontWeight: 500 }}>{topPb.name || "Untitled"}</p>
        </div>
      )}
    </div>
  );
}

// ── Day Card (list view) ────────────────────────────────────────────────────

function DayCard({ session, playbooks, onOpen }) {
  const pnl = sessionPnl(session);
  const result = sessionResult(session);
  const meta = RESULT_META[result];
  const wins = session.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p > 0; }).length;
  const losses = session.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p < 0; }).length;
  const contracts = [...new Set(session.trades.map(t => t.contract).filter(c => c !== "OTHER"))];

  return (
    <div onClick={onOpen}
      style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${meta.color}`, borderRadius: 6, padding: "16px 20px", cursor: "pointer", transition: "border-color 0.2s", marginBottom: 10 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${meta.color}44`}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      {/* Day header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 14, color: C.textPrimary, fontWeight: 500 }}>{formatDate(session.date)}</span>
          <span style={{ padding: "3px 8px", background: `${meta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: meta.color }}>{meta.label}</span>
        </div>
        {pnl !== null && (
          <span style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
        )}
      </div>

      {/* Trade count + contracts */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{session.trades.length} trade{session.trades.length !== 1 ? "s" : ""} · {wins}W {losses}L</span>
        {contracts.length > 0 && (
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{contracts.join(", ")}</span>
        )}
      </div>

      {/* Inline trade previews */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 8 }}>
        {session.trades.slice(0, 5).map((trade, i) => {
          const tPnl = calcTradePnl(trade);
          const dirMeta = DIRECTIONS.find(d => d.value === trade.direction) || DIRECTIONS[0];
          return (
            <div key={trade.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, width: 18 }}>#{i + 1}</span>
                <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: C.textPrimary }}>{trade.contract}</span>
                <span style={{ fontFamily: F.mono, fontSize: 9, padding: "1px 5px", background: `${dirMeta.color}12`, borderRadius: 3, color: dirMeta.color }}>{dirMeta.label}</span>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{trade.qty || 1}ct</span>
              </div>
              {tPnl !== null && !isNaN(tPnl) && (
                <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: tPnl >= 0 ? C.green : C.coral }}>{formatPnl(tPnl)}</span>
              )}
            </div>
          );
        })}
        {session.trades.length > 5 && (
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 4 }}>+{session.trades.length - 5} more trade{session.trades.length - 5 !== 1 ? "s" : ""}</p>
        )}
      </div>

      {/* Emotions preview */}
      {(() => {
        const allEmotions = [...new Set(session.trades.flatMap(t => t.emotions || []))];
        return allEmotions.length > 0 ? (
          <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
            {allEmotions.map(e => <span key={e} style={{ padding: "2px 6px", background: C.bgSurface, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>{EMOTIONS.find(o => o.value === e)?.label || e}</span>)}
          </div>
        ) : null;
      })()}
    </div>
  );
}

// ── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({ label, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px 24px", maxWidth: 420, width: "100%" }}>
        <p style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Delete session?</p>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 20 }}>
          This will permanently delete the session for <strong style={{ color: C.textPrimary }}>{label}</strong> and all its trades. This cannot be undone.
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 12, cursor: "pointer" }}>cancel</button>
          <button onClick={onConfirm} style={{ padding: "8px 16px", background: `${C.coral}22`, border: `1px solid ${C.coral}44`, borderRadius: 4, color: C.coral, fontFamily: F.mono, fontSize: 12, cursor: "pointer" }}>delete</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Client ──────────────────────────────────────────────────────────────

export default function JournalClient() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);
  const [view, setView] = useState("list");
  const [activeId, setActiveId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterResult, setFilterResult] = useState("");
  const [filterContract, setFilterContract] = useState("");
  const [loaded, setLoaded] = useState(false);

  // Calendar state
  const now = new Date();
  const [calYear, setCalYear] = useState(now.getFullYear());
  const [calMonth, setCalMonth] = useState(now.getMonth());

  // Pending date for new sessions created from calendar click
  const [pendingDate, setPendingDate] = useState(null);

  const today = todayStr();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [sessData, pbData] = await Promise.all([
        fetchSessions(user),
        fetchPlaybooksRemote(user),
      ]);
      if (!cancelled) {
        setSessions(sessData);
        setPlaybooks(pbData);
        setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  const activeSession = sessions.find(s => s.id === activeId) || null;

  const sortedSessions = useMemo(() => {
    let filtered = [...sessions].sort((a, b) => b.date.localeCompare(a.date));
    if (filterResult) filtered = filtered.filter(s => sessionResult(s) === filterResult);
    if (filterContract) filtered = filtered.filter(s => s.trades.some(t => t.contract === filterContract));
    return filtered;
  }, [sessions, filterResult, filterContract]);

  // Smart "log today's trades" — opens existing session or creates new
  const logToday = () => {
    const existing = sessions.find(s => s.date === today);
    if (existing) {
      setActiveId(existing.id);
      setView("edit");
    } else {
      setPendingDate(today);
      setActiveId(null);
      setView("new");
    }
  };

  // Calendar day click — always check sessions array directly
  const handleDayClick = (dateString) => {
    const existing = sessions.find(s => s.date === dateString);
    if (existing) {
      setActiveId(existing.id);
      setView("view");
    } else {
      setPendingDate(dateString);
      setActiveId(null);
      setView("new");
    }
  };

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
    else setCalMonth(calMonth - 1);
  };
  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
    else setCalMonth(calMonth + 1);
  };
  const goToToday = () => {
    const n = new Date();
    setCalMonth(n.getMonth());
    setCalYear(n.getFullYear());
  };

  const saveSession = async (session) => {
    const exists = sessions.find(s => s.id === session.id);
    let updated;
    if (exists) { updated = sessions.map(s => s.id === session.id ? session : s); }
    else { updated = [session, ...sessions]; }
    setSessions(updated);
    await upsertSession(user, session);
  };

  const confirmDelete = async () => {
    const updated = sessions.filter(s => s.id !== deleteTarget);
    setSessions(updated);
    await deleteSessionRemote(user, deleteTarget);
    if (activeId === deleteTarget) { setActiveId(null); setView("list"); }
    setDeleteTarget(null);
  };

  const hasFilters = filterResult || filterContract;
  const RESULT_FILTERS = [
    { value: "green", label: "Green", color: C.green },
    { value: "red", label: "Red", color: C.coral },
    { value: "breakeven", label: "Breakeven", color: C.amber },
  ];
  const usedContracts = [...new Set(sessions.flatMap(s => s.trades.map(t => t.contract)).filter(c => c !== "OTHER"))].sort();

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <NavBar
        breadcrumbs={view === "list"
          ? [{ label: "journal" }]
          : [{ label: "journal", onClick: () => { setView("list"); setActiveId(null); } }, { label: view === "new" ? "new" : view === "edit" ? "edit" : "view" }]
        }
        sharePath="/journal"
        shareLabel="share this page"
      />

      {/* List View */}
      {view === "list" && (
        <div>
          <div style={{ padding: "48px 0 24px" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>Trading Journal</h1>
            <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700, marginBottom: 20 }}>
              Log individual trades with entry/exit prices. P&L calculates automatically from contract specs. {user ? "Your journal is synced to your account." : "Sign in to sync your journal across devices."}
            </p>
            <button onClick={logToday} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
              onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
              + log today's trades
            </button>
          </div>

          {/* Mini Calendar */}
          <MiniCalendar
            year={calYear} month={calMonth}
            sessions={sessions} today={today}
            onDayClick={handleDayClick}
            onPrev={prevMonth} onNext={nextMonth}
            onToday={goToToday}
          />

          {sessions.length > 0 && <StatsPanel sessions={sessions} playbooks={playbooks} />}

          {/* Equity Curve */}
          <EquityCurve sessions={sessions} />

          {/* Filters */}
          {sessions.length > 2 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>FILTER:</span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {RESULT_FILTERS.map(r => (
                    <button key={r.value} onClick={() => setFilterResult(filterResult === r.value ? "" : r.value)}
                      style={{ padding: "4px 10px", borderRadius: 3, cursor: "pointer", fontFamily: F.mono, fontSize: 10,
                        background: filterResult === r.value ? `${r.color}22` : "transparent",
                        border: `1px solid ${filterResult === r.value ? `${r.color}44` : C.border}`,
                        color: filterResult === r.value ? r.color : C.textMuted }}>
                      {r.label}
                    </button>
                  ))}
                </div>
                {usedContracts.length > 1 && (
                  <select value={filterContract} onChange={e => setFilterContract(e.target.value)}
                    style={{ padding: "4px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 3, color: filterContract ? C.teal : C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer", outline: "none" }}>
                    <option value="">All contracts</option>
                    {usedContracts.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                )}
                {hasFilters && (
                  <button onClick={() => { setFilterResult(""); setFilterContract(""); }}
                    style={{ padding: "4px 10px", background: "transparent", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = C.teal}
                    onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>clear</button>
                )}
              </div>
            </div>
          )}

          {/* Recent days label */}
          {sortedSessions.length > 0 && (
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 12 }}>RECENT DAYS</p>
          )}

          {/* Empty state */}
          {loaded && sessions.length === 0 && (
            <div style={{ padding: "60px 0 80px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 48, color: C.textMuted, marginBottom: 16, opacity: 0.3 }}>{"[ ]"}</p>
              <p style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted, marginBottom: 8 }}>no sessions yet</p>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>Log your first trades to start building your journal.</p>
            </div>
          )}

          {/* Day cards */}
          {sortedSessions.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              {sortedSessions.map(session => (
                <DayCard key={session.id} session={session} playbooks={playbooks}
                  onOpen={() => { setActiveId(session.id); setView("view"); }} />
              ))}
            </div>
          )}

          {sessions.length > 0 && sortedSessions.length === 0 && hasFilters && (
            <div style={{ padding: "40px 0 60px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted }}>No sessions match the current filters.</p>
            </div>
          )}

          {/* Cross-links */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 500, marginBottom: 14 }}><span style={{ color: C.teal }}>$</span> improve your trading</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/playbook"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.blue }}>Playbook {">"}</span></Link>
              <Link href="/strategies"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.purple }}>Strategies {">"}</span></Link>
              <Link href="/glossary"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.teal }}>Glossary {">"}</span></Link>
            </div>
          </div>

          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice . educational content only</p>
          </footer>
        </div>
      )}

      {/* New Session */}
      {view === "new" && (
        <div style={{ paddingTop: 36 }}>
          <SessionEditor session={blankSession(pendingDate || todayStr())} playbooks={playbooks} isNew={true} sessions={sessions}
            onSave={(s) => { saveSession(s); setActiveId(s.id); setView("view"); setPendingDate(null); }}
            onDelete={() => {}} onBack={() => { setView("list"); setPendingDate(null); }} />
        </div>
      )}

      {/* Edit Session */}
      {view === "edit" && activeSession && (
        <div style={{ paddingTop: 36 }}>
          <SessionEditor session={activeSession} playbooks={playbooks} isNew={false} sessions={sessions}
            onSave={(s) => { saveSession(s); setView("view"); }}
            onDelete={() => setDeleteTarget(activeSession.id)}
            onBack={() => setView("view")} />
        </div>
      )}

      {/* View Session */}
      {view === "view" && activeSession && (
        <div style={{ paddingTop: 36 }}>
          <SessionViewer session={activeSession} playbooks={playbooks}
            onEdit={() => setView("edit")}
            onBack={() => { setView("list"); setActiveId(null); }} />
          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice . educational content only</p>
          </footer>
        </div>
      )}

      {deleteTarget && (
        <DeleteModal
          label={formatDate(sessions.find(s => s.id === deleteTarget)?.date || "")}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)} />
      )}
    </div>
  );
}
