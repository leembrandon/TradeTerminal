// All glossary terms. Each term that has a full page gets a `page` object.
// Terms without `page` just show the TL;DR on the index.

export const glossaryTerms = [
  {
    "term": "Backwardation",
    "slug": "backwardation",
    "category": "pricing",
    "tldr": "When futures prices are lower than the spot price. Signals tight supply or strong demand.",
    "page": {
      "tldr": "When futures prices trade below the current spot price. This creates a downward-sloping forward curve and often signals tight near-term supply or strong immediate demand.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Contango",
          "slug": "contango"
        }
      ],
      "sections": [
        {
          "id": "what-is-backwardation",
          "heading": "What is backwardation?",
          "body": "Backwardation occurs when the futures price of a commodity is lower than the current spot (cash) price. In a normal market, futures trade at a premium to spot because of storage costs, insurance, and financing. When this relationship inverts, the market is in backwardation.\n\nFor example, if crude oil is trading at $75 per barrel on the spot market but the futures contract for delivery three months from now is priced at $73, the market is in backwardation by $2."
        },
        {
          "id": "why-it-happens",
          "heading": "Why backwardation happens",
          "body": "Backwardation typically signals that demand for the physical commodity right now is stronger than expected future demand. This can happen during supply disruptions, geopolitical events, extreme weather, or inventory drawdowns.\n\nWhen buyers urgently need the physical commodity today, they bid up the spot price. But the market expects the shortage to resolve over time, so future delivery prices remain lower."
        },
        {
          "id": "trading-implications",
          "heading": "Trading implications",
          "body": "For traders holding long futures positions, backwardation creates a positive roll yield. When you roll from an expiring contract to the next month, you sell the higher-priced near contract and buy the lower-priced far contract. This price difference is profit you collect just from rolling.\n\nBackwardation can also signal a strong bullish environment for the underlying commodity. Tight supply conditions that cause backwardation often lead to sustained price rallies. However, backwardation alone is not a trade signal. It provides context alongside other analysis."
        }
      ],
      "keyPoints": [
        "Backwardation means futures prices are below the current spot price.",
        "It usually signals tight near-term supply or strong immediate demand.",
        "Long futures positions benefit from positive roll yield during backwardation.",
        "Contango is the opposite and is the normal state for most markets.",
        "Backwardation provides context but is not a standalone trade signal."
      ],
      "examples": [
        {
          "label": "Crude oil backwardation",
          "scenario": "Spot crude oil is at $78 per barrel. The front-month futures contract is at $77.50 and the next month is at $76.80.",
          "detail": "The market is in backwardation. If you're long the front month and roll to the next, you sell at $77.50 and buy at $76.80, pocketing $0.70 per barrel ($700 per contract) just from the roll."
        },
        {
          "label": "Contango for comparison",
          "scenario": "Gold spot is at $2,000 per ounce. The two-month futures contract is at $2,012.",
          "detail": "This is contango. The futures premium of $12 reflects the cost of storing and financing gold for two months. Rolling a long position in contango costs you money because you sell the cheaper expiring contract and buy the more expensive next month."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Assuming backwardation means prices will go up",
          "fix": "Backwardation describes the shape of the futures curve, not the direction of the market. Prices can fall even while the market is in backwardation."
        },
        {
          "mistake": "Ignoring the roll yield impact on longer-term positions",
          "fix": "If you hold futures positions across multiple roll periods, the curve shape significantly affects your returns."
        },
        {
          "mistake": "Confusing backwardation with a market decline",
          "fix": "Backwardation means nearby prices are higher than deferred prices. The overall market can be rising, falling, or flat."
        }
      ],
      "relatedTerms": [
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Front Month",
          "slug": "front-month"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Bid / Ask / Spread",
    "slug": "bid-ask-spread",
    "category": "basics",
    "tldr": "The prices buyers and sellers are offering, and the gap between them.",
    "page": {
      "tldr": "The bid is the highest price a buyer will pay. The ask is the lowest price a seller will accept. The spread between them is the cost of trading.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-bid-ask",
          "heading": "What are bid and ask?",
          "body": "Every futures contract has two prices at all times. The bid is the highest price any buyer is willing to pay. The ask (also called the offer) is the lowest price any seller is willing to accept.\n\nIf ES shows a bid of 5,200.00 and an ask of 5,200.25, the best buyer will pay 5,200.00 and the best seller will accept 5,200.25. If you want to buy immediately, you pay the ask. If you want to sell immediately, you receive the bid."
        },
        {
          "id": "what-is-spread",
          "heading": "What is the spread?",
          "body": "The spread is the difference between bid and ask. In ES, that's typically 0.25 points (one tick, $12.50). This spread is effectively the cost of an immediate trade.\n\nTight spreads mean the market is liquid and cheap to trade. Wide spreads mean less liquidity and higher costs. During overnight sessions or in thin contracts, spreads can widen to several ticks."
        },
        {
          "id": "spread-and-costs",
          "heading": "How the spread affects trading costs",
          "body": "Every market order round trip costs you the spread twice: once to enter and once to exit. On ES with a one-tick spread, that's $25 per round trip per contract.\n\nFor scalpers making many trades, spread costs add up quickly. Limit orders can avoid paying the spread by sitting at the bid or ask, but they risk not filling."
        }
      ],
      "keyPoints": [
        "The bid is the best buy price. The ask is the best sell price.",
        "The spread is the difference and represents the cost of immediacy.",
        "You pay the spread every time you use a market order.",
        "Tight spreads mean good liquidity. Widening spreads signal caution.",
        "Limit orders can avoid the spread but risk not filling."
      ],
      "examples": [
        {
          "label": "One-tick spread on ES",
          "scenario": "ES bid is 5,200.00, ask is 5,200.25. You buy with a market order and immediately sell.",
          "detail": "You buy at 5,200.25 and sell at 5,200.00. You lose $12.50. This is the round-trip spread cost."
        },
        {
          "label": "Wide spread overnight",
          "scenario": "At 2 AM, ES bid is 5,198.00 and ask is 5,199.00. That's a 4-tick spread ($50).",
          "detail": "Your market order fills at the ask, starting you $50 behind. Use limit orders during thin sessions."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Ignoring the spread when calculating profitability",
          "fix": "A strategy making 2 ticks per trade only makes 1 tick after the spread. Factor it into every backtest."
        },
        {
          "mistake": "Using market orders during wide-spread conditions",
          "fix": "If the spread is wider than normal, use a limit order."
        },
        {
          "mistake": "Not checking the spread before entering",
          "fix": "Always glance at the bid-ask spread before placing an order."
        }
      ],
      "relatedTerms": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Bracket Order",
    "slug": "bracket-order",
    "category": "orders",
    "tldr": "An entry order bundled with a profit target and stop loss that auto-cancel each other.",
    "page": {
      "tldr": "An entry order with an attached profit target and stop loss. When one exit fills, the other cancels automatically. Bracket orders enforce discipline by defining your risk and reward before you enter.",
      "prerequisites": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-bracket-order",
          "heading": "What is a bracket order?",
          "body": "A bracket order is three orders wrapped into one. You set your entry price, your profit target, and your stop loss all at once. When the entry fills, the profit target and stop loss go live as an OCO (one-cancels-other) pair. Whichever exit fills first automatically cancels the other.\n\nThis means you never have to manually manage two separate exit orders. If your target gets hit, the stop disappears. If your stop gets hit, the target disappears. The bracket handles everything."
        },
        {
          "id": "how-to-set-up",
          "heading": "How to set up a bracket order",
          "body": "Most trading platforms let you configure a default bracket in ticks or points. For example, you might set a 10-point profit target and an 8-point stop loss on ES.\n\nWhen you enter a trade, the platform automatically attaches those exit orders at the right prices. If you buy ES at 5,200, your target goes to 5,210 and your stop goes to 5,192.\n\nYou can also modify the bracket levels after entry. If price moves in your favor, you might tighten the stop to lock in some profit. The key is that the bracket gives you a starting structure, and you adjust from there."
        },
        {
          "id": "why-brackets-matter",
          "heading": "Why brackets enforce discipline",
          "body": "The biggest advantage of bracket orders is that they force you to define risk before entering. You cannot place the entry without choosing your stop and target. This prevents the most common mistake new traders make: entering a trade with no exit plan.\n\nBrackets also remove emotion from exits. Without a bracket, traders tend to hold losers hoping for a reversal and cut winners early out of fear. The bracket exits mechanically at predetermined levels regardless of how you feel in the moment.\n\nProp firms and trading coaches almost universally recommend using bracket orders for every trade."
        }
      ],
      "keyPoints": [
        "A bracket order bundles entry, profit target, and stop loss into one order.",
        "When one exit fills, the other cancels automatically (OCO behavior).",
        "Brackets force you to define risk before entering the trade.",
        "You can modify bracket levels after entry if market conditions change.",
        "Using brackets removes emotional decision-making from exits."
      ],
      "examples": [
        {
          "label": "ES bracket trade",
          "scenario": "You want to buy ES at 5,200 with a 10-point target and 8-point stop. You set up a bracket order.",
          "detail": "Entry: buy limit at 5,200. Target: sell limit at 5,210 (+$500). Stop: sell stop at 5,192 (-$400). Risk-reward is 1:1.25. If your entry fills, both exits go live. If ES hits 5,210 first, you take $500 profit and the stop at 5,192 cancels."
        },
        {
          "label": "Modifying a bracket in real time",
          "scenario": "You bought NQ at 18,400 with a bracket: target at 18,440, stop at 18,375. Price moves to 18,425.",
          "detail": "You're up 25 points ($500). You can tighten your stop from 18,375 to 18,410, locking in at least 10 points ($200) of profit while keeping the target at 18,440 for the full move. The bracket stays linked. Whichever exit hits first cancels the other."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Entering trades without a bracket and planning to add stops later",
          "fix": "Later often means after a big move against you. Always enter with a bracket. You can modify levels after, but never enter naked."
        },
        {
          "mistake": "Setting bracket levels based on round numbers instead of market structure",
          "fix": "Put your stop beyond a swing low, support level, or volume node. Put your target at a resistance level or measured move. Structure-based brackets outperform arbitrary point targets."
        },
        {
          "mistake": "Using the same bracket width on every trade regardless of volatility",
          "fix": "A 10-point bracket on ES makes sense in a normal session. On FOMC day, you might need 20 points. Adjust bracket width to match current conditions."
        }
      ],
      "relatedTerms": [
        {
          "term": "OCO Order",
          "slug": "oco-order"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Contango",
    "slug": "contango",
    "category": "pricing",
    "tldr": "When futures prices are higher than the spot price. The normal state for most markets.",
    "page": {
      "tldr": "When futures prices are higher than the current spot price. The default state for most commodity markets due to storage and financing costs.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Backwardation",
          "slug": "backwardation"
        }
      ],
      "sections": [
        {
          "id": "what-is-contango",
          "heading": "What is contango?",
          "body": "Contango is when the futures price is higher than the spot price, creating an upward-sloping curve. Each successive month costs more.\n\nThis is normal because storing a physical commodity costs money. Warehouse space, insurance, and financing all add to the price of future delivery."
        },
        {
          "id": "negative-roll",
          "heading": "The cost of rolling in contango",
          "body": "For long position holders, contango creates a negative roll yield. When you roll, you sell the cheaper near contract and buy the more expensive far contract. This cost adds up over multiple roll periods.\n\nThis is why commodity ETFs that hold futures often underperform the spot price. They constantly pay the contango cost on every roll."
        },
        {
          "id": "contango-context",
          "heading": "Contango as market context",
          "body": "Contango is the normal state and doesn't indicate direction. Steep contango (large price difference between months) signals the market expects the current oversupply or low demand to persist.\n\nEquity index futures trade in slight contango based on interest rates minus dividend yields."
        }
      ],
      "keyPoints": [
        "Contango means futures prices are above spot price.",
        "It's normal because storing commodities costs money.",
        "Long positions pay negative roll yield in contango.",
        "Contango is not bearish. It's the default market structure.",
        "Steep contango signals expectation of continued oversupply."
      ],
      "examples": [
        {
          "label": "Gold contango",
          "scenario": "Gold spot at $2,000. Two-month futures at $2,010.",
          "detail": "$10 premium reflects two months of storage and financing. Rolling a long position costs $10/oz ($1,000 per GC contract) per roll."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Ignoring contango when holding long futures",
          "fix": "Check the curve shape. Steep contango erodes returns even if spot prices rise."
        },
        {
          "mistake": "Assuming commodity ETFs track spot",
          "fix": "Most hold futures and bleed value in contango. Check the prospectus."
        }
      ],
      "relatedTerms": [
        {
          "term": "Backwardation",
          "slug": "backwardation"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Front Month",
          "slug": "front-month"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Contract Specifications",
    "slug": "contract-specifications",
    "category": "instruments",
    "tldr": "The standardized terms that define a futures contract: tick size, value, hours, and expiration.",
    "page": {
      "tldr": "The standardized terms set by the exchange for every futures product. Tick size, tick value, contract size, trading hours, expiration dates, and settlement method. Know these before you trade.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Tick",
          "slug": "tick"
        }
      ],
      "sections": [
        {
          "id": "what-are-specs",
          "heading": "What are contract specifications?",
          "body": "Contract specifications are the standardized terms set by the exchange for every futures product. They define the underlying asset, how much of it one contract controls, the minimum price movement, the dollar value of each movement, when the contract expires, and how it settles.\n\nThese specs are identical for every participant. That standardization is what makes futures tradeable on an exchange. You need to know the specs for any product you trade because they directly affect your risk, profit per tick, and margin requirements."
        },
        {
          "id": "key-specs",
          "heading": "Key specifications to know",
          "body": "Tick size is the minimum price increment. ES moves in 0.25-point ticks. CL moves in $0.01 ticks.\n\nTick value is the dollar amount per tick. ES is $12.50, NQ is $5.00, CL is $10.00. This is the number you use for all risk calculations.\n\nContract size (multiplier) defines how much one contract represents. ES is $50 times the index. CL is 1,000 barrels. GC is 100 troy ounces.\n\nTrading hours vary by product. ES trades nearly 23 hours per day. Agricultural products have shorter sessions.\n\nExpiration and settlement define when the contract ends and how it resolves."
        },
        {
          "id": "where-to-find",
          "heading": "Where to find contract specifications",
          "body": "The CME Group website (cmegroup.com) is the official source for all specs on products traded at CME, CBOT, NYMEX, and COMEX. Each product has a dedicated spec page.\n\nYour broker's platform also displays specs, usually accessible by right-clicking a contract or checking product details. Always verify specs before trading a new product."
        }
      ],
      "keyPoints": [
        "Contract specs are standardized by the exchange and identical for all traders.",
        "Tick size, tick value, contract size, hours, and settlement are the specs that matter most.",
        "Know the tick value before you trade. It determines your dollar risk per movement.",
        "The CME Group website is the official source for all specs.",
        "Never trade a new product without checking its specifications first."
      ],
      "examples": [
        {
          "label": "ES vs. NQ specs",
          "scenario": "You're comparing ES and NQ. Both are equity index futures but specs differ.",
          "detail": "ES: $50 per point, $12.50 per tick. NQ: $20 per point, $5.00 per tick. A 10-point move is $500 on ES but $200 on NQ. Despite NQ having a higher notional value, the per-point dollar impact is lower."
        },
        {
          "label": "Crude oil specs",
          "scenario": "You want to trade CL. One contract is 1,000 barrels. Tick size is $0.01, worth $10 per tick.",
          "detail": "A $1.00 move (100 ticks) is $1,000 per contract. CL is a $75,000+ notional contract. Make sure your risk plan can handle the per-tick exposure."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Trading a new product without checking the tick value",
          "fix": "CL is $10 per tick. ZB is $31.25 per tick. The difference is massive. Always verify before your first trade."
        },
        {
          "mistake": "Assuming all index futures have the same multiplier",
          "fix": "ES is $50/point, NQ is $20/point, YM is $5/point. A 100-point move means very different dollar amounts."
        },
        {
          "mistake": "Not checking trading hours before placing overnight orders",
          "fix": "Not all products trade 23 hours. Check the schedule for each product you trade."
        }
      ],
      "relatedTerms": [
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Lot / Contract Size",
          "slug": "lot-contract-size"
        },
        {
          "term": "Margin",
          "slug": "margin"
        }
      ],
      "specs": [
        {
          "product": "E-mini S&P 500 (ES)",
          "initial": "$50/point",
          "maintenance": "$12.50/tick",
          "dayTrade": "0.25 pt tick"
        },
        {
          "product": "E-mini Nasdaq-100 (NQ)",
          "initial": "$20/point",
          "maintenance": "$5.00/tick",
          "dayTrade": "0.25 pt tick"
        },
        {
          "product": "Crude Oil (CL)",
          "initial": "$1,000/point",
          "maintenance": "$10.00/tick",
          "dayTrade": "$0.01 tick"
        },
        {
          "product": "Gold (GC)",
          "initial": "$100/point",
          "maintenance": "$10.00/tick",
          "dayTrade": "$0.10 tick"
        },
        {
          "product": "30-Year T-Bond (ZB)",
          "initial": "$1,000/point",
          "maintenance": "$31.25/tick",
          "dayTrade": "1/32 tick"
        },
        {
          "product": "Corn (ZC)",
          "initial": "$50/point",
          "maintenance": "$12.50/tick",
          "dayTrade": "0.25c tick"
        }
      ]
    }
  },
  {
    "term": "Daily Settlement",
    "slug": "daily-settlement",
    "category": "basics",
    "tldr": "The official closing price used to calculate daily gains, losses, and margin requirements.",
    "page": {
      "tldr": "The official closing price published by the exchange at the end of each trading day. Used for mark-to-market P&L, margin requirements, and the next day's reference price.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        }
      ],
      "sections": [
        {
          "id": "what-is-settlement-price",
          "heading": "What is the daily settlement price?",
          "body": "The daily settlement price is the official closing price for a futures contract, determined by the exchange at the end of each trading session. It's not simply the last traded price. The exchange uses a methodology that considers trading activity during the final minutes of the session.\n\nThis price is the benchmark for all end-of-day calculations: your mark-to-market P&L, margin requirements, and the reference point for the next trading day."
        },
        {
          "id": "how-calculated",
          "heading": "How the settlement price is calculated",
          "body": "The exact methodology varies by exchange and product. For liquid products like ES and NQ, it's typically based on a volume-weighted average during a closing window.\n\nFor less liquid contracts, the exchange may use the bid-ask midpoint, a theoretical model, or manual determination by a settlement committee.\n\nThe settlement price is published after the close and is final."
        },
        {
          "id": "why-matters",
          "heading": "Why the settlement price matters",
          "body": "Your daily P&L is calculated as the difference between your entry (or prior settlement) and today's settlement. If you bought ES at 5,200 and today's settlement is 5,210, $500 is credited to your account.\n\nMargin requirements are recalculated against settlement. A large adverse move can trigger a margin call even if the market recovered during the session.\n\nThe settlement price matters more than any random intraday price because it's what your broker uses for all official calculations."
        }
      ],
      "keyPoints": [
        "The daily settlement price is the official closing price set by the exchange.",
        "It's used for mark-to-market calculations, margin, and next-day reference.",
        "Settlement price is not always the last traded price.",
        "Your end-of-day P&L is calculated against this price.",
        "Margin calls are based on settlement price, not intraday highs or lows."
      ],
      "examples": [
        {
          "label": "Settlement P&L",
          "scenario": "You bought 2 ES at 5,200. Today's settlement is 5,208.",
          "detail": "P&L: 8 points x $50 x 2 contracts = $800 credited at settlement. Tomorrow resets from 5,208."
        },
        {
          "label": "Settlement vs. last trade",
          "scenario": "ES trades as high as 5,225 but settles at 5,207.",
          "detail": "Your P&L is based on 5,207, not the 5,225 high. The settlement methodology smooths end-of-day noise."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Assuming the last traded price is the settlement price",
          "fix": "They can differ, especially in less liquid products. Check the official settlement."
        },
        {
          "mistake": "Ignoring settlement because you day trade",
          "fix": "Understanding settlement helps you interpret next-day references, gap analysis, and margin calculations."
        }
      ],
      "relatedTerms": [
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        },
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Day Trade Margin",
    "slug": "day-trade-margin",
    "category": "basics",
    "tldr": "Reduced margin for positions opened and closed within the same session. Varies by broker.",
    "page": {
      "tldr": "A reduced margin rate offered by brokers for positions opened and closed within the same session. Much lower than overnight exchange margin, but with strict closing requirements.",
      "prerequisites": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "sections": [
        {
          "id": "what-is-dtm",
          "heading": "What is day trade margin?",
          "body": "Day trade margin is a reduced margin requirement that brokers offer for positions opened and closed within the same session. While the exchange requires $12,000+ to hold one ES contract overnight, many brokers allow you to open with as little as $500 during the day.\n\nThis is a competitive broker feature, not an exchange rate. Different brokers offer different day trade margins and rates can change without notice."
        },
        {
          "id": "how-it-works",
          "heading": "How day trade margin works",
          "body": "When you open a position, your broker checks against the day trade margin rate. The critical rule: you must close all positions before a cutoff time, usually a few minutes before the session close.\n\nIf you're still holding at the cutoff, your broker will either auto-liquidate or require full overnight margin. The cutoff time varies by broker (3:50 PM, 3:55 PM, or 4:00 PM ET). Know yours."
        },
        {
          "id": "leverage-tradeoff",
          "heading": "The leverage tradeoff",
          "body": "At $500 margin for an ES contract worth $260,000, you're using 520:1 leverage. A 1-point move ($50) is a 10% return on your deposit.\n\nA 10-point adverse move would wipe out your entire margin deposit. Professional day traders size based on risk tolerance, not on how many contracts the margin allows. The low margin is a convenience, not a target."
        }
      ],
      "keyPoints": [
        "Day trade margin is a broker feature, not an exchange requirement.",
        "Rates can be as low as $500 for ES compared to $12,000+ overnight.",
        "You must close before the session cutoff or face auto-liquidation.",
        "The extreme leverage amplifies both gains and losses.",
        "Size based on risk tolerance, not available margin."
      ],
      "examples": [
        {
          "label": "Day trade vs. overnight",
          "scenario": "Your account has $5,000. Day trade margin for ES is $500. Overnight margin is $12,650.",
          "detail": "During the session, you could theoretically open 10 ES contracts. Overnight, you can't hold even 1. If you're holding 3 at 3:50 PM, they get liquidated."
        },
        {
          "label": "Leverage risk",
          "scenario": "You open 4 MES contracts with $500 day trade margin. MES moves 20 points against you.",
          "detail": "Loss: 20 points x $5 x 4 = $400. That's 80% of your margin from a move that takes minutes in a volatile market."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Maxing out contracts because the margin allows it",
          "fix": "Just because you can open 10 doesn't mean you should. Size based on stop loss and account risk."
        },
        {
          "mistake": "Forgetting the session cutoff time",
          "fix": "Set an alarm 15 minutes before your broker's cutoff. Getting auto-liquidated is preventable."
        },
        {
          "mistake": "Assuming day trade margin is the same across brokers",
          "fix": "Margins vary widely. One broker might offer $500 per ES while another requires $1,000."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Delivery",
    "slug": "delivery",
    "category": "basics",
    "tldr": "The physical or cash settlement process when a futures contract expires.",
    "page": {
      "tldr": "The process of fulfilling a futures contract at expiration. Cash-settled contracts pay the difference in cash. Physically-settled contracts require actual transfer of the underlying commodity.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Settlement",
          "slug": "settlement"
        }
      ],
      "sections": [
        {
          "id": "what-is-delivery",
          "heading": "What is delivery?",
          "body": "Delivery is the final settlement process when a futures contract expires. Physical delivery means the actual commodity changes hands. Cash settlement means the price difference is paid in cash with no physical goods exchanged."
        },
        {
          "id": "physical",
          "heading": "Physical delivery",
          "body": "Physically-settled contracts include crude oil (CL), gold (GC), corn (ZC), soybeans (ZS), and most agricultural and energy products.\n\nIf you hold a long CL contract through expiration, you are legally obligated to take delivery of 1,000 barrels of crude oil. Retail traders almost never want this. Brokers warn you and auto-close positions well before delivery begins."
        },
        {
          "id": "cash",
          "heading": "Cash settlement",
          "body": "Cash-settled contracts include equity index futures (ES, NQ, RTY, YM). At expiration, the exchange calculates the final settlement value and credits or debits your account.\n\nIf you're long 1 ES at 5,200 and the final settlement is 5,250, you receive $2,500. No shares change hands. Cash settlement is why equity index futures are popular with speculators."
        }
      ],
      "keyPoints": [
        "Delivery is how a futures contract resolves at expiration.",
        "Physical delivery requires actual commodity transfer. Cash settlement pays in cash.",
        "Retail traders should never hold physically-settled contracts to expiration.",
        "Equity index futures are cash-settled. No physical delivery involved.",
        "Brokers will warn and may auto-close positions approaching delivery deadlines."
      ],
      "examples": [
        {
          "label": "Cash settlement on ES",
          "scenario": "Long 1 ES at 5,200. Final settlement value is 5,235.",
          "detail": "Account credited 35 points x $50 = $1,750. Contract ceases to exist. Open a new contract to maintain exposure."
        },
        {
          "label": "Physical delivery avoided",
          "scenario": "A trader forgets to close a long CL position before the delivery deadline.",
          "detail": "The broker auto-closes at market price, which may be unfavorable. Entirely avoidable by rolling or closing before expiration."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Holding a physically-settled contract too close to expiration",
          "fix": "Know the first notice day and last trading day. Close or roll well before those dates."
        },
        {
          "mistake": "Assuming all futures are cash-settled",
          "fix": "ES and NQ are cash-settled. CL, GC, ZC are physically-settled. Check the specs."
        },
        {
          "mistake": "Ignoring broker deadlines for position closure",
          "fix": "Brokers often set their own deadlines stricter than the exchange's. Check the policy for each product."
        }
      ],
      "relatedTerms": [
        {
          "term": "Settlement",
          "slug": "settlement"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Delta",
    "slug": "delta",
    "category": "data",
    "tldr": "Net aggressive buying minus selling volume. Shows who's pushing price.",
    "page": {
      "tldr": "The net difference between aggressive buying volume and aggressive selling volume at each price level. Positive delta means buyers are more aggressive. Negative delta means sellers are in control.",
      "prerequisites": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        }
      ],
      "sections": [
        {
          "id": "what-is-delta",
          "heading": "What is delta in order flow?",
          "body": "In futures order flow analysis, delta measures the difference between trades that hit the ask (aggressive buys) and trades that hit the bid (aggressive sells) at each price level.\n\nPositive delta means more buyers were willing to pay the ask. Negative delta means sellers were more aggressive. This reveals who is pushing price."
        },
        {
          "id": "cumulative-delta",
          "heading": "Cumulative delta",
          "body": "Cumulative delta tracks the running total over a session. If delta has been net positive all day, cumulative delta is rising, suggesting buyers have been more aggressive overall.\n\nDivergences between price and cumulative delta can be informative. If price makes new highs but cumulative delta is falling, buyers are becoming less aggressive at higher prices. This can be an early reversal warning."
        },
        {
          "id": "using-delta",
          "heading": "How traders use delta",
          "body": "Footprint charts display delta at every price level within each candle. A candle that closed higher with strong positive delta at the highs suggests genuine buying. A candle that closed higher but with negative delta at the highs (absorption) is less bullish.\n\nDelta analysis requires specialized tools like Sierra Chart, Bookmap, or Jigsaw. Most free platforms don't offer footprint charts."
        }
      ],
      "keyPoints": [
        "Delta measures aggressive buying minus aggressive selling at each price level.",
        "Positive delta = buyers more aggressive. Negative delta = sellers.",
        "Cumulative delta tracks the running total over a session.",
        "Divergences between price and delta can signal potential reversals.",
        "Requires specialized charting tools not available on most free platforms."
      ],
      "examples": [
        {
          "label": "Delta confirming a breakout",
          "scenario": "ES breaks above 5,210 resistance. The breakout candle shows +1,200 delta.",
          "detail": "Strongly positive delta confirms aggressive buyers drove the breakout. Higher-conviction than a breakout with flat or negative delta."
        },
        {
          "label": "Delta divergence",
          "scenario": "ES makes a new high at 5,230 but cumulative delta has been declining for 30 minutes.",
          "detail": "Price rising with weakening buying. Often a prelude to reversal. Not an immediate short signal, but a reason to be cautious about new longs."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using delta as a standalone signal",
          "fix": "Delta is context, not a signal. Combine with price action, levels, and market structure."
        },
        {
          "mistake": "Looking at delta without understanding the order book",
          "fix": "Delta shows aggressive orders. It doesn't show passive liquidity that can absorb without showing in delta."
        },
        {
          "mistake": "Overcomplicating with too many delta indicators",
          "fix": "Start with simple cumulative delta and one footprint chart. Too many indicators create analysis paralysis."
        }
      ],
      "relatedTerms": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Order Book / DOM",
          "slug": "order-book-dom"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Drawdown",
    "slug": "drawdown",
    "category": "risk",
    "tldr": "Peak-to-trough decline in account equity. The number that ends trading careers.",
    "page": {
      "tldr": "The peak-to-trough decline in your account equity. Drawdown is the number that ends trading careers, triggers prop firm violations, and determines whether your strategy is survivable.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Margin",
          "slug": "margin"
        }
      ],
      "sections": [
        {
          "id": "what-is-drawdown",
          "heading": "What is drawdown?",
          "body": "Drawdown measures how far your account has fallen from its highest point. If your account peaks at $50,000 and drops to $45,000, you're in a $5,000 drawdown, or 10%.\n\nThe key concept is that drawdown is measured from the peak, not from your starting balance. If you grow your account from $50,000 to $60,000 and then fall to $55,000, your drawdown is $5,000 from the $60,000 peak, even though you're still up from where you started."
        },
        {
          "id": "types-of-drawdown",
          "heading": "Types of drawdown",
          "body": "Maximum drawdown is the largest peak-to-trough drop in your account history. This is the single most important number for evaluating a trading strategy because it tells you the worst-case scenario you need to survive.\n\nDaily drawdown is the maximum loss allowed in a single trading day. Prop firms use this as a hard limit.\n\nTrailing drawdown follows your account equity upward but never moves down. If your trailing drawdown is $3,000 and your account reaches $53,000, the liquidation level moves up to $50,000. It never drops back down."
        },
        {
          "id": "drawdown-math",
          "heading": "The math of recovery",
          "body": "Drawdown recovery is not symmetrical. A 10% loss requires an 11.1% gain to get back to even. A 20% loss requires 25%. A 50% loss requires 100%, meaning you need to double your remaining capital just to break even.\n\nThis is why small drawdowns are manageable and large ones are career-ending. A trader who limits drawdowns to 5-10% can recover in a few good trading days. A trader who lets drawdown reach 30-40% may never recover because the math works against them."
        },
        {
          "id": "drawdown-in-prop-firms",
          "heading": "Drawdown rules in prop firms",
          "body": "Every prop firm sets drawdown limits as the primary risk control. Static drawdown means your liquidation level is fixed from the start. Trailing drawdown means the liquidation level follows your account's high-water mark.\n\nMany traders pass the profit target but lose the account because the trailing drawdown caught up to them. Understanding which type your firm uses is essential before you start trading."
        },
        {
          "id": "managing-drawdown",
          "heading": "How to manage drawdown",
          "body": "The best way to manage drawdown is to prevent it from getting large in the first place. Set a daily loss limit and stop trading when you hit it. Most professional traders use a daily limit of 1-2% of their account.\n\nReduce position size during drawdowns. If you are down 5% from your peak, cut your contract size in half. This slows the bleeding and gives you room to recover without taking outsized risk."
        }
      ],
      "keyPoints": [
        "Drawdown is measured from the peak, not from your starting balance.",
        "Recovery is asymmetric. A 20% loss requires a 25% gain to break even.",
        "Prop firms use daily drawdown and trailing drawdown as hard limits.",
        "Trailing drawdown follows your equity up but never moves back down.",
        "The best way to manage drawdown is to prevent it from getting large."
      ],
      "examples": [
        {
          "label": "Trailing drawdown trap",
          "scenario": "You start a prop firm evaluation with $50,000. Trailing drawdown is $2,500. You make $2,000 on day one, bringing your account to $52,000.",
          "detail": "Your liquidation level is now $49,500 ($52,000 minus $2,500). On day two, you lose $2,600. Your equity drops to $49,400, which is below the $49,500 trailing drawdown level. Your account is closed, even though you are only down $600 from your starting balance."
        },
        {
          "label": "Recovery math in action",
          "scenario": "Your $25,000 account drops to $20,000 after a bad week. That is a 20% drawdown.",
          "detail": "To get back to $25,000, you need a 25% return on your remaining $20,000. If you average $500 per day in profits, that is 10 trading days just to get back to where you started."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Increasing position size to recover from drawdown faster",
          "fix": "This is the most common way traders blow up. Reduce size during drawdowns. Smaller positions give you more room to recover."
        },
        {
          "mistake": "Not understanding trailing drawdown before starting an evaluation",
          "fix": "Read the prop firm rules carefully. Know whether the drawdown is static or trailing, and whether it is calculated on closed trades only or on unrealized equity."
        },
        {
          "mistake": "Only checking drawdown at the end of the day",
          "fix": "Prop firms track intraday equity. A position that is down $3,000 at 11 AM but recovers by 4 PM still triggered the drawdown limit at 11 AM."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        },
        {
          "term": "Prop Firm / Funded Account",
          "slug": "prop-firm"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "E-mini",
    "slug": "e-mini",
    "category": "instruments",
    "tldr": "Electronically traded, smaller-sized versions of standard index futures (ES, NQ, RTY, YM).",
    "page": {
      "tldr": "Electronically traded, smaller-sized versions of standard futures contracts. ES is the most traded futures contract in the world with millions of contracts per day.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Contract Specifications",
          "slug": "contract-specifications"
        }
      ],
      "sections": [
        {
          "id": "what-are-eminis",
          "heading": "What are E-mini contracts?",
          "body": "E-mini contracts are electronically traded futures representing a fraction of a full-size contract. The most popular are equity index E-minis: E-mini S&P 500 (ES), E-mini Nasdaq-100 (NQ), E-mini Russell 2000 (RTY), and E-mini Dow (YM).\n\nES is the single most actively traded futures contract in the world, with millions of contracts daily."
        },
        {
          "id": "specs",
          "heading": "E-mini specifications",
          "body": "ES: $50 per point, 0.25-point tick ($12.50/tick). At 5,200, one contract = $260,000 notional.\n\nNQ: $20 per point, 0.25-point tick ($5.00/tick). Higher index level but smaller multiplier.\n\nRTY: $50 per point, 0.10-point tick ($5.00/tick). Smaller notional, more accessible.\n\nYM: $5 per point, 1.00-point tick ($5.00/tick). Smallest per-point value of the four."
        },
        {
          "id": "emini-vs-micro",
          "heading": "E-mini vs. Micro E-mini",
          "body": "Micros are 1/10th the size. MES is $5/point vs. $50 for ES. MNQ is $2/point vs. $20 for NQ.\n\nMicros are extremely popular with newer traders. The tradeoff is slightly wider spreads and lower volume during overnight sessions. During RTH, the difference is negligible."
        }
      ],
      "keyPoints": [
        "E-minis are smaller, electronically traded versions of standard futures.",
        "ES is the most traded futures contract in the world.",
        "ES: $50/point, NQ: $20/point, RTY: $50/point, YM: $5/point.",
        "Micro E-minis are 1/10th size, ideal for learning and small accounts.",
        "E-minis trade nearly 23 hours per day."
      ],
      "examples": [
        {
          "label": "ES vs. MES for a small account",
          "scenario": "Your account is $10,000. You want S&P 500 exposure.",
          "detail": "One ES at $50/point: a 20-point move is $1,000 (10% of account). Two MES at $5/point: same move is $200 (2%). Micros let you size appropriately."
        },
        {
          "label": "Comparing E-minis",
          "scenario": "You're choosing between ES, NQ, and RTY for day trading.",
          "detail": "ES moves 30-60 points daily ($1,500-$3,000/contract). NQ moves 150-300 points ($3,000-$6,000). RTY moves 15-30 points ($750-$1,500). NQ has the most dollar movement per day."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Starting with full E-minis before learning on micros",
          "fix": "Micros let you practice with real money at 1/10th the risk. No advantage to full-size until your account and skill justify it."
        },
        {
          "mistake": "Treating all E-minis as interchangeable",
          "fix": "Each has different volatility, sector exposure, and daily range. They have distinct personalities."
        },
        {
          "mistake": "Ignoring the overnight session",
          "fix": "Significant moves happen overnight. Check Globex before RTH opens even if you only day trade."
        }
      ],
      "relatedTerms": [
        {
          "term": "Micro Contracts",
          "slug": "micro-contracts"
        },
        {
          "term": "Contract Specifications",
          "slug": "contract-specifications"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Expiration / Rollover",
    "slug": "expiration-rollover",
    "category": "pricing",
    "tldr": "When a contract expires and traders move to the next month. Happens quarterly for indexes.",
    "page": {
      "tldr": "Futures contracts expire on scheduled dates. Rollover is closing the expiring contract and opening the next month to maintain continuous exposure.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Front Month",
          "slug": "front-month"
        }
      ],
      "sections": [
        {
          "id": "what-is-expiration",
          "heading": "What is expiration?",
          "body": "Every futures contract has a defined expiration date. After this date, the contract settles and ceases to exist. Equity index futures expire quarterly on the third Friday of March, June, September, and December.\n\nAs expiration approaches, volume in the expiring contract declines and volume in the next month increases. The transition typically happens 1-2 weeks before expiration for index futures."
        },
        {
          "id": "what-is-rollover",
          "heading": "What is rollover?",
          "body": "Rollover is closing your position in the expiring contract and simultaneously opening the same position in the next month. If you're long 2 ES September contracts, you sell 2 September and buy 2 December.\n\nMost platforms offer a calendar spread order that executes both legs simultaneously. This is better than two separate orders because it locks in the price differential."
        },
        {
          "id": "roll-cost",
          "heading": "The cost of rolling",
          "body": "You pay commissions and spreads on both legs. The price difference between months also matters. In contango, the next month is more expensive (negative roll yield for longs). In backwardation, it's cheaper (positive roll yield).\n\nFor equity index futures, the roll cost is typically small. For commodities in steep contango, it can be significant over multiple periods."
        }
      ],
      "keyPoints": [
        "Every futures contract expires and cannot be held indefinitely.",
        "Equity index futures expire quarterly (March, June, September, December).",
        "Rollover means closing the expiring contract and opening the next month.",
        "Most traders roll 1-2 weeks before expiration when volume shifts.",
        "Rolling has costs: two sets of commissions plus any calendar spread difference."
      ],
      "examples": [
        {
          "label": "Quarterly ES rollover",
          "scenario": "It's early December. You're long 1 ES December. Expiration is Dec 20, roll day is Dec 12.",
          "detail": "On Dec 12, sell December and buy March. Volume has shifted to March, so fills are better in the new contract. After rolling, your position continues seamlessly."
        },
        {
          "label": "Missing the rollover",
          "scenario": "You forget to roll and hold past roll day. Liquidity thins as others moved to the next month.",
          "detail": "Spreads widen and fills worsen. If you hold to expiration, the contract cash-settles. You've traded in suboptimal conditions for no reason."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Holding an expiring contract too long to avoid roll costs",
          "fix": "Roll costs are trivial compared to trading in an illiquid expiring contract."
        },
        {
          "mistake": "Not knowing when your contract expires",
          "fix": "Put expiration dates and roll dates on your calendar for every product you trade."
        },
        {
          "mistake": "Confusing the continuous chart with the actual contract",
          "fix": "Continuous charts splice multiple months. Make sure your order targets the correct active contract."
        }
      ],
      "relatedTerms": [
        {
          "term": "Front Month",
          "slug": "front-month"
        },
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Backwardation",
          "slug": "backwardation"
        },
        {
          "term": "Delivery",
          "slug": "delivery"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Fill",
    "slug": "fill",
    "category": "orders",
    "tldr": "When your order is executed and you have an open position. As in, 'I got filled at 5200.'",
    "page": {
      "tldr": "When your order is executed by the exchange. Your fill price is the actual price at which the transaction occurred.",
      "prerequisites": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-fill",
          "heading": "What is a fill?",
          "body": "A fill is the execution of your order. When your buy order matches with a seller on the exchange, you've been filled. Your fill price is the exact price of the transaction.\n\nTraders use fill as both noun and verb: 'I got a fill at 5,200' or 'I'm waiting for my limit to fill.'"
        },
        {
          "id": "fill-types",
          "heading": "How different orders fill",
          "body": "Market orders fill immediately at the best available price. Limit orders fill only at your price or better and might not fill at all. Stop orders don't fill until triggered, then become market orders.\n\nPartial fills occur when there isn't enough volume at a price for your entire order. Buying 5 contracts when only 3 are available at your price gives a partial fill of 3."
        },
        {
          "id": "fill-quality",
          "heading": "What makes a good fill",
          "body": "A good fill matches or beats your expected price. Fill quality depends on market conditions (RTH vs. overnight), liquidity, and broker routing.\n\nDirect market access (DMA) brokers send orders directly to the exchange. Brokers routing through intermediaries may add delay, which matters in fast markets."
        }
      ],
      "keyPoints": [
        "A fill is the execution of your order at a specific price.",
        "Market orders always fill. Limit orders may not. Stop orders fill after triggering.",
        "Partial fills occur when volume can't cover your full order.",
        "Fill quality depends on market conditions, liquidity, and broker routing.",
        "In liquid markets during RTH, fills are typically clean."
      ],
      "examples": [
        {
          "label": "Clean limit fill",
          "scenario": "Buy limit at 5,195. ES trades down to 5,195 and fills.",
          "detail": "Filled at your exact price. Ideal limit order scenario."
        },
        {
          "label": "Partial fill",
          "scenario": "Buy limit for 10 contracts at 5,195. Only 6 available at that price.",
          "detail": "Partial fill of 6 at 5,195. Remaining 4 stay working. If price moves away, you have a smaller position than planned."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Assuming a fill means the trade was a good idea",
          "fix": "Getting filled just means the order executed. It says nothing about whether the trade will be profitable."
        },
        {
          "mistake": "Not checking fill price after execution",
          "fix": "Especially with market and stop orders, your fill may differ from expected. Always verify."
        },
        {
          "mistake": "Chasing after a missed limit fill",
          "fix": "A missed fill is not a loss. Don't switch to a market order at a worse price out of frustration."
        }
      ],
      "relatedTerms": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Front Month",
    "slug": "front-month",
    "category": "pricing",
    "tldr": "The nearest expiration contract. Most liquid, most traded, and usually the one you want.",
    "page": {
      "tldr": "The futures contract closest to expiration. Most liquid, most traded, tightest spreads. This is the contract you should be trading.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        }
      ],
      "sections": [
        {
          "id": "what-is-front",
          "heading": "What is the front month?",
          "body": "The front month (also called the nearby or prompt month) is the contract with the nearest expiration. For equity index futures, this changes quarterly. For monthly contracts like crude oil, it changes every month.\n\nThe front month has the most volume and tightest spreads. It's where the majority of trading activity concentrates."
        },
        {
          "id": "why-front-matters",
          "heading": "Why traders focus on the front month",
          "body": "The front month has the best liquidity, meaning lower trading costs and better fills. As expiration approaches and traders roll, volume shifts to the next month.\n\nThe crossover where the next month becomes more liquid happens about 8-10 days before expiration for equity index futures. Most retail traders should trade the front month until roll day, then switch."
        },
        {
          "id": "front-behavior",
          "heading": "How front month contracts behave",
          "body": "Front month contracts are most responsive to news, economic data, and sentiment. They move faster than deferred contracts.\n\nAs expiration approaches, the front month converges toward spot or fair value. The last few days before expiration can see lower liquidity as remaining positions close. Most traders have moved to the next month by this point."
        }
      ],
      "keyPoints": [
        "The front month is the contract closest to expiration.",
        "It has the most volume, tightest spreads, and best fill quality.",
        "Most traders should trade the front month and roll before expiration.",
        "Volume shifts to the next month about 8-10 days before expiration for index futures.",
        "Back month contracts are mainly for spread strategies and specific-date hedging."
      ],
      "examples": [
        {
          "label": "Identifying the front month",
          "scenario": "It's February 15. ES quarterly contracts: March, June, September, December.",
          "detail": "Front month is March. Highest volume, tightest spreads. After March expiration (third Friday), June becomes front month. Roll around March 10-12."
        },
        {
          "label": "Volume shift",
          "scenario": "March 10. ES March volume: 800K. ES June volume: 1.2M.",
          "detail": "Volume has shifted to June. Even though March hasn't expired, June is now more liquid. Trade June from here."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Trading the wrong contract month",
          "fix": "Always verify you're on the front month (or next month after roll day). Wrong month = wider spreads and worse fills."
        },
        {
          "mistake": "Staying in the expiring contract after volume shifts",
          "fix": "When volume moves, move with it. Don't wait until expiration day."
        },
        {
          "mistake": "Assuming all products have the same contract schedule",
          "fix": "ES expires quarterly. CL expires monthly. ZC has specific delivery months. Check each product."
        }
      ],
      "relatedTerms": [
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Backwardation",
          "slug": "backwardation"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Futures Contract",
    "slug": "futures-contract",
    "category": "basics",
    "tldr": "A binding agreement to buy or sell an asset at a set price on a future date.",
    "page": {
      "tldr": "A legally binding agreement to buy or sell a standardized asset at a predetermined price on a specific future date. This is the foundation of everything else in futures trading.",
      "prerequisites": [],
      "sections": [
        {
          "id": "what-is-a-futures-contract",
          "heading": "What is a futures contract?",
          "body": "A futures contract is an agreement between two parties to buy or sell a specific asset at a specific price on a specific date in the future. One side agrees to buy (long), the other agrees to sell (short). Neither side can back out.\n\nUnlike stocks, where you're buying ownership in a company, futures contracts are agreements about price. When you buy an ES futures contract, you're not buying a piece of the S&P 500. You're entering an agreement that pays you if the S&P 500 goes up and costs you if it goes down."
        },
        {
          "id": "standardization",
          "heading": "Why futures are standardized",
          "body": "Every futures contract has standardized terms set by the exchange. The contract specifies exactly what asset is being traded, how much of it, when it expires, and the minimum price increment (tick size).\n\nThis standardization is what makes futures liquid. Because every ES contract is identical, buyers and sellers don't need to negotiate terms. You can enter and exit positions instantly because there's always someone on the other side.\n\nCompare this to a private forward contract between two businesses, where every detail is custom negotiated. Futures took that concept and made it tradeable on an exchange."
        },
        {
          "id": "how-futures-differ-from-stocks",
          "heading": "How futures differ from stocks",
          "body": "Futures expire. Every contract has an expiration date, after which it settles and ceases to exist. Stock shares have no expiration. This means futures traders must either close their position before expiration or roll it to the next contract month.\n\nFutures use leverage. You only need to post a small margin deposit (typically 3-12% of the contract's full value) to control the entire position.\n\nFutures settle daily. Your gains and losses are credited or debited from your account at the end of every trading day through a process called mark to market. You don't wait until you sell to realize gains or losses.\n\nFutures can be shorted just as easily as they can be bought. There's no borrowing, no locate requirement, and no uptick rule."
        },
        {
          "id": "who-trades-futures",
          "heading": "Who trades futures and why",
          "body": "Hedgers use futures to manage risk. An airline might buy crude oil futures to lock in fuel costs. A farmer might sell corn futures to lock in a harvest price. These are the participants futures markets were originally designed for.\n\nSpeculators trade futures to profit from price changes. Day traders, swing traders, and algorithmic traders all fall into this category. Speculators provide the liquidity that hedgers need.\n\nMost retail futures traders are speculators focused on equity index futures (ES, NQ) and energy (CL). The appeal is leverage, liquidity, tax treatment (60/40 long-term/short-term capital gains in the US), and nearly 24-hour trading."
        },
        {
          "id": "contract-lifecycle",
          "heading": "The lifecycle of a contract",
          "body": "A futures contract is listed by the exchange months before its expiration date. For equity index futures like ES and NQ, new contracts are listed quarterly (March, June, September, December).\n\nThe front month contract is the one closest to expiration and typically has the most volume and tightest spreads. As expiration approaches, traders roll their positions to the next contract month.\n\nAt expiration, the contract settles. Cash-settled contracts (like ES and NQ) simply credit or debit the final price difference. Physically-settled contracts (like crude oil or corn) require actual delivery of the commodity. Most retail traders close or roll well before this happens."
        }
      ],
      "keyPoints": [
        "A futures contract is an agreement about price, not ownership of an asset.",
        "All contracts are standardized by the exchange, which makes them liquid and tradeable.",
        "Futures use leverage, expire, settle daily, and can be shorted without restrictions.",
        "Hedgers manage risk, speculators seek profit. Both are essential to the market.",
        "Most retail traders focus on cash-settled contracts and roll before expiration."
      ],
      "examples": [
        {
          "label": "Going long ES",
          "scenario": "You believe the S&P 500 will rise. You buy 1 ES futures contract at 5,200.",
          "detail": "Your contract is worth 5,200 x $50 = $260,000 in notional value. You posted roughly $12,000 in margin. If ES rises to 5,220, you've made 20 points x $50 = $1,000. If it falls to 5,180, you've lost $1,000. You can close the position at any time before expiration."
        },
        {
          "label": "Hedging with futures",
          "scenario": "A wheat farmer expects to harvest 5,000 bushels in September. Current wheat futures for September delivery are trading at $6.50 per bushel.",
          "detail": "The farmer sells 1 wheat futures contract (5,000 bushels) at $6.50. If wheat drops to $5.50 by September, the farmer loses on the physical crop but gains $5,000 on the futures position. The hedge locked in a price of $6.50 regardless of what happens in the market."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Treating futures like stocks and holding indefinitely",
          "fix": "Futures expire. If you don't close or roll your position, it will settle. Know the expiration date and have a plan."
        },
        {
          "mistake": "Not understanding the notional value of what you're trading",
          "fix": "One ES contract controls $250,000+. One CL contract controls $70,000+ of crude oil. Calculate the notional value before you trade so you understand your actual exposure."
        },
        {
          "mistake": "Thinking you can only go long",
          "fix": "Futures are symmetrical. Shorting is just as easy as buying. If you think the market is going down, you can sell a contract to open and buy it back to close."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        },
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        },
        {
          "term": "Settlement",
          "slug": "settlement"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Gap",
    "slug": "gap",
    "category": "structure",
    "tldr": "The price difference between one session's close and the next session's open.",
    "page": {
      "tldr": "The price difference between one session's close and the next session's open. Small gaps tend to fill. Large gaps driven by news tend to continue.",
      "prerequisites": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Globex / Electronic Session",
          "slug": "globex"
        }
      ],
      "sections": [
        {
          "id": "what-is-gap",
          "heading": "What is a gap?",
          "body": "A gap occurs when a futures contract opens at a different price than it closed. If ES closes at 5,200 and opens at 5,210, there's a 10-point gap up.\n\nIn futures, gaps typically form between sessions. True gaps are most visible between the Friday close and Sunday open, or between RTH close and next RTH open. The Globex session can partially fill gaps before RTH opens."
        },
        {
          "id": "gap-fill",
          "heading": "Gap fills and continuations",
          "body": "A gap fill occurs when price retraces back to the prior close after gapping away. Statistically, small and medium gaps fill more often than large gaps. Very large gaps driven by significant news tend to continue rather than fill.\n\nTracking gap fill statistics for your product gives a probability-based edge for early-session trades."
        },
        {
          "id": "trading-gaps",
          "heading": "Trading gaps",
          "body": "Gap fill trades fade the gap direction, expecting price to return to the prior close. Works best with small to medium gaps.\n\nGap continuation trades follow the gap direction. Works best with large gaps driven by catalysts.\n\nBoth approaches need a stop loss and defined invalidation. A gap fill trade is invalidated if price continues strongly in the gap direction."
        }
      ],
      "keyPoints": [
        "A gap is the difference between one session's close and the next open.",
        "Small and medium gaps tend to fill. Large gaps tend to continue.",
        "Gap fill rates vary by product, session, and conditions.",
        "Gap fill trades fade the direction. Continuation trades follow it.",
        "Always define invalidation levels before trading a gap."
      ],
      "examples": [
        {
          "label": "RTH gap fill",
          "scenario": "ES closed at 5,200 yesterday. Opens at 5,212 today (12-point gap up).",
          "detail": "A gap fill trade: short near the open targeting 5,200 (prior close). Stop above the opening range high. If ES pulls back to 5,200, the gap filled."
        },
        {
          "label": "Large gap continuation",
          "scenario": "Major earnings miss overnight. NQ gaps down 200 points.",
          "detail": "A 200-point gap with a fundamental catalyst rarely fills. Continuation (shorting) with a stop above 18,350 is more likely to work than fading."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Blindly fading every gap",
          "fix": "Large gaps driven by news rarely fill. Check gap size relative to the average daily range and look for a catalyst."
        },
        {
          "mistake": "Not having a stop loss on gap trades",
          "fix": "A gap that doesn't fill can turn into a trend day. Always have a defined exit."
        },
        {
          "mistake": "Using RTH close when Globex has partially filled the gap",
          "fix": "Define which gap you're trading: full gap from RTH close or residual gap from Globex."
        }
      ],
      "relatedTerms": [
        {
          "term": "Opening Range",
          "slug": "opening-range"
        },
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Globex / Electronic Session",
          "slug": "globex"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Globex / Electronic Session",
    "slug": "globex",
    "category": "sessions",
    "tldr": "CME's electronic overnight trading platform. Lower volume and wider spreads, but always important context.",
    "page": {
      "tldr": "CME's electronic overnight trading platform. Lower volume than RTH but essential for context. Runs from Sunday evening through Friday afternoon.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        }
      ],
      "sections": [
        {
          "id": "what-is-globex",
          "heading": "What is the Globex session?",
          "body": "Globex is CME Group's electronic trading platform enabling trading outside regular hours. For equity index futures, it opens Sunday at 6:00 PM ET and runs nearly continuously until Friday at 5:00 PM ET, with a daily halt from 5:00 PM to 6:00 PM ET.\n\nWhen traders say 'Globex' or 'overnight,' they typically mean the non-RTH portion (6:00 PM to 9:30 AM ET)."
        },
        {
          "id": "globex-vs-rth",
          "heading": "How Globex differs from RTH",
          "body": "Volume is significantly lower. ES might trade 200,000 contracts overnight vs. 1,500,000+ during RTH. This means wider spreads, choppier price action, and less reliable patterns.\n\nHowever, major moves happen during Globex. Geopolitical events, overseas economic data, and after-hours earnings all drive overnight action. The Globex high and low are important reference levels for RTH traders."
        },
        {
          "id": "trading-globex",
          "heading": "Should you trade Globex?",
          "body": "Most retail traders should focus on RTH and use Globex for context. Lower volume and wider spreads make overnight execution harder.\n\nSome traders target the London open (2-3 AM ET) or European session (3-9:30 AM ET) when volume increases. If you trade Globex, use limit orders and reduce position size."
        }
      ],
      "keyPoints": [
        "Globex enables nearly 24-hour futures trading.",
        "Volume is much lower than RTH with wider spreads.",
        "Major moves can happen overnight from global events.",
        "Globex high and low are important reference levels for RTH.",
        "Most retail traders should use Globex for context, not primary trading."
      ],
      "examples": [
        {
          "label": "Overnight context for RTH",
          "scenario": "Globex: ES trades down to 5,185 (overnight low) and recovers to 5,200 by RTH open.",
          "detail": "5,185 is now a significant reference. If RTH holds above it, the overnight sell-off was absorbed. If RTH breaks below, sellers are strong."
        },
        {
          "label": "European session move",
          "scenario": "EU CPI data at 5 AM ET comes in hot. ES drops 25 points in 30 minutes.",
          "detail": "This happened on thin volume. By RTH open, the move may have reversed or extended. The 5 AM level becomes a key reference."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Ignoring overnight price action before RTH",
          "fix": "Always check Globex high, low, and current price vs. prior RTH close before trading."
        },
        {
          "mistake": "Using market orders during thin overnight periods",
          "fix": "Spreads can be 2-4 ticks. Use limit orders."
        },
        {
          "mistake": "Same position size overnight as RTH",
          "fix": "Lower liquidity = bigger slippage risk. Reduce size or use micros during Globex."
        }
      ],
      "relatedTerms": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Gap",
          "slug": "gap"
        },
        {
          "term": "Opening Range",
          "slug": "opening-range"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Hedging",
    "slug": "hedging",
    "category": "strategy",
    "tldr": "Using futures to offset risk in an existing position or business exposure.",
    "page": {
      "tldr": "Using futures contracts to reduce or offset risk in an existing position or business exposure. Hedgers are a primary reason futures markets exist.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "sections": [
        {
          "id": "what-is-hedging",
          "heading": "What is hedging?",
          "body": "Hedging uses a futures position to reduce risk in an existing exposure. A hedger isn't trying to profit from price movements. They're trying to protect against them.\n\nThe classic example: a corn farmer sells futures in spring to lock in a harvest price. If corn drops over summer, futures profits offset the lower crop revenue."
        },
        {
          "id": "who-hedges",
          "heading": "Who uses futures for hedging?",
          "body": "Commodity producers (farmers, miners, oil producers) sell futures to hedge against falling prices. Consumers (airlines, food manufacturers) buy futures to hedge against rising prices.\n\nPortfolio managers sell index futures to hedge equity portfolios. Multinational corporations use currency futures to hedge exchange rate risk."
        },
        {
          "id": "hedging-for-retail",
          "heading": "Hedging for retail traders",
          "body": "Most retail traders are speculators. But understanding hedging explains why futures markets exist and have such high liquidity.\n\nA retail investor with a large stock portfolio might sell ES futures during uncertain periods without selling their stocks. This provides short-term protection while maintaining long-term positions.\n\nA hedge doesn't eliminate risk. It converts price risk to basis risk (the risk that the hedge doesn't perfectly track the underlying exposure)."
        }
      ],
      "keyPoints": [
        "Hedging uses futures to offset risk, not to profit from price movements.",
        "Producers sell futures. Consumers buy futures. Both lock in prices.",
        "Portfolio managers sell index futures to protect stock portfolios.",
        "Hedging converts price risk to basis risk, not zero risk.",
        "Hedgers provide the fundamental demand that makes futures markets liquid."
      ],
      "examples": [
        {
          "label": "Airline hedging fuel",
          "scenario": "An airline needs 10 million gallons of fuel next quarter. Current price: $2.50/gallon.",
          "detail": "They buy crude oil futures as a proxy. If oil rises 10%, higher fuel costs are partially offset by futures profits. The net result is a more predictable budget."
        },
        {
          "label": "Portfolio hedge",
          "scenario": "You hold $500,000 in stocks and want protection against a 10% decline.",
          "detail": "Short 2 ES contracts (~$520K notional). If the market drops 10%, your portfolio loses ~$50K but the short ES gains ~$52K. Imperfect if your stocks don't track the S&P exactly."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Over-hedging (more notional than your actual exposure)",
          "fix": "Hedging $500K of stocks with $1M of futures turns a hedge into a speculative short."
        },
        {
          "mistake": "Assuming a hedge is perfect",
          "fix": "Basis risk means your hedge won't match perfectly. A wheat farmer still has quality and timing differences."
        },
        {
          "mistake": "Forgetting to remove the hedge when the risk passes",
          "fix": "Holding a hedge longer than necessary means paying opportunity cost if the market rises."
        }
      ],
      "relatedTerms": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        },
        {
          "term": "Spread Trading",
          "slug": "spread-trading"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Initial Balance (IB)",
    "slug": "initial-balance",
    "category": "structure",
    "tldr": "The price range of the first hour. A Market Profile concept that sets the day's tone.",
    "page": {
      "tldr": "The price range established during the first hour of regular trading hours. A Market Profile concept used to assess the day's potential. Narrow IB suggests a trend day. Wide IB suggests a range day.",
      "prerequisites": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        }
      ],
      "sections": [
        {
          "id": "what-is-initial-balance",
          "heading": "What is the initial balance?",
          "body": "The initial balance (IB) is the price range from the first hour of RTH, specifically 9:30 to 10:30 AM ET for equity index futures. It captures the range that the first wave of institutional activity establishes.\n\nThe IB is a core Market Profile concept developed by J. Peter Steidlmayer. It provides a framework for anticipating what type of day the market is likely to have."
        },
        {
          "id": "narrow-vs-wide",
          "heading": "Narrow IB vs. wide IB",
          "body": "A narrow IB (relative to recent averages) suggests that the market has not yet decided on direction. This often leads to a breakout later in the session, resulting in a trend day where price moves far beyond the IB range.\n\nA wide IB suggests that significant activity has already occurred in the first hour. This often leads to a range day where price stays within or near the IB for the rest of the session.\n\nTo determine whether an IB is narrow or wide, compare it to the average IB of the past 10-20 sessions. If today's IB is in the bottom 25%, it's narrow. Top 25%, it's wide."
        },
        {
          "id": "trading-with-ib",
          "heading": "How traders use the initial balance",
          "body": "Breakout traders watch for price to break above the IB high or below the IB low after 10:30 AM. A clean break with volume suggests a trend day is developing, and traders position in the direction of the break.\n\nFade traders look for failed breakouts. If price pokes above the IB high but quickly reverses back inside, this is an IB failure, and some traders will short with a stop above the failed breakout high.\n\nThe IB midpoint acts as a reference for mean reversion during range days. If the IB is wide and price drifts to one extreme, traders may look for a return to the midpoint."
        }
      ],
      "keyPoints": [
        "The initial balance is the first-hour range of RTH (9:30-10:30 AM ET).",
        "Narrow IB relative to recent average suggests a potential trend day.",
        "Wide IB suggests price may stay range-bound for the session.",
        "Breakout traders enter when price breaks above or below the IB.",
        "Failed IB breakouts are a common fade (counter-trend) setup."
      ],
      "examples": [
        {
          "label": "Narrow IB leading to a trend day",
          "scenario": "ES IB range is 5,195 to 5,203 (8 points). The 20-day average IB is 18 points. This IB is in the bottom 20%.",
          "detail": "At 10:45 AM, ES breaks above 5,203 with strong volume. Price runs to 5,240 by 2 PM without returning to the IB range. The narrow IB correctly signaled that the market hadn't made its move yet, and the breakout initiated a trend day."
        },
        {
          "label": "Wide IB with a failed breakout",
          "scenario": "ES IB range is 5,180 to 5,210 (30 points). The 20-day average is 18 points. This is a wide IB.",
          "detail": "At 11 AM, ES pushes to 5,215 (5 points above IB high) but immediately reverses to 5,207. This is a failed IB breakout. A fade trader shorts at 5,207 with a stop at 5,216 and targets the IB midpoint at 5,195."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using a fixed point value to define narrow or wide IB",
          "fix": "A 10-point IB on ES is narrow in a volatile market and wide in a calm one. Always compare to recent IB averages, not to an arbitrary number."
        },
        {
          "mistake": "Trading the IB breakout without volume confirmation",
          "fix": "Price can drift beyond the IB on low volume and immediately reverse. Wait for a break with above-average volume or strong delta before committing."
        },
        {
          "mistake": "Not adjusting IB times for different products",
          "fix": "IB is 9:30-10:30 ET for equity index futures. For CL, the equivalent concept uses 9:00-10:00 ET. Use the correct RTH open for each product."
        }
      ],
      "relatedTerms": [
        {
          "term": "Opening Range",
          "slug": "opening-range"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        },
        {
          "term": "Value Area",
          "slug": "value-area"
        },
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Leverage",
    "slug": "leverage",
    "category": "basics",
    "tldr": "Controlling large value with a small deposit. Amplifies both gains and losses.",
    "page": {
      "tldr": "The ability to control a large position with a small margin deposit. Leverage is built into every futures contract and it amplifies both your gains and your losses equally.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-leverage",
          "heading": "What is leverage?",
          "body": "Leverage means controlling more value than you've deposited. In futures, this is built into the product. You don't choose to use leverage or apply for it like you would with a stock margin account. Every futures contract comes with leverage by default.\n\nWhen you post $12,000 in margin to trade one ES contract worth $260,000, you're using roughly 21:1 leverage. That means every 1% move in the S&P 500 creates a roughly 21% change in your deposited capital."
        },
        {
          "id": "how-leverage-works",
          "heading": "How leverage works in practice",
          "body": "Leverage is a multiplier that works in both directions. If ES moves 10 points in your favor, you make $500 (10 x $50 per point). That's a 4.2% return on your $12,000 margin deposit from a 0.1% move in the index.\n\nBut if ES moves 10 points against you, you lose $500 just as fast. And unlike stocks, where you can only lose what you invested (unless you're on margin), futures losses can exceed your initial deposit. If the market moves far enough, you can lose more than your entire account balance."
        },
        {
          "id": "leverage-by-product",
          "heading": "Leverage varies by product",
          "body": "Different futures contracts have different margin requirements, which means different effective leverage ratios.\n\nEquity index futures like ES and NQ typically offer 15:1 to 25:1 leverage at exchange margin rates. Day trade margins from brokers can push this to 50:1 or higher.\n\nCrude oil (CL) and gold (GC) offer similar ranges. Agricultural products like corn and soybeans tend to have lower leverage because the contracts are smaller.\n\nMicro contracts (MES, MNQ, MGC) offer the same leverage ratios as their full-size counterparts, but the dollar amounts are 1/10th the size."
        },
        {
          "id": "leverage-is-not-free",
          "heading": "Leverage is not free edge",
          "body": "New traders often see leverage as an advantage. More leverage means more profit per dollar, right? In theory, yes. In practice, leverage is the primary reason most futures traders lose money.\n\nLeverage makes every mistake more expensive. A poorly placed stop costs more. Holding through a pullback costs more. Overtrading costs more. Leverage doesn't create edge. It magnifies whatever edge (or lack of edge) you already have.\n\nProfessional traders typically use far less leverage than they're allowed to. Just because you can control $260,000 with $12,000 doesn't mean you should."
        }
      ],
      "keyPoints": [
        "Leverage is built into futures. You don't apply for it or choose it.",
        "It works both ways. The same multiplier that grows gains also grows losses.",
        "Futures losses can exceed your initial margin deposit.",
        "Day trade margin from brokers can create extremely high leverage ratios.",
        "Professional traders use much less leverage than they're allowed to."
      ],
      "examples": [
        {
          "label": "Leverage multiplier on ES",
          "scenario": "You post $12,000 margin for 1 ES contract. The S&P 500 is at 5,200, making the contract worth $260,000.",
          "detail": "That's roughly 21.7:1 leverage. If ES rises 1% (52 points), you make $2,600, which is a 21.7% return on your margin. If ES falls 1%, you lose $2,600. A 4.6% decline (240 points) would wipe out your entire $12,000 margin deposit."
        },
        {
          "label": "Day trade margin leverage",
          "scenario": "Your broker offers $500 day trade margin for MES. One MES contract at 5,200 is worth $26,000.",
          "detail": "That's 52:1 leverage. A 10 point move on MES is worth $50. On a $500 margin deposit, that's a 10% swing from a 0.2% index move. This is why day trade margins require strict stop losses and position discipline."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using maximum leverage because it's available",
          "fix": "Available leverage is a ceiling, not a target. Size your positions based on your account and risk tolerance, not based on what the broker allows."
        },
        {
          "mistake": "Not calculating the actual leverage ratio of a trade",
          "fix": "Before entering any trade, divide the notional value by your account size. If the ratio makes you uncomfortable, trade fewer contracts or use micros."
        },
        {
          "mistake": "Thinking micro contracts eliminate leverage risk",
          "fix": "Micro contracts are 1/10th the size, but the leverage ratios are the same. Trading 10 MES contracts is identical exposure to 1 ES contract."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Micro Contracts",
          "slug": "micro-contracts"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Limit Order",
    "slug": "limit-order",
    "category": "orders",
    "tldr": "An order at a specific price or better. You control the price but might not get filled.",
    "page": {
      "tldr": "An order to buy or sell at a specific price or better. Limit orders give you full control over your entry price, but there's no guarantee the market will reach your level.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "sections": [
        {
          "id": "what-is-limit-order",
          "heading": "What is a limit order?",
          "body": "A limit order tells your broker: fill me at this price or better, or don't fill me at all. If you place a buy limit at 5,180, you'll only be filled at 5,180 or lower. If the market never drops to 5,180, your order sits unfilled until you cancel it.\n\nSell limit orders work the same way in reverse. A sell limit at 5,220 will only fill at 5,220 or higher."
        },
        {
          "id": "when-to-use",
          "heading": "When to use limit orders",
          "body": "Limit orders are the right choice when you have a specific price in mind and you're willing to miss the trade if the market doesn't reach it. This includes entering at a support or resistance level, taking profit at a predetermined target, and adding to a position at a better price.\n\nMost experienced traders use limit orders for the majority of their entries and profit targets."
        },
        {
          "id": "limit-vs-market",
          "heading": "Limit orders vs. market orders",
          "body": "The tradeoff is simple: limit orders give you price control but no fill guarantee. Market orders give you fill guarantee but no price control.\n\nIn a liquid market like ES during regular trading hours, the difference is usually just one tick. But in fast markets or around major news events, a market order can fill several ticks or even points away from where you expected. A limit order protects you from this slippage.\n\nThe downside is watching the market move to your level and then reverse without filling yours. This is called getting edged and it's a normal part of trading with limits."
        },
        {
          "id": "order-queue",
          "heading": "How the order queue works",
          "body": "Limit orders at the same price are filled in the order they were placed. If there are 500 contracts ahead of yours at 5,200, all 500 need to be filled before yours gets executed. The market touching your price does not guarantee a fill.\n\nThis is why you'll sometimes see price trade at your exact limit level but your order remains unfilled. Price needs to trade through your level for you to get filled.\n\nIn fast-moving markets, price may touch your level for only a fraction of a second. The traders at the front of the queue get filled. The rest don't."
        }
      ],
      "keyPoints": [
        "A limit order will only fill at your specified price or better.",
        "Price touching your level does not guarantee a fill. Queue position matters.",
        "Use limit orders when you have a specific price target and can accept missing the trade.",
        "Most experienced traders use limit orders for entries and profit targets.",
        "In fast markets, limit orders protect you from slippage."
      ],
      "examples": [
        {
          "label": "Buy limit at support",
          "scenario": "ES is trading at 5,210. You see strong support at 5,195 and place a buy limit order at 5,195.",
          "detail": "If ES pulls back to 5,195, your order may fill. If it bounces at 5,196 and reverses higher, you miss the trade but you avoided overpaying. If it crashes through 5,195 to 5,180, your order fills at 5,195 and you're immediately underwater."
        },
        {
          "label": "Profit target with limit",
          "scenario": "You're long 1 ES contract from 5,200. Your profit target is 5,215. You place a sell limit at 5,215.",
          "detail": "When ES reaches 5,215, your sell limit is triggered and you lock in 15 points ($750). The order fills automatically without you needing to watch the screen."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Placing a limit order and assuming it will fill because price touched the level",
          "fix": "Price at your level is not a fill. Volume must trade through your level. Check your order status, don't assume."
        },
        {
          "mistake": "Using limit orders when you need to get out immediately",
          "fix": "If you need an emergency exit, use a market order or a stop order. A limit order that doesn't fill while the market moves against you creates a much larger loss."
        },
        {
          "mistake": "Setting limit orders too far from the current price",
          "fix": "A limit order 50 points below the market will rarely fill during a normal session. Set realistic levels based on recent price action."
        }
      ],
      "relatedTerms": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Stop-Limit Order",
          "slug": "stop-limit-order"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Limit Up / Limit Down",
    "slug": "limit-up-limit-down",
    "category": "basics",
    "tldr": "Circuit breakers that halt trading when price moves too far, too fast.",
    "page": {
      "tldr": "Exchange-imposed circuit breakers that pause or halt trading when a contract's price moves beyond a predefined threshold. Designed to prevent panic-driven crashes and give the market time to absorb information.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Daily Settlement",
          "slug": "daily-settlement"
        }
      ],
      "sections": [
        {
          "id": "what-is-luld",
          "heading": "What is limit up / limit down?",
          "body": "Limit up and limit down are price thresholds set by the exchange that restrict how far a futures contract can move in a single session. If the price hits the limit down level, trading may be paused or halted to prevent further decline. If it hits limit up, the same happens on the upside.\n\nThese are circuit breakers designed to give the market a cooling-off period during extreme moves. They prevent panic selling (or buying) from feeding on itself and causing prices to disconnect from reality."
        },
        {
          "id": "how-they-work",
          "heading": "How circuit breakers work",
          "body": "For equity index futures like ES, the CME uses a tiered system based on the prior day's settlement price. The levels are typically set at 7%, 13%, and 20% from the settlement.\n\nAt the 7% level (Level 1), trading is paused for 15 minutes during regular trading hours. At 13% (Level 2), another 15-minute pause. At 20% (Level 3), trading is halted for the remainder of the day.\n\nDuring overnight (Globex) sessions, futures have their own separate price limits (typically 7% for ES) that prevent trading beyond those levels. Price can trade at the limit but not through it.\n\nCommodity futures have different limit structures. Many agricultural and energy contracts use fixed-dollar or percentage-based limits that vary by product."
        },
        {
          "id": "trading-around-limits",
          "heading": "What happens when limits are hit",
          "body": "When a futures contract hits its price limit, several things happen. Liquidity evaporates on the side being tested. If ES hits limit down, there are no buyers at or below the limit. Sell orders stack up with no one to fill them.\n\nWhen trading resumes after a pause, the market can gap further in the same direction or reverse sharply. The pause gives institutions time to reassess, but it doesn't guarantee a reversal.\n\nIf you have stop orders below a limit-down level, they cannot fill until trading resumes, and when it does, slippage can be severe. This is one of the scenarios where losses can significantly exceed your planned risk."
        }
      ],
      "keyPoints": [
        "Limit up/down are exchange circuit breakers that pause trading during extreme moves.",
        "ES uses tiered levels at 7%, 13%, and 20% from the prior settlement.",
        "Overnight sessions have separate price limits that prevent trading beyond the threshold.",
        "Stop orders below limit levels cannot fill until trading resumes.",
        "When limits are hit, expect extreme slippage and potential gap risk."
      ],
      "examples": [
        {
          "label": "Level 1 circuit breaker",
          "scenario": "Major geopolitical news breaks overnight. ES drops 7% from the prior settlement during the Globex session.",
          "detail": "ES hits its overnight limit-down level and cannot trade lower. Sellers who want out can only sell at the limit price if a buyer steps in. When RTH opens, a 15-minute pause may be triggered if the decline continues. During the pause, no trading occurs."
        },
        {
          "label": "Stop order trapped below limit",
          "scenario": "You're long 2 ES with a stop at 5,100. ES hits limit down at 5,070 during the overnight session.",
          "detail": "Your stop cannot fill because no trades can execute below 5,070. When the limit expands or regular trading resumes, ES may gap to 5,040. Your stop fills there, 60 points below your trigger price. That's $3,000 per contract in unexpected slippage."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Assuming your stop loss will always protect you",
          "fix": "Stop orders cannot fill at prices below limit-down levels. In extreme events, your actual loss can be much larger than your planned stop. This is one reason to keep position sizes conservative."
        },
        {
          "mistake": "Trying to buy the dip at limit down without understanding the risk",
          "fix": "Buying at limit-down feels like a bargain, but the limit may expand further or the market may gap lower when trading resumes. Limit events are not normal market conditions."
        },
        {
          "mistake": "Not knowing the circuit breaker levels for the product you're trading",
          "fix": "Check the exchange website for current limit levels. They're recalculated daily based on the prior settlement and vary by product."
        }
      ],
      "relatedTerms": [
        {
          "term": "Daily Settlement",
          "slug": "daily-settlement"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        },
        {
          "term": "Gap",
          "slug": "gap"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Liquidity",
    "slug": "liquidity",
    "category": "data",
    "tldr": "How easily you can enter and exit without moving the price. Measured by volume and spread.",
    "page": {
      "tldr": "How easily you can enter and exit a position without significantly moving the price. Liquid markets have tight spreads, deep order books, and high volume. Illiquid markets have wide spreads and can move sharply on small orders.",
      "prerequisites": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-liquidity",
          "heading": "What is liquidity?",
          "body": "Liquidity measures how easily you can trade without impacting the price. In a highly liquid market, you can buy or sell large quantities and the price barely moves. In an illiquid market, even a small order can push the price several ticks.\n\nLiquidity is visible in three ways: the bid-ask spread (tighter is more liquid), the depth of the order book (more contracts at each level is more liquid), and daily volume (more volume means more liquidity)."
        },
        {
          "id": "liquidity-varies",
          "heading": "Liquidity varies by product and time",
          "body": "ES is one of the most liquid futures contracts in the world. During regular trading hours, the spread is usually one tick (0.25 points, $12.50) and there are hundreds of contracts at each price level. CL, GC, and NQ are also highly liquid during RTH.\n\nBut every product becomes less liquid outside regular trading hours. ES overnight (Globex) has wider spreads and thinner depth. Agricultural futures like oats or lumber can have very low volume even during the day.\n\nLiquidity also drops around holidays, during summer months, and in the minutes before major economic releases when traders pull their orders."
        },
        {
          "id": "why-liquidity-matters",
          "heading": "Why liquidity matters for your trading",
          "body": "Liquidity directly impacts your execution costs. In a liquid market, you lose 1 tick on a market order. In a thin market, you might lose 3-5 ticks. Over hundreds of trades, this difference compounds into thousands of dollars.\n\nLiquidity also affects how well your stops work. In a liquid market, your stop fills close to the trigger price. In a thin market, slippage can be several ticks, turning a controlled loss into a bigger one.\n\nPosition sizing is constrained by liquidity. If you're trading 20 contracts and there are only 30 on the bid, your order represents a significant chunk of available liquidity and will move the price against you."
        }
      ],
      "keyPoints": [
        "Liquidity is measured by spread, order book depth, and volume.",
        "ES, NQ, CL, and GC are among the most liquid futures contracts.",
        "Every product becomes less liquid outside regular trading hours.",
        "Low liquidity increases slippage, widens spreads, and makes stops less reliable.",
        "Never trade a position size that's large relative to the available liquidity."
      ],
      "examples": [
        {
          "label": "Liquid vs. illiquid fills",
          "scenario": "You sell 5 ES contracts at market during RTH. The bid is 5,200.00 with 450 contracts available.",
          "detail": "All 5 contracts fill at 5,200.00. Zero slippage. Your 5-lot is insignificant relative to the 450 contracts on the bid. This is what good liquidity looks like."
        },
        {
          "label": "Thin market impact",
          "scenario": "You try to sell 5 contracts of a less liquid agricultural future. The bid shows 8 contracts at the best price.",
          "detail": "Your first 8 contracts fill at the bid. But you needed 5 (and got them), except in a thinner product you might see only 3 at the best price, meaning 2 fill one tick lower. That extra tick per contract adds up across many trades."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Trading large positions in overnight sessions",
          "fix": "Liquidity is a fraction of daytime levels during Globex. If you must trade overnight, reduce your position size and use limit orders."
        },
        {
          "mistake": "Assuming every futures product is as liquid as ES",
          "fix": "ES trades over a million contracts daily. Some products trade under 10,000. Check the daily volume and order book depth before trading an unfamiliar product."
        },
        {
          "mistake": "Ignoring the time of day when evaluating execution quality",
          "fix": "The first 30 minutes and last 30 minutes of RTH typically have the best liquidity. The midday session (12-2 PM ET) is often the thinnest."
        }
      ],
      "relatedTerms": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Order Book / DOM",
          "slug": "order-book-dom"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        },
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Lot / Contract Size",
    "slug": "lot-contract-size",
    "category": "basics",
    "tldr": "The standardized quantity one contract represents: 1,000 barrels, $50 times the index, etc.",
    "page": {
      "tldr": "The standardized quantity that one futures contract represents. Knowing the contract size tells you exactly how much exposure you're taking on and how much each tick is worth in dollars.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Tick",
          "slug": "tick"
        }
      ],
      "sections": [
        {
          "id": "what-is-contract-size",
          "heading": "What is contract size?",
          "body": "Contract size is the standardized quantity of the underlying asset that one futures contract represents. For crude oil (CL), one contract is 1,000 barrels. For the E-mini S&P 500 (ES), one contract is $50 multiplied by the index level. For corn (ZC), one contract is 5,000 bushels.\n\nThis standardization is what makes futures tradeable on an exchange. Every participant knows exactly what they're trading without negotiation."
        },
        {
          "id": "how-size-determines-value",
          "heading": "How contract size determines dollar value",
          "body": "Contract size directly determines how much money each price movement is worth. If CL is at $72.00 and the contract size is 1,000 barrels, one contract represents $72,000 in crude oil. A $1.00 move is worth $1,000.\n\nFor ES at 5,200 with a $50 multiplier, one contract controls $260,000. A 1-point move is worth $50.\n\nFor gold (GC) at $2,400 with a 100 troy ounce multiplier, one contract controls $240,000. A $1.00 move is worth $100.\n\nAlways calculate the notional value (price times contract size) before trading a new product. This tells you the total exposure you're taking on."
        },
        {
          "id": "full-size-vs-mini-vs-micro",
          "heading": "Full-size, mini, and micro contracts",
          "body": "Many popular products come in multiple sizes. The E-mini S&P 500 (ES) is $50 per point. The Micro E-mini (MES) is $5 per point, exactly 1/10th the size. 10 MES contracts equal 1 ES contract in exposure.\n\nCrude oil has the full-size CL (1,000 barrels) and the Micro crude MCL (100 barrels). Gold has GC (100 oz) and MGC (10 oz).\n\nSmaller contract sizes let traders with smaller accounts participate with proper position sizing. If your risk calculation says you should trade 0.3 ES contracts, you can trade 3 MES contracts instead."
        }
      ],
      "keyPoints": [
        "Contract size is the standardized quantity one futures contract represents.",
        "It directly determines the dollar value of each price movement.",
        "Always calculate notional value (price x contract size) before trading.",
        "Mini and micro versions let smaller accounts trade with proper position sizing.",
        "10 micro contracts equal 1 standard contract in total exposure."
      ],
      "examples": [
        {
          "label": "Contract size comparison",
          "scenario": "You want to compare the exposure of different products in your portfolio.",
          "detail": "1 ES at 5,200: $50 x 5,200 = $260,000. 1 CL at $72: $72 x 1,000 = $72,000. 1 GC at $2,400: $2,400 x 100 = $240,000. 1 ZC (corn) at $4.50: $4.50 x 5,000 = $22,500. One ES contract has 3.6x the exposure of one CL contract."
        },
        {
          "label": "Using micros for proper sizing",
          "scenario": "Your account is $10,000. You want to risk 1% ($100) per trade on the S&P 500 with a 10-point stop.",
          "detail": "ES: 10 points x $50 = $500 per contract. That's 5% of your account, way too much. MES: 10 points x $5 = $50 per contract. You can trade 2 MES contracts ($100 risk), which is exactly 1% of your account."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Not knowing the contract size before placing a trade",
          "fix": "Every product has a different contract size. Trading 1 CL thinking it's similar to 1 ES is a $72,000 vs $260,000 exposure difference. Check the specs first."
        },
        {
          "mistake": "Confusing contract size with margin requirement",
          "fix": "Margin is the deposit, not the exposure. You might post $7,000 margin for CL, but you're controlling $72,000 in crude oil. Contract size tells you the real exposure."
        },
        {
          "mistake": "Treating 1 contract the same across all products",
          "fix": "1 contract of ES is very different from 1 contract of corn. Always think in dollar exposure and dollar risk, not in number of contracts."
        }
      ],
      "relatedTerms": [
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Notional Value",
          "slug": "notional-value"
        },
        {
          "term": "Micro Contracts",
          "slug": "micro-contracts"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Margin",
    "slug": "margin",
    "category": "basics",
    "tldr": "The deposit required to open and hold a futures position. A performance bond, not a loan.",
    "page": {
      "tldr": "The deposit required to open and hold a futures position. Think of it as a performance bond, not a down payment or a loan.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "sections": [
        {
          "id": "what-is-margin",
          "heading": "What is margin?",
          "body": "In futures trading, margin is the amount of money you must deposit with your broker to open and maintain a position. Unlike stocks, where margin means borrowing money, futures margin is a good-faith deposit. It's a performance bond guaranteeing you can cover potential losses.\n\nThere are two types you need to understand: initial margin and maintenance margin. They serve different purposes, and knowing the difference will keep you out of trouble."
        },
        {
          "id": "initial-vs-maintenance",
          "heading": "Initial margin vs. maintenance margin",
          "body": "Initial margin is the amount required to open a new position. This is set by the exchange (CME Group for most US futures) and your broker may require more on top of that.\n\nMaintenance margin is the minimum account balance you must maintain while holding an open position. It's always lower than the initial margin. If your account balance falls below the maintenance margin due to losses, you'll receive a margin call.\n\nFor example, the E-mini S&P 500 (ES) might require roughly $12,000 in initial margin and $11,000 in maintenance margin per contract. These numbers change regularly based on volatility."
        },
        {
          "id": "margin-calls",
          "heading": "Margin calls",
          "body": "A margin call happens when your account equity drops below the maintenance margin requirement. When this happens, your broker will demand you deposit additional funds immediately, usually by the next business day.\n\nIf you don't meet the margin call, your broker can and will liquidate your positions without your permission to bring the account back into compliance. This can happen at the worst possible price.\n\nThis is why experienced traders never use more than a fraction of their available margin. Just because you can open 10 contracts doesn't mean you should."
        },
        {
          "id": "day-trade-vs-overnight",
          "heading": "Day trade margin vs. overnight margin",
          "body": "Many brokers offer reduced day trade or intraday margin, sometimes as low as $500 per ES contract compared to $12,000+ for overnight positions. This lets you control larger positions during the session.\n\nThe catch: you must close all positions before the session ends. If you're still holding at the cutoff, your broker will either auto-liquidate or require you to have full overnight margin in your account.\n\nDay trade margins vary wildly between brokers. They're a competitive feature, not an exchange requirement. Lower margin means higher leverage, which means faster gains and faster blowups."
        },
        {
          "id": "leverage-relationship",
          "heading": "How margin creates leverage",
          "body": "One ES contract controls roughly $250,000 in notional value (the S&P 500 index times $50 per point). If you're posting $12,000 in margin, you're controlling about 20x your deposit. That's significant leverage.\n\nA 1% move in the S&P 500 equals roughly $2,500 per contract. On a $12,000 margin deposit, that's a 20% gain or loss on your capital from a 1% market move.\n\nThis is why position sizing and risk management are non-negotiable in futures. The leverage is built into the product."
        }
      ],
      "keyPoints": [
        "Margin is a deposit, not a loan. You're not borrowing money.",
        "Initial margin opens the trade. Maintenance margin keeps it open.",
        "Falling below maintenance margin triggers a margin call.",
        "Day trade margins are lower but require closing before session end.",
        "Just because you have the margin doesn't mean you should use it all."
      ],
      "examples": [
        {
          "label": "ES margin example",
          "scenario": "You have $25,000 in your account. ES initial margin is $12,650 and maintenance is $11,500.",
          "detail": "You can open 1 contract with $12,350 in excess margin. If ES drops 50 points ($2,500 loss), your equity is $22,500, still above maintenance. Never max out your margin."
        },
        {
          "label": "Margin call scenario",
          "scenario": "You hold 2 NQ contracts overnight. NQ initial margin is $17,600 each. Your account has $38,000.",
          "detail": "Maintenance margin is $16,000 per contract ($32,000 total). Overnight, NQ drops 200 points, which is a $4,000 loss per contract and $8,000 total. Your equity drops to $30,000, below the $32,000 maintenance requirement. You get a margin call before the next session opens."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using all available margin",
          "fix": "Keep at least 50% of your account as free margin. Professional traders rarely use more than 10-20% of available margin."
        },
        {
          "mistake": "Confusing day trade margin with overnight margin",
          "fix": "Know your broker's cutoff time. If you're holding at that time, you need full overnight margin or you'll be auto-liquidated."
        },
        {
          "mistake": "Ignoring margin changes",
          "fix": "Exchanges increase margin requirements during volatile periods. Check your broker's margin page regularly, especially before major economic events."
        }
      ],
      "relatedTerms": [
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Margin Call",
          "slug": "margin-call"
        }
      ],
      "specs": [
        {
          "product": "E-mini S&P 500 (ES)",
          "initial": "~$12,650",
          "maintenance": "~$11,500",
          "dayTrade": "$500-$2,000"
        },
        {
          "product": "E-mini Nasdaq-100 (NQ)",
          "initial": "~$17,600",
          "maintenance": "~$16,000",
          "dayTrade": "$500-$2,000"
        },
        {
          "product": "Crude Oil (CL)",
          "initial": "~$7,000",
          "maintenance": "~$6,400",
          "dayTrade": "$500-$1,500"
        },
        {
          "product": "Gold (GC)",
          "initial": "~$10,000",
          "maintenance": "~$9,100",
          "dayTrade": "$500-$1,500"
        },
        {
          "product": "Micro E-mini S&P (MES)",
          "initial": "~$1,265",
          "maintenance": "~$1,150",
          "dayTrade": "$50-$200"
        },
        {
          "product": "Corn (ZC)",
          "initial": "~$1,650",
          "maintenance": "~$1,500",
          "dayTrade": "$250-$500"
        }
      ]
    }
  },
  {
    "term": "Margin Call",
    "slug": "margin-call",
    "category": "risk",
    "tldr": "A demand to deposit more money when your account drops below maintenance margin.",
    "page": {
      "tldr": "A demand from your broker to deposit additional funds when your account equity drops below the maintenance margin requirement. If you don't meet the call, your positions get liquidated.",
      "prerequisites": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        }
      ],
      "sections": [
        {
          "id": "what-is-margin-call",
          "heading": "What is a margin call?",
          "body": "A margin call is a notification from your broker that your account equity has fallen below the maintenance margin requirement. It's a demand to deposit additional funds or close positions to bring your account back into compliance.\n\nIn futures, margin calls happen because of the daily mark-to-market process. If your open positions lose enough money during the day to push your equity below maintenance margin, you'll receive a margin call after the session closes. Some brokers also issue intraday margin calls if your equity drops sharply during the trading day."
        },
        {
          "id": "what-happens-next",
          "heading": "What happens when you get a margin call",
          "body": "When you receive a margin call, you typically have until the next business day to deposit enough funds to bring your account back above the initial margin level (not just maintenance). The difference between your current equity and the initial margin requirement is the amount you need to deposit.\n\nIf you don't deposit the funds in time, your broker will liquidate enough of your positions to restore compliance. They choose which positions to close and at what price. This almost always happens at an unfavorable time, because the market moved against you to cause the margin call in the first place.\n\nSome brokers are more aggressive than others. Discount futures brokers may auto-liquidate within minutes of a margin violation rather than waiting until the next day."
        },
        {
          "id": "avoiding-margin-calls",
          "heading": "How to avoid margin calls",
          "body": "Keep your account funded well above the minimum margin requirements. A common guideline is to never use more than 50% of your available margin for open positions. This gives you a substantial buffer to absorb adverse moves.\n\nUse stop losses on every position. Stops close losing trades before they grow large enough to trigger margin calls. Without stops, a single bad trade during an overnight session can eat through your buffer while you're sleeping.\n\nMonitor margin requirements during volatile periods. Exchanges regularly increase margin requirements when volatility spikes. If you're holding positions and margin requirements increase, you can suddenly be under-margined even though the market hasn't moved against you."
        }
      ],
      "keyPoints": [
        "A margin call means your equity has dropped below maintenance margin.",
        "You must deposit funds or close positions, usually by the next business day.",
        "Failing to meet a margin call results in forced liquidation at market prices.",
        "Never use more than 50% of available margin to prevent margin calls.",
        "Exchanges can increase margin requirements during volatile periods."
      ],
      "examples": [
        {
          "label": "Overnight margin call",
          "scenario": "Your account has $15,000. You hold 1 ES contract (initial margin $12,650, maintenance $11,500). ES drops 80 points overnight.",
          "detail": "The 80-point loss is $4,000, bringing your equity to $11,000. This is below the $11,500 maintenance margin. Your broker issues a margin call for $1,650 (the difference between your equity and the initial margin of $12,650). If you don't deposit by the next session, your position is liquidated."
        },
        {
          "label": "Intraday margin call",
          "scenario": "You have $5,000 in your account and open 2 MES contracts on $500 day trade margin each. MES drops 40 points.",
          "detail": "Each MES contract loses $200 (40 points x $5), totaling $400. Your equity drops to $4,600. Some brokers will issue an intraday margin call if the loss approaches their day trade margin threshold, especially if you're holding multiple contracts."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Ignoring a margin call and hoping the market will recover",
          "fix": "Hope is not a strategy. Meet the margin call or close the position. Forced liquidation at the broker's discretion almost always results in worse execution."
        },
        {
          "mistake": "Trading close to the margin minimum without a buffer",
          "fix": "If your account is barely above initial margin, even a small move against you triggers a call. Maintain at least 50% excess margin above requirements."
        },
        {
          "mistake": "Not checking for margin requirement changes before major events",
          "fix": "Exchanges increase margins around elections, FOMC, and high-volatility events. A position that was adequately margined yesterday may be under-margined today."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        },
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Mark to Market",
    "slug": "mark-to-market",
    "category": "basics",
    "tldr": "Daily settlement. Gains credited and losses debited from your account every single day.",
    "page": {
      "tldr": "The process of settling your futures account at the end of every trading day. Gains are credited and losses are debited in real time. You don't wait until you close the trade.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Margin",
          "slug": "margin"
        }
      ],
      "sections": [
        {
          "id": "what-is-mark-to-market",
          "heading": "What is mark to market?",
          "body": "Mark to market is the daily settlement process in futures trading. At the end of each trading day, the exchange calculates the settlement price for every futures contract. Your account is then credited or debited based on the difference between your entry price (or the previous day's settlement) and today's settlement price.\n\nThis happens automatically. You don't need to close your position to realize gains or losses. If you bought ES at 5,200 and today's settlement is 5,215, you have $750 credited to your account tonight (15 points x $50). Tomorrow, the process resets from 5,215."
        },
        {
          "id": "why-it-matters",
          "heading": "Why this matters for your account",
          "body": "Mark to market means your account balance changes every day, even on positions you haven't closed. Gains from open positions are immediately available as real cash in your account. You can use them as margin for new positions tomorrow.\n\nLosses are immediately deducted. If your position lost $1,000 today, your available margin drops by $1,000 tonight. If this pushes you below maintenance margin, you'll get a margin call before trading resumes.\n\nThere's no such thing as an unrealized gain or loss in futures the way there is in stocks. Everything is realized daily."
        },
        {
          "id": "settlement-price",
          "heading": "How the settlement price is determined",
          "body": "The settlement price is calculated by the exchange, usually based on trading activity during the final minutes of the session. The exact methodology varies by product.\n\nFor ES and NQ, the settlement price is typically based on the volume-weighted average price during the closing period. For less liquid contracts, the exchange may use different methods including bid-ask midpoints.\n\nThe settlement price is the reference point for all daily mark-to-market calculations, margin requirements, and the starting point for the next trading day."
        },
        {
          "id": "tax-implications",
          "heading": "Tax implications",
          "body": "In the United States, futures contracts receive favorable tax treatment under Section 1256 of the tax code. Regardless of how long you held the position, 60% of your gains are taxed as long-term capital gains and 40% as short-term.\n\nAt year end, all open positions are marked to market for tax purposes. This means you owe taxes on unrealized gains even if you haven't closed the position. The benefit is the blended 60/40 rate, which is lower than ordinary income tax for most traders."
        }
      ],
      "keyPoints": [
        "Your futures account is settled at the end of every trading day automatically.",
        "Gains are real cash credited to your account. Losses are real cash deducted.",
        "There's no unrealized P&L in futures like there is in stocks.",
        "Losses from mark to market can trigger margin calls on open positions.",
        "US futures get 60/40 tax treatment regardless of holding period."
      ],
      "examples": [
        {
          "label": "Daily P&L flow",
          "scenario": "You buy 1 ES at 5,200 on Monday. Settlement prices: Monday 5,210, Tuesday 5,195, Wednesday 5,225.",
          "detail": "Monday: +10 points = +$500 credited. Tuesday: -15 points from Monday's settlement = -$750 debited. Wednesday: +30 points from Tuesday's settlement = +$1,500 credited. Net P&L: +$1,250. Each day's gain or loss is settled independently against the prior day's close."
        },
        {
          "label": "Margin call from mark to market",
          "scenario": "You have $13,000 in your account and buy 1 ES contract (maintenance margin $11,500). ES drops 40 points overnight.",
          "detail": "The 40-point drop is a $2,000 loss, debited at settlement. Your account drops to $11,000, which is below the $11,500 maintenance margin. You receive a margin call and must deposit funds or your position gets liquidated."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Thinking unrealized profits aren't real until you close the trade",
          "fix": "In futures, daily profits are credited to your account as real cash. Treat every day's P&L as realized, because it is."
        },
        {
          "mistake": "Forgetting that mark to market can trigger margin calls on open positions",
          "fix": "Even if you plan to hold a position long term, you need enough margin to survive daily fluctuations."
        },
        {
          "mistake": "Not accounting for the 60/40 tax rule on year-end open positions",
          "fix": "Open futures positions are marked to market on December 31 for tax purposes. Factor this into your year-end tax planning."
        }
      ],
      "relatedTerms": [
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Daily Settlement",
          "slug": "daily-settlement"
        },
        {
          "term": "Drawdown",
          "slug": "drawdown"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Market Order",
    "slug": "market-order",
    "category": "orders",
    "tldr": "Buy or sell immediately at the best available price. Guaranteed fill, not guaranteed price.",
    "page": {
      "tldr": "An order to buy or sell immediately at the best available price. Market orders guarantee you get in or out of a position. They do not guarantee the price you'll get.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "sections": [
        {
          "id": "what-is-market-order",
          "heading": "What is a market order?",
          "body": "A market order tells your broker: fill me right now at whatever the current price is. There's no price condition. You accept whatever the market is offering at the moment your order reaches the exchange.\n\nWhen you place a buy market order, you're filled at the current ask price (the lowest price someone is willing to sell at). When you place a sell market order, you're filled at the current bid price (the highest price someone is willing to buy at)."
        },
        {
          "id": "when-to-use",
          "heading": "When to use market orders",
          "body": "Market orders are the right choice in two situations. First, when you need to exit a losing position immediately. If the market is moving against you, a market order gets you out. A limit order might not fill if the market is moving fast.\n\nSecond, when entering a breakout where speed matters more than price. If a key level breaks and you expect a fast move, a market order gets you in.\n\nIn liquid markets like ES during regular trading hours, the cost of a market order is typically just the bid-ask spread (one tick, or $12.50 per contract)."
        },
        {
          "id": "slippage",
          "heading": "Slippage and when it happens",
          "body": "Slippage is the difference between the price you expected and the price you actually received. In calm markets with good liquidity, slippage on a market order is usually zero or one tick.\n\nSlippage increases during major news events (NFP, FOMC, CPI), during low-liquidity sessions (overnight Globex, pre-market), and when placing large orders relative to the available liquidity.\n\nIn extreme cases, like a flash crash or a gap on a limit-down opening, slippage can be many points."
        },
        {
          "id": "market-vs-limit-vs-stop",
          "heading": "Market, limit, and stop compared",
          "body": "Market orders fill immediately at the current price. You always get filled but you don't control the price.\n\nLimit orders fill at your specified price or better. You control the price but you might not get filled.\n\nStop orders become market orders when a trigger price is reached. They guarantee execution after the trigger but not the fill price.\n\nMost traders use a combination: limit orders for entries and profit targets, stop orders for stop losses, and market orders for urgent exits."
        }
      ],
      "keyPoints": [
        "Market orders guarantee a fill. They do not guarantee a price.",
        "You buy at the ask and sell at the bid. The spread is the minimum cost.",
        "In liquid markets, slippage is usually minimal (zero to one tick on ES).",
        "Use market orders for urgent exits and fast-moving breakout entries.",
        "Slippage increases around news events, overnight sessions, and large order sizes."
      ],
      "examples": [
        {
          "label": "Clean fill in liquid market",
          "scenario": "ES is trading at 5,200.00 bid / 5,200.25 ask during regular trading hours. You place a buy market order for 1 contract.",
          "detail": "You're filled at 5,200.25 (the ask). The cost of using a market order instead of a limit order is one tick ($12.50). In most cases, this is an acceptable cost for immediate execution."
        },
        {
          "label": "Slippage during news",
          "scenario": "CPI data comes out hotter than expected. NQ drops 40 points in 3 seconds. You have a sell stop at 18,500 that triggers.",
          "detail": "Your stop triggers at 18,500 and becomes a market order. But by the time it executes, the best bid is 18,492. You're filled 8 points ($160) worse than expected. This is slippage, and it's a normal risk of stop orders in fast markets."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using market orders during overnight or pre-market sessions",
          "fix": "Liquidity is thin outside regular trading hours. The bid-ask spread can be 2-5 ticks or more. Use limit orders during these sessions."
        },
        {
          "mistake": "Placing large market orders in less liquid products",
          "fix": "A 10-lot market order in ES during RTH is fine. A 10-lot in a thinly traded agricultural contract could move the price against you."
        },
        {
          "mistake": "Assuming your stop loss will fill at exactly the stop price",
          "fix": "Stop orders become market orders when triggered. In fast markets, the fill price can be several ticks beyond your stop."
        }
      ],
      "relatedTerms": [
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Market Profile",
    "slug": "market-profile",
    "category": "data",
    "tldr": "A framework that organizes price activity by time, revealing value areas and balance zones.",
    "page": {
      "tldr": "A framework that organizes price data by time, showing where price spent the most time at each level. Developed by J. Peter Steidlmayer, it reveals value areas, balance/imbalance, and the type of day unfolding.",
      "prerequisites": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-market-profile",
          "heading": "What is Market Profile?",
          "body": "Market Profile is a way of visualizing price activity that prioritizes time at price over price movement. Instead of showing a candlestick chart where each bar represents a time period, Market Profile shows how long price traded at each level during the session.\n\nThe result looks like a bell curve rotated on its side. Levels where price spent the most time bulge outward, forming a wide profile. Levels where price moved through quickly appear thin. This shape reveals where the market found value (the fat part) and where it was rejected (the thin parts)."
        },
        {
          "id": "key-concepts",
          "heading": "Key Market Profile concepts",
          "body": "The Value Area is the price range containing approximately 70% of the session's trading activity. It represents the range of prices the market accepted as fair.\n\nThe Point of Control (POC) is the single price level with the most trading time or volume. It's the center of the bell curve and acts as a magnet for price.\n\nThe Initial Balance (IB) is the first hour's range and sets the tone for the day. A break beyond the IB suggests directional conviction.\n\nTPO (Time Price Opportunity) letters or blocks mark each 30-minute period's price range. Counting TPOs at each level is how the profile is built."
        },
        {
          "id": "day-types",
          "heading": "Market Profile day types",
          "body": "Normal days have a balanced profile with a wide value area. Price stays within or near the initial balance. These are range-bound, mean-reverting sessions.\n\nTrend days show a profile that's elongated in one direction with a narrow value area. Price moves steadily away from the open and never looks back. These are the biggest opportunity days.\n\nNeutral days have two-sided activity with roughly equal extensions above and below the initial balance. The market is undecided.\n\nRecognizing the day type early helps you choose the right strategy: fade the range on normal days, ride the trend on trend days, and stay selective on neutral days."
        }
      ],
      "keyPoints": [
        "Market Profile shows time spent at each price level, not just price movement.",
        "The Value Area (70% of activity) defines the market's accepted price range.",
        "The Point of Control is the most-traded level and acts as a magnet.",
        "Day types (normal, trend, neutral) inform strategy selection.",
        "Developed by J. Peter Steidlmayer and widely used by institutional traders."
      ],
      "examples": [
        {
          "label": "Reading the value area",
          "scenario": "Yesterday's ES value area was 5,190-5,210 with a POC at 5,202. Today opens at 5,185, below yesterday's value area.",
          "detail": "Opening below value suggests sellers are in control. If price can't re-enter the value area (trade above 5,190), it may continue lower. If price quickly re-enters the value area, the move below was a false breakout and price may migrate back toward the 5,202 POC."
        },
        {
          "label": "Identifying a trend day early",
          "scenario": "The initial balance is narrow (8 points). At 10:35 AM, ES breaks below the IB low with strong volume and does not look back.",
          "detail": "This has the characteristics of a trend day: narrow IB followed by a strong directional break. Market Profile traders position with the trend and avoid counter-trend trades until the profile shows price accepting a new level."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using Market Profile without understanding the underlying concepts",
          "fix": "Market Profile is a framework, not a signal generator. Learn the theory (Steidlmayer's work, Jim Dalton's books) before trying to trade with it."
        },
        {
          "mistake": "Only looking at today's profile without considering prior days",
          "fix": "Yesterday's value area, POC, and profile shape provide critical context for today. Where today opens relative to yesterday's value area is one of the most important daily signals."
        },
        {
          "mistake": "Treating Market Profile as a standalone system",
          "fix": "Market Profile works best combined with volume profile, order flow, and traditional price action. It tells you where value is. Other tools tell you who is driving the move."
        }
      ],
      "relatedTerms": [
        {
          "term": "Value Area",
          "slug": "value-area"
        },
        {
          "term": "Point of Control (POC)",
          "slug": "point-of-control"
        },
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Initial Balance (IB)",
          "slug": "initial-balance"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Micro Contracts",
    "slug": "micro-contracts",
    "category": "instruments",
    "tldr": "1/10th-size futures (MES, MNQ, MGC). Ideal for learning and small accounts.",
    "page": {
      "tldr": "Futures contracts that are 1/10th the size of their standard counterparts. Micro E-mini S&P 500 (MES) is $5 per point instead of $50. Ideal for learning, testing strategies, and proper position sizing on smaller accounts.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "E-mini",
          "slug": "e-mini"
        }
      ],
      "sections": [
        {
          "id": "what-are-micros",
          "heading": "What are micro contracts?",
          "body": "Micro futures are smaller versions of popular contracts, typically 1/10th the size of the standard E-mini. The CME launched micro E-mini index futures in 2019, and they quickly became some of the most actively traded contracts in the world.\n\nMES (Micro E-mini S&P 500) is $5 per point instead of $50 on ES. MNQ (Micro E-mini Nasdaq) is $2 per point instead of $20 on NQ. MGC (Micro Gold) is $10 per point instead of $100 on GC. MCL (Micro Crude) represents 100 barrels instead of 1,000 on CL."
        },
        {
          "id": "who-should-trade-micros",
          "heading": "Who should trade micro contracts",
          "body": "Micros are ideal for three groups. First, new traders learning the mechanics of futures. You can practice live execution, manage real positions, and experience real P&L without risking $50 per point. The learning is the same, but the cost of mistakes is 1/10th.\n\nSecond, smaller accounts that need precise position sizing. If your risk calculator says you should trade 0.3 ES contracts, you can trade 3 MES contracts instead. This lets accounts under $25,000 trade futures with proper risk management.\n\nThird, experienced traders who want to test new strategies with real money before scaling up. Paper trading doesn't replicate the psychology of real money. Micros let you test with skin in the game while keeping the stakes manageable."
        },
        {
          "id": "micros-vs-full-size",
          "heading": "Micro vs. full-size: what's different",
          "body": "Micro contracts trade on the same exchange (CME Globex) during the same hours as their full-size counterparts. The price movements are identical because they track the same underlying market.\n\nThe differences are in tick value, margin requirements, and liquidity. MES requires roughly $1,265 in initial margin compared to $12,650 for ES. The tick value is $1.25 vs $12.50.\n\nLiquidity on micros is excellent for retail-sized orders (1-20 contracts) but thinner than ES for larger sizes. The spread is usually one tick during RTH, same as ES. For most retail traders, the liquidity difference is negligible."
        },
        {
          "id": "scaling-with-micros",
          "heading": "Scaling from micros to minis",
          "body": "A common progression: start with 1-2 MES contracts while learning. As your account grows and your strategy proves consistent, increase to 5-10 MES. When you're consistently trading 10 MES, consider switching to 1 ES (identical exposure, better fills on large orders, lower commission per unit of exposure).\n\nThe transition from micro to mini is a psychological milestone. Suddenly every tick is worth 10x more. Many traders who were calm on micros start making emotional decisions on minis. If this happens, go back to micros until the emotional response fades."
        }
      ],
      "keyPoints": [
        "Micro contracts are 1/10th the size of standard E-mini contracts.",
        "MES is $5/point, MNQ is $2/point, MGC is $10/point.",
        "Ideal for learning, small accounts, and strategy testing.",
        "Same exchange, same hours, same price action as full-size contracts.",
        "10 micro contracts = 1 standard contract in total exposure."
      ],
      "examples": [
        {
          "label": "Position sizing with micros",
          "scenario": "Your account is $10,000. You want to risk 1% ($100) per trade with a 10-point stop on the S&P.",
          "detail": "ES: 10 points x $50 = $500 risk per contract. Too large. MES: 10 points x $5 = $50 risk per contract. You can trade 2 MES contracts for exactly $100 risk (1% of your account). Micros make proper position sizing possible on a $10,000 account."
        },
        {
          "label": "Strategy testing on micros",
          "scenario": "You developed a new scalping strategy in backtesting. Before risking full-size contracts, you want to validate it live.",
          "detail": "Trade 1-2 MES contracts for 2-4 weeks. Track fills, slippage, and actual P&L vs. backtest expectations. If the strategy holds up, scale to 5-10 MES. If it fails, you lost 1/10th of what you would have lost on ES."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Thinking micros are risk-free because they're small",
          "fix": "The leverage ratios are identical to full-size contracts. Trading 10 MES is the same risk as 1 ES. A $10,000 account trading 10 MES with no stop can still lose thousands."
        },
        {
          "mistake": "Over-trading micros because the per-contract risk feels small",
          "fix": "$5 per point feels manageable, so some traders open 20-30 contracts without realizing they now have 2-3 ES equivalents of exposure. Always calculate total exposure in dollar terms."
        },
        {
          "mistake": "Staying on micros too long when your account size justifies minis",
          "fix": "If you're consistently trading 10+ MES, you're paying 10x the commissions for the same exposure as 1 ES. Transition to minis when your account and risk management support it."
        }
      ],
      "relatedTerms": [
        {
          "term": "E-mini",
          "slug": "e-mini"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Contract Specifications",
          "slug": "contract-specifications"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Notional Value",
    "slug": "notional-value",
    "category": "basics",
    "tldr": "The total dollar value a futures contract controls. Usually many multiples of your margin.",
    "page": {
      "tldr": "The total dollar value a single futures contract controls, calculated by multiplying the current price by the contract multiplier. Notional value tells you your real exposure, which is always much larger than your margin deposit.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        }
      ],
      "sections": [
        {
          "id": "what-is-notional-value",
          "heading": "What is notional value?",
          "body": "Notional value is the total market value of a futures position. For ES, it's the S&P 500 index level multiplied by $50. At 5,200, one ES contract has a notional value of $260,000. This is the actual amount of market exposure you're controlling.\n\nNotional value is important because it reveals the true size of your position. Your margin deposit of $12,000 might make the trade feel small, but you're actually controlling a quarter of a million dollars in exposure."
        },
        {
          "id": "calculating-notional",
          "heading": "How to calculate notional value",
          "body": "The formula is: notional value = current price x contract multiplier.\n\nES at 5,200 x $50 = $260,000. NQ at 18,400 x $20 = $368,000. CL at $72 x 1,000 = $72,000. GC at $2,400 x 100 = $240,000. MES at 5,200 x $5 = $26,000.\n\nNotional value changes with the market price. If ES moves from 5,200 to 5,300, the notional value increases from $260,000 to $265,000. This is why leverage ratios are approximate. They shift as the market moves."
        },
        {
          "id": "why-it-matters",
          "heading": "Why notional value matters",
          "body": "Notional value tells you three things. First, your actual market exposure. A $25,000 account trading 1 ES contract is exposed to 10x its account value. Two contracts is 20x. This context is essential for understanding your real risk.\n\nSecond, the leverage ratio. Divide notional value by your account size to get your leverage. $260,000 / $25,000 = 10.4:1 leverage. Professional traders typically keep this below 5:1.\n\nThird, how to compare positions across different products. If you're long 1 ES ($260,000 notional) and short 1 CL ($72,000 notional), your long exposure is 3.6x larger than your short exposure. The number of contracts alone doesn't tell you this."
        }
      ],
      "keyPoints": [
        "Notional value = current price x contract multiplier.",
        "It reveals your true market exposure, which is always larger than your margin.",
        "Use notional value to calculate your real leverage ratio.",
        "Notional value lets you compare exposure across different products.",
        "Professional traders monitor total notional value relative to account size."
      ],
      "examples": [
        {
          "label": "Leverage from notional value",
          "scenario": "Your account is $50,000. You're long 2 ES contracts.",
          "detail": "Notional: 2 x (5,200 x $50) = $520,000. Leverage: $520,000 / $50,000 = 10.4:1. A 1% move in the S&P creates a 10.4% change in your account. This is aggressive by professional standards."
        },
        {
          "label": "Cross-product notional comparison",
          "scenario": "You hold 1 NQ, 2 CL, and 5 MES. How much total exposure do you have?",
          "detail": "1 NQ: 18,400 x $20 = $368,000. 2 CL: 2 x ($72 x 1,000) = $144,000. 5 MES: 5 x (5,200 x $5) = $130,000. Total notional: $642,000. If your account is $80,000, your aggregate leverage is 8:1."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Thinking margin deposit equals your position size",
          "fix": "Margin is 3-12% of notional value. Your actual exposure is 8-30x larger than the money you deposited. Calculate notional value to understand your real risk."
        },
        {
          "mistake": "Comparing positions by contract count instead of notional value",
          "fix": "1 NQ contract ($368,000) has more exposure than 1 ES contract ($260,000). 1 CL ($72,000) has far less than either. Compare in dollar terms."
        },
        {
          "mistake": "Not recalculating notional value as the market moves",
          "fix": "As price rises or falls, your notional exposure changes. A trade that started at $260,000 notional could be $280,000 after a rally. Your effective leverage increases on gains and decreases on losses."
        }
      ],
      "relatedTerms": [
        {
          "term": "Leverage",
          "slug": "leverage"
        },
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Lot / Contract Size",
          "slug": "lot-contract-size"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "OCO Order",
    "slug": "oco-order",
    "category": "orders",
    "tldr": "One-Cancels-Other. Two orders linked so when one fills, the other auto-cancels.",
    "page": {
      "tldr": "One-Cancels-Other. Two linked orders where filling one automatically cancels the other. The mechanism behind bracket order exits and any situation where you have two mutually exclusive outcomes.",
      "prerequisites": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-oco",
          "heading": "What is an OCO order?",
          "body": "An OCO (One-Cancels-Other) order links two separate orders together. When either order fills, the other is automatically canceled. This prevents you from accidentally doubling your position or having a stale order sitting in the market.\n\nThe most common use is pairing a profit target (sell limit) with a stop loss (sell stop) on a long position. Whichever gets hit first cancels the other. You can't accidentally have both fill."
        },
        {
          "id": "how-oco-works",
          "heading": "How OCO orders work in practice",
          "body": "When you submit an OCO pair, both orders go to the exchange simultaneously. They sit in the market independently, each waiting for its trigger condition. The link between them is maintained by your broker's order management system.\n\nIf the profit target fills, the broker immediately sends a cancel request for the stop loss. If the stop fills, the broker cancels the target. In practice, the cancellation happens in milliseconds, but there is a theoretical risk that both orders could fill in an extremely fast market (called a double fill). This is rare but not impossible.\n\nMost platforms display OCO pairs as a single unit in your order panel, making them easy to manage and modify together."
        },
        {
          "id": "oco-beyond-brackets",
          "heading": "OCO orders beyond brackets",
          "body": "While brackets are the most common use of OCO, the concept applies anywhere you have two mutually exclusive trade ideas.\n\nFor example, you might want to buy ES if it breaks above 5,220 OR if it pulls back to 5,190 support. You could place a buy stop at 5,220 and a buy limit at 5,190 as an OCO pair. Whichever fills first cancels the other, so you only enter once.\n\nSome traders also use OCO orders to manage exits across correlated markets. If you're long both ES and NQ, you might OCO-link your stops so that if one triggers, the other is also canceled (though this requires more advanced order management)."
        }
      ],
      "keyPoints": [
        "OCO links two orders so that filling one automatically cancels the other.",
        "Most commonly used to pair a profit target with a stop loss.",
        "Prevents accidental double fills or stale orders sitting in the market.",
        "Can also be used for mutually exclusive entry scenarios.",
        "The cancellation happens in milliseconds but double fills are theoretically possible."
      ],
      "examples": [
        {
          "label": "Standard OCO exit",
          "scenario": "You're long 1 ES from 5,200. You place an OCO: sell limit at 5,215 (target) and sell stop at 5,190 (stop loss).",
          "detail": "If ES reaches 5,215, your profit target fills for +$750 and the stop at 5,190 is automatically canceled. If ES drops to 5,190 first, your stop fills for -$500 and the target at 5,215 is canceled. You can only exit once."
        },
        {
          "label": "OCO for entry selection",
          "scenario": "You're watching ES range between 5,190 and 5,210. You want to trade a breakout in either direction.",
          "detail": "Place an OCO: buy stop at 5,211 (upside breakout) and sell stop at 5,189 (downside breakout). Whichever direction breaks first, you enter that trade. The other order cancels so you don't end up with conflicting positions."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Placing separate stop and target orders without linking them as OCO",
          "fix": "Unlinked orders won't cancel each other. If your target fills but your stop is still active, you could accidentally re-enter the market and end up with an unintended position."
        },
        {
          "mistake": "Not checking that your OCO is properly linked after modification",
          "fix": "If you modify one leg of an OCO pair, some platforms may unlink it. Always verify both legs show as a linked pair after making changes."
        },
        {
          "mistake": "Assuming OCO prevents all double fills",
          "fix": "In extremely fast markets, both legs can theoretically fill before the cancel propagates. This is very rare in liquid products like ES, but be aware it's possible."
        }
      ],
      "relatedTerms": [
        {
          "term": "Bracket Order",
          "slug": "bracket-order"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Open Interest",
    "slug": "open-interest",
    "category": "data",
    "tldr": "Total outstanding contracts. Rising OI with rising price means new money entering the trend.",
    "page": {
      "tldr": "The total number of outstanding (open) futures contracts at any given time. Rising open interest means new money is entering the market. Falling open interest means positions are being closed.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-oi",
          "heading": "What is open interest?",
          "body": "Open interest counts the total number of futures contracts that are currently open (held by traders). Every futures trade has a buyer and a seller, so one contract of open interest represents one long position and one short position.\n\nOpen interest increases when a new buyer and a new seller both open positions (creating a new contract). It decreases when an existing buyer and an existing seller both close their positions (extinguishing a contract). It stays the same when one side is opening and the other is closing."
        },
        {
          "id": "oi-and-price",
          "heading": "Open interest and price direction",
          "body": "The relationship between open interest changes and price movement reveals who is driving the market.\n\nRising price with rising OI: new longs are entering. This is the most bullish combination because new money is backing the uptrend.\n\nRising price with falling OI: shorts are covering (closing). The rally is driven by short-covering, not new buying. This often produces less sustainable moves.\n\nFalling price with rising OI: new shorts are entering. Bearish conviction is increasing.\n\nFalling price with falling OI: longs are exiting. The decline is driven by liquidation, not new selling."
        },
        {
          "id": "using-oi",
          "heading": "How to use open interest in practice",
          "body": "Open interest is most useful as a confirmation tool, not a primary signal. If you see a breakout above resistance and open interest is increasing, the breakout has more credibility because new participants are committing capital.\n\nWatch OI during the approach to expiration. Falling OI near expiration is normal (traders rolling to the next month). But if OI drops sharply outside of the roll period, it suggests traders are exiting, which can reduce liquidity.\n\nExtreme open interest readings (historically high or low) can signal inflection points. When everyone who wants to be positioned already is (high OI), there's less fuel for continued moves. When OI is very low, a catalyst can cause a sharp move as new participants rush in."
        }
      ],
      "keyPoints": [
        "Open interest is the total number of outstanding futures contracts.",
        "Rising OI means new money entering. Falling OI means positions closing.",
        "Price up + OI up = bullish (new longs). Price up + OI down = short covering.",
        "Use OI as confirmation, not as a primary signal.",
        "Extreme OI levels can signal potential inflection points."
      ],
      "examples": [
        {
          "label": "New longs entering a trend",
          "scenario": "ES breaks above a multi-week resistance level at 5,250. Open interest increases by 50,000 contracts over the next three days.",
          "detail": "Rising price with rising OI confirms that new buyers are entering. This is stronger than a breakout on declining OI (which would suggest the move is driven by short-covering). The uptrend has new money behind it."
        },
        {
          "label": "Short covering rally",
          "scenario": "ES drops from 5,200 to 5,100 over two weeks. Open interest rose during the decline (shorts entering). Now ES bounces to 5,140 and OI drops by 30,000.",
          "detail": "The bounce is short-covering (shorts closing profitable positions), not new buying. This rally may be temporary. Once the short-covering is done, selling could resume if no new buyers step in."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Confusing open interest with volume",
          "fix": "Volume counts the number of contracts traded during a period. OI counts contracts still open. High volume can occur with no change in OI (if the same number of contracts are being opened and closed)."
        },
        {
          "mistake": "Ignoring open interest during rollover periods",
          "fix": "OI drops in the expiring contract and rises in the next month during rollover. This is mechanical, not directional. Adjust your analysis during roll weeks."
        },
        {
          "mistake": "Using daily OI changes as a trading signal without price context",
          "fix": "OI change alone doesn't tell you direction. You need to combine it with price action to understand whether new longs, new shorts, or position closures are driving the change."
        }
      ],
      "relatedTerms": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Delta",
          "slug": "delta"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Front Month",
          "slug": "front-month"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Opening Range",
    "slug": "opening-range",
    "category": "structure",
    "tldr": "The high-low range of the first 5, 15, or 30 minutes. A key reference for breakout traders.",
    "page": {
      "tldr": "The high and low established in the first 5, 15, or 30 minutes of RTH. Used as a reference framework for breakout and fade setups throughout the day.",
      "prerequisites": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        }
      ],
      "sections": [
        {
          "id": "what-is-opening-range",
          "heading": "What is the opening range?",
          "body": "The opening range (OR) is the price high and low established during a defined period after the RTH open. The most common timeframes are 5 minutes, 15 minutes, and 30 minutes. Some traders also use a 60-minute opening range, which overlaps with the initial balance concept.\n\nThe opening range captures the first burst of institutional activity when the cash market opens. It establishes reference points that many traders watch for the rest of the session."
        },
        {
          "id": "opening-range-breakout",
          "heading": "Opening range breakout strategies",
          "body": "The basic opening range breakout (ORB) strategy is straightforward: buy when price breaks above the OR high, sell when it breaks below the OR low. The idea is that the first significant move out of the opening range often continues.\n\nFilters improve the strategy. Check whether the break has volume behind it. Check the direction of the overnight session and the gap. A breakout that aligns with the prevailing trend and gap direction has a higher probability of following through.\n\nThe narrower the opening range relative to recent averages, the more likely a breakout will have momentum. A wide opening range may have already captured the day's move."
        },
        {
          "id": "opening-range-as-reference",
          "heading": "Using the opening range as a reference level",
          "body": "Even if you don't trade ORB strategies specifically, the opening range levels serve as important reference points. The OR high and low act as intraday support and resistance. Price returning to the OR after a breakout is a common retest entry.\n\nThe OR midpoint is a valuable reference for mean reversion. If the OR is 5,195 to 5,210, the midpoint at 5,202.50 acts as a magnet when price is inside the range.\n\nCombining the opening range with other tools like VWAP, prior day's high/low, and volume profile nodes creates a more complete picture of the day's key levels."
        }
      ],
      "keyPoints": [
        "The opening range is the high-low of the first 5, 15, or 30 minutes of RTH.",
        "Breakout above OR high signals long. Breakdown below OR low signals short.",
        "Narrow opening ranges suggest higher-probability breakouts.",
        "OR levels act as intraday support and resistance throughout the session.",
        "Combine OR with volume, gap direction, and other levels for best results."
      ],
      "examples": [
        {
          "label": "15-minute opening range breakout",
          "scenario": "ES opens at 9:30 and trades between 5,198 and 5,207 in the first 15 minutes. At 9:47, ES breaks above 5,207 with strong volume.",
          "detail": "You buy at 5,208 with a stop at 5,197 (below the OR low, 11 points risk). Target: 5,225 (twice the OR range projected from the breakout point). If ES trends, this can capture a multi-hour move."
        },
        {
          "label": "Opening range fade",
          "scenario": "ES has a wide 20-point opening range from 5,190 to 5,210. At 10:15, price pushes to 5,213 (barely above OR high) on declining volume.",
          "detail": "The wide range and weak breakout attempt suggest a fade. You short at 5,212 with a stop at 5,216 and target the OR midpoint at 5,200."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Trading every opening range breakout without filters",
          "fix": "Not all OR breakouts work. Filter by volume, gap direction, and OR width relative to recent averages. The best breakouts align multiple factors."
        },
        {
          "mistake": "Using a fixed timeframe for the opening range on all products",
          "fix": "A 5-minute OR works differently on ES than on CL. Test which timeframe produces the best signals for the product you trade."
        },
        {
          "mistake": "Placing stops exactly at the opposite end of the opening range",
          "fix": "Stop runs through the OR high/low are common. Place stops a few ticks beyond the range to avoid getting shaken out by a wick."
        }
      ],
      "relatedTerms": [
        {
          "term": "Initial Balance (IB)",
          "slug": "initial-balance"
        },
        {
          "term": "Gap",
          "slug": "gap"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        },
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Order Book / DOM",
    "slug": "order-book-dom",
    "category": "data",
    "tldr": "The depth of market. Shows resting buy and sell orders at each price level in real time.",
    "page": {
      "tldr": "The Depth of Market display showing resting limit orders at every price level. It reveals where buyers and sellers are waiting, how much size is stacked at key levels, and how liquidity is distributed around the current price.",
      "prerequisites": [
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "sections": [
        {
          "id": "what-is-dom",
          "heading": "What is the DOM?",
          "body": "The DOM (Depth of Market), also called the order book or ladder, is a real-time display of all resting limit orders at each price level near the current market price. It shows how many contracts are available to buy (bids) and sell (offers/asks) at each price.\n\nThe DOM is the market's supply and demand in raw form. If there are 500 contracts on the bid at 5,200 and only 50 on the offer at 5,200.25, you can see the imbalance directly. This information is invisible on a standard price chart."
        },
        {
          "id": "reading-the-dom",
          "heading": "How to read the DOM",
          "body": "The center of the DOM shows the current bid and ask prices. Above the current price, you see resting sell limit orders (offers). Below, you see resting buy limit orders (bids).\n\nLarge orders at a specific level can act as support or resistance. If 2,000 contracts are sitting on the bid at 5,195, many traders expect that level to hold because it would take significant selling to work through that size.\n\nThe rate at which contracts are being added or pulled at each level tells you about participant intent. Size that keeps refreshing (gets hit and immediately replenishes) suggests a genuine institutional level. Size that gets pulled as price approaches is likely a bluff (spoofing, which is illegal but still occurs)."
        },
        {
          "id": "dom-trading",
          "heading": "Trading with the DOM",
          "body": "DOM-based trading (also called tape reading or order flow trading) involves watching the real-time interaction between aggressive market orders and passive limit orders to gauge short-term direction.\n\nWhen aggressive buyers consistently lift offers (buy at the ask) and the ask-side depth is thinning, price is likely to move up. When aggressive sellers consistently hit bids and bid-side depth is thinning, price is likely to move down.\n\nThis is the most granular form of analysis and is primarily used by scalpers trading on very short timeframes (seconds to minutes). It requires significant screen time and practice to develop proficiency."
        }
      ],
      "keyPoints": [
        "The DOM shows resting limit orders at every price level near the market.",
        "Large resting orders can act as intraday support or resistance.",
        "Watch whether large orders hold, get refreshed, or get pulled as price approaches.",
        "DOM trading reads the interaction between aggressive and passive orders.",
        "Primarily used by scalpers and short-term order flow traders."
      ],
      "examples": [
        {
          "label": "Reading large resting orders",
          "scenario": "The DOM shows 1,500 contracts on the bid at 5,200 on ES, compared to 200-300 at surrounding levels.",
          "detail": "This size at 5,200 suggests an institutional buyer or algo defending that level. Price may bounce off 5,200 multiple times. If the 1,500 contracts finally get absorbed (filled through), the level breaks and price may accelerate lower as protective orders behind it get triggered."
        },
        {
          "label": "Absorption on the DOM",
          "scenario": "ES is sitting at 5,205 offer. 800 contracts are on the offer. Aggressive buyers keep hitting the offer, volume goes through, but the 800 keeps refreshing.",
          "detail": "This is absorption. A large seller is feeding contracts at 5,205, absorbing all buying pressure. This often means price will not break above 5,205 until the seller is finished. Scalpers may look to short near this level."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Thinking large resting orders always hold",
          "fix": "Large orders can be pulled (canceled) in milliseconds. Treat DOM size as probabilistic, not definitive. Size that holds under pressure is real. Size that disappears as price approaches is not."
        },
        {
          "mistake": "Trading DOM in isolation without price context",
          "fix": "The DOM shows what's happening right now, but without knowledge of where you are in the day's range, value area, and trend, DOM signals are easily misinterpreted."
        },
        {
          "mistake": "Trying to learn DOM trading before mastering basic order types and market structure",
          "fix": "DOM reading is an advanced skill. Learn how orders work, understand market structure (support/resistance, value areas), and then layer DOM reading on top."
        }
      ],
      "relatedTerms": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Delta",
          "slug": "delta"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        },
        {
          "term": "Scalping",
          "slug": "scalping"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Point of Control (POC)",
    "slug": "point-of-control",
    "category": "data",
    "tldr": "The price level with the most trading volume. Acts as a magnet for price.",
    "page": {
      "tldr": "The single price level where the most volume traded during a given period. The POC acts as a magnet, drawing price back toward it. It represents the price that the largest number of participants agreed was fair.",
      "prerequisites": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        }
      ],
      "sections": [
        {
          "id": "what-is-poc",
          "heading": "What is the Point of Control?",
          "body": "The Point of Control (POC) is the price level with the highest traded volume during a defined period, usually one session. On a Volume Profile histogram, it's the longest bar, the level where the most transactions occurred.\n\nThe POC represents the price where the most agreement between buyers and sellers took place. It's the market's best estimate of fair value for that session."
        },
        {
          "id": "poc-as-magnet",
          "heading": "The POC as a price magnet",
          "body": "Price is drawn toward the POC like a magnet. When price moves away from the POC during the session, it often returns to it before making another move. This mean-reverting behavior makes the POC one of the most reliable intraday reference levels.\n\nThe prior session's POC is watched by many institutional traders. If today's price action stays near yesterday's POC, it suggests the market hasn't changed its view of value. If price moves significantly away from the prior POC, a new value area is being established.\n\nMultiple sessions' POCs at similar levels create a strong multi-day reference point. When three or four days' POCs cluster around the same price, that level becomes significant structural support or resistance."
        },
        {
          "id": "naked-poc",
          "heading": "Naked POCs and unfinished business",
          "body": "A naked POC is a prior session's Point of Control that price has not revisited since it was established. Naked POCs represent unfinished business, levels where significant trading occurred but that the market left behind.\n\nMany traders track naked POCs from recent sessions and use them as targets or reference levels. The idea is that price often returns to these levels eventually to retest the area where participants last agreed on value.\n\nNot all naked POCs get revisited, but they're worth tracking, especially when price approaches them from above or below after a multi-day move."
        }
      ],
      "keyPoints": [
        "The POC is the price level with the most trading volume in a session.",
        "It represents the market's best estimate of fair value.",
        "Price tends to gravitate back toward the POC (mean-reversion).",
        "Prior session POCs act as reference levels for the next day.",
        "Naked POCs (unvisited) represent unfinished business the market may return to."
      ],
      "examples": [
        {
          "label": "POC as intraday magnet",
          "scenario": "Today's developing POC on ES is at 5,202. Price rallied to 5,218 in the morning and is now pulling back.",
          "detail": "As price retreats from 5,218, the POC at 5,202 acts as a magnet. A mean-reversion trader might target 5,202 as a pullback destination. If 5,202 holds as support, it confirms the level's significance."
        },
        {
          "label": "Naked POC as a target",
          "scenario": "Three days ago, ES had a POC at 5,175 and then rallied without revisiting that level. Today, ES is pulling back from 5,210.",
          "detail": "5,175 is a naked POC. If the selloff continues, 5,175 is a potential target and support level. Traders may look to buy near 5,175, expecting the unfinished business to draw price and attract buyers."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Blindly fading every move away from the POC",
          "fix": "On trend days, price moves away from the POC and doesn't return. The POC magnet works best on balanced, range-bound days. Identify the day type before using the POC for mean-reversion."
        },
        {
          "mistake": "Only watching today's developing POC",
          "fix": "The prior session's POC is equally important. Where today opens relative to yesterday's POC sets the tone for the session."
        },
        {
          "mistake": "Treating the POC as an exact price",
          "fix": "Like all volume-based levels, the POC is part of a zone. Expect activity around the POC, not precise bounces at the exact tick."
        }
      ],
      "relatedTerms": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Value Area",
          "slug": "value-area"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Position Sizing",
    "slug": "position-sizing",
    "category": "risk",
    "tldr": "How many contracts to trade based on account size, risk tolerance, and stop distance.",
    "page": {
      "tldr": "Determining how many contracts to trade on each setup based on your account size, risk tolerance, and the distance to your stop loss. This is the skill that prevents a single bad trade from doing catastrophic damage.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Tick",
          "slug": "tick"
        }
      ],
      "sections": [
        {
          "id": "what-is-position-sizing",
          "heading": "What is position sizing?",
          "body": "Position sizing is the process of deciding how many contracts to trade. It's the bridge between having a trade idea and executing it with the right amount of risk.\n\nA good trade setup with the wrong position size becomes a bad trade. If you risk too much, one loss can set you back weeks. If you risk too little, your winners don't make a meaningful difference."
        },
        {
          "id": "the-formula",
          "heading": "The basic formula",
          "body": "The core position sizing calculation is: Number of contracts = (Account risk in dollars) / (Stop distance in dollars per contract).\n\nAccount risk is the maximum dollar amount you're willing to lose on a single trade. Most traders set this at 1-2% of their account. On a $25,000 account, 1% risk means you're willing to lose $250 per trade.\n\nStop distance is how far your stop loss is from your entry, converted to dollars. If you're trading ES with a 10-point stop, that's $500 per contract (10 points x $50). With $250 of risk and a $500-per-contract stop, you'd trade 0.5 contracts. Since you can't trade half a contract on ES, you'd either skip the trade or use micro contracts."
        },
        {
          "id": "why-percentage-risk",
          "heading": "Why percentage-based risk works",
          "body": "Risking a fixed percentage of your account on every trade creates a natural scaling mechanism. When you're winning, your account grows and your position sizes grow with it. When you're losing, your account shrinks and your position sizes shrink automatically, slowing the bleeding.\n\nThis is the opposite of what most losing traders do. Losing traders tend to increase size after losses (trying to make it back) and decrease size after wins (becoming cautious). Percentage-based sizing does the reverse, which is mathematically correct.\n\nThe standard recommendation is 1% risk per trade for new traders and up to 2% for experienced traders with proven track records."
        },
        {
          "id": "position-sizing-for-prop-firms",
          "heading": "Position sizing for prop firm evaluations",
          "body": "Prop firms add an extra constraint: your total drawdown is limited. This means your position sizing needs to account for not just individual trade risk but cumulative risk across a series of trades.\n\nIf your prop firm allows a $2,500 maximum drawdown, risking $250 per trade gives you room for 10 consecutive losers before you're out. Risking $500 per trade gives you only 5.\n\nMany traders who pass prop firm evaluations use even smaller risk per trade during the early phase, increasing size only after building a profit cushion."
        }
      ],
      "keyPoints": [
        "Position size = (account risk in dollars) / (stop distance in dollars per contract).",
        "Risk 1-2% of your account per trade. Never more unless you have a proven track record.",
        "Percentage-based sizing automatically scales up in winning streaks and down in losing streaks.",
        "Micro contracts let you fine-tune position size for smaller accounts.",
        "In prop firm evaluations, conservative sizing dramatically improves your odds of passing."
      ],
      "examples": [
        {
          "label": "Basic position sizing on ES",
          "scenario": "Account: $50,000. Risk per trade: 1% ($500). You see an ES setup with a 10-point stop loss.",
          "detail": "10 points on ES = $500 per contract. $500 risk / $500 per contract = 1 contract. If your stop were 5 points ($250 per contract), you could trade 2 contracts. If your stop were 20 points ($1,000 per contract), the math says 0.5, so you'd use 5 MES contracts instead."
        },
        {
          "label": "Prop firm sizing",
          "scenario": "You're in a $50,000 prop firm evaluation with a $2,500 trailing drawdown.",
          "detail": "$2,500 / 10 trades = $250 max risk per trade. On ES with a 5-point stop ($250/contract), that's 1 contract. Start conservative, increase size only after building a profit buffer."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Sizing based on how much margin you have instead of how much you can afford to lose",
          "fix": "Margin availability and risk tolerance are different things. Trade the calculated size, not the maximum allowed."
        },
        {
          "mistake": "Using the same number of contracts on every trade regardless of stop distance",
          "fix": "A 5-point stop and a 20-point stop have very different risk profiles. Always adjust contract count based on stop distance."
        },
        {
          "mistake": "Increasing size after a losing streak to recover faster",
          "fix": "This is the fastest path to blowing up. Percentage-based sizing naturally reduces your size during drawdowns, which is the correct behavior."
        }
      ],
      "relatedTerms": [
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        },
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Micro Contracts",
          "slug": "micro-contracts"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Prop Firm / Funded Account",
    "slug": "prop-firm",
    "category": "industry",
    "tldr": "A firm that funds traders with its capital after passing an evaluation. You keep most of the profits.",
    "page": {
      "tldr": "A company that provides trading capital to traders who pass a simulated evaluation. You trade the firm's money, keep 70-90% of the profits, and the firm keeps the rest. The catch: strict drawdown rules that will shut you down if violated.",
      "prerequisites": [
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        }
      ],
      "sections": [
        {
          "id": "what-is-prop-firm",
          "heading": "What is a prop firm?",
          "body": "A prop firm (proprietary trading firm) provides capital to traders who demonstrate skill through an evaluation process. You pay a monthly fee ($50-$300+ depending on account size), trade a simulated account, and if you hit the profit target without violating drawdown rules, you receive a funded account.\n\nWith a funded account, you trade the firm's capital (typically $25,000 to $300,000+) and keep 70-90% of the profits. The firm takes the remaining percentage as their share.\n\nThis model lets skilled traders access significant capital without risking their own money. The firm's risk is limited to their technology and payout costs because the evaluation process filters out unprofitable traders."
        },
        {
          "id": "how-evaluations-work",
          "heading": "How evaluations work",
          "body": "Most prop firm evaluations have three components: a profit target, a maximum drawdown, and trading rules.\n\nThe profit target is usually 6-10% of the account size. On a $50,000 evaluation, you might need to make $3,000-$5,000 in profits. There's often no time limit, though some firms set a maximum number of trading days.\n\nThe maximum drawdown is the hard constraint. This can be static (fixed from your starting balance) or trailing (follows your account's high-water mark upward). Trailing drawdown is more restrictive because profitable days raise the floor.\n\nTrading rules vary by firm: minimum trading days, no holding over weekends, no trading during major news events, daily loss limits, and maximum position sizes. Read every rule before starting."
        },
        {
          "id": "choosing-a-firm",
          "heading": "What to look for in a prop firm",
          "body": "The prop firm industry has grown rapidly and quality varies significantly. Key factors to evaluate: payout speed (how long between requesting a withdrawal and receiving funds), payout reliability (check online reviews for consistent payouts), drawdown type (trailing vs. static), profit split percentage, and the evaluation rules.\n\nRed flags include firms that make most of their money from evaluation fees rather than trader profit-sharing, extremely tight drawdown rules designed to fail most traders, and firms with many complaints about delayed or denied payouts.\n\nReputable firms in the futures space include well-known names with years of payout history. Research thoroughly, check trader reviews on independent forums, and start with a smaller account size to test the process."
        },
        {
          "id": "passing-evaluations",
          "heading": "Strategies for passing evaluations",
          "body": "The most important factor is conservative position sizing. Risk 0.5-1% of the account per trade. This gives you enough room to survive a losing streak without hitting the drawdown limit.\n\nTrade only your best setups. Evaluations don't reward trading frequency. They reward consistent, controlled profitability. Three solid trades per week is better than 15 mediocre trades.\n\nUnderstand your drawdown math. If the trailing drawdown is $2,500 on a $50,000 account and you risk $250 per trade, you can survive 10 losers in a row. If you risk $500, you can only survive 5. Most traders fail evaluations not because their strategy is bad, but because their position sizing is too aggressive for the drawdown constraints."
        }
      ],
      "keyPoints": [
        "Prop firms fund traders who pass a simulated evaluation.",
        "You typically keep 70-90% of profits on the funded account.",
        "Drawdown rules (trailing or static) are the primary reason traders fail.",
        "Conservative position sizing is the key to passing evaluations.",
        "Research payout history and reviews before committing to a firm."
      ],
      "examples": [
        {
          "label": "Evaluation math",
          "scenario": "$50,000 evaluation account. Profit target: $3,000. Max trailing drawdown: $2,500. You risk $250 per trade with a 1:2 risk-reward ratio.",
          "detail": "At 40% win rate: average profit per trade = (0.40 x $500) - (0.60 x $250) = $50. You need 60 trades to hit $3,000. With $250 risk and $2,500 drawdown, you can take 10 consecutive losses. Statistically survivable."
        },
        {
          "label": "Trailing drawdown failure",
          "scenario": "$50,000 account. Trailing drawdown: $2,500. You profit $2,000 in the first week, bringing your account to $52,000.",
          "detail": "Your drawdown floor is now $49,500. You need to maintain equity above $49,500 at all times. A bad day that drops you from $52,000 to $49,400 closes your account, even though you were profitable overall. The trailing drawdown followed your equity up and trapped you."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Treating the evaluation like a race to hit the profit target",
          "fix": "There's usually no time limit. Slow, consistent profitability with small risk per trade is the winning approach. Rushing leads to oversized positions and blown drawdowns."
        },
        {
          "mistake": "Not understanding the difference between trailing and static drawdown",
          "fix": "Trailing drawdown follows your equity upward but never moves down. Static drawdown is measured from your starting balance. Trailing is harder to manage. Know which type your firm uses before trading."
        },
        {
          "mistake": "Choosing a firm based solely on the lowest evaluation fee",
          "fix": "Cheap evaluations often have the tightest rules, worst payout terms, or worst payout reliability. Evaluate the total package: rules, profit split, payout speed, and reputation."
        }
      ],
      "relatedTerms": [
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        },
        {
          "term": "Day Trade Margin",
          "slug": "day-trade-margin"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Regular Trading Hours (RTH)",
    "slug": "rth",
    "category": "sessions",
    "tldr": "The main session. 9:30 AM to 4:00 PM ET for equity index futures.",
    "page": {
      "tldr": "The primary trading session when volume, liquidity, and institutional participation are highest. For equity index futures, RTH runs 9:30 AM to 4:00 PM Eastern Time.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Globex / Electronic Session",
          "slug": "globex"
        }
      ],
      "sections": [
        {
          "id": "what-is-rth",
          "heading": "What are regular trading hours?",
          "body": "Regular Trading Hours (RTH) is the primary daily session when the corresponding cash market is open. For equity index futures (ES, NQ, RTY, YM), RTH is 9:30 AM to 4:00 PM ET, matching the New York Stock Exchange hours.\n\nFor crude oil (CL), the primary session runs 9:00 AM to 2:30 PM ET. Gold (GC) has primary hours from 8:20 AM to 1:30 PM ET. Agricultural futures have their own schedules. Each product's RTH aligns with when institutional participants are most active."
        },
        {
          "id": "why-rth-matters",
          "heading": "Why RTH matters for trading",
          "body": "The vast majority of volume occurs during RTH. For ES, over 70% of daily volume trades between 9:30 AM and 4:00 PM ET. This concentration of volume means tighter spreads, deeper order books, and better execution.\n\nInstitutional traders (hedge funds, banks, pension funds, prop desks) primarily execute during RTH. Their activity creates the largest and most meaningful price moves. Overnight moves in the Globex session are often retested or reversed during RTH.\n\nMany technical analysis concepts, including opening range, initial balance, value area, and VWAP, are calculated using RTH data only. If you're using these tools, you need to know which hours they reference."
        },
        {
          "id": "rth-vs-overnight",
          "heading": "RTH vs. overnight: when to trade",
          "body": "Most retail futures traders focus on RTH for good reason. Better liquidity means less slippage. More participants create clearer price signals. Technical levels are more reliable because more eyes are watching them.\n\nThe first and last hours of RTH are typically the most volatile and offer the most opportunities. The midday session (12-2 PM ET) is often choppy and low-volume, which some traders avoid.\n\nOvernight sessions have their own dynamics and can be profitable, but they require different strategies. Wider stops, smaller positions, and awareness of global news events are essential for overnight trading."
        }
      ],
      "keyPoints": [
        "RTH for equity index futures is 9:30 AM to 4:00 PM ET.",
        "Over 70% of daily volume trades during RTH.",
        "Best liquidity, tightest spreads, and most institutional activity occur during RTH.",
        "The first and last hours of RTH are typically the most active.",
        "Many technical tools (VWAP, value area, initial balance) use RTH data only."
      ],
      "examples": [
        {
          "label": "RTH vs. Globex volume",
          "scenario": "ES trades 1.2 million contracts in a 24-hour period. Approximately 900,000 trade during RTH and 300,000 during the overnight Globex session.",
          "detail": "75% of volume is during RTH. The RTH session has 3-4x the depth on the order book, one-tick spreads consistently, and faster fills. This is why most retail traders focus on RTH."
        },
        {
          "label": "Opening range during RTH",
          "scenario": "ES opens at 9:30 AM at 5,200. In the first 30 minutes, it trades between 5,195 and 5,212. This 17-point opening range becomes a key reference for the rest of the day.",
          "detail": "Many day traders use the opening range as a framework: break above 5,212 signals long, break below 5,195 signals short. This concept only works with RTH data because the overnight range is a different context."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using RTH strategies during overnight sessions",
          "fix": "Overnight sessions have different liquidity, different participants, and different price behavior. Strategies optimized for RTH often fail during Globex."
        },
        {
          "mistake": "Not knowing the RTH hours for the product you're trading",
          "fix": "ES RTH is 9:30-4:00 ET, but CL is 9:00-2:30 ET and GC is 8:20-1:30 ET. Using the wrong hours means your VWAP, value area, and opening range calculations are wrong."
        },
        {
          "mistake": "Trading the midday lull expecting RTH-quality setups",
          "fix": "The 12-2 PM ET window for equity futures often has the lowest volume and choppiest price action. Many experienced traders take a break during this period."
        }
      ],
      "relatedTerms": [
        {
          "term": "Globex / Electronic Session",
          "slug": "globex"
        },
        {
          "term": "Opening Range",
          "slug": "opening-range"
        },
        {
          "term": "Initial Balance (IB)",
          "slug": "initial-balance"
        },
        {
          "term": "VWAP",
          "slug": "vwap"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Risk-Reward Ratio",
    "slug": "risk-reward-ratio",
    "category": "risk",
    "tldr": "Potential loss vs. potential gain. Determines how often you need to win to be profitable.",
    "page": {
      "tldr": "The relationship between how much you stand to lose and how much you stand to gain on a trade. This ratio, combined with your win rate, determines whether your trading is profitable over time.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-risk-reward",
          "heading": "What is risk-reward ratio?",
          "body": "Risk-reward ratio compares the distance to your stop loss (risk) with the distance to your profit target (reward). If you're risking 10 points to make 20 points, your risk-reward ratio is 1:2.\n\nThe ratio is always expressed as risk first, then reward. A 1:3 ratio means you're risking 1 unit to make 3 units. A 1:1 ratio means your risk and reward are equal."
        },
        {
          "id": "relationship-to-win-rate",
          "heading": "The relationship to win rate",
          "body": "Risk-reward ratio only tells half the story. The other half is your win rate.\n\nWith a 1:2 risk-reward ratio, you only need to win 34% of the time to break even (before commissions). With a 1:1 ratio, you need to win more than 50%. With a 1:3 ratio, you only need to win 26%.\n\nThe formula is: breakeven win rate = 1 / (1 + reward/risk). For 1:2, that's 1 / (1 + 2) = 33.3%."
        },
        {
          "id": "expectancy",
          "heading": "Expectancy: the real measure",
          "body": "Expectancy combines risk-reward and win rate into a single number that tells you how much you'll make per dollar risked over many trades.\n\nExpectancy = (win rate x average win) - (loss rate x average loss). If your average winner is $600, your average loser is $300, and your win rate is 45%: expectancy = (0.45 x $600) - (0.55 x $300) = $270 - $165 = $105 per trade.\n\nPositive expectancy means you'll make money over time. Negative expectancy means you'll lose money. No amount of risk management can fix a negative expectancy strategy."
        },
        {
          "id": "choosing-ratios",
          "heading": "How to choose your risk-reward ratio",
          "body": "There's no universally correct ratio. It depends on your strategy and market conditions.\n\nScalping strategies often use 1:1 or even 1:0.75 ratios but compensate with high win rates (60-70%). Swing trading and breakout strategies often use 1:2 or 1:3 ratios with lower win rates (35-50%).\n\nThe key is to know your strategy's expected win rate and make sure the math works. A 1:1 ratio with a 45% win rate is a losing strategy. A 1:2 ratio with a 40% win rate is a winning strategy."
        }
      ],
      "keyPoints": [
        "Risk-reward ratio compares your stop loss distance to your profit target distance.",
        "You need both the ratio and your win rate to know if a strategy is profitable.",
        "Higher reward-to-risk ratios require lower win rates to break even.",
        "Expectancy = (win rate x avg win) - (loss rate x avg loss). It must be positive.",
        "There's no correct ratio. The math just needs to work with your actual win rate."
      ],
      "examples": [
        {
          "label": "1:2 ratio on ES",
          "scenario": "You buy ES at 5,200 with a stop at 5,190 (10-point risk, $500) and a target at 5,220 (20-point reward, $1,000).",
          "detail": "Your risk-reward ratio is 1:2. If this setup wins 40% of the time: (0.40 x $1,000) - (0.60 x $500) = $400 - $300 = $100 expected profit per trade. Over 100 trades, that's $10,000 in expected profits."
        },
        {
          "label": "Why 1:1 with low win rate fails",
          "scenario": "You trade a 1:1 setup risking $500 to make $500. Your backtest shows a 45% win rate.",
          "detail": "Expectancy: (0.45 x $500) - (0.55 x $500) = $225 - $275 = -$50 per trade. This strategy loses $50 on average per trade. Over 100 trades, you'd lose $5,000. Either improve the win rate above 50% or increase the reward relative to the risk."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Fixating on risk-reward ratio while ignoring win rate",
          "fix": "A 1:5 ratio sounds great, but if the target only gets hit 10% of the time, the strategy loses money. Always evaluate both together."
        },
        {
          "mistake": "Moving your stop loss to create a better ratio on paper",
          "fix": "Widening your stop to reduce the risk number doesn't reduce actual risk. It increases your dollar exposure. Set stops based on market structure, not to hit a target ratio."
        },
        {
          "mistake": "Moving your profit target closer because you're afraid of giving back gains",
          "fix": "Cutting winners short destroys your actual risk-reward ratio. If your backtest says 1:2 works, trust the data and let winners run to the target."
        }
      ],
      "relatedTerms": [
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Scalping",
          "slug": "scalping"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Rollover",
    "slug": "rollover",
    "category": "pricing",
    "tldr": "Closing an expiring contract and opening the same position in the next contract month.",
    "page": {
      "tldr": "The process of closing your position in an expiring contract and simultaneously opening the same position in the next contract month. Rollover lets you maintain continuous market exposure without holding through settlement.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Front Month",
          "slug": "front-month"
        }
      ],
      "sections": [
        {
          "id": "what-is-rollover",
          "heading": "What is rollover?",
          "body": "Rollover is the process of moving your position from an expiring futures contract to the next available contract month. If you're long the June ES contract and June is about to expire, you sell the June contract and simultaneously buy the September contract.\n\nThe goal is to maintain continuous market exposure without interruption. Without rollover, your position would expire and you'd need to re-enter the market in the new contract, potentially at a different price."
        },
        {
          "id": "when-to-roll",
          "heading": "When to roll",
          "body": "For equity index futures (ES, NQ), rollover typically happens on the second Thursday of the expiration month, eight days before the quarterly expiration. This is called roll day. On this date, volume in the new front month exceeds the expiring contract, and most traders and data providers switch over.\n\nFor crude oil (CL), rollover happens monthly, usually a few days before the last trading day. For other products, the timing varies. Your data provider and broker will usually indicate when volume shifts to the new contract.\n\nThe key signal is volume. When the next contract's daily volume exceeds the current contract, it's time to roll. Trading the expiring contract after this point means you're in a less liquid market with wider spreads."
        },
        {
          "id": "the-roll-spread",
          "heading": "The roll spread and its cost",
          "body": "When you roll, the expiring contract and the new contract will be at different prices. This difference is the roll spread. For ES, the new contract is typically a few points higher than the expiring one (due to interest rate carry and dividends).\n\nIf you're long June ES at 5,200 and September ES is trading at 5,215, the roll costs you 15 points on paper. But this isn't a real cost because the September contract is fairly priced based on carry. Your actual P&L isn't affected by the roll spread if you're rolling at fair value.\n\nSome brokers offer a roll or spread order that simultaneously closes the old contract and opens the new one. This is cleaner than legging into each side separately because it executes as a single transaction."
        }
      ],
      "keyPoints": [
        "Rollover moves your position from an expiring contract to the next one.",
        "Roll when volume in the new contract exceeds the expiring contract.",
        "For ES and NQ, this typically happens the second Thursday of the expiration month.",
        "Use spread orders to roll both legs simultaneously for cleaner execution.",
        "The price difference between contracts is normal and not a real trading cost."
      ],
      "examples": [
        {
          "label": "Quarterly ES rollover",
          "scenario": "It's the second Thursday of June. You're long 2 ESM (June ES) at 5,200. ESU (September ES) is trading at 5,212.",
          "detail": "You sell 2 ESM and buy 2 ESU as a spread order. Your position is now long 2 ESU at 5,212. The 12-point difference is the carry, not a loss. Your account P&L from the original 5,200 entry carries forward."
        },
        {
          "label": "CL monthly rollover",
          "scenario": "You're long CLN (July CL) at $72.50. CLQ (August CL) is trading at $72.80. The last trading day for July is approaching.",
          "detail": "You sell CLN and buy CLQ. The 30-cent difference ($300 per contract) reflects the cost of carry (storage, insurance, interest). If you don't roll, your contract goes to physical delivery."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Forgetting to roll and holding an expiring contract",
          "fix": "Set calendar alerts for roll dates. Most brokers and data providers publish roll schedules. Missing the roll means trading in a dying contract with bad liquidity."
        },
        {
          "mistake": "Rolling each leg separately instead of using a spread order",
          "fix": "Legging in separately exposes you to execution risk. If one side fills and the other doesn't, you have an unintended position. Spread orders execute both legs as one transaction."
        },
        {
          "mistake": "Thinking the roll spread is a trading loss",
          "fix": "The price difference between contract months reflects carry, not market movement. Your actual P&L is continuous through the roll. Most charting platforms adjust for this automatically."
        }
      ],
      "relatedTerms": [
        {
          "term": "Front Month",
          "slug": "front-month"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Settlement",
          "slug": "settlement"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Scalping",
    "slug": "scalping",
    "category": "strategy",
    "tldr": "Trading for small, fast gains with high frequency. Seconds to minutes per trade.",
    "page": {
      "tldr": "A trading style focused on capturing small, fast profits with high frequency. Scalpers hold positions for seconds to minutes, targeting 2-8 ticks per trade. Requires fast execution, low commissions, and exceptional discipline.",
      "prerequisites": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Order Book / DOM",
          "slug": "order-book-dom"
        }
      ],
      "sections": [
        {
          "id": "what-is-scalping",
          "heading": "What is scalping?",
          "body": "Scalping is the fastest active trading style. Scalpers enter and exit positions within seconds to minutes, targeting small per-trade gains (typically 2-8 ticks on ES, or $25-$100 per contract) with high frequency.\n\nThe premise is simple: take many small profits throughout the day. A scalper might execute 20-50 trades per session, each capturing a few ticks. The edge comes from reading short-term order flow, reacting to micro-level supply and demand, and maintaining an extremely high win rate."
        },
        {
          "id": "what-scalping-requires",
          "heading": "What scalping requires",
          "body": "Execution speed matters in scalping more than any other style. You need a fast platform with one-click order entry, low-latency data feeds, and a broker with competitive commissions. Even one extra tick of slippage per trade compounds into hundreds of dollars over a full session.\n\nCommissions must be low. If you're paying $4 round-trip per ES contract and making $25 per trade, commissions eat 16% of your profits. Negotiate with your broker if you're doing high volume.\n\nScreentime is intensive. Scalpers watch the DOM, time and sales, and tick charts continuously. This is not a part-time activity. Most successful scalpers trade the first 2-3 hours of RTH and then stop."
        },
        {
          "id": "scalping-risk-reward",
          "heading": "Risk-reward in scalping",
          "body": "Scalping typically uses 1:1 or even 1:0.75 risk-reward ratios. This means the strategy depends entirely on a high win rate, usually 55-70%. If your win rate drops below 50% on a 1:1 ratio, you lose money.\n\nThis is the opposite of swing trading, where you might have a 35% win rate with 1:3 risk-reward. Scalping is about accuracy and consistency, not big individual winners.\n\nBecause of the tight risk-reward, every cost matters: commissions, slippage, and the bid-ask spread all take a larger percentage bite out of a 4-tick winner than out of a 40-tick winner."
        },
        {
          "id": "is-scalping-right-for-you",
          "heading": "Is scalping right for you?",
          "body": "Scalping suits traders who can make fast decisions under pressure, have excellent focus for 2-4 hours straight, and don't get emotionally attached to individual trades.\n\nIt does not suit traders who want flexible schedules, struggle with rapid decision-making, or have difficulty taking small losses quickly. The emotional cost of 20-50 decisions per day is significant.\n\nMost trading educators recommend starting with swing trading or day trading on higher timeframes before attempting scalping. The skills required for scalping build on foundational trading competencies."
        }
      ],
      "keyPoints": [
        "Scalping targets 2-8 ticks per trade with holding times of seconds to minutes.",
        "Win rate must be high (55-70%) because risk-reward ratios are tight.",
        "Requires fast execution, low commissions, and intense focus.",
        "Commissions and slippage eat a larger percentage of profits than other styles.",
        "Not recommended as a first trading style. Build fundamentals first."
      ],
      "examples": [
        {
          "label": "Typical scalping session",
          "scenario": "You scalp ES during the first 90 minutes of RTH. You take 15 trades targeting 4 ticks ($50) with a 4-tick stop.",
          "detail": "Win rate: 60% (9 winners, 6 losers). Winners: 9 x $50 = $450. Losers: 6 x $50 = $300. Gross P&L: $150. Commissions: 15 trades x $4.50 round-trip = $67.50. Net P&L: $82.50. Margins are thin, and a few extra losses flip the day negative."
        },
        {
          "label": "Commission impact on scalping",
          "scenario": "Two scalpers both make $300 gross in a session of 25 trades. Trader A pays $4 round-trip, Trader B pays $2.",
          "detail": "Trader A's commissions: 25 x $4 = $100. Net: $200. Trader B's commissions: 25 x $2 = $50. Net: $250. Trader B keeps 25% more profit on the same gross P&L. At this frequency, commission rate is a competitive advantage."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Scalping without considering commission costs",
          "fix": "Calculate your breakeven before starting. If commissions are $4 round-trip and your average winner is $50, you need a 52%+ win rate just to break even. Lower commissions improve your edge significantly."
        },
        {
          "mistake": "Trying to scalp during low-volatility periods",
          "fix": "Scalping requires price movement. If ES is grinding sideways in a 5-point range, there aren't enough ticks to capture. Scalp only when the market is moving."
        },
        {
          "mistake": "Not having a hard daily loss limit",
          "fix": "Scalping can spiral. One bad trade leads to revenge trading, which leads to overtrading. Set a daily loss limit (e.g., -$200) and stop trading when you hit it."
        }
      ],
      "relatedTerms": [
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        },
        {
          "term": "Tick",
          "slug": "tick"
        },
        {
          "term": "Order Book / DOM",
          "slug": "order-book-dom"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Settlement",
    "slug": "settlement",
    "category": "basics",
    "tldr": "How a contract resolves at expiration. Cash payment or physical delivery of the asset.",
    "page": {
      "tldr": "How a futures contract resolves when it expires. Cash-settled contracts pay the difference in cash. Physically-settled contracts require actual delivery of the underlying commodity.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        }
      ],
      "sections": [
        {
          "id": "what-is-settlement",
          "heading": "What is settlement?",
          "body": "Settlement is the process by which a futures contract is resolved at expiration. Every futures contract must settle. There are two methods: cash settlement and physical delivery.\n\nCash settlement means no goods change hands. The contract is simply marked to the final settlement price and the difference is credited or debited to your account. Most index futures (ES, NQ, RTY) and some others settle this way.\n\nPhysical delivery means the actual underlying commodity is delivered. If you hold a crude oil (CL) contract through settlement, you're technically obligated to take delivery of 1,000 barrels of oil at Cushing, Oklahoma. In practice, almost no retail trader lets this happen."
        },
        {
          "id": "cash-vs-physical",
          "heading": "Cash settlement vs. physical delivery",
          "body": "Cash-settled contracts are simpler for retail traders. You never need to worry about delivery logistics. When ES expires, the exchange calculates the Special Opening Quotation (SOQ) of the S&P 500 index and settles all positions against that price.\n\nPhysically-settled contracts like CL, GC, ZC (corn), and ZW (wheat) have specific delivery procedures involving warehouse receipts, delivery points, and quality standards. The exchange manages the process, but the costs and logistics are real.\n\nThe critical thing to know: if you're trading a physically-settled contract, you must close or roll your position before the delivery notice period begins. Your broker will usually send warnings and may auto-liquidate your position if you don't act."
        },
        {
          "id": "retail-trader-implications",
          "heading": "What settlement means for retail traders",
          "body": "Most retail traders never deal with settlement directly because they close or roll positions well before expiration. But understanding settlement matters for two reasons.\n\nFirst, the type of settlement affects trading behavior near expiration. Cash-settled contracts can have unusual price action on settlement day as large institutional positions are resolved. Physically-settled contracts see volume drop off as the delivery period approaches because speculators have already exited.\n\nSecond, knowing your contract's settlement type prevents accidental delivery situations. Getting a delivery notice on crude oil or corn is an expensive mistake that involves storage, transport, and logistics costs."
        }
      ],
      "keyPoints": [
        "Settlement resolves a futures contract at expiration, either through cash or physical delivery.",
        "Cash-settled contracts (ES, NQ) pay the price difference in cash. No goods change hands.",
        "Physically-settled contracts (CL, GC, ZC) require actual delivery of the commodity.",
        "Retail traders should always close or roll positions before the delivery period.",
        "Your broker will typically warn you and may auto-liquidate before delivery."
      ],
      "examples": [
        {
          "label": "Cash settlement on ES",
          "scenario": "You're long 1 ES contract at 5,200 going into the quarterly expiration. The Special Opening Quotation (SOQ) is calculated at 5,235.",
          "detail": "Your contract cash-settles at 5,235. You receive 35 points x $50 = $1,750 in your account. The contract ceases to exist. No stocks or index shares change hands."
        },
        {
          "label": "Avoiding physical delivery on CL",
          "scenario": "You're long 1 CL contract. The last trading day before first notice day is approaching.",
          "detail": "Your broker sends a warning 5-7 days before: close your position or fund it for delivery. You sell to close the position and buy the next month's contract if you want to maintain exposure. This is a standard rollover."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Holding a physically-settled contract through the delivery period",
          "fix": "Know the last trading day and first notice day for every contract you trade. Set calendar reminders. Roll at least a week before expiration."
        },
        {
          "mistake": "Assuming all futures are cash-settled because ES and NQ are",
          "fix": "Many popular products (CL, GC, agricultural futures) are physically delivered. Check the contract specifications before trading."
        },
        {
          "mistake": "Not understanding how settlement day affects price action",
          "fix": "ES quarterly expiration (triple witching) can produce unusual volume and price patterns. Be aware of settlement dates even if you don't hold to expiration."
        }
      ],
      "relatedTerms": [
        {
          "term": "Delivery",
          "slug": "delivery"
        },
        {
          "term": "Expiration / Rollover",
          "slug": "expiration-rollover"
        },
        {
          "term": "Mark to Market",
          "slug": "mark-to-market"
        },
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Slippage",
    "slug": "slippage",
    "category": "orders",
    "tldr": "The difference between your expected price and your actual fill. Worse in thin markets.",
    "page": {
      "tldr": "The difference between the price you expected to get filled at and the price you actually received. Slippage is a hidden cost of trading that increases in thin markets, fast markets, and around news events.",
      "prerequisites": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "sections": [
        {
          "id": "what-is-slippage",
          "heading": "What is slippage?",
          "body": "Slippage is the difference between your expected fill price and your actual fill price. If you place a buy market order expecting to get filled at 5,200.25 and your fill comes back at 5,200.75, you experienced 2 ticks (0.50 points) of slippage on ES, which is $25 per contract.\n\nSlippage can be positive or negative. Negative slippage means you got a worse price than expected. Positive slippage means you got a better price, which does happen occasionally when the market moves in your favor between order submission and execution."
        },
        {
          "id": "what-causes-slippage",
          "heading": "What causes slippage",
          "body": "Three factors drive slippage. First, speed of price movement. In a fast-moving market, the price can change between when you click the button and when your order reaches the exchange. This is measured in milliseconds, but volatile markets can move several ticks in that time.\n\nSecond, available liquidity. If there are only 50 contracts offered at the best ask and you're buying 100, the first 50 fill at the ask and the remaining 50 fill at the next available price. The average fill is worse than the displayed price.\n\nThird, order type. Market orders are most susceptible to slippage. Limit orders eliminate slippage by design (you specify the worst acceptable price). Stop orders are vulnerable because they convert to market orders when triggered."
        },
        {
          "id": "when-slippage-is-worst",
          "heading": "When slippage is worst",
          "body": "Slippage peaks around major economic releases: Non-Farm Payrolls, CPI, FOMC decisions, and GDP reports. ES can move 20-40 points in seconds after these releases, and stop orders triggered during this window can fill many ticks away from the trigger price.\n\nOvernight and pre-market sessions carry higher slippage risk because fewer participants mean wider spreads and less depth at each price level. A market order that gets 1 tick of slippage during RTH might get 3-5 ticks during Globex.\n\nLimit-up/limit-down events and trading halts create extreme slippage when markets reopen, because the equilibrium price has shifted significantly while no trading occurred."
        },
        {
          "id": "managing-slippage",
          "heading": "How to minimize slippage",
          "body": "Trade during high-liquidity periods. For equity index futures, this means regular trading hours (9:30 AM to 4:00 PM ET), especially the first and last hour of the session.\n\nUse limit orders for entries and profit targets. This eliminates slippage entirely on those orders, at the cost of potentially missing fills.\n\nAccount for slippage in your risk calculations. If your stop is 10 points away, assume the actual fill might be 10.5 or 11 points away. This small buffer prevents your actual losses from exceeding your planned risk.\n\nAvoid placing stops right at major news events. Either flatten before the release or widen your stops to account for the volatility."
        }
      ],
      "keyPoints": [
        "Slippage is the gap between your expected fill price and your actual fill price.",
        "Market orders and triggered stop orders are most susceptible to slippage.",
        "Slippage increases around news events, in thin markets, and with large order sizes.",
        "Limit orders eliminate slippage but sacrifice fill guarantee.",
        "Always account for 1-2 ticks of slippage in your risk calculations."
      ],
      "examples": [
        {
          "label": "Normal slippage on a stop",
          "scenario": "You're long ES with a sell stop at 5,190. The market trades down through your stop level.",
          "detail": "Your stop triggers at 5,190 and becomes a market order. The best bid at that instant is 5,189.75. You're filled at 5,189.75, which is one tick of slippage ($12.50). This is normal and expected in liquid markets."
        },
        {
          "label": "News event slippage",
          "scenario": "You're short NQ with a buy stop at 18,500. FOMC announces an unexpected rate cut. NQ spikes from 18,480 to 18,540 in 2 seconds.",
          "detail": "Your stop triggers at 18,500 but the best offer is 18,528 by the time your order executes. You're filled 28 points ($560) above your stop. Your planned $500 loss becomes a $1,060 loss. This is why traders flatten or widen stops before major news."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Assuming your stop will fill at exactly the stop price",
          "fix": "Stops become market orders when triggered. Build 1-3 ticks of slippage into every risk calculation. On news events, assume more."
        },
        {
          "mistake": "Trading large position sizes in thin markets",
          "fix": "If you're trading 5+ contracts in a product with 200 contracts on the bid, your order alone can move the price. Trade smaller or scale into positions during low-liquidity periods."
        },
        {
          "mistake": "Backtesting without accounting for slippage",
          "fix": "A strategy that looks profitable with perfect fills may be a loser after slippage. Subtract 1 tick per side ($25 round trip on ES) from every trade in your backtest."
        }
      ],
      "relatedTerms": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Spread Trading",
    "slug": "spread-trading",
    "category": "strategy",
    "tldr": "Trading the price difference between two related contracts instead of outright direction.",
    "page": {
      "tldr": "Trading the price difference between two related futures contracts instead of betting on outright direction. Lower risk than directional trading because both legs partially hedge each other.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Backwardation",
          "slug": "backwardation"
        }
      ],
      "sections": [
        {
          "id": "what-is-spread-trading",
          "heading": "What is spread trading?",
          "body": "Spread trading means simultaneously buying one futures contract and selling a related one, profiting from the change in the price difference between them rather than from the outright direction of either contract.\n\nFor example, instead of betting that crude oil will go up, you might buy July crude oil and sell August crude oil, profiting if the July-August price difference widens or narrows in your favor."
        },
        {
          "id": "types-of-spreads",
          "heading": "Types of futures spreads",
          "body": "Calendar spreads (also called time spreads) trade the same product across different expiration months. Buying September ES and selling December ES is a calendar spread. These profit from changes in the carry (contango or backwardation) between months.\n\nInter-commodity spreads trade related but different products. Buying crude oil and selling gasoline is an inter-commodity spread called a crack spread. Buying ES and selling NQ trades the relative performance of the S&P 500 vs. the Nasdaq 100.\n\nExchange-recognized spreads often receive reduced margin because the two legs partially offset each other's risk. This can significantly reduce capital requirements."
        },
        {
          "id": "why-trade-spreads",
          "heading": "Why trade spreads instead of outright positions",
          "body": "Spreads reduce directional risk. If you're long ES and short NQ, a broad market selloff hurts your ES position but helps your NQ position. Your net P&L depends on which moves more, not on the direction of the overall market.\n\nReduced margin is a practical benefit. Exchanges recognize that spread positions carry less risk and require less margin. A calendar spread in ES might require 20-30% of the margin for an outright position.\n\nSpreads can also express views that outright positions cannot. If you believe the S&P 500 will outperform the Nasdaq but don't know if the overall market will go up or down, a long ES / short NQ spread isolates that relative performance view."
        }
      ],
      "keyPoints": [
        "Spreads trade the price difference between two related contracts.",
        "Calendar spreads trade the same product across different months.",
        "Inter-commodity spreads trade different but related products.",
        "Spreads reduce directional risk and often require less margin.",
        "Profit comes from the change in the spread, not from outright price direction."
      ],
      "examples": [
        {
          "label": "Calendar spread on crude oil",
          "scenario": "July CL is at $72.00 and August CL is at $72.50. You believe the spread will narrow. You buy July (cheaper) and sell August (more expensive).",
          "detail": "If July rises to $72.40 and August stays at $72.50, the spread narrows from $0.50 to $0.10. You profit $0.40 per barrel ($400 on CL). Even if both months fell, you profit as long as July fell less than August."
        },
        {
          "label": "Inter-commodity spread: ES vs NQ",
          "scenario": "You believe large-cap value stocks will outperform tech. You buy 1 ES and sell 1 NQ.",
          "detail": "If the S&P 500 rises 1% and the Nasdaq rises only 0.5%, your ES gains ($2,600) exceed your NQ loss ($1,840). Net profit: $760. You profited from relative performance without needing the market to move in a specific direction."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Treating spread legs independently instead of as a unit",
          "fix": "Never close one leg without closing the other (unless intentionally converting to an outright). An orphaned leg turns a spread into a directional bet with full risk."
        },
        {
          "mistake": "Assuming spreads are low-risk",
          "fix": "Spreads are lower risk than outrights, but they're not risk-free. If the correlation between the legs breaks down during a crisis, both can move against you simultaneously."
        },
        {
          "mistake": "Not using exchange-recognized spread orders",
          "fix": "Enter spreads as a single spread order, not as two separate market orders. Spread orders execute both legs at the specified price difference, eliminating leg risk."
        }
      ],
      "relatedTerms": [
        {
          "term": "Contango",
          "slug": "contango"
        },
        {
          "term": "Backwardation",
          "slug": "backwardation"
        },
        {
          "term": "Hedging",
          "slug": "hedging"
        },
        {
          "term": "Rollover",
          "slug": "rollover"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Stop Order",
    "slug": "stop-order",
    "category": "orders",
    "tldr": "Triggers a market order when price reaches a level. Used for breakout entries and stop losses.",
    "page": {
      "tldr": "An order that sits dormant until a specified trigger price is reached, then converts to a market order and fills immediately. Stop orders are the primary tool for both stop losses and breakout entries.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Market Order",
          "slug": "market-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-stop-order",
          "heading": "What is a stop order?",
          "body": "A stop order is an instruction that says: when price reaches this level, execute a market order. The order does nothing until the trigger price is touched. Once triggered, it becomes a market order and fills at the best available price.\n\nBuy stop orders are placed above the current market price. Sell stop orders are placed below. This is the opposite of limit orders, which is a common source of confusion for beginners."
        },
        {
          "id": "stop-losses",
          "heading": "Stop orders as stop losses",
          "body": "The most common use of a stop order is as a stop loss to limit risk on an open position. If you're long ES from 5,200, you might place a sell stop at 5,190 to cap your loss at 10 points ($500).\n\nWhen ES trades down to 5,190, your sell stop triggers and becomes a market order. In normal conditions, you'll be filled at or very near 5,190. In fast-moving markets, slippage can result in a fill below 5,190.\n\nThe key benefit is that stop losses work automatically. You don't need to be watching the screen."
        },
        {
          "id": "breakout-entries",
          "heading": "Stop orders for breakout entries",
          "body": "Stop orders are also used to enter trades on breakouts. If ES is consolidating between 5,190 and 5,210 and you want to buy if it breaks above 5,210, you place a buy stop at 5,210.50 (slightly above the level to confirm the break).\n\nWhen price reaches 5,210.50, your buy stop triggers and you enter the trade. This technique ensures you only enter when the market confirms your thesis."
        },
        {
          "id": "stop-order-risks",
          "heading": "Risks and limitations",
          "body": "The biggest risk with stop orders is slippage. Because a triggered stop becomes a market order, you're at the mercy of whatever price is available when it fires. During news events, flash crashes, or gap openings, the fill can be significantly worse than the stop price.\n\nStop hunting is a real phenomenon where price briefly dips below an obvious stop level, triggers a wave of sell stops, and then reverses higher. This is why placing stops at exact round numbers or obvious chart levels is risky. Experienced traders offset their stops slightly beyond these obvious levels."
        }
      ],
      "keyPoints": [
        "A stop order sits dormant until triggered, then becomes a market order.",
        "Buy stops go above the market. Sell stops go below.",
        "The most common use is as a stop loss to automatically limit risk.",
        "Stop orders can also be used for breakout entries above or below key levels.",
        "Slippage is the main risk. Triggered stops fill at the market, not necessarily at the trigger price."
      ],
      "examples": [
        {
          "label": "Stop loss on a long position",
          "scenario": "You buy 1 ES at 5,200 and place a sell stop at 5,190 to limit your loss to 10 points ($500).",
          "detail": "If ES drops to 5,190, your stop triggers and becomes a sell market order. In normal market conditions, you'll be filled at 5,190 or 5,189.75 (one tick of slippage). Your loss is capped at roughly $500-$512.50."
        },
        {
          "label": "Breakout entry with a buy stop",
          "scenario": "NQ is consolidating below resistance at 18,400. You place a buy stop at 18,405 with a sell stop (stop loss) at 18,380.",
          "detail": "If NQ breaks above 18,400, your buy stop triggers at 18,405 and you enter long. Your risk is 25 points ($500 on NQ). If the breakout fails and NQ falls back to 18,380, your stop loss exits the position automatically."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Placing stop losses at exact round numbers or obvious chart levels",
          "fix": "Everyone sees the same levels. Place your stop a few ticks beyond the obvious level to avoid getting stopped out by a brief wick before the real move."
        },
        {
          "mistake": "Not having a stop loss because you're watching the screen",
          "fix": "Manual exits are slower than you think, especially under stress. Always have a hard stop in the market."
        },
        {
          "mistake": "Using a stop order when a stop-limit would be better (or vice versa)",
          "fix": "Use stop (market) orders for stop losses where getting out matters most. Use stop-limit orders for entries where you want price control and missing the trade is acceptable."
        }
      ],
      "relatedTerms": [
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Stop-Limit Order",
          "slug": "stop-limit-order"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Stop-Limit Order",
    "slug": "stop-limit-order",
    "category": "orders",
    "tldr": "A stop that triggers a limit order instead of a market order. Price control but fill risk.",
    "page": {
      "tldr": "A stop that triggers a limit order instead of a market order. You get price control after the trigger, but you risk not getting filled if the market moves through your limit price too fast.",
      "prerequisites": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-stop-limit",
          "heading": "What is a stop-limit order?",
          "body": "A stop-limit order has two prices: a stop (trigger) price and a limit price. When the market reaches the stop price, the order activates. But instead of becoming a market order (like a regular stop), it becomes a limit order at your specified limit price.\n\nThis gives you price control that a regular stop order does not. You will never be filled worse than your limit price. The tradeoff is that if the market blows through your limit price, your order may not fill at all."
        },
        {
          "id": "when-to-use",
          "heading": "When to use stop-limit orders",
          "body": "Stop-limit orders work best for breakout entries where you want to buy above a key level but don't want to chase price if it gaps or spikes well beyond that level.\n\nFor example, if ES resistance is at 5,210, you might place a buy stop-limit with a stop at 5,211 and a limit at 5,213. If price breaks out smoothly, you get filled between 5,211 and 5,213. If price gaps to 5,225 on a news spike, your limit protects you from buying at that inflated price.\n\nThey're also useful for entering on pullbacks to a level during less liquid sessions where slippage is a concern."
        },
        {
          "id": "why-not-for-stop-losses",
          "heading": "Why stop-limits are risky as stop losses",
          "body": "Using a stop-limit as a stop loss is dangerous because your exit is not guaranteed. If price crashes through your stop and limit in one move, you remain in the trade with no protection.\n\nConsider this: you're long ES at 5,200 with a stop-limit at 5,190 stop / 5,189 limit. A CPI release sends ES from 5,195 straight to 5,175 in two seconds. Your stop triggers at 5,190, but the best bid is already 5,176. Your limit at 5,189 never fills. You're still long and now down $1,200 instead of $550.\n\nFor stop losses, a regular stop order (which becomes a market order) is almost always safer. Getting out at a bad price is better than not getting out at all."
        }
      ],
      "keyPoints": [
        "Stop-limit orders have two prices: a trigger (stop) and a maximum fill price (limit).",
        "They provide price control that regular stop orders do not.",
        "If the market moves past your limit price, the order may not fill at all.",
        "Best used for breakout entries, not for stop losses.",
        "For exits, guaranteed execution (regular stop) is almost always more important than price control."
      ],
      "examples": [
        {
          "label": "Breakout entry with stop-limit",
          "scenario": "CL resistance is at $72.50. You place a buy stop-limit: stop at $72.55, limit at $72.65.",
          "detail": "If CL breaks out to $72.55, your order activates and becomes a buy limit at $72.65. You'll be filled somewhere between $72.55 and $72.65. If CL gaps from $72.45 straight to $73.00 on inventory data, your limit at $72.65 prevents you from buying at $73.00."
        },
        {
          "label": "Why stop-limit fails as a stop loss",
          "scenario": "You're long 2 ES at 5,200 with a sell stop-limit: stop at 5,185, limit at 5,183.",
          "detail": "Bad jobs data drops ES from 5,190 to 5,170 in seconds. Your stop triggers at 5,185 but the best bid is 5,171. Your limit at 5,183 never fills. You're still holding 2 contracts and now down 30 points ($3,000). A regular stop order would have gotten you out near 5,171 for a $1,450 loss."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using stop-limit orders for stop losses on open positions",
          "fix": "Use regular stop orders for stop losses. Getting out at a slightly worse price is always better than not getting out at all during a fast move."
        },
        {
          "mistake": "Setting the limit price too close to the stop price",
          "fix": "If your stop is at 5,210 and your limit is at 5,210.25, there's almost no room for execution. Give at least 2-4 ticks between your stop and limit prices to increase fill probability."
        },
        {
          "mistake": "Forgetting that an unfilled stop-limit leaves you with no protection",
          "fix": "If your stop-limit doesn't fill, you need a backup plan. Some traders place a wider regular stop behind their stop-limit as a safety net."
        }
      ],
      "relatedTerms": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Limit Order",
          "slug": "limit-order"
        },
        {
          "term": "Market Order",
          "slug": "market-order"
        },
        {
          "term": "Slippage",
          "slug": "slippage"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Support / Resistance",
    "slug": "support-resistance",
    "category": "structure",
    "tldr": "Levels where buying or selling pressure has historically concentrated. Where decisions happen.",
    "page": {
      "tldr": "Price levels where buying pressure (support) or selling pressure (resistance) has historically concentrated. These are the levels where traders make decisions, and they form the backbone of most trading strategies.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Bid / Ask / Spread",
          "slug": "bid-ask-spread"
        }
      ],
      "sections": [
        {
          "id": "what-is-sr",
          "heading": "What is support and resistance?",
          "body": "Support is a price level where buying interest is strong enough to prevent further decline. When price falls to a support level, buyers step in and push price higher. The more times price bounces off a level, the stronger the support is considered.\n\nResistance is the opposite: a level where selling pressure prevents further advance. When price rises to resistance, sellers overwhelm buyers and push price lower.\n\nSupport and resistance are not exact prices. They're zones, often 1-3 points wide on ES, where activity concentrates. Thinking in zones rather than exact numbers helps avoid getting shaken out by minor price fluctuations."
        },
        {
          "id": "types-of-levels",
          "heading": "Types of support and resistance",
          "body": "Horizontal levels are the most basic: prior swing highs and lows, round numbers (5,000, 5,100, 5,200), and prior day's high, low, and close. These are visible to all traders, which is what makes them work.\n\nVolume-based levels come from volume profile analysis. High-volume nodes (HVN) are levels where significant trading occurred and act as magnets for price. Low-volume nodes (LVN) are areas price moved through quickly and act as barriers.\n\nDynamic levels include moving averages (20, 50, 200 day), VWAP, and trend lines. These change over time and provide evolving reference points.\n\nThe most powerful support or resistance occurs when multiple types of levels converge at the same price. A prior swing low that aligns with VWAP and a high-volume node is a stronger level than any one of those in isolation."
        },
        {
          "id": "role-reversal",
          "heading": "When support becomes resistance (and vice versa)",
          "body": "When a support level breaks, it often becomes resistance. If ES bounced three times off 5,180 and then finally breaks below it, 5,180 now becomes a ceiling. Traders who bought at 5,180 before are looking to sell at breakeven, creating selling pressure at that level.\n\nThis role reversal (also called polarity flip) is one of the most reliable patterns in trading. The logic is simple: broken support means buyers who were right are now wrong, and they want out.\n\nThe reverse is also true. A resistance level that gets broken often becomes support. Traders who sold at that level are now looking to cover (buy back), creating buying pressure."
        }
      ],
      "keyPoints": [
        "Support is where buyers step in. Resistance is where sellers step in.",
        "Think in zones (1-3 points wide), not exact prices.",
        "The strongest levels have confluence: multiple types of S/R at the same price.",
        "Broken support becomes resistance. Broken resistance becomes support.",
        "Prior day's high, low, close, and round numbers are the most widely watched levels."
      ],
      "examples": [
        {
          "label": "Bounce off support",
          "scenario": "ES has bounced off 5,180 three times in the past week. Price drops to 5,181 during today's session.",
          "detail": "You buy at 5,182 with a stop at 5,176 (below the support zone). Target is 5,200 (the midpoint of the recent range). Risk: 6 points ($300). Reward: 18 points ($900). The 1:3 ratio only needs a 25% win rate to be profitable."
        },
        {
          "label": "Support-to-resistance flip",
          "scenario": "ES broke below 5,200 support yesterday and closed at 5,185. Today, price rallies back to 5,199.",
          "detail": "5,200, which was support, is now resistance. You watch for rejection at 5,199-5,201 (the zone). If ES stalls there with selling on the tape, you short with a stop above 5,205 and target a retest of 5,185."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Trading support and resistance as exact prices",
          "fix": "Levels are zones. If support is 5,180, expect activity between 5,178-5,182. Placing orders at the exact number often means getting front-run or missing fills."
        },
        {
          "mistake": "Fading every test of support or resistance without confirmation",
          "fix": "Not every touch of a level produces a bounce. Wait for a reaction (rejection candle, volume shift, delta confirmation) before entering."
        },
        {
          "mistake": "Ignoring the trend when trading levels",
          "fix": "In a downtrend, support levels break more often than they hold. In an uptrend, resistance breaks more often. Trade in the direction of the trend, and use levels for entry timing."
        }
      ],
      "relatedTerms": [
        {
          "term": "Point of Control (POC)",
          "slug": "point-of-control"
        },
        {
          "term": "Opening Range",
          "slug": "opening-range"
        },
        {
          "term": "Gap",
          "slug": "gap"
        },
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Swing Trading",
    "slug": "swing-trading",
    "category": "strategy",
    "tldr": "Holding positions for days to weeks. Wider stops, lower leverage, less screen time.",
    "page": {
      "tldr": "A trading style where positions are held for days to weeks, targeting larger price moves with wider stops. Less screen time than day trading, but requires overnight margin and comfort with holding risk through closes and opens.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Margin",
          "slug": "margin"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        }
      ],
      "sections": [
        {
          "id": "what-is-swing-trading",
          "heading": "What is swing trading?",
          "body": "Swing trading means holding positions for multiple days to several weeks, capturing multi-day price swings. While day traders close all positions before the session ends, swing traders carry positions overnight and sometimes over weekends.\n\nSwing traders typically analyze daily and 4-hour charts, looking for trends, pullbacks to support or resistance, and pattern breakouts that play out over days rather than minutes."
        },
        {
          "id": "advantages-of-swing",
          "heading": "Advantages of swing trading",
          "body": "Less screen time is the biggest advantage. You can analyze charts in the evening, set your orders, and check once or twice during the day. This makes swing trading compatible with a full-time job.\n\nLarger moves mean commissions are a tiny fraction of your profits. If you're targeting 50-100 points on ES, the $4 round-trip commission is negligible.\n\nWider stops reduce the impact of noise. A 30-point stop on ES won't get triggered by a random 10-point intraday wick. You're trading the meaningful moves, not the noise."
        },
        {
          "id": "challenges-of-swing",
          "heading": "Challenges and risks",
          "body": "Overnight risk is the main challenge. You're holding positions through closes and opens, which means you're exposed to gap risk. If major news breaks overnight, ES can open 30-50 points away from the prior close, blowing through your stop.\n\nOvernight margin requirements are higher than day-trade margins. You need the full exchange margin ($12,000+ per ES contract vs. $500 for day trading). This means smaller position sizes relative to your account.\n\nPsychological patience is required. Swing trades can be underwater for days before working. If you can't tolerate watching a position lose money for 48 hours before eventually reaching your target, swing trading will be difficult."
        },
        {
          "id": "position-sizing-for-swings",
          "heading": "Position sizing for swing trades",
          "body": "Swing trades use wider stops, which means fewer contracts per trade for the same dollar risk. If your day-trade stop is 5 points on ES ($250/contract), your swing stop might be 25 points ($1,250/contract).\n\nOn a $50,000 account risking 1% ($500), a 5-point day-trade stop allows 2 ES contracts. A 25-point swing stop allows 0.4 ES contracts, meaning you'd trade 4 MES contracts instead.\n\nThis is normal. Swing trading makes its money from larger per-trade gains, not from larger position sizes. The risk per trade stays the same."
        }
      ],
      "keyPoints": [
        "Swing trades are held for days to weeks, targeting larger price moves.",
        "Less screen time makes it compatible with a full-time job.",
        "Overnight positions require full exchange margin, not reduced day-trade margin.",
        "Wider stops mean smaller position sizes for the same dollar risk.",
        "Gap risk and overnight news are the primary dangers."
      ],
      "examples": [
        {
          "label": "Swing trade on ES daily chart",
          "scenario": "ES pulls back to the 20-day moving average at 5,180 after a strong uptrend. You buy with a stop below the recent swing low at 5,150 (30-point risk) and target the prior high at 5,260 (80-point reward).",
          "detail": "Risk-reward: 1:2.67. On a $50,000 account risking 1% ($500), you trade 1 MES (30 points x $5 = $150 risk) or calculate that you need 0.33 ES contracts, so you'd use 3 MES. The trade takes 8 trading days to reach target for +$240 per MES (3 contracts = $720)."
        },
        {
          "label": "Gap risk on a swing position",
          "scenario": "You're long 5 MES from 5,200 with a stop at 5,175. Friday after close, unexpected economic data surfaces. Monday opens at 5,155.",
          "detail": "Your stop at 5,175 can't fill over the weekend. It triggers at Monday's open, filling at 5,155. Your planned 25-point loss ($125 per MES, $625 total) becomes a 45-point loss ($225 per MES, $1,125 total). This is gap risk."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using day-trade position sizes on swing trades",
          "fix": "If you trade 2 ES contracts intraday, you probably should trade 2-4 MES on swings. Wider stops require smaller position sizes to maintain the same dollar risk."
        },
        {
          "mistake": "Not accounting for overnight margin requirements",
          "fix": "Day-trade margin is $500 per ES contract. Overnight margin is $12,000+. Make sure you have enough capital for overnight margin if you plan to hold through the close."
        },
        {
          "mistake": "Checking your swing trade every 15 minutes",
          "fix": "Over-monitoring leads to premature exits. Set alerts at key levels and check once or twice a day. The whole point of swing trading is less screen time."
        }
      ],
      "relatedTerms": [
        {
          "term": "Scalping",
          "slug": "scalping"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Tick",
    "slug": "tick",
    "category": "basics",
    "tldr": "The minimum price movement. Each product has a different tick size and dollar value per tick.",
    "page": {
      "tldr": "The minimum price increment a futures contract can move. Every product has a different tick size and dollar value per tick. Understanding ticks is how you calculate risk, profit, and position size.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        }
      ],
      "sections": [
        {
          "id": "what-is-a-tick",
          "heading": "What is a tick?",
          "body": "A tick is the smallest possible price movement for a futures contract. It's set by the exchange and varies by product. ES moves in increments of 0.25 index points. CL moves in increments of $0.01 per barrel. Gold (GC) moves in increments of $0.10 per ounce.\n\nEvery tick has a dollar value attached to it. One tick on ES is worth $12.50 (0.25 points x $50 per point). One tick on CL is worth $10.00 ($0.01 x 1,000 barrels). This dollar value is what determines how much money you make or lose per price movement."
        },
        {
          "id": "ticks-vs-points",
          "heading": "Ticks vs. points",
          "body": "Traders often use ticks and points interchangeably, but they're different.\n\nA point is one full unit of price movement. On ES, one point is a move from 5,200 to 5,201. Since ES moves in 0.25-point increments, one point equals 4 ticks.\n\nWhen someone says ES moved 10 points, they mean the price changed by 10.00 (40 ticks, worth $500 per contract). When someone says I got filled one tick from my limit, they mean 0.25 points ($12.50 on ES).\n\nOn CL, one point is a move from $70.00 to $71.00, which equals 100 ticks ($1,000 per contract). Always clarify whether someone is talking about ticks or points, especially when discussing risk."
        },
        {
          "id": "why-ticks-matter",
          "heading": "Why tick values matter for risk management",
          "body": "Every risk calculation in futures starts with the tick value. When you say I'm risking 10 points on ES, you need to know that 10 points equals $500 per contract to size your position correctly.\n\nDifferent products have very different per-tick risk profiles. One tick on ES costs $12.50, one tick on NQ costs $5.00, one tick on CL costs $10.00, and one tick on GC costs $10.00.\n\nThis is also why you can't directly compare strategies across products. Saying I made 20 ticks is meaningless without specifying the product. 20 ticks on ES is $250. 20 ticks on CL is $200. 20 ticks on NQ is $100."
        },
        {
          "id": "reading-tick-charts",
          "heading": "Tick-based charts and data",
          "body": "Some traders use tick charts instead of time-based charts. A 500-tick chart creates a new bar every 500 trades (transactions), regardless of how long that takes. During high-activity periods, tick bars form quickly. During slow periods, they form slowly.\n\nTick charts normalize activity by volume rather than time, which can reveal patterns hidden by time-based charts. They're popular among scalpers and order flow traders.\n\nThe NYSE TICK index (not to be confused with futures tick size) measures the number of stocks ticking up minus stocks ticking down. Futures traders watch this as a breadth indicator."
        }
      ],
      "keyPoints": [
        "A tick is the minimum price movement. It varies by product.",
        "One ES tick = 0.25 points = $12.50. One point = 4 ticks = $50.",
        "Always specify whether you're talking about ticks or points to avoid confusion.",
        "Tick values are the foundation of all risk and position sizing calculations.",
        "Different products have different tick values, so risk per tick varies significantly."
      ],
      "examples": [
        {
          "label": "Calculating dollar risk from tick distance",
          "scenario": "You want to risk 8 points (32 ticks) on an ES trade. You're trading 2 contracts.",
          "detail": "8 points x $50 per point = $400 per contract. With 2 contracts, your total risk is $800. Alternatively: 32 ticks x $12.50 per tick = $400 per contract x 2 = $800."
        },
        {
          "label": "Cross-product comparison",
          "scenario": "You made 5 points on ES and 50 ticks on CL. Which trade made more money?",
          "detail": "ES: 5 points x $50 = $250 per contract. CL: 50 ticks x $10 = $500 per contract. The CL trade made twice as much per contract. Always convert to dollars for comparison."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Confusing ticks and points when calculating risk",
          "fix": "On ES, a 10-tick stop is 2.5 points ($125), while a 10-point stop is 40 ticks ($500). That's a 4x difference. Always confirm which unit is being used."
        },
        {
          "mistake": "Assuming all futures products have the same tick value",
          "fix": "ES is $12.50 per tick, NQ is $5.00 per tick, CL is $10.00 per tick. Know the tick value of whatever you're trading before you place an order."
        },
        {
          "mistake": "Ignoring tick size when comparing strategies across products",
          "fix": "A strategy that makes 50 ticks per day on NQ ($250) is very different from one that makes 50 ticks per day on CL ($500). Always compare in dollar terms."
        }
      ],
      "relatedTerms": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Leverage",
          "slug": "leverage"
        },
        {
          "term": "Position Sizing",
          "slug": "position-sizing"
        },
        {
          "term": "Contract Specifications",
          "slug": "contract-specifications"
        }
      ],
      "specs": [
        {
          "product": "E-mini S&P 500 (ES)",
          "initial": "0.25 pts",
          "maintenance": "$12.50/tick",
          "dayTrade": "$50.00/point"
        },
        {
          "product": "E-mini Nasdaq-100 (NQ)",
          "initial": "0.25 pts",
          "maintenance": "$5.00/tick",
          "dayTrade": "$20.00/point"
        },
        {
          "product": "Crude Oil (CL)",
          "initial": "$0.01",
          "maintenance": "$10.00/tick",
          "dayTrade": "$1,000/point"
        },
        {
          "product": "Gold (GC)",
          "initial": "$0.10",
          "maintenance": "$10.00/tick",
          "dayTrade": "$100/point"
        },
        {
          "product": "Micro E-mini S&P (MES)",
          "initial": "0.25 pts",
          "maintenance": "$1.25/tick",
          "dayTrade": "$5.00/point"
        },
        {
          "product": "Corn (ZC)",
          "initial": "0.25c/bu",
          "maintenance": "$12.50/tick",
          "dayTrade": "$50.00/point"
        }
      ]
    }
  },
  {
    "term": "Trailing Stop",
    "slug": "trailing-stop",
    "category": "orders",
    "tldr": "A stop loss that automatically moves with price to lock in gains as a trade works.",
    "page": {
      "tldr": "A stop loss that automatically adjusts upward (for longs) or downward (for shorts) as the trade moves in your favor, locking in gains without limiting further upside.",
      "prerequisites": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        }
      ],
      "sections": [
        {
          "id": "what-is-trailing-stop",
          "heading": "What is a trailing stop?",
          "body": "A trailing stop is a stop loss that moves with the market when price moves in your favor. For a long position, the trailing stop starts at a fixed distance below your entry and follows price upward. It never moves back down.\n\nIf you set a 10-point trailing stop on ES and buy at 5,200, your initial stop is at 5,190. If ES moves to 5,215, your stop automatically rises to 5,205. If ES then pulls back to 5,205, your stop triggers and you exit with a 5-point profit instead of a 10-point loss."
        },
        {
          "id": "types-of-trailing-stops",
          "heading": "Types of trailing stops",
          "body": "Fixed-distance trailing stops maintain a constant point or tick distance from the highest price reached. Simple to set up and manage, but they don't account for changes in volatility.\n\nATR-based trailing stops use the Average True Range to set the distance dynamically. In volatile markets, the stop is further away. In calm markets, it tightens up. This adapts to conditions automatically.\n\nPercentage-based trailing stops trail by a fixed percentage of the price. More common in stocks than futures, but the concept is the same.\n\nManual trailing stops involve moving your stop yourself as price reaches new levels. Many traders prefer this because they can adjust the stop based on market structure (support levels, volume nodes) rather than arbitrary distances."
        },
        {
          "id": "when-trailing-stops-help",
          "heading": "When trailing stops work well",
          "body": "Trailing stops shine in trending markets where price moves steadily in one direction. They let you ride the trend without setting a fixed profit target, capturing moves that exceed your initial expectations.\n\nThey're especially useful when you're unable to monitor a trade continuously. A trailing stop manages the position for you, locking in gains if the market reverses while you're away from the screen.\n\nSwing traders holding overnight positions often use trailing stops to protect profits built during the day while remaining positioned for further moves the next session."
        },
        {
          "id": "limitations",
          "heading": "When trailing stops don't work",
          "body": "In choppy, range-bound markets, trailing stops get triggered constantly. Price moves up, the stop tightens, price pulls back to the stop, and you're out with a small gain or a loss. Then price continues in your original direction without you.\n\nSetting the trail distance is critical. Too tight and normal price fluctuations stop you out prematurely. Too wide and you give back too much profit before the stop triggers. There's no perfect distance, and the optimal trail changes with market conditions.\n\nMost platforms support trailing stops, but the mechanics vary. Some trail in real-time tick by tick, others only adjust at set intervals. Know how your platform implements them."
        }
      ],
      "keyPoints": [
        "Trailing stops follow price in your favor but never move backward.",
        "They lock in gains automatically as a trade moves in your direction.",
        "Fixed-distance, ATR-based, and manual trailing are the most common types.",
        "Work best in trending markets. Choppy markets trigger them prematurely.",
        "Setting the right trail distance is the hardest part. Too tight or too wide both cost money."
      ],
      "examples": [
        {
          "label": "Trailing stop on a trending move",
          "scenario": "You buy ES at 5,200 with a 12-point trailing stop (initial stop at 5,188). ES trends up steadily over 2 hours to 5,240.",
          "detail": "Your stop followed price up from 5,188 to 5,228. When ES finally pulls back to 5,228, your stop triggers. You capture 28 points ($1,400) of a 40-point move. Without the trailing stop, you would have needed to pick a fixed target, which might have been set at 5,215 (capturing only 15 points)."
        },
        {
          "label": "Trailing stop in a choppy market",
          "scenario": "You buy NQ at 18,400 with a 20-point trailing stop (stop at 18,380). NQ moves to 18,425, pulling the stop to 18,405.",
          "detail": "NQ pulls back to 18,405 and your stop triggers for a 5-point gain ($100). NQ then reverses and rallies to 18,500. You captured a tiny fraction of the move because the trail was too tight for the chop."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Setting the trailing distance too tight for the product's normal volatility",
          "fix": "Check the product's average range. If ES moves 40-60 points per day, a 5-point trailing stop will get triggered by normal noise. Trail at least 1-2x the average recent pullback size."
        },
        {
          "mistake": "Using trailing stops in choppy, range-bound markets",
          "fix": "Trailing stops are for trends. In a range, use fixed targets with bracket orders. Switch to trailing stops only when price shows clear directional momentum."
        },
        {
          "mistake": "Not accounting for gap risk on overnight trailing stops",
          "fix": "If the market gaps through your trailing stop level on the next session's open, slippage can be significant. Factor overnight gap risk into your trail distance."
        }
      ],
      "relatedTerms": [
        {
          "term": "Stop Order",
          "slug": "stop-order"
        },
        {
          "term": "Risk-Reward Ratio",
          "slug": "risk-reward-ratio"
        },
        {
          "term": "Drawdown",
          "slug": "drawdown"
        },
        {
          "term": "Swing Trading",
          "slug": "swing-trading"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Value Area",
    "slug": "value-area",
    "category": "data",
    "tldr": "The price range where 70% of volume traded. Market Profile's definition of fair value.",
    "page": {
      "tldr": "The price range where approximately 70% of trading volume occurred during a given period. It represents the market's accepted fair-value zone. Price opening outside the value area often migrates back inside.",
      "prerequisites": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        }
      ],
      "sections": [
        {
          "id": "what-is-value-area",
          "heading": "What is the value area?",
          "body": "The value area is the price range containing approximately 70% of trading volume (or time, in traditional Market Profile) during a defined period. The top of this range is the Value Area High (VAH). The bottom is the Value Area Low (VAL).\n\nThe value area represents the range of prices that the market accepted as fair. Prices inside the value area attracted sustained two-sided trading. Prices outside the value area were rejected as too high or too low."
        },
        {
          "id": "trading-with-va",
          "heading": "Trading with the value area",
          "body": "The value area's most powerful application is as a reference for the next session's open. Where today's price opens relative to yesterday's value area sets up specific trading scenarios.\n\nOpening inside yesterday's value area suggests balance. Price is likely to remain within the range unless a catalyst shifts sentiment.\n\nOpening above the value area suggests buyers are in control. If price can't re-enter the value area (drop below VAH), it may continue higher to find a new value area.\n\nOpening below the value area suggests sellers are in control. If price can't re-enter (rise above VAL), it may continue lower.\n\nThe rule of thumb: if price opens outside the value area and quickly re-enters, the breakout has failed and price will likely migrate to the POC."
        },
        {
          "id": "multi-day-va",
          "heading": "Multi-day value area analysis",
          "body": "Looking at the value area across multiple days reveals the bigger picture. Value areas that are stacking higher day after day indicate an uptrend. Price is finding acceptance at progressively higher levels.\n\nOverlapping value areas day after day indicate balance or consolidation. The market is accepting the same range repeatedly.\n\nValue areas that shift sharply overnight suggest a gap in acceptance. The space between yesterday's VAH and today's VAL (or vice versa) is a low-volume zone that price may return to fill."
        }
      ],
      "keyPoints": [
        "The value area contains 70% of volume at price during a session.",
        "VAH (top) and VAL (bottom) are key levels watched by institutional traders.",
        "Opening outside the value area sets up directional scenarios.",
        "Failed breakouts from the value area often lead to migration back to the POC.",
        "Stacking value areas reveal trend, balance, or gap conditions across days."
      ],
      "examples": [
        {
          "label": "Open above value area",
          "scenario": "Yesterday's ES value area was 5,190-5,210. Today opens at 5,218, above the VAH.",
          "detail": "Buyers are in control. If ES stays above 5,210 (VAH) for the first 30 minutes, the breakout is likely real and price may trend higher to establish a new value area. If ES drops back below 5,210 quickly, the breakout failed and price targets the POC at 5,200."
        },
        {
          "label": "Value area migration",
          "scenario": "ES opens at 5,188, inside yesterday's value area (5,190-5,210). The POC is at 5,202.",
          "detail": "Opening inside value suggests a balanced day. Price is likely to rotate within the 5,190-5,210 range, with the POC at 5,202 acting as a magnet. Mean-reversion strategies work best in this scenario."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Treating the value area as exact support and resistance",
          "fix": "The value area is a zone, not a line. VAH and VAL are approximate levels. Price can overshoot by a few ticks. Use them as reference areas, not exact triggers."
        },
        {
          "mistake": "Ignoring the relationship between today's open and yesterday's value area",
          "fix": "Where you open relative to the prior session's value area is one of the single most important daily data points. Check this before every trading day."
        },
        {
          "mistake": "Only using one day's value area",
          "fix": "Multi-day value area analysis shows trend, balance, and key gaps. A level where multiple days' value areas overlap is a much stronger reference than a single day."
        }
      ],
      "relatedTerms": [
        {
          "term": "Point of Control (POC)",
          "slug": "point-of-control"
        },
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        },
        {
          "term": "Initial Balance (IB)",
          "slug": "initial-balance"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "Volume Profile",
    "slug": "volume-profile",
    "category": "data",
    "tldr": "Trading activity shown by price level. High-volume nodes attract, low-volume areas repel.",
    "page": {
      "tldr": "A tool that displays trading volume at each price level, showing where the most and least activity occurred. High-volume levels attract price. Low-volume levels act as barriers that price moves through quickly.",
      "prerequisites": [
        {
          "term": "Futures Contract",
          "slug": "futures-contract"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        }
      ],
      "sections": [
        {
          "id": "what-is-volume-profile",
          "heading": "What is Volume Profile?",
          "body": "Volume Profile displays trading volume organized by price level rather than by time. While a standard volume indicator shows how much was traded during each time period (bar), Volume Profile shows how much was traded at each price.\n\nThe result is a horizontal histogram overlaid on the price chart. Levels with heavy volume appear as wide bars. Levels with light volume appear as thin bars. This immediately reveals where the market spent the most time transacting and where it moved through without interest."
        },
        {
          "id": "hvn-lvn",
          "heading": "High-volume nodes and low-volume nodes",
          "body": "High-volume nodes (HVN) are price levels with significantly above-average volume. These represent areas of acceptance where buyers and sellers agreed on value. Price tends to gravitate toward HVNs and trade around them, much like a magnet.\n\nLow-volume nodes (LVN) are levels with below-average volume. These represent areas of rejection where price moved through quickly because there was a supply-demand imbalance. LVNs act as barriers. When price approaches an LVN, it either blows through it quickly or reverses.\n\nThe interplay between HVNs and LVNs creates a map of the market's structure. Price oscillates between HVN magnets and bounces off or breaks through LVN barriers."
        },
        {
          "id": "using-vp",
          "heading": "How to use Volume Profile in trading",
          "body": "Volume Profile provides objective support and resistance levels derived from actual trading activity rather than visual pattern recognition.\n\nEntries: look to buy at HVN levels during pullbacks in an uptrend. The high volume means many participants are interested at that level, providing a cushion. Look to sell at HVNs during rallies in a downtrend.\n\nTargets: LVNs below your entry in a long trade are potential obstacles. If price can break through the LVN, the next HVN becomes the target. LVNs above your entry in a short trade serve the same purpose.\n\nThere is no single correct timeframe for Volume Profile. Some traders use daily profiles, others use weekly or monthly. Multi-timeframe analysis, where you overlay several profiles, reveals the strongest levels."
        }
      ],
      "keyPoints": [
        "Volume Profile shows volume at each price level, not at each time period.",
        "High-volume nodes (HVN) attract price. Low-volume nodes (LVN) repel it.",
        "HVNs represent areas of value acceptance. LVNs represent areas of rejection.",
        "Provides objective support and resistance based on actual trading data.",
        "Multi-timeframe profiles reveal the strongest and most significant levels."
      ],
      "examples": [
        {
          "label": "HVN as support",
          "scenario": "The weekly Volume Profile shows a large HVN at 5,195 on ES. Price pulled back from 5,230 to 5,197.",
          "detail": "The HVN at 5,195 indicates heavy volume was traded there recently. Buyers are likely to re-engage at this level. You buy at 5,197 with a stop at 5,188 (below the HVN zone) and target 5,220 (the next HVN above)."
        },
        {
          "label": "LVN as a breakout trigger",
          "scenario": "There's an LVN between 5,210 and 5,215 on ES. Price has been consolidating below 5,210.",
          "detail": "If ES breaks above 5,210, there's little volume resistance between 5,210 and 5,215. Price should move quickly through this zone to the next HVN above. This LVN breakout is a go/no-go zone that accelerates moves."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using Volume Profile without understanding what it measures",
          "fix": "Volume Profile is not the same as a standard volume indicator. It shows volume at price, not volume over time. Make sure your charting platform is configured correctly."
        },
        {
          "mistake": "Relying on a single timeframe's profile",
          "fix": "A daily profile may show an HVN at 5,200, but the monthly profile might show that level is in an LVN zone. Always check multiple timeframes to find levels with multi-timeframe confluence."
        },
        {
          "mistake": "Ignoring Volume Profile on trending days",
          "fix": "On trend days, price moves away from the developing profile's value area. Trying to fade back to the POC on a trend day is fighting the tape."
        }
      ],
      "relatedTerms": [
        {
          "term": "Point of Control (POC)",
          "slug": "point-of-control"
        },
        {
          "term": "Value Area",
          "slug": "value-area"
        },
        {
          "term": "Market Profile",
          "slug": "market-profile"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        }
      ],
      "specs": null
    }
  },
  {
    "term": "VWAP",
    "slug": "vwap",
    "category": "data",
    "tldr": "Volume-Weighted Average Price. The institutional benchmark for fair value during a session.",
    "page": {
      "tldr": "The Volume-Weighted Average Price resets each session and tracks the average price weighted by volume. Institutional traders use it as a benchmark for fair value. Price above VWAP favors longs. Price below favors shorts.",
      "prerequisites": [
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        },
        {
          "term": "Liquidity",
          "slug": "liquidity"
        }
      ],
      "sections": [
        {
          "id": "what-is-vwap",
          "heading": "What is VWAP?",
          "body": "VWAP stands for Volume-Weighted Average Price. It calculates the average price of all trades during a session, weighted by the volume at each price. Unlike a simple moving average that weighs each price equally, VWAP gives more weight to prices where heavy volume occurred.\n\nVWAP resets at the beginning of each RTH session. It starts at the opening price and evolves throughout the day as more trades occur. Early in the session, VWAP moves significantly with each trade. By afternoon, it becomes more stable because so much volume has been incorporated."
        },
        {
          "id": "institutional-benchmark",
          "heading": "Why institutions use VWAP",
          "body": "Large institutional traders use VWAP as a benchmark for execution quality. If a fund needs to buy 10,000 ES contracts during the day, they measure their average fill against VWAP. Filling below VWAP means they got a good deal.\n\nThis creates a self-fulfilling dynamic. Because institutions are benchmarked against VWAP, they tend to buy below it and sell above it. This makes VWAP act as support when price is above it (institutions buying on dips to VWAP) and resistance when price is below it (institutions selling on rallies to VWAP)."
        },
        {
          "id": "trading-with-vwap",
          "heading": "How traders use VWAP",
          "body": "The simplest application: price above VWAP favors long trades, price below VWAP favors short trades. When price is above VWAP, the average buyer for the day is profitable. When price is below, the average buyer is at a loss.\n\nVWAP pullback entries are popular. In an uptrending day where price stays above VWAP, buying pullbacks to VWAP offers a low-risk entry with the institutional flow.\n\nVWAP standard deviation bands (typically +/- 1 and 2 standard deviations) act as stretched targets. Price reaching the +2 deviation band is statistically extended and may revert toward VWAP.\n\nEnd-of-day VWAP convergence is a common pattern. Price that spent the day above or below VWAP often returns to it in the final hour as institutions square up positions."
        }
      ],
      "keyPoints": [
        "VWAP is the average price weighted by volume. It resets each session.",
        "Institutions use VWAP as a benchmark, making it a self-fulfilling level.",
        "Price above VWAP = bullish bias. Below VWAP = bearish bias.",
        "Pullbacks to VWAP in a trending day are popular entry points.",
        "VWAP becomes more stable as the session progresses (anchoring effect)."
      ],
      "examples": [
        {
          "label": "VWAP pullback entry",
          "scenario": "ES is in a strong uptrend today. VWAP is at 5,205 and price has been above it all session. At 11 AM, ES dips to 5,206, one point above VWAP.",
          "detail": "You buy at 5,207 with a stop at 5,200 (below VWAP). Target is the session high at 5,225. The logic: institutional buyers benchmarked against VWAP will provide support near this level. If VWAP breaks, your thesis is invalidated."
        },
        {
          "label": "End-of-day VWAP convergence",
          "scenario": "ES spent the morning above VWAP at 5,210. VWAP is at 5,202. At 3 PM, price starts drifting lower toward 5,204.",
          "detail": "End-of-day VWAP convergence is underway. Institutions are closing positions and the market is gravitating back toward the day's average price. Afternoon trades toward VWAP are common in the final hour."
        }
      ],
      "commonMistakes": [
        {
          "mistake": "Using VWAP as a buy/sell signal in isolation",
          "fix": "VWAP is a reference level, not a trigger. Combine it with price action, volume, and other levels. Buying every touch of VWAP on a downtrending day is a losing strategy."
        },
        {
          "mistake": "Not anchoring VWAP to the correct session start",
          "fix": "VWAP should reset at RTH open for most applications. Using a 24-hour VWAP (including overnight) gives a different and usually less useful level for day trading."
        },
        {
          "mistake": "Expecting VWAP to work on low-volume days",
          "fix": "VWAP is most reliable when volume is high because the weighted average is based on more data. On thin-volume days (holidays, pre-holidays), VWAP is less meaningful."
        }
      ],
      "relatedTerms": [
        {
          "term": "Volume Profile",
          "slug": "volume-profile"
        },
        {
          "term": "Point of Control (POC)",
          "slug": "point-of-control"
        },
        {
          "term": "Support / Resistance",
          "slug": "support-resistance"
        },
        {
          "term": "Regular Trading Hours (RTH)",
          "slug": "rth"
        }
      ],
      "specs": null
    }
  }
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
