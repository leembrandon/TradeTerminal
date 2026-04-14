// Learning path configuration.
// Phase metadata is defined here. Lesson lists are assembled dynamically
// from glossary.js, strategyGuides.js, marketGuides.js, and firmReviews.js.
//
// To add a lesson to the learning path, add `learnPhase` and `learnOrder`
// to the term/guide object in its source file. Terms without those fields
// won't appear here. The learning path page builds itself at render time.

import { glossaryTerms } from "./glossary";
import { strategyGuides } from "./strategyGuides";
import { marketGuides } from "./marketGuides";
import { firmReviews } from "./firmReviews";

// ─── Phase definitions (the only thing you edit here) ────────────────────────
export const phases = [
  {
    phase: 1,
    title: "What Are Futures?",
    subtitle: "Core concepts every trader must know before placing a single trade",
    icon: "◈",
  },
  {
    phase: 2,
    title: "How the Market Works",
    subtitle: "Orders, execution, and the mechanics of buying and selling",
    icon: "⟐",
  },
  {
    phase: 3,
    title: "Pick Your Market",
    subtitle: "Explore 6 major futures markets and find where you fit",
    icon: "◇",
  },
  {
    phase: 4,
    title: "Reading the Market",
    subtitle: "Tools and techniques for understanding price action and structure",
    icon: "△",
  },
  {
    phase: 5,
    title: "Trading Strategies",
    subtitle: "Five proven approaches with entry rules, exits, and risk parameters",
    icon: "⬡",
  },
  {
    phase: 6,
    title: "Managing Risk",
    subtitle: "How to protect capital and survive long enough to become profitable",
    icon: "⊡",
  },
  {
    phase: 7,
    title: "Getting Funded",
    subtitle: "Navigate the prop firm landscape and pass your evaluation",
    icon: "◆",
  },
];

// ─── Assemble lessons from all data sources ──────────────────────────────────

function buildLessons() {
  const lessons = [];

  // Glossary terms → type "glossary", links to /glossary/[slug]
  glossaryTerms.forEach((t) => {
    if (t.learnPhase) {
      lessons.push({
        title: t.term,
        slug: t.slug,
        category: t.category,
        type: "glossary",
        learnPhase: t.learnPhase,
        learnOrder: t.learnOrder || 99,
        // Estimate reading time from page content if available
        time: t.page ? Math.max(3, Math.ceil(
          JSON.stringify(t.page).length / 1500
        )) : 3,
      });
    }
  });

  // Strategy guides → type "strategy", links to /strategies/[slug]
  strategyGuides.forEach((s) => {
    if (s.learnPhase) {
      lessons.push({
        title: s.name,
        slug: s.slug,
        category: "strategy",
        type: "strategy",
        learnPhase: s.learnPhase,
        learnOrder: s.learnOrder || 99,
        time: Math.max(5, Math.ceil(
          JSON.stringify(s.sections || s).length / 1500
        )),
      });
    }
  });

  // Market guides → type "market", links to /markets/[slug]
  marketGuides.forEach((m) => {
    if (m.learnPhase) {
      lessons.push({
        title: m.name,
        slug: m.slug,
        category: "markets",
        type: "market",
        learnPhase: m.learnPhase,
        learnOrder: m.learnOrder || 99,
        time: Math.max(5, Math.ceil(
          JSON.stringify(m.overview || m).length / 1500
        )),
      });
    }
  });

  // Firm reviews → type "review", links to /prop-firms/[slug]
  firmReviews.forEach((f) => {
    if (f.learnPhase) {
      lessons.push({
        title: `${f.name} Review`,
        slug: f.slug,
        category: "industry",
        type: "review",
        learnPhase: f.learnPhase,
        learnOrder: f.learnOrder || 99,
        time: Math.max(5, Math.ceil(
          JSON.stringify(f.overview || f).length / 1500
        )),
      });
    }
  });

  // Manual entries for pages that don't live in a data file
  lessons.push({
    title: "Prop Firm Comparison",
    slug: "prop-firms",
    category: "industry",
    type: "propfirm",
    learnPhase: 7,
    learnOrder: 2,
    time: 12,
  });

  return lessons;
}

// ─── Build the full learning path ────────────────────────────────────────────

export function getLearningPath() {
  const allLessons = buildLessons();

  return phases.map((phase) => ({
    ...phase,
    lessons: allLessons
      .filter((l) => l.learnPhase === phase.phase)
      .sort((a, b) => a.learnOrder - b.learnOrder),
  }));
}

// ─── URL helper ──────────────────────────────────────────────────────────────

const URL_PREFIXES = {
  glossary: "/glossary/",
  strategy: "/strategies/",
  market: "/markets/",
  review: "/prop-firms/",
  propfirm: "/prop-firms",
};

export function getLessonUrl(lesson) {
  if (lesson.type === "propfirm") return "/prop-firms";
  const prefix = URL_PREFIXES[lesson.type] || "/glossary/";
  return prefix + lesson.slug;
}

// ─── Content type labels ─────────────────────────────────────────────────────

export const TYPE_LABELS = {
  glossary: "GLOSSARY",
  strategy: "STRATEGY GUIDE",
  market: "MARKET GUIDE",
  review: "FIRM REVIEW",
  propfirm: "COMPARISON",
};
