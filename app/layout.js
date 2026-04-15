import "./globals.css";
import AnalyticsWrapper from "./AnalyticsWrapper";
import LearnBackBar from "./LearnBackBar";
import { AuthProvider } from "@/lib/auth";
import AuthModal from "./auth/AuthModal";

const siteUrl = "https://tradeterminal.org";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TradeTerminal — Futures Trading Education",
    template: "%s | TradeTerminal",
  },
  description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff. Learn futures from the ground up.",
  keywords: ["futures trading", "futures education", "futures glossary", "learn futures", "prop firm", "ES futures", "NQ futures", "day trading futures"],
  authors: [{ name: "TradeTerminal" }],
  creator: "TradeTerminal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "TradeTerminal",
    title: "TradeTerminal — Futures Trading Education",
    description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TradeTerminal — Futures Trading Education",
    description: "The complete futures trading education platform. 54 terms explained with real examples, real numbers, and zero fluff.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Scanline */}
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            pointerEvents: "none", zIndex: 50, overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(to right, transparent, rgba(93,202,165,0.13), transparent)",
              animation: "scan 8s linear infinite",
            }} />
          </div>
          {/* Grid background */}
          <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: "linear-gradient(rgba(93,202,165,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(93,202,165,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            animation: "pulse 4s ease-in-out infinite",
            pointerEvents: "none", zIndex: 0,
          }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <LearnBackBar />
            {children}
          </div>
          <AuthModal />
          <AnalyticsWrapper />
        </AuthProvider>
      </body>
    </html>
  );
}
