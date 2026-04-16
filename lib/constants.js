export const C = {
  bg: "#0B1220",
  bgCard: "#0F1A2E",
  bgCardHover: "#132240",
  bgSurface: "#1A2744",
  border: "rgba(93,202,165,0.15)",
  teal: "#5DCAA5",
  amber: "#EF9F27",
  coral: "#F0997B",
  blue: "#85B7EB",
  purple: "#AFA9EC",
  green: "#97C459",
  // Trading-specific win/loss colors — only used where P&L signal matters most
  // (journal calendar cells, equity curves). Rest of the site keeps the warm
  // green/coral palette above.
  tradeGreen: "#4ADE80",
  tradeRed: "#EF5350",
  textPrimary: "#E8E6DF",
  textSecondary: "#8A9AB5",
  textMuted: "#566A8A",
};

export const F = {
  display: "'JetBrains Mono', 'Fira Code', monospace",
  body: "'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
};

export const catColors = {
  basics: C.teal,
  pricing: C.amber,
  orders: C.blue,
  structure: C.coral,
  data: C.purple,
  risk: C.coral,
  strategy: C.amber,
  instruments: C.teal,
  industry: C.green,
  sessions: C.blue,
};

export const catMeta = {
  basics: { label: "Basics", color: C.teal, desc: "Core concepts every futures trader must know" },
  pricing: { label: "Pricing", color: C.amber, desc: "How futures prices work and move" },
  orders: { label: "Order types", color: C.blue, desc: "How to enter, exit, and manage trades" },
  structure: { label: "Market structure", color: C.coral, desc: "Session frameworks and key levels" },
  sessions: { label: "Sessions", color: C.blue, desc: "Trading hours and session types" },
  data: { label: "Data & flow", color: C.purple, desc: "Volume, order flow, and market internals" },
  risk: { label: "Risk", color: C.coral, desc: "Protecting your capital and surviving" },
  strategy: { label: "Strategy", color: C.amber, desc: "Trading approaches and methodologies" },
  instruments: { label: "Instruments", color: C.teal, desc: "Specific products and contract types" },
  industry: { label: "Industry", color: C.green, desc: "Brokers, prop firms, and the business side" },
};
