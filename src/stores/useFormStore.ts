import { create } from 'zustand';
import { Subject, Assessment, StudyPreferences } from '@/types';

interface FormState {
  currentStep: number;
  totalSteps: number;
  formData: {
    studentName: string;
    subjects: Partial<Subject>[];
    assessments: Partial<Assessment>[];
    preferences: StudyPreferences;
    targetDate: string;
  };
  errors: Record<string, string>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormState['formData']>) => void;
  setErrors: (errors: Record<string, string>) => void;
  clearErrors: () => void;
  resetForm: () => void;
  isStepValid: (step: number) => boolean;
}

const initialFormData = {
  studentName: '',
  subjects: [],
  assessments: [],
  preferences: {
    dailyStudyHours: 4,
    preferredTimeSlots: ['afternoon', 'evening'],
    breakDuration: 15,
    pomodoroLength: 25,
    weekendStudy: true,
    studyDaysPerWeek: 6,
  },
  targetDate: '',
};

export const useFormStore = create<FormState>((set, get) => ({
  currentStep: 1,
  totalSteps: 6,
  formData: initialFormData,
  errors: {},

  setStep: (step) => set({ currentStep: step }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, state.totalSteps),
    })),

  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setErrors: (errors) => set({ errors }),

  clearErrors: () => set({ errors: {} }),

  resetForm: () =>
    set({
      currentStep: 1,
      formData: initialFormData,
      errors: {},
    }),

  isStepValid: (step) => {
    const { formData } = get();

    switch (step) {
      case 1:
        return formData.studentName.trim().length > 0;
      case 2:
        return formData.subjects.length > 0;
      case 3:
        return formData.preferences.dailyStudyHours > 0;
      case 4:
        return formData.targetDate.length > 0;
      case 5:
        return formData.assessments.length > 0;
      default:
        return true;
    }
  },
}));