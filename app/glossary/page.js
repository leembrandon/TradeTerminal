import { glossaryTerms } from "@/lib/glossary";
import { catMeta } from "@/lib/constants";
import GlossaryClient from "./GlossaryClient";

export const metadata = {
  title: "Futures Glossary — TradeTerminal",
  description: "54 essential futures trading terms explained in plain language. Search by category, browse A-Z, or explore by topic.",
};

export default function GlossaryPage() {
  return <GlossaryClient terms={glossaryTerms} catMeta={catMeta} />;
}
