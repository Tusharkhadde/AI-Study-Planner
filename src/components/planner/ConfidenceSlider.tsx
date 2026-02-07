import React from 'react';
import { motion } from 'framer-motion';
import { CONFIDENCE_EMOJIS } from '@/types';
import { cn } from '@/utils/cn';

interface ConfidenceSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const ConfidenceSlider: React.FC<ConfidenceSliderProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {CONFIDENCE_EMOJIS.map((emoji, idx) => {
          const level = idx + 1;
          const isSelected = value === level;

          return (
            <motion.button
              key={idx}
              onClick={() => onChange(level)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'text-4xl transition-all',
                isSelected ? 'scale-125' : 'opacity-50 grayscale'
              )}
            >
              {emoji}
            </motion.button>
          );
        })}
      </div>

      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <span>Not Confident</span>
        <span>Very Confident</span>
      </div>
    </div>
  );
};