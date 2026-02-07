import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs-animated';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AnalyticsCharts: React.FC = () => {
  const weeklyData = [
    { day: 'Mon', hours: 2.5, target: 3 },
    { day: 'Tue', hours: 3, target: 3 },
    { day: 'Wed', hours: 1.5, target: 3 },
    { day: 'Thu', hours: 4, target: 3 },
    { day: 'Fri', hours: 2, target: 3 },
    { day: 'Sat', hours: 3.5, target: 3 },
    { day: 'Sun', hours: 2.5, target: 3 },
  ];

  const subjectData = [
    { name: 'Math', value: 30, color: '#3b82f6' },
    { name: 'Physics', value: 25, color: '#8b5cf6' },
    { name: 'Chemistry', value: 20, color: '#ec4899' },
    { name: 'Biology', value: 25, color: '#10b981' },
  ];

  const tabs = [
    {
      id: 'daily',
      label: 'Daily Hours',
      content: (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#6b7280" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ),
    },
    {
      id: 'subjects',
      label: 'Subjects',
      content: (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={subjectData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {subjectData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ),
    },
  ];

  return (
    <Card variant="glass" className="p-6">
      <h3 className="text-xl font-bold mb-6">Analytics</h3>
      <Tabs tabs={tabs} />
    </Card>
  );
};