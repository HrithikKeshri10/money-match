import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radius } from '@/theme/tokens';
import { FadeIn } from '@/components/ui';
import { TimerBar } from '@/components/TimerBar';
import { ScorePill, StreakBadge } from '@/components/Hud';
import { OptionChip } from '@/components/OptionChip';
import type { Game } from '@/game/useGame';

export function QuizScreen({ game }: { game: Game }) {
  const { question } = game;
  if (!question) return null;

  return (
    <FadeIn style={styles.container} duration={300}>
      <TimerBar progress={game.timerProgress} />

      <View style={styles.hud}>
        <ScorePill score={game.score} />
        <StreakBadge combo={game.combo} />
      </View>

      {game.isLast ? (
        <View style={styles.lastRow}>
          <View style={styles.lastBadge}>
            <Text style={styles.lastBadgeText}>LAST ONE</Text>
          </View>
          <Text style={styles.counter}>Question {game.counter}</Text>
        </View>
      ) : (
        <Text style={styles.counter}>Question {game.counter}</Text>
      )}

      <View style={styles.scenario}>
        <Text style={styles.scenarioLabel}>SCENARIO</Text>
        <Text style={styles.question}>{question.scenario}</Text>
      </View>

      <View style={styles.options}>
        {question.options.map((label, i) => (
          <OptionChip
            key={`${game.qIndex}-${i}`}
            label={label}
            index={i}
            answerState={game.answerState}
            selectedIndex={game.selected}
            correctIndex={question.correct}
            onPress={game.select}
          />
        ))}
      </View>
    </FadeIn>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 14,
    paddingBottom: 28,
  },
  hud: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  counter: {
    fontFamily: fonts.regular,
    fontSize: 12,
    letterSpacing: 0.5,
    color: colors.textSecondary,
    marginTop: 18,
  },
  lastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 18,
  },
  lastBadge: {
    backgroundColor: colors.accent,
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
  },
  lastBadgeText: {
    fontFamily: fonts.bold,
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.onAccent,
  },
  scenario: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.hairlineSoft,
    paddingVertical: 22,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  scenarioLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    letterSpacing: 1.5,
    color: colors.accent,
    marginBottom: 12,
  },
  question: {
    fontFamily: fonts.semibold,
    fontSize: 21,
    lineHeight: 28,
    color: colors.textPrimary,
  },
  options: {
    gap: 12,
    marginTop: 18,
  },
});
