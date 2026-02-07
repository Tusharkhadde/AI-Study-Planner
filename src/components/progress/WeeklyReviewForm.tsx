import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Check, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeeklyReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  weekNumber: number;
}

export const WeeklyReviewForm: React.FC<WeeklyReviewFormProps> = ({
  isOpen,
  onClose,
  weekNumber,
}) => {
  const [rating, setRating] = useState(3);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Week ${weekNumber} Review`}>
      <div className="space-y-6">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary-600">5/8</div>
              <div className="text-sm text-gray-500">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">68%</div>
              <div className="text-sm text-gray-500">Completion</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">12.5h</div>
              <div className="text-sm text-gray-500">Study Time</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-3">Rate this week</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.button
                key={star}
                whileHover={{ scale: 1.2 }}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`w-10 h-10 ${
                    star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                  }`}
                />
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-3">What went well?</label>
          <Input placeholder="e.g., Completed all math chapters" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={onClose}
            icon={<Check className="w-5 h-5" />}
            className="flex-1"
          >
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};