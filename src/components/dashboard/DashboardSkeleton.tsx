import React from 'react';
import { Skeleton, SkeletonCard } from '@/components/ui/loading-skeleton';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800"
          >
            <Skeleton className="w-12 h-12 rounded-xl mb-4" />
            <Skeleton className="w-24 h-8 mb-2" variant="text" />
            <Skeleton className="w-16 h-4" variant="text" />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SkeletonCard />
        </div>
        <div>
          <SkeletonCard />
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <Skeleton className="w-48 h-8 mb-6" variant="text" />
        <div className="grid grid-cols-8 gap-2">
          <Skeleton className="w-16 h-full" />
          {[...Array(7)].map((_, idx) => (
            <div key={idx} className="space-y-2">
              <Skeleton className="h-12" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};