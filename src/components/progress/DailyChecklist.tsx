import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { format } from 'date-fns';

export const DailyChecklist: React.FC = () => {
  const todayBlocks = [
    {
      id: '1',
      subject: 'Mathematics',
      time: '09:00',
      duration: 60,
      completed: true,
      color: '#3b82f6',
    },
    {
      id: '2',
      subject: 'Physics',
      time: '14:00',
      duration: 60,
      completed: false,
      color: '#8b5cf6',
    },
    {
      id: '3',
      subject: 'Chemistry',
      time: '16:00',
      duration: 60,
      completed: false,
      color: '#ec4899',
    },
  ];

  const completedCount = todayBlocks.filter((b) => b.completed).length;
  const totalCount = todayBlocks.length;
  const completionRate = (completedCount / totalCount) * 100;

  return (
    <Card variant="glass" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold">Today's Tasks</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {format(new Date(), 'EEEE, MMMM d')}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">
            {completedCount}/{totalCount}
          </div>
          <div className="text-sm text-gray-500">{completionRate.toFixed(0)}%</div>
        </div>
      </div>

      <div className="space-y-3">
        {todayBlocks.map((block) => (
          <motion.div
            key={block.id}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
              block.completed
                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            }`}
          >
            <div>
              {block.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-400" />
              )}
            </div>
            <div
              className="w-1 h-8 rounded-full"
              style={{ backgroundColor: block.color }}
            />
            <div className="flex-1">
              <div className={`font-medium ${block.completed && 'line-through'}`}>
                {block.subject}
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {block.time} • {block.duration} min
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};