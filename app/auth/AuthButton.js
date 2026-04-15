"use client";
import { useState, useEffect, useRef } from "react";
import { C, F } from "@/lib/constants";
import { useAuth } from "@/lib/auth";
import { hasLocalData, migrateLocalData } from "@/lib/storage";

export default function AuthButton() {
  const { user, loading, signOut, setShowAuth } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [migrateBanner, setMigrateBanner] = useState(null); // { playbooks, sessions }
  const [migrating, setMigrating] = useState(false);
  const [migrated, setMigrated] = useState(false);
  const ref = useRef(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Check for local data to migrate after sign-in
  useEffect(() => {
    if (!user) { setMigrateBanner(null); return; }
    const local = hasLocalData();
    if (local.hasData) {
      setMigrateBanner({ playbooks: local.playbooks, sessions: local.sessions, learnLessons: local.learnLessons });
    }
  }, [user]);

  const handleMigrate = async () => {
    setMigrating(true);
    await migrateLocalData(user);
    setMigrating(false);
    setMigrated(true);
    setTimeout(() => { setMigrateBanner(null); setMigrated(false); }, 3000);
  };

  const dismissMigrate = () => setMigrateBanner(null);

  if (loading) return null;

  // Not signed in
  if (!user) {
    return (
      <button
        onClick={() => setShowAuth(true)}
        style={{
          padding: "5px 12px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
          borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 11,
          cursor: "pointer", transition: "background 0.2s", whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.currentTarget.style.background = `${C.teal}33`}
        onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}
      >
        sign in
      </button>
    );
  }

  // Signed in
  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "user";

  return (
    <>
      {/* Migration banner */}
      {migrateBanner && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 150,
          background: C.bgCard, borderBottom: `1px solid ${C.teal}44`,
          padding: "10px 20px", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 12, flexWrap: "wrap",
        }}>
          {!migrated ? (
            <>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textSecondary }}>
                Found {migrateBanner.playbooks} playbook{migrateBanner.playbooks !== 1 ? "s" : ""},{" "}
                {migrateBanner.sessions} journal session{migrateBanner.sessions !== 1 ? "s" : ""}
                {migrateBanner.learnLessons > 0 && <>, and {migrateBanner.learnLessons} completed lesson{migrateBanner.learnLessons !== 1 ? "s" : ""}</>}
                {" "}in this browser.
              </span>
              <button
                onClick={handleMigrate}
                disabled={migrating}
                style={{
                  padding: "5px 14px", background: `${C.teal}1A`, border: `1px solid ${C.teal}44`,
                  borderRadius: 4, color: C.teal, fontFamily: F.mono, fontSize: 11,
                  cursor: migrating ? "wait" : "pointer", opacity: migrating ? 0.6 : 1,
                }}
              >
                {migrating ? "migrating..." : "sync to your account"}
              </button>
              <button
                onClick={dismissMigrate}
                style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}
              >
                dismiss
              </button>
            </>
          ) : (
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>
              Data synced to your account successfully.
            </span>
          )}
        </div>
      )}

      {/* User menu */}
      <div ref={ref} style={{ position: "relative" }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "flex", alignItems: "center", gap: 6, padding: "5px 10px",
            background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4,
            color: C.textMuted, fontFamily: F.mono, fontSize: 11, cursor: "pointer",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = `${C.teal}66`}
          onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.borderColor = C.border; }}
        >
          <span style={{
            width: 20, height: 20, borderRadius: "50%", background: `${C.teal}33`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: F.mono, fontSize: 10, color: C.teal, fontWeight: 600,
          }}>
            {displayName[0].toUpperCase()}
          </span>
          {displayName}
        </button>

        {menuOpen && (
          <div style={{
            position: "absolute", top: "calc(100% + 6px)", right: 0, minWidth: 180,
            background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6,
            padding: "6px 0", zIndex: 100, boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}>
            <div style={{ padding: "8px 14px", borderBottom: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, wordBreak: "break-all" }}>{user.email}</p>
            </div>
            <button
              onClick={() => { signOut(); setMenuOpen(false); }}
              style={{
                width: "100%", textAlign: "left", padding: "10px 14px", background: "none",
                border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 11,
                cursor: "pointer", transition: "color 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = C.coral; e.currentTarget.style.background = `${C.coral}0A`; }}
              onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.background = "none"; }}
            >
              sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
}
