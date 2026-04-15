import Link from "next/link";

export const metadata = {
  title: "Privacy Policy",
  description: "TradeTerminal privacy policy. What we collect, how we use it, and your rights.",
  alternates: {
    canonical: "https://tradeterminal.org/privacy",
  },
  openGraph: {
    title: "Privacy Policy | TradeTerminal",
    description: "TradeTerminal privacy policy. What we collect, how we use it, and your rights.",
    url: "https://tradeterminal.org/privacy",
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy | TradeTerminal",
    description: "TradeTerminal privacy policy. What we collect, how we use it, and your rights.",
  },
};

export default function PrivacyPage() {
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
          Privacy Policy<span style={{ color: "var(--teal)" }}>_</span>
        </h1>
        <p style={{ fontFamily: F.mono, fontSize: 12, color: "var(--text-muted)" }}>
          Last updated: April 15, 2026
        </p>
      </header>

      {/* Content */}
      <div style={{ padding: "40px 0 80px" }}>

        {/* Overview */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Overview</h2>
          <p style={pStyle}>
            TradeTerminal (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates tradeterminal.org. This Privacy Policy explains what information we collect, how we use it, and your choices regarding that information. We keep this straightforward because we believe privacy policies should be readable, not buried in legalese.
          </p>
        </div>

        {/* What We Collect */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Collect</h2>

          <h3 style={h3Style}>Account Information</h3>
          <p style={pStyle}>
            If you create an account, we collect your email address and display name. If you sign in with Google, we receive your name, email, and profile picture from Google. We do not access your Google contacts, calendar, or any other Google data.
          </p>

          <h3 style={h3Style}>User-Created Content</h3>
          <p style={pStyle}>
            When you use the Playbook Builder or Trading Journal, we store the data you enter (playbook configurations, journal entries, learning progress). If you&apos;re signed in, this data is stored securely in our database tied to your account. If you&apos;re not signed in, it&apos;s stored locally in your browser and never touches our servers.
          </p>

          <h3 style={h3Style}>Analytics</h3>
          <p style={pStyle}>
            We use privacy-focused, cookieless analytics to understand how visitors use the site. This collects anonymized page view data such as pages visited, referrer, country, and device type. It does not collect personal information and does not follow you across other websites.
          </p>

          <h3 style={h3Style}>Email</h3>
          <p style={pStyle}>
            If you subscribe to our email list, we collect your email address. You can unsubscribe at any time using the link in any email.
          </p>
        </div>

        {/* What We Don't Collect */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>What We Don&apos;t Collect</h2>
          <p style={pStyle}>
            We don&apos;t collect financial data, brokerage information, trading account numbers, or any information about your actual trades outside of what you voluntarily enter into the journal. We don&apos;t sell, rent, or share your personal information with third parties for marketing purposes. We don&apos;t run third-party ad trackers on the site.
          </p>
        </div>

        {/* How We Use It */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>How We Use Your Information</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li style={liStyle}>To provide and maintain your account and saved data (playbooks, journal entries, learning progress)</li>
            <li style={liStyle}>To send you emails if you&apos;ve subscribed (educational content, site updates)</li>
            <li style={liStyle}>To understand how the site is used so we can improve it (anonymous analytics)</li>
            <li style={liStyle}>To respond to support requests or feedback</li>
          </ul>
        </div>

        {/* Data Storage */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Data Storage &amp; Security</h2>
          <p style={pStyle}>
            Your account data is stored on secure cloud infrastructure. Authentication sessions use httpOnly cookies that cannot be accessed by client-side scripts. All communication between your browser and our servers is encrypted via HTTPS. We follow security best practices and minimize the data we collect in the first place.
          </p>
        </div>

        {/* Third-Party Services */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Third-Party Services</h2>
          <p style={pStyle}>
            We use a small number of trusted third-party services for hosting, database storage, authentication, email delivery, and analytics. These services process data only as necessary to provide their functionality to us. We do not share your data with advertisers or data brokers.
          </p>
        </div>

        {/* Cookies */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Cookies</h2>
          <p style={pStyle}>
            We use a single httpOnly session cookie to keep you signed in. This cookie cannot be read by client-side scripts and contains only your session identifier. We do not use tracking cookies, advertising cookies, or third-party cookies. Our analytics are cookieless.
          </p>
        </div>

        {/* Your Rights */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Your Rights</h2>
          <ul style={{ paddingLeft: 20, marginBottom: 12 }}>
            <li style={liStyle}>Delete your account and all associated data at any time</li>
            <li style={liStyle}>Export your playbook and journal data</li>
            <li style={liStyle}>Unsubscribe from emails with one click</li>
            <li style={liStyle}>Use the site without an account (data stays in your browser only)</li>
            <li style={liStyle}>Request a copy of any personal data we hold about you</li>
          </ul>
          <p style={{ ...pStyle, fontSize: 13, color: "var(--text-muted)" }}>
            To exercise any of these rights, contact us at the email below.
          </p>
        </div>

        {/* Affiliate Disclosure */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Affiliate Disclosure</h2>
          <p style={pStyle}>
            Some links on our site (particularly on prop firm pages) may be affiliate links. This means we may earn a commission if you sign up through our link, at no extra cost to you. Affiliate relationships never influence our reviews or recommendations. All affiliate links are clearly disclosed on the relevant pages.
          </p>
        </div>

        {/* Children's Privacy */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Children&apos;s Privacy</h2>
          <p style={pStyle}>
            TradeTerminal is not intended for anyone under 18. We do not knowingly collect information from minors. If you believe a minor has provided us with personal information, please contact us and we will delete it.
          </p>
        </div>

        {/* Changes */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Changes to This Policy</h2>
          <p style={pStyle}>
            If we make meaningful changes to this policy, we&apos;ll update the &ldquo;Last updated&rdquo; date at the top. For significant changes, we&apos;ll notify registered users by email.
          </p>
        </div>

        {/* Contact */}
        <div style={sectionStyle}>
          <h2 style={h2Style}>Contact</h2>
          <p style={pStyle}>
            Questions about this policy? Reach us at{" "}
            <span style={{ color: "var(--teal)" }}>privacy@tradeterminal.org</span>.
          </p>
        </div>

      </div>
    </div>
  );
}
