import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  ProgressData,
  DailyLog,
  WeeklyReview,
  ConfidenceUpdate,
  Achievement,
} from '@/types';
import { STORAGE_KEYS } from '@/config/constants';

interface ProgressState {
  progress: ProgressData | null;
  initializeProgress: (studentId: string, planId: string) => void;
  logStudySession: (
    blockId: string,
    duration: number,
    subjectId: string
  ) => void;
  addWeeklyReview: (review: Omit<WeeklyReview, 'date'>) => void;
  updateConfidence: (update: Omit<ConfidenceUpdate, 'date'>) => void;
  unlockAchievement: (achievement: Omit<Achievement, 'unlockedAt'>) => void;
  getStreak: () => number;
  getTodayLog: () => DailyLog | null;
  clearProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: null,

      initializeProgress: (studentId, planId) =>
        set({
          progress: {
            studentId,
            planId,
            dailyLogs: [],
            weeklyReviews: [],
            confidenceUpdates: [],
            achievements: [],
            stats: {
              totalHoursStudied: 0,
              currentStreak: 0,
              longestStreak: 0,
              averageSessionLength: 0,
              completionRate: 0,
              subjectMastery: {},
              weeklyAverage: 0,
            },
          },
        }),

      logStudySession: (blockId, duration, subjectId) =>
        set((state) => {
          if (!state.progress) return state;

          const today = new Date().toISOString().split('T')[0];
          const existingLogIndex = state.progress.dailyLogs.findIndex(
            (log) => log.date === today
          );

          let updatedLogs = [...state.progress.dailyLogs];

          if (existingLogIndex >= 0) {
            const existingLog = updatedLogs[existingLogIndex];
            updatedLogs[existingLogIndex] = {
              ...existingLog,
              completedBlocks: [...existingLog.completedBlocks, blockId],
              totalMinutesStudied: existingLog.totalMinutesStudied + duration,
              subjectBreakdown: {
                ...existingLog.subjectBreakdown,
                [subjectId]:
                  (existingLog.subjectBreakdown[subjectId] || 0) + duration,
              },
              focusSessions: existingLog.focusSessions + 1,
            };
          } else {
            updatedLogs.push({
              date: today,
              completedBlocks: [blockId],
              totalMinutesStudied: duration,
              subjectBreakdown: { [subjectId]: duration },
              focusSessions: 1,
            });
          }

          // Calculate new stats
          const totalMinutes = updatedLogs.reduce(
            (sum, log) => sum + log.totalMinutesStudied,
            0
          );
          const totalHours = totalMinutes / 60;

          return {
            progress: {
              ...state.progress,
              dailyLogs: updatedLogs,
              stats: {
                ...state.progress.stats,
                totalHoursStudied: totalHours,
              },
            },
          };
        }),

      addWeeklyReview: (review) =>
        set((state) => {
          if (!state.progress) return state;

          return {
            progress: {
              ...state.progress,
              weeklyReviews: [
                ...state.progress.weeklyReviews,
                { ...review, date: new Date().toISOString() },
              ],
            },
          };
        }),

      updateConfidence: (update) =>
        set((state) => {
          if (!state.progress) return state;

          return {
            progress: {
              ...state.progress,
              confidenceUpdates: [
                ...state.progress.confidenceUpdates,
                { ...update, date: new Date().toISOString() },
              ],
            },
          };
        }),

      unlockAchievement: (achievement) =>
        set((state) => {
          if (!state.progress) return state;

          // Check if achievement already unlocked
          const exists = state.progress.achievements.some(
            (a) => a.id === achievement.id
          );
          if (exists) return state;

          return {
            progress: {
              ...state.progress,
              achievements: [
                ...state.progress.achievements,
                { ...achievement, unlockedAt: new Date().toISOString() },
              ],
            },
          };
        }),

      getStreak: () => {
        const progress = get().progress;
        if (!progress || progress.dailyLogs.length === 0) return 0;

        const logs = [...progress.dailyLogs].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < logs.length; i++) {
          const logDate = new Date(logs[i].date);
          logDate.setHours(0, 0, 0, 0);
          
          const expectedDate = new Date(today);
          expectedDate.setDate(today.getDate() - i);
          expectedDate.setHours(0, 0, 0, 0);

          if (logDate.getTime() === expectedDate.getTime()) {
            streak++;
          } else {
            break;
          }
        }

        return streak;
      },

      getTodayLog: () => {
        const progress = get().progress;
        if (!progress) return null;

        const today = new Date().toISOString().split('T')[0];
        return progress.dailyLogs.find((log) => log.date === today) || null;
      },

      clearProgress: () => set({ progress: null }),
    }),
    {
      name: STORAGE_KEYS.progress,
    }
  )
);