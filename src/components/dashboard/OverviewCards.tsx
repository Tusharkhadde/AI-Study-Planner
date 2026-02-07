import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Calendar,
  Flame,
} from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { BentoCard } from '@/components/ui/bento-grid';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useCountUp } from '@/hooks/useCountUp';
import { dateUtils } from '@/utils/dateUtils';
import { scheduleUtils } from '@/utils/scheduleUtils';

export const OverviewCards: React.FC = () => {
  const { currentPlan, getCurrentWeek } = usePlanStore();
  const { getStreak } = useProgressStore();

  if (!currentPlan) return null;

  const currentWeek = getCurrentWeek();
  const weekProgress = currentWeek
    ? scheduleUtils.getWeekProgress(currentWeek)
    : { completed: 0, total: 0, percentage: 0 };

  const daysUntilTarget = dateUtils.daysUntil(currentPlan.targetDate);
  const streak = getStreak();

  const stats = [
    {
      icon: BookOpen,
      label: 'Subjects',
      value: currentPlan.subjects?.length || 0,
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Clock,
      label: 'Total Hours',
      value: Math.round(currentPlan.totalHours || 0),
      suffix: 'h',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Calendar,
      label: 'Days Left',
      value: Math.max(0, daysUntilTarget),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: Flame,
      label: 'Streak',
      value: streak,
      suffix: ' days',
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => (
        <StatCard key={idx} {...stat} delay={idx * 0.1} />
      ))}

      {/* Week Progress Card - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-4"
      >
        <BentoCard gradient>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold">This Week's Progress</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {weekProgress.completed} of {weekProgress.total} sessions
                completed
              </p>
            </div>
            <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {weekProgress.percentage.toFixed(0)}%
            </div>
          </div>
          <ProgressBar
            value={weekProgress.percentage}
            color="primary"
            size="lg"
            animated
          />
        </BentoCard>
      </motion.div>
    </div>
  );
};

interface StatCardProps {
  icon: any;
  label: string;
  value: number;
  suffix?: string;
  gradient: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  suffix = '',
  gradient,
  delay,
}) => {
  const animatedValue = useCountUp({ end: value, duration: 1500 });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-shadow"
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-3xl font-bold mb-1">
        {animatedValue}
        {suffix}
      </div>
      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </motion.div>
  );
};