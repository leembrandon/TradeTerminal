"use client";
import { useState } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import NavBar from "@/app/NavBar";

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + "/markets").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

export default function MarketsIndexClient({ markets }) {
  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <NavBar section="markets" sharePath="/markets" shareLabel="share this page" />

      {/* Hero */}
      <div style={{ padding: "48px 0 36px" }}>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
          Futures Markets
        </h1>
        <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700 }}>
          Everything you need to know about each major futures market category. Contract specifications, trading hours, what drives prices, and who participates. Pick a market to start learning.
        </p>
      </div>

      {/* Market cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16, marginBottom: 48 }}>
        {markets.map(m => (
          <Link key={m.slug} href={`/markets/${m.slug}`} style={{ textDecoration: "none" }}>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${m.color}`, padding: "24px 22px", cursor: "pointer", height: "100%", transition: "border-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${m.color}66`}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: m.color, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{m.shortName}</p>
              <p style={{ fontFamily: F.display, fontSize: 17, fontWeight: 600, color: C.textPrimary, marginBottom: 10 }}>{m.name}</p>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>{m.tagline}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {m.contracts.slice(0, 4).map(c => (
                  <span key={c.symbol} style={{ padding: "3px 8px", background: `${m.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: m.color }}>{c.symbol}</span>
                ))}
                {m.contracts.length > 4 && (
                  <span style={{ padding: "3px 8px", background: `${m.color}15`, borderRadius: 3, fontFamily: F.mono, fontSize: 10, color: m.color }}>+{m.contracts.length - 4}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Cross-links */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 500, marginBottom: 14 }}>
          <span style={{ color: C.teal }}>$</span> also explore
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <Link href="/glossary"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>Futures Glossary (54 terms) {">"}</span></Link>
          <Link href="/prop-firms"><span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>Prop Firm Comparison {">"}</span></Link>
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
