import Link from "next/link";

export const metadata = {
  title: "TradeTerminal — Learn Futures Trading From the Ground Up",
  description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff. Free, searchable, and built for traders.",
  alternates: {
    canonical: "https://tradeterminal.org",
  },
  openGraph: {
    title: "TradeTerminal — Learn Futures Trading From the Ground Up",
    description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff.",
    url: "https://tradeterminal.org",
    type: "website",
    siteName: "TradeTerminal",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeTerminal — Learn Futures Trading From the Ground Up",
    description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff.",
  },
};

export default function Home() {
  const F = {
    display: "'JetBrains Mono', 'Fira Code', monospace",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 20px" }}>
      <header style={{ padding: "48px 0 28px", borderBottom: "1px solid rgba(93,202,165,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#5DCAA5", boxShadow: "0 0 8px rgba(93,202,165,0.4)" }} />
          <span style={{ fontFamily: F.mono, fontSize: 10, color: "#566A8A", letterSpacing: 2, textTransform: "uppercase" }}>system online</span>
        </div>
        <h1 style={{ fontFamily: F.display, fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 700, letterSpacing: -1, marginBottom: 8, lineHeight: 1.1 }}>
          TradeTerminal<span style={{ color: "#5DCAA5" }}>_</span>
        </h1>
        <p style={{ fontFamily: F.mono, fontSize: "clamp(12px, 1.8vw, 14px)", color: "#8A9AB5", lineHeight: 1.7, maxWidth: 620, marginBottom: 16 }}>
          the complete futures trading education platform. learn the language, understand the markets, master the setups, get funded.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={{ padding: "5px 10px", background: "rgba(93,202,165,0.08)", border: "1px solid rgba(93,202,165,0.2)", borderRadius: 4, fontFamily: F.mono, fontSize: 10, color: "#5DCAA5" }}>
            indexes · energy · metals · agriculture · currencies · rates
          </span>
          <span style={{ padding: "5px 10px", background: "rgba(239,159,39,0.08)", border: "1px solid rgba(239,159,39,0.2)", borderRadius: 4, fontFamily: F.mono, fontSize: 10, color: "#EF9F27" }}>
            100% free to start
          </span>
        </div>
      </header>

      <div style={{ padding: "40px 0" }}>
        <h2 style={{ fontFamily: F.display, fontSize: 18, fontWeight: 500, marginBottom: 20 }}>
          <span style={{ color: "#5DCAA5" }}>$</span> start learning
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 14 }}>
          <Link href="/glossary">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #5DCAA5" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#5DCAA5", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>glossary</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Futures terminology</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>54 essential terms with deep-dive explanations, examples, and common mistakes.</p>
            </div>
          </Link>
          <Link href="/markets">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #EF9F27" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#EF9F27", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>markets</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Futures markets</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>6 market guides. Equity indexes, energy, metals, agriculture, currencies, and treasuries.</p>
            </div>
          </Link>
          <Link href="/strategies">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #AFA9EC" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#AFA9EC", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>strategies</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Trading setups</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>5 strategies with setup rules, worked examples, and when they work and fail. Any session.</p>
            </div>
          </Link>
          <Link href="/playbook">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #85B7EB" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#85B7EB", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>playbook</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Build your plan</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>Create personal trading playbooks with setups, entry/exit rules, risk management, and checklists.</p>
            </div>
          </Link>
          <Link href="/journal">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #97C459" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#97C459", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>journal</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Track your sessions</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>Log daily results, P&L, emotions, and lessons. Build a record of your trading performance over time.</p>
            </div>
          </Link>
          <Link href="/prop-firms">
            <div style={{ background: "#0F1A2E", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "24px 20px", cursor: "pointer", borderTop: "2px solid #F0997B" }}>
              <p style={{ fontFamily: F.mono, fontSize: 11, color: "#F0997B", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>prop firms</p>
              <p style={{ fontFamily: F.display, fontSize: 15, fontWeight: 500, marginBottom: 8 }}>Get funded</p>
              <p style={{ fontSize: 12, color: "#566A8A", lineHeight: 1.6 }}>Compare TopStep, Apex, Tradeify, and Lucid. Evaluation costs, drawdown rules, and profit splits.</p>
            </div>
          </Link>
        </div>
      </div>

      <footer style={{ borderTop: "1px solid rgba(93,202,165,0.15)", padding: "28px 0 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontFamily: F.mono, fontSize: 13, fontWeight: 500 }}>TradeTerminal<span style={{ color: "#5DCAA5" }}>_</span></span>
          <p style={{ fontFamily: F.mono, fontSize: 10, color: "#566A8A", marginTop: 3 }}>futures education for everyone</p>
        </div>
        <p style={{ fontFamily: F.mono, fontSize: 10, color: "#566A8A" }}>not financial advice · educational content only</p>
      </footer>
    </div>
  );
}
