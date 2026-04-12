"use client";
import { useState } from "react";
import Link from "next/link";
import { C, F } from "@/lib/constants";
import { getSiteUrl } from "@/lib/utils";

const firms = [
  {
    id: "topstep",
    name: "TopStep",
    founded: "2012",
    hq: "Chicago, IL",
    url: "https://www.topstep.com",
    tagline: "The original. Strictest rules, strongest reputation, best education.",
    accountSizes: ["$50K", "$100K", "$150K"],
    evalCost: "$49 / $99 / $149 per month",
    evalType: "1-step (Trading Combine)",
    minDays: "No minimum",
    profitTarget: "$3,000 / $6,000 / $9,000 (6%)",
    drawdownType: "End-of-day trailing",
    drawdownAmount: "$2,000 / $3,000 / $4,500",
    dailyLossLimit: "None (EOD MLL only)",
    profitSplit: "100% of first $10K, then 90/10",
    activationFee: "$149",
    payoutSpeed: "1-3 business days",
    payoutFrequency: "Daily (after 30 winning days)",
    consistencyRule: "None during evaluation",
    platforms: "TopstepX (exclusive)",
    maxAccounts: "5 simultaneous",
    newsTrading: "Allowed",
    overnightHolding: "Not allowed",
    pricing: "Monthly subscription",
    color: "#3B82F6",
    pros: [
      "Longest track record in the industry (since 2012)",
      "End-of-day drawdown gives breathing room for intraday pullbacks",
      "No consistency rule during evaluation",
      "Strong education (TopstepTV, coaching, webinars)",
      "100% of first $10K in profits",
    ],
    cons: [
      "Monthly subscription fees add up if you don't pass quickly",
      "$149 activation fee after passing",
      "TopstepX is the only platform option (no NinjaTrader, TradingView)",
      "Stricter payout schedule in early funded phase",
      "No overnight or swing trading",
    ],
    bestFor: "Beginners who want structure, education, and the most trusted name in futures prop trading. The EOD drawdown is forgiving for new traders learning to manage intraday volatility.",
  },
  {
    id: "apex",
    name: "Apex Trader Funding",
    founded: "2021",
    hq: "Austin, TX",
    url: "https://www.apextraderfunding.com",
    tagline: "Biggest scale, biggest promotions, most rule changes.",
    accountSizes: ["$25K", "$50K", "$100K", "$150K", "$300K"],
    evalCost: "$147 - $517/mo (frequent 50-80% off sales)",
    evalType: "1-step evaluation",
    minDays: "1 day (eval), 8 days (funded payout)",
    profitTarget: "$1,500 - $20,000 (varies by size)",
    drawdownType: "Trailing (EOD or intraday option)",
    drawdownAmount: "Varies by account ($2,500 - $7,500)",
    dailyLossLimit: "None (trailing drawdown only)",
    profitSplit: "100% of first $25K, then 90/10",
    activationFee: "Varies (new model as of March 2026)",
    payoutSpeed: "5 business days via Deel",
    payoutFrequency: "Twice monthly",
    consistencyRule: "None in eval, 50% in funded (March 2026)",
    platforms: "Rithmic, Tradovate, NinjaTrader, TradingView, WealthCharts",
    maxAccounts: "20 simultaneous",
    newsTrading: "Allowed (with conditions)",
    overnightHolding: "Not allowed",
    pricing: "Monthly subscription (transitioning to one-time)",
    color: "#EF9F27",
    pros: [
      "100% of first $25K in profits (highest in industry)",
      "Widest platform selection (Rithmic, Tradovate, NinjaTrader, TradingView)",
      "Up to 20 simultaneous accounts",
      "Frequent 50-80% off promotions make evaluation very affordable",
      "Largest account sizes available (up to $300K)",
    ],
    cons: [
      "March 2026 rule overhaul added complexity (mandatory brackets, 50% consistency)",
      "Payout structure has tiered caps for first 6 payouts",
      "Account closes after 6 payouts (new model)",
      "Trustpilot sentiment has declined with frequent rule changes",
      "Full-price evaluation fees are expensive without sales",
    ],
    bestFor: "Experienced traders who want maximum capital, platform flexibility, and can navigate a more complex rule set. Wait for a sale before buying an evaluation.",
  },
  {
    id: "tradeify",
    name: "Tradeify",
    founded: "2022",
    hq: "Boca Raton, FL",
    url: "https://tradeify.co",
    tagline: "Most flexible. Choose your funded path after you pass.",
    accountSizes: ["$25K", "$50K", "$100K", "$150K"],
    evalCost: "$97 - $359 one-time (Growth/Select)",
    evalType: "1-step (Growth: 1-day min, Select: 3-day min)",
    minDays: "1 day (Growth) or 3 days (Select)",
    profitTarget: "$3,000 / $6,000 / $9,000",
    drawdownType: "End-of-day trailing (locks after buffer)",
    drawdownAmount: "$2,000 - $4,500 (locks at starting balance + drawdown + $100)",
    dailyLossLimit: "Growth: yes, Select: no (Flex option)",
    profitSplit: "90/10 (80/20 on some plans)",
    activationFee: "$0",
    payoutSpeed: "24-48 hours (1 hour on live accounts)",
    payoutFrequency: "Every 5 days (Flex) or daily (Daily option)",
    consistencyRule: "35% (Growth funded), 40% (Select eval), 0% (Select Flex funded)",
    platforms: "Tradovate, NinjaTrader 8, TradingView (via Tradovate)",
    maxAccounts: "5 simultaneous",
    newsTrading: "Allowed (unrestricted)",
    overnightHolding: "Not allowed",
    pricing: "One-time fee (no subscriptions)",
    color: "#5DCAA5",
    pros: [
      "$0 activation fee on all accounts",
      "One-time pricing (no monthly subscriptions)",
      "Select lets you choose your funded path after passing the evaluation",
      "EOD drawdown that locks once you build a buffer",
      "Lightning option for instant funding (no evaluation)",
      "Path to Elite Live (real capital) after 5 payouts",
    ],
    cons: [
      "Newer firm (2022), shorter payout track record than TopStep",
      "Rule complexity across three account families (Select, Growth, Lightning)",
      "80/20 split on some account types unless upgraded",
      "Select Daily funded path has more restrictions than Flex",
      "Micro-scalping rule: 50%+ of trades must be held longer than 10 seconds",
    ],
    bestFor: "Traders who want flexibility and hate subscriptions. The Select Flex path (no funded consistency rule, no daily loss limit, $0 activation) is one of the most trader-friendly funded structures available.",
  },
  {
    id: "lucid",
    name: "Lucid Trading",
    founded: "2025",
    hq: "United States",
    url: "https://lucidtrading.com",
    tagline: "Newest entrant. Cleanest rules, fastest payouts.",
    accountSizes: ["$25K", "$50K", "$100K", "$150K"],
    evalCost: "$110 - $350 one-time (varies by account type)",
    evalType: "1-step (LucidFlex, LucidPro) or instant (LucidDirect)",
    minDays: "1 day (Pro) or 5 days (Flex)",
    profitTarget: "$3,000 - $9,000 (varies by size)",
    drawdownType: "End-of-day trailing",
    drawdownAmount: "4% of initial balance",
    dailyLossLimit: "LucidPro: yes, LucidFlex: no",
    profitSplit: "90/10 (100% of first $10K on Pro/Direct)",
    activationFee: "$50 (Pro) / $0 (Flex)",
    payoutSpeed: "15 minutes average",
    payoutFrequency: "Every 3 days (Pro) or per cycle (Flex)",
    consistencyRule: "50% (eval only on Flex), 35-40% (Pro/Direct funded)",
    platforms: "Rithmic, Tradovate, NinjaTrader, Quantower",
    maxAccounts: "5 (10 total across all phases)",
    newsTrading: "Allowed",
    overnightHolding: "Not allowed (until Live phase)",
    pricing: "One-time fee (no subscriptions)",
    color: "#AFA9EC",
    pros: [
      "15-minute average payout processing (fastest in industry)",
      "LucidFlex: no daily loss limit AND no funded consistency rule",
      "One-time fees, no monthly subscriptions",
      "Clean, straightforward rule set compared to competitors",
      "EOD drawdown on all account types",
      "Path to LucidLive (real capital) after 6 payouts",
    ],
    cons: [
      "Very new firm (launched 2025), limited track record",
      "No overnight holding until you reach Live phase",
      "Payout caps per cycle on Flex accounts ($1,500-$4,000)",
      "50%+ of profits must come from trades held longer than 5 seconds",
      "LucidLive transition caps at $5,000 transfer regardless of account profits",
    ],
    bestFor: "Traders who value clean rules and fast payouts above all else. LucidFlex is the most permissive funded account in the industry (no DLL, no consistency). Best for those comfortable with a newer firm.",
  },
];

const comparisonRows = [
  { label: "Founded", key: "founded" },
  { label: "Evaluation cost", key: "evalCost" },
  { label: "Evaluation type", key: "evalType" },
  { label: "Min. trading days", key: "minDays" },
  { label: "Profit target", key: "profitTarget" },
  { label: "Drawdown type", key: "drawdownType", important: true },
  { label: "Drawdown amount", key: "drawdownAmount" },
  { label: "Daily loss limit", key: "dailyLossLimit", important: true },
  { label: "Profit split", key: "profitSplit", important: true },
  { label: "Activation fee", key: "activationFee" },
  { label: "Payout speed", key: "payoutSpeed" },
  { label: "Payout frequency", key: "payoutFrequency" },
  { label: "Consistency rule", key: "consistencyRule", important: true },
  { label: "Platforms", key: "platforms" },
  { label: "Max accounts", key: "maxAccounts" },
  { label: "News trading", key: "newsTrading" },
  { label: "Overnight holding", key: "overnightHolding" },
  { label: "Pricing model", key: "pricing" },
];

function ShareBtn({ label }) {
  const [toast, setToast] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(getSiteUrl() + "/prop-firms").then(() => { setToast(true); setTimeout(() => setToast(false), 2000); });
  };
  return (
    <div style={{ position: "relative", display: "inline-flex" }}>
      <button onClick={copy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "transparent", border: `1px solid ${C.border}`, borderRadius: 4, color: C.textMuted, fontFamily: F.mono, fontSize: 10, cursor: "pointer" }}>{label || "share"}</button>
      {toast && <span style={{ position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)", marginTop: 6, padding: "4px 10px", background: C.bgSurface, border: `1px solid ${C.teal}33`, borderRadius: 4, fontFamily: F.mono, fontSize: 9, color: C.teal, whiteSpace: "nowrap", zIndex: 10 }}>copied</span>}
    </div>
  );
}

export default function PropFirmsClient() {
  const [expandedFirm, setExpandedFirm] = useState(null);
  const [highlightCol, setHighlightCol] = useState(null);

  return (
    <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 20px" }}>
      {/* Nav */}
      <div style={{ padding: "20px 0", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/"><span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 700, color: C.textPrimary }}>TradeTerminal<span style={{ color: C.teal }}>_</span></span></Link>
          <span style={{ color: C.textMuted, fontFamily: F.mono, fontSize: 12 }}>/</span>
          <span style={{ color: C.teal, fontFamily: F.mono, fontSize: 12 }}>prop-firms</span>
        </div>
        <ShareBtn label="share this page" />
      </div>

      {/* Hero */}
      <div style={{ padding: "48px 0 36px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <span style={{ padding: "3px 10px", background: `${C.green}22`, color: C.green, fontFamily: F.mono, fontSize: 10, borderRadius: 3, letterSpacing: 1, textTransform: "uppercase" }}>comparison</span>
          <span style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>Updated April 2026</span>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 700, letterSpacing: -0.5, marginBottom: 14, lineHeight: 1.15 }}>
          Futures Prop Firm Comparison
        </h1>
        <p style={{ fontSize: 15, color: C.textSecondary, lineHeight: 1.8, maxWidth: 700 }}>
          Side-by-side comparison of TopStep, Apex Trader Funding, Tradeify, and Lucid Trading. Real data, no affiliate rankings, no "top 5 best" listicles. Just the numbers and the fine print so you can decide for yourself.
        </p>

        {/* Disclaimer */}
        <div style={{ marginTop: 20, padding: "12px 16px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, fontSize: 12, color: C.textMuted, lineHeight: 1.7, fontFamily: F.body }}>
          <span style={{ color: C.amber, fontFamily: F.mono, fontSize: 10, marginRight: 8 }}>NOTE</span>
          Prop firm rules change frequently. Verify all details directly with each firm before purchasing an evaluation. Prices shown are standard rates. Most firms offer periodic discounts. This page contains affiliate links, which means we may earn a commission if you sign up through our links at no extra cost to you.
        </div>
      </div>

      {/* Quick picks */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.teal }}>$</span>quick picks
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {[
            { label: "Best for beginners", firm: "TopStep", reason: "Strongest education, EOD drawdown, longest track record", color: "#3B82F6" },
            { label: "Best profit retention", firm: "Apex", reason: "100% of first $25K. Wait for a sale.", color: "#EF9F27" },
            { label: "Most flexible", firm: "Tradeify", reason: "Choose funded path after passing. $0 activation. One-time fee.", color: "#5DCAA5" },
            { label: "Fastest payouts", firm: "Lucid", reason: "15-min avg payout. No funded consistency on Flex.", color: "#AFA9EC" },
          ].map((pick, i) => (
            <div key={i} style={{ padding: "16px 18px", background: C.bgCard, border: `1px solid ${C.border}`, borderTop: `3px solid ${pick.color}`, borderRadius: 0 }}>
              <p style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>{pick.label}</p>
              <p style={{ fontFamily: F.mono, fontSize: 15, fontWeight: 600, color: pick.color, marginBottom: 6 }}>{pick.firm}</p>
              <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{pick.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.teal }}>$</span>side-by-side comparison
        </h2>
        <div style={{ overflowX: "auto", border: `1px solid ${C.border}`, borderRadius: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: F.mono, fontSize: 12, minWidth: 800 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                <th style={{ textAlign: "left", padding: "12px 14px", color: C.textMuted, fontWeight: 400, fontSize: 10, letterSpacing: 1, textTransform: "uppercase", width: 160, background: C.bgCard, position: "sticky", left: 0, zIndex: 2 }}></th>
                {firms.map(f => (
                  <th key={f.id}
                    onMouseEnter={() => setHighlightCol(f.id)}
                    onMouseLeave={() => setHighlightCol(null)}
                    style={{ textAlign: "left", padding: "12px 14px", borderLeft: `1px solid ${C.border}`, background: highlightCol === f.id ? `${f.color}11` : C.bgCard, transition: "background 0.2s" }}>
                    <span style={{ color: f.color, fontSize: 13, fontWeight: 600 }}>{f.name}</span>
                    <br />
                    <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 400 }}>{f.tagline.split(".")[0]}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr key={row.key} style={{ borderBottom: `1px solid ${C.border}`, background: row.important ? `${C.teal}08` : "transparent" }}>
                  <td style={{ padding: "10px 14px", color: row.important ? C.textPrimary : C.textMuted, fontWeight: row.important ? 500 : 400, fontSize: 11, background: C.bgCard, position: "sticky", left: 0, zIndex: 1, borderRight: `1px solid ${C.border}` }}>
                    {row.label}
                    {row.important && <span style={{ color: C.teal, marginLeft: 4 }}>*</span>}
                  </td>
                  {firms.map(f => (
                    <td key={f.id}
                      onMouseEnter={() => setHighlightCol(f.id)}
                      onMouseLeave={() => setHighlightCol(null)}
                      style={{ padding: "10px 14px", color: C.textSecondary, fontSize: 11, borderLeft: `1px solid ${C.border}`, background: highlightCol === f.id ? `${f.color}08` : "transparent", transition: "background 0.2s", lineHeight: 1.5 }}>
                      {f[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 10, color: C.textMuted, marginTop: 8, fontFamily: F.mono }}>* highlighted rows = most impactful rules for your success. Scroll horizontally on mobile.</p>
      </div>

      {/* Individual firm deep dives */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.teal }}>$</span>firm-by-firm breakdown
        </h2>

        {firms.map(f => (
          <div key={f.id} id={f.id} style={{ marginBottom: 16, border: `1px solid ${C.border}`, background: C.bgCard, overflow: "hidden" }}>
            {/* Header - always visible */}
            <button
              onClick={() => setExpandedFirm(expandedFirm === f.id ? null : f.id)}
              style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 4, height: 36, background: f.color, borderRadius: 2 }} />
                <div>
                  <p style={{ fontFamily: F.mono, fontSize: 16, fontWeight: 600, color: C.textPrimary, marginBottom: 2 }}>{f.name}</p>
                  <p style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>{f.tagline}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: F.mono, fontSize: 11, color: C.textMuted }}>est. {f.founded}</p>
                  <p style={{ fontFamily: F.mono, fontSize: 11, color: f.color }}>{f.profitSplit.split(",")[0]}</p>
                </div>
                <span style={{ fontFamily: F.mono, fontSize: 16, color: C.textMuted, transition: "transform 0.2s", transform: expandedFirm === f.id ? "rotate(180deg)" : "rotate(0)" }}>
                  v
                </span>
              </div>
            </button>

            {/* Expanded content */}
            {expandedFirm === f.id && (
              <div style={{ padding: "0 20px 24px", borderTop: `1px solid ${C.border}` }}>
                {/* Best for */}
                <div style={{ padding: "16px 0", marginBottom: 16, borderBottom: `1px solid ${C.border}` }}>
                  <p style={{ fontFamily: F.mono, fontSize: 10, color: f.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>best for</p>
                  <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>{f.bestFor}</p>
                </div>

                {/* Key specs grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10, marginBottom: 20 }}>
                  {[
                    { label: "Account sizes", value: f.accountSizes.join(", ") },
                    { label: "Eval cost", value: f.evalCost },
                    { label: "Drawdown", value: f.drawdownType },
                    { label: "Platforms", value: f.platforms },
                    { label: "Payout speed", value: f.payoutSpeed },
                    { label: "Activation fee", value: f.activationFee },
                  ].map((spec, i) => (
                    <div key={i} style={{ padding: "10px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: 4 }}>
                      <p style={{ fontFamily: F.mono, fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{spec.label}</p>
                      <p style={{ fontFamily: F.mono, fontSize: 12, color: C.textPrimary, lineHeight: 1.5 }}>{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Pros and Cons */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
                  <div>
                    <p style={{ fontFamily: F.mono, fontSize: 10, color: C.green, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>pros</p>
                    {f.pros.map((pro, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: C.green, fontFamily: F.mono, fontSize: 11, flexShrink: 0, marginTop: 1 }}>+</span>
                        <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{pro}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontFamily: F.mono, fontSize: 10, color: C.coral, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10 }}>cons</p>
                    {f.cons.map((con, i) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                        <span style={{ color: C.coral, fontFamily: F.mono, fontSize: 11, flexShrink: 0, marginTop: 1 }}>-</span>
                        <p style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.6 }}>{con}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visit link */}
                <a href={f.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: `${f.color}22`, border: `1px solid ${f.color}44`, borderRadius: 4, fontFamily: F.mono, fontSize: 11, color: f.color, textDecoration: "none" }}>
                  Visit {f.name} <span style={{ fontSize: 13 }}>{">"}</span>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* The rule that matters most */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.amber }}>!</span>the rule that matters most
        </h2>
        <div style={{ padding: "20px 24px", background: C.bgCard, border: `1px solid ${C.border}`, borderLeft: `3px solid ${C.amber}`, lineHeight: 1.8 }}>
          <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 14 }}>
            Before you compare prices, profit splits, or payout speed, look at one thing: <strong style={{ color: C.textPrimary }}>how the firm calculates drawdown</strong>.
          </p>
          <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 14 }}>
            <strong style={{ color: C.textPrimary }}>End-of-day (EOD) drawdown</strong> checks your balance at market close. You can be down $1,800 intraday and fight back to positive by the close. Your drawdown limit is evaluated once, at end of day. TopStep, Tradeify, and Lucid all use EOD drawdown.
          </p>
          <p style={{ fontSize: 14, color: C.textSecondary, marginBottom: 14 }}>
            <strong style={{ color: C.textPrimary }}>Intraday trailing drawdown</strong> follows your equity in real time. If you're up $2,000 and pull back $1,500 during the session, your drawdown limit ratchets up and never comes back down. A trade that pulls back before reaching your target can fail your account even if you close the day in profit. Apex offers this as one of their drawdown options.
          </p>
          <p style={{ fontSize: 14, color: C.textSecondary }}>
            For most traders, especially beginners, EOD drawdown dramatically increases your odds of survival. The price difference between firms is negligible compared to how drawdown type affects your probability of passing.
          </p>
        </div>
      </div>

      {/* How to choose */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.teal }}>$</span>how to choose
        </h2>
        <div style={{ display: "grid", gap: 12 }}>
          {[
            { q: "I'm brand new to futures and prop firms", a: "Start with TopStep. The education resources and community support are unmatched, and the end-of-day drawdown is forgiving while you learn. The $50K account at $49/month is a low-risk entry point." },
            { q: "I want the cheapest path to a funded account", a: "Wait for an Apex sale (50-80% off regularly) or use Tradeify Growth. With Apex sales, a $50K evaluation can drop to $35/month. Tradeify Growth is a one-time $97 fee for a $50K account." },
            { q: "I want the simplest, cleanest rules", a: "Lucid Trading's LucidFlex has the fewest restrictions once funded: no daily loss limit, no consistency rule, EOD drawdown. The tradeoff is it's the newest firm with the shortest track record." },
            { q: "I want maximum flexibility in my funded account", a: "Tradeify Select lets you pass one evaluation and then choose between two different funded paths (Flex or Daily). No other firm offers this. $0 activation fee is a bonus." },
            { q: "I'm an experienced trader who wants to scale", a: "Apex lets you run up to 20 simultaneous accounts. If you have a proven edge and want to maximize capital deployed, nobody matches Apex's scale potential." },
          ].map((item, i) => (
            <div key={i} style={{ padding: "16px 20px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 0 }}>
              <p style={{ fontFamily: F.mono, fontSize: 12, color: C.teal, marginBottom: 6 }}>{"> "}{item.q}</p>
              <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7 }}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related glossary terms */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontFamily: F.mono, fontSize: 17, fontWeight: 500, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.teal }}>$</span>learn the fundamentals first
        </h2>
        <p style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.7, marginBottom: 16 }}>
          Before choosing a prop firm, make sure you understand these concepts. Each links to a full deep-dive in our glossary.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {[
            { term: "Drawdown", slug: "drawdown" },
            { term: "Position Sizing", slug: "position-sizing" },
            { term: "Risk-Reward Ratio", slug: "risk-reward-ratio" },
            { term: "Margin", slug: "margin" },
            { term: "Mark to Market", slug: "mark-to-market" },
            { term: "Prop Firm / Funded Account", slug: "prop-firm" },
            { term: "Day Trade Margin", slug: "day-trade-margin" },
            { term: "Leverage", slug: "leverage" },
          ].map(t => (
            <Link key={t.slug} href={`/glossary/${t.slug}`}>
              <span style={{ padding: "8px 14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 6, fontFamily: F.mono, fontSize: 12, color: C.textSecondary, cursor: "pointer" }}>
                {t.term} {">"}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "28px 24px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 0, textAlign: "center", marginBottom: 48 }}>
        <p style={{ fontFamily: F.mono, fontSize: 13, color: C.textPrimary, marginBottom: 6 }}>Know someone evaluating prop firms?</p>
        <p style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>Share this comparison so they can make an informed decision.</p>
        <ShareBtn label="share this comparison" />
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
  );
}
