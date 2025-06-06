
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { MobileSidebar } from '@/components/dashboard/MobileSidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <MobileSidebar 
        open={open} 
        onOpenChange={setOpen} 
        location={location} 
        currentUser={currentUser} 
      />
      
      <div className="flex flex-col flex-1 h-screen overflow-y-auto">
        <DashboardHeader />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default Dashboard;
