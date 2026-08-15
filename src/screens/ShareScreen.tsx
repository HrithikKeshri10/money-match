import { useCallback } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { FadeIn, PrimaryButton } from '@/components/ui';
import { ShareCard } from '@/components/ShareCard';
import type { Game } from '@/game/useGame';

const TARGETS = [
  { icon: 'W', label: 'WhatsApp' },
  { icon: 'X', label: 'X' },
  { icon: 'IG', label: 'Story' },
  { icon: '⋯', label: 'More' },
] as const;

export function ShareScreen({ game }: { game: Game }) {
  const share = useCallback(async () => {
    const message = `I scored ${game.score.toLocaleString()} — ${game.rank.title} on BlinkMoney Money Match. Beat me → blinkmoney.app/match`;
    try {
      await Share.share({ message });
    } catch {
      // sheet dismissed
    }
  }, [game.score, game.rank.title]);

  return (
    <FadeIn style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={game.backToResult} style={styles.backBtn} hitSlop={8}>
          <Text style={styles.backIcon}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Share your result</Text>
      </View>

      <View style={styles.cardArea}>
        <ShareCard score={game.score} rank={game.rank} style={styles.card} />
      </View>

      <View style={styles.targets}>
        {TARGETS.map((t) => (
          <Pressable key={t.label} onPress={share} style={styles.target}>
            <View style={styles.targetIcon}>
              <Text style={styles.targetIconText}>{t.icon}</Text>
            </View>
            <Text style={styles.targetLabel}>{t.label}</Text>
          </Pressable>
        ))}
      </View>

      <PrimaryButton label="Save image" onPress={share} />
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 6,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontFamily: fonts.medium,
    fontSize: 20,
    lineHeight: 22,
    color: colors.textPrimary,
    marginTop: -2,
  },
  headerTitle: {
    fontFamily: fonts.semibold,
    fontSize: 17,
    color: colors.textPrimary,
  },
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 300,
  },
  targets: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  target: {
    alignItems: 'center',
    gap: 7,
  },
  targetIcon: {
    width: 52,
    height: 52,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetIconText: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.accent,
  },
  targetLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
  },
});
