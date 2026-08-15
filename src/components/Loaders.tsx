import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View, type DimensionValue } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radius } from '@/theme/tokens';

export function Spinner({ size = 46 }: { size?: number }) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [spin]);

  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <Animated.View
      style={[
        styles.spinner,
        {
          width: size,
          height: size,
          borderRadius: size,
          transform: [{ rotate }],
        },
      ]}
    />
  );
}

export function Skeleton({
  width = '100%',
  height,
  radius: r = radius.sm,
  style,
}: {
  width?: DimensionValue;
  height: number;
  radius?: number;
  style?: object;
}) {
  const [w, setW] = useState(0);
  const x = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!w) return;
    const anim = Animated.loop(
      Animated.timing(x, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [w, x]);

  const translateX = x.interpolate({ inputRange: [0, 1], outputRange: [-w, w] });

  return (
    <View
      onLayout={(e) => setW(e.nativeEvent.layout.width)}
      style={[{ width, height, borderRadius: r, backgroundColor: colors.surface, overflow: 'hidden' }, style]}
    >
      {w > 0 && (
        <Animated.View style={[styles.shimmer, { width: w, transform: [{ translateX }] }]}>
          <LinearGradient
            colors={['rgba(30,38,27,0)', 'rgba(30,38,27,0.95)', 'rgba(30,38,27,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  spinner: {
    borderWidth: 3,
    borderColor: colors.accentWashRing,
    borderTopColor: colors.accent,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});
