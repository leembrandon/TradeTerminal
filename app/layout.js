import "./globals.css";

export const metadata = {
  title: "TradeTerminal — Futures Trading Education",
  description: "The complete futures trading education platform. Learn the language, understand the markets, master the setups, get funded.",
  openGraph: {
    title: "TradeTerminal — Futures Trading Education",
    description: "The complete futures trading education platform. Learn the language, understand the markets, master the setups, get funded.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
          {children}
        </div>
      </body>
    </html>
  );
}
