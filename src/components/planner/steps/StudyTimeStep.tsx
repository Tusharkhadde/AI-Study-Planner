import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Clock, Calendar } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TimeSlotSelector } from '../TimeSlotSelector';
import { cn } from '@/utils/cn';

export const StudyTimeStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep } = useFormStore();
  const preferences = formData.preferences;

  const handleHoursChange = (hours: number) => {
    updateFormData({
      preferences: { ...preferences, dailyStudyHours: hours },
    });
  };

  const handleNext = () => {
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="glass" className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Study Preferences</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Set your daily study hours and preferred time slots
          </p>
        </div>

        <div className="space-y-8">
          {/* Daily Study Hours */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium mb-4">
              <Clock className="w-5 h-5 text-primary-600" />
              Daily Study Hours
            </label>
            <div className="grid grid-cols-6 gap-3">
              {[1, 2, 3, 4, 5, 6].map((hours) => (
                <motion.button
                  key={hours}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleHoursChange(hours)}
                  className={cn(
                    'aspect-square rounded-xl font-bold text-lg transition-all',
                    preferences.dailyStudyHours === hours
                      ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  )}
                >
                  {hours}h
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Currently: {preferences.dailyStudyHours} hours per day
            </p>
          </div>

          {/* Time Slots */}
          <div>
            <label className="flex items-center gap-2 text-lg font-medium mb-4">
              <Calendar className="w-5 h-5 text-primary-600" />
              Preferred Time Slots
            </label>
            <TimeSlotSelector
              selectedSlots={preferences.preferredTimeSlots}
              onChange={(slots) =>
                updateFormData({
                  preferences: { ...preferences, preferredTimeSlots: slots },
                })
              }
            />
          </div>

          {/* Study Days Per Week */}
          <div>
            <label className="text-lg font-medium mb-4 block">
              Study Days Per Week
            </label>
            <div className="grid grid-cols-7 gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((days) => (
                <motion.button
                  key={days}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    updateFormData({
                      preferences: { ...preferences, studyDaysPerWeek: days },
                    })
                  }
                  className={cn(
                    'aspect-square rounded-lg font-bold transition-all',
                    preferences.studyDaysPerWeek === days
                      ? 'bg-gradient-to-br from-primary-600 to-secondary-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  )}
                >
                  {days}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Weekend Study Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div>
              <div className="font-medium">Include Weekends</div>
              <div className="text-sm text-gray-500">
                Study on Saturdays and Sundays
              </div>
            </div>
            <button
              onClick={() =>
                updateFormData({
                  preferences: {
                    ...preferences,
                    weekendStudy: !preferences.weekendStudy,
                  },
                })
              }
              className={cn(
                'relative w-14 h-8 rounded-full transition-colors',
                preferences.weekendStudy
                  ? 'bg-primary-600'
                  : 'bg-gray-300 dark:bg-gray-700'
              )}
            >
              <motion.div
                animate={{
                  x: preferences.weekendStudy ? 24 : 2,
                }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
              />
            </button>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="ghost"
            onClick={prevStep}
            icon={<ArrowLeft className="w-5 h-5" />}
          >
            Back
          </Button>
          <Button onClick={handleNext} icon={<ArrowRight className="w-5 h-5" />}>
            Continue
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};