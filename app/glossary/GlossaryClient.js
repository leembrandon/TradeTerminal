"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";

function ShareButton({ url, label }) {
  const [toast, setToast] = useState(false);
  const copy = () => { navigator.clipboard.writeText(url).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); }); };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>
        {label}
      </button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

function TermCard({ t, catMeta }) {
  const meta = catMeta[t.category] || { color: C.textMuted, label: t.category };
  const hasPage = !!t.page;
  const inner = (
    <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 20px", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.2s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <span style={{ padding: "2px 8px", background: meta.color + "18", color: meta.color, fontFamily: F.mono, fontSize: 9, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>{meta.label}</span>
        <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 14 }}>{hasPage ? "→" : ""}</span>
      </div>
      <h3 style={{ fontFamily: F.display, fontSize: 14, fontWeight: 500, color: C.textPrimary, marginBottom: 8, lineHeight: 1.3 }}>{t.term}</h3>
      <p style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6, fontFamily: F.body, flex: 1 }}>{t.tldr}</p>
    </div>
  );
  if (hasPage) return <Link href={`/glossary/${t.slug}`}>{inner}</Link>;
  return inner;
}

export default function GlossaryClient({ terms, catMeta }) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");
  const [viewMode, setViewMode] = useState("cards");

  const filtered = useMemo(() => terms.filter(t => {
    const mc = activeCat === "all" || t.category === activeCat;
    const ms = !search || t.term.toLowerCase().includes(search.toLowerCase()) || t.tldr.toLowerCase().includes(search.toLowerCase());
    return mc && ms;
  }), [terms, search, activeCat]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const groupedByLetter = useMemo(() => { const g = {}; filtered.forEach(t => { const l = t.term[0].toUpperCase(); if (!g[l]) g[l] = []; g[l].push(t); }); return g; }, [filtered]);
  const groupedByCategory = useMemo(() => { const g = {}; filtered.forEach(t => { if (!g[t.category]) g[t.category] = []; g[t.category].push(t); }); return g; }, [filtered]);
  const availableLetters = new Set(Object.keys(groupedByLetter));
  const catCounts = useMemo(() => { const c = { all: terms.length }; terms.forEach(t => { c[t.category] = (c[t.category] || 0) + 1; }); return c; }, [terms]);

  return (
    <div style={{ maxWidth: 1060, margin: "0 auto", padding: "0 20px" }}>
      <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
          <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>glossary</span>
        </div>
        <ShareButton url="https://tradeterminal.com/glossary" label="share glossary" />
      </div>

      <div style={{ padding: "36px 0 24px" }}>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.15 }}>
          <span style={{ color: C.teal }}>$</span> futures glossary
        </h1>
        <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.6, maxWidth: 560 }}>
          {terms.length} terms covering everything from basic contract mechanics to advanced order flow concepts. Click any term for the full breakdown.
        </p>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1 1 300px", position: "relative" }}>
          <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: C.teal, fontFamily: F.mono, fontSize: 14 }}>{">"}</span>
          <input type="text" placeholder="search terms..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 32px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, color: C.textPrimary, fontFamily: F.mono, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ display: "flex", gap: 2, background: C.bgCard, borderRadius: 6, border: `1px solid ${C.border}`, padding: 2 }}>
          {[{ id: "cards", label: "grid" }, { id: "alpha", label: "A-Z" }, { id: "category", label: "by topic" }].map(v => (
            <button key={v.id} onClick={() => setViewMode(v.id)}
              style={{ padding: "8px 14px", background: viewMode === v.id ? C.bgSurface : "transparent", border: "none", borderRadius: 4, color: viewMode === v.id ? C.teal : C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>{v.label}</button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
        <button onClick={() => setActiveCat("all")} style={{ padding: "5px 12px", background: activeCat === "all" ? C.teal : "transparent", color: activeCat === "all" ? C.bg : C.textMuted, border: `1px solid ${activeCat === "all" ? C.teal : C.border}`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>all ({catCounts.all})</button>
        {Object.entries(catMeta).map(([id, meta]) => (
          <button key={id} onClick={() => setActiveCat(id)} title={meta.desc}
            style={{ padding: "5px 12px", background: activeCat === id ? meta.color : "transparent", color: activeCat === id ? C.bg : C.textMuted, border: `1px solid ${activeCat === id ? meta.color : C.border}`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}>
            {meta.label.toLowerCase()} ({catCounts[id] || 0})
          </button>
        ))}
      </div>

      <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, marginBottom: 20 }}>
        {filtered.length} term{filtered.length !== 1 ? "s" : ""}{search ? ` matching "${search}"` : ""}
      </p>

      {viewMode === "cards" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 60 }}>
          {filtered.map(t => <TermCard key={t.slug} t={t} catMeta={catMeta} />)}
        </div>
      )}

      {viewMode === "alpha" && (
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: "flex", gap: 2, marginBottom: 24, flexWrap: "wrap" }}>
            {alphabet.map(l => (
              <span key={l} onClick={() => { if (availableLetters.has(l)) document.getElementById(`letter-${l}`)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.mono, fontSize: 11, borderRadius: 3, color: availableLetters.has(l) ? C.teal : C.textMuted + "44", background: availableLetters.has(l) ? C.teal + "10" : "transparent", cursor: availableLetters.has(l) ? "pointer" : "default" }}>{l}</span>
            ))}
          </div>
          {alphabet.filter(l => groupedByLetter[l]).map(letter => (
            <div key={letter} id={`letter-${letter}`} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{ fontFamily: F.display, fontSize: 24, fontWeight: 700, color: C.teal }}>{letter}</span>
                <div style={{ flex: 1, height: 1, background: C.border }} />
              </div>
              {groupedByLetter[letter].map(t => {
                const meta = catMeta[t.category] || { color: C.textMuted };
                const row = (
                  <div key={t.slug} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 6, cursor: "pointer" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: meta.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, minWidth: 200 }}>{t.term}</span>
                    <span style={{ fontSize: 12, color: C.textMuted, flex: 1 }}>{t.tldr}</span>
                    {t.page && <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>→</span>}
                  </div>
                );
                return t.page ? <Link key={t.slug} href={`/glossary/${t.slug}`}>{row}</Link> : row;
              })}
            </div>
          ))}
        </div>
      )}

      {viewMode === "category" && (
        <div style={{ marginBottom: 60 }}>
          {Object.entries(catMeta).filter(([id]) => groupedByCategory[id]).map(([id, meta]) => (
            <div key={id} style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, flexWrap: "wrap" }}>
                <span style={{ padding: "4px 12px", background: meta.color + "18", color: meta.color, fontFamily: F.mono, fontSize: 11, borderRadius: 4, letterSpacing: 1, textTransform: "uppercase", fontWeight: 500 }}>{meta.label}</span>
                <span style={{ fontSize: 12, color: C.textMuted }}>{meta.desc}</span>
                <div style={{ flex: 1, height: 1, background: C.border }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
                {groupedByCategory[id].map(t => <TermCard key={t.slug} t={t} catMeta={catMeta} />)}
              </div>
            </div>
          ))}
        </div>
      )}

      {filtered.length === 0 && <div style={{ padding: "60px 20px", textAlign: "center" }}><p style={{ fontFamily: F.mono, fontSize: 14, color: C.textMuted }}>no terms found</p></div>}

      <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
        </div>
        <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice · educational content only</p>
      </footer>
    </div>
  );
}
