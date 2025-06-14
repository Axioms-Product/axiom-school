
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ClipboardList, 
  Award, 
  Bell,
  GraduationCap
} from 'lucide-react';

interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  roles?: string[];
}

const navigationItems: NavigationItem[] = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: Home,
  },
  {
    title: 'Students',
    href: '/dashboard/students',
    icon: Users,
    roles: ['teacher'],
  },
  {
    title: 'Teachers',
    href: '/dashboard/teachers',
    icon: GraduationCap,
    roles: ['student'],
  },
  {
    title: 'Homework',
    href: '/dashboard/homework',
    icon: ClipboardList,
  },
  {
    title: 'Marks',
    href: '/dashboard/marks',
    icon: Award,
  },
  {
    title: 'Messages',
    href: '/dashboard/messages',
    icon: MessageSquare,
  },
  {
    title: 'Notices',
    href: '/dashboard/notices',
    icon: Bell,
  },
];

interface NavigationItemsProps {
  location: any;
  currentUser: any;
  onNavigate?: (to: string) => void;
  isMobile?: boolean;
}

export const NavigationItems = ({ location, currentUser, onNavigate, isMobile = false }: NavigationItemsProps) => {
  const filteredItems = navigationItems.filter(item => 
    !item.roles || item.roles.includes(currentUser?.role)
  );

  const handleClick = (href: string) => {
    if (onNavigate && isMobile) {
      onNavigate(href);
    }
  };

  return (
    <nav className="space-y-1">
      {filteredItems.map((item) => {
        const isActive = location.pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link
            key={item.href}
            to={item.href}
            onClick={() => handleClick(item.href)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              'focus:bg-sidebar-accent focus:text-sidebar-accent-foreground',
              'active:bg-sidebar-accent active:text-sidebar-accent-foreground',
              isActive 
                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm' 
                : 'text-sidebar-foreground'
            )}
          >
            <Icon className="h-4 w-4 flex-shrink-0" />
            <span className="truncate">{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};
