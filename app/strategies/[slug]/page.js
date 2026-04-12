import { strategyGuides, getStrategyBySlug, getAdjacentStrategies } from "@/lib/strategyGuides";
import { notFound } from "next/navigation";
import StrategyGuideClient from "./StrategyGuideClient";

const siteUrl = "https://tradeterminal.org";

export async function generateStaticParams() {
  return strategyGuides.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) return {};

  const title = `${strategy.name} Strategy — Futures Trading Setup Explained`;
  const description = strategy.tldr;
  const url = `${siteUrl}/strategies/${strategy.slug}`;

  return {
    title,
    description,
    keywords: [strategy.name, "futures strategy", "trading setup", "day trading", strategy.difficulty],
    alternates: { canonical: url },
    openGraph: {
      title: `${strategy.name} — Futures Trading Strategy`,
      description,
      url,
      type: "article",
      siteName: "TradeTerminal",
    },
    twitter: {
      card: "summary",
      title: `${strategy.name} — Futures Trading Strategy`,
      description,
    },
  };
}

export default async function StrategyGuidePage({ params }) {
  const { slug } = await params;
  const strategy = getStrategyBySlug(slug);
  if (!strategy) notFound();
  const { prev, next } = getAdjacentStrategies(slug);

  const faqItems = strategy.sections.map(s => ({
    "@type": "Question",
    name: s.heading,
    acceptedAnswer: {
      "@type": "Answer",
      text: s.body.split("\n\n")[0],
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
      <StrategyGuideClient strategy={strategy} prev={prev} next={next} />
    </>
  );
}
