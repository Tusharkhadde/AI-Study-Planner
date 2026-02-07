import { Subject, Assessment } from './subject';
import { StudyPreferences } from './student';

export interface AIGenerationRequest {
  subjects: Subject[];
  assessments: Assessment[];
  preferences: StudyPreferences;
  targetDate: string;
  studentLevel?: string;
}

export interface AIGenerationResponse {
  success: boolean;
  plan?: {
    weeklySchedules: any[];
    insights: {
      priorityReasoning: string;
      studyTips: string[];
      potentialChallenges: string[];
      balancingStrategy: string;
    };
  };
  error?: string;
}

export interface AIRebalanceRequest {
  currentPlan: any;
  progressData: any;
  confidenceChanges: any[];
}

export interface AITipRequest {
  subject: string;
  topic: string;
  difficulty: string;
  timeAvailable: number;
}