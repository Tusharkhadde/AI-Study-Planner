import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Calendar, Award } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { DailyChecklist } from '@/components/progress/DailyChecklist';
import { CalendarHeatmap } from '@/components/progress/CalendarHeatmap';
import { AnalyticsCharts } from '@/components/progress/AnalyticsCharts';
import { Achievements } from '@/components/progress/Achievements';
import { WeeklyReviewForm } from '@/components/progress/WeeklyReviewForm';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import { GradientText } from '@/components/ui/gradient-text';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan } = usePlanStore();
  const { progress } = useProgressStore();
  const [showWeeklyReview, setShowWeeklyReview] = useState(false);

  if (!currentPlan) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <EmptyState
          icon={TrendingUp}
          title="No Progress to Track"
          description="Create a study plan to start tracking your progress"
          actionLabel="Create Study Plan"
          onAction={() => navigate('/planner')}
        />
      </div>
    );
  }

  const currentWeek = Math.ceil(
    (Date.now() - new Date(currentPlan.generatedAt).getTime()) / (1000 * 60 * 60 * 24 * 7)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-bold mb-2"
          >
            Your <GradientText>Progress</GradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 dark:text-gray-400"
          >
            Track your journey to success
          </motion.p>
        </div>
        <Button
          onClick={() => setShowWeeklyReview(true)}
          icon={<Calendar className="w-5 h-5" />}
        >
          Weekly Review
        </Button>
      </div>

      {/* Progress Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
          <div className="text-4xl font-bold mb-2">
            {progress?.stats.totalHoursStudied.toFixed(1) || 0}h
          </div>
          <div className="text-white/80">Total Study Time</div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <div className="text-4xl font-bold mb-2">
            {progress?.stats.completionRate.toFixed(0) || 0}%
          </div>
          <div className="text-white/80">Completion Rate</div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white">
          <div className="text-4xl font-bold mb-2">
            Week {currentWeek}
          </div>
          <div className="text-white/80">Current Week</div>
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Checklist */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DailyChecklist />
        </motion.div>

        {/* Calendar Heatmap */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <CalendarHeatmap />
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnalyticsCharts />
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Achievements />
      </motion.div>

      {/* Weekly Review Modal */}
      <WeeklyReviewForm
        isOpen={showWeeklyReview}
        onClose={() => setShowWeeklyReview(false)}
        weekNumber={currentWeek}
      />
    </motion.div>
  );
};