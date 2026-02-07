import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useTimer } from '@/hooks/useTimer';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { TimerCircle } from './TimerCircle';
import { TimerControls } from './TimerControls';
import { SessionCounter } from './SessionCounter';
import { SubjectSelector } from './SubjectSelector';
import { TimerSettings } from './TimerSettings';
import { cn } from '@/utils/cn';

export const PomodoroTimer: React.FC = () => {
  const {
    timeLeft,
    isRunning,
    isPaused,
    sessionType,
    sessionsCompleted,
    currentSubject,
    settings,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    skipSession,
  } = useTimer();

  const { currentPlan } = usePlanStore();
  const [showSettings, setShowSettings] = React.useState(false);
  const [soundEnabled, setSoundEnabled] = React.useState(true);

  // Play sound when session ends
  useEffect(() => {
    if (timeLeft === 0 && soundEnabled) {
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {});
    }
  }, [timeLeft, soundEnabled]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds =
    sessionType === 'focus'
      ? settings.focusDuration * 60
      : settings.shortBreak * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <Card variant="glass" className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <SessionCounter
            completed={sessionsCompleted}
            total={settings.sessionsUntilLongBreak}
          />
          <div className="flex gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setShowSettings(true)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Session Type Indicator */}
        <div className="text-center mb-8">
          <motion.div
            key={sessionType}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              'inline-block px-6 py-2 rounded-full font-medium text-lg',
              sessionType === 'focus'
                ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            )}
          >
            {sessionType === 'focus' ? '🎯 Focus Time' : '☕ Break Time'}
          </motion.div>
        </div>

        {/* Subject Selector (only for focus sessions) */}
        {sessionType === 'focus' && currentPlan && (
          <div className="mb-8">
            <SubjectSelector
              subjects={currentPlan.subjects}
              selectedId={currentSubject || undefined}
              onSelect={startTimer}
            />
          </div>
        )}

        {/* Timer Circle */}
        <div className="mb-8">
          <TimerCircle
            timeLeft={timeLeft}
            totalTime={totalSeconds}
            progress={progress}
            isRunning={isRunning}
            sessionType={sessionType}
          />
        </div>

        {/* Time Display */}
        <div className="text-center mb-8">
          <motion.div
            key={timeLeft}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
          >
            {formatTime(timeLeft)}
          </motion.div>
        </div>

        {/* Controls */}
        <TimerControls
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={() => startTimer(currentSubject || undefined)}
          onPause={pauseTimer}
          onResume={resumeTimer}
          onReset={resetTimer}
          onSkip={skipSession}
        />

        {/* Tips */}
        {sessionType === 'focus' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-xl border border-blue-200 dark:border-blue-800"
          >
            <p className="text-sm text-blue-800 dark:text-blue-200 text-center">
              💡 Tip: Remove distractions and focus on one task at a time
            </p>
          </motion.div>
        )}
      </Card>

      {/* Settings Modal */}
      <TimerSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
};