
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, PenSquare, MessageCircle, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const BottomNavigation = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  const bottomNavItems = [
    { name: 'Home', path: '/dashboard/home', icon: Home },
    { name: 'Homework', path: '/dashboard/homework', icon: BookOpen },
    { name: 'Marks', path: '/dashboard/marks', icon: PenSquare },
    { name: 'Messages', path: '/dashboard/messages', icon: MessageCircle },
    { name: 'Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-50 shadow-lg">
      <div className="flex justify-around items-center py-2 px-1 h-16">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 mx-0.5 ${
                isActive
                  ? 'text-white bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md scale-105'
                  : 'text-gray-600 dark:text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon size={20} className={`mb-1 ${isActive ? 'text-white' : ''}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="h-safe-area-inset-bottom bg-white dark:bg-gray-900"></div>
    </nav>
  );
};
