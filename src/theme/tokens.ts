export const colors = {
  // Surfaces
  bg: '#0A0C09',
  surface: '#131812',
  elevated: '#1A2216',

  // Accent
  accent: '#9FE66F',
  accentPressed: '#78BF4A',
  onAccent: '#0F1C0C',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9BA89A',
  textFaint: '#5F6B5E',
  textOnCard: '#E8EFE5',

  // Status
  danger: '#E5533D',

  // Lines & washes
  hairline: 'rgba(255,255,255,0.06)',
  hairlineSoft: 'rgba(255,255,255,0.05)',
  hairlineStrong: 'rgba(255,255,255,0.18)',
  accentBorder: 'rgba(159,230,111,0.30)',
  accentBorderSoft: 'rgba(159,230,111,0.25)',
  accentBorderFaint: 'rgba(159,230,111,0.15)',
  accentWash: 'rgba(159,230,111,0.10)',
  accentWashSoft: 'rgba(159,230,111,0.06)',
  accentWashChip: 'rgba(159,230,111,0.08)',
  accentWashRing: 'rgba(159,230,111,0.18)',
  dangerBorder: 'rgba(229,83,61,0.40)',
  dangerWash: 'rgba(229,83,61,0.08)',
  dangerWashSoft: 'rgba(229,83,61,0.12)',
  overlay: 'rgba(10,12,9,0.72)',
} as const;

// Registered in _layout via useFonts.
export const fonts = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
  extrabold: 'Inter_800ExtraBold',
  serifItalic: 'DMSerifDisplay_400Regular_Italic',
} as const;

export const radius = {
  xs: 10,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
  pill: 999,
} as const;

export const glow = {
  shadowColor: colors.accent,
  shadowOpacity: 0.5,
  shadowRadius: 20,
  shadowOffset: { width: 0, height: 12 },
  elevation: 12,
} as const;
