
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { BottomNavigation } from '@/components/dashboard/BottomNavigation';
import { ScrollArea } from '@/components/ui/scroll-area';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        
        <main className="flex-1 overflow-hidden">
          <ScrollArea className="h-full will-change-scroll" style={{ scrollBehavior: 'smooth' }}>
            <div className="p-3 sm:p-4 lg:p-6 pb-20 md:pb-6 min-h-full">
              <div className="will-change-transform">
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
