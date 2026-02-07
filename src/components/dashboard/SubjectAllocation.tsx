import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { usePlanStore } from '@/stores/usePlanStore';
import { Card } from '@/components/ui/card';
import { CONFIDENCE_EMOJIS } from '@/types';

export const SubjectAllocation: React.FC = () => {
  const { currentPlan } = usePlanStore();

  if (!currentPlan) return null;

  const data = currentPlan.subjects.map((subject) => ({
    name: subject.name,
    value: subject.totalHoursAllocated || 10,
    color: subject.color,
    confidence: subject.confidenceLevel,
    priority: subject.priority,
  }));

  return (
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-bold mb-6">Subject Allocation</h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {data.value} hours
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Subject List */}
        <div className="space-y-3">
          {data.map((subject, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <div className="flex-1">
                <div className="font-medium">{subject.name}</div>
                <div className="text-sm text-gray-500">
                  {subject.value}h • {subject.priority} priority
                </div>
              </div>
              <div className="text-2xl">
                {CONFIDENCE_EMOJIS[subject.confidence - 1]}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};