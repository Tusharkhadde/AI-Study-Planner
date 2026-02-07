import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  AIGenerationRequest,
  AIGenerationResponse,
  StudyPlan,
  WeeklySchedule,
  StudyBlock,
} from '@/types';
import { API_CONFIG } from '@/config/constants';
import { addDays, format, startOfWeek, differenceInWeeks } from 'date-fns';

// Initialize AI only if API key is valid
let genAI: GoogleGenerativeAI | null = null;

if (API_CONFIG.geminiApiKey && API_CONFIG.geminiApiKey !== 'your_api_key_here') {
  try {
    genAI = new GoogleGenerativeAI(API_CONFIG.geminiApiKey);
    console.log('✅ Google Gemini AI initialized successfully');
  } catch (error) {
    console.warn('⚠️ Failed to initialize Gemini AI, using fallback mode');
  }
} else {
  console.warn('⚠️ No valid API key found. Using intelligent fallback planner.');
}

export class AIService {
  private model = genAI?.getGenerativeModel({ model: API_CONFIG.geminiModel });

  async generateStudyPlan(
    request: AIGenerationRequest
  ): Promise<AIGenerationResponse> {
    // Try AI first if available
    if (genAI && this.model) {
      try {
        const prompt = this.buildPrompt(request);
        
        console.log('🤖 Generating AI-powered study plan...');
        
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        console.log('✅ AI Response received');

        const parsedPlan = this.parseAIResponse(text, request);

        return {
          success: true,
          plan: parsedPlan,
        };
      } catch (error) {
        console.error('❌ AI Generation Error:', error);
        console.log('📝 Falling back to intelligent planner');
      }
    }

    // Use fallback planner
    return {
      success: true,
      plan: this.generateIntelligentFallbackPlan(request),
    };
  }

  private buildPrompt(request: AIGenerationRequest): string {
    const { subjects, assessments, preferences, targetDate } = request;

    return `You are an expert study planner. Create a personalized study schedule.

Target Date: ${targetDate}
Daily Study Hours: ${preferences.dailyStudyHours}
Study Days per Week: ${preferences.studyDaysPerWeek}

Subjects (${subjects.length}):
${subjects.map(s => `- ${s.name}: Confidence ${s.confidenceLevel}/5, Priority: ${s.priority}`).join('\n')}

Assessments:
${assessments.map(a => `- ${a.type} on ${a.date}`).join('\n')}

Create a JSON response with this EXACT structure:
{
  "insights": {
    "priorityReasoning": "explanation of priority logic",
    "studyTips": ["tip 1", "tip 2", "tip 3", "tip 4", "tip 5"],
    "potentialChallenges": ["challenge 1", "challenge 2", "challenge 3"],
    "balancingStrategy": "how subjects are balanced"
  },
  "weeklySchedules": [
    {
      "weekNumber": 1,
      "weeklyGoals": ["goal 1", "goal 2"],
      "studyBlocks": [
        {
          "subjectName": "subject name here",
          "topics": ["topic 1", "topic 2"],
          "duration": 60,
          "type": "learning",
          "dayOfWeek": 0
        }
      ]
    }
  ]
}

Create study blocks for each subject, distribute them evenly across the week.`;
  }

  private parseAIResponse(text: string, request: AIGenerationRequest): any {
    try {
      // Try to extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in AI response');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      // Convert to our format
      const startDate = new Date();
      const weeklySchedules: WeeklySchedule[] = (parsed.weeklySchedules || []).map(
        (week: any, index: number) => {
          const weekStart = addDays(startOfWeek(startDate), index * 7);
          const weekEnd = addDays(weekStart, 6);

          const studyBlocks: StudyBlock[] = (week.studyBlocks || []).map(
            (block: any) => {
              const blockDate = addDays(weekStart, block.dayOfWeek || 0);
              const subject = request.subjects.find(s => s.name === block.subjectName);

              return {
                id: crypto.randomUUID(),
                subjectId: subject?.id || crypto.randomUUID(),
                subjectName: block.subjectName || 'Study Session',
                date: format(blockDate, 'yyyy-MM-dd'),
                startTime: this.getTimeSlot(request.preferences.preferredTimeSlots[0]),
                endTime: '',
                duration: block.duration || 60,
                topics: block.topics || ['General study'],
                type: block.type || 'learning',
                completed: false,
              };
            }
          );

          return {
            weekNumber: week.weekNumber || index + 1,
            startDate: format(weekStart, 'yyyy-MM-dd'),
            endDate: format(weekEnd, 'yyyy-MM-dd'),
            totalHours: studyBlocks.reduce((sum, b) => sum + b.duration / 60, 0),
            studyBlocks,
            weeklyGoals: week.weeklyGoals || [`Complete week ${index + 1} studies`],
          };
        }
      );

      return {
        insights: parsed.insights || this.getDefaultInsights(),
        weeklySchedules,
      };
    } catch (error) {
      console.error('Parse Error:', error);
      // If parsing fails, use fallback
      return this.generateIntelligentFallbackPlan(request);
    }
  }

  private generateIntelligentFallbackPlan(request: AIGenerationRequest): any {
    console.log('🧠 Creating intelligent study plan...');
    
    const { subjects, assessments, preferences, targetDate } = request;
    const startDate = new Date();
    const endDate = new Date(targetDate);
    const totalWeeks = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000)));

    // Sort subjects by priority and confidence
    const sortedSubjects = [...subjects].sort((a, b) => {
      const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
      const aPriority = priorityWeight[a.priority || 'medium'];
      const bPriority = priorityWeight[b.priority || 'medium'];
      
      if (aPriority !== bPriority) return bPriority - aPriority;
      return (a.confidenceLevel || 3) - (b.confidenceLevel || 3);
    });

    const weeklySchedules: WeeklySchedule[] = [];
    const dailyHours = preferences.dailyStudyHours;
    const studyDays = Math.min(preferences.studyDaysPerWeek, 7);

    for (let weekNum = 0; weekNum < totalWeeks; weekNum++) {
      const weekStart = addDays(startOfWeek(startDate), weekNum * 7);
      const weekEnd = addDays(weekStart, 6);
      const studyBlocks: StudyBlock[] = [];

      // Create study blocks for each day of the week
      for (let dayNum = 0; dayNum < studyDays; dayNum++) {
        const blockDate = addDays(weekStart, dayNum);
        let hourCount = 0;

        // Distribute subjects across the day
        sortedSubjects.forEach((subject, subjectIdx) => {
          if (hourCount >= dailyHours) return;

          // Calculate session duration based on priority
          const sessionDuration = 60; // 60 minutes per session
          
          // Determine session type
          let sessionType: 'learning' | 'practice' | 'revision' | 'assessment-prep' = 'learning';
          
          if (weekNum === totalWeeks - 1) {
            sessionType = 'revision';
          } else if ((dayNum + subjectIdx) % 3 === 2) {
            sessionType = 'practice';
          }

          // Check for upcoming assessments
          const hasUpcomingAssessment = assessments.some(a => {
            if (!a.date) return false;
            const assessmentDate = new Date(a.date);
            const daysUntil = Math.ceil((assessmentDate.getTime() - blockDate.getTime()) / (24 * 60 * 60 * 1000));
            return daysUntil <= 7 && daysUntil >= 0;
          });

          if (hasUpcomingAssessment) {
            sessionType = 'assessment-prep';
          }

          studyBlocks.push({
            id: crypto.randomUUID(),
            subjectId: subject.id || crypto.randomUUID(),
            subjectName: subject.name || '',
            date: format(blockDate, 'yyyy-MM-dd'),
            startTime: this.getTimeSlot(preferences.preferredTimeSlots[0], hourCount),
            endTime: this.getTimeSlot(preferences.preferredTimeSlots[0], hourCount + 1),
            duration: sessionDuration,
            topics: [`Chapter ${weekNum + 1}`, 'Practice Problems'],
            type: sessionType,
            completed: false,
          });

          hourCount++;
        });
      }

      // Generate weekly goals for this week
      const goals = this.generateWeeklyGoals(weekNum, totalWeeks, sortedSubjects);

      weeklySchedules.push({
        weekNumber: weekNum + 1,
        startDate: format(weekStart, 'yyyy-MM-dd'),
        endDate: format(weekEnd, 'yyyy-MM-dd'),
        totalHours: studyBlocks.length,
        studyBlocks,
        weeklyGoals: goals,
      });
    }

    return {
      insights: {
        priorityReasoning: this.generatePriorityReasoning(sortedSubjects),
        studyTips: this.generateStudyTips(),
        potentialChallenges: this.generateChallenges(sortedSubjects, totalWeeks),
        balancingStrategy: this.generateBalancingStrategy(sortedSubjects, preferences),
      },
      weeklySchedules,
    };
  }

  private getTimeSlot(slot: string, hourOffset: number = 0): string {
    const baseSlots: Record<string, number> = {
      morning: 9,
      afternoon: 14,
      evening: 18,
      night: 20,
    };

    const baseHour = baseSlots[slot] || 14;
    const actualHour = (baseHour + hourOffset) % 24;
    return `${actualHour.toString().padStart(2, '0')}:00`;
  }

  private generateWeeklyGoals(weekNum: number, totalWeeks: number, subjects: any[]): string[] {
    const goals: string[] = [];
    
    if (weekNum === 0) {
      goals.push('Establish consistent study routine');
      goals.push('Complete initial assessment of all subjects');
    } else if (weekNum >= totalWeeks - 2) {
      goals.push('Focus on revision and practice tests');
      goals.push('Review and strengthen weak areas');
    } else {
      goals.push(`Master core concepts in ${subjects[0]?.name || 'priority subjects'}`);
      goals.push('Complete all practice exercises');
    }
    
    goals.push('Maintain daily study schedule');
    return goals;
  }

  private generatePriorityReasoning(subjects: any[]): string {
    const highPriority = subjects.filter(s => s.priority === 'critical' || s.priority === 'high');
    const lowConfidence = subjects.filter(s => (s.confidenceLevel || 3) <= 2);
    
    return `Prioritized ${highPriority.length} high-priority subjects and ${lowConfidence.length} low-confidence areas. More study time allocated to subjects needing improvement while maintaining regular practice for stronger subjects.`;
  }

  private generateStudyTips(): string[] {
    return [
      'Start each session with a 5-minute review of previous material',
      'Use the Pomodoro technique: 25 minutes focus, 5 minutes break',
      'Create summary notes at the end of each study session',
      'Test yourself regularly with practice questions',
      'Explain concepts aloud to reinforce understanding',
      'Mix different subjects to prevent mental fatigue',
      'Review difficult topics at the beginning of sessions when fresh',
    ];
  }

  private generateChallenges(subjects: any[], totalWeeks: number): string[] {
    return [
      `Maintaining consistency over ${totalWeeks} weeks`,
      `Balancing ${subjects.length} different subjects effectively`,
      'Avoiding procrastination on challenging topics',
      'Managing energy levels during long study sessions',
      'Adapting to unexpected schedule changes',
    ];
  }

  private generateBalancingStrategy(subjects: any[], preferences: any): string {
    return `Distributed ${subjects.length} subjects across ${preferences.studyDaysPerWeek} study days, with ${preferences.dailyStudyHours} hours daily. Higher priority and lower confidence subjects receive more frequent sessions. Mix of learning, practice, and revision maintains engagement.`;
  }

  private getDefaultInsights() {
    return {
      priorityReasoning: 'Subjects prioritized based on confidence levels and assessment dates',
      studyTips: this.generateStudyTips(),
      potentialChallenges: ['Time management', 'Maintaining focus', 'Consistent practice'],
      balancingStrategy: 'Equal distribution with emphasis on weak areas',
    };
  }

  async generateStudyTips(subject: string, topic: string): Promise<string[]> {
    if (!genAI || !this.model) {
      return this.getFallbackTips(subject, topic);
    }

    try {
      const prompt = `Generate 5 specific study tips for learning "${topic}" in ${subject}.`;
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text.split('\n').filter(tip => tip.trim().length > 0).slice(0, 5);
    } catch (error) {
      return this.getFallbackTips(subject, topic);
    }
  }

  private getFallbackTips(subject?: string, topic?: string): string[] {
    return [
      `Break down ${topic || 'the topic'} into smaller sections`,
      'Use active recall and spaced repetition',
      'Create visual aids like mind maps',
      'Practice with real examples',
      'Teach the concept to someone else',
    ];
  }
}

export const aiService = new AIService();