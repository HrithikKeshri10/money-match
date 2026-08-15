import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '@/theme/tokens';
import { Spinner } from '@/components/Loaders';

export function TimeUpOverlay() {
  return (
    <View style={styles.overlay}>
      <Spinner />
      <View style={styles.text}>
        <Text style={styles.title}>Time’s up</Text>
        <Text style={styles.subtitle}>Tallying your score…</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.overlay,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  text: {
    alignItems: 'center',
  },
  title: {
    fontFamily: fonts.serifItalic,
    fontSize: 40,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
  },
});
