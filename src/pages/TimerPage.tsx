import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Timer, Brain } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { PomodoroTimer } from '@/components/timer/PomodoroTimer';
import { EmptyState } from '@/components/shared/EmptyState';
import { GradientText } from '@/components/ui/gradient-text';
import { BackgroundGradient } from '@/components/ui/background-gradient';

export const TimerPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan } = usePlanStore();

  if (!currentPlan) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <EmptyState
          icon={Timer}
          title="No Study Plan Active"
          description="Create a study plan to use the focus timer with your subjects"
          actionLabel="Create Study Plan"
          onAction={() => navigate('/planner')}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center relative"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-slow" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Brain className="w-12 h-12 text-primary-600" />
          <h1 className="text-4xl font-bold">
            <GradientText gradient="primary">Focus Mode</GradientText>
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Maximize your productivity with the Pomodoro Technique
        </p>
      </motion.div>

      {/* Timer Component */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10"
      >
        <PomodoroTimer />
      </motion.div>

      {/* Study Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { emoji: '🎯', title: 'Stay Focused', desc: 'One task at a time' },
          { emoji: '💧', title: 'Stay Hydrated', desc: 'Keep water nearby' },
          { emoji: '🚫', title: 'No Distractions', desc: 'Phone on silent' },
        ].map((tip, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center"
          >
            <div className="text-3xl mb-2">{tip.emoji}</div>
            <div className="font-semibold">{tip.title}</div>
            <div className="text-sm text-gray-500">{tip.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};