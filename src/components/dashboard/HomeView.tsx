
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  BookOpen, 
  Bell, 
  Calendar, 
  MessageCircle,
  BookIcon, 
  CheckCircle, 
  Clock 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredHomeworks, 
    getFilteredNotices, 
    getFilteredEvents, 
    getFilteredMessages,
    getFilteredMarks
  } = useData();
  const [stats, setStats] = useState({
    homeworks: 0,
    notices: 0,
    events: 0,
    unreadMessages: 0,
    completedTasks: 0,
    upcomingEvents: 0
  });
  const [subjectPerformance, setSubjectPerformance] = useState<{subject: string, average: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const homeworks = getFilteredHomeworks();
    const notices = getFilteredNotices();
    const events = getFilteredEvents();
    const messages = getFilteredMessages();
    const marks = getFilteredMarks();
    
    // Calculate unread messages
    const unreadMessages = messages.filter(msg => 
      currentUser?.role === 'teacher' 
        ? msg.receiverId === currentUser.id && !msg.read
        : msg.receiverId === currentUser.id && !msg.read
    ).length;
    
    // Calculate upcoming events (events in the next 7 days)
    const now = new Date().getTime();
    const oneWeekFromNow = now + 7 * 24 * 60 * 60 * 1000;
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date).getTime();
      return eventDate > now && eventDate < oneWeekFromNow;
    }).length;
    
    // Set completedTasks to 0 always
    const completedTasks = 0;
    
    // Calculate subject performance for students
    if (currentUser?.role === 'student' && marks.length > 0) {
      // Group marks by subject and calculate averages
      const subjectGroups: Record<string, number[]> = {};
      marks.forEach(mark => {
        if (!subjectGroups[mark.subject]) {
          subjectGroups[mark.subject] = [];
        }
        subjectGroups[mark.subject].push(mark.score);
      });
      
      const subjectAverages = Object.entries(subjectGroups).map(([subject, scores]) => {
        const sum = scores.reduce((acc, score) => acc + score, 0);
        return {
          subject,
          average: Math.round((sum / scores.length) * 10) / 10
        };
      });
      
      setSubjectPerformance(subjectAverages);
    }
    
    setStats({
      homeworks: homeworks.length,
      notices: notices.length,
      events: events.length,
      unreadMessages,
      completedTasks,
      upcomingEvents
    });
    
    setLoading(false);
  }, [currentUser, getFilteredHomeworks, getFilteredNotices, getFilteredEvents, getFilteredMessages, getFilteredMarks]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-100 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-100 rounded"></div>
              <div className="h-4 bg-blue-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header section with greeting */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-sm border border-blue-100 dark:border-gray-700">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {getGreeting()}, {currentUser?.name}!
        </h1>
        <p className="text-muted-foreground">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          {currentUser?.role === 'teacher' && currentUser?.subject && (
            <Badge variant="outline" className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
              {currentUser.subject} Teacher
            </Badge>
          )}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="card-3d hover:shadow-md transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Homework</CardTitle>
            <BookOpen className="h-4 w-4 text-cgs-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.homeworks}</div>
            <p className="text-xs text-muted-foreground">Active assignments</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-md transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Notices</CardTitle>
            <Bell className="h-4 w-4 text-cgs-purple" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.notices}</div>
            <p className="text-xs text-muted-foreground">Important updates</p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-md transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Events</CardTitle>
            <Calendar className="h-4 w-4 text-cgs-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.events}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-cgs-green">{stats.upcomingEvents} upcoming</span>
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d hover:shadow-md transition-all">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageCircle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.unreadMessages}</div>
            <p className="text-xs text-muted-foreground">Unread communications</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity summary */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-indigo-900/20">
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>Your recent activities and progress</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookIcon className="h-5 w-5 text-blue-700 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">Active Homework</h3>
                    <span className="text-sm font-medium">{stats.homeworks}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${Math.min(stats.homeworks * 10, 100)}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-700 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">Completed Tasks</h3>
                    <span className="text-sm font-medium">{stats.completedTasks}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: `${Math.min(stats.completedTasks * 5, 100)}%` }}></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-sm">Upcoming Events</h3>
                    <span className="text-sm font-medium">{stats.upcomingEvents}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${Math.min(stats.upcomingEvents * 15, 100)}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-center">
              <Link to="/dashboard/events" className="text-blue-600 dark:text-blue-400 hover:underline">
                View all activities
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Role info or subject performance */}
        {currentUser?.role === 'student' && subjectPerformance.length > 0 ? (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-cyan-900/20">
              <CardTitle>Subject Performance</CardTitle>
              <CardDescription>Your academic progress by subject</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {subjectPerformance.map((subject, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-indigo-700 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-sm">{subject.subject}</h3>
                        <span className="text-sm font-medium">{subject.average}/10</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            subject.average >= 8 ? 'bg-green-600' : 
                            subject.average >= 6 ? 'bg-amber-600' : 'bg-red-600'
                          }`} 
                          style={{ width: `${subject.average * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-sm text-center">
                <Link to="/dashboard/marks" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View detailed marks
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-purple-900/20">
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
        )}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used actions based on your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <Link to="/dashboard/homework">
              <Button variant="outline" className="w-full h-24 flex flex-col space-y-2 items-center justify-center">
                <BookOpen className="h-6 w-6 text-cgs-blue" />
                <span>Homework</span>
              </Button>
            </Link>
            <Link to="/dashboard/notices">
              <Button variant="outline" className="w-full h-24 flex flex-col space-y-2 items-center justify-center">
                <Bell className="h-6 w-6 text-cgs-purple" />
                <span>Notices</span>
              </Button>
            </Link>
            <Link to="/dashboard/events">
              <Button variant="outline" className="w-full h-24 flex flex-col space-y-2 items-center justify-center">
                <Calendar className="h-6 w-6 text-cgs-green" />
                <span>Events</span>
              </Button>
            </Link>
            <Link to="/dashboard/messages">
              <Button variant="outline" className="w-full h-24 flex flex-col space-y-2 items-center justify-center">
                <MessageCircle className="h-6 w-6 text-amber-500" />
                <span>Messages</span>
              </Button>
            </Link>
            <Link to="/dashboard/marks">
              <Button variant="outline" className="w-full h-24 flex flex-col space-y-2 items-center justify-center">
                <BookIcon className="h-6 w-6 text-red-500" />
                <span>Marks</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeView;
