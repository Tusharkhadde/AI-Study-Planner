import { useEffect, useState } from 'react';

interface UseCountUpOptions {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  onComplete?: () => void;
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  onComplete,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function (easeOutExpo)
      const easeOut = 1 - Math.pow(2, -10 * percentage);
      const currentCount = start + (end - start) * easeOut;

      setCount(Number(currentCount.toFixed(decimals)));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
        onComplete?.();
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, start, duration, decimals, onComplete]);

  return count;
}