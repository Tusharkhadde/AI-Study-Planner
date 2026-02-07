import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface SessionCounterProps {
  completed: number;
  total: number;
}

export const SessionCounter: React.FC<SessionCounterProps> = ({
  completed,
  total,
}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
        Sessions:
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            {idx < completed ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};