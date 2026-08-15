import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { Dot, FadeIn, PrimaryButton, SecondaryButton } from '@/components/ui';
import { RankBadge } from '@/components/RankBadge';
import type { Game } from '@/game/useGame';

export function ResultScreen({ game }: { game: Game }) {
  return (
    <FadeIn style={styles.container} duration={400}>
      {game.isNewBest && <NewBestBadge />}

      <View style={styles.scoreBlock}>
        <Text style={styles.scoreLabel}>FINAL SCORE</Text>
        <Text style={styles.score}>{game.displayScore.toLocaleString()}</Text>
        <Text style={styles.points}>points</Text>
      </View>

      <RankBadge rank={game.rank} />

      <View style={styles.xpRow}>
        <Dot size={7} glow={false} />
        <Text style={styles.xpText}>+{game.xpEarned} XP earned</Text>
        <Text style={styles.xpLevel}>· Level {game.level}</Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Play again" onPress={game.playAgain} />
        <SecondaryButton label="Share result" onPress={game.goShare} />
      </View>
    </FadeIn>
  );
}

function NewBestBadge() {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(pulse, {
        toValue: 1,
        duration: 2200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.5] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  return (
    <View style={styles.newBestWrap}>
      <Animated.View style={[styles.newBestHalo, { opacity, transform: [{ scale }] }]} />
      <View style={styles.newBest}>
        <Dot size={7} />
        <Text style={styles.newBestText}>NEW BEST</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 34,
  },
  newBestWrap: {
    alignSelf: 'center',
    marginBottom: 22,
  },
  newBestHalo: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.pill,
    backgroundColor: colors.accentWash,
  },
  newBest: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(159,230,111,0.12)',
    borderWidth: 1,
    borderColor: 'rgba(159,230,111,0.35)',
  },
  newBestText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.3,
    color: colors.accent,
  },
  scoreBlock: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    letterSpacing: 1.3,
    color: colors.textSecondary,
  },
  score: {
    fontFamily: fonts.serifItalic,
    fontSize: 88,
    lineHeight: 88,
    color: colors.accent,
    marginTop: 6,
    textShadowColor: 'rgba(159,230,111,0.35)',
    textShadowRadius: 40,
  },
  points: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 13,
    borderRadius: radius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
    marginTop: 14,
  },
  xpText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.textPrimary,
  },
  xpLevel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  actions: {
    marginTop: 26,
    gap: 12,
  },
});
