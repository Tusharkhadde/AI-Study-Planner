import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ConfidenceSlider } from './ConfidenceSlider';
import { Subject, Priority } from '@/types';
import { cn } from '@/utils/cn';

interface SubjectCardProps {
  subject: Partial<Subject>;
  index: number;
  onUpdate: (index: number, updates: Partial<Subject>) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

const priorities: { value: Priority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-orange-500' },
  { value: 'critical', label: 'Critical', color: 'bg-red-500' },
];

export const SubjectCard: React.FC<SubjectCardProps> = ({
  subject,
  index,
  onUpdate,
  onRemove,
  canRemove,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700"
    >
      {canRemove && (
        <button
          onClick={() => onRemove(index)}
          className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}

      <div className="space-y-6">
        <Input
          label="Subject Name"
          placeholder="e.g., Mathematics, Physics"
          value={subject.name || ''}
          onChange={(e) => onUpdate(index, { name: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium mb-3">
            Confidence Level
          </label>
          <ConfidenceSlider
            value={subject.confidenceLevel || 3}
            onChange={(value) => onUpdate(index, { confidenceLevel: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">Priority</label>
          <div className="grid grid-cols-4 gap-2">
            {priorities.map((priority) => (
              <button
                key={priority.value}
                onClick={() => onUpdate(index, { priority: priority.value })}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium transition-all',
                  subject.priority === priority.value
                    ? `${priority.color} text-white shadow-lg`
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                )}
              >
                {priority.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};