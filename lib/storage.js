// ── Playbook storage ────────────────────────────────────────────────────────

const PLAYBOOK_LS_KEY = "tt_playbooks";

function loadPlaybooksLocal() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(PLAYBOOK_LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function savePlaybooksLocal(playbooks) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(PLAYBOOK_LS_KEY, JSON.stringify(playbooks)); } catch {}
}

export async function fetchPlaybooks(user) {
  if (!user) return loadPlaybooksLocal();
  try {
    const res = await fetch("/api/playbooks", { credentials: "include" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return (data || []).map(rowToPlaybook);
  } catch { return []; }
}

export async function upsertPlaybook(user, playbook) {
  if (!user) {
    const all = loadPlaybooksLocal();
    const idx = all.findIndex(p => p.id === playbook.id);
    if (idx >= 0) all[idx] = playbook; else all.unshift(playbook);
    savePlaybooksLocal(all);
    return;
  }
  try {
    await fetch("/api/playbooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(playbookToRow(playbook)),
    });
  } catch (e) { console.error("Upsert playbook error:", e); }
}

export async function deletePlaybook(user, id) {
  if (!user) {
    const all = loadPlaybooksLocal().filter(p => p.id !== id);
    savePlaybooksLocal(all);
    return;
  }
  try {
    await fetch(`/api/playbooks?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (e) { console.error("Delete playbook error:", e); }
}

// ── Journal storage ─────────────────────────────────────────────────────────

const JOURNAL_LS_KEY = "tt_journal_v2";

function loadSessionsLocal() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(JOURNAL_LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveSessionsLocal(sessions) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(JOURNAL_LS_KEY, JSON.stringify(sessions)); } catch {}
}

export async function fetchSessions(user) {
  if (!user) return loadSessionsLocal();
  try {
    const res = await fetch("/api/journal", { credentials: "include" });
    if (!res.ok) return [];
    const { data } = await res.json();
    return (data || []).map(rowToSession);
  } catch { return []; }
}

export async function upsertSession(user, session) {
  if (!user) {
    const all = loadSessionsLocal();
    const idx = all.findIndex(s => s.id === session.id);
    if (idx >= 0) all[idx] = session; else all.unshift(session);
    saveSessionsLocal(all);
    return;
  }
  try {
    await fetch("/api/journal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(sessionToRow(session)),
    });
  } catch (e) { console.error("Upsert session error:", e); }
}

export async function deleteSession(user, id) {
  if (!user) {
    const all = loadSessionsLocal().filter(s => s.id !== id);
    saveSessionsLocal(all);
    return;
  }
  try {
    await fetch(`/api/journal?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      credentials: "include",
    });
  } catch (e) { console.error("Delete session error:", e); }
}

// ── Learning path progress storage ──────────────────────────────────────────

const LEARN_LS_KEY = "tt_learn_progress";

function loadLearnLocal() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(LEARN_LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveLearnLocal(progress) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(LEARN_LS_KEY, JSON.stringify(progress)); } catch {}
}

export async function fetchLearnProgress(user) {
  if (!user) return loadLearnLocal();
  try {
    const res = await fetch("/api/learn", { credentials: "include" });
    if (!res.ok) return {};
    const { data } = await res.json();
    return data || {};
  } catch { return {}; }
}

export async function saveLearnProgress(user, progress) {
  if (!user) {
    saveLearnLocal(progress);
    return;
  }
  try {
    await fetch("/api/learn", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ data: progress }),
    });
  } catch (e) { console.error("Save learn progress error:", e); }
}

export async function resetLearnProgress(user) {
  if (!user) {
    if (typeof window !== "undefined") localStorage.removeItem(LEARN_LS_KEY);
    return;
  }
  try {
    await fetch("/api/learn", { method: "DELETE", credentials: "include" });
  } catch (e) { console.error("Reset learn progress error:", e); }
}

// ── Migration: localStorage → cloud ─────────────────────────────────────────

export async function migrateLocalData(user) {
  if (!user) return { playbooks: 0, sessions: 0, learnLessons: 0 };

  let playbookCount = 0;
  let sessionCount = 0;
  let learnLessons = 0;

  const localPlaybooks = loadPlaybooksLocal();
  if (localPlaybooks.length > 0) {
    // Upsert each playbook through the proxy
    const results = await Promise.allSettled(
      localPlaybooks.map(p =>
        fetch("/api/playbooks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(playbookToRow(p)),
        })
      )
    );
    const ok = results.filter(r => r.status === "fulfilled" && r.value.ok).length;
    if (ok === localPlaybooks.length) {
      playbookCount = ok;
      localStorage.removeItem(PLAYBOOK_LS_KEY);
    }
  }

  const localSessions = loadSessionsLocal();
  if (localSessions.length > 0) {
    // Fetch existing cloud sessions to check for date conflicts
    let cloudSessions = [];
    try {
      const res = await fetch("/api/journal", { credentials: "include" });
      if (res.ok) {
        const { data } = await res.json();
        cloudSessions = (data || []).map(rowToSession);
      }
    } catch {}

    // Build a map of cloud sessions by date
    const cloudByDate = {};
    cloudSessions.forEach(s => { cloudByDate[s.date] = s; });

    // For each local session, merge into existing cloud session or create new
    const upsertPromises = localSessions.map(localSession => {
      const existing = cloudByDate[localSession.date];
      if (existing) {
        // Merge: combine trades, keep whichever reflection fields have content
        const merged = {
          ...existing,
          trades: [...existing.trades, ...localSession.trades],
          whatWorked: existing.whatWorked || localSession.whatWorked,
          whatDidnt: existing.whatDidnt || localSession.whatDidnt,
          notes: [existing.notes, localSession.notes].filter(Boolean).join("\n").trim(),
        };
        return fetch("/api/journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(sessionToRow(merged)),
        });
      } else {
        return fetch("/api/journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(sessionToRow(localSession)),
        });
      }
    });

    const results = await Promise.allSettled(upsertPromises);
    const ok = results.filter(r => r.status === "fulfilled" && r.value.ok).length;
    if (ok === localSessions.length) {
      sessionCount = ok;
      localStorage.removeItem(JOURNAL_LS_KEY);
    }
  }

  // Migrate learning path progress
  const localLearn = loadLearnLocal();
  const learnCount = Object.values(localLearn).filter(Boolean).length;
  if (learnCount > 0) {
    try {
      const res = await fetch("/api/learn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ data: localLearn }),
      });
      if (res.ok) {
        learnLessons = learnCount;
        localStorage.removeItem(LEARN_LS_KEY);
      }
    } catch {}
  }

  return { playbooks: playbookCount, sessions: sessionCount, learnLessons };
}

export function hasLocalData() {
  if (typeof window === "undefined") return { hasData: false, playbooks: 0, sessions: 0, learnLessons: 0 };
  try {
    const pb = localStorage.getItem(PLAYBOOK_LS_KEY);
    const j = localStorage.getItem(JOURNAL_LS_KEY);
    const lp = localStorage.getItem(LEARN_LS_KEY);
    const pbCount = pb ? JSON.parse(pb).length : 0;
    const jCount = j ? JSON.parse(j).length : 0;
    const lpCount = lp ? Object.values(JSON.parse(lp)).filter(Boolean).length : 0;
    return { hasData: pbCount > 0 || jCount > 0 || lpCount > 0, playbooks: pbCount, sessions: jCount, learnLessons: lpCount };
  } catch {
    return { hasData: false, playbooks: 0, sessions: 0, learnLessons: 0 };
  }
}

// ── Row ↔ Object mapping ────────────────────────────────────────────────────
// Note: user_id is NOT set here — the server sets it from the session cookie.

function playbookToRow(pb) {
  return {
    id: pb.id,
    name: pb.name || "",
    created_at: pb.createdAt,
    updated_at: pb.updatedAt,
    data: {
      market: pb.market,
      session: pb.session,
      timeframe: pb.timeframe,
      setupName: pb.setupName,
      setupDescription: pb.setupDescription,
      entryRules: pb.entryRules,
      exitRules: pb.exitRules,
      stopLoss: pb.stopLoss,
      targets: pb.targets,
      maxDailyLoss: pb.maxDailyLoss,
      maxPositionSize: pb.maxPositionSize,
      riskPerTrade: pb.riskPerTrade,
      checklist: pb.checklist,
      notes: pb.notes,
    },
  };
}

function rowToPlaybook(row) {
  const d = row.data || {};
  return {
    id: row.id,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    market: d.market || [],
    session: d.session || [],
    timeframe: d.timeframe || [],
    setupName: d.setupName || "",
    setupDescription: d.setupDescription || "",
    entryRules: d.entryRules || [{ id: "r1", text: "" }],
    exitRules: d.exitRules || [{ id: "r2", text: "" }],
    stopLoss: d.stopLoss || "",
    targets: d.targets || [{ id: "t1", text: "" }],
    maxDailyLoss: d.maxDailyLoss || "",
    maxPositionSize: d.maxPositionSize || "",
    riskPerTrade: d.riskPerTrade || "",
    checklist: d.checklist || [{ id: "c1", text: "" }],
    notes: d.notes || "",
  };
}

function sessionToRow(session) {
  return {
    id: session.id,
    date: session.date,
    data: {
      trades: session.trades,
      whatWorked: session.whatWorked,
      whatDidnt: session.whatDidnt,
      notes: session.notes,
    },
  };
}

function rowToSession(row) {
  const d = row.data || {};
  return {
    id: row.id,
    date: row.date,
    trades: d.trades || [],
    whatWorked: d.whatWorked || "",
    whatDidnt: d.whatDidnt || "",
    notes: d.notes || "",
  };
}
