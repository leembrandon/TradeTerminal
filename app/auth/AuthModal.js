"use client";
import { useState } from "react";
import { C, F } from "@/lib/constants";
import { useAuth } from "@/lib/auth";

export default function AuthModal() {
  const { showAuth, setShowAuth, refreshUser } = useAuth();
  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!showAuth) return null;

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const res = await fetch("/api/auth/google", { method: "POST", credentials: "include" });
      const data = await res.json();
      if (data.error) { setError(data.error); return; }
      if (data.url) window.location.href = data.url;
    } catch { setError("Something went wrong. Try again."); }
  };

  const handleEmailSignIn = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else {
        await refreshUser();
        setShowAuth(false);
        resetForm();
      }
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const handleEmailSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else {
        setMessage(data.message || "Check your email for a confirmation link.");
        setEmail("");
        setPassword("");
      }
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.error) { setError(data.error); }
      else { setMessage(data.message || "Check your email for a password reset link."); }
    } catch { setError("Something went wrong. Try again."); }
    setLoading(false);
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setError("");
    setMessage("");
    setMode("signin");
  };

  const close = () => {
    setShowAuth(false);
    resetForm();
  };

  return (
    <div
      onClick={close}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.75)", display: "flex", alignItems: "center",
        justifyContent: "center", zIndex: 200, padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 8,
          padding: "32px 28px", maxWidth: 400, width: "100%",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: F.display, fontSize: 20, fontWeight: 700 }}>
            {mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Reset password"}
          </h2>
          <button
            onClick={close}
            style={{ background: "none", border: "none", color: C.textMuted, fontSize: 20, cursor: "pointer", padding: "4px 8px" }}
          >
            x
          </button>
        </div>

        {/* Google OAuth */}
        {mode !== "forgot" && (
          <>
            <button
              onClick={handleGoogleSignIn}
              style={{
                width: "100%", padding: "12px 16px", background: C.bg,
                border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary,
                fontFamily: F.body, fontSize: 15, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "border-color 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${C.teal}66`}
              onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1 }}>OR</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>
          </>
        )}

        {/* Email form */}
        <div>
          <label style={{ display: "block", fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: "100%", padding: "10px 14px", background: C.bg,
              border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary,
              fontFamily: F.body, fontSize: 16, outline: "none", marginBottom: 12,
              transition: "border-color 0.2s", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = `${C.teal}66`}
            onBlur={e => e.target.style.borderColor = C.border}
          />

          {mode !== "forgot" && (
            <>
              <label style={{ display: "block", fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                style={{
                  width: "100%", padding: "10px 14px", background: C.bg,
                  border: `1px solid ${C.border}`, borderRadius: 4, color: C.textPrimary,
                  fontFamily: F.body, fontSize: 16, outline: "none", marginBottom: 6,
                  transition: "border-color 0.2s", boxSizing: "border-box",
                }}
                onFocus={e => e.target.style.borderColor = `${C.teal}66`}
                onBlur={e => e.target.style.borderColor = C.border}
              />
            </>
          )}

          {mode === "signin" && (
            <div style={{ textAlign: "right", marginBottom: 16 }}>
              <button
                onClick={() => { setMode("forgot"); setError(""); setMessage(""); }}
                style={{ background: "none", border: "none", color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}
                onMouseEnter={e => e.currentTarget.style.color = C.teal}
                onMouseLeave={e => e.currentTarget.style.color = C.textMuted}
              >
                Forgot password?
              </button>
            </div>
          )}

          {error && (
            <div style={{ padding: "8px 12px", background: `${C.coral}15`, border: `1px solid ${C.coral}33`, borderRadius: 4, marginBottom: 12 }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: C.coral }}>{error}</p>
            </div>
          )}

          {message && (
            <div style={{ padding: "8px 12px", background: `${C.green}15`, border: `1px solid ${C.green}33`, borderRadius: 4, marginBottom: 12 }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: C.green }}>{message}</p>
            </div>
          )}

          <button
            onClick={mode === "signin" ? handleEmailSignIn : mode === "signup" ? handleEmailSignUp : handleForgotPassword}
            disabled={loading}
            style={{
              width: "100%", padding: "12px 16px", background: `${C.teal}1A`,
              border: `1px solid ${C.teal}44`, borderRadius: 4, color: C.teal,
              fontFamily: F.mono, fontSize: 13, fontWeight: 500, cursor: loading ? "wait" : "pointer",
              transition: "background 0.2s", marginTop: mode === "forgot" ? 12 : 0,
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.background = `${C.teal}33`; }}
            onMouseLeave={e => e.currentTarget.style.background = `${C.teal}1A`}
          >
            {loading
              ? "..."
              : mode === "signin"
                ? "Sign in with email"
                : mode === "signup"
                  ? "Create account"
                  : "Send reset link"
            }
          </button>
        </div>

        {/* Toggle mode */}
        <div style={{ marginTop: 20, textAlign: "center" }}>
          {mode === "signin" && (
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>
              No account?{" "}
              <button
                onClick={() => { setMode("signup"); setError(""); setMessage(""); }}
                style={{ background: "none", border: "none", color: C.teal, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}
              >
                Create one
              </button>
            </p>
          )}
          {(mode === "signup" || mode === "forgot") && (
            <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>
              Already have an account?{" "}
              <button
                onClick={() => { setMode("signin"); setError(""); setMessage(""); }}
                style={{ background: "none", border: "none", color: C.teal, fontFamily: F.mono, fontSize: 11, cursor: "pointer" }}
              >
                Sign in
              </button>
            </p>
          )}
        </div>

        {/* Privacy note */}
        <p style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
          Your data is private and encrypted. We never sell your data.
        </p>
      </div>
    </div>
  );
}
