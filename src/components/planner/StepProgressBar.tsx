import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { cn } from '@/utils/cn';

const steps = [
  'Student Details',
  'Subjects',
  'Study Time',
  'Target Date',
  'Assessments',
  'Review',
];

export const StepProgressBar: React.FC = () => {
  const { currentStep } = useFormStore();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => {
          const stepNumber = idx + 1;
          const isCompleted = currentStep > stepNumber;
          const isCurrent = currentStep === stepNumber;

          return (
            <div key={idx} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-colors',
                    isCompleted &&
                      'bg-gradient-to-r from-primary-600 to-secondary-600 border-transparent text-white',
                    isCurrent &&
                      'border-primary-600 text-primary-600 bg-primary-50 dark:bg-primary-950',
                    !isCompleted &&
                      !isCurrent &&
                      'border-gray-300 dark:border-gray-700 text-gray-400'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    stepNumber
                  )}
                </motion.div>
                <span
                  className={cn(
                    'text-sm mt-2 font-medium hidden sm:block',
                    (isCurrent || isCompleted)
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-500'
                  )}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 bg-gray-200 dark:bg-gray-800 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: isCompleted ? '100%' : '0%',
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};