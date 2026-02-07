import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';
import { useFormStore } from '@/stores/useFormStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { format, addDays, addWeeks, addMonths } from 'date-fns';

export const TargetDateStep: React.FC = () => {
  const { formData, updateFormData, nextStep, prevStep, setErrors, errors } =
    useFormStore();
  const [customDate, setCustomDate] = useState(formData.targetDate || '');

  const quickOptions = [
    { label: '2 Weeks', date: addWeeks(new Date(), 2) },
    { label: '1 Month', date: addMonths(new Date(), 1) },
    { label: '2 Months', date: addMonths(new Date(), 2) },
    { label: '3 Months', date: addMonths(new Date(), 3) },
  ];

  const handleQuickSelect = (date: Date) => {
    const formatted = format(date, 'yyyy-MM-dd');
    setCustomDate(formatted);
    updateFormData({ targetDate: formatted });
  };

  const handleNext = () => {
    if (!customDate) {
      setErrors({ targetDate: 'Please select a target date' });
      return;
    }

    const selectedDate = new Date(customDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setErrors({ targetDate: 'Target date must be in the future' });
      return;
    }

    updateFormData({ targetDate: customDate });
    setErrors({});
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card variant="glass" className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Set Your Target Date</h2>
          <p className="text-gray-600 dark:text-gray-400">
            When do you want to complete your studies?
          </p>
        </div>

        <div className="space-y-6">
          {/* Quick Select Options */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Quick Select
            </label>
            <div className="grid grid-cols-2 gap-4">
              {quickOptions.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickSelect(option.date)}
                  className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-500 transition-all bg-white dark:bg-gray-800"
                >
                  <div className="text-lg font-semibold">{option.label}</div>
                  <div className="text-sm text-gray-500">
                    {format(option.date, 'MMM dd, yyyy')}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Custom Date Picker */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Or Choose Custom Date
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={customDate}
                onChange={(e) => {
                  setCustomDate(e.target.value);
                  updateFormData({ targetDate: e.target.value });
                }}
                min={format(addDays(new Date(), 1), 'yyyy-MM-dd')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary-500 outline-none transition-colors"
              />
            </div>
            {errors.targetDate && (
              <p className="text-red-600 text-sm mt-2">{errors.targetDate}</p>
            )}
          </div>

          {/* Date Preview */}
          {customDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-primary-50 dark:bg-primary-950 rounded-xl border border-primary-200 dark:border-primary-800"
            >
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Study Until:
              </div>
              <div className="text-2xl font-bold text-primary-600">
                {format(new Date(customDate), 'MMMM dd, yyyy')}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {Math.ceil(
                  (new Date(customDate).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{' '}
                days from now
              </div>
            </motion.div>
          )}
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