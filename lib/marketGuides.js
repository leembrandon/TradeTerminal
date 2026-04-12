// Market guide data

export const marketGuides = [
  {
    "slug": "equity-indexes",
    "name": "Equity Index Futures",
    "shortName": "Equity Indexes",
    "color": "#5DCAA5",
    "tagline": "The most liquid futures markets in the world. ES and NQ are where most retail futures traders start and where most volume lives.",
    "tldr": "Equity index futures track major stock market indexes. The E-mini S&P 500 (ES) and E-mini Nasdaq-100 (NQ) are the two most traded futures contracts in the world. They offer deep liquidity, tight spreads, nearly 24-hour trading, and favorable 60/40 tax treatment.",
    "overview": [
      {
        "id": "what-are-equity-index-futures",
        "heading": "What are equity index futures?",
        "body": "Equity index futures are contracts that track the value of a stock market index. Instead of buying shares in 500 individual companies, you can trade one ES contract and get exposure to the entire S&P 500.\n\nThe price of the futures contract moves almost tick for tick with the underlying index during regular trading hours. The small difference between the futures price and the index value is called the basis, and it reflects interest rates, dividends, and time to expiration.\n\nThese are cash-settled contracts. At expiration, there is no delivery of stocks. The contract simply settles against the official index value and the difference is credited or debited to your account."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "E-mini S&P 500 (ES) tracks the S&P 500 index. Each point is worth $50. Tick size is 0.25 points ($12.50 per tick). This is the most traded futures contract in the world with over 1 million contracts per day. It represents broad US large-cap exposure.\n\nE-mini Nasdaq-100 (NQ) tracks the Nasdaq-100 index. Each point is worth $20. Tick size is 0.25 points ($5.00 per tick). Heavily weighted toward technology (Apple, Microsoft, Nvidia, Amazon, Meta). More volatile than ES on most days.\n\nE-mini Dow (YM) tracks the Dow Jones Industrial Average. Each point is worth $5. Tick size is 1 point ($5.00 per tick). 30 large-cap stocks. Less popular than ES and NQ but still liquid.\n\nE-mini Russell 2000 (RTY) tracks the Russell 2000 small-cap index. Each point is worth $50. Tick size is 0.10 points ($5.00 per tick). More volatile than ES and NQ. Sensitive to domestic economic conditions.\n\nAll four have micro versions (MES, MNQ, MYM, M2K) at 1/10th the size. Micro contracts are ideal for small accounts and position sizing precision."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives equity index prices",
        "body": "Economic data releases are the primary short-term catalysts. Non-Farm Payrolls (first Friday of each month), CPI (inflation), FOMC rate decisions, GDP, and retail sales all move these markets. ES can move 30-50 points in minutes after a major release.\n\nEarnings season (January, April, July, October) creates concentrated volatility as major companies report quarterly results. A single mega-cap earnings miss (Apple, Nvidia) can move NQ significantly.\n\nFederal Reserve policy is the dominant macro driver. Interest rate expectations, quantitative tightening or easing, and Fed Chair commentary all influence index prices. The market often moves more on the Fed's forward guidance than on the actual rate decision.\n\nGeopolitical events, trade policy, fiscal legislation, and global economic conditions all play secondary roles. Equity indexes are broadly sensitive to anything that affects corporate earnings expectations or risk appetite."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "CME Globex electronic trading runs Sunday through Friday, 5:00 PM to 4:00 PM CT (6:00 PM to 5:00 PM ET), with a daily 60-minute maintenance break from 4:00 to 5:00 PM CT.\n\nRegular Trading Hours (RTH) for equity index futures align with NYSE hours: 8:30 AM to 3:15 PM CT (9:30 AM to 4:15 PM ET). This is when volume and liquidity peak. Over 70% of daily volume trades during RTH.\n\nThe overnight session (Globex) runs from 5:00 PM to 8:30 AM CT. Volume is lower and spreads can widen, especially between midnight and 3:00 AM CT. Asian and European market opens (around 7:00 PM CT and 2:00 AM CT respectively) create pockets of increased activity.\n\nThe first and last 30 minutes of RTH are typically the most volatile periods. Many day traders focus exclusively on the 8:30-10:00 AM CT window."
      },
      {
        "id": "who-trades",
        "heading": "Who trades equity index futures",
        "body": "Institutional investors use index futures for hedging equity portfolios, gaining temporary market exposure, and executing asset allocation changes. A pension fund might sell ES futures to reduce equity exposure without selling individual stocks.\n\nRetail day traders are the largest group of active participants by account count. ES and NQ are the most popular products for retail futures trading due to their liquidity, tick-by-tick price movement, and the availability of micro contracts.\n\nProp firm traders overwhelmingly trade ES and NQ. Nearly every futures prop firm evaluation is designed around these two products. If you are pursuing a funded account, you will almost certainly be trading equity index futures.\n\nAlgorithmic and high-frequency traders account for a significant portion of volume, providing liquidity and tightening spreads."
      }
    ],
    "contracts": [
      {
        "symbol": "ES",
        "name": "E-mini S&P 500",
        "exchange": "CME",
        "pointValue": "$50",
        "tickSize": "0.25",
        "tickValue": "$12.50",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Cash",
        "months": "H, M, U, Z (quarterly)",
        "micro": "MES ($5/pt)"
      },
      {
        "symbol": "NQ",
        "name": "E-mini Nasdaq-100",
        "exchange": "CME",
        "pointValue": "$20",
        "tickSize": "0.25",
        "tickValue": "$5.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Cash",
        "months": "H, M, U, Z (quarterly)",
        "micro": "MNQ ($2/pt)"
      },
      {
        "symbol": "YM",
        "name": "E-mini Dow",
        "exchange": "CBOT",
        "pointValue": "$5",
        "tickSize": "1",
        "tickValue": "$5.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Cash",
        "months": "H, M, U, Z (quarterly)",
        "micro": "MYM ($0.50/pt)"
      },
      {
        "symbol": "RTY",
        "name": "E-mini Russell 2000",
        "exchange": "CME",
        "pointValue": "$50",
        "tickSize": "0.10",
        "tickValue": "$5.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Cash",
        "months": "H, M, U, Z (quarterly)",
        "micro": "M2K ($5/pt)"
      }
    ],
    "relatedTerms": [
      {
        "term": "Futures Contract",
        "slug": "futures-contract"
      },
      {
        "term": "E-mini",
        "slug": "e-mini"
      },
      {
        "term": "Micro Contracts",
        "slug": "micro-contracts"
      },
      {
        "term": "Tick",
        "slug": "tick"
      },
      {
        "term": "Leverage",
        "slug": "leverage"
      },
      {
        "term": "Regular Trading Hours (RTH)",
        "slug": "rth"
      }
    ]
  },
  {
    "slug": "energy",
    "name": "Energy Futures",
    "shortName": "Energy",
    "color": "#EF9F27",
    "tagline": "Crude oil, natural gas, and refined products. Driven by global supply and demand, OPEC decisions, and geopolitics.",
    "tldr": "Energy futures cover crude oil (CL), natural gas (NG), and refined products like gasoline (RB) and heating oil (HO). Crude oil is the second most traded commodity future after ES. Energy markets are physically delivered, highly volatile, and sensitive to inventory reports, OPEC decisions, and weather.",
    "overview": [
      {
        "id": "what-are-energy-futures",
        "heading": "What are energy futures?",
        "body": "Energy futures are contracts on physical energy commodities. The most important is WTI Crude Oil (CL), which represents 1,000 barrels of light sweet crude oil deliverable at Cushing, Oklahoma. Natural Gas (NG) represents 10,000 MMBtu deliverable at Henry Hub, Louisiana.\n\nUnlike equity index futures, most energy contracts are physically settled. If you hold a CL contract to expiration, you are obligated to take or make delivery of 1,000 barrels of actual crude oil. Retail traders must close or roll their positions before first notice day.\n\nEnergy futures trade monthly, not quarterly. A new CL contract expires and a new one becomes the front month every month. This means rollover happens 12 times per year instead of 4."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "Crude Oil (CL) is the flagship energy contract. Each point is worth $1,000 (1,000 barrels x $1.00). Tick size is $0.01 ($10.00 per tick). Daily volume exceeds 1 million contracts. CL is highly liquid during RTH but can have wider spreads overnight.\n\nNatural Gas (NG) is extremely volatile. Each point is worth $10,000 (10,000 MMBtu x $1.00). Tick size is $0.001 ($10.00 per tick). NG can move 3-5% in a single session, making it one of the most volatile major futures contracts. Not recommended for beginners.\n\nRBOB Gasoline (RB) and Heating Oil (HO) are refined product futures. Each represents 42,000 gallons. They track the cost of wholesale gasoline and heating oil respectively. Lower volume than CL and NG.\n\nMicro Crude Oil (MCL) is 1/10th the size of CL at 100 barrels ($100 per point). Ideal for smaller accounts wanting energy exposure."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives energy prices",
        "body": "Weekly inventory reports from the EIA (Energy Information Administration) are the most important regular catalyst. Crude oil inventories are released every Wednesday at 9:30 AM CT. Builds (more supply) push prices down. Draws (less supply) push prices up. NG storage data comes out every Thursday.\n\nOPEC and OPEC+ production decisions directly impact crude oil supply. When OPEC cuts production, prices tend to rise. When they increase output, prices tend to fall. These decisions are made at scheduled meetings but can also come as surprises.\n\nGeopolitical risk is a constant factor. Conflicts in oil-producing regions (Middle East, Russia), sanctions, shipping disruptions (Strait of Hormuz, Red Sea), and trade disputes all affect supply expectations and risk premiums.\n\nWeather drives natural gas prices more than any other factor. Cold winters increase heating demand. Hot summers increase electricity demand (for air conditioning). Hurricane season (June-November) can disrupt Gulf of Mexico production."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "Energy futures trade on CME Globex from Sunday to Friday, 5:00 PM to 4:00 PM CT, with a daily 60-minute break.\n\nThe primary session for CL is 8:00 AM to 1:30 PM CT. This is when liquidity is deepest and the EIA inventory report is released (Wednesday at 9:30 AM CT).\n\nEnergy markets are sensitive to global events around the clock. Asian and European sessions can see significant moves on geopolitical news, production announcements, or weather events.\n\nThe 60-minute daily break (4:00-5:00 PM CT) applies to all CME energy products."
      },
      {
        "id": "who-trades",
        "heading": "Who trades energy futures",
        "body": "Commercial hedgers are the backbone of energy futures markets. Oil producers (ExxonMobil, Saudi Aramco), refiners, airlines, and shipping companies all use futures to lock in prices and manage risk. This is why energy futures exist.\n\nSpeculators and prop firm traders trade CL for its volatility and liquidity. A $1.00 move in crude oil is worth $1,000 per contract, creating significant profit potential. CL is a popular choice for funded accounts.\n\nAlgorithmic traders and CTAs (Commodity Trading Advisors) actively trade energy futures using trend-following and mean-reversion strategies.\n\nRetail traders should approach energy futures with caution. CL moves fast, the contract size is large ($70,000+ notional), and the physical delivery requirement adds complexity that equity index futures don't have. Start with MCL if you want energy exposure."
      }
    ],
    "contracts": [
      {
        "symbol": "CL",
        "name": "Crude Oil (WTI)",
        "exchange": "NYMEX",
        "pointValue": "$1,000",
        "tickSize": "$0.01",
        "tickValue": "$10.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "Monthly",
        "micro": "MCL ($100/pt)"
      },
      {
        "symbol": "NG",
        "name": "Natural Gas",
        "exchange": "NYMEX",
        "pointValue": "$10,000",
        "tickSize": "$0.001",
        "tickValue": "$10.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "Monthly",
        "micro": "QG ($2,500/pt)"
      },
      {
        "symbol": "RB",
        "name": "RBOB Gasoline",
        "exchange": "NYMEX",
        "pointValue": "$42,000",
        "tickSize": "$0.0001",
        "tickValue": "$4.20",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "Monthly",
        "micro": "None"
      },
      {
        "symbol": "HO",
        "name": "Heating Oil",
        "exchange": "NYMEX",
        "pointValue": "$42,000",
        "tickSize": "$0.0001",
        "tickValue": "$4.20",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "Monthly",
        "micro": "None"
      }
    ],
    "relatedTerms": [
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
      },
      {
        "term": "Delivery",
        "slug": "delivery"
      },
      {
        "term": "Rollover",
        "slug": "rollover"
      },
      {
        "term": "Settlement",
        "slug": "settlement"
      }
    ]
  },
  {
    "slug": "metals",
    "name": "Metals Futures",
    "shortName": "Metals",
    "color": "#AFA9EC",
    "tagline": "Gold, silver, copper, and platinum. Safe havens, industrial demand, and inflation hedges.",
    "tldr": "Metals futures cover precious metals (gold, silver, platinum) and base metals (copper). Gold (GC) is the most traded metals future and is widely used as an inflation hedge and safe-haven asset. Metals are physically delivered and trade nearly 24 hours. Micro Gold (MGC) makes the market accessible to smaller accounts.",
    "overview": [
      {
        "id": "what-are-metals-futures",
        "heading": "What are metals futures?",
        "body": "Metals futures are contracts on physical metals traded on COMEX (a division of CME Group). They are divided into precious metals (gold, silver, platinum, palladium) and base/industrial metals (copper).\n\nPrecious metals serve dual roles: they are industrial materials and financial assets. Gold in particular is treated as a store of value and a hedge against inflation, currency devaluation, and geopolitical uncertainty.\n\nLike energy futures, metals contracts are physically delivered. A GC contract represents 100 troy ounces of gold. If you hold to expiration, you are obligated to take or make delivery of physical gold. Retail traders close or roll before first notice day."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "Gold (GC) is the flagship metals contract. Each point is worth $100 (100 troy ounces x $1.00). Tick size is $0.10 ($10.00 per tick). With gold around $2,400 per ounce, one GC contract controls approximately $240,000 in notional value. Daily volume is strong.\n\nSilver (SI) is more volatile than gold and more sensitive to industrial demand. Each point is worth $5,000 (5,000 troy ounces x $1.00). Tick size is $0.005 ($25.00 per tick). The high tick value makes SI a large contract relative to account sizes.\n\nCopper (HG) is primarily an industrial metal used in construction, electronics, and infrastructure. Each point is worth $25,000 (25,000 lbs x $1.00). Often called \"Dr. Copper\" because its price is considered a barometer of global economic health.\n\nMicro Gold (MGC) at 10 troy ounces ($10 per point) and Micro Silver (SIL) at 1,000 ounces make precious metals trading accessible to smaller accounts."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives metals prices",
        "body": "Interest rates and the US dollar are the dominant drivers of gold prices. Gold doesn't pay interest or dividends. When real interest rates rise (rates minus inflation), the opportunity cost of holding gold increases and the price tends to fall. When real rates fall, gold becomes more attractive.\n\nThe US dollar has an inverse relationship with gold. When the dollar weakens, gold becomes cheaper for foreign buyers, increasing demand. When the dollar strengthens, gold tends to decline.\n\nInflation expectations drive gold as a hedge. During periods of high or accelerating inflation, investors buy gold to preserve purchasing power. This is why gold rallied significantly during the post-2020 inflation surge.\n\nCentral bank purchases have become an increasingly important demand source. China, Russia, India, and other central banks have been accumulating gold reserves, providing structural demand.\n\nIndustrial demand drives silver and copper more than gold. Silver is used in solar panels, electronics, and medical applications. Copper is essential for construction, EVs, and power infrastructure. Economic growth expectations directly affect their prices."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "Metals futures trade on CME Globex from Sunday to Friday, 5:00 PM to 4:00 PM CT, with a daily 60-minute break.\n\nThe primary session for gold is 7:20 AM to 12:30 PM CT. The London gold fix (around 9:00 AM CT) is an important reference price used by the physical market.\n\nMetals markets respond to Asian demand (particularly China and India for gold) during the Asian session and to European central bank activity during the London session. Significant moves can occur outside US trading hours.\n\nGold contract months follow a bi-monthly cycle (February, April, June, August, October, December) rather than quarterly."
      },
      {
        "id": "who-trades",
        "heading": "Who trades metals futures",
        "body": "Central banks and sovereign wealth funds are major participants in the gold market, primarily as buyers for reserve diversification.\n\nJewelers, miners, and industrial consumers hedge their exposure using futures. A gold mining company might sell GC futures to lock in production revenue.\n\nMacro traders and hedge funds use gold futures to express views on inflation, interest rates, and currency trends. Gold is a core component of many macro trading strategies.\n\nRetail traders trade gold for its trending characteristics and its sensitivity to macro events. GC tends to have cleaner trends than equity indexes, making it popular for trend-following strategies.\n\nFor most retail traders, MGC (Micro Gold) is the right starting point. Full-size GC at $240,000+ notional value requires significant capital and risk tolerance."
      }
    ],
    "contracts": [
      {
        "symbol": "GC",
        "name": "Gold",
        "exchange": "COMEX",
        "pointValue": "$100",
        "tickSize": "$0.10",
        "tickValue": "$10.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "Bi-monthly (G, J, M, Q, V, Z)",
        "micro": "MGC ($10/pt)"
      },
      {
        "symbol": "SI",
        "name": "Silver",
        "exchange": "COMEX",
        "pointValue": "$5,000",
        "tickSize": "$0.005",
        "tickValue": "$25.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, K, N, U, Z",
        "micro": "SIL ($1,000/pt)"
      },
      {
        "symbol": "HG",
        "name": "Copper",
        "exchange": "COMEX",
        "pointValue": "$25,000",
        "tickSize": "$0.0005",
        "tickValue": "$12.50",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, K, N, U, Z",
        "micro": "MHG ($2,500/pt)"
      },
      {
        "symbol": "PL",
        "name": "Platinum",
        "exchange": "NYMEX",
        "pointValue": "$50",
        "tickSize": "$0.10",
        "tickValue": "$5.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "F, J, N, V",
        "micro": "None"
      }
    ],
    "relatedTerms": [
      {
        "term": "Futures Contract",
        "slug": "futures-contract"
      },
      {
        "term": "Notional Value",
        "slug": "notional-value"
      },
      {
        "term": "Contango",
        "slug": "contango"
      },
      {
        "term": "Delivery",
        "slug": "delivery"
      },
      {
        "term": "Hedging",
        "slug": "hedging"
      },
      {
        "term": "Micro Contracts",
        "slug": "micro-contracts"
      }
    ]
  },
  {
    "slug": "treasuries",
    "name": "Treasury & Interest Rate Futures",
    "shortName": "Treasuries",
    "color": "#85B7EB",
    "tagline": "The bond market in futures form. Driven by Fed policy, inflation expectations, and the yield curve.",
    "tldr": "Treasury futures track US government bonds at various maturities. The 10-Year Note (ZN) and 30-Year Bond (ZB) are the most traded. These markets are directly influenced by Federal Reserve policy and inflation data. Treasury futures are among the most liquid contracts globally but require understanding of bond math and yield relationships.",
    "overview": [
      {
        "id": "what-are-treasury-futures",
        "heading": "What are treasury futures?",
        "body": "Treasury futures are contracts based on US government debt securities. They allow traders to speculate on or hedge against changes in interest rates without buying or selling actual bonds.\n\nThe contracts are priced in points and 32nds of a point (a holdover from the bond market's fractional pricing system). One point on ZN (10-Year Note) is worth $1,000. The minimum tick is one-half of 1/32 of a point, which equals $15.625 per tick.\n\nTreasury futures are physically delivered, meaning the short position must deliver eligible Treasury securities to the long position at expiration. In practice, most traders close or roll well before this happens."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "10-Year T-Note (ZN) is the most actively traded Treasury future. It tracks the 10-year US Treasury note and is the benchmark for mortgage rates and corporate borrowing costs. Each point is worth $1,000.\n\n30-Year T-Bond (ZB) tracks the long bond. More volatile than ZN because longer-duration bonds are more sensitive to interest rate changes. Each point is worth $1,000.\n\n5-Year T-Note (ZF) is popular for trading the middle of the yield curve. Less volatile than ZN and ZB. Each point is worth $1,000.\n\n2-Year T-Note (ZT) tracks short-term rates and is most sensitive to Fed policy expectations. Each point is worth $2,000.\n\nThe relationship between these contracts reflects the yield curve. Trading the spread between ZN and ZB (or ZN and ZT) lets you express views on yield curve steepening or flattening without taking outright directional risk."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives treasury prices",
        "body": "Federal Reserve policy is the dominant driver. Rate hikes push bond prices down (yields up). Rate cuts push bond prices up (yields down). The market often moves more on the Fed's forward guidance and dot-plot projections than on the actual rate decision.\n\nInflation data moves treasuries significantly. Higher-than-expected CPI, PPI, or PCE readings push bond prices down because inflation erodes the value of fixed coupon payments. Lower-than-expected readings push prices up.\n\nBond prices and yields move inversely. This is the most important concept for trading treasuries. When you buy ZN, you are betting that interest rates will fall (bond prices rise). When you sell ZN, you are betting rates will rise (bond prices fall).\n\nTreasury auctions (2-year, 5-year, 7-year, 10-year, and 30-year) occur regularly and can move markets. Strong demand at auction (low yields, high bid-to-cover ratios) is bullish for bond prices. Weak demand is bearish.\n\nEconomic growth expectations also matter. Strong growth tends to push rates higher (bearish for bonds). Recession fears push rates lower (bullish for bonds) as investors seek safety."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "Treasury futures trade on CME Globex from Sunday to Friday, 5:00 PM to 4:00 PM CT, with a daily 60-minute break.\n\nThe primary session runs 7:20 AM to 2:00 PM CT. Economic data releases (CPI, employment, GDP) typically occur at 7:30 AM CT and can cause immediate, large moves in treasuries.\n\nFOMC rate decisions are announced at 1:00 PM CT, followed by the Chair's press conference at 1:30 PM CT. These are the most volatile events for Treasury futures.\n\nTreasury futures are also heavily influenced by European trading, particularly during the London session. ECB policy decisions and European economic data can move US Treasuries."
      },
      {
        "id": "who-trades",
        "heading": "Who trades treasury futures",
        "body": "Banks and institutional investors are the primary participants. They use Treasury futures to hedge their bond portfolios, manage duration risk, and adjust interest rate exposure.\n\nMortgage companies and real estate firms hedge against rate changes using ZN and ZB futures.\n\nMacro hedge funds trade Treasury futures to express views on monetary policy, inflation, and economic growth. Yield curve trades (long one maturity, short another) are a staple strategy.\n\nRetail traders should understand that Treasury futures require knowledge of bond math, yield relationships, and the inverse price-yield dynamic. They are not as intuitive as equity index futures for beginners. However, for traders who understand these concepts, treasuries offer clean trends and high liquidity."
      }
    ],
    "contracts": [
      {
        "symbol": "ZN",
        "name": "10-Year T-Note",
        "exchange": "CBOT",
        "pointValue": "$1,000",
        "tickSize": "1/64",
        "tickValue": "$15.625",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "10Y ($100/pt)"
      },
      {
        "symbol": "ZB",
        "name": "30-Year T-Bond",
        "exchange": "CBOT",
        "pointValue": "$1,000",
        "tickSize": "1/32",
        "tickValue": "$31.25",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "None"
      },
      {
        "symbol": "ZF",
        "name": "5-Year T-Note",
        "exchange": "CBOT",
        "pointValue": "$1,000",
        "tickSize": "1/128",
        "tickValue": "$7.8125",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "None"
      },
      {
        "symbol": "ZT",
        "name": "2-Year T-Note",
        "exchange": "CBOT",
        "pointValue": "$2,000",
        "tickSize": "1/128",
        "tickValue": "$15.625",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "None"
      }
    ],
    "relatedTerms": [
      {
        "term": "Futures Contract",
        "slug": "futures-contract"
      },
      {
        "term": "Spread Trading",
        "slug": "spread-trading"
      },
      {
        "term": "Hedging",
        "slug": "hedging"
      },
      {
        "term": "Settlement",
        "slug": "settlement"
      },
      {
        "term": "Mark to Market",
        "slug": "mark-to-market"
      }
    ]
  },
  {
    "slug": "agriculture",
    "name": "Agricultural Futures",
    "shortName": "Agriculture",
    "color": "#97C459",
    "tagline": "Corn, wheat, soybeans, and livestock. The original futures markets, driven by weather, harvests, and global food demand.",
    "tldr": "Agricultural futures are the oldest futures markets, dating back to the 1800s at the Chicago Board of Trade. The major contracts are corn (ZC), wheat (ZW), soybeans (ZS), and soybean products. These markets are physically delivered, seasonal, and heavily influenced by weather, USDA crop reports, and global trade flows.",
    "overview": [
      {
        "id": "what-are-ag-futures",
        "heading": "What are agricultural futures?",
        "body": "Agricultural futures are contracts on physical commodities like grains, oilseeds, and livestock. These were the original futures markets. The Chicago Board of Trade (now part of CME Group) was founded in 1848 specifically to trade grain futures.\n\nThe purpose was straightforward: farmers could lock in a price for their harvest before it was planted, and buyers (millers, food companies) could lock in their input costs. This hedging function remains the core purpose of agricultural futures today.\n\nAll major agricultural contracts are physically delivered. A ZC (corn) contract represents 5,000 bushels. A ZW (wheat) contract represents 5,000 bushels. Retail traders must close or roll before first notice day."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "Corn (ZC) is the most traded agricultural future. Each point is worth $50 (5,000 bushels x $0.01). Tick size is 0.25 cents per bushel ($12.50 per tick). Corn is used for animal feed, ethanol production, and food products. The US is the world's largest producer.\n\nWheat (ZW) trades on CBOT and represents hard red winter wheat. Same contract size and tick value as corn. Wheat prices are influenced by global production (US, Russia, EU, Australia) and weather across multiple growing regions.\n\nSoybeans (ZS) represent 5,000 bushels per contract. Each point is worth $50. Tick size is 0.25 cents ($12.50 per tick). Soybeans are a major global protein source and oilseed. China is the largest importer, making trade relations a significant price factor.\n\nSoybean Oil (ZL) and Soybean Meal (ZM) are the crush products. Soybean processing (crushing) produces oil and meal. The spread between soybeans and its products (the crush spread) is a key fundamental indicator."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives agricultural prices",
        "body": "Weather is the single most important factor. Drought, excessive rain, frost, and heat waves during the growing season (April-September in the Northern Hemisphere) can dramatically affect crop yields and prices. A severe drought in the US Corn Belt can send ZC prices up 30-50% in weeks.\n\nUSDA reports are the major catalysts. The monthly WASDE (World Agricultural Supply and Demand Estimates) report, quarterly Grain Stocks report, and annual Prospective Plantings report all move markets. These are released at 11:00 AM CT and can cause limit-up or limit-down moves.\n\nGlobal trade flows matter significantly. US agricultural exports to China, weather in Brazil and Argentina (major soybean producers), and EU wheat production all influence prices. Trade disputes and tariffs have historically caused sharp price moves.\n\nSeasonality is more pronounced in agriculture than in any other futures market. Planting decisions (spring), growing season weather (summer), and harvest pressure (fall) create predictable seasonal patterns that traders study extensively.\n\nEthanol policy affects corn prices. About 40% of US corn goes to ethanol production. Changes in biofuel mandates or gasoline blending requirements directly impact corn demand."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "Agricultural futures trade on CME Globex from Sunday to Friday, 7:00 PM to 7:45 AM CT (electronic overnight), then the regular session runs 8:30 AM to 1:20 PM CT.\n\nNote that agricultural trading hours are different from equity and energy futures. The regular session is shorter (8:30 AM to 1:20 PM CT) and the overnight session has different hours than other CME products.\n\nUSDA reports released at 11:00 AM CT create the most volatility. Many agricultural traders are flat before major USDA releases because the moves can be extreme and fast.\n\nLiquidity is concentrated during the regular session. Overnight trading exists but spreads are wider and depth is thinner than during the day."
      },
      {
        "id": "who-trades",
        "heading": "Who trades agricultural futures",
        "body": "Commercial hedgers are the largest participants by volume. Farmers, grain elevators, food processors (Cargill, ADM, Bunge), and ethanol producers all use futures to manage price risk. This is the original use case for futures markets.\n\nCTAs and managed futures funds actively trade agricultural markets as part of diversified commodity portfolios. Trend-following strategies work well in agriculture because weather-driven supply shocks create sustained price trends.\n\nRetail traders should be aware that agricultural futures have different characteristics than equity indexes. Trading hours are shorter, liquidity is lower, and the markets are influenced by factors (weather, USDA reports) that require specialized knowledge. Limit-up and limit-down moves are more common in agriculture than in other futures markets.\n\nAgricultural futures can be excellent for diversification. They have low correlation to equity markets, providing genuine portfolio diversification that few other asset classes offer."
      }
    ],
    "contracts": [
      {
        "symbol": "ZC",
        "name": "Corn",
        "exchange": "CBOT",
        "pointValue": "$50",
        "tickSize": "0.25c",
        "tickValue": "$12.50",
        "hours": "Sun-Fri, 7PM-7:45AM & 8:30AM-1:20PM CT",
        "settlement": "Physical",
        "months": "H, K, N, U, Z",
        "micro": "None"
      },
      {
        "symbol": "ZW",
        "name": "Wheat",
        "exchange": "CBOT",
        "pointValue": "$50",
        "tickSize": "0.25c",
        "tickValue": "$12.50",
        "hours": "Sun-Fri, 7PM-7:45AM & 8:30AM-1:20PM CT",
        "settlement": "Physical",
        "months": "H, K, N, U, Z",
        "micro": "None"
      },
      {
        "symbol": "ZS",
        "name": "Soybeans",
        "exchange": "CBOT",
        "pointValue": "$50",
        "tickSize": "0.25c",
        "tickValue": "$12.50",
        "hours": "Sun-Fri, 7PM-7:45AM & 8:30AM-1:20PM CT",
        "settlement": "Physical",
        "months": "F, H, K, N, Q, U, X",
        "micro": "None"
      },
      {
        "symbol": "ZM",
        "name": "Soybean Meal",
        "exchange": "CBOT",
        "pointValue": "$100",
        "tickSize": "$0.10",
        "tickValue": "$10.00",
        "hours": "Sun-Fri, 7PM-7:45AM & 8:30AM-1:20PM CT",
        "settlement": "Physical",
        "months": "F, H, K, N, Q, V, Z",
        "micro": "None"
      },
      {
        "symbol": "ZL",
        "name": "Soybean Oil",
        "exchange": "CBOT",
        "pointValue": "$600",
        "tickSize": "$0.01",
        "tickValue": "$6.00",
        "hours": "Sun-Fri, 7PM-7:45AM & 8:30AM-1:20PM CT",
        "settlement": "Physical",
        "months": "F, H, K, N, Q, V, Z",
        "micro": "None"
      }
    ],
    "relatedTerms": [
      {
        "term": "Futures Contract",
        "slug": "futures-contract"
      },
      {
        "term": "Delivery",
        "slug": "delivery"
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
        "term": "Limit Up / Limit Down",
        "slug": "limit-up-limit-down"
      },
      {
        "term": "Hedging",
        "slug": "hedging"
      }
    ]
  },
  {
    "slug": "currencies",
    "name": "Currency Futures",
    "shortName": "Currencies",
    "color": "#F0997B",
    "tagline": "Major world currencies traded as futures on CME. An alternative to spot forex with exchange-traded transparency.",
    "tldr": "Currency futures are exchange-traded contracts on major world currencies including the Euro (6E), Japanese Yen (6J), British Pound (6B), and Australian Dollar (6A). They offer an alternative to spot forex with the benefits of centralized clearing, standardized contracts, and regulatory oversight. Less popular with retail traders than spot forex but preferred by institutional participants.",
    "overview": [
      {
        "id": "what-are-currency-futures",
        "heading": "What are currency futures?",
        "body": "Currency futures are standardized contracts to buy or sell a specific amount of a foreign currency at a set price on a future date. They trade on the CME (Chicago Mercantile Exchange) and are regulated by the CFTC.\n\nUnlike spot forex, which trades over-the-counter (OTC) through a network of banks and brokers, currency futures trade on a centralized exchange. This means transparent pricing, a central clearinghouse (reducing counterparty risk), and standardized contract sizes.\n\nCurrency futures are cash-settled in US dollars. The contract value is based on the foreign currency's value in USD. When you buy a 6E (Euro) contract, you are betting the Euro will strengthen against the US Dollar."
      },
      {
        "id": "major-contracts",
        "heading": "The major contracts",
        "body": "Euro FX (6E) is the most traded currency future. Each contract represents 125,000 Euros. Each point ($0.0001) is worth $12.50. The Euro is the second most traded currency globally after the USD.\n\nJapanese Yen (6J) represents 12,500,000 Yen per contract. Each tick ($0.0000005) is worth $6.25. The Yen is a safe-haven currency that tends to strengthen during global risk-off events.\n\nBritish Pound (6B) represents 62,500 Pounds per contract. Each point ($0.0001) is worth $6.25. Sensitive to Bank of England policy and UK economic data.\n\nAustralian Dollar (6A) represents 100,000 AUD per contract. Each point ($0.0001) is worth $10.00. Correlated with commodity prices, particularly iron ore and copper, due to Australia's resource-heavy economy.\n\nUS Dollar Index (DX) trades on ICE (not CME) and measures the dollar against a basket of six major currencies. It's a useful reference for overall dollar strength.\n\nMicro currency futures are available for major pairs at 1/10th the size."
      },
      {
        "id": "what-drives-prices",
        "heading": "What drives currency prices",
        "body": "Interest rate differentials are the primary driver of currency movements. Capital flows toward higher-yielding currencies. When the Fed raises rates while the ECB holds steady, the dollar tends to strengthen against the Euro (6E falls).\n\nCentral bank policy decisions and forward guidance move currencies significantly. FOMC, ECB, BOJ, and BOE meetings are the most important events for the respective currency futures.\n\nEconomic data relative to expectations drives short-term moves. Employment, inflation, GDP, and trade balance data from the relevant economies affect each currency pair.\n\nRisk sentiment influences certain currencies more than others. The Japanese Yen and Swiss Franc tend to strengthen during risk-off environments (stock market selloffs, geopolitical crises). The Australian Dollar and emerging market currencies tend to weaken.\n\nTrade balances and capital flows affect currencies over longer timeframes. Countries with persistent trade surpluses (Japan, Germany) tend to have stronger currencies over time."
      },
      {
        "id": "trading-hours",
        "heading": "Trading hours and sessions",
        "body": "Currency futures trade on CME Globex from Sunday to Friday, 5:00 PM to 4:00 PM CT, with a daily 60-minute break.\n\nUnlike most other futures, currency markets are truly global and active around the clock. The Asian session (5:00 PM to midnight CT), London session (2:00 AM to 10:00 AM CT), and US session (7:00 AM to 4:00 PM CT) each bring different levels of activity.\n\nThe London/US overlap (7:00 AM to 10:00 AM CT) typically has the deepest liquidity. Major economic releases from the US (7:30 AM CT) and European data (2:00-4:00 AM CT) create the biggest moves.\n\nCurrency futures volume is lower than spot forex volume. The FX spot market trades over $6 trillion daily, while CME currency futures volume is a fraction of that. However, futures liquidity is more than sufficient for retail trading."
      },
      {
        "id": "who-trades",
        "heading": "Who trades currency futures",
        "body": "Multinational corporations are major users of currency futures. A US company expecting a large Euro payment in 3 months might buy 6E futures to lock in the exchange rate and eliminate currency risk.\n\nInstitutional investors use currency futures for portfolio hedging and currency overlay strategies. A US pension fund investing in European stocks might sell 6E futures to hedge the Euro exposure.\n\nRetail traders have the choice between spot forex and currency futures. Spot forex offers higher leverage, smaller minimum sizes, and 24/5 availability through retail brokers. Currency futures offer exchange-traded transparency, central clearing, and potentially better regulatory protection.\n\nMost retail futures traders focused on prop firm evaluations will trade ES and NQ rather than currency futures. However, currency futures can be a good diversification option for traders who understand macro economics and central bank dynamics."
      }
    ],
    "contracts": [
      {
        "symbol": "6E",
        "name": "Euro FX",
        "exchange": "CME",
        "pointValue": "$125,000",
        "tickSize": "$0.00005",
        "tickValue": "$6.25",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "M6E ($12,500)"
      },
      {
        "symbol": "6J",
        "name": "Japanese Yen",
        "exchange": "CME",
        "pointValue": "12,500,000 JPY",
        "tickSize": "$0.0000005",
        "tickValue": "$6.25",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "M6J"
      },
      {
        "symbol": "6B",
        "name": "British Pound",
        "exchange": "CME",
        "pointValue": "$62,500",
        "tickSize": "$0.0001",
        "tickValue": "$6.25",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "M6B"
      },
      {
        "symbol": "6A",
        "name": "Australian Dollar",
        "exchange": "CME",
        "pointValue": "$100,000",
        "tickSize": "$0.0001",
        "tickValue": "$10.00",
        "hours": "Sun-Fri, 5PM-4PM CT",
        "settlement": "Physical",
        "months": "H, M, U, Z (quarterly)",
        "micro": "M6A"
      }
    ],
    "relatedTerms": [
      {
        "term": "Futures Contract",
        "slug": "futures-contract"
      },
      {
        "term": "Hedging",
        "slug": "hedging"
      },
      {
        "term": "Spread Trading",
        "slug": "spread-trading"
      },
      {
        "term": "Leverage",
        "slug": "leverage"
      },
      {
        "term": "Liquidity",
        "slug": "liquidity"
      }
    ]
  }
];

export function getMarketBySlug(slug) {
  return marketGuides.find(m => m.slug === slug);
}

export function getAdjacentMarkets(slug) {
  const idx = marketGuides.findIndex(m => m.slug === slug);
  return {
    prev: idx > 0 ? marketGuides[idx - 1] : null,
    next: idx < marketGuides.length - 1 ? marketGuides[idx + 1] : null,
  };
}
