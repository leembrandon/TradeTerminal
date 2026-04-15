"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import NavBar from "@/app/NavBar";

function ShareBtn({ path, label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + (path || "/prop-firms")).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
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
  const copy = () => { navigator.clipboard.writeText(`${getSiteUrl()}/prop-firms/${slug}#${id}`).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); }); };
  return (
    <span onClick={e => { e.stopPropagation(); copy(); }} style={{ cursor: "pointer", opacity: 0.3, display: "inline-flex", alignItems: "center", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.3}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      {toast && <span style={{ position: "absolute", left: "100%", marginLeft: 8, padding: "3px 8px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap" }}>copied</span>}
    </span>
  );
}

export default function FirmReviewClient({ firm, prev, next }) {
  const [activeSection, setActiveSection] = useState(null);
  const basePath = `/prop-firms/${firm.slug}`;

  const readTime = useMemo(() => {
    let w = 0;
    const c = s => s ? s.split(/\s+/).length : 0;
    w += c(firm.tldr) + c(firm.verdict) + c(firm.bestFor) + c(firm.avoidIf);
    firm.overview.forEach(s => { w += c(s.heading) + c(s.body); });
    firm.pros.forEach(p => { w += c(p); });
    firm.cons.forEach(p => { w += c(p); });
    return Math.max(1, Math.ceil(w / 200));
  }, [firm]);

  const allIds = useMemo(() => [...firm.overview.map(s => s.id), "specs", "pros-cons", "verdict", "related"], [firm]);
  const tocItems = [
    ...firm.overview.map(s => ({ id: s.id, label: s.heading })),
    { id: "specs", label: "Account specs" },
    { id: "pros-cons", label: "Pros & cons" },
    { id: "verdict", label: "Verdict" },
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
      <NavBar breadcrumbs={[{ label: "prop-firms", href: "/prop-firms" }, { label: firm.slug }]} sharePath={basePath} shareLabel="share this review" />

      <div style={{ display: "flex", gap: 40, paddingTop: 36 }}>
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ padding: "3px 10px", background: `${firm.color}22`, color: firm.color, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>review</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{readTime} min read</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>Updated April 2026</span>
            </div>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 8, lineHeight: 1.15 }}>
              {firm.name} <span style={{ color: C.textMuted, fontWeight: 400 }}>Review</span>
            </h1>
            <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textMuted, marginBottom: 16 }}>{firm.tagline}</p>

            {/* TL;DR */}
            <div style={{ padding: "14px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${firm.color}`, marginBottom: 20 }}>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>
                <span style={{ color: firm.color, marginRight: 8 }}>TL;DR</span>{firm.tldr}
              </p>
            </div>

            {/* Quick stats row */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { label: "Founded", value: firm.founded },
                { label: "HQ", value: firm.hq },
                { label: "Pricing", value: firm.overview[2]?.body.includes("one-time") || firm.overview[2]?.body.includes("One-time") ? "One-time" : "Monthly" },
              ].map((s, i) => (
                <div key={i} style={{ padding: "6px 12px", background: C.bgSurface, borderRadius: 4, fontFamily: F.mono, fontSize: 11 }}>
                  <span style={{ color: C.textMuted }}>{s.label}: </span>
                  <span style={{ color: C.textPrimary }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* Overview sections */}
          {firm.overview.map(section => (
            <div key={section.id} id={section.id} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: firm.color }}>$</span>{section.heading} <SectionAnchor id={section.id} slug={firm.slug} />
              </h2>
              {section.body.split("\n\n").map((para, i) => (
                <p key={i} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: 14 }}>{para}</p>
              ))}
            </div>
          ))}

          {/* Specs table */}
          <div id="specs" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: firm.color }}>$</span>account specs <SectionAnchor id="specs" slug={firm.slug} />
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.mono, fontSize: 12, minWidth: 400 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    <th style={{ textAlign: "left", padding: "10px 12px", color: C.textMuted, fontWeight: 400, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}></th>
                    {firm.specs[0].values.map((_, i) => (
                      <th key={i} style={{ textAlign: "left", padding: "10px 12px", color: C.textMuted, fontWeight: 400, fontSize: 10, letterSpacing: 1, borderLeft: `1px solid ${C.border}` }}>{firm.specs[0].values[i]}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {firm.specs.slice(1).map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "10px 12px", color: C.textMuted, fontSize: 11 }}>{row.label}</td>
                      {row.values.map((val, j) => (
                        <td key={j} style={{ padding: "10px 12px", color: C.textSecondary, borderLeft: `1px solid ${C.border}` }}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 10, color: C.textMuted, marginTop: 8, fontFamily: F.mono }}>Verify current pricing directly with {firm.name}. Prices change frequently.</p>
          </div>

          {/* Pros and Cons */}
          <div id="pros-cons" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: firm.color }}>$</span>pros & cons <SectionAnchor id="pros-cons" slug={firm.slug} />
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>pros</p>
                {firm.pros.map((pro, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: C.green, fontFamily: F.mono, fontSize: 12, flexShrink: 0, marginTop: 1 }}>+</span>
                    <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{pro}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>cons</p>
                {firm.cons.map((con, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                    <span style={{ color: C.coral, fontFamily: F.mono, fontSize: 12, flexShrink: 0, marginTop: 1 }}>-</span>
                    <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{con}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Verdict */}
          <div id="verdict" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: firm.color }}>$</span>verdict <SectionAnchor id="verdict" slug={firm.slug} />
            </h2>
            <div style={{ padding: "20px 24px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${firm.color}`, marginBottom: 20 }}>
              <p style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: 16 }}>{firm.verdict}</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ padding: "12px 16px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>best for</p>
                  <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{firm.bestFor}</p>
                </div>
                <div style={{ padding: "12px 16px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>avoid if</p>
                  <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{firm.avoidIf}</p>
                </div>
              </div>
            </div>
            <a href={firm.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: `${firm.color}22`, border: `1px solid ${firm.color}44`, borderRadius: 4, fontFamily: F.mono, fontSize: 12, color: firm.color, textDecoration: "none" }}>
              Visit {firm.name} <span style={{ fontSize: 14 }}>{">"}</span>
            </a>
          </div>

          {/* Related glossary terms */}
          <div id="related" style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.teal }}>$</span>related terms <SectionAnchor id="related" slug={firm.slug} />
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {firm.relatedTerms.map(t => (
                <Link key={t.slug} href={`/glossary/${t.slug}`}>
                  <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>
                    {t.term} {">"}
                  </span>
                </Link>
              ))}
              <Link href="/prop-firms">
                <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.teal }}>
                  Compare all firms {">"}
                </span>
              </Link>
            </div>
          </div>

          {/* Prev/Next nav */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 48 }}>
            {prev ? (
              <Link href={`/prop-firms/${prev.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>{"<"} previous review</p>
                  <p style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{prev.name}</p>
                </div>
              </Link>
            ) : <div />}
            {next ? (
              <Link href={`/prop-firms/${next.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer", textAlign: "right" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>next review {">"}</p>
                  <p style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{next.name}</p>
                </div>
              </Link>
            ) : <div />}
          </div>

          {/* Disclaimer */}
          <div style={{ padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 11, color: C.textMuted, lineHeight: 1.7, marginBottom: 48 }}>
            <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>DISCLAIMER</span>
            Prop firm rules and pricing change frequently. Verify all details directly with {firm.name} before purchasing. This page is for educational purposes only and is not financial advice. This page may contain affiliate links.
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
                style={{ display: "block", textAlign: "left", width: "100%", padding: "7px 14px", background: "transparent", border: "none", borderLeft: `2px solid ${activeSection === item.id ? firm.color : "transparent"}`, marginLeft: -1, color: activeSection === item.id ? firm.color : C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", lineHeight: 1.4, transition: "color 0.2s, border-color 0.2s" }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingLeft: 12 }}>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6 }}>{readTime} min read</p>
          </div>
        </div>
      </div>
    </div>
  );
}
