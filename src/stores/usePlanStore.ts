import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudyPlan, WeeklySchedule, StudyBlock } from '@/types';
import { STORAGE_KEYS } from '@/config/constants';

interface PlanState {
  currentPlan: StudyPlan | null;
  isGenerating: boolean;
  error: string | null;
  setPlan: (plan: StudyPlan) => void;
  setGenerating: (status: boolean) => void;
  setError: (error: string | null) => void;
  updateStudyBlock: (blockId: string, updates: Partial<StudyBlock>) => void;
  completeStudyBlock: (blockId: string, actualDuration?: number) => void;
  getCurrentWeek: () => WeeklySchedule | null;
  getUpcomingBlocks: (days: number) => StudyBlock[];
  clearPlan: () => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set, get) => ({
      currentPlan: null,
      isGenerating: false,
      error: null,

      setPlan: (plan) => set({ currentPlan: plan, error: null }),

      setGenerating: (status) => set({ isGenerating: status }),

      setError: (error) => set({ error }),

      updateStudyBlock: (blockId, updates) =>
        set((state) => {
          if (!state.currentPlan) return state;

          return {
            currentPlan: {
              ...state.currentPlan,
              weeklySchedules: state.currentPlan.weeklySchedules.map((week) => ({
                ...week,
                studyBlocks: week.studyBlocks.map((block) =>
                  block.id === blockId ? { ...block, ...updates } : block
                ),
              })),
            },
          };
        }),

      completeStudyBlock: (blockId, actualDuration) =>
        set((state) => {
          if (!state.currentPlan) return state;

          return {
            currentPlan: {
              ...state.currentPlan,
              weeklySchedules: state.currentPlan.weeklySchedules.map((week) => ({
                ...week,
                studyBlocks: week.studyBlocks.map((block) =>
                  block.id === blockId
                    ? { ...block, completed: true, actualDuration }
                    : block
                ),
              })),
            },
          };
        }),

      getCurrentWeek: () => {
        const plan = get().currentPlan;
        if (!plan) return null;

        const now = new Date();
        return (
          plan.weeklySchedules.find((week) => {
            const start = new Date(week.startDate);
            const end = new Date(week.endDate);
            return now >= start && now <= end;
          }) || null
        );
      },

      getUpcomingBlocks: (days) => {
        const plan = get().currentPlan;
        if (!plan) return [];

        const now = new Date();
        const futureDate = new Date(now);
        futureDate.setDate(futureDate.getDate() + days);

        return plan.weeklySchedules
          .flatMap((week) => week.studyBlocks)
          .filter((block) => {
            const blockDate = new Date(block.date);
            return blockDate >= now && blockDate <= futureDate;
          })
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      },

      clearPlan: () => set({ currentPlan: null, error: null }),
    }),
    {
      name: STORAGE_KEYS.studyPlan,
    }
  )
);