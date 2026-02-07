export interface Subject {
  id: string;
  name: string;
  color: string;
  icon?: string;
  confidenceLevel: number; // 1-5
  priority: Priority;
  targetScore?: number;
  currentScore?: number;
  prerequisites?: string[]; // IDs of prerequisite subjects
  topics: Topic[];
  assessments: Assessment[];
  totalHoursAllocated?: number;
  createdAt: string;
}

export interface Topic {
  id: string;
  name: string;
  completed: boolean;
  timeEstimate: number; // in minutes
  difficulty: Difficulty;
  notes?: string;
}

export interface Assessment {
  id: string;
  subjectId: string;
  type: AssessmentType;
  date: string;
  weight: number; // percentage
  syllabusCoverage?: string[];
}

export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type AssessmentType = 'quiz' | 'test' | 'midterm' | 'final' | 'project';

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#f97316',
  critical: '#ef4444',
};

export const CONFIDENCE_EMOJIS = ['😰', '😟', '😐', '😊', '😎'];