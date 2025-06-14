
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';
import DashboardSkeleton from '@/components/skeletons/DashboardSkeleton';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
              <DashboardSkeleton />
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
