import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Flame, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';

const achievements = [
  {
    id: '1',
    title: 'First Steps',
    icon: Star,
    unlocked: true,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    id: '2',
    title: 'Week Warrior',
    icon: Flame,
    unlocked: true,
    gradient: 'from-orange-500 to-red-500',
  },
  {
    id: '3',
    title: '10 Hours',
    icon: Clock,
    unlocked: false,
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: '4',
    title: 'Perfect Week',
    icon: Trophy,
    unlocked: false,
    gradient: 'from-green-500 to-emerald-500',
  },
];

export const Achievements: React.FC = () => {
  return (
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-bold mb-6">Achievements</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {achievements.map((achievement, idx) => {
          const Icon = achievement.icon;
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-xl text-center ${
                achievement.unlocked
                  ? 'bg-white dark:bg-gray-800 shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-900 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-3 ${
                  achievement.unlocked
                    ? `bg-gradient-to-br ${achievement.gradient}`
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="font-semibold text-sm">{achievement.title}</div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};