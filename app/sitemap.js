import { glossaryTerms } from '@/lib/glossary';

export default function sitemap() {
  const base = 'https://tradesterminal.vercel.app'; // swap with your custom domain when you have one

  const glossaryPages = glossaryTerms.map((term) => ({
    url: `${base}/glossary/${term.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...glossaryPages,
  ];
}
