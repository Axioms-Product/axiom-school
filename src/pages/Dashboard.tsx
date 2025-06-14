
import { useEffect, useState, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';

const Dashboard = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Optimize initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // Optimize scroll performance
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto pb-16 md:pb-6 scroll-smooth">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
        
        <BottomNavigation />
      </div>
      
      <Toaster />
    </div>
  );
};

export default Dashboard;
