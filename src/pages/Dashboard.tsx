
import { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTheme } from 'next-themes';
import {
  Home,
  BookOpen,
  Bell,
  Calendar,
  PenSquare,
  MessageCircle,
  Users2,
  User,
  Menu,
  LogOut,
  FileText,
  GraduationCap,
  UserCheck,
  Download,
  Moon,
  Sun
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const { markAttendanceForClass, getStudentsForClass, generatePDFReport } = useData();
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleMarkAttendance = () => {
    if (currentUser?.role === 'teacher' && currentUser.class) {
      const students = getStudentsForClass(currentUser.class);
      const studentIds = students.map(s => s.id);
      const today = new Date().toISOString().split('T')[0];
      
      // Mark all students as present by default (teachers can modify individual records later)
      markAttendanceForClass(studentIds, 'present', today);
    }
  };

  const handleDownloadReport = () => {
    if (currentUser?.role === 'teacher') {
      generatePDFReport('attendance');
    } else {
      generatePDFReport('student-marks');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navigationItems = [
    { name: 'Home 🏠', path: '/dashboard/home', icon: <Home size={20} /> },
    { name: 'Homework 📚', path: '/dashboard/homework', icon: <BookOpen size={20} /> },
    { name: 'Notices 📢', path: '/dashboard/notices', icon: <Bell size={20} /> },
    { name: 'Events 📅', path: '/dashboard/events', icon: <Calendar size={20} /> },
    { name: 'Marks 📝', path: '/dashboard/marks', icon: <PenSquare size={20} /> },
    { name: 'Messages 💬', path: '/dashboard/messages', icon: <MessageCircle size={20} /> },
    { name: 'Exams 📋', path: '/dashboard/exams', icon: <FileText size={20} /> },
    { name: 'Attendance ✅', path: '/dashboard/attendance', icon: <UserCheck size={20} /> },
  ];
  
  // Add role-specific navigation items
  if (currentUser?.role === 'student') {
    navigationItems.push({ name: 'Teachers 👨‍🏫', path: '/dashboard/teachers', icon: <Users2 size={20} /> });
  } else if (currentUser?.role === 'teacher') {
    navigationItems.push({ name: 'Students 🎓', path: '/dashboard/students', icon: <GraduationCap size={20} /> });
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
        <div className="p-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">Axioms School 🏫</span>
            </div>
          </div>
          
          <nav className="space-y-1.5">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Actions for Teachers */}
          {currentUser?.role === 'teacher' && (
            <div className="mt-6 space-y-2">
              <Separator className="my-4 bg-sidebar-border/50" />
              <p className="text-xs font-medium text-sidebar-foreground/70 px-3">Quick Actions 🚀</p>
              <Button
                onClick={handleMarkAttendance}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
              >
                <UserCheck className="h-4 w-4 mr-2" />
                Mark Attendance 📝
              </Button>
              <Button
                onClick={handleDownloadReport}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report 📊
              </Button>
            </div>
          )}

          {/* Quick Actions for Students */}
          {currentUser?.role === 'student' && (
            <div className="mt-6 space-y-2">
              <Separator className="my-4 bg-sidebar-border/50" />
              <p className="text-xs font-medium text-sidebar-foreground/70 px-3">Quick Actions 🚀</p>
              <Button
                onClick={handleDownloadReport}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-sidebar hover:bg-sidebar-accent text-sidebar-foreground border-sidebar-border"
              >
                <Download className="h-4 w-4 mr-2" />
                My Report 📋
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-auto p-4">
          <Separator className="mb-4 bg-sidebar-border/50" />
          <div className="flex items-center justify-between">
            <Link 
              to="/dashboard/profile" 
              className="flex items-center gap-2 group"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
                <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
                  {currentUser?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">{currentUser?.name}</span>
                <span className="text-xs text-muted-foreground capitalize">{currentUser?.role}</span>
              </div>
            </Link>
            
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="h-8 w-8 rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogout}
                className="h-8 w-8 rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
              >
                <LogOut size={16} />
              </Button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Mobile sidebar using Sheet from shadcn */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="p-4">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-lg">Axioms School 🏫</span>
              </div>
            </div>
            
            <nav className="space-y-1.5">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-accent/50'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Mobile Quick Actions */}
            {currentUser?.role === 'teacher' && (
              <div className="mt-6 space-y-2">
                <Separator className="my-4" />
                <p className="text-xs font-medium text-muted-foreground px-3">Quick Actions 🚀</p>
                <Button
                  onClick={handleMarkAttendance}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Mark Attendance 📝
                </Button>
                <Button
                  onClick={handleDownloadReport}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report 📊
                </Button>
              </div>
            )}
          </div>
          
          <div className="mt-auto p-4">
            <Separator className="mb-4" />
            <div className="flex items-center justify-between">
              <Link 
                to="/dashboard/profile" 
                className="flex items-center gap-2 group"
                onClick={() => setOpen(false)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
                  <AvatarFallback>{currentUser?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium leading-none">{currentUser?.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{currentUser?.role}</span>
                </div>
              </Link>
              
              <div className="flex items-center gap-1">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8 rounded-full"
                >
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleLogout}
                  className="h-8 w-8 rounded-full"
                >
                  <LogOut size={16} />
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
        
        {/* Main content */}
        <div className="flex flex-col flex-1 h-screen overflow-y-auto">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm border-b py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu />
                    </Button>
                  </SheetTrigger>
                )}
                <h1 className="text-xl font-semibold">
                  {location.pathname.split('/').pop()?.charAt(0).toUpperCase() + location.pathname.split('/').pop()?.slice(1)}
                </h1>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleTheme}
                  className="rounded-full"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
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
          
          {/* Page content */}
          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </Sheet>
      <Toaster />
    </div>
  );
};

export default Dashboard;
