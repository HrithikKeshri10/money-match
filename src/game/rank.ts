export type Rank = {
  title: string;
  blurb: string;
};

export function computeRank(score: number): Rank {
  if (score >= 1350) return { title: 'Money Master', blurb: 'Top 8% of players this week' };
  if (score >= 700) return { title: 'Investor', blurb: 'Top 25% of players this week' };
  if (score >= 300) return { title: 'Saver', blurb: 'Top 55% of players this week' };
  return { title: 'Rookie', blurb: 'Warming up — play again to climb' };
}
