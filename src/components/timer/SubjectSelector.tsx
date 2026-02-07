import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { Subject } from '@/types';
import { cn } from '@/utils/cn';

interface SubjectSelectorProps {
  subjects: Subject[];
  selectedId?: string;
  onSelect: (subjectId: string) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  selectedId,
  onSelect,
}) => {
  return (
    <div>
      <label className="flex items-center gap-2 text-sm font-medium mb-3">
        <BookOpen className="w-4 h-4" />
        Select Subject
      </label>
      <div className="grid grid-cols-2 gap-3">
        {subjects.map((subject, idx) => (
          <motion.button
            key={subject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(subject.id)}
            className={cn(
              'p-3 rounded-xl border-2 transition-all text-left',
              selectedId === subject.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
            )}
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="font-medium text-sm">{subject.name}</span>
            </div>
            <div className="text-xs text-gray-500 capitalize">
              {subject.priority} priority
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};