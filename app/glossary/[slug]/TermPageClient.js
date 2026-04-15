"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { C, F, catColors } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import NavBar from "@/app/NavBar";

function ShareBtn({ text, path, label, small }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    const url = getSiteUrl() + path;
    const s = text ? `"${text}"\n\nvia TradeTerminal_\n${url}` : url;
    navigator.clipboard.writeText(s).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: small ? 4 : 6, padding: small ? "3px 6px" : "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: small ? 9 : 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

function SectionAnchor({ id, slug }) {
  const [toast, setToast] = useState(false);
  const copy = () => { navigator.clipboard.writeText(`${getSiteUrl()}/glossary/${slug}#${id}`).then(() => { setToast(true); setTimeout(() => setToast(false), 2000); }); };
  return (
    <span onClick={e => { e.stopPropagation(); copy(); }} style={{ cursor: "pointer", opacity: 0.3, display: "inline-flex", alignItems: "center", position: "relative" }}
      onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.3}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.teal} strokeWidth="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
      {toast && <span style={{ position: "absolute", left: "100%", marginLeft: 8, padding: "3px 8px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 3, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap" }}>copied</span>}
    </span>
  );
}

export default function TermPageClient({ term, prev, next }) {
  const d = term.page;
  const [activeSection, setActiveSection] = useState(null);
  const [showTop, setShowTop] = useState(false);
  const catColor = catColors[term.category] || C.teal;
  const basePath = `/glossary/${term.slug}`;

  const readTime = useMemo(() => {
    let w = 0;
    const c = s => s ? s.split(/\s+/).length : 0;
    w += c(d.tldr);
    d.sections.forEach(s => { w += c(s.heading) + c(s.body); });
    d.keyPoints.forEach(k => { w += c(k); });
    d.examples.forEach(e => { w += c(e.label) + c(e.scenario) + c(e.detail); });
    d.commonMistakes.forEach(m => { w += c(m.mistake) + c(m.fix); });
    return Math.max(1, Math.ceil(w / 200));
  }, [d]);

  const allIds = useMemo(() => [...d.sections.map(s => s.id), "key-takeaways", ...(d.specs ? ["specs"] : []), "examples", "mistakes", "related"], [d]);
  const tocItems = [
    ...d.sections.map(s => ({ id: s.id, label: s.heading })),
    { id: "key-takeaways", label: "Key takeaways" },
    ...(d.specs ? [{ id: "specs", label: "Margin requirements" }] : []),
    { id: "examples", label: "Real-world examples" },
    { id: "mistakes", label: "Common mistakes" },
    { id: "related", label: "Related terms" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 });
    allIds.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [allIds]);

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = useCallback(id => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 60, width: 40, height: 40, borderRadius: 8, background: C.bgCard, border: `1px solid ${C.border}`, color: C.teal, fontFamily: F.mono, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>↑</button>
      )}

      {/* Breadcrumb */}
      <NavBar breadcrumbs={[{ label: "glossary", href: "/glossary" }, { label: term.term.toLowerCase() }]} sharePath={basePath} shareLabel="share this term" />

      <div style={{ display: "flex", gap: 40, paddingTop: 36 }}>
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ padding: "3px 10px", background: catColor + "22", color: catColor, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>{term.category}</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{readTime} min read</span>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>{tocItems.length} sections</span>
            </div>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>{term.term}</h1>
            <div style={{ padding: "14px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.teal}`, borderRadius: 0, marginBottom: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textSecondary, lineHeight: 1.7, flex: 1 }}><span style={{ color: C.teal, marginRight: 8 }}>TL;DR</span>{d.tldr}</p>
              <ShareBtn text={d.tldr} path={basePath} label="share" small />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase" }}>prerequisites:</span>
              {d.prerequisites.length === 0 ? (
                <span style={{ padding: "4px 10px", background: C.green + "18", color: C.green, fontFamily: F.mono, fontSize: 10, borderRadius: 3 }}>none, start here</span>
              ) : d.prerequisites.map(p => (
                <Link key={p.slug} href={`/glossary/${p.slug}`}>
                  <span style={{ padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.border}`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>{p.term} →</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 36 }} />

          {/* Sections */}
          {d.sections.map(s => (
            <div key={s.id} id={s.id} style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: C.teal }}>$</span>{s.heading.toLowerCase()} <SectionAnchor id={s.id} slug={term.slug} />
              </h2>
              {s.body.split("\n\n").map((p, j) => (
                <p key={j} style={{ fontSize: 14, color: C.textSecondary, lineHeight: 1.85, marginBottom: 14 }}>{p}</p>
              ))}
            </div>
          ))}

          {/* Key takeaways */}
          <div id="key-takeaways" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.teal }}>$</span>key takeaways <SectionAnchor id="key-takeaways" slug={term.slug} />
            </h2>
            <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 22px" }}>
              {d.keyPoints.map((kp, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: i < d.keyPoints.length - 1 ? 10 : 0, paddingBottom: i < d.keyPoints.length - 1 ? 10 : 0, borderBottom: i < d.keyPoints.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12, marginTop: 2, flexShrink: 0 }}>{">"}</span>
                  <span style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6 }}>{kp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specs */}
          {d.specs && (
            <div id="specs" style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: C.teal }}>$</span>margin requirements (approximate) <SectionAnchor id="specs" slug={term.slug} />
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.mono, fontSize: 12, minWidth: 500 }}>
                  <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["product", "initial", "maintenance", "day trade*"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 12px", color: C.textMuted, fontWeight: 400, fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>)}
                  </tr></thead>
                  <tbody>{d.specs.map(s => (
                    <tr key={s.product} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "10px 12px", color: C.textPrimary, fontWeight: 500 }}>{s.product}</td>
                      <td style={{ padding: "10px 12px", color: C.textSecondary }}>{s.initial}</td>
                      <td style={{ padding: "10px 12px", color: C.textSecondary }}>{s.maintenance}</td>
                      <td style={{ padding: "10px 12px", color: C.amber }}>{s.dayTrade}</td>
                    </tr>
                  ))}</tbody>
                </table>
              </div>
              <p style={{ fontSize: 10, color: C.textMuted, marginTop: 8, fontFamily: F.mono }}>*Day trade margins vary by broker and change with volatility.</p>
            </div>
          )}

          {/* Examples */}
          <div id="examples" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.amber }}>$</span>real-world examples <SectionAnchor id="examples" slug={term.slug} />
            </h2>
            {d.examples.map((ex, i) => (
              <div key={i} style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, borderRadius: 0, padding: "18px 20px", marginBottom: 12 }}>
                <p style={{ fontFamily: F.mono, fontSize: 12, color: C.amber, marginBottom: 8, letterSpacing: 0.5, textTransform: "uppercase" }}>{ex.label}</p>
                <p style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.7, marginBottom: 10 }}>{ex.scenario}</p>
                <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>{ex.detail}</p>
              </div>
            ))}
          </div>

          {/* Mistakes */}
          <div id="mistakes" style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.coral }}>!</span>common mistakes <SectionAnchor id="mistakes" slug={term.slug} />
            </h2>
            {d.commonMistakes.map((m, i) => (
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

          {/* Related */}
          <div id="related" style={{ marginBottom: 48 }}>
            <h2 style={{ fontFamily: F.display, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: C.teal }}>$</span>related terms <SectionAnchor id="related" slug={term.slug} />
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {d.relatedTerms.map(rt => (
                <Link key={rt.slug} href={`/glossary/${rt.slug}`}>
                  <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary }}>{rt.term} →</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Prev/Next */}
          <div style={{ display: "grid", gridTemplateColumns: prev && next ? "1fr 1fr" : "1fr", gap: 12, marginBottom: 48 }}>
            {prev && (
              <Link href={`/glossary/${prev.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>← previous term</p>
                  <p style={{ fontFamily: F.display, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{prev.term}</p>
                </div>
              </Link>
            )}
            {next && (
              <Link href={`/glossary/${next.slug}`}>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer", textAlign: prev ? "right" : "left" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>next term →</p>
                  <p style={{ fontFamily: F.display, fontSize: 14, fontWeight: 500, color: C.textPrimary }}>{next.term}</p>
                </div>
              </Link>
            )}
          </div>

          <footer style={{ borderTop: `1px solid ${C.border}`, padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginTop: 3 }}>futures education for everyone</p>
            </div>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>not financial advice · educational content only</p>
          </footer>
        </div>

        {/* TOC sidebar */}
        <div style={{ width: 220, flexShrink: 0, position: "sticky", top: 24, alignSelf: "flex-start", maxHeight: "calc(100vh - 48px)", overflowY: "auto", display: "none" }} className="toc-sidebar">
          <style>{`.toc-sidebar { display: none !important; } @media (min-width: 900px) { .toc-sidebar { display: block !important; } }`}</style>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 14, paddingLeft: 12 }}>on this page</p>
          <div style={{ borderLeft: `1px solid ${C.border}` }}>
            {tocItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                style={{ display: "block", textAlign: "left", width: "100%", padding: "7px 14px", background: "transparent", border: "none", borderLeft: `2px solid ${activeSection === item.id ? C.teal : "transparent"}`, marginLeft: -1, color: activeSection === item.id ? C.teal : C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer", lineHeight: 1.4 }}>
                {item.label.toLowerCase()}
              </button>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingLeft: 12 }}>
            <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, marginBottom: 6 }}>{readTime} min read</p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ flex: 1, height: 2, background: C.border, borderRadius: 1, overflow: "hidden" }}>
                <div style={{ height: "100%", background: C.teal, borderRadius: 1, width: `${Math.round(((allIds.indexOf(activeSection) + 1) / allIds.length) * 100)}%`, transition: "width 0.3s ease" }} />
              </div>
              <span style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted }}>{activeSection ? Math.round(((allIds.indexOf(activeSection) + 1) / allIds.length) * 100) : 0}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
