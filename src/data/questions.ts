export type Question = {
  id: string;
  scenario: string;
  options: string[];
  correct: number; // index of the correct option
};

const BANK: Question[] = [
  {
    id: 'q-loan',
    scenario: 'You need ₹20,000 for 3 months. What’s the smartest move?',
    options: [
      'Sell your equity SIP units',
      'Borrow against your portfolio',
      'Stop all future SIPs',
      'Break your emergency fund',
    ],
    correct: 1,
  },
  {
    id: 'q-dip',
    scenario: 'Markets dropped 8% this week. Your auto-SIP should…',
    options: [
      'Keep running as scheduled',
      'Pause until it recovers',
      'Panic and double up today',
      'Switch entirely to cash',
    ],
    correct: 0,
  },
  {
    id: 'q-idle',
    scenario: 'You’ve got ₹5,000 sitting idle in your account. BlinkMoney would…',
    options: [
      'Leave it in savings',
      'Auto-invest it as a micro-SIP',
      'Lock it away for a year',
      'Spend it on rewards',
    ],
    correct: 1,
  },
  {
    id: 'q-collateral',
    scenario: 'Borrowing against your portfolio means you…',
    options: [
      'Sell units and lose growth',
      'Keep units invested & growing',
      'Always pay the highest interest',
      'Freeze your account',
    ],
    correct: 1,
  },
  {
    id: 'q-emergency',
    scenario: 'A healthy emergency fund should roughly cover…',
    options: [
      '3–6 months of expenses',
      '1 week of expenses',
      '5 years of expenses',
      'Only next month’s rent',
    ],
    correct: 0,
  },
  {
    id: 'q-growth',
    scenario: 'Over 10+ years, which usually grows your money fastest?',
    options: [
      'A savings account',
      'A diversified equity fund',
      'Cash under the mattress',
      'A current account',
    ],
    correct: 1,
  },
  {
    id: 'q-compound',
    scenario: 'Compounding rewards you the most when you…',
    options: [
      'Start early and stay invested',
      'Wait until you’re 50 to begin',
      'Withdraw the gains every month',
      'Time the market perfectly',
    ],
    correct: 0,
  },
  {
    id: 'q-sip',
    scenario: 'A SIP builds wealth by…',
    options: [
      'Investing a fixed amount regularly',
      'Guessing the market top',
      'Buying only when you feel lucky',
      'Investing once, then forgetting',
    ],
    correct: 0,
  },
];

export const ROUND_SIZE = 6; // questions per round

// Toggle on to test the error state without a real network failure.
export const SIMULATE_ERROR = false;

export function shuffle<T>(list: readonly T[]): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// Stand-in for a real questions endpoint.
export async function fetchQuestions(): Promise<Question[]> {
  await wait(850);
  if (SIMULATE_ERROR) throw new Error('Failed to reach the challenge');
  return shuffle(BANK).slice(0, ROUND_SIZE);
}
