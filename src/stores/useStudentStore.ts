import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { StudentProfile, StudyPreferences } from '@/types';
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from '@/config/constants';

interface StudentState {
  profile: StudentProfile | null;
  preferences: StudyPreferences;
  setProfile: (profile: StudentProfile) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  setPreferences: (preferences: StudyPreferences) => void;
  updatePreferences: (updates: Partial<StudyPreferences>) => void;
  clearStudent: () => void;
}

export const useStudentStore = create<StudentState>()(
  persist(
    (set) => ({
      profile: null,
      preferences: DEFAULT_PREFERENCES,

      setProfile: (profile) => set({ profile }),

      updateProfile: (updates) =>
        set((state) => ({
          profile: state.profile
            ? { ...state.profile, ...updates, updatedAt: new Date().toISOString() }
            : null,
        })),

      setPreferences: (preferences) => set({ preferences }),

      updatePreferences: (updates) =>
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        })),

      clearStudent: () =>
        set({
          profile: null,
          preferences: DEFAULT_PREFERENCES,
        }),
    }),
    {
      name: STORAGE_KEYS.studentProfile,
    }
  )
);