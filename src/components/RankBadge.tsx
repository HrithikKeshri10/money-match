import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import type { Rank } from '@/game/rank';

export function RankBadge({ rank }: { rank: Rank }) {
  return (
    <View style={styles.card}>
      <Text style={styles.label}>YOUR RANK</Text>
      <Text style={styles.title}>{rank.title}</Text>
      <Text style={styles.blurb}>{rank.blurb}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.elevated,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.accentBorderFaint,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    letterSpacing: 1.2,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  title: {
    fontFamily: fonts.serifItalic,
    fontSize: 30,
    color: colors.textPrimary,
  },
  blurb: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
