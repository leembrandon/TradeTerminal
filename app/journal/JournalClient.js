"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

const JOURNAL_KEY = "tt_journal";
const PLAYBOOK_KEY = "tt_playbooks";

// ── Options ──────────────────────────────────────────────────────────────────

const RESULTS = [
  { value: "green", label: "Green day", color: C.green },
  { value: "red", label: "Red day", color: C.coral },
  { value: "breakeven", label: "Breakeven", color: C.amber },
  { value: "no-trade", label: "No trade", color: C.textMuted },
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

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function loadEntries() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveEntries(entries) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries)); } catch {}
}

function loadPlaybooks() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLAYBOOK_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function blankEntry() {
  return {
    id: uid(),
    date: todayStr(),
    result: "",
    pnl: "",
    playbookId: "",
    followedPlan: "",
    oneLiner: "",
    // Expandable
    whatWorked: "",
    whatDidnt: "",
    emotions: [],
    marketConditions: [],
    mistakes: [],
    notes: "",
  };
}

function resultMeta(value) {
  return RESULTS.find(r => r.value === value) || { label: value, color: C.textMuted };
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function formatPnl(pnl) {
  if (!pnl && pnl !== 0) return "";
  const n = parseFloat(pnl);
  if (isNaN(n)) return pnl;
  const prefix = n > 0 ? "+" : "";
  return `${prefix}$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

// ── Reusable Components ──────────────────────────────────────────────────────

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + "/journal").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

function Label({ children, color }) {
  return (
    <label style={{ display: "block", fontFamily: F.mono, fontSize: 11, color: color || C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
      {children}
    </label>
  );
}

function ChipSelect({ value, onChange, options }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map(opt => {
        const active = value === opt.value;
        return (
          <button key={opt.value} onClick={() => onChange(active ? "" : opt.value)}
            style={{
              padding: "7px 14px", borderRadius: 4, cursor: "pointer",
              fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
              background: active ? `${opt.color}22` : C.bgCard,
              border: `1px solid ${active ? `${opt.color}66` : C.border}`,
              color: active ? opt.color : C.textMuted,
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${opt.color}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
            {active && <span style={{ marginRight: 4 }}>&#10003;</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function ChipMulti({ selected, onChange, options, color }) {
  const accent = color || C.teal;
  const toggle = (value) => {
    if (selected.includes(value)) onChange(selected.filter(v => v !== value));
    else onChange([...selected, value]);
  };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <button key={opt.value} onClick={() => toggle(opt.value)}
            style={{
              padding: "6px 12px", borderRadius: 4, cursor: "pointer",
              fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
              background: active ? `${accent}22` : C.bgCard,
              border: `1px solid ${active ? `${accent}66` : C.border}`,
              color: active ? accent : C.textMuted,
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}>
            {active && <span style={{ marginRight: 4 }}>&#10003;</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Stats Panel ──────────────────────────────────────────────────────────────

function StatsPanel({ entries, playbooks }) {
  const traded = entries.filter(e => e.result && e.result !== "no-trade");
  const green = traded.filter(e => e.result === "green").length;
  const red = traded.filter(e => e.result === "red").length;
  const winRate = traded.length > 0 ? Math.round((green / traded.length) * 100) : 0;

  const pnlEntries = traded.filter(e => e.pnl !== "" && !isNaN(parseFloat(e.pnl)));
  const totalPnl = pnlEntries.reduce((sum, e) => sum + parseFloat(e.pnl), 0);
  const greenPnl = pnlEntries.filter(e => e.result === "green");
  const redPnl = pnlEntries.filter(e => e.result === "red");
  const avgGreen = greenPnl.length > 0 ? greenPnl.reduce((s, e) => s + parseFloat(e.pnl), 0) / greenPnl.length : 0;
  const avgRed = redPnl.length > 0 ? redPnl.reduce((s, e) => s + parseFloat(e.pnl), 0) / redPnl.length : 0;

  // Current streak
  let streak = 0;
  let streakType = "";
  for (let i = 0; i < traded.length; i++) {
    const sorted = [...traded].sort((a, b) => b.date.localeCompare(a.date));
    if (i === 0) { streakType = sorted[0].result; streak = 1; }
    else if (sorted[i].result === streakType) streak++;
    else break;
  }

  // Most used playbook
  const pbCounts = {};
  entries.forEach(e => { if (e.playbookId) pbCounts[e.playbookId] = (pbCounts[e.playbookId] || 0) + 1; });
  const topPbId = Object.entries(pbCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topPb = playbooks.find(p => p.id === topPbId);

  const stats = [
    { label: "Sessions", value: entries.length, color: C.textPrimary },
    { label: "Win rate", value: traded.length > 0 ? `${winRate}%` : "--", color: winRate >= 50 ? C.green : winRate > 0 ? C.coral : C.textMuted },
    { label: "Streak", value: streak > 0 ? `${streak} ${streakType}` : "--", color: streakType === "green" ? C.green : streakType === "red" ? C.coral : C.textMuted },
    { label: "Total P&L", value: pnlEntries.length > 0 ? formatPnl(totalPnl) : "--", color: totalPnl > 0 ? C.green : totalPnl < 0 ? C.coral : C.textMuted },
    { label: "Avg green", value: greenPnl.length > 0 ? formatPnl(avgGreen) : "--", color: C.green },
    { label: "Avg red", value: redPnl.length > 0 ? formatPnl(avgRed) : "--", color: C.coral },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 10, marginBottom: 32 }}>
      {stats.map(s => (
        <div key={s.label} style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 6 }}>{s.label.toUpperCase()}</p>
          <p style={{ fontFamily: F.mono, fontSize: 18, color: s.color, fontWeight: 500 }}>{s.value}</p>
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

// ── Entry Card (list view) ───────────────────────────────────────────────────

function EntryCard({ entry, playbooks, onOpen }) {
  const meta = resultMeta(entry.result);
  const pb = playbooks.find(p => p.id === entry.playbookId);

  return (
    <div onClick={onOpen}
      style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${meta.color}`, padding: "16px 20px", cursor: "pointer", transition: "border-color 0.2s", marginBottom: 8 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${meta.color}44`}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{formatDate(entry.date)}</span>
          <span style={{ padding: "3px 8px", background: `${meta.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: meta.color }}>{meta.label}</span>
          {pb && <span style={{ padding: "3px 8px", background: `${C.blue}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.blue }}>{pb.name || "Untitled"}</span>}
        </div>
        {entry.pnl !== "" && !isNaN(parseFloat(entry.pnl)) && (
          <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: parseFloat(entry.pnl) >= 0 ? C.green : C.coral }}>
            {formatPnl(entry.pnl)}
          </span>
        )}
      </div>
      {entry.oneLiner && (
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, marginTop: 8 }}>{entry.oneLiner}</p>
      )}
      {entry.emotions.length > 0 && (
        <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
          {entry.emotions.map(e => (
            <span key={e} style={{ padding: "2px 6px", background: C.bgSurface, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>
              {EMOTIONS.find(o => o.value === e)?.label || e}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Entry Editor ─────────────────────────────────────────────────────────────

function EntryEditor({ entry, playbooks, onSave, onDelete, onBack, isNew }) {
  const [e, setE] = useState(entry);
  const [expanded, setExpanded] = useState(!isNew ? true : false);
  const [saved, setSaved] = useState(false);

  const update = (field, value) => {
    setE(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(e);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>
          {"<"} back to journal
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {!isNew && (
            <button onClick={onDelete} style={{ padding: "8px 16px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.color = C.coral}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
              delete
            </button>
          )}
          {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
          <button onClick={handleSave} style={{
            padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
            borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500,
            cursor: "pointer", transition: "background 0.2s",
          }}
            onMouseEnter={el => el.currentTarget.style.background = `${C.teal}33`}
            onMouseLeave={el => el.currentTarget.style.background = `${C.teal}1A`}>
            {isNew ? "log session" : "save changes"}
          </button>
        </div>
      </div>

      <h2 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 28, lineHeight: 1.15 }}>
        {isNew ? "Log Session" : `Session: ${formatDate(e.date)}`}
      </h2>

      {/* ── Quick Log ── */}
      <div style={{ marginBottom: 28 }}>
        <Label>Date</Label>
        <input type="date" value={e.date} onChange={ev => update("date", ev.target.value)}
          style={{
            padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none",
            transition: "border-color 0.2s", colorScheme: "dark",
          }}
          onFocus={ev => ev.target.style.borderColor = `${C.teal}66`}
          onBlur={ev => ev.target.style.borderColor = C.border}
        />
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>Result</Label>
        <ChipSelect value={e.result} onChange={v => update("result", v)} options={RESULTS} />
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>P&L (optional)</Label>
        <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: 200 }}>
          <span style={{ fontFamily: F.mono, fontSize: 16, color: C.textMuted }}>$</span>
          <input type="number" value={e.pnl} onChange={ev => update("pnl", ev.target.value)}
            placeholder="0.00"
            style={{
              flex: 1, padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 4, color: C.textPrimary, fontFamily: F.mono, fontSize: 16, outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={ev => ev.target.style.borderColor = `${C.teal}66`}
            onBlur={ev => ev.target.style.borderColor = C.border}
          />
        </div>
      </div>

      <div style={{ marginBottom: 28 }}>
        <Label>Playbook used (optional)</Label>
        <select value={e.playbookId} onChange={ev => update("playbookId", ev.target.value)}
          style={{
            padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 4, color: e.playbookId ? C.textPrimary : C.textMuted, fontFamily: F.body, fontSize: 16,
            outline: "none", cursor: "pointer", transition: "border-color 0.2s",
            WebkitAppearance: "none", MozAppearance: "none", appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23566A8A' fill='none' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36,
            minWidth: 220,
          }}
          onFocus={ev => ev.target.style.borderColor = `${C.teal}66`}
          onBlur={ev => ev.target.style.borderColor = C.border}>
          <option value="" style={{ color: C.textMuted, background: C.bgCard }}>None</option>
          {playbooks.map(pb => (
            <option key={pb.id} value={pb.id} style={{ color: C.textPrimary, background: C.bgCard }}>
              {pb.name || "Untitled Playbook"}
            </option>
          ))}
        </select>
      </div>

      {e.playbookId && (
        <div style={{ marginBottom: 28 }}>
          <Label>Followed the plan?</Label>
          <ChipSelect value={e.followedPlan} onChange={v => update("followedPlan", v)} options={FOLLOWED_PLAN} />
        </div>
      )}

      <div style={{ marginBottom: 28 }}>
        <Label>One-liner takeaway</Label>
        <input type="text" value={e.oneLiner} onChange={ev => update("oneLiner", ev.target.value)}
          placeholder="What's the one thing to remember from today?"
          style={{
            width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={ev => ev.target.style.borderColor = `${C.teal}66`}
          onBlur={ev => ev.target.style.borderColor = C.border}
        />
      </div>

      <div style={{ height: 1, background: C.border, marginBottom: 28 }} />

      {/* ── Expandable Detail ── */}
      <button onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex", alignItems: "center", gap: 8, padding: "10px 0", background: "transparent",
          border: "none", color: C.textSecondary, fontFamily: F.mono, fontSize: 12, cursor: "pointer",
          marginBottom: expanded ? 24 : 8, width: "100%",
        }}>
        <span style={{ color: C.teal, transition: "transform 0.2s", transform: expanded ? "rotate(90deg)" : "rotate(0deg)", display: "inline-block" }}>{">"}</span>
        {expanded ? "hide details" : "add more details (optional)"}
      </button>

      {expanded && (
        <div>
          <div style={{ marginBottom: 24 }}>
            <Label color={C.green}>What worked</Label>
            <textarea value={e.whatWorked} onChange={ev => update("whatWorked", ev.target.value)}
              placeholder="Setups that played out, good decisions, discipline shown"
              rows={3}
              style={{
                width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
                resize: "vertical", lineHeight: 1.7, transition: "border-color 0.2s",
              }}
              onFocus={ev => ev.target.style.borderColor = `${C.green}66`}
              onBlur={ev => ev.target.style.borderColor = C.border}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Label color={C.coral}>What didn't work</Label>
            <textarea value={e.whatDidnt} onChange={ev => update("whatDidnt", ev.target.value)}
              placeholder="Bad entries, missed exits, rules broken"
              rows={3}
              style={{
                width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
                resize: "vertical", lineHeight: 1.7, transition: "border-color 0.2s",
              }}
              onFocus={ev => ev.target.style.borderColor = `${C.coral}66`}
              onBlur={ev => ev.target.style.borderColor = C.border}
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Label color={C.purple}>Emotional state</Label>
            <ChipMulti selected={e.emotions} onChange={v => update("emotions", v)} options={EMOTIONS} color={C.purple} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Label color={C.blue}>Market conditions</Label>
            <ChipMulti selected={e.marketConditions} onChange={v => update("marketConditions", v)} options={MARKET_CONDITIONS} color={C.blue} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Label color={C.coral}>Mistakes made</Label>
            <ChipMulti selected={e.mistakes} onChange={v => update("mistakes", v)} options={MISTAKES} color={C.coral} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <Label>Notes</Label>
            <textarea value={e.notes} onChange={ev => update("notes", ev.target.value)}
              placeholder="Anything else. Observations, market context, lessons for tomorrow."
              rows={4}
              style={{
                width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
                borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
                resize: "vertical", lineHeight: 1.7, transition: "border-color 0.2s",
              }}
              onFocus={ev => ev.target.style.borderColor = `${C.teal}66`}
              onBlur={ev => ev.target.style.borderColor = C.border}
            />
          </div>
        </div>
      )}

      {/* Bottom save */}
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, padding: "20px 0", borderTop: `1px solid ${C.border}`, marginBottom: 28 }}>
        {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
        <button onClick={handleSave} style={{
          padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
          borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500,
          cursor: "pointer", transition: "background 0.2s",
        }}
          onMouseEnter={el => el.currentTarget.style.background = `${C.teal}33`}
          onMouseLeave={el => el.currentTarget.style.background = `${C.teal}1A`}>
          {isNew ? "log session" : "save changes"}
        </button>
      </div>

      {/* Browser warning */}
      <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
        <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>NOTE</span>
        Journal entries are saved to this browser only. Clearing your browser data will delete them. Account sync is coming soon.
      </div>
    </div>
  );
}

// ── Entry Viewer ─────────────────────────────────────────────────────────────

function EntryViewer({ entry, playbooks, onEdit, onBack }) {
  const e = entry;
  const meta = resultMeta(e.result);
  const pb = playbooks.find(p => p.id === e.playbookId);
  const followedMeta = FOLLOWED_PLAN.find(f => f.value === e.followedPlan);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>
          {"<"} back to journal
        </button>
        <button onClick={onEdit} style={{
          padding: "8px 20px", background: `${C.blue}1A`, border: `1px solid ${C.blue}44`,
          borderRadius: 4, color: C.blue, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: "pointer",
        }}>
          edit entry
        </button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", background: `${meta.color}22`, color: meta.color, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>{meta.label}</span>
          {pb && <span style={{ padding: "3px 10px", background: `${C.blue}22`, color: C.blue, fontFamily: F.mono, fontSize: 10, borderRadius: 3 }}>{pb.name || "Untitled"}</span>}
          {followedMeta && <span style={{ padding: "3px 10px", background: `${followedMeta.color}22`, color: followedMeta.color, fontFamily: F.mono, fontSize: 10, borderRadius: 3 }}>Plan: {followedMeta.label}</span>}
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 10, lineHeight: 1.15 }}>
          {formatDate(e.date)}
        </h1>
        {e.pnl !== "" && !isNaN(parseFloat(e.pnl)) && (
          <p style={{ fontFamily: F.mono, fontSize: 24, fontWeight: 600, color: parseFloat(e.pnl) >= 0 ? C.green : C.coral }}>
            {formatPnl(e.pnl)}
          </p>
        )}
      </div>

      {e.oneLiner && (
        <>
          <div style={{ padding: "14px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${meta.color}`, marginBottom: 32 }}>
            <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>
              <span style={{ color: meta.color, marginRight: 8 }}>TAKEAWAY</span>{e.oneLiner}
            </p>
          </div>
        </>
      )}

      <div style={{ height: 1, background: C.border, marginBottom: 32 }} />

      {/* What worked / didn't */}
      {(e.whatWorked || e.whatDidnt) && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14, marginBottom: 32 }}>
            {e.whatWorked && (
              <div style={{ padding: "16px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.green}`, borderRadius: 4 }}>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: 1, marginBottom: 8 }}>WHAT WORKED</p>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{e.whatWorked}</p>
              </div>
            )}
            {e.whatDidnt && (
              <div style={{ padding: "16px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `2px solid ${C.coral}`, borderRadius: 4 }}>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, marginBottom: 8 }}>WHAT DIDN'T</p>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{e.whatDidnt}</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* Chip tags */}
      {(e.emotions.length > 0 || e.marketConditions.length > 0 || e.mistakes.length > 0) && (
        <>
          <div style={{ marginBottom: 32 }}>
            {e.emotions.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.purple, letterSpacing: 1, marginBottom: 8 }}>EMOTIONAL STATE</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.emotions.map(em => (
                    <span key={em} style={{ padding: "5px 10px", background: `${C.purple}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.purple }}>
                      {EMOTIONS.find(o => o.value === em)?.label || em}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {e.marketConditions.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.blue, letterSpacing: 1, marginBottom: 8 }}>MARKET CONDITIONS</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.marketConditions.map(mc => (
                    <span key={mc} style={{ padding: "5px 10px", background: `${C.blue}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.blue }}>
                      {MARKET_CONDITIONS.find(o => o.value === mc)?.label || mc}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {e.mistakes.length > 0 && (
              <div style={{ marginBottom: 16 }}>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, marginBottom: 8 }}>MISTAKES</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {e.mistakes.map(m => (
                    <span key={m} style={{ padding: "5px 10px", background: `${C.coral}15`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.coral }}>
                      {MISTAKES.find(o => o.value === m)?.label || m}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ height: 1, background: C.border, marginBottom: 32 }} />
        </>
      )}

      {/* Notes */}
      {e.notes && (
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, marginBottom: 8 }}>NOTES</p>
          {e.notes.split("\n").map((line, i) => (
            <p key={i} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: line ? 8 : 16 }}>{line || "\u00A0"}</p>
          ))}
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
        <p style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Delete journal entry?</p>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 20 }}>
          This will permanently delete the entry for <strong style={{ color: C.textPrimary }}>{label}</strong>. This action cannot be undone.
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
  const [entries, setEntries] = useState([]);
  const [playbooks, setPlaybooks] = useState([]);
  const [view, setView] = useState("list"); // list | new | edit | view
  const [activeId, setActiveId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filterResult, setFilterResult] = useState("");
  const [filterPlaybook, setFilterPlaybook] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setEntries(loadEntries());
    setPlaybooks(loadPlaybooks());
    setLoaded(true);
  }, []);

  const activeEntry = entries.find(e => e.id === activeId) || null;

  // Sort by date descending
  const sortedEntries = useMemo(() => {
    let filtered = [...entries].sort((a, b) => b.date.localeCompare(a.date));
    if (filterResult) filtered = filtered.filter(e => e.result === filterResult);
    if (filterPlaybook) filtered = filtered.filter(e => e.playbookId === filterPlaybook);
    return filtered;
  }, [entries, filterResult, filterPlaybook]);

  const createNew = () => {
    setActiveId(null);
    setView("new");
  };

  const saveEntry = (entry) => {
    const exists = entries.find(e => e.id === entry.id);
    let updated;
    if (exists) {
      updated = entries.map(e => e.id === entry.id ? entry : e);
    } else {
      updated = [entry, ...entries];
    }
    setEntries(updated);
    saveEntries(updated);
  };

  const confirmDelete = () => {
    const updated = entries.filter(e => e.id !== deleteTarget);
    setEntries(updated);
    saveEntries(updated);
    setDeleteTarget(null);
    if (activeId === deleteTarget) {
      setActiveId(null);
      setView("list");
    }
  };

  const hasFilters = filterResult || filterPlaybook;

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
          {/* Hero */}
          <div style={{ padding: "48px 0 36px" }}>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
              Trading Journal
            </h1>
            <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
              Log your trading sessions. Track what works, what doesn't, and how you're improving over time. Quick to fill out, powerful to look back on.
            </p>
            <button onClick={createNew} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
              background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4,
              color: C.teal, fontFamily: F.mono, fontSize: 13, fontWeight: 500, cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
              onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
              + log session
            </button>
          </div>

          {/* Stats */}
          {entries.length > 0 && <StatsPanel entries={entries} playbooks={playbooks} />}

          {/* Filters */}
          {entries.length > 2 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>FILTER:</span>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                  {RESULTS.map(r => (
                    <button key={r.value} onClick={() => setFilterResult(filterResult === r.value ? "" : r.value)}
                      style={{
                        padding: "4px 10px", borderRadius: 3, cursor: "pointer", fontFamily: F.mono, fontSize: 10,
                        background: filterResult === r.value ? `${r.color}22` : "transparent",
                        border: `1px solid ${filterResult === r.value ? `${r.color}44` : C.border}`,
                        color: filterResult === r.value ? r.color : C.textMuted,
                      }}>
                      {r.label}
                    </button>
                  ))}
                </div>
                {playbooks.length > 0 && (
                  <select value={filterPlaybook} onChange={ev => setFilterPlaybook(ev.target.value)}
                    style={{
                      padding: "4px 10px", background: "transparent", border: `1px solid ${C.border}`,
                      borderRadius: 3, color: filterPlaybook ? C.blue : C.textMuted, fontFamily: F.mono, fontSize: 10,
                      cursor: "pointer", outline: "none",
                    }}>
                    <option value="">All playbooks</option>
                    {playbooks.map(pb => (
                      <option key={pb.id} value={pb.id}>{pb.name || "Untitled"}</option>
                    ))}
                  </select>
                )}
                {hasFilters && (
                  <button onClick={() => { setFilterResult(""); setFilterPlaybook(""); }}
                    style={{ padding: "4px 10px", background: "transparent", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}
                    onMouseEnter={e => e.currentTarget.style.color = C.teal}
                    onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
                    clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Entry list */}
          {loaded && entries.length === 0 && (
            <div style={{ padding: "60px 0 80px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 48, color: C.textMuted, marginBottom: 16, opacity: 0.3 }}>{"[ ]"}</p>
              <p style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted, marginBottom: 8 }}>no entries yet</p>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>Log your first trading session to start building your journal.</p>
            </div>
          )}

          {sortedEntries.length > 0 && (
            <div style={{ marginBottom: 48 }}>
              {sortedEntries.map(entry => (
                <EntryCard key={entry.id} entry={entry} playbooks={playbooks}
                  onOpen={() => { setActiveId(entry.id); setView("view"); }} />
              ))}
            </div>
          )}

          {entries.length > 0 && sortedEntries.length === 0 && hasFilters && (
            <div style={{ padding: "40px 0 60px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted }}>No entries match the current filters.</p>
            </div>
          )}

          {/* Cross-links */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 500, marginBottom: 14 }}>
              <span style={{ color: C.teal }}>$</span> improve your trading
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/playbook"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.blue }}>Playbook {">"}</span></Link>
              <Link href="/strategies"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.purple }}>Strategies {">"}</span></Link>
              <Link href="/glossary"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.teal }}>Glossary {">"}</span></Link>
            </div>
          </div>

          {/* Footer */}
          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice . educational content only</p>
          </footer>
        </div>
      )}

      {/* New Entry */}
      {view === "new" && (
        <div style={{ paddingTop: 36 }}>
          <EntryEditor
            entry={blankEntry()}
            playbooks={playbooks}
            isNew={true}
            onSave={(entry) => { saveEntry(entry); setActiveId(entry.id); setView("view"); }}
            onDelete={() => {}}
            onBack={() => setView("list")}
          />
        </div>
      )}

      {/* Edit Entry */}
      {view === "edit" && activeEntry && (
        <div style={{ paddingTop: 36 }}>
          <EntryEditor
            entry={activeEntry}
            playbooks={playbooks}
            isNew={false}
            onSave={(entry) => { saveEntry(entry); setView("view"); }}
            onDelete={() => setDeleteTarget(activeEntry.id)}
            onBack={() => setView("view")}
          />
        </div>
      )}

      {/* View Entry */}
      {view === "view" && activeEntry && (
        <div style={{ paddingTop: 36 }}>
          <EntryViewer
            entry={activeEntry}
            playbooks={playbooks}
            onEdit={() => setView("edit")}
            onBack={() => { setView("list"); setActiveId(null); }}
          />
          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice . educational content only</p>
          </footer>
        </div>
      )}

      {/* Delete modal */}
      {deleteTarget && (
        <DeleteModal
          label={formatDate(entries.find(e => e.id === deleteTarget)?.date || "")}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
