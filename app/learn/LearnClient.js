"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { C, F, catColors } from "@/lib/constants";
import { getLessonUrl, TYPE_LABELS } from "@/lib/learningPath";

const STORAGE_KEY = "tt_learn_progress";
const SUBSCRIBED_KEY = "tt_subscribed";

// ─── Email Capture ───────────────────────────────────────────────────────────

function EmailCapture({ variant = "default", phaseTitle = "" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [focused, setFocused] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(SUBSCRIBED_KEY) === "true") {
        setAlreadySubscribed(true);
      }
    } catch {}
  }, []);

  const hooks = {
    default: {
      label: "Stay sharp",
      text: "Get notified when we publish new terms, guides, and prop firm updates.",
    },
    phase: {
      label: "Phase complete",
      text: `You finished "${phaseTitle}." Want weekly insights to keep the momentum going?`,
    },
    propfirm: {
      label: "Rules change fast",
      text: "Prop firms update their terms constantly. Get alerts when we spot changes that affect your account.",
    },
  };

  const hook = hooks[variant] || hooks.default;

  const handleSubmit = () => {
    if (!email || !email.includes("@")) return;
    setStatus("submitting");

    // ── Replace with your ConvertKit or Buttondown API call ──
    // fetch('https://api.convertkit.com/v3/forms/YOUR_FORM_ID/subscribe', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ api_key: 'your_public_key', email }),
    // }).then(() => { ... })

    // Simulated for now:
    setTimeout(() => {
      setStatus("success");
      try { localStorage.setItem(SUBSCRIBED_KEY, "true"); } catch {}
    }, 1000);
  };

  if (alreadySubscribed) return null;

  if (status === "success") {
    return (
      <div style={{
        background: C.bgCard, border: `1px solid ${C.teal}`, borderLeft: `3px solid ${C.teal}`,
        borderRadius: 8, padding: "24px 28px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.green, fontSize: 20 }}>✓</span>
          <span style={{ fontFamily: F.mono, fontSize: 13, color: C.green, letterSpacing: 0.5 }}>SUBSCRIBED</span>
        </div>
        <p style={{ fontFamily: F.body, fontSize: 14, color: C.textSecondary, margin: "10px 0 0", lineHeight: 1.5 }}>
          You're in. We'll only email when there's something worth reading.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${focused ? "rgba(93,202,165,0.35)" : C.border}`,
      borderLeft: `3px solid ${C.teal}`, borderRadius: 8, padding: "24px 28px",
      transition: "border-color 0.3s ease",
    }}>
      <div style={{
        fontFamily: F.mono, fontSize: 11, color: C.teal, textTransform: "uppercase",
        letterSpacing: 1.5, marginBottom: 6, opacity: 0.8,
      }}>{hook.label}</div>
      <p style={{
        fontFamily: F.body, fontSize: 14, color: C.textSecondary, margin: "0 0 16px", lineHeight: 1.55,
      }}>{hook.text}</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <input
          type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          placeholder="you@example.com"
          style={{
            flex: "1 1 200px", background: C.bgSurface,
            border: `1px solid ${focused ? "rgba(93,202,165,0.35)" : C.border}`,
            borderRadius: 6, padding: "10px 14px", fontFamily: F.body, fontSize: 16,
            color: C.textPrimary, outline: "none", transition: "border-color 0.2s", minWidth: 0,
          }}
        />
        <button onClick={handleSubmit} disabled={status === "submitting"}
          style={{
            background: status === "submitting" ? C.bgSurface : C.teal,
            color: status === "submitting" ? C.textMuted : C.bg,
            border: "none", borderRadius: 6, padding: "10px 20px", fontFamily: F.mono,
            fontSize: 13, fontWeight: 600, cursor: status === "submitting" ? "wait" : "pointer",
            letterSpacing: 0.5, transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
          {status === "submitting" ? "..." : "SUBSCRIBE"}
        </button>
      </div>
      <p style={{ fontFamily: F.body, fontSize: 11, color: C.textMuted, margin: "10px 0 0" }}>
        No spam. Unsubscribe anytime. We email maybe twice a month.
      </p>
    </div>
  );
}

// ─── Lesson Row ──────────────────────────────────────────────────────────────

function LessonRow({ lesson, completed, onToggle, index }) {
  const [hovered, setHovered] = useState(false);
  const catColor = catColors[lesson.category] || C.teal;
  const url = getLessonUrl(lesson);
  const typeLabel = TYPE_LABELS[lesson.type] || "GLOSSARY";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: "10px 12px", background: hovered ? C.bgCardHover : "transparent",
        borderRadius: 6, borderLeft: `2px solid ${completed ? C.green : "transparent"}`,
        transition: "background 0.15s", flexWrap: "wrap",
      }}
    >
      {/* Checkbox */}
      <div
        onClick={onToggle}
        style={{
          width: 20, height: 20, borderRadius: 4,
          border: `2px solid ${completed ? C.green : hovered ? C.textSecondary : C.textMuted}`,
          background: completed ? C.green : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, cursor: "pointer", transition: "all 0.2s",
        }}
      >
        {completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6L5 8.5L9.5 3.5" stroke={C.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Clickable lesson link — takes remaining space */}
      <Link href={url} style={{
        flex: "1 1 0%", display: "flex", alignItems: "center", gap: 8,
        textDecoration: "none", minWidth: 0, overflow: "hidden",
      }}>
        <span style={{
          fontFamily: F.body, fontSize: 14,
          color: completed ? C.textMuted : hovered ? C.teal : C.textPrimary,
          textDecoration: completed ? "line-through" : "none",
          transition: "color 0.15s", overflow: "hidden",
          textOverflow: "ellipsis", whiteSpace: "nowrap",
        }}>
          {lesson.title}
        </span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
          style={{
            flexShrink: 0, opacity: hovered ? 0.8 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-4px)",
            transition: "all 0.2s ease",
          }}>
          <path d="M5 3L9 7L5 11" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {/* Reading time — always visible, compact */}
      <span style={{
        fontFamily: F.mono, fontSize: 11, color: C.textMuted,
        flexShrink: 0, whiteSpace: "nowrap",
      }}>
        {lesson.time}m
      </span>
    </div>
  );
}

// ─── Phase Card ──────────────────────────────────────────────────────────────

function PhaseCard({ phase, progress, onToggleLesson, defaultExpanded }) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const completedCount = phase.lessons.filter((l) => progress[phase.phase + "-" + l.slug]).length;
  const totalCount = phase.lessons.length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isComplete = totalCount > 0 && completedCount === totalCount;
  const totalTime = phase.lessons.reduce((s, l) => s + l.time, 0);
  const nextLesson = phase.lessons.find((l) => !progress[phase.phase + "-" + l.slug]);

  return (
    <div style={{
      background: C.bgCard, border: `1px solid ${isComplete ? `${C.green}40` : C.border}`,
      borderRadius: 10, overflow: "hidden", transition: "border-color 0.3s",
    }}>
      {/* Header */}
      <div onClick={() => setExpanded(!expanded)}
        style={{
          padding: "16px 16px 16px 20px", cursor: "pointer", userSelect: "none",
        }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, marginTop: 2,
            background: isComplete ? `${C.green}15` : `rgba(93,202,165,0.12)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, fontSize: 18, color: isComplete ? C.green : C.teal,
            transition: "all 0.3s",
          }}>
            {isComplete ? "✓" : phase.icon}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
              <span style={{
                fontFamily: F.mono, fontSize: 11, color: C.textMuted,
                textTransform: "uppercase", letterSpacing: 1.5,
              }}>Phase {phase.phase}</span>
              <span style={{
                fontFamily: F.display, fontSize: 15, color: isComplete ? C.green : C.textPrimary,
                fontWeight: 600,
              }}>{phase.title}</span>
            </div>
            <p style={{
              fontFamily: F.body, fontSize: 13, color: C.textMuted,
              margin: "4px 0 0", lineHeight: 1.4,
            }}>{phase.subtitle}</p>
            {/* Continue hint when collapsed and in progress */}
            {!expanded && nextLesson && completedCount > 0 && (
              <div style={{
                fontFamily: F.mono, fontSize: 11, color: C.teal,
                marginTop: 6, opacity: 0.7, display: "flex", alignItems: "center", gap: 6,
              }}>
                <span>▸</span>
                <span>Continue: {nextLesson.title}</span>
              </div>
            )}
            {/* Stats row — below the title so it never competes for space */}
            <div style={{
              display: "flex", alignItems: "center", gap: 12, marginTop: 8,
            }}>
              <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>~{totalTime}min</span>
              <span style={{
                fontFamily: F.mono, fontSize: 12, fontWeight: 600,
                color: isComplete ? C.green : pct > 0 ? C.teal : C.textMuted,
              }}>{completedCount}/{totalCount}</span>
              <div style={{ flex: 1 }} />
              <svg width="16" height="16" viewBox="0 0 16 16"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s ease", color: C.textMuted }}>
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 2, background: C.bgSurface, margin: "0 20px" }}>
        <div style={{
          height: 2, width: `${pct}%`, background: isComplete ? C.green : C.teal,
          borderRadius: 1, transition: "width 0.4s ease",
        }} />
      </div>

      {/* Lessons */}
      {expanded && (
        <div style={{ padding: "12px 8px 16px" }}>
          {phase.lessons.map((lesson, i) => (
            <LessonRow
              key={lesson.slug}
              lesson={lesson}
              completed={!!progress[phase.phase + "-" + lesson.slug]}
              onToggle={() => onToggleLesson(phase.phase, lesson.slug)}
              index={i}
            />
          ))}
          {isComplete && (
            <div style={{ padding: "12px 16px 4px" }}>
              <EmailCapture variant="phase" phaseTitle={phase.title} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function LearnClient({ learningPath }) {
  const [progress, setProgress] = useState({});
  const [loaded, setLoaded] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {}
  }, [progress, loaded]);

  const totalLessons = useMemo(
    () => learningPath.reduce((s, p) => s + p.lessons.length, 0),
    [learningPath]
  );
  const completedLessons = Object.values(progress).filter(Boolean).length;
  const overallPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const totalTime = useMemo(
    () => learningPath.reduce((s, p) => s + p.lessons.reduce((a, l) => a + l.time, 0), 0),
    [learningPath]
  );
  const completedPhases = learningPath.filter(
    (p) => p.lessons.length > 0 && p.lessons.every((l) => progress[p.phase + "-" + l.slug])
  ).length;

  // Find current position
  const currentPhase = learningPath.find(
    (p) => !p.lessons.every((l) => progress[p.phase + "-" + l.slug])
  );
  const currentLesson = currentPhase?.lessons.find(
    (l) => !progress[currentPhase.phase + "-" + l.slug]
  );

  const toggleLesson = (phase, slug) => {
    const key = phase + "-" + slug;
    setProgress((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetProgress = () => {
    if (window.confirm("Reset all progress? This cannot be undone.")) {
      setProgress({});
    }
  };

  if (!loaded) return null;

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px" }}>
      {/* Breadcrumb */}
      <div style={{
        fontFamily: F.mono, fontSize: 12, color: C.textMuted,
        padding: "28px 0 0", display: "flex", alignItems: "center", gap: 8,
      }}>
        <Link href="/" style={{ color: C.teal, textDecoration: "none" }}>TRADETERMINAL</Link>
        <span>/</span>
        <span>LEARN</span>
      </div>

      {/* Header */}
      <div style={{ padding: "28px 0 32px" }}>
        <h1 style={{
          fontFamily: F.display, fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700,
          color: C.textPrimary, margin: "0 0 8px", letterSpacing: -0.5,
        }}>
          Learning Path<span style={{ color: C.teal }}>_</span>
        </h1>
        <p style={{
          fontFamily: F.body, fontSize: 15, color: C.textSecondary, lineHeight: 1.55, maxWidth: 600,
        }}>
          Zero to funded in 7 phases. Every lesson links to content on TradeTerminal.
          Check off what you've read and pick up where you left off.
        </p>
      </div>

      {/* Overall Progress */}
      <div style={{
        background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 10,
        padding: "16px 20px", marginBottom: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          {/* Circular progress */}
          <div style={{ position: "relative", width: 48, height: 48, flexShrink: 0 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="24" cy="24" r="20" fill="none" stroke={C.bgSurface} strokeWidth="4" />
              <circle cx="24" cy="24" r="20" fill="none"
                stroke={overallPct === 100 ? C.green : C.teal} strokeWidth="4" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - overallPct / 100)}`}
                style={{ transition: "stroke-dashoffset 0.6s ease" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: F.mono, fontSize: 12, fontWeight: 700,
              color: overallPct === 100 ? C.green : C.teal,
            }}>{overallPct}%</div>
          </div>

          <div style={{ flex: 1, display: "flex", gap: 20, flexWrap: "wrap", minWidth: 0 }}>
            {[
              { label: "LESSONS", value: `${completedLessons}/${totalLessons}` },
              { label: "PHASES", value: `${completedPhases}/${learningPath.length}` },
              { label: "EST. TIME", value: `~${totalTime}m` },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1.5, marginBottom: 2 }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: F.mono, fontSize: 15, color: C.textPrimary, fontWeight: 600 }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {completedLessons > 0 && (
            <button onClick={resetProgress}
              style={{
                background: "none", border: `1px solid ${C.border}`, borderRadius: 6,
                padding: "6px 12px", fontFamily: F.mono, fontSize: 10,
                color: C.textMuted, cursor: "pointer", letterSpacing: 1, transition: "all 0.2s",
              }}
              onMouseEnter={(e) => { e.target.style.borderColor = C.coral; e.target.style.color = C.coral; }}
              onMouseLeave={(e) => { e.target.style.borderColor = C.border; e.target.style.color = C.textMuted; }}
            >RESET</button>
          )}
        </div>

        {/* Continue where you left off */}
        {currentLesson && completedLessons > 0 && (
          <div style={{
            marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap",
          }}>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted, letterSpacing: 1 }}>
              CONTINUE
            </span>
            <Link href={getLessonUrl(currentLesson)} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(93,202,165,0.12)", borderRadius: 6, padding: "8px 14px",
              textDecoration: "none",
            }}>
              <span style={{ fontFamily: F.body, fontSize: 14, color: C.teal, fontWeight: 500 }}>
                {currentLesson.title}
              </span>
              <span style={{
                fontFamily: F.mono, fontSize: 9, color: C.textMuted,
                background: `${C.textMuted}15`, padding: "2px 6px", borderRadius: 3, letterSpacing: 0.5,
              }}>
                {TYPE_LABELS[currentLesson.type] || "GLOSSARY"}
              </span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                <path d="M5 3L9 7L5 11" stroke={C.teal} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>
              Phase {currentPhase.phase} · {currentLesson.time}min
            </span>
          </div>
        )}
      </div>

      {/* Phase cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingBottom: 60 }}>
        {learningPath.map((phase, i) => (
          <PhaseCard
            key={phase.phase}
            phase={phase}
            progress={progress}
            onToggleLesson={toggleLesson}
            defaultExpanded={i === 0}
          />
        ))}

        {/* Bottom email capture */}
        <div style={{ marginTop: 12 }}>
          <EmailCapture variant="default" />
        </div>
      </div>
    </div>
  );
}
