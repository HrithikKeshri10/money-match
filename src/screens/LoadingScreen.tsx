import { StyleSheet, View } from 'react-native';
import { radius } from '@/theme/tokens';
import { Skeleton } from '@/components/Loaders';

export function LoadingScreen() {
  return (
    <View style={styles.container}>
      <Skeleton height={6} radius={radius.pill} />

      <View style={styles.hud}>
        <Skeleton width={96} height={34} radius={radius.pill} />
        <Skeleton width={56} height={34} radius={radius.pill} />
      </View>

      <Skeleton height={150} radius={radius.md} style={styles.scenario} />

      <View style={styles.options}>
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  scenario: {
    marginTop: 28,
  },
  options: {
    gap: 12,
    marginTop: 18,
  },
});
