// All glossary terms. Each term that has a full page gets a `page` object.
// Terms without `page` just show the TL;DR on the index.

export const glossaryTerms = [
  {
    "term": "Backwardation",
    "slug": "backwardation",
    "category": "pricing",
    "tldr": "When futures prices are lower than the spot price. Signals tight supply or strong demand."
  },
  {
    "term": "Bid / Ask / Spread",
    "slug": "bid-ask-spread",
    "category": "basics",
    "tldr": "The prices buyers and sellers are offering, and the gap between them."
  },
  {
    "term": "Bracket Order",
    "slug": "bracket-order",
    "category": "orders",
    "tldr": "An entry order bundled with a profit target and stop loss that auto-cancel each other."
  },
  {
    "term": "Contango",
    "slug": "contango",
    "category": "pricing",
    "tldr": "When futures prices are higher than the spot price. The normal state for most markets."
  },
  {
    "term": "Contract Specifications",
    "slug": "contract-specifications",
    "category": "instruments",
    "tldr": "The standardized terms that define a futures contract: tick size, value, hours, and expiration."
  },
  {
    "term": "Daily Settlement",
    "slug": "daily-settlement",
    "category": "basics",
    "tldr": "The official closing price used to calculate daily gains, losses, and margin requirements."
  },
  {
    "term": "Day Trade Margin",
    "slug": "day-trade-margin",
    "category": "basics",
    "tldr": "Reduced margin for positions opened and closed within the same session. Varies by broker."
  },
  {
    "term": "Delivery",
    "slug": "delivery",
    "category": "basics",
    "tldr": "The physical or cash settlement process when a futures contract expires."
  },
  {
    "term": "Delta",
    "slug": "delta",
    "category": "data",
    "tldr": "Net aggressive buying minus selling volume. Shows who's pushing price."
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
    "tldr": "Electronically traded, smaller-sized versions of standard index futures (ES, NQ, RTY, YM)."
  },
  {
    "term": "Expiration / Rollover",
    "slug": "expiration-rollover",
    "category": "pricing",
    "tldr": "When a contract expires and traders move to the next month. Happens quarterly for indexes."
  },
  {
    "term": "Fill",
    "slug": "fill",
    "category": "orders",
    "tldr": "When your order is executed and you have an open position. As in, 'I got filled at 5200.'"
  },
  {
    "term": "Front Month",
    "slug": "front-month",
    "category": "pricing",
    "tldr": "The nearest expiration contract. Most liquid, most traded, and usually the one you want."
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
    "tldr": "The price difference between one session's close and the next session's open."
  },
  {
    "term": "Globex / Electronic Session",
    "slug": "globex",
    "category": "sessions",
    "tldr": "CME's electronic overnight trading platform. Lower volume and wider spreads, but always important context."
  },
  {
    "term": "Hedging",
    "slug": "hedging",
    "category": "strategy",
    "tldr": "Using futures to offset risk in an existing position or business exposure."
  },
  {
    "term": "Initial Balance (IB)",
    "slug": "initial-balance",
    "category": "structure",
    "tldr": "The price range of the first hour. A Market Profile concept that sets the day's tone."
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
    "tldr": "Circuit breakers that halt trading when price moves too far, too fast."
  },
  {
    "term": "Liquidity",
    "slug": "liquidity",
    "category": "data",
    "tldr": "How easily you can enter and exit without moving the price. Measured by volume and spread."
  },
  {
    "term": "Lot / Contract Size",
    "slug": "lot-contract-size",
    "category": "basics",
    "tldr": "The standardized quantity one contract represents: 1,000 barrels, $50 times the index, etc."
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
    "tldr": "A demand to deposit more money when your account drops below maintenance margin."
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
    "tldr": "A framework that organizes price activity by time, revealing value areas and balance zones."
  },
  {
    "term": "Micro Contracts",
    "slug": "micro-contracts",
    "category": "instruments",
    "tldr": "1/10th-size futures (MES, MNQ, MGC). Ideal for learning and small accounts."
  },
  {
    "term": "Notional Value",
    "slug": "notional-value",
    "category": "basics",
    "tldr": "The total dollar value a futures contract controls. Usually many multiples of your margin."
  },
  {
    "term": "OCO Order",
    "slug": "oco-order",
    "category": "orders",
    "tldr": "One-Cancels-Other. Two orders linked so when one fills, the other auto-cancels."
  },
  {
    "term": "Open Interest",
    "slug": "open-interest",
    "category": "data",
    "tldr": "Total outstanding contracts. Rising OI with rising price means new money entering the trend."
  },
  {
    "term": "Opening Range",
    "slug": "opening-range",
    "category": "structure",
    "tldr": "The high-low range of the first 5, 15, or 30 minutes. A key reference for breakout traders."
  },
  {
    "term": "Order Book / DOM",
    "slug": "order-book-dom",
    "category": "data",
    "tldr": "The depth of market. Shows resting buy and sell orders at each price level in real time."
  },
  {
    "term": "Point of Control (POC)",
    "slug": "point-of-control",
    "category": "data",
    "tldr": "The price level with the most trading volume. Acts as a magnet for price."
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
    "tldr": "A firm that funds traders with its capital after passing an evaluation. You keep most of the profits."
  },
  {
    "term": "Regular Trading Hours (RTH)",
    "slug": "rth",
    "category": "sessions",
    "tldr": "The main session. 9:30 AM to 4:00 PM ET for equity index futures."
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
    "tldr": "Closing an expiring contract and opening the same position in the next contract month."
  },
  {
    "term": "Scalping",
    "slug": "scalping",
    "category": "strategy",
    "tldr": "Trading for small, fast gains with high frequency. Seconds to minutes per trade."
  },
  {
    "term": "Settlement",
    "slug": "settlement",
    "category": "basics",
    "tldr": "How a contract resolves at expiration. Cash payment or physical delivery of the asset."
  },
  {
    "term": "Slippage",
    "slug": "slippage",
    "category": "orders",
    "tldr": "The difference between your expected price and your actual fill. Worse in thin markets."
  },
  {
    "term": "Spread Trading",
    "slug": "spread-trading",
    "category": "strategy",
    "tldr": "Trading the price difference between two related contracts instead of outright direction."
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
    "tldr": "A stop that triggers a limit order instead of a market order. Price control but fill risk."
  },
  {
    "term": "Support / Resistance",
    "slug": "support-resistance",
    "category": "structure",
    "tldr": "Levels where buying or selling pressure has historically concentrated. Where decisions happen."
  },
  {
    "term": "Swing Trading",
    "slug": "swing-trading",
    "category": "strategy",
    "tldr": "Holding positions for days to weeks. Wider stops, lower leverage, less screen time."
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
    "tldr": "A stop loss that automatically moves with price to lock in gains as a trade works."
  },
  {
    "term": "Value Area",
    "slug": "value-area",
    "category": "data",
    "tldr": "The price range where 70% of volume traded. Market Profile's definition of fair value."
  },
  {
    "term": "Volume Profile",
    "slug": "volume-profile",
    "category": "data",
    "tldr": "Trading activity shown by price level. High-volume nodes attract, low-volume areas repel."
  },
  {
    "term": "VWAP",
    "slug": "vwap",
    "category": "data",
    "tldr": "Volume-Weighted Average Price. The institutional benchmark for fair value during a session."
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
