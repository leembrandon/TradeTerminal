import Link from "next/link";

export const metadata = {
  title: "Terms of Service",
  description: "TradeTerminal terms of service. Usage terms, disclaimers, and legal information.",
  alternates: {
    canonical: "https://tradeterminal.org/terms",
  },
  openGraph: {
    title: "Terms of Service | TradeTerminal",
    description: "TradeTerminal terms of service. Usage terms, disclaimers, and legal information.",
    url: "https://tradeterminal.org/terms",
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Terms of Service | TradeTerminal",
    description: "TradeTerminal terms of service. Usage terms, disclaimers, and legal information.",
  },
};

export default function TermsPage() {
  const F = {
    display: "'JetBrains Mono', 'Fira Code', monospace",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  };

  const sectionStyle = {
    marginBottom: 40,
  };

  const h2Style = {
    fontFamily: F.mono,
    fontSize: 18,
    fontWeight: 600,
    color: "var(--text-primary)",
    marginBottom: 14,
    letterSpacing: "-0.01em",
  };

  const h3Style = {
    fontFamily: F.mono,
    fontSize: 14,
    fontWeight: 500,
    color: "var(--teal)",
    marginBottom: 8,
  };

  const pStyle = {
    fontFamily: "var(--font-body)",
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    marginBottom: 16,
  };

  const liStyle = {
    fontSize: 15,
    lineHeight: 1.75,
    color: "var(--text-secondary)",
    marginBottom: 6,
  };

  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px" }}>
      {/* Header */}
      <header style={{ padding: "48px 0 28px", borderBottom: "1px solid var(--border)" }}>
        <Link href="/" style={{ fontFamily: F.mono, fontSize: 11, color: "var(--text-muted)", letterSpacing: 1, textTransform: "uppercase" }}>
          ← Back to TradeTerminal
        </Link>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: -1, marginTop: 20, marginBottom: 6, lineHeight: 1.1 }}>
          Terms of Service<span style={{ color: "var(--teal)" }}>_</span>
        </h1>
        <p style={{ fontFamily: F.mono, fontSize: 12, color: "var(--text-muted)" }}>
          Last updated: April 15, 2026
        </p>
      </header>

      {/* Content */}
      <div style={{ padding: "40px 0 80px" }}>

        {/* Agreement */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Agreement to Terms</h2>
          <p style={pStyle}>
            By accessing or using tradeterminal.org (&ldquo;TradeTerminal,&rdquo; &ldquo;the site,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the site.
          </p>
        </div>

        {/* What We Provide */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Provide</h2>
          <p style={pStyle}>
            TradeTerminal is a free educational resource for futures trading. We provide glossary definitions, market guides, strategy explainers, a playbook builder, a trading journal, a structured learning path, and prop firm reviews. All content is educational in nature.
          </p>
        </div>

        {/* Not Financial Advice */}
        <div style={{ ...sectionStyle, padding: 20, background: "var(--bg-card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--coral)", borderRadius: 6 }}>
          <h2 style={{ ...h2Style, color: "var(--coral)" }}>Not Financial Advice</h2>
          <p style={{ ...pStyle, marginBottom: 0 }}>
            Nothing on this site constitutes financial advice, investment advice, trading advice, or any other sort of professional advice. All content is for educational and informational purposes only. Trading futures involves substantial risk of loss and is not suitable for all investors. You should consult a qualified financial advisor before making any trading decisions. Past performance is not indicative of future results. We are not a registered investment advisor, broker-dealer, or financial planner.
          </p>
        </div>

        {/* Accounts */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>User Accounts</h2>

          <h3 style={h3Style}>Account Creation</h3>
          <p style={pStyle}>
            You may create an account using Google sign-in or email and password. You are responsible for maintaining the security of your account credentials. You must provide accurate information when creating an account.
          </p>

          <h3 style={h3Style}>Account Data</h3>
          <p style={pStyle}>
            When signed in, your playbooks, journal entries, and learning progress are stored in our database. You retain ownership of all content you create. We do not claim any rights to your playbooks, journal entries, or other user-generated content.
          </p>

          <h3 style={h3Style}>Account Termination</h3>
          <p style={pStyle}>
            You may delete your account at any time. We reserve the right to suspend or terminate accounts that violate these terms. Upon account deletion, your stored data will be permanently removed from our systems.
          </p>
        </div>

        {/* Acceptable Use */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Acceptable Use</h2>
          <p style={pStyle}>You agree not to:</p>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={liStyle}>Use the site for any unlawful purpose</li>
            <li style={liStyle}>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
            <li style={liStyle}>Scrape, crawl, or use automated tools to extract content from the site without permission</li>
            <li style={liStyle}>Redistribute, republish, or resell our content as your own</li>
            <li style={liStyle}>Interfere with or disrupt the site&apos;s operation</li>
            <li style={liStyle}>Use the site to distribute malware, spam, or phishing attempts</li>
          </ul>
        </div>

        {/* Intellectual Property */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Intellectual Property</h2>
          <p style={pStyle}>
            All content on TradeTerminal (text, design, code, graphics, and layout) is owned by us and protected by copyright. You may share links to any page. You may not copy, reproduce, or redistribute our content in bulk without written permission. Quoting short excerpts with attribution and a link back is fine.
          </p>
        </div>

        {/* Affiliate Links */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Affiliate Links</h2>
          <p style={pStyle}>
            Some links on the site, particularly on prop firm review and comparison pages, may be affiliate links. If you click an affiliate link and make a purchase or sign up for a service, we may receive a commission at no additional cost to you. Affiliate relationships do not influence our editorial content, reviews, or recommendations. All affiliate links are disclosed on the relevant pages.
          </p>
        </div>

        {/* User Content */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>User-Generated Content</h2>
          <p style={pStyle}>
            Content you create using the Playbook Builder and Trading Journal belongs to you. By using these tools, you grant us permission to store and display that content back to you as part of the service. We will not publicly share your private content. If we introduce features like shareable playbooks in the future, sharing will always be opt-in and under your control.
          </p>
        </div>

        {/* Disclaimer */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Disclaimer of Warranties</h2>
          <p style={pStyle}>
            The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, either express or implied. We do not guarantee that the site will be uninterrupted, error-free, or free of harmful components. We make no warranties about the accuracy, reliability, or completeness of any content, including but not limited to contract specifications, margin requirements, prop firm details, or strategy descriptions. Market data and trading information can change rapidly. Always verify critical information with your broker or the relevant exchange.
          </p>
        </div>

        {/* Limitation */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Limitation of Liability</h2>
          <p style={pStyle}>
            To the fullest extent permitted by law, TradeTerminal and its owners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, or goodwill. This includes, without limitation, any losses resulting from trading decisions made based on information found on this site.
          </p>
        </div>

        {/* Changes */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Changes to These Terms</h2>
          <p style={pStyle}>
            We may update these terms from time to time. The &ldquo;Last updated&rdquo; date at the top will reflect the most recent revision. Continued use of the site after changes constitutes acceptance of the updated terms. For significant changes, we will notify registered users by email.
          </p>
        </div>

        {/* Governing Law */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Governing Law</h2>
          <p style={pStyle}>
            These terms are governed by the laws of the United States. Any disputes arising from these terms or your use of the site will be resolved in accordance with applicable U.S. law.
          </p>
        </div>

        {/* Contact */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Contact</h2>
          <p style={pStyle}>
            Questions about these terms? Reach us at{" "}
            <span style={{ color: "var(--teal)" }}>legal@tradeterminal.org</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
