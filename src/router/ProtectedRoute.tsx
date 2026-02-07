import React from 'react';
import { Navigate } from 'react-router-dom';
import { usePlanStore } from '@/stores/usePlanStore';
import { ROUTES } from '@/config/routes';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentPlan } = usePlanStore();

  if (!currentPlan) {
    // Redirect to planner if no study plan exists
    return <Navigate to={ROUTES.planner} replace />;
  }

  return <>{children}</>;
};