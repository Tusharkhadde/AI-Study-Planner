import React from 'react';
import { Brain } from 'lucide-react';
import { GradientText } from '@/components/ui/gradient-text';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg' },
    md: { icon: 'w-8 h-8', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl' },
  };

  return (
    <div className="flex items-center gap-2">
      <div className="bg-gradient-to-br from-primary-500 to-secondary-500 p-2 rounded-xl">
        <Brain className={`${sizes[size].icon} text-white`} />
      </div>
      {showText && (
        <GradientText className={`font-bold ${sizes[size].text}`}>
          StudyPlan AI
        </GradientText>
      )}
    </div>
  );
};