"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

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

function loadSessions() {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(JOURNAL_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}
function saveSessions(sessions) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(JOURNAL_KEY, JSON.stringify(sessions)); } catch {}
}
function loadPlaybooks() {
  if (typeof window === "undefined") return [];
  try { const raw = localStorage.getItem(PLAYBOOK_KEY); return raw ? JSON.parse(raw) : []; } catch { return []; }
}

function blankTrade() {
  return {
    id: uid(), contract: "ES", direction: "long",
    entry: "", exit: "", qty: "1",
    pnl: null, pnlManual: "",
    playbookId: "", followedPlan: "",
    mistakes: [], note: "",
  };
}

function blankSession() {
  return {
    id: uid(), date: todayStr(),
    trades: [blankTrade()],
    emotions: [], marketConditions: [],
    whatWorked: "", whatDidnt: "", notes: "",
  };
}

function calcTradePnl(trade) {
  const spec = CONTRACTS.find(c => c.value === trade.contract);
  if (!spec || !spec.pointValue) return trade.pnlManual ? parseFloat(trade.pnlManual) : null;
  const entry = parseFloat(trade.entry);
  const exit = parseFloat(trade.exit);
  const qty = parseInt(trade.qty) || 1;
  if (isNaN(entry) || isNaN(exit)) return trade.pnlManual ? parseFloat(trade.pnlManual) : null;
  const diff = trade.direction === "long" ? exit - entry : entry - exit;
  return diff * spec.pointValue * qty;
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

// ── Reusable Components ──────────────────────────────────────────────────────

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => { navigator.clipboard.writeText(getSiteUrl() + "/journal").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); }); };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

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

// ── Trade Editor Row ─────────────────────────────────────────────────────────

function TradeEditor({ trade, index, playbooks, onChange, onRemove, canRemove }) {
  const update = (field, value) => onChange({ ...trade, [field]: value });
  const pnl = calcTradePnl(trade);
  const spec = CONTRACTS.find(c => c.value === trade.contract);
  const isManual = trade.contract === "OTHER";

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px", marginBottom: 10 }}>
      {/* Trade header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: 1 }}>TRADE {index + 1}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {pnl !== null && !isNaN(pnl) && (
            <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
          )}
          {canRemove && (
            <button onClick={onRemove} style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", padding: "2px 6px" }}
              onMouseEnter={e => e.currentTarget.style.color = C.coral}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>✕</button>
          )}
        </div>
      </div>

      {/* Row 1: Contract, Direction, Qty */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 120px" }}>
          <Label>Contract</Label>
          <select value={trade.contract} onChange={e => update("contract", e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none", cursor: "pointer" }}>
            {CONTRACTS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div style={{ flex: "1 1 120px" }}>
          <Label>Direction</Label>
          <ChipSelect value={trade.direction} onChange={v => update("direction", v || "long")} options={DIRECTIONS} />
        </div>
        <div style={{ flex: "0 0 80px" }}>
          <Label>Qty</Label>
          <Input value={trade.qty} onChange={v => update("qty", v)} type="number" placeholder="1" style={{ width: "100%" }} />
        </div>
      </div>

      {/* Row 2: Entry, Exit (or manual P&L for OTHER) */}
      {isManual ? (
        <div style={{ marginBottom: 12 }}>
          <Label>P&L (manual)</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 200 }}>
            <span style={{ fontFamily: F.mono, fontSize: 16, color: C.textMuted }}>$</span>
            <Input value={trade.pnlManual} onChange={v => update("pnlManual", v)} type="number" placeholder="0.00" style={{ flex: 1 }} />
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 140px" }}>
            <Label>Entry price</Label>
            <Input value={trade.entry} onChange={v => update("entry", v)} type="number" placeholder={spec ? `e.g. ${trade.contract === "ES" ? "5200.50" : "0.00"}` : "0.00"} style={{ width: "100%" }} step="any" />
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <Label>Exit price</Label>
            <Input value={trade.exit} onChange={v => update("exit", v)} type="number" placeholder="0.00" style={{ width: "100%" }} step="any" />
          </div>
        </div>
      )}

      {/* Row 3: Playbook, Followed plan */}
      <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 200px" }}>
          <Label>Playbook (optional)</Label>
          <select value={trade.playbookId} onChange={e => update("playbookId", e.target.value)}
            style={{ width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: trade.playbookId ? C.textPrimary : C.textMuted, fontFamily: F.body, fontSize: 16, outline: "none", cursor: "pointer" }}>
            <option value="">None</option>
            {playbooks.map(pb => <option key={pb.id} value={pb.id}>{pb.name || "Untitled"}</option>)}
          </select>
        </div>
        {trade.playbookId && (
          <div style={{ flex: "1 1 200px" }}>
            <Label>Followed plan?</Label>
            <ChipSelect value={trade.followedPlan} onChange={v => update("followedPlan", v)} options={FOLLOWED_PLAN} />
          </div>
        )}
      </div>

      {/* Row 4: Mistakes, Note */}
      <div style={{ marginBottom: 8 }}>
        <Label color={C.coral}>Mistakes (optional)</Label>
        <ChipMulti selected={trade.mistakes} onChange={v => update("mistakes", v)} options={MISTAKES} color={C.coral} />
      </div>
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
  const dirMeta = DIRECTIONS.find(d => d.value === trade.direction) || DIRECTIONS[0];
  const pb = playbooks.find(p => p.id === trade.playbookId);
  const followedMeta = FOLLOWED_PLAN.find(f => f.value === trade.followedPlan);

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${dirMeta.color}`, borderRadius: 4, padding: "14px 16px", marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, color: C.textMuted }}>#{index + 1}</span>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{trade.contract}</span>
          <span style={{ padding: "2px 8px", background: `${dirMeta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: dirMeta.color }}>{dirMeta.label}</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{trade.qty || 1}ct</span>
          {trade.entry && trade.exit && trade.contract !== "OTHER" && (
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{trade.entry} → {trade.exit}</span>
          )}
          {pb && <span style={{ padding: "2px 8px", background: `${C.blue}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.blue }}>{pb.name || "Untitled"}</span>}
          {followedMeta && <span style={{ padding: "2px 8px", background: `${followedMeta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: followedMeta.color }}>Plan: {followedMeta.label}</span>}
        </div>
        {pnl !== null && !isNaN(pnl) && (
          <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 600, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
        )}
      </div>
      {trade.mistakes.length > 0 && (
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

function SessionEditor({ session, playbooks, isNew, onSave, onDelete, onBack }) {
  const [s, setS] = useState(session);
  const [expanded, setExpanded] = useState(!isNew);
  const [saved, setSaved] = useState(false);

  const updateField = (field, value) => setS(prev => ({ ...prev, [field]: value }));
  const updateTrade = (index, trade) => { const trades = [...s.trades]; trades[index] = trade; setS(prev => ({ ...prev, trades })); };
  const addTrade = () => setS(prev => ({ ...prev, trades: [...prev.trades, blankTrade()] }));
  const removeTrade = (index) => setS(prev => ({ ...prev, trades: prev.trades.filter((_, i) => i !== index) }));

  const totalPnl = sessionPnl(s);
  const result = sessionResult(s);
  const meta = RESULT_META[result];
  const wins = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p > 0; }).length;
  const losses = s.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p < 0; }).length;

  const handleSave = () => { onSave(s); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>{"<"} back to journal</button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!isNew && <button onClick={onDelete} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }} onMouseEnter={e => e.currentTarget.style.color = C.coral} onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>delete</button>}
          {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
          <button onClick={handleSave} style={{ padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}
            onMouseEnter={el => el.currentTarget.style.background = `${C.teal}33`}
            onMouseLeave={el => el.currentTarget.style.background = `${C.teal}1A`}>{isNew ? "log session" : "save changes"}</button>
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
          style={{ padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none", colorScheme: "dark" }}
          onFocus={e => e.target.style.borderColor = `${C.teal}66`}
          onBlur={e => e.target.style.borderColor = C.border} />
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
            <Label color={C.purple}>Emotional state</Label>
            <ChipMulti selected={s.emotions} onChange={v => updateField("emotions", v)} options={EMOTIONS} color={C.purple} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <Label color={C.blue}>Market conditions</Label>
            <ChipMulti selected={s.marketConditions} onChange={v => updateField("marketConditions", v)} options={MARKET_CONDITIONS} color={C.blue} />
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
        <button onClick={handleSave} style={{ padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: "pointer" }}
          onMouseEnter={el => el.currentTarget.style.background = `${C.teal}33`}
          onMouseLeave={el => el.currentTarget.style.background = `${C.teal}1A`}>{isNew ? "log session" : "save changes"}</button>
      </div>

      <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
        <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>NOTE</span>
        Journal entries are saved to this browser only. Clearing your browser data will delete them. Account sync is coming soon.
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

      {(s.emotions.length > 0 || s.marketConditions.length > 0) && (
        <div style={{ marginBottom: 32 }}>
          {s.emotions.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.purple, letterSpacing: 1, marginBottom: 8 }}>EMOTIONAL STATE</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.emotions.map(em => <span key={em} style={{ padding: "5px 10px", background: `${C.purple}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.purple }}>{EMOTIONS.find(o => o.value === em)?.label || em}</span>)}
              </div>
            </div>
          )}
          {s.marketConditions.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.blue, letterSpacing: 1, marginBottom: 8 }}>MARKET CONDITIONS</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.marketConditions.map(mc => <span key={mc} style={{ padding: "5px 10px", background: `${C.blue}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.blue }}>{MARKET_CONDITIONS.find(o => o.value === mc)?.label || mc}</span>)}
              </div>
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

  // Session-level stats
  const sessionsWithPnl = sessions.filter(s => sessionPnl(s) !== null);
  const greenDays = sessionsWithPnl.filter(s => sessionPnl(s) > 0).length;
  const dayWinRate = sessionsWithPnl.length > 0 ? Math.round((greenDays / sessionsWithPnl.length) * 100) : 0;

  // Most used playbook (trade-level)
  const pbCounts = {};
  allTrades.forEach(t => { if (t.playbookId) pbCounts[t.playbookId] = (pbCounts[t.playbookId] || 0) + 1; });
  const topPbId = Object.entries(pbCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topPb = playbooks.find(p => p.id === topPbId);

  // Most traded contract
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
    { label: "Top contract", value: topContract, color: C.teal },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10, marginBottom: 32 }}>
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

// ── Session Card (list view) ─────────────────────────────────────────────────

function SessionCard({ session, playbooks, onOpen }) {
  const pnl = sessionPnl(session);
  const result = sessionResult(session);
  const meta = RESULT_META[result];
  const wins = session.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p > 0; }).length;
  const losses = session.trades.filter(t => { const p = calcTradePnl(t); return p !== null && p < 0; }).length;

  // Unique contracts traded
  const contracts = [...new Set(session.trades.map(t => t.contract).filter(c => c !== "OTHER"))];

  return (
    <div onClick={onOpen}
      style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${meta.color}`, padding: "16px 20px", cursor: "pointer", transition: "border-color 0.2s", marginBottom: 8 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${meta.color}44`}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{formatDate(session.date)}</span>
          <span style={{ padding: "3px 8px", background: `${meta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: meta.color }}>{meta.label}</span>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{session.trades.length} trade{session.trades.length !== 1 ? "s" : ""} · {wins}W {losses}L</span>
          {contracts.length > 0 && (
            <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{contracts.join(", ")}</span>
          )}
        </div>
        {pnl !== null && (
          <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: pnl >= 0 ? C.green : C.coral }}>{formatPnl(pnl)}</span>
        )}
      </div>
      {session.emotions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {session.emotions.map(e => <span key={e} style={{ padding: "2px 6px", background: C.bgSurface, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>{EMOTIONS.find(o => o.value === e)?.label || e}</span>)}
        </div>
      )}
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
  const [sessions, setSessions] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);
  const [view, setView] = useState("list");
  const [activeId, setActiveId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterResult, setFilterResult] = useState("");
  const [filterContract, setFilterContract] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSessions(loadSessions());
    setPlaybooks(loadPlaybooks());
    setLoaded(true);
  }, []);

  const activeSession = sessions.find(s => s.id === activeId) || null;

  const sortedSessions = useMemo(() => {
    let filtered = [...sessions].sort((a, b) => b.date.localeCompare(a.date));
    if (filterResult) filtered = filtered.filter(s => sessionResult(s) === filterResult);
    if (filterContract) filtered = filtered.filter(s => s.trades.some(t => t.contract === filterContract));
    return filtered;
  }, [sessions, filterResult, filterContract]);

  const createNew = () => { setActiveId(null); setView("new"); };

  const saveSession = (session) => {
    const exists = sessions.find(s => s.id === session.id);
    let updated;
    if (exists) { updated = sessions.map(s => s.id === session.id ? session : s); }
    else { updated = [session, ...sessions]; }
    setSessions(updated);
    saveSessions(updated);
  };

  const confirmDelete = () => {
    const updated = sessions.filter(s => s.id !== deleteTarget);
    setSessions(updated);
    saveSessions(updated);
    setDeleteTarget(null);
    if (activeId === deleteTarget) { setActiveId(null); setView("list"); }
  };

  const hasFilters = filterResult || filterContract;
  const RESULT_FILTERS = [
    { value: "green", label: "Green", color: C.green },
    { value: "red", label: "Red", color: C.coral },
    { value: "breakeven", label: "Breakeven", color: C.amber },
  ];
  // Get all contracts used across sessions
  const usedContracts = [...new Set(sessions.flatMap(s => s.trades.map(t => t.contract)).filter(c => c !== "OTHER"))].sort();

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
          {view === "list" ? (
            <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>journal</span>
          ) : (
            <>
              <button onClick={() => { setView("list"); setActiveId(null); }} style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 12, cursor: "pointer", padding: 0 }}>journal</button>
              <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
              <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>{view === "new" ? "new" : view === "edit" ? "edit" : "view"}</span>
            </>
          )}
        </div>
        <ShareBtn label="share this page" />
      </div>

      {/* List View */}
      {view === "list" && (
        <div>
          <div style={{ padding: "48px 0 36px" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>Trading Journal</h1>
            <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
              Log individual trades with entry/exit prices. P&L calculates automatically from contract specs. Daily results roll up from your trades.
            </p>
            <button onClick={createNew} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
              onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
              + log trades
            </button>
          </div>

          {sessions.length > 0 && <StatsPanel sessions={sessions} playbooks={playbooks} />}

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

          {/* Session list */}
          {loaded && sessions.length === 0 && (
            <div style={{ padding: "60px 0 80px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 48, color: C.textMuted, marginBottom: 16, opacity: 0.3 }}>{"[ ]"}</p>
              <p style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted, marginBottom: 8 }}>no sessions yet</p>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>Log your first trades to start building your journal.</p>
            </div>
          )}

          {sortedSessions.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              {sortedSessions.map(session => (
                <SessionCard key={session.id} session={session} playbooks={playbooks}
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
          <SessionEditor session={blankSession()} playbooks={playbooks} isNew={true}
            onSave={(s) => { saveSession(s); setActiveId(s.id); setView("view"); }}
            onDelete={() => {}} onBack={() => setView("list")} />
        </div>
      )}

      {/* Edit Session */}
      {view === "edit" && activeSession && (
        <div style={{ paddingTop: 36 }}>
          <SessionEditor session={activeSession} playbooks={playbooks} isNew={false}
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
