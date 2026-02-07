import { Subject, StudyBlock, WeeklySchedule } from '@/types';
import { addDays, format } from 'date-fns';

export const scheduleUtils = {
  calculateTotalHours: (subjects: Subject[]): number => {
    return subjects.reduce((total, subject) => {
      // More hours for lower confidence
      const confidenceMultiplier = (6 - subject.confidenceLevel) * 0.5;
      const priorityMultiplier = 
        subject.priority === 'critical' ? 2 :
        subject.priority === 'high' ? 1.5 :
        subject.priority === 'medium' ? 1 : 0.8;
      
      const topicsHours = subject.topics.reduce(
        (sum, topic) => sum + (topic.timeEstimate / 60),
        0
      );

      return total + (topicsHours * confidenceMultiplier * priorityMultiplier);
    }, 0);
  },

  distributeStudyTime: (
    subjects: Subject[],
    totalAvailableHours: number
  ): Record<string, number> => {
    const distribution: Record<string, number> = {};
    const totalWeight = subjects.reduce((sum, subject) => {
      const confidenceWeight = 6 - subject.confidenceLevel;
      const priorityWeight =
        subject.priority === 'critical' ? 4 :
        subject.priority === 'high' ? 3 :
        subject.priority === 'medium' ? 2 : 1;
      return sum + (confidenceWeight * priorityWeight);
    }, 0);

    subjects.forEach((subject) => {
      const confidenceWeight = 6 - subject.confidenceLevel;
      const priorityWeight =
        subject.priority === 'critical' ? 4 :
        subject.priority === 'high' ? 3 :
        subject.priority === 'medium' ? 2 : 1;
      
      const weight = confidenceWeight * priorityWeight;
      distribution[subject.id] = (weight / totalWeight) * totalAvailableHours;
    });

    return distribution;
  },

  sortByPriority: (subjects: Subject[]): Subject[] => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    
    return [...subjects].sort((a, b) => {
      // First by priority
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then by confidence (lower confidence = higher priority)
      return a.confidenceLevel - b.confidenceLevel;
    });
  },

  getStudyBlocksByDate: (
    schedule: WeeklySchedule[],
    date: string
  ): StudyBlock[] => {
    return schedule
      .flatMap((week) => week.studyBlocks)
      .filter((block) => block.date === date)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  },

  getUpcomingBlocks: (
    schedule: WeeklySchedule[],
    days: number = 7
  ): StudyBlock[] => {
    const today = new Date();
    const futureDate = addDays(today, days);

    return schedule
      .flatMap((week) => week.studyBlocks)
      .filter((block) => {
        const blockDate = new Date(block.date);
        return blockDate >= today && blockDate <= futureDate && !block.completed;
      })
      .sort((a, b) => {
        const dateCompare = a.date.localeCompare(b.date);
        if (dateCompare !== 0) return dateCompare;
        return a.startTime.localeCompare(b.startTime);
      });
  },

  calculateCompletionRate: (blocks: StudyBlock[]): number => {
    if (blocks.length === 0) return 0;
    const completed = blocks.filter((b) => b.completed).length;
    return (completed / blocks.length) * 100;
  },

  getWeekProgress: (week: WeeklySchedule): {
    completed: number;
    total: number;
    percentage: number;
  } => {
    const total = week.studyBlocks.length;
    const completed = week.studyBlocks.filter((b) => b.completed).length;
    
    return {
      completed,
      total,
      percentage: total > 0 ? (completed / total) * 100 : 0,
    };
  },
};