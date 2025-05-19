
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';

const HomeView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredHomeworks, 
    getFilteredNotices, 
    getFilteredEvents, 
    getFilteredMessages 
  } = useData();
  const [stats, setStats] = useState({
    homeworks: 0,
    notices: 0,
    events: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const homeworks = getFilteredHomeworks();
    const notices = getFilteredNotices();
    const events = getFilteredEvents();
    const messages = getFilteredMessages();
    
    const unreadMessages = messages.filter(msg => 
      currentUser?.role === 'teacher' 
        ? msg.receiverId === currentUser.id && !msg.read
        : msg.receiverId === currentUser.id && !msg.read
    ).length;
    
    setStats({
      homeworks: homeworks.length,
      notices: notices.length,
      events: events.length,
      unreadMessages
    });
  }, [currentUser, getFilteredHomeworks, getFilteredNotices, getFilteredEvents, getFilteredMessages]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {currentUser?.name}!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Homework</CardTitle>
            <CardDescription>Active assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.homeworks}</div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Notices</CardTitle>
            <CardDescription>Important announcements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notices}</div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <CardDescription>Upcoming activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events}</div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <CardDescription>Unread communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-blue-50 dark:bg-gray-800">
            <CardTitle>Your Role: {currentUser?.role === 'teacher' ? 'Teacher' : 'Student'}</CardTitle>
            <CardDescription>
              {currentUser?.role === 'teacher' 
                ? `You're managing Class ${currentUser?.class}`
                : `You're enrolled in Class ${currentUser?.class}`
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">Access Overview</h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {currentUser?.role === 'teacher'
                    ? `As a teacher, you can create and manage content for Class ${currentUser?.class} only.`
                    : `As a student, you can view content related to Class ${currentUser?.class} only.`
                  }
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">Permissions</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  {currentUser?.role === 'teacher' ? (
                    <>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Create and manage homework assignments</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Post notices and announcements</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Schedule and manage events</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Respond to student messages</span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>View homework assignments for your class</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Read notices and announcements</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Check upcoming events for your class</span>
                      </li>
                      <li className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span>Send messages to your class teacher</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-purple-50 dark:bg-gray-800">
            <CardTitle>Welcome to CGS Connect</CardTitle>
            <CardDescription>Your school management system</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                CGS Connect is designed to streamline communication and organization 
                between teachers and students. Navigate through the sidebar to 
                access different sections of the application.
              </p>
              <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="font-medium text-base">Getting Started</h3>
                <ul className="mt-2 space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs mr-2 mt-0.5">1</div>
                    <span>Explore the Homework section to view or manage assignments</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs mr-2 mt-0.5">2</div>
                    <span>Check Notices for important school announcements</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs mr-2 mt-0.5">3</div>
                    <span>Stay updated with Events for upcoming activities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs mr-2 mt-0.5">4</div>
                    <span>Use Messages to communicate directly with your teacher or students</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
