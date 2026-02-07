import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { cn } from '@/utils/cn';

export const CalendarHeatmap: React.FC = () => {
  const weeks = Array.from({ length: 12 }, () =>
    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
  );

  const intensityColors = [
    'bg-gray-100 dark:bg-gray-800',
    'bg-green-200 dark:bg-green-900',
    'bg-green-400 dark:bg-green-700',
    'bg-green-500 dark:bg-green-600',
    'bg-green-600 dark:bg-green-500',
  ];

  return (
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-bold mb-6">Study Activity</h3>

      <div className="overflow-x-auto">
        <div className="flex gap-1">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((intensity, dayIdx) => (
                <motion.div
                  key={dayIdx}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: weekIdx * 0.02 + dayIdx * 0.01 }}
                  className={cn(
                    'w-4 h-4 rounded-sm',
                    intensityColors[intensity]
                  )}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-4">
        <span className="text-sm text-gray-500">Less</span>
        {intensityColors.map((color, idx) => (
          <div key={idx} className={cn('w-4 h-4 rounded-sm', color)} />
        ))}
        <span className="text-sm text-gray-500">More</span>
      </div>
    </Card>
  );
};