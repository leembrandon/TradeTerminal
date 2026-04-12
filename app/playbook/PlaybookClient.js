"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

const STORAGE_KEY = "tt_playbooks";

const MARKETS = [
  { value: "ES", label: "ES — S&P 500" },
  { value: "NQ", label: "NQ — Nasdaq 100" },
  { value: "YM", label: "YM — Dow 30" },
  { value: "RTY", label: "RTY — Russell 2000" },
  { value: "CL", label: "CL — Crude Oil" },
  { value: "NG", label: "NG — Natural Gas" },
  { value: "GC", label: "GC — Gold" },
  { value: "SI", label: "SI — Silver" },
  { value: "ZN", label: "ZN — 10-Year Note" },
  { value: "ZB", label: "ZB — 30-Year Bond" },
  { value: "MES", label: "MES — Micro S&P 500" },
  { value: "MNQ", label: "MNQ — Micro Nasdaq" },
  { value: "MCL", label: "MCL — Micro Crude" },
  { value: "MGC", label: "MGC — Micro Gold" },
];

const SESSIONS = [
  { value: "New York", label: "New York Session" },
  { value: "London", label: "London Session" },
  { value: "Asia", label: "Asia Session" },
  { value: "Overnight/Globex", label: "Overnight / Globex" },
];

const TIMEFRAMES = [
  { value: "1min", label: "1 min" },
  { value: "2min", label: "2 min" },
  { value: "3min", label: "3 min" },
  { value: "5min", label: "5 min" },
  { value: "15min", label: "15 min" },
  { value: "30min", label: "30 min" },
  { value: "1hr", label: "1 hour" },
  { value: "4hr", label: "4 hour" },
  { value: "Daily", label: "Daily" },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function loadPlaybooks() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function savePlaybooks(playbooks) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(playbooks)); } catch {}
}

function blankPlaybook() {
  return {
    id: uid(),
    name: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Structured sections
    market: [],
    session: [],
    timeframe: [],
    // Setup
    setupName: "",
    setupDescription: "",
    // Entry rules
    entryRules: [{ id: uid(), text: "" }],
    // Exit rules
    exitRules: [{ id: uid(), text: "" }],
    // Stop loss
    stopLoss: "",
    // Targets
    targets: [{ id: uid(), text: "" }],
    // Risk management
    maxDailyLoss: "",
    maxPositionSize: "",
    riskPerTrade: "",
    // Pre-market checklist
    checklist: [{ id: uid(), text: "" }],
    // Freeform notes
    notes: "",
  };
}

// ── Reusable Components ──────────────────────────────────────────────────────

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + "/playbook").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
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

function Input({ value, onChange, placeholder, style: extra }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
        borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
        transition: "border-color 0.2s", ...extra,
      }}
      onFocus={e => e.target.style.borderColor = `${C.teal}66`}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function ChipPicker({ selected, onChange, options, color }) {
  const accent = color || C.teal;
  const toggle = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter(v => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {options.map(opt => {
        const active = selected.includes(opt.value);
        return (
          <button
            key={opt.value}
            onClick={() => toggle(opt.value)}
            style={{
              padding: "6px 12px", borderRadius: 4, cursor: "pointer",
              fontFamily: F.mono, fontSize: 11, transition: "all 0.15s",
              background: active ? `${accent}22` : C.bgCard,
              border: `1px solid ${active ? `${accent}66` : C.border}`,
              color: active ? accent : C.textMuted,
            }}
            onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = `${accent}44`; e.currentTarget.style.color = C.textSecondary; } }}
            onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textMuted; } }}
          >
            {active && <span style={{ marginRight: 4 }}>&#10003;</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function TextArea({ value, onChange, placeholder, rows }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows || 3}
      style={{
        width: "100%", padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
        borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
        resize: "vertical", lineHeight: 1.7, transition: "border-color 0.2s",
      }}
      onFocus={e => e.target.style.borderColor = `${C.teal}66`}
      onBlur={e => e.target.style.borderColor = C.border}
    />
  );
}

function RuleList({ items, onChange, placeholder, color }) {
  const accent = color || C.teal;
  const updateItem = (id, text) => onChange(items.map(r => r.id === id ? { ...r, text } : r));
  const addItem = () => onChange([...items, { id: uid(), text: "" }]);
  const removeItem = (id) => {
    if (items.length <= 1) return;
    onChange(items.filter(r => r.id !== id));
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={item.id} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: accent, marginTop: 11, flexShrink: 0, minWidth: 20 }}>{i + 1}.</span>
          <input
            type="text"
            value={item.text}
            onChange={e => updateItem(item.id, e.target.value)}
            placeholder={placeholder || `Rule ${i + 1}`}
            style={{
              flex: 1, padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = `${accent}66`}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          {items.length > 1 && (
            <button onClick={() => removeItem(item.id)} style={{ padding: "8px", background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, lineHeight: 1, flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = C.coral}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
              x
            </button>
          )}
        </div>
      ))}
      <button onClick={addItem} style={{
        display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px",
        background: `${accent}0D`, border: `1px solid ${accent}33`, borderRadius: 4,
        color: accent, fontFamily: F.mono, fontSize: 11, cursor: "pointer",
      }}>
        + add rule
      </button>
    </div>
  );
}

function ChecklistEditor({ items, onChange }) {
  const updateItem = (id, text) => onChange(items.map(c => c.id === id ? { ...c, text } : c));
  const addItem = () => onChange([...items, { id: uid(), text: "" }]);
  const removeItem = (id) => {
    if (items.length <= 1) return;
    onChange(items.filter(c => c.id !== id));
  };

  return (
    <div>
      {items.map((item) => (
        <div key={item.id} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
          <span style={{ fontFamily: F.mono, fontSize: 14, color: C.amber, marginTop: 9, flexShrink: 0 }}>&#9744;</span>
          <input
            type="text"
            value={item.text}
            onChange={e => updateItem(item.id, e.target.value)}
            placeholder="e.g. Check economic calendar for high-impact news"
            style={{
              flex: 1, padding: "10px 14px", background: C.bgCard, border: `1px solid ${C.border}`,
              borderRadius: 4, color: C.textPrimary, fontFamily: F.body, fontSize: 16, outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={e => e.target.style.borderColor = `${C.amber}66`}
            onBlur={e => e.target.style.borderColor = C.border}
          />
          {items.length > 1 && (
            <button onClick={() => removeItem(item.id)} style={{ padding: "8px", background: "transparent", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 16, lineHeight: 1, flexShrink: 0 }}
              onMouseEnter={e => e.currentTarget.style.color = C.coral}
              onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
              x
            </button>
          )}
        </div>
      ))}
      <button onClick={addItem} style={{
        display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px",
        background: `${C.amber}0D`, border: `1px solid ${C.amber}33`, borderRadius: 4,
        color: C.amber, fontFamily: F.mono, fontSize: 11, cursor: "pointer",
      }}>
        + add item
      </button>
    </div>
  );
}

// ── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, icon, iconColor, title, children }) {
  return (
    <div id={id} style={{ marginBottom: 36 }}>
      <h2 style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ color: iconColor || C.teal }}>{icon || "$"}</span>{title}
      </h2>
      {children}
    </div>
  );
}

// ── Playbook Card (list view) ────────────────────────────────────────────────

function PlaybookCard({ playbook, onOpen, onDelete }) {
  const filledRules = playbook.entryRules.filter(r => r.text.trim()).length + playbook.exitRules.filter(r => r.text.trim()).length;
  const filledChecklist = playbook.checklist.filter(c => c.text.trim()).length;
  const updated = new Date(playbook.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${C.blue}`, padding: "22px 20px", cursor: "pointer", transition: "border-color 0.2s", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.borderColor = `${C.blue}66`}
      onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
      onClick={onOpen}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <p style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, color: C.textPrimary }}>
          {playbook.name || "Untitled Playbook"}
        </p>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          style={{ padding: "4px 8px", background: "transparent", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}
          onMouseEnter={e => e.currentTarget.style.color = C.coral}
          onMouseLeave={e => e.currentTarget.style.color = C.textMuted}>
          delete
        </button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
        {(Array.isArray(playbook.market) ? playbook.market : playbook.market ? [playbook.market] : []).map(m => (
          <span key={m} style={{ padding: "3px 8px", background: C.bgSurface, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{m}</span>
        ))}
        {(Array.isArray(playbook.session) ? playbook.session : playbook.session ? [playbook.session] : []).map(s => (
          <span key={s} style={{ padding: "3px 8px", background: C.bgSurface, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{s}</span>
        ))}
        {playbook.setupName && <span style={{ padding: "3px 8px", background: `${C.blue}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.blue }}>{playbook.setupName}</span>}
      </div>
      <div style={{ display: "flex", gap: 16, fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>
        <span>{filledRules} rule{filledRules !== 1 ? "s" : ""}</span>
        <span>{filledChecklist} checklist item{filledChecklist !== 1 ? "s" : ""}</span>
        <span>updated {updated}</span>
      </div>
    </div>
  );
}

// ── Playbook Editor ──────────────────────────────────────────────────────────

function PlaybookEditor({ playbook, onSave, onBack }) {
  const [pb, setPb] = useState(playbook);
  const [saved, setSaved] = useState(false);

  const update = useCallback((field, value) => {
    setPb(prev => ({ ...prev, [field]: value, updatedAt: new Date().toISOString() }));
  }, []);

  const handleSave = () => {
    onSave(pb);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tocItems = [
    { id: "overview", label: "Overview" },
    { id: "setup", label: "Setup" },
    { id: "entry", label: "Entry rules" },
    { id: "exit", label: "Exit rules" },
    { id: "risk", label: "Risk management" },
    { id: "checklist", label: "Pre-market checklist" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div>
      {/* Editor header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>
          {"<"} back to playbooks
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
          <button onClick={handleSave} style={{
            padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
            borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500,
            cursor: "pointer", transition: "background 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
            onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
            save playbook
          </button>
        </div>
      </div>

      <div style={{ display: "flex", gap: 40 }}>
        {/* Main editor */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Playbook name */}
          <div style={{ marginBottom: 28 }}>
            <input
              type="text"
              value={pb.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Name your playbook"
              style={{
                width: "100%", padding: "12px 0", background: "transparent", border: "none", borderBottom: `2px solid ${C.border}`,
                color: C.textPrimary, fontFamily: F.display, fontSize: "clamp(22px, 4vw, 30px)", fontWeight: 700,
                outline: "none", letterSpacing: -0.5, transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = C.teal}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>

          {/* ── Overview ── */}
          <Section id="overview" icon="$" iconColor={C.teal} title="Overview">
            <div style={{ marginBottom: 18 }}>
              <Label>Market / Product</Label>
              <ChipPicker selected={pb.market} onChange={v => update("market", v)} options={MARKETS} color={C.teal} />
            </div>
            <div style={{ marginBottom: 18 }}>
              <Label>Session</Label>
              <ChipPicker selected={pb.session} onChange={v => update("session", v)} options={SESSIONS} color={C.blue} />
            </div>
            <div>
              <Label>Timeframe</Label>
              <ChipPicker selected={pb.timeframe} onChange={v => update("timeframe", v)} options={TIMEFRAMES} color={C.purple} />
            </div>
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Setup ── */}
          <Section id="setup" icon=">" iconColor={C.blue} title="Setup">
            <div style={{ marginBottom: 14 }}>
              <Label color={C.blue}>Setup name</Label>
              <Input value={pb.setupName} onChange={v => update("setupName", v)} placeholder="e.g. Opening Range Breakout, VWAP Fade" />
            </div>
            <div>
              <Label color={C.blue}>Description</Label>
              <TextArea value={pb.setupDescription} onChange={v => update("setupDescription", v)} placeholder="Describe the setup. What are you looking for? What market conditions make this setup valid?" rows={4} />
            </div>
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Entry Rules ── */}
          <Section id="entry" icon="+" iconColor={C.green} title="Entry rules">
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
              Define the specific conditions that must be met before entering a trade.
            </p>
            <RuleList items={pb.entryRules} onChange={v => update("entryRules", v)} placeholder="e.g. Price breaks above opening range high" color={C.green} />
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Exit Rules ── */}
          <Section id="exit" icon="-" iconColor={C.coral} title="Exit rules">
            <div style={{ marginBottom: 14 }}>
              <Label color={C.coral}>Stop loss</Label>
              <Input value={pb.stopLoss} onChange={v => update("stopLoss", v)} placeholder="e.g. 2 points below entry, below VWAP, below IB low" />
            </div>
            <div style={{ marginBottom: 14 }}>
              <Label color={C.coral}>Targets</Label>
              <RuleList items={pb.targets} onChange={v => update("targets", v)} placeholder="e.g. Target 1: 1:1 R:R" color={C.coral} />
            </div>
            <div>
              <Label color={C.coral}>Exit rules</Label>
              <RuleList items={pb.exitRules} onChange={v => update("exitRules", v)} placeholder="e.g. Exit if price reclaims the opening range" color={C.coral} />
            </div>
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Risk Management ── */}
          <Section id="risk" icon="!" iconColor={C.amber} title="Risk management">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
              <div>
                <Label color={C.amber}>Max daily loss</Label>
                <Input value={pb.maxDailyLoss} onChange={v => update("maxDailyLoss", v)} placeholder="e.g. $500, 2% of account" />
              </div>
              <div>
                <Label color={C.amber}>Max position size</Label>
                <Input value={pb.maxPositionSize} onChange={v => update("maxPositionSize", v)} placeholder="e.g. 2 contracts ES, 4 MES" />
              </div>
              <div>
                <Label color={C.amber}>Risk per trade</Label>
                <Input value={pb.riskPerTrade} onChange={v => update("riskPerTrade", v)} placeholder="e.g. $200, 1% of account" />
              </div>
            </div>
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Pre-Market Checklist ── */}
          <Section id="checklist" icon="&#9744;" iconColor={C.amber} title="Pre-market checklist">
            <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14, lineHeight: 1.6 }}>
              Items to review before you start trading. Run through this list every session.
            </p>
            <ChecklistEditor items={pb.checklist} onChange={v => update("checklist", v)} />
          </Section>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* ── Notes ── */}
          <Section id="notes" icon="#" iconColor={C.purple} title="Notes">
            <TextArea value={pb.notes} onChange={v => update("notes", v)} placeholder="Anything else. Session observations, psychological reminders, lessons learned, rules for yourself." rows={6} />
          </Section>

          {/* Save bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", borderTop: `1px solid ${C.border}`, marginBottom: 48 }}>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>
              last saved: {new Date(pb.updatedAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
            </p>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {saved && <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>saved</span>}
              <button onClick={handleSave} style={{
                padding: "8px 20px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
                borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 12, fontWeight: 500,
                cursor: "pointer", transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
                onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
                save playbook
              </button>
            </div>
          </div>

          {/* Browser warning */}
          <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
            <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>NOTE</span>
            Playbooks are saved to this browser only. Clearing your browser data will delete them. Account sync is coming soon.
          </div>
        </div>

        {/* Sticky TOC sidebar */}
        <div style={{ width: 200, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start", maxHeight: "calc(100vh - 48px)", overflowY: "auto", display: "none" }} className="toc-sidebar">
          <style>{`.toc-sidebar { display: none !important; } @media (min-width: 900px) { .toc-sidebar { display: block !important; } }`}</style>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 12 }}>sections</p>
          <div style={{ borderLeft: `1px solid ${C.border}` }}>
            {tocItems.map(item => (
              <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{ display: "block", textAlign: "left", width: "100%", padding: "7px 14px", background: "transparent", border: "none", borderLeft: `2px solid transparent`, marginLeft: -1, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", lineHeight: 1.4, transition: "color 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = C.blue; e.currentTarget.style.borderLeftColor = C.blue; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.borderLeftColor = "transparent"; }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Playbook Viewer (read-only) ─────────────────────────────────────────────

function PlaybookViewer({ playbook, onEdit, onBack }) {
  const pb = playbook;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 12 }}>
        <button onClick={onBack} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>
          {"<"} back to playbooks
        </button>
        <button onClick={onEdit} style={{
          padding: "8px 20px", background: `${C.blue}1A`, border: `1px solid ${C.blue}44`,
          borderRadius: 4, color: C.blue, fontFamily: F.mono, fontSize: 12, fontWeight: 500, cursor: "pointer",
        }}>
          edit playbook
        </button>
      </div>

      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <span style={{ padding: "3px 10px", background: `${C.blue}22`, color: C.blue, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>playbook</span>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
          {pb.name || "Untitled Playbook"}
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {(Array.isArray(pb.market) ? pb.market : pb.market ? [pb.market] : []).map(m => (
            <div key={m} style={{ padding: "6px 12px", background: C.bgSurface, borderRadius: 4, fontFamily: F.mono, fontSize: 11 }}><span style={{ color: C.textMuted }}>Market: </span><span style={{ color: C.textPrimary }}>{m}</span></div>
          ))}
          {(Array.isArray(pb.session) ? pb.session : pb.session ? [pb.session] : []).map(s => (
            <div key={s} style={{ padding: "6px 12px", background: C.bgSurface, borderRadius: 4, fontFamily: F.mono, fontSize: 11 }}><span style={{ color: C.textMuted }}>Session: </span><span style={{ color: C.textPrimary }}>{s}</span></div>
          ))}
          {(Array.isArray(pb.timeframe) ? pb.timeframe : pb.timeframe ? [pb.timeframe] : []).map(t => (
            <div key={t} style={{ padding: "6px 12px", background: C.bgSurface, borderRadius: 4, fontFamily: F.mono, fontSize: 11 }}><span style={{ color: C.textMuted }}>Timeframe: </span><span style={{ color: C.textPrimary }}>{t}</span></div>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

      {/* Setup */}
      {(pb.setupName || pb.setupDescription) && (
        <>
          <Section icon=">" iconColor={C.blue} title="Setup">
            {pb.setupName && <p style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 10 }}>{pb.setupName}</p>}
            {pb.setupDescription && <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85 }}>{pb.setupDescription}</p>}
          </Section>
          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />
        </>
      )}

      {/* Entry Rules */}
      {pb.entryRules.some(r => r.text.trim()) && (
        <>
          <Section icon="+" iconColor={C.green} title="Entry rules">
            {pb.entryRules.filter(r => r.text.trim()).map((r, i) => (
              <div key={r.id} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                <span style={{ fontFamily: F.mono, fontSize: 12, color: C.green, marginTop: 1, minWidth: 20 }}>{i + 1}.</span>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{r.text}</p>
              </div>
            ))}
          </Section>
          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />
        </>
      )}

      {/* Exit Rules */}
      {(pb.stopLoss || pb.targets.some(t => t.text.trim()) || pb.exitRules.some(r => r.text.trim())) && (
        <>
          <Section icon="-" iconColor={C.coral} title="Exit rules">
            {pb.stopLoss && (
              <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.coral}`, marginBottom: 14 }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, marginRight: 8 }}>STOP LOSS</span>
                <span style={{ fontSize: 14, color: C.textSecondary }}>{pb.stopLoss}</span>
              </div>
            )}
            {pb.targets.some(t => t.text.trim()) && (
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontFamily: F.mono, fontSize: 11, color: C.green, letterSpacing: 1, marginBottom: 8 }}>TARGETS</p>
                {pb.targets.filter(t => t.text.trim()).map((t, i) => (
                  <div key={t.id} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 12, color: C.green, minWidth: 20 }}>{i + 1}.</span>
                    <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{t.text}</p>
                  </div>
                ))}
              </div>
            )}
            {pb.exitRules.some(r => r.text.trim()) && (
              <div>
                <p style={{ fontFamily: F.mono, fontSize: 11, color: C.coral, letterSpacing: 1, marginBottom: 8 }}>RULES</p>
                {pb.exitRules.filter(r => r.text.trim()).map((r, i) => (
                  <div key={r.id} style={{ display: "flex", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontFamily: F.mono, fontSize: 12, color: C.coral, minWidth: 20 }}>{i + 1}.</span>
                    <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </Section>
          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />
        </>
      )}

      {/* Risk Management */}
      {(pb.maxDailyLoss || pb.maxPositionSize || pb.riskPerTrade) && (
        <>
          <Section icon="!" iconColor={C.amber} title="Risk management">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
              {pb.maxDailyLoss && (
                <div style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.amber, letterSpacing: 1, marginBottom: 6 }}>MAX DAILY LOSS</p>
                  <p style={{ fontFamily: F.mono, fontSize: 16, color: C.textPrimary }}>{pb.maxDailyLoss}</p>
                </div>
              )}
              {pb.maxPositionSize && (
                <div style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.amber, letterSpacing: 1, marginBottom: 6 }}>MAX POSITION SIZE</p>
                  <p style={{ fontFamily: F.mono, fontSize: 16, color: C.textPrimary }}>{pb.maxPositionSize}</p>
                </div>
              )}
              {pb.riskPerTrade && (
                <div style={{ padding: "14px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.amber, letterSpacing: 1, marginBottom: 6 }}>RISK PER TRADE</p>
                  <p style={{ fontFamily: F.mono, fontSize: 16, color: C.textPrimary }}>{pb.riskPerTrade}</p>
                </div>
              )}
            </div>
          </Section>
          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />
        </>
      )}

      {/* Checklist */}
      {pb.checklist.some(c => c.text.trim()) && (
        <>
          <Section icon="&#9744;" iconColor={C.amber} title="Pre-market checklist">
            {pb.checklist.filter(c => c.text.trim()).map((c) => (
              <div key={c.id} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ fontFamily: F.mono, fontSize: 14, color: C.amber, marginTop: 1 }}>&#9744;</span>
                <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.7 }}>{c.text}</p>
              </div>
            ))}
          </Section>
          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />
        </>
      )}

      {/* Notes */}
      {pb.notes && (
        <Section icon="#" iconColor={C.purple} title="Notes">
          {pb.notes.split("\n").map((line, i) => (
            <p key={i} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: line ? 8 : 16 }}>{line || "\u00A0"}</p>
          ))}
        </Section>
      )}

      {/* Disclaimer */}
      <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
        <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>DISCLAIMER</span>
        This is your personal trading plan. Trading futures involves substantial risk of loss. No playbook guarantees profits. This content is educational and not financial advice.
      </div>
    </div>
  );
}

// ── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteModal({ name, onConfirm, onCancel }) {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "28px 24px", maxWidth: 420, width: "100%" }}>
        <p style={{ fontFamily: F.display, fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Delete playbook?</p>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 20 }}>
          This will permanently delete <strong style={{ color: C.textPrimary }}>{name || "Untitled Playbook"}</strong>. This action cannot be undone.
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

export default function PlaybookClient() {
  const [playbooks, setPlaybooks] = useState([]);
  const [view, setView] = useState("list"); // list | edit | view
  const [activeId, setActiveId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setPlaybooks(loadPlaybooks());
    setLoaded(true);
  }, []);

  const activePlaybook = playbooks.find(p => p.id === activeId) || null;

  const createNew = () => {
    const nb = blankPlaybook();
    const updated = [nb, ...playbooks];
    setPlaybooks(updated);
    savePlaybooks(updated);
    setActiveId(nb.id);
    setView("edit");
  };

  const savePlaybook = (pb) => {
    const updated = playbooks.map(p => p.id === pb.id ? pb : p);
    setPlaybooks(updated);
    savePlaybooks(updated);
  };

  const confirmDelete = () => {
    const updated = playbooks.filter(p => p.id !== deleteTarget);
    setPlaybooks(updated);
    savePlaybooks(updated);
    setDeleteTarget(null);
    if (activeId === deleteTarget) {
      setActiveId(null);
      setView("list");
    }
  };

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
          {view === "list" ? (
            <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>playbook</span>
          ) : (
            <>
              <button onClick={() => { setView("list"); setActiveId(null); }} style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 12, cursor: "pointer", padding: 0 }}>playbook</button>
              <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
              <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>{view === "edit" ? "edit" : "view"}</span>
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
              Trading Playbook
            </h1>
            <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
              Build your personal trading playbooks. Define your setups, entry and exit rules, risk management parameters, and pre-market checklists. Your playbooks are saved locally in this browser.
            </p>
            <button onClick={createNew} style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px",
              background: `${C.teal}1A`, border: `1px solid ${C.teal}44`, borderRadius: 4,
              color: C.teal, fontFamily: F.mono, fontSize: 13, fontWeight: 500, cursor: "pointer",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
              onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}>
              + new playbook
            </button>
          </div>

          {/* Playbook list */}
          {loaded && playbooks.length === 0 && (
            <div style={{ padding: "60px 0 80px", textAlign: "center" }}>
              <p style={{ fontFamily: F.mono, fontSize: 48, color: C.textMuted, marginBottom: 16, opacity: 0.3 }}>{"{ }"}</p>
              <p style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted, marginBottom: 8 }}>no playbooks yet</p>
              <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.7 }}>Create your first playbook to start documenting your trading process.</p>
            </div>
          )}

          {playbooks.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
              {playbooks.map(pb => (
                <PlaybookCard
                  key={pb.id}
                  playbook={pb}
                  onOpen={() => { setActiveId(pb.id); setView("view"); }}
                  onDelete={() => setDeleteTarget(pb.id)}
                />
              ))}
            </div>
          )}

          {/* Cross-links */}
          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 500, marginBottom: 14 }}>
              <span style={{ color: C.teal }}>$</span> build your playbook from these resources
            </h2>
            <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
              Study the strategies and glossary to inform your trading plan.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Link href="/strategies"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.purple }}>Strategies {">"}</span></Link>
              <Link href="/glossary"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.teal }}>Glossary {">"}</span></Link>
              <Link href="/markets"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.amber }}>Markets {">"}</span></Link>
              <Link href="/prop-firms"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.coral }}>Prop Firms {">"}</span></Link>
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

      {/* Edit View */}
      {view === "edit" && activePlaybook && (
        <div style={{ paddingTop: 36 }}>
          <PlaybookEditor
            playbook={activePlaybook}
            onSave={savePlaybook}
            onBack={() => setView("view")}
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

      {/* View Mode */}
      {view === "view" && activePlaybook && (
        <div style={{ paddingTop: 36 }}>
          <PlaybookViewer
            playbook={activePlaybook}
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
          name={playbooks.find(p => p.id === deleteTarget)?.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
