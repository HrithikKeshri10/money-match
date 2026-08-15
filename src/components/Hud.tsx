import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { Dot } from '@/components/ui';

export function ScorePill({ score }: { score: number }) {
  return (
    <View style={styles.scorePill}>
      <Dot size={7} glow={false} />
      <Text style={styles.scoreValue}>{score.toLocaleString()}</Text>
      <Text style={styles.scoreUnit}>pts</Text>
    </View>
  );
}

export function StreakBadge({ combo }: { combo: number }) {
  if (combo <= 0) return null;
  return (
    <View style={styles.streak}>
      <Dot size={6} />
      <Text style={styles.streakValue}>×{combo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scorePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  scoreValue: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  scoreUnit: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.textSecondary,
  },
  streak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.accentWash,
    borderWidth: 1,
    borderColor: colors.accentBorder,
  },
  streakValue: {
    fontFamily: fonts.bold,
    fontSize: 13,
    color: colors.accent,
  },
});
