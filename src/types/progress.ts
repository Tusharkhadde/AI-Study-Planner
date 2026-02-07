export interface ProgressData {
  studentId: string;
  planId: string;
  dailyLogs: DailyLog[];
  weeklyReviews: WeeklyReview[];
  confidenceUpdates: ConfidenceUpdate[];
  achievements: Achievement[];
  stats: ProgressStats;
}

export interface DailyLog {
  date: string;
  completedBlocks: string[]; // StudyBlock IDs
  totalMinutesStudied: number;
  subjectBreakdown: Record<string, number>;
  focusSessions: number;
  notes?: string;
}

export interface WeeklyReview {
  weekNumber: number;
  date: string;
  hoursCompleted: number;
  hoursPlanned: number;
  completionRate: number;
  highlights: string[];
  challenges: string[];
  adjustmentsNeeded: string[];
}

export interface ConfidenceUpdate {
  subjectId: string;
  date: string;
  previousLevel: number;
  newLevel: number;
  reason?: string;
}

export interface Achievement {
  id: string;
  type: AchievementType;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
  progress?: number;
  target?: number;
}

export type AchievementType = 
  | 'streak' 
  | 'hours' 
  | 'completion' 
  | 'improvement' 
  | 'consistency';

export interface ProgressStats {
  totalHoursStudied: number;
  currentStreak: number;
  longestStreak: number;
  averageSessionLength: number;
  completionRate: number;
  subjectMastery: Record<string, number>;
  weeklyAverage: number;
}