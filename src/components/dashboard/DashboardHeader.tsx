
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Menu, User, Sun, Moon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from 'next-themes';
import { MobileSidebar } from './MobileSidebar';
import { useState, useEffect } from 'react';

export const DashboardHeader = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { currentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get page title from pathname
  const getPageTitle = () => {
    const path = location.pathname.split('/').pop();
    return path ? path.charAt(0).toUpperCase() + path.slice(1) : 'Dashboard';
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Don't render theme toggle until mounted to avoid hydration mismatch
  if (!mounted) {
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
            <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse"></div>
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
  }

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b py-3 px-4 flex-shrink-0 transition-colors duration-200">
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
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-200">
            {getPageTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <Button 
            onClick={toggleTheme}
            variant="ghost" 
            size="icon"
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 relative overflow-hidden group"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <div className="relative w-5 h-5">
              <Sun 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'opacity-0 rotate-90 scale-0' 
                    : 'opacity-100 rotate-0 scale-100'
                } text-yellow-500`}
              />
              <Moon 
                size={20} 
                className={`absolute inset-0 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'opacity-100 rotate-0 scale-100' 
                    : 'opacity-0 -rotate-90 scale-0'
                } text-blue-500`}
              />
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full"></div>
          </Button>

          {/* Profile Button */}
          <Link to="/dashboard/profile">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <User size={20} />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
