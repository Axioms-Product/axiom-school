
import { Link, useLocation } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationItems } from './NavigationItems';
import { QuickActions } from './QuickActions';
import { UserProfile } from './UserProfile';

export const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useAuth();

  return (
    <aside className="flex flex-col w-64 bg-sidebar border-r border-sidebar-border shadow-lg lg:shadow-none h-full">
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex items-center justify-center mb-8">
          <Link to="/dashboard/home" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl text-sidebar-foreground group-hover:text-cgs-blue transition-colors duration-300">
              Axioms School
            </span>
          </Link>
        </div>
        
        <NavigationItems location={location} currentUser={currentUser} />
        <QuickActions currentUser={currentUser} />
      </div>
      
      <div className="p-4 border-t border-sidebar-border">
        <UserProfile currentUser={currentUser} />
      </div>
    </aside>
  );
};
