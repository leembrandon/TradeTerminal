import { getLearningPath } from "@/lib/learningPath";
import LearnClient from "./LearnClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Learning Path — Zero to Funded in 7 Phases",
  description: "A structured path through every futures trading concept on TradeTerminal. Start from the basics, understand the markets, learn strategies, manage risk, and get funded at a prop firm.",
  keywords: ["learn futures trading", "futures trading course", "free futures education", "how to trade futures", "futures trading for beginners", "prop firm preparation"],
  alternates: { canonical: `${siteUrl}/learn` },
  openGraph: {
    title: "Learning Path — Zero to Funded in 7 Phases",
    description: "A structured path through every futures trading concept. Start from the basics, understand the markets, master strategies, and get funded.",
    url: `${siteUrl}/learn`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Learning Path — Zero to Funded in 7 Phases",
    description: "A structured path through every futures trading concept. Start from the basics and get funded.",
  },
};

export default function LearnPage() {
  const learningPath = getLearningPath();
  return <LearnClient learningPath={learningPath} />;
}
