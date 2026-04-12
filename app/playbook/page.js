import PlaybookClient from "./PlaybookClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Trading Playbook Builder — Build Your Personal Futures Trading Plan",
  description: "Create your own futures trading playbook. Build step-by-step setups, pre-market checklists, entry and exit rules, and risk management plans. Saved locally in your browser.",
  keywords: ["trading playbook", "trading plan", "futures trading plan", "pre-market checklist", "trading journal", "trade setup builder"],
  alternates: { canonical: `${siteUrl}/playbook` },
  openGraph: {
    title: "Trading Playbook Builder — Your Personal Futures Trading Plan",
    description: "Build step-by-step trade setups, pre-market checklists, and risk management plans. Free, private, saved in your browser.",
    url: `${siteUrl}/playbook`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Trading Playbook Builder — Your Personal Futures Trading Plan",
    description: "Build step-by-step trade setups, pre-market checklists, and risk management plans.",
  },
};

export default function PlaybookPage() {
  return <PlaybookClient />;
}
