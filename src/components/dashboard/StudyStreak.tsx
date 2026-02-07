import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Star } from 'lucide-react';
import { useProgressStore } from '@/stores/useProgressStore';
import { Card } from '@/components/ui/card';
import { useCountUp } from '@/hooks/useCountUp';
import { cn } from '@/utils/cn';

export const StudyStreak: React.FC = () => {
  const { progress, getStreak } = useProgressStore();
  const streak = getStreak();
  const animatedStreak = useCountUp({ end: streak, duration: 1000 });

  const milestones = [7, 14, 30, 60, 100];
  const nextMilestone = milestones.find((m) => m > streak) || milestones[milestones.length - 1];
  const progress_to_milestone = (streak / nextMilestone) * 100;

  return (
    <Card variant="glass" className="p-6 overflow-hidden relative">
      {/* Background Fire Effect */}
      {streak > 0 && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-t from-orange-500/20 to-transparent"
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Study Streak</h3>
          <motion.div
            animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            <Flame
              className={cn(
                'w-8 h-8',
                streak > 0 ? 'text-orange-500' : 'text-gray-400'
              )}
            />
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"
          >
            {animatedStreak}
          </motion.div>
          <div className="text-gray-600 dark:text-gray-400">
            {streak === 1 ? 'day' : 'days'}
          </div>
        </div>

        {/* Progress to next milestone */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600 dark:text-gray-400">
              Next milestone
            </span>
            <span className="font-medium flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              {nextMilestone} days
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress_to_milestone}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
            />
          </div>
        </div>

        {/* Milestone badges */}
        <div className="flex justify-between">
          {milestones.slice(0, 5).map((milestone, idx) => {
            const achieved = streak >= milestone;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                  achieved
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                )}
              >
                {achieved ? <Star className="w-5 h-5" /> : milestone}
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};