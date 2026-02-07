import { create } from 'zustand';

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  currentSubject: string | null;
  sessionType: 'focus' | 'break';
  sessionsCompleted: number;
  settings: {
    focusDuration: number;
    shortBreak: number;
    longBreak: number;
    sessionsUntilLongBreak: number;
  };
  startTimer: (subjectId?: string) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  skipSession: () => void;
  tick: () => void;
  updateSettings: (settings: Partial<TimerState['settings']>) => void;
}

export const useTimerStore = create<TimerState>((set, get) => ({
  timeLeft: 25 * 60,
  isRunning: false,
  isPaused: false,
  currentSubject: null,
  sessionType: 'focus',
  sessionsCompleted: 0,
  settings: {
    focusDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsUntilLongBreak: 4,
  },

  startTimer: (subjectId) =>
    set({
      isRunning: true,
      isPaused: false,
      currentSubject: subjectId || null,
    }),

  pauseTimer: () => set({ isPaused: true }),

  resumeTimer: () => set({ isPaused: false }),

  resetTimer: () => {
    const { settings, sessionType } = get();
    const duration =
      sessionType === 'focus' ? settings.focusDuration : settings.shortBreak;

    set({
      timeLeft: duration * 60,
      isRunning: false,
      isPaused: false,
    });
  },

  skipSession: () => {
    const { sessionType, sessionsCompleted, settings } = get();

    if (sessionType === 'focus') {
      const newSessionsCompleted = sessionsCompleted + 1;
      const isLongBreak =
        newSessionsCompleted % settings.sessionsUntilLongBreak === 0;

      set({
        sessionType: 'break',
        sessionsCompleted: newSessionsCompleted,
        timeLeft: (isLongBreak ? settings.longBreak : settings.shortBreak) * 60,
        isRunning: false,
      });
    } else {
      set({
        sessionType: 'focus',
        timeLeft: settings.focusDuration * 60,
        isRunning: false,
      });
    }
  },

  tick: () => {
    const { timeLeft, isRunning, isPaused } = get();

    if (!isRunning || isPaused) return;

    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
    } else {
      get().skipSession();
    }
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
}));