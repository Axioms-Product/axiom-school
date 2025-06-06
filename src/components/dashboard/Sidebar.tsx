
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
    <aside className="hidden md:flex flex-col w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-4">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg text-sidebar-foreground">Axioms School</span>
          </div>
        </div>
        
        <NavigationItems location={location} currentUser={currentUser} />
        <QuickActions currentUser={currentUser} />
      </div>
      
      <div className="mt-auto p-4">
        <UserProfile currentUser={currentUser} />
      </div>
    </aside>
  );
};
