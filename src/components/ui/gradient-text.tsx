import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'primary' | 'secondary' | 'rainbow' | 'sunset';
  animated?: boolean;
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  gradient = 'primary',
  animated = false,
}) => {
  const gradients = {
    primary: 'from-primary-600 via-primary-500 to-secondary-600',
    secondary: 'from-secondary-600 via-accent-500 to-accent-600',
    rainbow: 'from-pink-500 via-purple-500 to-blue-500',
    sunset: 'from-orange-500 via-red-500 to-pink-500',
  };

  const Component = animated ? motion.span : 'span';

  return (
    <Component
      {...(animated && {
        animate: {
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        },
        transition: {
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        },
      })}
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent font-bold',
        animated && 'bg-[length:200%_auto]',
        gradients[gradient],
        className
      )}
    >
      {children}
    </Component>
  );
};