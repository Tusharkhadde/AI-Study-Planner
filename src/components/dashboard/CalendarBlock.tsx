import React from 'react';
import { motion } from 'framer-motion';
import { Check, BookOpen, Dumbbell, RotateCcw, FileText } from 'lucide-react';
import { StudyBlock } from '@/types';
import { usePlanStore } from '@/stores/usePlanStore';
import { cn } from '@/utils/cn';

interface CalendarBlockProps {
  block: StudyBlock;
  onClick?: () => void;
}

const typeIcons: Record<string, any> = {
  learning: BookOpen,
  practice: Dumbbell,
  revision: RotateCcw,
  'assessment-prep': FileText,
};

export const CalendarBlock: React.FC<CalendarBlockProps> = ({
  block,
  onClick,
}) => {
  const { currentPlan } = usePlanStore();
  const subject = currentPlan?.subjects?.find((s) => s.id === block.subjectId);
  const Icon = typeIcons[block.type] || BookOpen;
  const subjectColor = subject?.color || '#3b82f6';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'rounded-lg p-2 cursor-pointer transition-all border-l-4',
        block.completed ? 'opacity-60' : ''
      )}
      style={{
        backgroundColor: `${subjectColor}20`,
        borderLeftColor: subjectColor,
      }}
    >
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-xs truncate">{block.subjectName}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-0.5">
            <Icon className="w-3 h-3" />
            <span className="truncate capitalize">{block.type}</span>
          </div>
        </div>
        {block.completed && (
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
            <Check className="w-2.5 h-2.5 text-white" />
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {block.duration}m • {block.startTime}
      </div>
    </motion.div>
  );
};