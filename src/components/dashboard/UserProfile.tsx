
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
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!currentUser) {
    return (
      <>
        <Separator className="mb-4 bg-sidebar-border/50" />
        <div className="flex items-center justify-center p-4">
          <div className="text-sm text-muted-foreground">Loading...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Separator className="mb-4 bg-sidebar-border/50" />
      <div className="flex items-center justify-between">
        <Link 
          to="/dashboard/profile" 
          className="flex items-center gap-2 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id || 'default'}`} />
            <AvatarFallback className="bg-sidebar-accent text-sidebar-accent-foreground">
              {currentUser?.name?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium leading-none">{currentUser?.name || 'User'}</span>
            <span className="text-xs text-muted-foreground capitalize">{currentUser?.role || 'student'}</span>
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
