export const APP_CONFIG = {
  name: 'AI Study Planner',
  version: '1.0.0',
  description: 'Smart AI-powered study schedule generator',
  author: 'Your Name',
  repository: 'https://github.com/yourusername/ai-study-planner',
};

export const API_CONFIG = {
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY || '',
  geminiModel: 'gemini-1.5-flash', // Updated model name
  maxRetries: 3,
  timeout: 30000,
};

// Log API key status on load
if (!API_CONFIG.geminiApiKey || API_CONFIG.geminiApiKey === 'your_api_key_here') {
  console.warn(`
╔════════════════════════════════════════════════════════════════╗
║                    ⚠️  API KEY NOTICE                         ║
╠════════════════════════════════════════════════════════════════╣
║  No Google Gemini API key detected!                            ║
║                                                                ║
║  The app will work with an intelligent fallback planner,      ║
║  but for AI-powered features, please:                         ║
║                                                                ║
║  1. Get a FREE API key: https://makersuite.google.com/app/apikey ║
║  2. Add to .env file: VITE_GEMINI_API_KEY=your_key_here      ║
║  3. Restart the dev server: npm run dev                       ║
╚════════════════════════════════════════════════════════════════╝
  `);
} else {
  console.log('✅ Google Gemini API key loaded');
}

export const STORAGE_KEYS = {
  studentProfile: 'study-planner-student',
  studyPlan: 'study-planner-plan',
  progress: 'study-planner-progress',
  preferences: 'study-planner-preferences',
  theme: 'study-planner-theme',
};

export const VALIDATION_RULES = {
  minSubjects: 1,
  maxSubjects: 10,
  minStudyHours: 1,
  maxStudyHours: 12,
  minConfidence: 1,
  maxConfidence: 5,
  minDaysAhead: 7,
  maxDaysAhead: 365,
};

export const DEFAULT_PREFERENCES = {
  dailyStudyHours: 4,
  preferredTimeSlots: ['afternoon', 'evening'] as ('morning' | 'afternoon' | 'evening' | 'night')[],
  breakDuration: 15,
  pomodoroLength: 25,
  weekendStudy: true,
  studyDaysPerWeek: 6,
};

export const SUBJECT_COLORS = [
  '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b',
  '#10b981', '#06b6d4', '#6366f1', '#f97316',
  '#14b8a6', '#a855f7', '#ef4444', '#22c55e',
];

export const ACHIEVEMENT_THRESHOLDS = {
  streak: [7, 14, 30, 60, 100],
  hours: [10, 25, 50, 100, 200],
  completion: [50, 75, 90, 95, 100],
};