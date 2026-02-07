import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { LoadingScreen } from '@/components/shared/LoadingScreen';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '@/config/routes';

// Lazy load pages for better performance
const LandingPage = React.lazy(() => import('@/pages/LandingPage').then(m => ({ default: m.LandingPage })));
const PlannerPage = React.lazy(() => import('@/pages/PlannerPage').then(m => ({ default: m.PlannerPage })));
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));
const ProgressPage = React.lazy(() => import('@/pages/ProgressPage').then(m => ({ default: m.ProgressPage })));
const TimerPage = React.lazy(() => import('@/pages/TimerPage').then(m => ({ default: m.TimerPage })));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.planner,
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <PlannerPage />
          </Suspense>
        ),
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: ROUTES.dashboard,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<LoadingScreen />}>
                  <DashboardPage />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.progress,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<LoadingScreen />}>
                  <ProgressPage />
                </Suspense>
              </ProtectedRoute>
            ),
          },
          {
            path: ROUTES.timer,
            element: (
              <ProtectedRoute>
                <Suspense fallback={<LoadingScreen />}>
                  <TimerPage />
                </Suspense>
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};