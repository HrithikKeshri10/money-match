import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { BackHandler, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme/tokens';
import { useGame, type Game } from '@/game/useGame';
import { StartScreen } from '@/screens/StartScreen';
import { LoadingScreen } from '@/screens/LoadingScreen';
import { ErrorScreen } from '@/screens/ErrorScreen';
import { QuizScreen } from '@/screens/QuizScreen';
import { ResultScreen } from '@/screens/ResultScreen';
import { ShareScreen } from '@/screens/ShareScreen';
import { TimeUpOverlay } from '@/screens/TimeUpOverlay';

export default function Index() {
  const game = useGame();

  // Keep the hardware back button inside the game instead of exiting.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', game.handleBack);
    return () => sub.remove();
  }, [game.handleBack]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <CurrentScreen game={game} />
        {game.phase === 'timeup' && <TimeUpOverlay />}
      </View>
    </SafeAreaView>
  );
}

function CurrentScreen({ game }: { game: Game }) {
  switch (game.phase) {
    case 'loading':
      return <LoadingScreen />;
    case 'error':
      return <ErrorScreen game={game} />;
    case 'quiz':
    case 'timeup':
      return <QuizScreen game={game} />;
    case 'result':
      return <ResultScreen game={game} />;
    case 'share':
      return <ShareScreen game={game} />;
    case 'start':
    default:
      return <StartScreen game={game} />;
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  screen: {
    flex: 1,
  },
});
