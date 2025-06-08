
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
} from 'lucide-react';

interface NavigationItemsProps {
  location: any;
  currentUser: any;
}

export const NavigationItems = ({ location, currentUser }: NavigationItemsProps) => {
  const allNavigationItems = [
    { name: 'Home', path: '/dashboard/home', icon: <Home size={20} /> },
    { name: 'Homework', path: '/dashboard/homework', icon: <BookOpen size={20} /> },
    { name: 'Notices', path: '/dashboard/notices', icon: <Bell size={20} /> },
    { name: 'Events', path: '/dashboard/events', icon: <Calendar size={20} /> },
    { name: 'Marks', path: '/dashboard/marks', icon: <PenSquare size={20} /> },
    { name: 'Messages', path: '/dashboard/messages', icon: <MessageCircle size={20} /> },
    { name: 'Exams', path: '/dashboard/exams', icon: <FileText size={20} /> },
    { name: 'Profile', path: '/dashboard/profile', icon: <User size={20} /> },
  ];
  
  if (currentUser?.role === 'student') {
    allNavigationItems.push({ name: 'Teachers', path: '/dashboard/teachers', icon: <Users2 size={20} /> });
  } else if (currentUser?.role === 'teacher') {
    allNavigationItems.push({ name: 'Students', path: '/dashboard/students', icon: <GraduationCap size={20} /> });
  }

  // Bottom nav items for mobile (these will be excluded from sidebar on mobile)
  const bottomNavPaths = ['/dashboard/home', '/dashboard/homework', '/dashboard/marks', '/dashboard/messages', '/dashboard/profile'];
  
  // Filter items for desktop sidebar (show all) and mobile sidebar (exclude bottom nav items)
  const sidebarItems = allNavigationItems.filter(item => 
    window.innerWidth >= 768 || !bottomNavPaths.includes(item.path)
  );

  return (
    <nav className="space-y-1.5">
      {sidebarItems.map((item) => (
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
  );
};
