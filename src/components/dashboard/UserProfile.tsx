
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { LogOut, User } from 'lucide-react';
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
      <Separator className="mb-4 bg-sidebar-border/30" />
      <div className="flex items-center justify-between p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <Link 
          to="/dashboard/profile" 
          className="flex items-center gap-3 group flex-1 min-w-0"
        >
          <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-semibold">
              {currentUser?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {currentUser?.name}
            </span>
            <span className="text-xs text-gray-500 capitalize truncate">
              {currentUser?.role} • Class {currentUser?.class}
            </span>
          </div>
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleLogout}
          className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600 text-gray-500 transition-all duration-200 flex-shrink-0"
          title="Logout"
        >
          <LogOut size={16} />
        </Button>
      </div>
    </>
  );
};
