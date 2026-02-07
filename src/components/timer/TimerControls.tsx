import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onSkip: () => void;
}

export const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  isPaused,
  onStart,
  onPause,
  onResume,
  onReset,
  onSkip,
}) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Start/Pause Button */}
      {!isRunning ? (
        <Button
          size="lg"
          variant="primary"
          onClick={onStart}
          icon={<Play className="w-6 h-6" />}
          className="w-32"
        >
          Start
        </Button>
      ) : isPaused ? (
        <Button
          size="lg"
          variant="primary"
          onClick={onResume}
          icon={<Play className="w-6 h-6" />}
          className="w-32"
        >
          Resume
        </Button>
      ) : (
        <Button
          size="lg"
          variant="secondary"
          onClick={onPause}
          icon={<Pause className="w-6 h-6" />}
          className="w-32"
        >
          Pause
        </Button>
      )}

      {/* Reset Button */}
      <Button
        size="lg"
        variant="outline"
        onClick={onReset}
        icon={<RotateCcw className="w-5 h-5" />}
      >
        Reset
      </Button>

      {/* Skip Button */}
      <Button
        size="lg"
        variant="ghost"
        onClick={onSkip}
        icon={<SkipForward className="w-5 h-5" />}
      >
        Skip
      </Button>
    </div>
  );
};