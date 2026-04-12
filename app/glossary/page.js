import { glossaryTerms } from "@/lib/glossary";
import { catMeta } from "@/lib/constants";
import GlossaryClient from "./GlossaryClient";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  title: "Futures Trading Glossary 54 Terms Explained",
  description: "Every futures trading term you need to know, explained with real examples and zero fluff. Search by category, browse A-Z, or explore by topic.",
  alternates: {
    canonical: `${siteUrl}/glossary`,
  },
  openGraph: {
    title: "Futures Trading Glossary 54 Terms Explained",
    description: "Every futures trading term you need to know, explained with real examples and zero fluff. Search by category, browse A-Z, or explore by topic.",
    url: `${siteUrl}/glossary`,
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Futures Trading Glossary 54 Terms Explained",
    description: "Every futures trading term you need to know, explained with real examples and zero fluff.",
  },
};

export default function GlossaryPage() {
  return <GlossaryClient terms={glossaryTerms} catMeta={catMeta} />;
}
