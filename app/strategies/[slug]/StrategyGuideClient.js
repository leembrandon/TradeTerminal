"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import NavBar from "@/app/NavBar";
import SetupDiagram from "./SetupDiagram";

function ShareBtn({ path, label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + (path || "/strategies")).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

function SectionAnchor({ id, slug }) {
  const [toast, setToast] = useState(false);
  const copy = () => { navigator.clipboard.writeText(`${getSiteUrl()}/strategies/${slug}#${id}`).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); }); };
  return (
    <span onClick={e => { e.stopPropagation(); copy(); }} style={{ cursor: "pointer", opacity: 0.3, display: "inline-flex", alignItems: "center", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.3}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      {toast && <span style={{ position: "absolute", left: "100%", marginLeft: 8, padding: "3px 8px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap" }}>copied</span>}
    </span>
  );
}

export default function StrategyGuideClient({ strategy, prev, next }) {
  const [activeSection, setActiveSection] = useState(null);
  const basePath = `/strategies/${strategy.slug}`;

  const readTime = useMemo(() => {
    let w = 0;
    const c = s => s ? s.split(/\s+/).length : 0;
    w += c(strategy.tldr);
    strategy.sections.forEach(s => { w += c(s.heading) + c(s.body); });
    strategy.commonMistakes.forEach(m => { w += c(m.mistake) + c(m.fix); });
    return Math.max(1, Math.ceil(w / 200));
  }, [strategy]);

  const allIds = useMemo(() => [...strategy.sections.map(s => s.id), "mistakes", "related"], [strategy]);
  const tocItems = [
    ...strategy.sections.map(s => ({ id: s.id, label: s.heading })),
    { id: "mistakes", label: "Common mistakes" },
    { id: "related", label: "Related terms" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-20% 0px -70% 0px" });
    allIds.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [allIds]);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <NavBar breadcrumbs={[{ label: "strategies", href: "/strategies" }, { label: strategy.slug }]} sharePath={basePath} shareLabel="share this guide" />

      <div style={{ display: "flex", gap: 40, paddingTop: 36 }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ padding: "3px 10px", background: `${strategy.color}22`, color: strategy.color, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>strategy</span>
              <span style={{ padding: "3px 10px", background: C.bgSurface, fontFamily: F.mono, fontSize: 10, borderRadius: 3, color: C.textMuted }}>{strategy.difficulty}</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{readTime} min read</span>
            </div>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
              {strategy.name}
            </h1>

            {/* TL;DR */}
            <div style={{ padding: "14px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${strategy.color}`, marginBottom: 20 }}>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>
                <span style={{ color: strategy.color, marginRight: 8 }}>TL;DR</span>{strategy.tldr}
              </p>
            </div>

            {/* Quick info pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "Timeframe", value: strategy.timeframe },
                { label: "Hold time", value: strategy.holdTime },
                { label: "Difficulty", value: strategy.difficulty },
              ].map((info, i) => (
                <div key={i} style={{ padding: "6px 12px", background: C.bgSurface, borderRadius: 4, fontFamily: F.mono, fontSize: 11 }}>
                  <span style={{ color: C.textMuted }}>{info.label}: </span>
                  <span style={{ color: C.textPrimary }}>{info.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* Interactive setup diagram (rendered only if strategy data includes a diagram) */}
          {strategy.diagram && <SetupDiagram diagram={strategy.diagram} color={strategy.color} />}

          {/* Sections */}
          {strategy.sections.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: strategy.color }}>$</span>{section.heading} <SectionAnchor id={section.id} slug={strategy.slug} />
              </h2>
              {section.body.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: 14 }}>{para}</p>
              ))}
            </div>
          ))}

          {/* Common mistakes */}
          <div id="mistakes" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.coral }}>!</span>common mistakes <SectionAnchor id="mistakes" slug={strategy.slug} />
            </h2>
            {strategy.commonMistakes.map((m, i) => (
              <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <span style={{ color: C.coral, fontFamily: F.mono, fontSize: 10, marginTop: 2, letterSpacing: 1 }}>BAD</span>
                  <p style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.6 }}>{m.mistake}</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: C.green, fontFamily: F.mono, fontSize: 10, marginTop: 2, letterSpacing: 1 }}>FIX</span>
                  <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{m.fix}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Related glossary terms */}
          <div id="related" style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.teal }}>$</span>related terms <SectionAnchor id="related" slug={strategy.slug} />
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {strategy.relatedTerms.map(t => (
                <Link key={t.slug} href={`/glossary/${t.slug}`}>
                  <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>
                    {t.term} {">"}
                  </span>
                </Link>
              ))}
              <Link href="/strategies">
                <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: strategy.color }}>
                  All strategies {">"}
                </span>
              </Link>
            </div>
          </div>

          {/* Prev/Next nav */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 48 }}>
            {prev ? (
              <Link href={`/strategies/${prev.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{"<"} previous strategy</p>
                  <p style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{prev.shortName}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/strategies/${next.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer", textAlign: "right" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>next strategy {">"}</p>
                  <p style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{next.shortName}</p>
                </div>
              </Link>
            ) : <div />}
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
            <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>DISCLAIMER</span>
            Trading strategies involve substantial risk of loss. Past performance and backtested results do not guarantee future results. This content is educational only and not financial advice. Always practice with paper trading or micro contracts before risking real capital.
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

        {/* Sticky TOC sidebar */}
        <div style={{ width: 220, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start", maxHeight: "calc(100vh - 48px)", overflowY: "auto", display: "none" }} className="toc-sidebar">
          <style>{`.toc-sidebar { display: none !important; } @media (min-width: 900px) { .toc-sidebar { display: block !important; } }`}</style>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 12 }}>on this page</p>
          <div style={{ borderLeft: `1px solid ${C.border}` }}>
            {tocItems.map(item => (
              <button key={item.id} onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
                style={{ display: "block", textAlign: "left", width: "100%", padding: "7px 14px", background: "transparent", border: "none", borderLeft: `2px solid ${activeSection === item.id ? strategy.color : "transparent"}`, marginLeft: -1, color: activeSection === item.id ? strategy.color : C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", lineHeight: 1.4, transition: "color 0.2s, border-color 0.2s" }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingLeft: 12 }}>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>{readTime} min read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
