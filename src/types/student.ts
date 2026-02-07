export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  grade?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudyPreferences {
  dailyStudyHours: number;
  preferredTimeSlots: TimeSlot[];
  breakDuration: number;
  pomodoroLength: number;
  weekendStudy: boolean;
  studyDaysPerWeek: number;
}

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'night';

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  morning: 'Morning (6AM - 12PM)',
  afternoon: 'Afternoon (12PM - 6PM)',
  evening: 'Evening (6PM - 9PM)',
  night: 'Night (9PM - 12AM)',
};