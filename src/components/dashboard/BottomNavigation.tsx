
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-50 shadow-lg mobile-safe">
      <div className="flex justify-around items-center py-1 px-1 h-14">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-0 flex-1 mx-0.5 touch-manipulation ${
                isActive
                  ? 'text-white bg-gradient-to-br from-blue-500 to-blue-600 shadow-md transform scale-105'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 active:bg-blue-100'
              }`}
            >
              <Icon size={18} className={`mb-0.5 ${isActive ? 'text-white' : ''}`} />
              <span className={`text-xs font-medium truncate ${isActive ? 'text-white' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
