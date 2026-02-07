import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  TrendingUp,
  Timer,
  Settings,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { usePlanStore } from '@/stores/usePlanStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { cn } from '@/utils/cn';

interface SidebarProps {
  onNavigate?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPlan } = usePlanStore();
  const { progress, getStreak } = useProgressStore();

  const mainNavItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/planner', icon: Calendar, label: 'Study Planner' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/timer', icon: Timer, label: 'Focus Timer' },
  ];

  const bottomNavItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/help', icon: HelpCircle, label: 'Help & Support' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    onNavigate?.();
  };

  const todayLog = progress?.dailyLogs?.find(
    (log) => log.date === new Date().toISOString().split('T')[0]
  );
  const todayTasks = todayLog?.completedBlocks?.length || 0;
  const streak = getStreak();

  return (
    <div className="h-full flex flex-col p-4">
      {/* Quick Stats */}
      {currentPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 rounded-xl border border-primary-200 dark:border-primary-800"
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary-600" />
            <span className="font-semibold">Quick Stats</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Today's Tasks</span>
              <span className="font-bold">{todayTasks}/8</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Study Streak</span>
              <span className="font-bold">🔥 {streak} days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">This Week</span>
              <span className="font-bold">
                {(progress?.stats?.completionRate || 0).toFixed(0)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 space-y-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Main Menu
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                isActive
                  ? 'bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400 border-l-4 border-primary-500'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="ml-auto w-2 h-2 rounded-full bg-primary-500"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Subject Progress */}
      {currentPlan && currentPlan.subjects && currentPlan.subjects.length > 0 && (
        <div className="mb-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Subject Progress
          </div>
          <div className="space-y-2">
            {currentPlan.subjects.slice(0, 3).map((subject, index) => (
              <div key={subject.id || `subject-${index}`} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: subject.color || '#3b82f6' }}
                />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">
                    {subject.name || 'Unnamed Subject'}
                  </div>
                  <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((subject.confidenceLevel || 3) / 5) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: subject.color || '#3b82f6' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="space-y-1 pt-4 border-t border-gray-200 dark:border-gray-800">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
                'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};