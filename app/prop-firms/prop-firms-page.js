import PropFirmsClient from "./PropFirmsClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Futures Prop Firm Comparison TopStep vs Apex vs Tradeify vs Lucid",
  description: "Honest side-by-side comparison of the top futures prop firms. Evaluation costs, drawdown rules, profit splits, payout speed, and the fine print most reviews skip.",
  keywords: ["futures prop firm", "prop firm comparison", "TopStep review", "Apex Trader Funding", "Tradeify", "Lucid Trading", "best futures prop firm", "funded futures trading"],
  alternates: {
    canonical: `${siteUrl}/prop-firms`,
  },
  openGraph: {
    title: "Futures Prop Firm Comparison TopStep vs Apex vs Tradeify vs Lucid",
    description: "Honest side-by-side comparison of the top futures prop firms. Evaluation costs, drawdown rules, profit splits, payout speed, and the fine print most reviews skip.",
    url: `${siteUrl}/prop-firms`,
    type: "article",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Futures Prop Firm Comparison 4 Firms Compared",
    description: "Honest side-by-side comparison of the top futures prop firms. Evaluation costs, drawdown rules, profit splits, and payout speed.",
  },
};

export default function PropFirmsPage() {
  return <PropFirmsClient />;
}
