import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { FadeIn, PrimaryButton } from '@/components/ui';
import type { Game } from '@/game/useGame';

export function ErrorScreen({ game }: { game: Game }) {
  return (
    <FadeIn style={styles.container}>
      <View style={styles.icon}>
        <Text style={styles.iconText}>!</Text>
      </View>
      <Text style={styles.title}>Couldn’t load questions</Text>
      <Text style={styles.body}>
        Something went wrong reaching the challenge. Check your connection and try again.
      </Text>

      <PrimaryButton label="Try again" onPress={game.retry} style={styles.retry} />
      <Pressable onPress={game.backToStart} style={styles.back}>
        <Text style={styles.backText}>Go back</Text>
      </Pressable>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 34,
  },
  icon: {
    width: 64,
    height: 64,
    borderRadius: 999,
    backgroundColor: colors.dangerWashSoft,
    borderWidth: 1,
    borderColor: colors.dangerBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  iconText: {
    fontFamily: fonts.bold,
    fontSize: 28,
    color: colors.danger,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 280,
    marginTop: 8,
  },
  retry: {
    marginTop: 22,
  },
  back: {
    paddingVertical: 14,
    marginTop: 2,
  },
  backText: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.textSecondary,
  },
});
