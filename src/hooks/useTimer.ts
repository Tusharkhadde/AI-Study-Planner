import { useEffect, useRef } from 'react';
import { useTimerStore } from '@/stores/useTimerStore';

export function useTimer() {
  const intervalRef = useRef<NodeJS.Timeout>();
  const { isRunning, isPaused, tick } = useTimerStore();

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, tick]);

  return useTimerStore();
}