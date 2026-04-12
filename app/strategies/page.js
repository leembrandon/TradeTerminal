import { strategyGuides } from "@/lib/strategyGuides";
import StrategiesIndexClient from "./StrategiesIndexClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Futures Trading Strategies — 5 Setups Explained with Real Examples",
  description: "Common futures trading strategies explained with setup rules, entry and exit criteria, worked examples with real numbers, and when each strategy works and fails. No fluff, no signal selling.",
  keywords: ["futures trading strategy", "opening range breakout", "VWAP pullback", "gap fill strategy", "trend following futures", "support resistance trading"],
  alternates: { canonical: `${siteUrl}/strategies` },
  openGraph: {
    title: "Futures Trading Strategies — 5 Setups Explained",
    description: "Common futures trading strategies explained with setup rules, real examples, and when each works and fails.",
    url: `${siteUrl}/strategies`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Futures Trading Strategies — 5 Setups Explained",
    description: "Setup rules, worked examples, and when each strategy works and fails.",
  },
};

export default function StrategiesPage() {
  return <StrategiesIndexClient strategies={strategyGuides} />;
}
