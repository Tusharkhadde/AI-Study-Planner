import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Subject, Assessment, Topic } from '@/types';
import { STORAGE_KEYS, SUBJECT_COLORS } from '@/config/constants';

interface SubjectState {
  subjects: Subject[];
  assessments: Assessment[];
  addSubject: (subject: Omit<Subject, 'id' | 'createdAt'>) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  removeSubject: (id: string) => void;
  addTopic: (subjectId: string, topic: Omit<Topic, 'id'>) => void;
  toggleTopic: (subjectId: string, topicId: string) => void;
  addAssessment: (assessment: Omit<Assessment, 'id'>) => void;
  updateAssessment: (id: string, updates: Partial<Assessment>) => void;
  removeAssessment: (id: string) => void;
  updateConfidence: (subjectId: string, newLevel: number) => void;
  clearSubjects: () => void;
  getSubjectById: (id: string) => Subject | undefined;
}

export const useSubjectStore = create<SubjectState>()(
  persist(
    (set, get) => ({
      subjects: [],
      assessments: [],

      addSubject: (subject) =>
        set((state) => ({
          subjects: [
            ...state.subjects,
            {
              ...subject,
              id: crypto.randomUUID(),
              color: SUBJECT_COLORS[state.subjects.length % SUBJECT_COLORS.length],
              createdAt: new Date().toISOString(),
              topics: [],
            },
          ],
        })),

      updateSubject: (id, updates) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === id ? { ...s, ...updates } : s
          ),
        })),

      removeSubject: (id) =>
        set((state) => ({
          subjects: state.subjects.filter((s) => s.id !== id),
          assessments: state.assessments.filter((a) => a.subjectId !== id),
        })),

      addTopic: (subjectId, topic) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === subjectId
              ? {
                  ...s,
                  topics: [...s.topics, { ...topic, id: crypto.randomUUID() }],
                }
              : s
          ),
        })),

      toggleTopic: (subjectId, topicId) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === subjectId
              ? {
                  ...s,
                  topics: s.topics.map((t) =>
                    t.id === topicId ? { ...t, completed: !t.completed } : t
                  ),
                }
              : s
          ),
        })),

      addAssessment: (assessment) =>
        set((state) => ({
          assessments: [
            ...state.assessments,
            { ...assessment, id: crypto.randomUUID() },
          ],
        })),

      updateAssessment: (id, updates) =>
        set((state) => ({
          assessments: state.assessments.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      removeAssessment: (id) =>
        set((state) => ({
          assessments: state.assessments.filter((a) => a.id !== id),
        })),

      updateConfidence: (subjectId, newLevel) =>
        set((state) => ({
          subjects: state.subjects.map((s) =>
            s.id === subjectId ? { ...s, confidenceLevel: newLevel } : s
          ),
        })),

      clearSubjects: () => set({ subjects: [], assessments: [] }),

      getSubjectById: (id) => get().subjects.find((s) => s.id === id),
    }),
    {
      name: STORAGE_KEYS.studentProfile,
    }
  )
);