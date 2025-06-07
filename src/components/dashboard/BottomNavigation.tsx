
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const BottomNavigation = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const bottomNavItems = [
    { name: 'Home', path: '/dashboard/home', icon: Home },
    { name: 'Homework', path: '/dashboard/homework', icon: BookOpen },
    { name: 'Marks', path: '/dashboard/marks', icon: PenSquare },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 pb-safe">
      <div className="flex justify-around items-center py-2 px-4 h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                isActive
                  ? 'text-cgs-blue bg-cgs-blue/10'
                  : 'text-gray-600 dark:text-gray-400 hover:text-cgs-blue hover:bg-cgs-blue/5'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'text-cgs-blue' : ''}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-cgs-blue' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
