// ── Contract Specs Inline ───────────────────────────────────────────────────
//
// A compact inline reference that shows a contract's tick size, tick value,
// and point value, plus the dollar-equivalent risk and reward for a specific
// trade. Meant to sit directly below a setup diagram so readers see the
// abstract points translated into real money for the trade shown above.
//
// Includes a small ES/MES-style toggle between a full-size contract and its
// micro equivalent, since most readers care about both: "what does this look
// like on ES" and "what would I risk on MES for the same setup."
//
// ── Usage ──────────────────────────────────────────────────────────────────
//
// In StrategyGuideClient.js, render it after the SetupDiagram:
//
//   {strategy.diagram && (
//     <ContractSpecsInline
//       symbol={strategy.diagram.symbol}
//       entry={strategy.diagram.entry}
//       stop={strategy.diagram.stop}
//       target={strategy.diagram.target}
//       color={strategy.color}
//     />
//   )}
//
// Renders nothing if the symbol isn't in the local CONTRACTS list.

"use client";
import { useState } from "react";
import { C, F } from "@/lib/constants";

// ── Contract data ───────────────────────────────────────────────────────────
//
// Same three fields as in JournalClient.js — tick size, tick value, point value.
// Duplicated here intentionally so this widget has no dependency on the
// journal code.
//
// `micro` pairs a full-size contract with its micro equivalent, so the toggle
// can jump between them without extra configuration.

const CONTRACTS = [
  { symbol: "ES",  name: "E-mini S&P 500",     tickSize: 0.25,    tickValue: 12.50,  pointValue: 50,     micro: "MES" },
  { symbol: "MES", name: "Micro E-mini S&P",   tickSize: 0.25,    tickValue: 1.25,   pointValue: 5,      parent: "ES" },
  { symbol: "NQ",  name: "E-mini Nasdaq-100",  tickSize: 0.25,    tickValue: 5.00,   pointValue: 20,     micro: "MNQ" },
  { symbol: "MNQ", name: "Micro E-mini Nas",   tickSize: 0.25,    tickValue: 0.50,   pointValue: 2,      parent: "NQ" },
  { symbol: "YM",  name: "E-mini Dow",         tickSize: 1,       tickValue: 5.00,   pointValue: 5,      micro: "MYM" },
  { symbol: "MYM", name: "Micro E-mini Dow",   tickSize: 1,       tickValue: 0.50,   pointValue: 0.5,    parent: "YM" },
  { symbol: "RTY", name: "E-mini Russell",     tickSize: 0.1,     tickValue: 5.00,   pointValue: 50,     micro: "M2K" },
  { symbol: "M2K", name: "Micro E-mini Rus",   tickSize: 0.1,     tickValue: 0.50,   pointValue: 5,      parent: "RTY" },
  { symbol: "CL",  name: "Crude Oil",          tickSize: 0.01,    tickValue: 10.00,  pointValue: 1000,   micro: "MCL" },
  { symbol: "MCL", name: "Micro Crude",        tickSize: 0.01,    tickValue: 1.00,   pointValue: 100,    parent: "CL" },
  { symbol: "GC",  name: "Gold",               tickSize: 0.10,    tickValue: 10.00,  pointValue: 100,    micro: "MGC" },
  { symbol: "MGC", name: "Micro Gold",         tickSize: 0.10,    tickValue: 1.00,   pointValue: 10,     parent: "GC" },
  { symbol: "SI",  name: "Silver",             tickSize: 0.005,   tickValue: 25.00,  pointValue: 5000 },
  { symbol: "NG",  name: "Natural Gas",        tickSize: 0.001,   tickValue: 10.00,  pointValue: 10000 },
  { symbol: "ZN",  name: "10-Year Note",       tickSize: 0.015625, tickValue: 15.625, pointValue: 1000 },
  { symbol: "ZB",  name: "30-Year Bond",       tickSize: 0.03125, tickValue: 31.25,  pointValue: 1000 },
  { symbol: "6E",  name: "Euro FX",            tickSize: 0.00005, tickValue: 6.25,   pointValue: 125000 },
];

function findContract(symbol) {
  return CONTRACTS.find(c => c.symbol === symbol) || null;
}

// Format a tick size — special-case 1/32nds etc. for readability
function formatTickSize(t) {
  if (t == null) return "—";
  // Keep whole numbers clean, short decimals clean, trim trailing zeros on long ones
  if (Number.isInteger(t)) return String(t);
  // 0.015625 = 1/64, 0.03125 = 1/32 — treasury-style fractions. Show as decimal
  // since traders recognize both forms, and decimal is less visually noisy in
  // a compact pill.
  return String(t);
}

function formatDollars(n, signed) {
  if (n == null || !isFinite(n)) return "—";
  const abs = Math.abs(n);
  const fmt = abs >= 1000
    ? "$" + abs.toLocaleString("en-US", { maximumFractionDigits: 0 })
    : "$" + abs.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (!signed) return fmt;
  if (n > 0) return "+" + fmt;
  if (n < 0) return "-" + fmt;
  return fmt;
}

// ── Main component ──────────────────────────────────────────────────────────

export default function ContractSpecsInline({ symbol, entry, stop, target, color }) {
  const accent = color || C.teal;

  // Validate the incoming symbol. If it's not in our list, render nothing —
  // the widget is strictly additive, never a blocker.
  const primary = findContract(symbol);
  if (!primary) return null;

  // Figure out the paired micro (or parent) contract, if any, for the toggle.
  // Derived fresh on each render from the primary contract's metadata.
  const pairSymbol = primary.micro || primary.parent || null;
  const pair = pairSymbol ? findContract(pairSymbol) : null;

  // Which contract is the user currently viewing?
  // Default to the primary symbol from the diagram (usually the full-size).
  const [activeSymbol, setActiveSymbol] = useState(symbol);
  const active = findContract(activeSymbol) || primary;

  // Compute points risk/reward from diagram data. Safe to leave undefined if
  // the strategy doesn't provide one.
  const riskPts = entry != null && stop != null ? Math.abs(entry - stop) : null;
  const rewardPts = entry != null && target != null ? Math.abs(target - entry) : null;

  const riskDollars = riskPts != null ? riskPts * active.pointValue : null;
  const rewardDollars = rewardPts != null ? rewardPts * active.pointValue : null;
  const hasTradeMath = riskDollars != null || rewardDollars != null;

  return (
    <div style={{
      background: C.bgCard,
      border: `1px solid ${C.border}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: "0 6px 6px 0",
      padding: "12px 18px",
      marginBottom: 32,
      marginTop: -16, // Sit closer to the diagram above
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>

        {/* Left — contract name + specs row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontFamily: F.mono, fontSize: 12, fontWeight: 500, color: accent, letterSpacing: 0.5 }}>
            {active.symbol}
          </span>
          <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>
            tick {formatTickSize(active.tickSize)} · {formatDollars(active.tickValue)}/tick · {formatDollars(active.pointValue)}/pt
          </span>
        </div>

        {/* Middle — trade math (only if diagram supplied entry/stop/target) */}
        {hasTradeMath && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            {riskDollars != null && (
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>
                  {riskPts}pt risk
                </span>
                <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.coral }}>
                  {formatDollars(-riskDollars, true)}
                </span>
              </div>
            )}
            {riskDollars != null && rewardDollars != null && (
              <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>·</span>
            )}
            {rewardDollars != null && (
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontFamily: F.mono, fontSize: 10, color: C.textMuted }}>
                  {rewardPts}pt reward
                </span>
                <span style={{ fontFamily: F.mono, fontSize: 14, fontWeight: 500, color: C.green }}>
                  {formatDollars(rewardDollars, true)}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Right — toggle between full-size and micro (only if a pair exists) */}
        {pair && (
          <div style={{ display: "flex", gap: 3 }}>
            {[primary, pair].map(c => {
              const isActive = c.symbol === active.symbol;
              return (
                <button key={c.symbol} onClick={() => setActiveSymbol(c.symbol)}
                  style={{
                    padding: "4px 10px",
                    background: isActive ? `${accent}2E` : "transparent",
                    border: `1px solid ${isActive ? `${accent}80` : C.border}`,
                    borderRadius: 3,
                    color: isActive ? accent : C.textMuted,
                    fontFamily: F.mono, fontSize: 10, cursor: "pointer",
                    transition: "all 0.15s",
                  }}>
                  {c.symbol}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
