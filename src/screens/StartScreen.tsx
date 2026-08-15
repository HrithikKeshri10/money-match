import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { Badge, FadeIn, PrimaryButton } from '@/components/ui';
import type { Game } from '@/game/useGame';

export function StartScreen({ game }: { game: Game }) {
  return (
    <FadeIn style={styles.container}>
      <View style={styles.hero}>
        <Badge label="BLINKMONEY" />
        <View style={styles.titleBlock}>
          <Text style={styles.title}>Money Match</Text>
          <Text style={styles.subtitle}>Test your money brain · 30 seconds</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <PrimaryButton label="Play" onPress={game.play} />

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Best score</Text>
            <Text style={styles.statValue}>{game.best.toLocaleString()}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Streak</Text>
            <View style={styles.streakRow}>
              <Text style={styles.streakValue}>{game.dailyStreak}</Text>
              <Text style={styles.streakUnit}>days</Text>
            </View>
          </View>
        </View>

        <View style={styles.hint}>
          <View style={styles.hintMark}>
            <Text style={styles.hintMarkText}>?</Text>
          </View>
          <Text style={styles.hintText}>How BlinkMoney thinks</Text>
        </View>
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  hero: {
    flex: 1.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 18,
  },
  titleBlock: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.extrabold,
    fontSize: 46,
    lineHeight: 48,
    letterSpacing: -1.3,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 15,
    color: colors.textSecondary,
    marginTop: 14,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 14,
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  statLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  statValue: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textPrimary,
    marginTop: 6,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 6,
  },
  streakValue: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.accent,
  },
  streakUnit: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    padding: 14,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(159,230,111,0.28)',
  },
  hintMark: {
    width: 18,
    height: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(159,230,111,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintMarkText: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.accent,
  },
  hintText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
