import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
  gradient?: boolean;
}

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  gradient = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'p-6 rounded-2xl border border-gray-200 dark:border-gray-800',
        'bg-white dark:bg-gray-900',
        gradient &&
          'bg-gradient-to-br from-white via-gray-50 to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-primary-950',
        'hover:shadow-xl transition-all duration-300',
        `col-span-${colSpan} row-span-${rowSpan}`,
        className
      )}
    >
      {children}
    </motion.div>
  );
};