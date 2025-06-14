
import { SheetContent, SheetHeader } from '@/components/ui/sheet';
import { BookOpen } from 'lucide-react';
import { NavigationItems } from './NavigationItems';
import { QuickActions } from './QuickActions';
import { UserProfile } from './UserProfile';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: any;
  currentUser: any;
}

export const MobileSidebar = ({ open, onOpenChange, location, currentUser }: MobileSidebarProps) => {
  const navigate = useNavigate();

  // Auto-close sidebar when route changes on mobile
  useEffect(() => {
    if (open) {
      onOpenChange(false);
    }
  }, [location.pathname]);

  // Custom navigation handler that closes sidebar immediately
  const handleNavigation = (to: string) => {
    onOpenChange(false);
    navigate(to);
  };

  return (
    <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
      <div className="flex flex-col h-full">
        <SheetHeader className="p-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg text-sidebar-foreground">Axioms School</span>
            </div>
          </div>
        </SheetHeader>
        
        <div className="flex-1 p-4 pt-0 overflow-y-auto mobile-scroll">
          <NavigationItems 
            location={location} 
            currentUser={currentUser} 
            onNavigate={handleNavigation}
            isMobile={true}
          />
          <QuickActions currentUser={currentUser} />
        </div>
        
        <div className="p-4 border-t border-sidebar-border/50">
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </SheetContent>
  );
};
