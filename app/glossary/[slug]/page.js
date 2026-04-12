import { glossaryTerms, getTermBySlug, getAdjacentTerms } from "@/lib/glossary";
import { catMeta } from "@/lib/constants";
import { notFound } from "next/navigation";
import TermPageClient from "./TermPageClient";

const siteUrl = "https://tradesterminal.vercel.app";

export async function generateStaticParams() {
  return glossaryTerms
    .filter(t => t.page)
    .map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term) return {};

  const title = `${term.term} in Futures Trading Explained`;
  const description = term.page?.tldr || term.tldr;
  const url = `${siteUrl}/glossary/${term.slug}`;
  const categoryLabel = catMeta[term.category]?.label || term.category;

  return {
    title,
    description,
    keywords: [term.term, "futures trading", "futures glossary", categoryLabel, "trading education"],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${term.term} — Futures Glossary`,
      description,
      url,
      type: "article",
      siteName: "TradeTerminal",
      section: categoryLabel,
    },
    twitter: {
      card: "summary",
      title: `${term.term} — Futures Glossary`,
      description,
    },
  };
}

export default async function TermPage({ params }) {
  const { slug } = await params;
  const term = getTermBySlug(slug);
  if (!term || !term.page) notFound();
  const { prev, next } = getAdjacentTerms(slug);

  // FAQ structured data for Google rich snippets
  const faqItems = term.page.sections.map(s => ({
    "@type": "Question",
    name: s.heading,
    acceptedAnswer: {
      "@type": "Answer",
      text: s.body.split("\n\n")[0], // First paragraph only
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TermPageClient term={term} prev={prev} next={next} />
    </>
  );
}
