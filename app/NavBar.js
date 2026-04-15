"use client";
import { useState } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";
import AuthButton from "@/app/auth/AuthButton";

function ShareBtn({ path, label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + (path || "")).then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 2000);
    });
  };
  return (
    <div style={{ position: "relative" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>
        {label || "share"}
      </button>
      {toast && (
        <span style={{ position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)", background: C.bgSurface || C.bgCard, border: `1px solid ${C.teal}44`, borderRadius: 4, padding: "3px 8px", fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap" }}>
          copied!
        </span>
      )}
    </div>
  );
}

/**
 * Reusable navigation bar with breadcrumb, share button, and auth button.
 *
 * Usage:
 *   <NavBar section="glossary" sharePath="/glossary" shareLabel="share glossary" />
 *
 * For nested breadcrumbs:
 *   <NavBar breadcrumbs={[{ label: "glossary", href: "/glossary" }, { label: "margin" }]} sharePath="/glossary/margin" shareLabel="share this term" />
 *
 * Props:
 *   section     - Simple string for single-level breadcrumb (e.g. "glossary")
 *   breadcrumbs - Array of { label, href? } for multi-level breadcrumbs
 *   sharePath   - URL path for the share button (default: current section)
 *   shareLabel  - Label for share button (default: "share this page")
 *   rightContent - Optional extra content to render before share/auth (e.g. buttons)
 */
export default function NavBar({ section, breadcrumbs, sharePath, shareLabel, rightContent }) {
  const crumbs = breadcrumbs || (section ? [{ label: section }] : []);

  return (
    <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
            {crumb.href ? (
              <Link href={crumb.href} style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12, textDecoration: "none" }}>{crumb.label}</Link>
            ) : crumb.onClick ? (
              <button onClick={crumb.onClick} style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 12, cursor: "pointer", padding: 0 }}>{crumb.label}</button>
            ) : (
              <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>{crumb.label}</span>
            )}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {rightContent}
        <ShareBtn path={sharePath || `/${section || ""}`} label={shareLabel || "share this page"} />
        <AuthButton />
      </div>
    </div>
  );
}
