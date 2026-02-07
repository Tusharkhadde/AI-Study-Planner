export const ROUTES = {
  home: '/',
  planner: '/planner',
  dashboard: '/dashboard',
  progress: '/progress',
  timer: '/timer',
  notFound: '*',
} as const;

export const NAVIGATION_ITEMS = [
  {
    label: 'Home',
    path: ROUTES.home,
    icon: 'Home',
  },
  {
    label: 'Create Plan',
    path: ROUTES.planner,
    icon: 'Calendar',
  },
  {
    label: 'Dashboard',
    path: ROUTES.dashboard,
    icon: 'LayoutDashboard',
    protected: true,
  },
  {
    label: 'Progress',
    path: ROUTES.progress,
    icon: 'TrendingUp',
    protected: true,
  },
  {
    label: 'Timer',
    path: ROUTES.timer,
    icon: 'Timer',
    protected: true,
  },
];