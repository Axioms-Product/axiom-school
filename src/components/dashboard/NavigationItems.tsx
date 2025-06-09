
import { Link } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Bell,
  Calendar,
  PenSquare,
  MessageCircle,
  Users2,
  FileText,
  GraduationCap,
  User,
  Users,
} from 'lucide-react';

interface NavigationItemsProps {
  location: any;
  currentUser: any;
}

export const NavigationItems = ({ location, currentUser }: NavigationItemsProps) => {
  const allNavigationItems = [
    { name: 'Home', path: '/dashboard/home', icon: <Home size={18} /> },
    { name: 'Homework', path: '/dashboard/homework', icon: <BookOpen size={18} /> },
    { name: 'Notices', path: '/dashboard/notices', icon: <Bell size={18} /> },
    { name: 'Events', path: '/dashboard/events', icon: <Calendar size={18} /> },
    { name: 'Marks', path: '/dashboard/marks', icon: <PenSquare size={18} /> },
    { name: 'Messages', path: '/dashboard/messages', icon: <MessageCircle size={18} /> },
    { name: 'Exams', path: '/dashboard/exams', icon: <FileText size={18} /> },
    { name: 'Class Members', path: '/dashboard/class-members', icon: <Users size={18} /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <User size={18} /> },
  ];
  
  if (currentUser?.role === 'student') {
    allNavigationItems.push({ name: 'Teachers', path: '/dashboard/teachers', icon: <Users2 size={18} /> });
  } else if (currentUser?.role === 'teacher') {
    allNavigationItems.push({ name: 'Students', path: '/dashboard/students', icon: <GraduationCap size={18} /> });
  }

  // Bottom nav items for mobile (these will be excluded from sidebar on mobile)
  const bottomNavPaths = ['/dashboard/home', '/dashboard/homework', '/dashboard/marks', '/dashboard/messages', '/dashboard/profile'];
  
  // Filter items for desktop sidebar (show all) and mobile sidebar (exclude bottom nav items)
  const sidebarItems = allNavigationItems.filter(item => 
    window.innerWidth >= 768 || !bottomNavPaths.includes(item.path)
  );

  return (
    <nav className="space-y-1">
      {sidebarItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 rounded-md transition-colors text-sm md:text-base ${
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
  );
};
