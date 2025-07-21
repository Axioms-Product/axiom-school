
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 overflow-hidden">
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
