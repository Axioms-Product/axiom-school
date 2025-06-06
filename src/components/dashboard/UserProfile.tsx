
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface UserProfileProps {
  currentUser: any;
}

export const UserProfile = ({ currentUser }: UserProfileProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <Separator className="mb-4 bg-sidebar-border/50" />
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard/profile" 
          className="flex items-center gap-2 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {currentUser?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">{currentUser?.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser?.role}</span>
          </div>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="h-8 w-8 rounded-full hover:bg-sidebar-accent text-sidebar-foreground"
        >
          <LogOut size={16} />
        </Button>
      </div>
    </>
  );
};
