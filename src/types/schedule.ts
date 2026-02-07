import { Subject, Assessment } from './subject';

export interface StudyPlan {
  id: string;
  studentId: string;
  targetDate: string;
  generatedAt: string;
  totalWeeks: number;
  totalHours: number;
  subjects: Subject[];
  assessments: Assessment[];
  weeklySchedules: WeeklySchedule[];
  aiInsights: AIInsights;
}

export interface WeeklySchedule {
  weekNumber: number;
  startDate: string;
  endDate: string;
  totalHours: number;
  studyBlocks: StudyBlock[];
  weeklyGoals: string[];
  checkpointDate?: string;
}

export interface StudyBlock {
  id: string;
  subjectId: string;
  subjectName: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  topics: string[];
  type: StudyBlockType;
  completed: boolean;
  notes?: string;
  actualDuration?: number;
}

export type StudyBlockType = 'learning' | 'practice' | 'revision' | 'assessment-prep';

export interface AIInsights {
  priorityReasoning: string;
  studyTips: string[];
  potentialChallenges: string[];
  recommendedResources?: ResourceRecommendation[];
  balancingStrategy: string;
}

export interface ResourceRecommendation {
  subject: string;
  type: 'video' | 'article' | 'practice' | 'book';
  title: string;
  url?: string;
}