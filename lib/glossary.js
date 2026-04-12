// All glossary terms. Each term that has a full page gets a `page` object.
// Terms without `page` just show the TL;DR on the index.

export const glossaryTerms = [
  { term: "Backwardation", slug: "backwardation", category: "pricing", tldr: "When futures prices are lower than the spot price. Signals tight supply or strong demand." },
  { term: "Bid / Ask / Spread", slug: "bid-ask-spread", category: "basics", tldr: "The prices buyers and sellers are offering, and the gap between them." },
  { term: "Bracket Order", slug: "bracket-order", category: "orders", tldr: "An entry order bundled with a profit target and stop loss that auto-cancel each other." },
  { term: "Contango", slug: "contango", category: "pricing", tldr: "When futures prices are higher than the spot price. The normal state for most markets." },
  { term: "Contract Specifications", slug: "contract-specifications", category: "instruments", tldr: "The standardized terms that define a futures contract: tick size, value, hours, and expiration." },
  { term: "Daily Settlement", slug: "daily-settlement", category: "basics", tldr: "The official closing price used to calculate daily gains, losses, and margin requirements." },
  { term: "Day Trade Margin", slug: "day-trade-margin", category: "basics", tldr: "Reduced margin for positions opened and closed within the same session. Varies by broker." },
  { term: "Delta", slug: "delta", category: "data", tldr: "Net aggressive buying minus selling volume. Shows who's pushing price." },
  { term: "Delivery", slug: "delivery", category: "basics", tldr: "The physical or cash settlement process when a futures contract expires." },
  { term: "Drawdown", slug: "drawdown", category: "risk", tldr: "Peak-to-trough decline in account equity. The number that ends trading careers." },
  { term: "E-mini", slug: "e-mini", category: "instruments", tldr: "Electronically traded, smaller-sized versions of standard index futures (ES, NQ, RTY, YM)." },
  { term: "Expiration / Rollover", slug: "expiration-rollover", category: "pricing", tldr: "When a contract expires and traders move to the next month. Happens quarterly for indexes." },
  { term: "Fill", slug: "fill", category: "orders", tldr: "When your order is executed and you have an open position. As in, 'I got filled at 5200.'" },
  { term: "Front Month", slug: "front-month", category: "pricing", tldr: "The nearest expiration contract. Most liquid, most traded, and usually the one you want." },
  { term: "Futures Contract", slug: "futures-contract", category: "basics", tldr: "A binding agreement to buy or sell an asset at a set price on a future date." },
  { term: "Gap", slug: "gap", category: "structure", tldr: "The price difference between one session's close and the next session's open." },
  { term: "Globex / Electronic Session", slug: "globex", category: "sessions", tldr: "CME's electronic overnight trading platform. Lower volume and wider spreads, but always important context." },
  { term: "Hedging", slug: "hedging", category: "strategy", tldr: "Using futures to offset risk in an existing position or business exposure." },
  { term: "Initial Balance (IB)", slug: "initial-balance", category: "structure", tldr: "The price range of the first hour. A Market Profile concept that sets the day's tone." },
  { term: "Leverage", slug: "leverage", category: "basics", tldr: "Controlling large value with a small deposit. Amplifies both gains and losses." },
  { term: "Limit Order", slug: "limit-order", category: "orders", tldr: "An order at a specific price or better. You control the price but might not get filled." },
  { term: "Limit Up / Limit Down", slug: "limit-up-limit-down", category: "basics", tldr: "Circuit breakers that halt trading when price moves too far, too fast." },
  { term: "Liquidity", slug: "liquidity", category: "data", tldr: "How easily you can enter and exit without moving the price. Measured by volume and spread." },
  { term: "Lot / Contract Size", slug: "lot-contract-size", category: "basics", tldr: "The standardized quantity one contract represents: 1,000 barrels, $50 times the index, etc." },
  {
    term: "Margin", slug: "margin", category: "basics",
    tldr: "The deposit required to open and hold a futures position. A performance bond, not a loan.",
    page: {
      tldr: "The deposit required to open and hold a futures position. Think of it as a performance bond, not a down payment or a loan.",
      prerequisites: [
        { term: "Futures Contract", slug: "futures-contract" },
        { term: "Leverage", slug: "leverage" },
      ],
      sections: [
        { id: "what-is-margin", heading: "What is margin?", body: "In futures trading, margin is the amount of money you must deposit with your broker to open and maintain a position. Unlike stocks, where margin means borrowing money, futures margin is a good-faith deposit. It's a performance bond guaranteeing you can cover potential losses.\n\nThere are two types you need to understand: initial margin and maintenance margin. They serve different purposes, and knowing the difference will keep you out of trouble." },
        { id: "initial-vs-maintenance", heading: "Initial margin vs. maintenance margin", body: "Initial margin is the amount required to open a new position. This is set by the exchange (CME Group for most US futures) and your broker may require more on top of that.\n\nMaintenance margin is the minimum account balance you must maintain while holding an open position. It's always lower than the initial margin. If your account balance falls below the maintenance margin due to losses, you'll receive a margin call.\n\nFor example, the E-mini S&P 500 (ES) might require roughly $12,000 in initial margin and $11,000 in maintenance margin per contract. These numbers change regularly based on volatility." },
        { id: "margin-calls", heading: "Margin calls", body: "A margin call happens when your account equity drops below the maintenance margin requirement. When this happens, your broker will demand you deposit additional funds immediately, usually by the next business day.\n\nIf you don't meet the margin call, your broker can and will liquidate your positions without your permission to bring the account back into compliance. This can happen at the worst possible price.\n\nThis is why experienced traders never use more than a fraction of their available margin. Just because you can open 10 contracts doesn't mean you should." },
        { id: "day-trade-vs-overnight", heading: "Day trade margin vs. overnight margin", body: "Many brokers offer reduced \"day trade\" or \"intraday\" margin, sometimes as low as $500 per ES contract compared to $12,000+ for overnight positions. This lets you control larger positions during the session.\n\nThe catch: you must close all positions before the session ends. If you're still holding at the cutoff, your broker will either auto-liquidate or require you to have full overnight margin in your account.\n\nDay trade margins vary wildly between brokers. They're a competitive feature, not an exchange requirement. Lower margin means higher leverage, which means faster gains and faster blowups." },
        { id: "leverage-relationship", heading: "How margin creates leverage", body: "One ES contract controls roughly $250,000 in notional value (the S&P 500 index times $50 per point). If you're posting $12,000 in margin, you're controlling about 20x your deposit. That's significant leverage.\n\nA 1% move in the S&P 500 equals roughly $2,500 per contract. On a $12,000 margin deposit, that's a 20% gain or loss on your capital from a 1% market move.\n\nThis is why position sizing and risk management are non-negotiable in futures. The leverage is built into the product." },
      ],
      keyPoints: [
        "Margin is a deposit, not a loan. You're not borrowing money.",
        "Initial margin opens the trade. Maintenance margin keeps it open.",
        "Falling below maintenance margin triggers a margin call.",
        "Day trade margins are lower but require closing before session end.",
        "Just because you have the margin doesn't mean you should use it all.",
      ],
      examples: [
        { label: "ES margin example", scenario: "You have $25,000 in your account. ES initial margin is $12,650 and maintenance is $11,500.", detail: "You can open 1 contract with $12,350 in excess margin. If ES drops 50 points ($2,500 loss), your equity is $22,500, still above maintenance. Never max out your margin." },
        { label: "Margin call scenario", scenario: "You hold 2 NQ contracts overnight. NQ initial margin is $17,600 each. Your account has $38,000.", detail: "Maintenance margin is $16,000 per contract ($32,000 total). Overnight, NQ drops 200 points, which is a $4,000 loss per contract and $8,000 total. Your equity drops to $30,000, below the $32,000 maintenance requirement. You get a margin call before the next session opens." },
      ],
      commonMistakes: [
        { mistake: "Using all available margin", fix: "Keep at least 50% of your account as free margin. Professional traders rarely use more than 10-20% of available margin." },
        { mistake: "Confusing day trade margin with overnight margin", fix: "Know your broker's cutoff time. If you're holding at that time, you need full overnight margin or you'll be auto-liquidated." },
        { mistake: "Ignoring margin changes", fix: "Exchanges increase margin requirements during volatile periods. Check your broker's margin page regularly, especially before major economic events." },
      ],
      relatedTerms: [
        { term: "Mark to Market", slug: "mark-to-market" },
        { term: "Position Sizing", slug: "position-sizing" },
        { term: "Drawdown", slug: "drawdown" },
        { term: "Margin Call", slug: "margin-call" },
      ],
      specs: [
        { product: "E-mini S&P 500 (ES)", initial: "~$12,650", maintenance: "~$11,500", dayTrade: "$500-$2,000" },
        { product: "E-mini Nasdaq-100 (NQ)", initial: "~$17,600", maintenance: "~$16,000", dayTrade: "$500-$2,000" },
        { product: "Crude Oil (CL)", initial: "~$7,000", maintenance: "~$6,400", dayTrade: "$500-$1,500" },
        { product: "Gold (GC)", initial: "~$10,000", maintenance: "~$9,100", dayTrade: "$500-$1,500" },
        { product: "Micro E-mini S&P (MES)", initial: "~$1,265", maintenance: "~$1,150", dayTrade: "$50-$200" },
        { product: "Corn (ZC)", initial: "~$1,650", maintenance: "~$1,500", dayTrade: "$250-$500" },
      ],
    },
  },
  { term: "Margin Call", slug: "margin-call", category: "risk", tldr: "A demand to deposit more money when your account drops below maintenance margin." },
  { term: "Mark to Market", slug: "mark-to-market", category: "basics", tldr: "Daily settlement. Gains credited and losses debited from your account every single day." },
  { term: "Market Order", slug: "market-order", category: "orders", tldr: "Buy or sell immediately at the best available price. Guaranteed fill, not guaranteed price." },
  { term: "Market Profile", slug: "market-profile", category: "data", tldr: "A framework that organizes price activity by time, revealing value areas and balance zones." },
  { term: "Micro Contracts", slug: "micro-contracts", category: "instruments", tldr: "1/10th-size futures (MES, MNQ, MGC). Ideal for learning and small accounts." },
  { term: "Notional Value", slug: "notional-value", category: "basics", tldr: "The total dollar value a futures contract controls. Usually many multiples of your margin." },
  { term: "OCO Order", slug: "oco-order", category: "orders", tldr: "One-Cancels-Other. Two orders linked so when one fills, the other auto-cancels." },
  { term: "Open Interest", slug: "open-interest", category: "data", tldr: "Total outstanding contracts. Rising OI with rising price means new money entering the trend." },
  { term: "Opening Range", slug: "opening-range", category: "structure", tldr: "The high-low range of the first 5, 15, or 30 minutes. A key reference for breakout traders." },
  { term: "Order Book / DOM", slug: "order-book-dom", category: "data", tldr: "The depth of market. Shows resting buy and sell orders at each price level in real time." },
  { term: "Point of Control (POC)", slug: "point-of-control", category: "data", tldr: "The price level with the most trading volume. Acts as a magnet for price." },
  { term: "Position Sizing", slug: "position-sizing", category: "risk", tldr: "How many contracts to trade based on account size, risk tolerance, and stop distance." },
  { term: "Prop Firm / Funded Account", slug: "prop-firm", category: "industry", tldr: "A firm that funds traders with its capital after passing an evaluation. You keep most of the profits." },
  { term: "Regular Trading Hours (RTH)", slug: "rth", category: "sessions", tldr: "The main session. 9:30 AM to 4:00 PM ET for equity index futures." },
  { term: "Risk-Reward Ratio", slug: "risk-reward-ratio", category: "risk", tldr: "Potential loss vs. potential gain. Determines how often you need to win to be profitable." },
  { term: "Rollover", slug: "rollover", category: "pricing", tldr: "Closing an expiring contract and opening the same position in the next contract month." },
  { term: "Scalping", slug: "scalping", category: "strategy", tldr: "Trading for small, fast gains with high frequency. Seconds to minutes per trade." },
  { term: "Settlement", slug: "settlement", category: "basics", tldr: "How a contract resolves at expiration. Cash payment or physical delivery of the asset." },
  { term: "Slippage", slug: "slippage", category: "orders", tldr: "The difference between your expected price and your actual fill. Worse in thin markets." },
  { term: "Spread Trading", slug: "spread-trading", category: "strategy", tldr: "Trading the price difference between two related contracts instead of outright direction." },
  { term: "Stop Order", slug: "stop-order", category: "orders", tldr: "Triggers a market order when price reaches a level. Used for breakout entries and stop losses." },
  { term: "Stop-Limit Order", slug: "stop-limit-order", category: "orders", tldr: "A stop that triggers a limit order instead of a market order. Price control but fill risk." },
  { term: "Support / Resistance", slug: "support-resistance", category: "structure", tldr: "Levels where buying or selling pressure has historically concentrated. Where decisions happen." },
  { term: "Swing Trading", slug: "swing-trading", category: "strategy", tldr: "Holding positions for days to weeks. Wider stops, lower leverage, less screen time." },
  { term: "Tick", slug: "tick", category: "basics", tldr: "The minimum price movement. Each product has a different tick size and dollar value per tick." },
  { term: "Trailing Stop", slug: "trailing-stop", category: "orders", tldr: "A stop loss that automatically moves with price to lock in gains as a trade works." },
  { term: "Value Area", slug: "value-area", category: "data", tldr: "The price range where 70% of volume traded. Market Profile's definition of fair value." },
  { term: "Volume Profile", slug: "volume-profile", category: "data", tldr: "Trading activity shown by price level. High-volume nodes attract, low-volume areas repel." },
  { term: "VWAP", slug: "vwap", category: "data", tldr: "Volume-Weighted Average Price. The institutional benchmark for fair value during a session." },
];

export function getTermBySlug(slug) {
  return glossaryTerms.find(t => t.slug === slug);
}

export function getAdjacentTerms(slug) {
  const idx = glossaryTerms.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? glossaryTerms[idx - 1] : null,
    next: idx < glossaryTerms.length - 1 ? glossaryTerms[idx + 1] : null,
  };
}

export function getTermsWithPages() {
  return glossaryTerms.filter(t => t.page);
}
