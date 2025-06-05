
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  BookOpen, 
  Trophy, 
  Calendar, 
  Bell, 
  Users, 
  TrendingUp,
  Clock,
  Star,
  Target,
  Award,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

const HomeView = () => {
  const { currentUser } = useAuth();
  const { 
    getHomeworkForUser, 
    getNoticesForUser, 
    getUpcomingEvents,
    getRecentMarks,
    getFilteredMessages 
  } = useData();

  const isStudent = currentUser?.role === 'student';
  const homework = getHomeworkForUser();
  const notices = getNoticesForUser();
  const events = getUpcomingEvents();
  const recentMarks = getRecentMarks();
  const messages = getFilteredMessages();

  const pendingHomework = homework.filter(hw => hw.status === 'pending').length;
  const completedHomework = homework.filter(hw => hw.status === 'completed').length;
  const totalHomework = homework.length;
  const homeworkProgress = totalHomework > 0 ? (completedHomework / totalHomework) * 100 : 0;

  const unreadMessages = messages.filter(msg => 
    msg.receiverId === currentUser?.id && !msg.read
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border-0">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {currentUser?.name}! 👋
              </h1>
              <p className="text-lg text-gray-600 mb-4 md:mb-0">
                {isStudent 
                  ? `Ready to continue your learning journey in Class ${currentUser?.class}?`
                  : `Ready to inspire and teach Class ${currentUser?.class} today?`
                }
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200 capitalize">
                  {currentUser?.role}
                </Badge>
                {currentUser?.subject && (
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-center md:text-right mt-4 md:mt-0">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
                <div className="text-sm opacity-90">Today's Date</div>
                <div className="text-xl font-bold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="text-sm opacity-90">
                  {new Date().toLocaleDateString('en-US', { year: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Homework</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingHomework}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Notices</p>
                  <p className="text-2xl font-bold text-gray-900">{notices.length}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <Bell className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Events</p>
                  <p className="text-2xl font-bold text-gray-900">{events.length}</p>
                  <p className="text-xs text-gray-500">Upcoming</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-gray-900">{unreadMessages}</p>
                  <p className="text-xs text-gray-500">Unread</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Homework Progress */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Homework Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                  <span className="text-sm font-bold text-gray-900">{Math.round(homeworkProgress)}%</span>
                </div>
                <Progress value={homeworkProgress} className="h-3" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{completedHomework}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{pendingHomework}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {homework.slice(0, 3).map((hw) => (
                  <div key={hw.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`rounded-full p-2 ${
                      hw.status === 'completed' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {hw.status === 'completed' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{hw.title}</p>
                      <p className="text-xs text-gray-500">{hw.subject}</p>
                    </div>
                    <Badge 
                      className={
                        hw.status === 'completed' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }
                    >
                      {hw.status}
                    </Badge>
                  </div>
                ))}
                {homework.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white shadow-lg border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Star className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex flex-col items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span className="text-xs">Homework</span>
              </Button>
              <Button className="h-16 bg-green-600 hover:bg-green-700 text-white rounded-xl flex flex-col items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-xs">Events</span>
              </Button>
              <Button className="h-16 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex flex-col items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs">Messages</span>
              </Button>
              <Button className="h-16 bg-orange-600 hover:bg-orange-700 text-white rounded-xl flex flex-col items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-xs">Marks</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
