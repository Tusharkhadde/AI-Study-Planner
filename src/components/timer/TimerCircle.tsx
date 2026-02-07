import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TimerCircleProps {
  timeLeft: number;
  totalTime: number;
  progress: number;
  isRunning: boolean;
  sessionType: 'focus' | 'break';
}

export const TimerCircle: React.FC<TimerCircleProps> = ({
  timeLeft,
  totalTime,
  progress,
  isRunning,
  sessionType,
}) => {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90" width="280" height="280">
        {/* Background Circle */}
        <circle
          cx="140"
          cy="140"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-gray-200 dark:text-gray-700"
        />

        {/* Progress Circle */}
        <motion.circle
          cx="140"
          cy="140"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            {sessionType === 'focus' ? (
              <>
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </>
            )}
          </linearGradient>
        </defs>
      </svg>

      {/* Pulsing Effect */}
      {isRunning && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className={cn(
            'absolute w-64 h-64 rounded-full',
            sessionType === 'focus'
              ? 'bg-primary-500/20'
              : 'bg-green-500/20'
          )}
        />
      )}
    </div>
  );
};