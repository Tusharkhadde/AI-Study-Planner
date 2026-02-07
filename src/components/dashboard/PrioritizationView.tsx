import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { PRIORITY_COLORS, CONFIDENCE_EMOJIS } from '@/types';
import { cn } from '@/utils/cn';

export const PrioritizationView: React.FC = () => {
  const { currentPlan } = usePlanStore();

  if (!currentPlan || !currentPlan.subjects || currentPlan.subjects.length === 0) {
    return null;
  }

  const sortedSubjects = [...currentPlan.subjects].sort((a, b) => {
    const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    const priorityDiff =
      (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2);
    if (priorityDiff !== 0) return priorityDiff;
    return (a.confidenceLevel ?? 3) - (b.confidenceLevel ?? 3);
  });

  const priorityReasoning = currentPlan.aiInsights?.priorityReasoning || 
    'Subjects are prioritized based on confidence levels and assessment dates.';

  return (
    <Card variant="glass" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Priority Overview</h3>
        <button className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
          <Info className="w-5 h-5" />
        </button>
      </div>

      {/* Priority Reasoning */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
              AI Priority Reasoning
            </div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {priorityReasoning}
            </p>
          </div>
        </div>
      </div>

      {/* Subject Priority List */}
      <div className="space-y-3">
        {sortedSubjects.map((subject, idx) => (
          <motion.div
            key={subject.id || idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
          >
            <div className="text-2xl font-bold text-gray-300 dark:text-gray-600 w-8">
              #{idx + 1}
            </div>
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: subject.color || '#3b82f6' }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{subject.name || 'Unnamed Subject'}</div>
              <div className="flex items-center gap-3 text-sm">
                <span
                  className="px-2 py-0.5 rounded text-white text-xs font-medium"
                  style={{
                    backgroundColor: PRIORITY_COLORS[subject.priority] || PRIORITY_COLORS.medium,
                  }}
                >
                  {subject.priority || 'medium'}
                </span>
                <span className="text-gray-500">
                  {subject.totalHoursAllocated || 0}h allocated
                </span>
              </div>
            </div>
            <div className="text-3xl">
              {CONFIDENCE_EMOJIS[(subject.confidenceLevel || 3) - 1]}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Priority Legend
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(PRIORITY_COLORS).map(([priority, color]) => (
            <div key={priority} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm capitalize">{priority}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};