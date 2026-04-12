import { marketGuides, getMarketBySlug, getAdjacentMarkets } from "@/lib/marketGuides";
import { notFound } from "next/navigation";
import MarketGuideClient from "./MarketGuideClient";

const siteUrl = "https://tradeterminal.org";

export async function generateStaticParams() {
  return marketGuides.map(m => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) return {};

  const title = `${market.name} — How to Trade ${market.shortName} Futures`;
  const description = market.tldr;
  const url = `${siteUrl}/markets/${market.slug}`;

  return {
    title,
    description,
    keywords: [market.name, "futures", "trading", "contract specifications", "how to trade"],
    alternates: { canonical: url },
    openGraph: {
      title: `${market.name} — Futures Trading Guide`,
      description,
      url,
      type: "article",
      siteName: "TradeTerminal",
    },
    twitter: {
      card: "summary",
      title: `${market.name} — Futures Trading Guide`,
      description,
    },
  };
}

export default async function MarketGuidePage({ params }) {
  const { slug } = await params;
  const market = getMarketBySlug(slug);
  if (!market) notFound();
  const { prev, next } = getAdjacentMarkets(slug);

  const faqItems = market.overview.map(s => ({
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
      <MarketGuideClient market={market} prev={prev} next={next} />
    </>
  );
}
