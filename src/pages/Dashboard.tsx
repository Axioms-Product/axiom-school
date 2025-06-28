
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

// Minimal loading skeleton
const MinimalSkeleton = () => (
  <div className="p-4 space-y-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-6 w-32" />
      <Skeleton className="h-8 w-24" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      ))}
    </div>
  </div>
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time to 500ms
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 overflow-hidden">
            <ScrollArea className="h-full optimized-scroll">
              <MinimalSkeleton />
            </ScrollArea>
          </main>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full optimized-scroll">
            <div className="p-2 sm:p-3 md:p-4 lg:p-6 pb-20 md:pb-6 min-h-full">
              <div className="gpu-accelerated">
                <Outlet />
              </div>
            </div>
          </ScrollArea>
        </main>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Dashboard;
