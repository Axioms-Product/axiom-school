
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
  UserCheck,
  GraduationCap,
} from 'lucide-react';

interface NavigationItemsProps {
  location: any;
  currentUser: any;
}

export const NavigationItems = ({ location, currentUser }: NavigationItemsProps) => {
  const navigationItems = [
    { name: 'Home', path: '/dashboard/home', icon: <Home size={20} /> },
    { name: 'Homework', path: '/dashboard/homework', icon: <BookOpen size={20} /> },
    { name: 'Notices', path: '/dashboard/notices', icon: <Bell size={20} /> },
    { name: 'Events', path: '/dashboard/events', icon: <Calendar size={20} /> },
    { name: 'Marks', path: '/dashboard/marks', icon: <PenSquare size={20} /> },
    { name: 'Messages', path: '/dashboard/messages', icon: <MessageCircle size={20} /> },
    { name: 'Exams', path: '/dashboard/exams', icon: <FileText size={20} /> },
    { name: 'Attendance', path: '/dashboard/attendance', icon: <UserCheck size={20} /> },
  ];
  
  if (currentUser?.role === 'student') {
    navigationItems.push({ name: 'Teachers', path: '/dashboard/teachers', icon: <Users2 size={20} /> });
  } else if (currentUser?.role === 'teacher') {
    navigationItems.push({ name: 'Students', path: '/dashboard/students', icon: <GraduationCap size={20} /> });
  }

  return (
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
  );
};
