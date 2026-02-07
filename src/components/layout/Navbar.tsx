import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Home, Calendar, LayoutDashboard, TrendingUp, Timer } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import { useStudentStore } from '@/stores/useStudentStore';
import { cn } from '@/utils/cn';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useStudentStore();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/planner', icon: Calendar, label: 'Planner' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/progress', icon: TrendingUp, label: 'Progress' },
    { path: '/timer', icon: Timer, label: 'Timer' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 z-40"
    >
      <div className="h-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-full">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="cursor-pointer"
            >
              <Logo size="sm" />
            </motion.div>
          </div>

          {/* Center Navigation - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    'px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2',
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </motion.button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {profile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3"
              >
                <span className="hidden sm:block text-sm font-medium">
                  Hi, {profile.name}
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
              </motion.div>
            ) : (
              <Button
                size="sm"
                onClick={() => navigate('/planner')}
              >
                Get Started
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};