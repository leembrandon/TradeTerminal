import { firmReviews, getFirmBySlug, getAdjacentFirms } from "@/lib/firmReviews";
import { notFound } from "next/navigation";
import FirmReviewClient from "./FirmReviewClient";

const siteUrl = "https://tradeterminal.org";

export async function generateStaticParams() {
  return firmReviews.map(f => ({ slug: f.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) return {};

  const title = `${firm.name} Review 2026 — Rules, Payouts & Honest Verdict`;
  const description = firm.tldr;
  const url = `${siteUrl}/prop-firms/${firm.slug}`;

  return {
    title,
    description,
    keywords: [firm.name, "review", "futures prop firm", "evaluation rules", "payout", "funded trading"],
    alternates: { canonical: url },
    openGraph: {
      title: `${firm.name} Review — Futures Prop Firm`,
      description,
      url,
      type: "article",
      siteName: "TradeTerminal",
    },
    twitter: {
      card: "summary",
      title: `${firm.name} Review — Futures Prop Firm`,
      description,
    },
  };
}

export default async function FirmReviewPage({ params }) {
  const { slug } = await params;
  const firm = getFirmBySlug(slug);
  if (!firm) notFound();
  const { prev, next } = getAdjacentFirms(slug);

  const faqItems = firm.overview.map(s => ({
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
      <FirmReviewClient firm={firm} prev={prev} next={next} />
    </>
  );
}
