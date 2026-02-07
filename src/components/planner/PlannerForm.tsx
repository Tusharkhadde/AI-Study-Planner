import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormStore } from '@/stores/useFormStore';
import { StepProgressBar } from './StepProgressBar';
import { StudentDetailsStep } from './steps/StudentDetailsStep';
import { SubjectsStep } from './steps/SubjectsStep';
import { StudyTimeStep } from './steps/StudyTimeStep';
import { TargetDateStep } from './steps/TargetDateStep';
import { AssessmentStep } from './steps/AssessmentStep';
import { ReviewStep } from './steps/ReviewStep';

export const PlannerForm: React.FC = () => {
  const { currentStep } = useFormStore();

  const steps = [
    { component: StudentDetailsStep, title: 'Student Details' },
    { component: SubjectsStep, title: 'Add Subjects' },
    { component: StudyTimeStep, title: 'Study Preferences' },
    { component: TargetDateStep, title: 'Target Date' },
    { component: AssessmentStep, title: 'Assessments' },
    { component: ReviewStep, title: 'Review & Generate' },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <StepProgressBar />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mt-12"
        >
          <CurrentStepComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};