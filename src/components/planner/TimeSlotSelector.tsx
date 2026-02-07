import React from 'react';
import { motion } from 'framer-motion';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import { TimeSlot, TIME_SLOT_LABELS } from '@/types';
import { cn } from '@/utils/cn';

interface TimeSlotSelectorProps {
  selectedSlots: TimeSlot[];
  onChange: (slots: TimeSlot[]) => void;
}

const timeSlots: { value: TimeSlot; icon: any; gradient: string }[] = [
  {
    value: 'morning',
    icon: Sunrise,
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    value: 'afternoon',
    icon: Sun,
    gradient: 'from-orange-400 to-red-500',
  },
  {
    value: 'evening',
    icon: Sunset,
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    value: 'night',
    icon: Moon,
    gradient: 'from-blue-600 to-indigo-700',
  },
];

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  selectedSlots,
  onChange,
}) => {
  const toggleSlot = (slot: TimeSlot) => {
    if (selectedSlots.includes(slot)) {
      onChange(selectedSlots.filter((s) => s !== slot));
    } else {
      onChange([...selectedSlots, slot]);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {timeSlots.map(({ value, icon: Icon, gradient }) => {
        const isSelected = selectedSlots.includes(value);

        return (
          <motion.button
            key={value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleSlot(value)}
            className={cn(
              'p-4 rounded-xl border-2 transition-all',
              isSelected
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-950'
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'w-12 h-12 rounded-lg flex items-center justify-center',
                  `bg-gradient-to-br ${gradient}`
                )}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-medium capitalize">{value}</div>
                <div className="text-sm text-gray-500">
                  {TIME_SLOT_LABELS[value].split('(')[1].replace(')', '')}
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};