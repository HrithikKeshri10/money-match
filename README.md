# Money Match

A 60-second finance challenge built for **BlinkMoney**, a fast, single-player quiz where every question is a real BlinkMoney decision (sell vs. borrow, hold through a dip, let it compound). Play trains the exact behaviours BlinkMoney wants its users to internalise, and a shareable result card turns a private habit into something worth passing on.

**Live prototype:** https://money-match-gamma.vercel.app (opens in any browser, no login)

---

## The feature

Four screens, one tight loop:

- **Start** — best score, current streak, one tap to play.
- **Quiz** — a draining 60-second timer, live score and combo streak, scenario questions with four options each. Instant correct/wrong feedback, then advance.
- **Result** — final score, a finance rank (Rookie → Money Master), XP earned, and whether you beat your best.
- **Share** — a designed result card ("I scored 570 · Saver") with a share sheet (WhatsApp / X / IG Story / Save image) so a win spreads without being asked.

Questions are drawn from BlinkMoney's core logic — sell vs. borrow, holding through a market dip, compounding — so a round doubles as low-stakes practice for the decisions the product is built around.

---

## Tech stack

- **Expo / React Native** — single codebase, runs on Android and web.
- **react-native-web** — powers the public browser prototype (deployed on Vercel).
- **react-native-reanimated** — timer drain, answer feedback, score count-up.
- **AsyncStorage** — persists best score, streak, and XP across sessions.

---

## Run locally

```bash
git clone https://github.com/HrithikKeshri10/money-match.git
cd money-match
npm install

# start the dev server
npx expo start          # then press a for Android, or w for web
```

---

## Mocked data (deliberate)

This is a frontend prototype with no backend. Best score (1,240), streak (2 days), and the "top 25% this week" line are seeded stubs to demonstrate the states. In production these would read from the user's play history and a leaderboard service.
