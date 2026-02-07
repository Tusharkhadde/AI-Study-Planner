import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Default tips if none are available from the plan
const DEFAULT_TIPS = [
  'Start each session by reviewing previous material for 5-10 minutes',
  'Use active recall: test yourself instead of just re-reading notes',
  'Take a 5-minute break every 25-30 minutes (Pomodoro technique)',
  'Create summary sheets for each major topic',
  'Practice explaining concepts out loud to reinforce understanding',
  'Mix different subjects each day to prevent mental fatigue',
  'End each week with a comprehensive review session',
];

export const ProTips: React.FC = () => {
  const { currentPlan } = usePlanStore();
  const [currentTip, setCurrentTip] = useState(0);

  // Get tips from plan or use defaults
  const tips = Array.isArray(currentPlan?.aiInsights?.studyTips) && 
               currentPlan.aiInsights.studyTips.length > 0
    ? currentPlan.aiInsights.studyTips
    : DEFAULT_TIPS;

  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % tips.length);
  };

  return (
    <Card variant="gradient" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold">Pro Tip</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={nextTip}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentTip}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-gray-700 dark:text-gray-300"
        >
          {tips[currentTip]}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-center gap-1 mt-4">
        {tips.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentTip(idx)}
            className={`w-2 h-2 rounded-full transition-colors ${
              idx === currentTip
                ? 'bg-primary-500'
                : 'bg-gray-300 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </Card>
  );
};