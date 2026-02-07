import React from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Calendar,
  Target,
  TrendingUp,
  Zap,
  Clock,
  Award,
  BookOpen,
} from 'lucide-react';
import { BentoGrid, BentoCard } from '@/components/ui/bento-grid';
import { GradientText } from '@/components/ui/gradient-text';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Scheduling',
    description:
      'Advanced algorithms analyze your subjects, confidence levels, and deadlines to create the perfect study schedule.',
    colSpan: 2,
    gradient: true,
  },
  {
    icon: Target,
    title: 'Smart Prioritization',
    description:
      'Automatically prioritizes subjects based on exam dates and your current knowledge level.',
  },
  {
    icon: Calendar,
    title: 'Dynamic Adaptation',
    description:
      'Your schedule adapts as you progress, rebalancing to focus on areas that need more attention.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description:
      'Visualize your improvement with detailed analytics and achievement badges.',
    colSpan: 2,
  },
  {
    icon: Zap,
    title: 'Pomodoro Timer',
    description:
      'Built-in focus timer with customizable sessions to maximize productivity.',
  },
  {
    icon: Clock,
    title: 'Time Management',
    description:
      'Optimize your study time with intelligent break scheduling and workload balancing.',
  },
  {
    icon: Award,
    title: 'Gamification',
    description:
      'Stay motivated with streaks, achievements, and progress milestones.',
  },
  {
    icon: BookOpen,
    title: 'Resource Recommendations',
    description:
      'Get AI-curated learning resources tailored to each subject and topic.',
  },
];

export const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Powerful Features for{' '}
            <GradientText gradient="primary">Academic Success</GradientText>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Everything you need to create, track, and optimize your perfect study
            schedule.
          </p>
        </motion.div>

        {/* Features Grid */}
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard
              key={idx}
              colSpan={feature.colSpan}
              gradient={feature.gradient}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};