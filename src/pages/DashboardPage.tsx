import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calendar, BookOpen, Target, Brain } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { useStudentStore } from '@/stores/useStudentStore';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { OverviewCards } from '@/components/dashboard/OverviewCards';
import { WeeklyCalendar } from '@/components/dashboard/WeeklyCalendar';
import { SubjectAllocation } from '@/components/dashboard/SubjectAllocation';
import { ActionItems } from '@/components/dashboard/ActionItems';
import { ProTips } from '@/components/dashboard/ProTips';
import { StudyStreak } from '@/components/dashboard/StudyStreak';
import { PrioritizationView } from '@/components/dashboard/PrioritizationView';
import { ConfidenceCheckpoint } from '@/components/dashboard/ConfidenceCheckpoint';
import { EmptyState } from '@/components/shared/EmptyState';
import { GradientText } from '@/components/ui/gradient-text';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentPlan } = usePlanStore();
  const { profile } = useStudentStore();
  const [loading, setLoading] = useState(true);
  const [showConfidenceModal, setShowConfidenceModal] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check if it's time for weekly confidence checkpoint
  useEffect(() => {
    if (currentPlan) {
      const daysSinceStart = Math.floor(
        (Date.now() - new Date(currentPlan.generatedAt).getTime()) / (1000 * 60 * 60 * 24)
      );
      if (daysSinceStart > 0 && daysSinceStart % 7 === 0) {
        setShowConfidenceModal(true);
      }
    }
  }, [currentPlan]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (!currentPlan) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <EmptyState
          icon={Calendar}
          title="No Study Plan Yet"
          description="Create your personalized AI study plan to get started"
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
      className="space-y-8"
    >
      {/* Page Header */}
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold mb-2"
        >
          Welcome back, <GradientText>{profile?.name || 'Student'}</GradientText>!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 dark:text-gray-400"
        >
          Let's make today productive 🚀
        </motion.p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - 2 cols */}
        <div className="lg:col-span-2 space-y-8">
          {/* Weekly Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <WeeklyCalendar />
          </motion.div>

          {/* Subject Allocation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <SubjectAllocation />
          </motion.div>

          {/* Prioritization View */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PrioritizationView />
          </motion.div>
        </div>

        {/* Right Column - 1 col */}
        <div className="space-y-8">
          {/* Action Items */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ActionItems />
          </motion.div>

          {/* Study Streak */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <StudyStreak />
          </motion.div>

          {/* Pro Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ProTips />
          </motion.div>
        </div>
      </div>

      {/* Confidence Checkpoint Modal */}
      <ConfidenceCheckpoint
        isOpen={showConfidenceModal}
        onClose={() => setShowConfidenceModal(false)}
      />
    </motion.div>
  );
};