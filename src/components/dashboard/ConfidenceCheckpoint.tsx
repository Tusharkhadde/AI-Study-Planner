import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { useSubjectStore } from '@/stores/useSubjectStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { ConfidenceSlider } from '@/components/planner/ConfidenceSlider';
import toast from 'react-hot-toast';

interface ConfidenceCheckpointProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfidenceCheckpoint: React.FC<ConfidenceCheckpointProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentPlan } = usePlanStore();
  const { updateConfidence } = useSubjectStore();
  const { updateConfidence: logConfidenceUpdate } = useProgressStore();

  const subjects = currentPlan?.subjects || [];

  const [confidenceLevels, setConfidenceLevels] = useState<Record<string, number>>(() => {
    return subjects.reduce(
      (acc, subject) => ({
        ...acc,
        [subject.id]: subject.confidenceLevel || 3,
      }),
      {}
    );
  });

  if (!currentPlan || subjects.length === 0) return null;

  const handleSave = () => {
    Object.entries(confidenceLevels).forEach(([subjectId, newLevel]) => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (subject && subject.confidenceLevel !== newLevel) {
        updateConfidence(subjectId, newLevel);
        logConfidenceUpdate({
          subjectId,
          previousLevel: subject.confidenceLevel || 3,
          newLevel,
          reason: 'Weekly checkpoint',
        });
      }
    });

    toast.success('Confidence levels updated!');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Weekly Confidence Check"
      size="lg"
    >
      <div className="space-y-6">
        <p className="text-gray-600 dark:text-gray-400">
          How confident do you feel about each subject now? This helps us
          rebalance your study plan.
        </p>

        <div className="space-y-6">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.id || `subject-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: subject.color || '#3b82f6' }}
                />
                <span className="font-semibold">{subject.name || 'Unnamed Subject'}</span>
              </div>
              <ConfidenceSlider
                value={confidenceLevels[subject.id] || 3}
                onChange={(value) =>
                  setConfidenceLevels((prev) => ({
                    ...prev,
                    [subject.id]: value,
                  }))
                }
              />
            </motion.div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            icon={<Check className="w-5 h-5" />}
            className="flex-1"
          >
            Update & Rebalance
          </Button>
        </div>
      </div>
    </Modal>
  );
};