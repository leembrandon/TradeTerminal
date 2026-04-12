import { glossaryTerms } from '@/lib/glossary';
import { firmReviews } from '@/lib/firmReviews';
import { marketGuides } from '@/lib/marketGuides';

export default function sitemap() {
  const base = 'https://tradeterminal.org';

  const glossaryPages = glossaryTerms.map((term) => ({
    url: `${base}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const firmPages = firmReviews.map((firm) => ({
    url: `${base}/prop-firms/${firm.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const marketPages = marketGuides.map((market) => ({
    url: `${base}/markets/${market.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/glossary`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/prop-firms`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${base}/markets`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    ...firmPages,
    ...marketPages,
    ...glossaryPages,
  ];
}
