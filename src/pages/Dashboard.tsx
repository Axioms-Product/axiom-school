
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useAuth } from '@/contexts/AuthContext';
import { DataProvider } from '@/contexts/DataContext';
import { cn } from '@/lib/utils';
import HomeView from '@/components/dashboard/HomeView';
import HomeworkView from '@/components/dashboard/HomeworkView';
import NoticesView from '@/components/dashboard/NoticesView';
import EventsView from '@/components/dashboard/EventsView';
import MessagesView from '@/components/dashboard/MessagesView';
import MarksView from '@/components/dashboard/MarksView';
import TeachersView from '@/components/dashboard/TeachersView';
import ProfilePage from '@/pages/ProfilePage';

import { 
  Home, 
  BookOpen, 
  Bell, 
  Calendar, 
  MessageCircle, 
  LogOut, 
  User,
  Menu,
  Book,
  School
} from 'lucide-react';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // Ensure user is redirected to the dashboard home when accessing the /dashboard URL directly
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      navigate('/dashboard/home');
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === `/dashboard/${path}`;
  };
  
  const commonNavigation = [
    { name: 'Home', path: 'home', icon: Home },
    { name: 'Homework', path: 'homework', icon: BookOpen },
    { name: 'Notices', path: 'notices', icon: Bell },
    { name: 'Events', path: 'events', icon: Calendar },
    { name: 'Marks', path: 'marks', icon: Book },
  ];

  // Add student-specific navigation
  const studentNavigation = [
    ...commonNavigation,
    { name: 'Messages', path: 'messages', icon: MessageCircle },
    { name: 'Teachers', path: 'teachers', icon: School },
    { name: 'Profile', path: 'profile', icon: User },
  ];

  // Add teacher-specific navigation
  const teacherNavigation = [
    ...commonNavigation,
    { name: 'Messages', path: 'messages', icon: MessageCircle },
    { name: 'Profile', path: 'profile', icon: User },
  ];

  // Choose the appropriate navigation based on user role
  const navigation = currentUser?.role === 'student' ? studentNavigation : teacherNavigation;

  // Select items for mobile bottom navigation
  const mobileNavigation = [
    { name: 'Home', path: 'home', icon: Home },
    { name: 'Homework', path: 'homework', icon: BookOpen },
    { name: 'Marks', path: 'marks', icon: Book },
    { name: 'Messages', path: 'messages', icon: MessageCircle },
  ];

  return (
    <DataProvider>
      <div className="min-h-screen bg-gradient-to-b from-background to-blue-50 dark:from-gray-900 dark:to-gray-950">
        {/* Mobile Header */}
        <header className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-lg font-bold text-foreground">Axioms School</h1>
            </div>
            <Link to="/dashboard/profile">
              <div className="h-8 w-8 rounded-full bg-cgs-blue/20 flex items-center justify-center">
                <User className="h-4 w-4 text-cgs-blue" />
              </div>
            </Link>
          </div>
        </header>
        
        <div className="flex h-screen pt-0 md:pt-0 overflow-hidden">
          {/* Sidebar (desktop) */}
          <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="p-6">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple animate-pulse-glow flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
                  Axioms School
                </h1>
              </div>
            </div>
            
            <div className="mx-4 p-3 rounded-lg bg-blue-50 dark:bg-gray-800 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-cgs-blue/20 flex items-center justify-center">
                <User className="h-5 w-5 text-cgs-blue" />
              </div>
              <div>
                <p className="font-medium text-sm">{currentUser?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {currentUser?.role === 'teacher' ? `Teacher - ${currentUser?.subject} - Class ${currentUser?.class}` : `Student - Class ${currentUser?.class}`}
                </p>
              </div>
            </div>
            
            <nav className="mt-6 px-4 flex-1">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={`/dashboard/${item.path}`}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.path) 
                        ? "bg-cgs-blue text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <Button 
                variant="destructive" 
                onClick={handleLogout} 
                className="w-full justify-start text-sm"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-24 md:pb-8">
              <Routes>
                <Route path="/home" element={<HomeView />} />
                <Route path="/homework" element={<HomeworkView />} />
                <Route path="/notices" element={<NoticesView />} />
                <Route path="/events" element={<EventsView />} />
                <Route path="/messages" element={<MessagesView />} />
                <Route path="/marks" element={<MarksView />} />
                <Route path="/teachers" element={<TeachersView />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </div>
          </main>
        </div>
        
        {/* Sheet/Drawer for Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-[80%] max-w-[300px] p-0">
            <SheetHeader className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <SheetTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
                  Axioms School
                </SheetTitle>
              </div>
            </SheetHeader>
            
            <div className="p-4">
              <div className="mb-4 p-3 rounded-lg bg-blue-50 dark:bg-gray-800 flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-cgs-blue/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-cgs-blue" />
                </div>
                <div>
                  <p className="font-medium text-sm">{currentUser?.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentUser?.role === 'teacher' ? `Teacher - ${currentUser?.subject} - Class ${currentUser?.class}` : `Student - Class ${currentUser?.class}`}
                  </p>
                </div>
              </div>
              
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.path}
                    to={`/dashboard/${item.path}`}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive(item.path) 
                        ? "bg-cgs-blue text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                ))}
                
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }} 
                  className="w-full justify-start text-sm mt-4"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-30">
          <div className="flex items-center justify-around">
            {mobileNavigation.map((item) => (
              <TooltipProvider key={item.path}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={`/dashboard/${item.path}`}
                      className={cn(
                        "flex flex-1 flex-col items-center justify-center py-2 text-xs",
                        isActive(item.path)
                          ? "text-cgs-blue"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      <item.icon className={cn(
                        "h-6 w-6 mb-1",
                        isActive(item.path)
                          ? "text-cgs-blue"
                          : "text-gray-500 dark:text-gray-400"
                      )} />
                      <span>{item.name}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            
            {/* Menu Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setOpen(true)}
                    className="flex flex-1 flex-col items-center justify-center py-2 text-xs text-gray-500 dark:text-gray-400"
                  >
                    <Menu className="h-6 w-6 mb-1" />
                    <span>Menu</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Menu
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </nav>
      </div>
    </DataProvider>
  );
};

export default Dashboard;
