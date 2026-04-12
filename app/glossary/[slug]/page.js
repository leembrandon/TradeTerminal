import { glossaryTerms, getTermBySlug, getAdjacentTerms } from "@/lib/glossary";
import { notFound } from "next/navigation";
import TermPageClient from "./TermPageClient";

export async function generateStaticParams() {
  return glossaryTerms
    .filter(t => t.page)
    .map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};
  return {
    title: `${term.term} — Futures Glossary — TradeTerminal`,
    description: term.page?.tldr || term.tldr,
  };
}

export default async function TermPage({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term || !term.page) notFound();
  const { prev, next } = getAdjacentTerms(slug);
  return <TermPageClient term={term} prev={prev} next={next} />;
}
