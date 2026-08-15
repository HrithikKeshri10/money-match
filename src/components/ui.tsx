import { useEffect, useRef, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { colors, fonts, glow, radius } from '@/theme/tokens';

export function Dot({ size = 8, glow: withGlow = true }: { size?: number; glow?: boolean }) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size,
          backgroundColor: colors.accent,
        },
        withGlow && styles.dotGlow,
      ]}
    />
  );
}

export function Badge({ label }: { label: string }) {
  return (
    <View style={styles.badge}>
      <Dot />
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
}

export function PrimaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.primary,
        pressed && { transform: [{ scale: 0.97 }], backgroundColor: colors.accentPressed },
        style,
      ]}
    >
      <Text style={styles.primaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondary,
        pressed && { transform: [{ scale: 0.97 }], borderColor: colors.accentBorder },
        style,
      ]}
    >
      <Text style={styles.secondaryLabel}>{label}</Text>
    </Pressable>
  );
}

export function Card({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function FadeIn({
  children,
  style,
  duration = 350,
  delay = 0,
  offset = 10,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  duration?: number;
  delay?: number;
  offset?: number;
}) {
  const t = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const anim = Animated.timing(t, {
      toValue: 1,
      duration,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [t, duration, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: t,
          transform: [
            { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  dotGlow: {
    shadowColor: colors.accent,
    shadowOpacity: 1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.accentBorderSoft,
    backgroundColor: colors.accentWashSoft,
  },
  badgeLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.7,
    color: colors.textSecondary,
  },
  primary: {
    width: '100%',
    backgroundColor: colors.accent,
    paddingVertical: 21,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...glow,
  },
  primaryLabel: {
    fontFamily: fonts.bold,
    fontSize: 18,
    color: colors.onAccent,
  },
  secondary: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryLabel: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
  },
});
