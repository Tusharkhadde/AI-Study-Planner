import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface MeteorsProps {
  number?: number;
}

export const Meteors: React.FC<MeteorsProps> = ({ number = 20 }) => {
  return (
    <>
      {[...Array(number)].map((_, idx) => (
        <motion.span
          key={idx}
          className={cn(
            'absolute h-0.5 w-0.5 rotate-[215deg] animate-meteor rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]'
          )}
          style={{
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
            animationDelay: Math.random() * 2 + 's',
            animationDuration: Math.random() * 3 + 2 + 's',
          }}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent" />
        </motion.span>
      ))}
    </>
  );
};