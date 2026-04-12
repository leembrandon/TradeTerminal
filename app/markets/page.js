import { marketGuides } from "@/lib/marketGuides";
import MarketsIndexClient from "./MarketsIndexClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Futures Markets Guide — Equity Indexes, Energy, Metals, Agriculture, Currencies, Treasuries",
  description: "Comprehensive guides to every major futures market. Contract specs, trading hours, what drives prices, and who trades each market. Your starting point for understanding futures beyond just ES and NQ.",
  keywords: ["futures markets", "equity index futures", "crude oil futures", "gold futures", "treasury futures", "corn futures", "currency futures"],
  alternates: { canonical: `${siteUrl}/markets` },
  openGraph: {
    title: "Futures Markets Guide — 6 Markets Explained",
    description: "Comprehensive guides to every major futures market. Contract specs, trading hours, what drives prices, and who trades each market.",
    url: `${siteUrl}/markets`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Futures Markets Guide — 6 Markets Explained",
    description: "Comprehensive guides to every major futures market. Contract specs, trading hours, and what drives prices.",
  },
};

export default function MarketsPage() {
  return <MarketsIndexClient markets={marketGuides} />;
}
