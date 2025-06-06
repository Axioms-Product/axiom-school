
import { SheetContent, SheetHeader } from '@/components/ui/sheet';
import { BookOpen } from 'lucide-react';
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
        
        <div className="flex-1 p-4 pt-0">
          <NavigationItems location={location} currentUser={currentUser} />
          <QuickActions currentUser={currentUser} />
        </div>
        
        <div className="p-4">
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </SheetContent>
  );
};
