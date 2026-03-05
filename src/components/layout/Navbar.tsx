import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menu, Home, Calendar, LayoutDashboard, TrendingUp, Timer,
  LogOut, User, ChevronDown, X, Brain, Sparkles
} from 'lucide-react';
import { ShadcnButton } from '@/components/ui/shadcn-button';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/utils/cn';
import { ROUTES } from '@/config/routes';

interface NavbarProps {
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { path: ROUTES.home, icon: Home, label: 'Home' },
    { path: ROUTES.planner, icon: Calendar, label: 'Planner' },
    ...(isAuthenticated ? [
      { path: ROUTES.dashboard, icon: LayoutDashboard, label: 'Dashboard' },
      { path: ROUTES.progress, icon: TrendingUp, label: 'Progress' },
      { path: ROUTES.timer, icon: Timer, label: 'Timer' },
    ] : []),
  ];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate(ROUTES.home);
  };

  const avatarLetter = user?.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 h-16 z-50"
      >
        {/* Glass background */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-xl border-b border-white/10" />

        <div className="relative h-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.home)}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white text-lg hidden sm:block">
                AI Study <span className="text-violet-400">Planner</span>
              </span>
            </motion.div>

            {/* Center Nav - Desktop */}
            <div className="hidden md:flex items-center gap-1">
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
                      'px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 text-sm',
                      isActive
                        ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {isAuthenticated && user ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                      {avatarLetter}
                    </div>
                    <span className="text-sm text-white font-medium hidden sm:block max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', userMenuOpen && 'rotate-180')} />
                  </motion.button>

                  {/* User dropdown */}
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-gray-900/95 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden z-50"
                      >
                        <div className="p-3 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold">
                              {avatarLetter}
                            </div>
                            <div>
                              <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                              <p className="text-gray-400 text-xs truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => { navigate(ROUTES.dashboard); setUserMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-300 hover:text-white hover:bg-white/5 text-sm transition-colors"
                          >
                            <User className="w-4 h-4" />
                            Dashboard
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-colors mt-1"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <ShadcnButton
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(ROUTES.login)}
                    className="text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    Sign In
                  </ShadcnButton>
                  <ShadcnButton
                    variant="gradient"
                    size="sm"
                    onClick={() => navigate(ROUTES.register)}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Get Started
                  </ShadcnButton>
                </div>
              )}

              {/* Mobile menu btn */}
              <button
                onClick={() => { setMobileOpen(!mobileOpen); onMenuClick?.(); }}
                className="md:hidden p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMobileOpen(false); }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-left',
                      isActive ? 'bg-violet-600/20 text-violet-300' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
              {!isAuthenticated && (
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => { navigate(ROUTES.login); setMobileOpen(false); }}
                    className="w-full px-4 py-3 rounded-xl text-gray-300 border border-white/10 hover:bg-white/5 transition-all text-center"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { navigate(ROUTES.register); setMobileOpen(false); }}
                    className="w-full px-4 py-3 rounded-xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all text-center font-medium"
                  >
                    Get Started
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <button
                  onClick={() => { handleLogout(); setMobileOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close menus */}
      {(userMenuOpen || mobileOpen) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => { setUserMenuOpen(false); setMobileOpen(false); }}
        />
      )}
    </>
  );
};