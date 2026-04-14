"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const SESSION_KEY = "tt_from_learn";

export default function LearnBackBar() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // On the /learn page itself, set the flag and don't show the bar
    if (pathname === "/learn") {
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch {}
      setShow(false);
      return;
    }

    // On the landing page, clear the flag
    if (pathname === "/") {
      try { sessionStorage.removeItem(SESSION_KEY); } catch {}
      setShow(false);
      return;
    }

    // On any other page, check if the flag exists
    try {
      setShow(sessionStorage.getItem(SESSION_KEY) === "1");
    } catch {
      setShow(false);
    }
  }, [pathname]);

  if (!show) return null;

  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(11,18,32,0.92)", backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(93,202,165,0.15)",
    }}>
      <div style={{
        maxWidth: 960, margin: "0 auto", padding: "8px 20px",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <Link href="/learn" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          textDecoration: "none", padding: "4px 0",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
            <path d="M10 4L6 8L10 12" stroke="#5DCAA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: 12, color: "#5DCAA5", letterSpacing: 0.5,
          }}>
            Back to Learning Path
          </span>
        </Link>
      </div>
    </div>
  );
}
