import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StudyBlock } from '@/types';
import { dateUtils } from '@/utils/dateUtils';
import { cn } from '@/utils/cn';

export const ActionItems: React.FC = () => {
  const { currentPlan, completeStudyBlock, getUpcomingBlocks } = usePlanStore();

  if (!currentPlan) return null;

  const todayBlocks = getUpcomingBlocks(1);
  const upcomingBlocks = getUpcomingBlocks(7).slice(0, 5);

  return (
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-bold mb-6">Today's Action Items</h3>

      {todayBlocks.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <div className="text-lg font-medium">All done for today!</div>
          <p className="text-gray-500">Take a well-deserved break.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {todayBlocks.map((block, idx) => (
            <ActionItem
              key={idx}
              block={block}
              onComplete={() => completeStudyBlock(block.id)}
            />
          ))}
        </div>
      )}

      {/* Upcoming Section */}
      {upcomingBlocks.length > 0 && (
        <div className="mt-8">
          <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-4">
            Coming Up
          </h4>
          <div className="space-y-2">
            {upcomingBlocks.map((block, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      currentPlan.subjects.find((s) => s.id === block.subjectId)
                        ?.color || '#ccc',
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium text-sm">{block.subjectName}</div>
                  <div className="text-xs text-gray-500">
                    {dateUtils.getRelativeTime(block.date)}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{block.duration}m</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

interface ActionItemProps {
  block: StudyBlock;
  onComplete: () => void;
}

const ActionItem: React.FC<ActionItemProps> = ({ block, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
        block.completed
          ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
      )}
    >
      <button
        onClick={onComplete}
        className={cn(
          'flex-shrink-0 transition-colors',
          block.completed
            ? 'text-green-500'
            : 'text-gray-400 hover:text-primary-500'
        )}
      >
        {block.completed ? (
          <CheckCircle2 className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        <div
          className={cn(
            'font-medium',
            block.completed && 'line-through text-gray-500'
          )}
        >
          {block.subjectName}
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <Clock className="w-3 h-3" />
          {block.startTime} • {block.duration} min
        </div>
        {block.topics.length > 0 && (
          <div className="text-sm text-gray-400 truncate mt-1">
            {block.topics.join(', ')}
          </div>
        )}
      </div>

      <Button variant="ghost" size="sm">
        <ArrowRight className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};