
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NavigationItems } from './NavigationItems';
import { QuickActions } from './QuickActions';
import { UserProfile } from './UserProfile';

interface MobileSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: any;
  currentUser: any;
}

export const MobileSidebar = ({ open, onOpenChange, location, currentUser }: MobileSidebarProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64 p-0">
        <div className="p-4">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Axioms School</span>
            </div>
          </div>
          
          <NavigationItems location={location} currentUser={currentUser} />
          <QuickActions currentUser={currentUser} />
        </div>
        
        <div className="mt-auto p-4">
          <UserProfile currentUser={currentUser} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
