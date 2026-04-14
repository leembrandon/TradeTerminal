// Strategy guide data

export const strategyGuides = [
  {
    "slug": "opening-range-breakout",
    "learnPhase": 5,
    "learnOrder": 1,
    "name": "Opening Range Breakout",
    "shortName": "ORB",
    "color": "#5DCAA5",
    "difficulty": "Beginner",
    "timeframe": "Any session",
    "holdTime": "Minutes to hours",
    "tagline": "Define the first 15-30 minutes of RTH, then trade the directional break. The most taught beginner futures strategy.",
    "tldr": "The opening range breakout (ORB) strategy defines the high and low of the first 15 or 30 minutes of regular trading hours, then enters a trade when price breaks above or below that range. It works because the opening range captures the first wave of institutional activity, and a clean break often signals the session's direction. Best on days with a narrow opening range relative to recent averages.",
    "sections": [
      {
        "id": "what-is-orb",
        "heading": "What is the opening range breakout?",
        "body": "The opening range breakout is one of the oldest and most straightforward trading strategies. The concept is simple: let the market establish a range in the first minutes of any session, then trade the first clean break of that range.\n\nThe logic behind it is sound. The beginning of any session brings a surge of order flow. Large funds execute positions, orders get filled, and the market digests recent news. The range that forms during this initial period reflects the consensus between buyers and sellers at that moment.\n\nWhen price breaks out of this range with conviction, it suggests one side has won the opening battle. The breakout often leads to a sustained move as trapped traders on the wrong side exit and momentum traders pile on.\n\nWhile ORB is traditionally associated with the US RTH open (8:30 AM CT for equity index futures), the same concept applies to any session open. Traders increasingly apply ORB to the London open (~2:00 AM CT), the Asia open (~5:00 PM CT), or even the start of the overnight Globex session. The key is defining a clear opening period for whatever session you're trading."
      },
      {
        "id": "setup-rules",
        "heading": "The setup rules",
        "body": "Define the opening range. Mark the high and low of the first 15 minutes (aggressive) or 30 minutes (conservative) after your chosen session opens. For US equity index futures, the traditional ORB uses the RTH open at 8:30 AM CT. For London session ORB, use the 2:00-3:00 AM CT window. For any session, the principle is the same: mark the range of the first defined period.\n\nWait for a breakout. A valid breakout is a close of a 1-minute or 5-minute candle above the opening range high (for longs) or below the opening range low (for shorts). A wick poking above isn't enough. You want a clean close beyond the level.\n\nEntry. Enter on the breakout candle close or on a pullback to the broken level. Breakout entries are faster but more aggressive. Pullback entries offer better risk-reward but you may miss the move if price doesn't pull back.\n\nStop loss. Place your stop on the opposite side of the opening range. If you're long on a break above the OR high, your stop goes below the OR low. This gives you a clear invalidation: if price returns to the opposite end of the range, the breakout failed.\n\nProfit target. A common target is 1x the opening range width projected from the breakout point. If the OR is 10 points on ES and price breaks above at 5,210, the target is 5,220. More aggressive targets use 1.5x or 2x the range width."
      },
      {
        "id": "filters",
        "heading": "Filters that improve the strategy",
        "body": "Opening range width matters more than anything else. Compare today's OR to the average OR of the past 10-20 sessions (for the same session you're trading). A narrow OR (bottom 25% of recent averages) produces higher-probability breakouts because the market hasn't committed to a direction yet. A wide OR (top 25%) often means the session's move has already happened.\n\nSession context adds information. During the London session, watch how price reacted to Asia's range. During RTH, check the overnight range and any gaps. Each session builds on the prior one, and breakouts that align with the broader directional context have higher follow-through.\n\nVolume on the breakout candle should be above average for that session. A breakout on thin volume is more likely to fail. Note that volume thresholds are different for each session. Overnight breakouts will have lower absolute volume than RTH breakouts, so compare to the session's own average.\n\nAvoid trading ORB around major scheduled events if the event occurs during or shortly after your opening range period. The range is less meaningful when the real catalyst comes later."
      },
      {
        "id": "when-it-works",
        "heading": "When ORB works and when it fails",
        "body": "ORB works best on trend days. When the market has directional conviction (strong overnight move, clear catalyst, narrow opening range), the breakout often leads to a sustained multi-hour trend. These are the home run days for ORB traders.\n\nORB works well on days following tight consolidation. If ES has been in a narrow range for 2-3 days, the ORB on the day the range breaks tends to be powerful.\n\nORB fails on choppy, range-bound days. If the market is directionless, price will break above the OR high, reverse to the OR low, break below that, and reverse again. This creates a series of false breakouts that trigger stops in both directions.\n\nORB fails when the opening range is wide. A 30-point OR on ES means your stop (from OR high to OR low) is 30 points ($1,500 per contract). The risk-reward doesn't work unless you expect a 60+ point move, which is unusual on most days."
      },
      {
        "id": "example",
        "heading": "Worked example on ES",
        "body": "RTH example on ES. ES opens at 8:30 AM CT. In the first 15 minutes, it trades between 5,195 and 5,205. The opening range is 10 points. The 20-day average OR is 16 points, so today's is narrow. The market gapped up 8 points from yesterday's close.\n\nAt 8:47 AM, a 5-minute candle closes at 5,206.50, above the OR high of 5,205. Volume on the breakout candle is 40% above average.\n\nEntry: buy at 5,207 (just above the breakout close). Stop: 5,194 (below the OR low, 13 points risk, $650 per contract). Target: 5,217 (1x OR width projected from OR high). Risk-reward is approximately 1:0.77, which is tight. Alternative target at 1.5x range: 5,220, giving 1:1.15 risk-reward.\n\nLondon session example on ES. At 2:00 AM CT, the London session begins. ES has been drifting in a tight range during Asia. The London OR (2:00-2:30 AM) is 5,188-5,193, just 5 points. At 2:35 AM, ES breaks below 5,188 on a pickup in volume as European traders enter.\n\nEntry: short at 5,187. Stop: 5,194 (above OR high, 7 points). Target: 5,182 (1x range). ES drops to 5,178 by 4:00 AM as the London session develops a downtrend. The narrow London OR signaled that the overnight balance was about to break, and the European session provided the directional catalyst."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Trading every opening range breakout without checking OR width",
        "fix": "Narrow ORs produce the best breakouts. If the OR is already wider than the average daily range, there's no edge in the breakout. Compare to the 10-20 day average OR before entering."
      },
      {
        "mistake": "Entering before the breakout candle closes",
        "fix": "A wick above the OR high is not a breakout. Wait for a candle to close beyond the level. Premature entries get caught in false breakouts regularly."
      },
      {
        "mistake": "Using a tight stop inside the opening range",
        "fix": "The invalidation level is the opposite side of the OR. If your stop is inside the range, normal noise will stop you out before the real move develops."
      }
    ],
    "relatedTerms": [
      {
        "term": "Opening Range",
        "slug": "opening-range"
      },
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
    ]
  },
  {
    "slug": "vwap-pullback",
    "learnPhase": 5,
    "learnOrder": 2,
    "name": "VWAP Pullback",
    "shortName": "VWAP Pullback",
    "color": "#AFA9EC",
    "difficulty": "Intermediate",
    "timeframe": "Any session",
    "holdTime": "Minutes to hours",
    "tagline": "Buy pullbacks to VWAP in an uptrend, sell rallies to VWAP in a downtrend. The institutional benchmark strategy.",
    "tldr": "The VWAP pullback strategy enters trades when price pulls back to the Volume Weighted Average Price during a trending session. It works because institutions use VWAP as a benchmark and tend to buy below it and sell above it, creating a self-fulfilling support/resistance level. The key is identifying trend days early and only taking pullbacks in the direction of the trend.",
    "sections": [
      {
        "id": "what-is-vwap-pullback",
        "heading": "What is the VWAP pullback strategy?",
        "body": "The VWAP pullback strategy is built on one core idea: during a trending session, price will periodically pull back to VWAP before continuing in the trend direction. Your job is to identify the trend, wait for the pullback, and enter at VWAP.\n\nThis works because of how institutions use VWAP. Large funds benchmark their execution quality against VWAP. If a fund needs to buy 5,000 ES contracts during the day, their traders are measured on whether they bought above or below VWAP. This creates natural buying pressure below VWAP and selling pressure above it.\n\nThe result is that on a genuine trend session, VWAP acts as dynamic support (in an uptrend) or dynamic resistance (in a downtrend). Price pulls back to VWAP, institutional flow absorbs the pullback, and the trend resumes.\n\nVWAP is traditionally anchored to the RTH open, but many traders also use a 24-hour VWAP (anchored to the Globex open at 5:00 PM CT) or session-specific VWAPs for London and Asia. The choice of anchor affects where the level sits. For day trading during RTH, the RTH-anchored VWAP is standard. For overnight trading, a Globex-anchored or custom-anchored VWAP is more relevant."
      },
      {
        "id": "setup-rules",
        "heading": "The setup rules",
        "body": "Identify a trend day early. The first clue is the opening range breakout. If ES breaks above the opening range with volume and price stays above VWAP for the first 30-60 minutes, you likely have an uptrend day. The reverse signals a downtrend day.\n\nWait for the pullback. After the initial trend move, price will pull back toward VWAP. This is the setup. Don't chase the initial move. Let price come to you.\n\nEntry. Buy when price touches or gets within 1-2 points of VWAP and shows a rejection (a wick below VWAP that closes above, a strong buying candle off VWAP, or visible absorption on the DOM). The more precise your entry at VWAP, the tighter your stop can be.\n\nStop loss. Place your stop 3-5 points below VWAP for ES (adjust proportionally for other products). If price breaks significantly below VWAP, the trend thesis is invalidated.\n\nProfit target. Target the prior swing high (the peak before the pullback began). More aggressive targets use the VWAP +1 or +2 standard deviation band. Trail your stop to VWAP on subsequent pullbacks to lock in gains."
      },
      {
        "id": "identifying-trend-days",
        "heading": "How to identify trend days",
        "body": "Not every day is a trend day. Applying VWAP pullbacks on a range day will result in repeated losses as price crosses VWAP back and forth. You need to filter for trend days specifically.\n\nNarrow opening range is the first signal. When the first 30 minutes produce a range that is below the 10-day average, the market hasn't committed yet. The subsequent breakout often initiates a trend.\n\nPrice relationship to VWAP is critical. On a true uptrend day, price stays above VWAP for the entire session. It may dip to touch VWAP but never closes a 5-minute candle significantly below it. The moment price starts crossing VWAP repeatedly, the trend is over.\n\nInternals confirmation helps. If the NYSE TICK is consistently above +300 (uptrend) or below -300 (downtrend), the broader market supports the trend. Single-stock futures like ES benefit from broad market participation.\n\nVolume on the trend move should be above average. Trends on low volume are more likely to reverse."
      },
      {
        "id": "when-it-works",
        "heading": "When it works and when it fails",
        "body": "VWAP pullbacks work best on clear directional days driven by a catalyst: a strong earnings report from a mega-cap stock, an economic data surprise, or a Fed decision. These create sustained one-directional flow that makes VWAP a reliable support/resistance level.\n\nThe strategy produces 2-4 high-quality entries per trend day. The first pullback to VWAP after the initial breakout is typically the highest probability. Each subsequent pullback carries slightly more risk as the trend matures.\n\nVWAP pullbacks fail on range days (the most common day type). If the market is rotating between support and resistance with no directional bias, VWAP will be crossed repeatedly and every pullback entry will get stopped out.\n\nThe strategy also fails when VWAP is flat. A flat VWAP means price is consolidating around the average and there's no trend. VWAP needs to be sloping visibly on the chart for pullback entries to work."
      },
      {
        "id": "example",
        "heading": "Worked example on ES",
        "body": "CPI data comes in cooler than expected at 7:30 AM CT. ES gaps up 15 points from the prior close. The opening range (8:30-9:00 AM) is 5,215-5,225 (10 points, below the 16-point average). ES breaks above 5,225 at 9:05 AM with strong volume. VWAP at this point is approximately 5,220.\n\nFirst pullback: at 9:45 AM, ES pulls back from 5,235 to 5,222, touching VWAP. A 5-minute candle shows a long wick below VWAP at 5,219 but closes at 5,223 (above VWAP). This is the entry signal.\n\nEntry: buy at 5,223. Stop: 5,217 (6 points below, $300 per contract). Target: 5,235 (prior swing high, 12 points, $600). Risk-reward: 1:2.\n\nES rallies from the VWAP touch to 5,240 by 11:00 AM. VWAP has risen to 5,225. A second pullback to VWAP at 5,225 provides another entry opportunity with the same setup.\n\nThe key detail: VWAP was sloping upward all morning, price never closed a 5-minute bar below VWAP, and the pullbacks were shallow (3-5 points). All signs of a healthy trend."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Taking VWAP pullback entries on range days",
        "fix": "This strategy only works on trend days. If price has crossed VWAP more than twice in the first 90 minutes, it's a range day. Don't force VWAP pullback trades."
      },
      {
        "mistake": "Entering at VWAP without waiting for a reaction",
        "fix": "VWAP alone isn't enough. Wait for a rejection candle, absorption on the DOM, or a bounce off VWAP before entering. Blindly buying at VWAP on a day that's rolling over will produce losses."
      },
      {
        "mistake": "Using the same stop distance regardless of volatility",
        "fix": "On a high-volatility day, a 3-point stop below VWAP on ES may get hit by normal noise. Adjust your stop based on current ATR or recent pullback depth. The stop needs to be beyond the expected noise level."
      }
    ],
    "relatedTerms": [
      {
        "term": "VWAP",
        "slug": "vwap"
      },
      {
        "term": "Regular Trading Hours (RTH)",
        "slug": "rth"
      },
      {
        "term": "Volume Profile",
        "slug": "volume-profile"
      },
      {
        "term": "Opening Range",
        "slug": "opening-range"
      },
      {
        "term": "Risk-Reward Ratio",
        "slug": "risk-reward-ratio"
      }
    ]
  },
  {
    "slug": "gap-fill",
    "learnPhase": 5,
    "learnOrder": 3,
    "name": "Gap Fill Strategy",
    "shortName": "Gap Fill",
    "color": "#EF9F27",
    "difficulty": "Intermediate",
    "timeframe": "Any session",
    "holdTime": "30 minutes to 3 hours",
    "tagline": "Trade the tendency for overnight gaps to fill during regular trading hours. Simple concept, nuanced execution.",
    "tldr": "The gap fill strategy trades the statistical tendency of futures prices to return to the prior session's close after an overnight gap. Common gaps (small, no catalyst) fill most of the time. Breakaway gaps (large, catalyst-driven) often don't. The strategy enters against the gap direction after RTH opens and targets the prior close as the fill level.",
    "sections": [
      {
        "id": "what-is-gap-fill",
        "heading": "What is the gap fill strategy?",
        "body": "A gap occurs when a session's opening price is significantly different from the prior session's close. The most common gap is between the RTH close and the next RTH open. If ES closed at 5,200 during RTH yesterday and opens at 5,212 today, there's a 12-point gap up.\n\nBut gaps also occur between other sessions. The London open can gap from the Asia close. The RTH open can gap from the London close. Any time there's a price discontinuity between one defined session and the next, a gap exists.\n\nThe gap fill strategy bets that price will return to the prior session's close (fill the gap) during the current session. This works because gaps represent a price level where no trading occurred during the reference session. The market tends to revisit these untraded levels, especially when the gap is caused by routine order flow rather than a major catalyst.\n\nResearch on ES suggests that RTH gaps of 5-15 points fill approximately 60-70% of the time within the session. Smaller gaps fill more often. Larger gaps (20+ points) fill less often, particularly when driven by a catalyst like economic data or a Fed decision."
      },
      {
        "id": "setup-rules",
        "heading": "The setup rules",
        "body": "Measure the gap. Calculate the difference between the current session's open and the prior session's close. This is your gap size. Note the direction (gap up or gap down). For RTH gaps, this is RTH close to RTH open. For London gaps, compare to the Asia session close.\n\nClassify the gap. Is it a common gap (small, 5-15 points on ES, no clear catalyst) or a breakaway gap (large, 20+ points, driven by news, data, or a major event)? Common gaps are your setups. Breakaway gaps are not.\n\nWait for a failed continuation. Don't fade the gap immediately. Let the first 15-30 minutes of the session play out. If a gap-up stalls and starts to reverse, or if the opening range breakout fails in the gap direction, the fill setup is developing.\n\nEntry. Enter in the gap-fill direction when price shows a reversal pattern after failing to extend the gap. For a gap up, this means selling after a failed breakout above the opening range high or after a break below the opening range low.\n\nStop loss. Place your stop above the session high (for fading a gap up) or below the session low (for fading a gap down). This gives the trade room but caps your risk at the gap extreme.\n\nTarget. The prior session's close is your primary target. This is the gap fill level. Partial profits at 50% of the gap are a common risk management approach."
      },
      {
        "id": "gap-types",
        "heading": "Which gaps fill and which don't",
        "body": "Common gaps fill most of the time. These are gaps caused by routine overnight order flow, minor overseas developments, or normal pre-market activity. They're typically 5-15 points on ES. The market opens, tests the gap direction briefly, and then reverses to fill.\n\nBreakaway gaps are dangerous to fade. These are large gaps (20+ points on ES) driven by a clear catalyst: CPI surprise, FOMC decision, major earnings, geopolitical event. The catalyst has shifted the market's view of fair value, and the gap represents a genuine repricing. Fading these is fighting the new reality.\n\nExhaustion gaps occur at the end of extended trends. The market gaps in the trend direction one more time, but the move is exhausted. These fill quickly and can signal a trend reversal. They're harder to identify in real time.\n\nThe key rule: if you can't identify why the gap happened, it's probably a common gap and likely to fill. If there's an obvious catalyst, be cautious about fading it."
      },
      {
        "id": "when-it-works",
        "heading": "When it works and when it fails",
        "body": "Gap fills work best on quiet days with small gaps and no major data releases scheduled. The overnight session produced a small directional move, but there's no catalyst to sustain it during RTH. Price drifts back to the prior close as the institutional session normalizes.\n\nGap fills work well when the gap takes price to a known resistance or support level. If ES gaps up into yesterday's high (a natural resistance level), the combination of gap fill tendency and resistance creates a higher-probability short.\n\nGap fills fail when there's a genuine catalyst behind the gap. If CPI came in hot and ES gapped down 25 points, fading that gap means you're betting the inflation data doesn't matter. It usually does.\n\nGap fills also fail on trend days. If the gap direction is the trend direction and the opening range breaks in that direction, the gap may not only not fill but price may continue aggressively away from the prior close."
      },
      {
        "id": "example",
        "heading": "Worked example on ES",
        "body": "ES closed at 5,200 yesterday. Overnight, ES drifted up on light volume with no clear catalyst. ES opens at 5,209 at 8:30 AM CT, a 9-point gap up. No major economic data today.\n\nThe opening range (8:30-8:45 AM) is 5,207-5,213. At 8:50 AM, ES pushes to 5,214 (just above the OR high) but the breakout fails. A 5-minute candle closes back inside the range at 5,210. Volume on the failed breakout is below average.\n\nEntry: short at 5,209 (below OR midpoint, after the failed breakout). Stop: 5,215 (above session high, 6 points risk, $300 per contract). Target: 5,200 (prior close / gap fill, 9 points, $450). Risk-reward: 1:1.5.\n\nES sells off from 5,209 and fills the gap at 5,200 by 10:30 AM. The fill took about 2 hours. Partial profit at 5,204 (half the gap) secured some gains in case the fill was incomplete.\n\nThis setup worked because: the gap was small (9 points), there was no catalyst, the opening range breakout in the gap direction failed, and volume was light."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Fading every gap regardless of size and catalyst",
        "fix": "Only fade common gaps (small, no catalyst). Breakaway gaps driven by economic data, Fed decisions, or major news are genuine repricings. Fading them puts you on the wrong side of a fundamental shift."
      },
      {
        "mistake": "Entering the fade at the RTH open before seeing how the market trades",
        "fix": "Wait for the first 15-30 minutes. If the gap extends with volume, it's a breakaway gap and fading it is wrong. Let the opening range form and look for failed continuation before entering."
      },
      {
        "mistake": "Holding for the full gap fill when momentum is turning",
        "fix": "Take partial profits at 50% of the gap. Some gaps fill 80% and then reverse. Waiting for the exact prior close while giving back profits is unnecessary. Partial fills are wins."
      }
    ],
    "relatedTerms": [
      {
        "term": "Gap",
        "slug": "gap"
      },
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
    ]
  },
  {
    "slug": "support-resistance-bounce",
    "learnPhase": 5,
    "learnOrder": 4,
    "name": "Support/Resistance Bounce",
    "shortName": "S/R Bounce",
    "color": "#F0997B",
    "difficulty": "Beginner",
    "timeframe": "Any session",
    "holdTime": "Minutes to days",
    "tagline": "Buy at support, sell at resistance. The most fundamental setup in all of trading.",
    "tldr": "The support/resistance bounce strategy enters trades at price levels where buying or selling pressure has historically concentrated. Buy when price pulls back to support and shows a rejection. Sell when price rallies to resistance and stalls. The edge comes from level selection (confluence of multiple S/R types) and confirmation (not blindly buying every touch of a level).",
    "sections": [
      {
        "id": "what-is-sr-bounce",
        "heading": "What is the S/R bounce strategy?",
        "body": "The support/resistance bounce is the most fundamental trading strategy. The idea is simple: identify a price level where the market has previously reversed, wait for price to return to that level, and trade the expected bounce.\n\nSupport levels are prices where buying pressure overwhelmed selling pressure in the past. When price returns to support, traders expect buyers to step in again. Resistance levels are the opposite: prices where selling pressure stopped advances.\n\nThis strategy works because markets have memory. A level where a significant number of traders bought or sold creates a reference point. When price returns to that level, those same participants (and others watching the same level) react. Buyers at support don't want to see their level broken. Sellers at resistance don't want to see theirs broken. This creates the bounce."
      },
      {
        "id": "setup-rules",
        "heading": "The setup rules",
        "body": "Identify your levels before the session starts. Pre-market preparation is essential. Mark the following on your chart: yesterday's high, low, and close. The current session's opening range high and low. The prior session's Point of Control (POC) and value area boundaries (VAH, VAL). Any multi-day swing highs or lows that are near the current price.\n\nWait for price to reach a level. Don't anticipate. Let price come to your level. If you've marked support at 5,190, wait until ES actually trades at or near 5,190.\n\nLook for confirmation. A bounce off a level is not confirmed until you see a rejection signal. This can be a long wick (price dips below support but closes above), a strong reversal candle, volume increasing on the bounce, or visible absorption on the DOM (large resting bids holding at the level).\n\nEntry. Enter after confirmation, not on the first touch. The entry price will be slightly worse than the absolute low, but the probability of success is much higher.\n\nStop loss. Place your stop beyond the level by 2-4 ticks on ES. If support is at 5,190, your stop goes at 5,188.50 or 5,188. If the level breaks by that much, it's no longer support.\n\nTarget. The opposite end of the range, the prior session's POC, or a measured move (1x the height of the recent swing). Take partial profits at the first significant resistance level above your entry."
      },
      {
        "id": "level-confluence",
        "heading": "Why confluence matters",
        "body": "Not all support and resistance levels are equal. A level where multiple types of S/R converge is much stronger than a level based on a single data point.\n\nStrong confluence example: yesterday's low at 5,190 aligns with a high-volume node on the weekly volume profile AND the lower boundary of the value area AND a round number. Four independent reasons to expect buying at 5,190. This is a high-confidence level.\n\nWeak level example: price bounced once off 5,193 three days ago. That's a single reference point with no confirmation from volume, value area, or other structural levels. This is a low-confidence level.\n\nThe best S/R traders prepare 2-3 high-confluence levels per session and only take trades at those levels. They ignore everything else. Fewer trades, higher quality."
      },
      {
        "id": "when-it-works",
        "heading": "When it works and when it fails",
        "body": "S/R bounces work best in range-bound markets. When ES is rotating between support and resistance with no directional bias, these levels hold reliably and you can trade the range with mean-reversion entries at both ends.\n\nThe strategy works well when the overall trend supports your trade. Buying at support in an uptrend (buying a dip) is higher probability than buying at support in a downtrend (catching a falling knife).\n\nS/R bounces fail on trend days. In a strong downtrend, support levels break one after another. Each bounce attempt fails and the stop gets hit. If you're buying every support level on a trend-down day, you'll have a string of losses.\n\nThe strategy also fails at stale levels. A support level from two weeks ago that hasn't been tested is less reliable than one that was tested yesterday. Fresh levels (tested in the last 1-3 sessions) are more reliable because the participants who created the level are likely still in their positions."
      },
      {
        "id": "example",
        "heading": "Worked example on ES",
        "body": "Pre-market analysis shows: yesterday's value area low (VAL) at 5,192. Yesterday's low at 5,190. The weekly volume profile shows a high-volume node at 5,191. These three levels cluster between 5,190-5,192. Strong confluence zone.\n\nES opens at 5,205 and sells off during the first hour. At 9:40 AM CT, ES reaches 5,193, entering the confluence zone. A 5-minute candle dips to 5,189.75 (below yesterday's low) but closes at 5,193 (back inside the confluence zone). This is a hammer/rejection candle.\n\nEntry: buy at 5,194 (one tick above the rejection candle close). Stop: 5,187.50 (below the confluence zone by 2.5 points, $325 risk per contract). Target: 5,205 (the opening price / developing VWAP area, 11 points, $550). Risk-reward: approximately 1:1.7.\n\nES bounces from the confluence zone and rallies to 5,208 by lunch. The three-level confluence held because each level independently attracted buyers, and the combined buying pressure was too strong for sellers to overcome."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Buying every touch of a support level without waiting for confirmation",
        "fix": "A level is not a buy signal by itself. Wait for a rejection candle, volume shift, or DOM absorption before entering. The first touch of support might be the one that breaks it."
      },
      {
        "mistake": "Using support/resistance levels without checking confluence",
        "fix": "A single bounce from one session is weak evidence. Look for levels where 2-3 independent factors align: prior highs/lows, volume nodes, value area boundaries, round numbers. Confluence creates high-confidence levels."
      },
      {
        "mistake": "Trading S/R bounces against the trend",
        "fix": "Buying support in a downtrend catches falling knives. If the market is trending, only trade S/R bounces in the trend direction. Buy support in uptrends. Sell resistance in downtrends."
      }
    ],
    "relatedTerms": [
      {
        "term": "Support / Resistance",
        "slug": "support-resistance"
      },
      {
        "term": "Point of Control (POC)",
        "slug": "point-of-control"
      },
      {
        "term": "Value Area",
        "slug": "value-area"
      },
      {
        "term": "Volume Profile",
        "slug": "volume-profile"
      },
      {
        "term": "Risk-Reward Ratio",
        "slug": "risk-reward-ratio"
      }
    ]
  },
  {
    "slug": "trend-following",
    "learnPhase": 5,
    "learnOrder": 5,
    "name": "Trend Following with Moving Averages",
    "shortName": "Trend Following",
    "color": "#85B7EB",
    "difficulty": "Beginner to Intermediate",
    "timeframe": "Any session",
    "holdTime": "Hours to weeks",
    "tagline": "Trade in the direction of the trend using moving averages as your guide. Low win rate, high reward per win.",
    "tldr": "Trend following uses moving averages to identify the market's direction and enters trades in that direction on pullbacks. The most common approach uses the 20-period and 50-period moving averages on a 5-minute or daily chart. Win rates are typically 35-45%, but the average win is 2-3x larger than the average loss, producing positive expectancy over time.",
    "sections": [
      {
        "id": "what-is-trend-following",
        "heading": "What is trend following?",
        "body": "Trend following is the oldest and most researched trading strategy. The premise is simple: identify the direction the market is moving (the trend), position yourself in that direction, and hold until the trend ends.\n\nMoving averages are the most common tool for identifying trends. When price is above a moving average, the trend is up. When price is below, the trend is down. When a shorter moving average crosses above a longer one, a new uptrend may be starting. The reverse signals a potential downtrend.\n\nTrend following accepts that you cannot predict where the market will go. Instead, you react to what it's doing. You enter after the trend has started (you miss the beginning) and exit after it has ended (you give back some profit at the end). The money is made in the middle."
      },
      {
        "id": "setup-rules",
        "heading": "The setup rules",
        "body": "Choose your moving averages. The most common combinations are: 9 EMA and 21 EMA for aggressive scalping/day trading. 20 SMA and 50 SMA for standard day trading. 50 SMA and 200 SMA for swing trading and position trading.\n\nDefine the trend. Price above both moving averages with the shorter MA above the longer MA = uptrend. Price below both MAs with the shorter below the longer = downtrend. Price between the MAs or MAs tangled together = no trend (stay out).\n\nEntry on pullbacks. In an uptrend, wait for price to pull back to the shorter moving average. This is your entry zone. The moving average acts as dynamic support. Enter when price touches or gets within a few ticks of the MA and shows a bounce.\n\nStop loss. Place your stop below the longer moving average in an uptrend or above it in a downtrend. This gives the trend room to breathe while providing a clear invalidation point. If price breaks through the longer MA, the trend has changed.\n\nTrailing stop. Trend following works best with trailing stops rather than fixed targets. As price moves in your favor, trail your stop to the shorter moving average. This lets you ride trends for their full extent without guessing where they'll end."
      },
      {
        "id": "why-low-win-rate",
        "heading": "Why the win rate is low and that's okay",
        "body": "Trend following strategies typically win 35-45% of the time. This sounds bad until you look at the math.\n\nWhen you're wrong, you lose a small, controlled amount (the distance from your entry to your stop). When you're right, you ride the trend and make a multiple of that amount. If your average loss is $300 and your average win is $800, you only need to win 28% of the time to break even.\n\nAt a 40% win rate with $300 average loss and $800 average win: expectancy per trade = (0.40 x $800) - (0.60 x $300) = $320 - $180 = $140 profit per trade. Over 100 trades, that's $14,000.\n\nThe psychological challenge is enduring losing streaks. Seven losses in a row is statistically normal with a 40% win rate. Most traders abandon the strategy after 4-5 losses and miss the big winner that would have made up for all of them.\n\nTrend following is a strategy of patience and discipline. The edge is in the asymmetry of wins vs losses, not in being right more often than you're wrong."
      },
      {
        "id": "when-it-works",
        "heading": "When it works and when it fails",
        "body": "Trend following produces the largest profits during strong directional moves. Major Fed policy shifts, economic surprises, and secular trends (like the 2020-2021 bull market or the 2022 rate-hike selloff) are where trend followers make the bulk of their returns.\n\nThe strategy works well on higher timeframes (daily and weekly charts) for swing trading. Intraday trend following works too, but requires more active management and produces smaller per-trade profits.\n\nTrend following fails in choppy, range-bound markets. When price oscillates around the moving averages with no direction, every entry gets stopped out and the strategy produces a string of small losses. This is called a whipsaw environment.\n\nThe worst periods for trend following are transitions from trending to range-bound markets. The trend ends, the strategy gives back profits on the reversal, and then produces losses during the subsequent chop before a new trend emerges."
      },
      {
        "id": "example",
        "heading": "Worked example on ES daily chart",
        "body": "On the ES daily chart, the 20 SMA is at 5,180 and the 50 SMA is at 5,140. Price is at 5,210. Both MAs are sloping upward with the 20 above the 50. This is a confirmed uptrend.\n\nES pulls back over three days from 5,230 to 5,185, reaching the 20 SMA. On the fourth day, ES prints a hammer candle at 5,182 (touching the 20 SMA) and closes at 5,195.\n\nEntry: buy at 5,196 (above the hammer close). Stop: 5,138 (below the 50 SMA, 58 points, $2,900 per contract). This is a swing trade, so use MES for smaller accounts (58 points = $290 per MES contract).\n\nTrailing stop: as the trend resumes, move your stop to below the 20 SMA. After two weeks, price reaches 5,280. The 20 SMA has risen to 5,230. Your trailing stop is now at 5,228, locking in 32 points of profit.\n\nES eventually breaks below the 20 SMA at 5,245, hitting your trailing stop at 5,240. Total gain: 44 points ($2,200 per ES, $220 per MES). The risk was 58 points, the reward was 44 points, which is a sub-1:1 ratio on this specific trade. But the prior 3 pullback entries (which were stopped out for 15-20 points each) mean this one winner covers all the losses and then some."
      }
    ],
    "commonMistakes": [
      {
        "mistake": "Abandoning the strategy after a losing streak",
        "fix": "Losing streaks of 5-7 trades are statistically normal with a 40% win rate. The edge is in the long-term math, not in any single trade. If your backtest shows positive expectancy over 100+ trades, trust the process."
      },
      {
        "mistake": "Using trend following in a range-bound market",
        "fix": "Check whether the market is trending before applying the strategy. If the moving averages are flat and tangled, there is no trend. Sit out until a clear direction emerges."
      },
      {
        "mistake": "Setting fixed profit targets instead of trailing stops",
        "fix": "Trend following makes money by catching large moves. A fixed target of 20 points would have exited the example trade far too early. Trail your stop and let winners run."
      }
    ],
    "relatedTerms": [
      {
        "term": "Risk-Reward Ratio",
        "slug": "risk-reward-ratio"
      },
      {
        "term": "Swing Trading",
        "slug": "swing-trading"
      },
      {
        "term": "Support / Resistance",
        "slug": "support-resistance"
      },
      {
        "term": "Position Sizing",
        "slug": "position-sizing"
      },
      {
        "term": "Drawdown",
        "slug": "drawdown"
      }
    ]
  }
];

export function getStrategyBySlug(slug) {
  return strategyGuides.find(s => s.slug === slug);
}

export function getAdjacentStrategies(slug) {
  const idx = strategyGuides.findIndex(s => s.slug === slug);
  return {
    prev: idx > 0 ? strategyGuides[idx - 1] : null,
    next: idx < strategyGuides.length - 1 ? strategyGuides[idx + 1] : null,
  };
}
