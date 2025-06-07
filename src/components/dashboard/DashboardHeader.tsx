
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { MobileSidebar } from './MobileSidebar';
import { useState } from 'react';

export const DashboardHeader = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);

  // Get page title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b py-3 px-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <MobileSidebar 
                open={open} 
                onOpenChange={setOpen} 
                location={location} 
                currentUser={currentUser} 
              />
            </Sheet>
          )}
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/dashboard/profile">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
