import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts, radius } from '@/theme/tokens';
import { Dot } from '@/components/ui';
import type { Rank } from '@/game/rank';

const QUOTES: Record<string, string> = {
  'Money Master': 'I kept my money working.',
  Investor: 'I let compounding do the work.',
  Saver: 'Building the habit, one SIP at a time.',
  Rookie: 'Getting my money brain going.',
};

export function ShareCard({
  score,
  rank,
  style,
}: {
  score: number;
  rank: Rank;
  style?: StyleProp<ViewStyle>;
}) {
  const quote = QUOTES[rank.title] ?? QUOTES.Rookie;

  return (
    <View style={[styles.card, style]}>
      <LinearGradient
        colors={['#1C2618', colors.bg]}
        locations={[0, 0.62]}
        start={{ x: 0.88, y: 0 }}
        end={{ x: 0.2, y: 0.82 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.ringOuter} pointerEvents="none" />
      <View style={styles.ringInner} pointerEvents="none" />
      <View style={styles.bottomGlow} pointerEvents="none" />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Dot size={10} />
            <Text style={styles.brandName}>BlinkMoney</Text>
          </View>
          <Text style={styles.kicker}>MONEY MATCH</Text>
        </View>

        <View>
          <Text style={styles.scoreLabel}>I scored</Text>
          <Text style={styles.score}>{score.toLocaleString()}</Text>
          <Text style={styles.rank}>{rank.title}</Text>
          <Text style={styles.quote}>“{quote}”</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.url}>blinkmoney.app/match</Text>
          <Text style={styles.beat}>Beat me →</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 4 / 5,
    borderRadius: radius.lg,
    overflow: 'hidden',
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: 'rgba(159,230,111,0.2)',
  },
  ringOuter: {
    position: 'absolute',
    top: -70,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(159,230,111,0.18)',
  },
  ringInner: {
    position: 'absolute',
    top: -40,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(159,230,111,0.10)',
  },
  bottomGlow: {
    position: 'absolute',
    bottom: -60,
    left: -50,
    width: 180,
    height: 180,
    borderRadius: 999,
    backgroundColor: 'rgba(159,230,111,0.05)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandName: {
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  kicker: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 2,
    color: colors.textSecondary,
  },
  scoreLabel: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.textSecondary,
  },
  score: {
    fontFamily: fonts.serifItalic,
    fontSize: 72,
    lineHeight: 72,
    color: colors.accent,
    marginVertical: 4,
    textShadowColor: 'rgba(159,230,111,0.35)',
    textShadowRadius: 30,
  },
  rank: {
    fontFamily: fonts.serifItalic,
    fontSize: 24,
    color: colors.textPrimary,
  },
  quote: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textOnCard,
    marginTop: 14,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.10)',
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  url: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: colors.textSecondary,
  },
  beat: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.accent,
  },
});
