import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import type { AnswerState } from '@/game/useGame';

type Props = {
  label: string;
  index: number;
  answerState: AnswerState;
  selectedIndex: number | null;
  correctIndex: number;
  onPress: (index: number) => void;
};

export function OptionChip({
  label,
  index,
  answerState,
  selectedIndex,
  correctIndex,
  onPress,
}: Props) {
  const locked = answerState !== 'idle';
  const isSelected = selectedIndex === index;
  const isCorrect = index === correctIndex;

  let container: StyleProp<ViewStyle> = styles.base;
  let text: StyleProp<TextStyle> = styles.text;
  let tag = '';
  let tagColor: string = colors.textPrimary;

  if (!locked) {
    if (isSelected) container = styles.baseSelected;
  } else if (isCorrect) {
    container = styles.correct;
    text = styles.textCorrect;
    tag = '✓';
    tagColor = colors.onAccent;
  } else if (isSelected) {
    container = styles.wrong;
    text = styles.textWrong;
    tag = '✕';
    tagColor = colors.danger;
  } else {
    container = styles.dimmed;
  }

  return (
    <Pressable
      disabled={locked}
      onPress={() => onPress(index)}
      style={({ pressed }) => [
        container,
        pressed && !locked && { transform: [{ scale: 0.985 }] },
      ]}
    >
      <Text style={[text, styles.label]} numberOfLines={2}>
        {label}
      </Text>
      {tag ? (
        <Text style={[styles.tag, { color: tagColor }]}>{tag}</Text>
      ) : (
        <View style={styles.tagSpacer} />
      )}
    </Pressable>
  );
}

const base = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  width: '100%',
  paddingVertical: 18,
  paddingHorizontal: 20,
  borderRadius: radius.sm,
  borderWidth: 1.5,
} as const;

const styles = StyleSheet.create({
  base: {
    ...base,
    backgroundColor: colors.surface,
    borderColor: colors.accentBorder,
  },
  baseSelected: {
    ...base,
    backgroundColor: colors.accentWashChip,
    borderColor: colors.accent,
  },
  correct: {
    ...base,
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    transform: [{ scale: 1.015 }],
    shadowColor: colors.accent,
    shadowOpacity: 0.55,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  wrong: {
    ...base,
    backgroundColor: colors.dangerWash,
    borderColor: colors.danger,
  },
  dimmed: {
    ...base,
    backgroundColor: colors.surface,
    borderColor: colors.accentBorder,
    opacity: 0.4,
  },
  label: {
    flex: 1,
    textAlign: 'left',
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.textPrimary,
  },
  textCorrect: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.onAccent,
  },
  textWrong: {
    fontFamily: fonts.semibold,
    fontSize: 15,
    color: colors.danger,
  },
  tag: {
    fontFamily: fonts.bold,
    fontSize: 15,
    width: 18,
    textAlign: 'center',
  },
  tagSpacer: {
    width: 18,
  },
});
