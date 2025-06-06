
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

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu />
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
          <h1 className="text-xl font-semibold">
            {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Link to="/dashboard/profile">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full"
            >
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
