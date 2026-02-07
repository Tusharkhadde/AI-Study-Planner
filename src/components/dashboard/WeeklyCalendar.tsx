import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarBlock } from './CalendarBlock';
import { StudyBlock } from '@/types';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { cn } from '@/utils/cn';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const WeeklyCalendar: React.FC = () => {
  const { currentPlan, completeStudyBlock } = usePlanStore();
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [selectedBlock, setSelectedBlock] = useState<StudyBlock | null>(null);

  if (!currentPlan) return null;

  const weeklySchedules = currentPlan.weeklySchedules || [];
  const weeklySchedule = weeklySchedules[selectedWeek];
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });

  const getBlocksForDay = (dayIndex: number): StudyBlock[] => {
    if (!weeklySchedule?.studyBlocks) return [];
    const date = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
    return weeklySchedule.studyBlocks.filter((block) => block.date === date);
  };

  if (weeklySchedules.length === 0) {
    return (
      <Card variant="glass" className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <CalendarIcon className="w-6 h-6 text-primary-600" />
          <h3 className="text-xl font-bold">Weekly Schedule</h3>
        </div>
        <div className="text-center py-12 text-gray-500">
          <p>No study schedule available yet.</p>
          <p className="text-sm mt-2">Your weekly plan will appear here.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="glass" className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Weekly Schedule</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
            disabled={selectedWeek === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <span className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg font-medium">
            Week {selectedWeek + 1}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setSelectedWeek(
                Math.min(weeklySchedules.length - 1, selectedWeek + 1)
              )
            }
            disabled={selectedWeek === weeklySchedules.length - 1}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Weekly Goals */}
      {weeklySchedule?.weeklyGoals && weeklySchedule.weeklyGoals.length > 0 && (
        <div className="mb-6 p-4 bg-primary-50 dark:bg-primary-950 rounded-xl">
          <h4 className="font-semibold mb-2">This Week's Goals</h4>
          <ul className="space-y-1">
            {weeklySchedule.weeklyGoals.map((goal, idx) => (
              <li key={idx} className="text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {goal}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {DAYS.map((day, idx) => {
          const date = addDays(weekStart, idx);
          const isToday = isSameDay(date, new Date());
          const blocksForDay = getBlocksForDay(idx);

          return (
            <div
              key={day}
              className={cn(
                'text-center p-2 rounded-lg',
                isToday && 'bg-primary-100 dark:bg-primary-900'
              )}
            >
              <div
                className={cn(
                  'font-semibold',
                  isToday && 'text-primary-600'
                )}
              >
                {day}
              </div>
              <div className="text-sm text-gray-500">
                {format(date, 'd')}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {blocksForDay.length} sessions
              </div>
            </div>
          );
        })}
      </div>

      {/* Study Blocks Grid */}
      <div className="grid grid-cols-7 gap-2">
        {DAYS.map((_, dayIdx) => {
          const blocksForDay = getBlocksForDay(dayIdx);

          return (
            <div key={dayIdx} className="space-y-2 min-h-[100px]">
              {blocksForDay.length === 0 ? (
                <div className="h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-400">No sessions</span>
                </div>
              ) : (
                blocksForDay.map((block, blockIdx) => (
                  <CalendarBlock
                    key={block.id || blockIdx}
                    block={block}
                    onClick={() => setSelectedBlock(block)}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>

      {/* Block Detail Modal */}
      <AnimatePresence>
        {selectedBlock && (
          <SubjectDetailModal
            block={selectedBlock}
            onClose={() => setSelectedBlock(null)}
            onComplete={() => {
              completeStudyBlock(selectedBlock.id);
              setSelectedBlock(null);
            }}
          />
        )}
      </AnimatePresence>
    </Card>
  );
};

// Inline SubjectDetailModal component
const SubjectDetailModal: React.FC<{
  block: StudyBlock;
  onClose: () => void;
  onComplete: () => void;
}> = ({ block, onClose, onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-2xl font-bold mb-2">{block.subjectName}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {block.date} at {block.startTime}
        </p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-500">Duration</span>
            <span className="font-medium">{block.duration} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Type</span>
            <span className="font-medium capitalize">{block.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span
              className={cn(
                'font-medium',
                block.completed ? 'text-green-600' : 'text-orange-600'
              )}
            >
              {block.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>

        {block.topics && block.topics.length > 0 && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Topics to Cover</h4>
            <ul className="space-y-1">
              {block.topics.map((topic, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          {!block.completed && (
            <Button variant="primary" onClick={onComplete} className="flex-1">
              Mark Complete
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};