import JournalClient from "./JournalClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Trading Journal — Log Your Futures Trading Sessions",
  description: "Track your daily futures trading sessions. Log results, P&L, emotional state, and lessons learned. Build a record of your trading performance over time. Free, private, saved in your browser.",
  keywords: ["trading journal", "futures journal", "trading log", "trade tracker", "trading performance", "trading psychology"],
  alternates: { canonical: `${siteUrl}/journal` },
  openGraph: {
    title: "Trading Journal — Log Your Futures Trading Sessions",
    description: "Track your daily futures trading sessions. Log results, P&L, emotional state, and lessons learned. Free, private, saved in your browser.",
    url: `${siteUrl}/journal`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Trading Journal — Log Your Futures Trading Sessions",
    description: "Track your daily futures trading sessions. Log results, P&L, emotional state, and lessons learned.",
  },
};

export default function JournalPage() {
  return <JournalClient />;
}
