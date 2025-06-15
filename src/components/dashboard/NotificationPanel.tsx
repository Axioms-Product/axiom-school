import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success';
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'New Assignment',
    message: 'Math homework has been assigned for tomorrow',
    time: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    type: 'success',
    title: 'Grade Updated',
    message: 'Your English essay received an A+',
    time: '1 day ago',
    unread: true
  },
  {
    id: '3',
    type: 'warning',
    title: 'Upcoming Exam',
    message: 'Science exam scheduled for next Monday',
    time: '2 days ago',
    unread: false
  }
];

export const NotificationPanel = () => {
  const [notifications, setNotifications] = useState(mockNotifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      default: return Info;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      default: return 'text-blue-500';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-auto animate-pulse">
              {unreadCount}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">
            No notifications
          </p>
        ) : (
          notifications.map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border transition-all duration-200 hover:shadow-sm",
                  notification.unread ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                )}
              >
                <Icon className={cn("h-4 w-4 mt-0.5 flex-shrink-0", getIconColor(notification.type))} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                    <div className="flex gap-1">
                      {notification.unread && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => markAsRead(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeNotification(notification.id)}
                        className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
};
