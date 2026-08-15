import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { fetchQuestions, shuffle, type Question } from '@/data/questions';
import { computeRank, type Rank } from '@/game/rank';

export type Phase = 'start' | 'loading' | 'error' | 'quiz' | 'timeup' | 'result' | 'share';
export type AnswerState = 'idle' | 'correct' | 'wrong';

export const GAME_SECONDS = 30;
const BASE_POINTS = 150;
const COMBO_BONUS = 30; // per consecutive correct answer
const FEEDBACK_MS = 850; // correct/wrong feedback before advancing
const TIMEUP_MS = 1150; // "Time's up" overlay before the result
const COUNT_UP_MS = 1100;
const XP_PER_CORRECT = 30; // a clean 6/6 run lands +180 XP

// Session best + streak. Not persisted across launches yet.
const store = { best: 1240, dailyStreak: 2 };

type State = {
  phase: Phase;
  questions: Question[];
  qIndex: number;
  selected: number | null;
  answerState: AnswerState;
  score: number;
  combo: number;
  correctCount: number;
  displayScore: number;
  best: number;
  isNewBest: boolean;
};

const initialState: State = {
  phase: 'start',
  questions: [],
  qIndex: 0,
  selected: null,
  answerState: 'idle',
  score: 0,
  combo: 0,
  correctCount: 0,
  displayScore: 0,
  best: store.best,
  isNewBest: false,
};

type Action =
  | { type: 'GO'; phase: Phase }
  | { type: 'LOADING' }
  | { type: 'LOADED'; questions: Question[] }
  | { type: 'ERROR' }
  | { type: 'SELECT'; index: number }
  | { type: 'ADVANCE' }
  | { type: 'TIMEUP' }
  | { type: 'FINISH' }
  | { type: 'DISPLAY'; value: number };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'GO':
      return { ...s, phase: a.phase };
    case 'LOADING':
      return { ...s, phase: 'loading' };
    case 'ERROR':
      return { ...s, phase: 'error' };
    case 'LOADED':
      return {
        ...s,
        questions: a.questions,
        phase: 'quiz',
        qIndex: 0,
        selected: null,
        answerState: 'idle',
        score: 0,
        combo: 0,
        correctCount: 0,
        displayScore: 0,
        isNewBest: false,
      };
    case 'SELECT': {
      if (s.answerState !== 'idle') return s;
      const q = s.questions[s.qIndex];
      const correct = a.index === q.correct;
      const combo = correct ? s.combo + 1 : 0;
      const gained = correct ? BASE_POINTS + combo * COMBO_BONUS : 0;
      return {
        ...s,
        selected: a.index,
        answerState: correct ? 'correct' : 'wrong',
        score: s.score + gained,
        combo,
        correctCount: s.correctCount + (correct ? 1 : 0),
      };
    }
    case 'ADVANCE': {
      const last = s.qIndex >= s.questions.length - 1;
      if (last) return s; // the last question is finished via FINISH
      return { ...s, qIndex: s.qIndex + 1, selected: null, answerState: 'idle' };
    }
    case 'TIMEUP':
      return s.phase === 'quiz' ? { ...s, phase: 'timeup' } : s;
    case 'FINISH': {
      if (s.phase === 'result') return s;
      const isNewBest = s.score > s.best;
      return {
        ...s,
        phase: 'result',
        displayScore: 0,
        isNewBest,
        best: isNewBest ? s.score : s.best,
      };
    }
    case 'DISPLAY':
      return { ...s, displayScore: a.value };
    default:
      return s;
  }
}

export type Game = ReturnType<typeof useGame>;

export function useGame() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Timers and animation callbacks outlive a render, so read state through a ref.
  const stateRef = useRef(state);
  stateRef.current = state;
  const mounted = useRef(true);

  const timerProgress = useRef(new Animated.Value(1)).current;
  const countUp = useRef(new Animated.Value(0)).current;
  const timerAnim = useRef<Animated.CompositeAnimation | null>(null);
  const feedbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeupTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (feedbackTimer.current) clearTimeout(feedbackTimer.current);
    if (timeupTimer.current) clearTimeout(timeupTimer.current);
    timerAnim.current?.stop();
    countUp.stopAnimation();
  }, [countUp]);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimers();
    };
  }, [clearTimers]);

  useEffect(() => {
    store.best = Math.max(store.best, state.best);
  }, [state.best]);

  const startCountUp = useCallback(() => {
    const target = stateRef.current.score;
    countUp.setValue(0);
    const id = countUp.addListener(({ value }) => {
      dispatch({ type: 'DISPLAY', value: Math.round(value * target) });
    });
    Animated.timing(countUp, {
      toValue: 1,
      duration: COUNT_UP_MS,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start(() => countUp.removeListener(id));
  }, [countUp]);

  const finish = useCallback(() => {
    timerAnim.current?.stop();
    dispatch({ type: 'FINISH' });
    startCountUp();
  }, [startCountUp]);

  const startTimer = useCallback(() => {
    timerProgress.setValue(1);
    timerAnim.current = Animated.timing(timerProgress, {
      toValue: 0,
      duration: GAME_SECONDS * 1000,
      easing: Easing.linear,
      useNativeDriver: false, // animating width
    });
    timerAnim.current.start(({ finished }) => {
      if (!finished || !mounted.current) return;
      dispatch({ type: 'TIMEUP' });
      timeupTimer.current = setTimeout(() => {
        if (mounted.current) finish();
      }, TIMEUP_MS);
    });
  }, [timerProgress, finish]);

  const beginRound = useCallback(
    (questions: Question[]) => {
      clearTimers();
      dispatch({ type: 'LOADED', questions });
      startTimer();
    },
    [clearTimers, startTimer]
  );

  const load = useCallback(async () => {
    clearTimers();
    dispatch({ type: 'LOADING' });
    try {
      const qs = await fetchQuestions();
      if (!mounted.current) return;
      beginRound(qs);
    } catch {
      if (mounted.current) dispatch({ type: 'ERROR' });
    }
  }, [clearTimers, beginRound]);

  const play = useCallback(() => load(), [load]);
  const retry = useCallback(() => load(), [load]);

  const backToStart = useCallback(() => {
    clearTimers();
    dispatch({ type: 'GO', phase: 'start' });
  }, [clearTimers]);

  const select = useCallback(
    (index: number) => {
      if (stateRef.current.answerState !== 'idle') return;
      dispatch({ type: 'SELECT', index });
      feedbackTimer.current = setTimeout(() => {
        if (!mounted.current || stateRef.current.phase !== 'quiz') return;
        const st = stateRef.current;
        if (st.qIndex >= st.questions.length - 1) finish();
        else dispatch({ type: 'ADVANCE' });
      }, FEEDBACK_MS);
    },
    [finish]
  );

  const playAgain = useCallback(() => {
    const prev = stateRef.current.questions;
    beginRound(prev.length ? shuffle(prev) : []);
    if (!prev.length) load();
  }, [beginRound, load]);

  const goShare = useCallback(() => dispatch({ type: 'GO', phase: 'share' }), []);
  const backToResult = useCallback(() => dispatch({ type: 'GO', phase: 'result' }), []);

  // Send the hardware back button/gesture through the game's own navigation.
  // Returning false on Start lets the OS default (leave the app) take over.
  const handleBack = useCallback(() => {
    switch (stateRef.current.phase) {
      case 'share':
        backToResult();
        return true;
      case 'result':
      case 'quiz':
      case 'timeup':
      case 'loading':
      case 'error':
        backToStart();
        return true;
      default:
        return false;
    }
  }, [backToResult, backToStart]);

  const question = state.questions[state.qIndex];
  const total = state.questions.length;
  const rank: Rank = useMemo(() => computeRank(state.score), [state.score]);
  const xpEarned = state.correctCount * XP_PER_CORRECT;
  const level = Math.floor(state.best / 400) + 1;

  return {
    ...state,
    question,
    total,
    isLast: total > 0 && state.qIndex === total - 1,
    counter: total ? `${state.qIndex + 1} of ${total}` : '',
    dailyStreak: store.dailyStreak,
    rank,
    xpEarned,
    level,
    timerProgress,
    play,
    retry,
    backToStart,
    select,
    playAgain,
    goShare,
    backToResult,
    handleBack,
  };
}
