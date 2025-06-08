
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';

const Dashboard = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Reset any mobile sidebar state on route change
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto pb-16 md:pb-6">
          <Outlet />
        </main>
        
        <BottomNavigation />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Dashboard;
