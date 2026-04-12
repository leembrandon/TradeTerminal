"use client";
import { useState } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + "/strategies").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

export default function StrategiesIndexClient({ strategies }) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
          <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>strategies</span>
        </div>
        <ShareBtn label="share this page" />
      </div>

      {/* Hero */}
      <div style={{ padding: "48px 0 36px" }}>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
          Trading Strategies
        </h1>
        <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
          Common futures trading setups explained with real rules, real examples, and honest assessments of when they work and when they don't. These are educational references, not signal services. Apply them across any session.
        </p>
        <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 12, color: C.textMuted, lineHeight: 1.7 }}>
          <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>NOTE</span>
          No strategy works all the time. Each one has specific conditions where it performs well and conditions where it fails. Understanding when not to trade a setup is as important as knowing the entry rules.
        </div>
      </div>

      {/* Strategy cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
        {strategies.map(s => (
          <Link key={s.slug} href={`/strategies/${s.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${s.color}`, padding: "24px 22px", cursor: "pointer", height: "100%", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${s.color}66`}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ padding: "3px 8px", background: `${s.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: s.color }}>{s.difficulty}</span>
                <span style={{ padding: "3px 8px", background: `${C.bgSurface}`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{s.timeframe}</span>
              </div>
              <p style={{ fontFamily: F.display, fontSize: 17, fontWeight: 600, color: C.textPrimary, marginBottom: 10 }}>{s.name}</p>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 12 }}>{s.tagline}</p>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: s.color }}>Read guide {">"}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Cross-links */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 500, marginBottom: 14 }}>
          <span style={{ color: C.teal }}>$</span> learn the fundamentals first
        </h2>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 14 }}>
          Make sure you understand these concepts before applying any strategy.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { term: "Futures Contract", slug: "futures-contract" },
            { term: "Risk-Reward Ratio", slug: "risk-reward-ratio" },
            { term: "Position Sizing", slug: "position-sizing" },
            { term: "Stop Order", slug: "stop-order" },
            { term: "Drawdown", slug: "drawdown" },
          ].map(t => (
            <Link key={t.slug} href={`/glossary/${t.slug}`}>
              <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>{t.term} {">"}</span>
            </Link>
          ))}
          <Link href="/glossary"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.teal }}>Full glossary {">"}</span></Link>
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
  );
}
