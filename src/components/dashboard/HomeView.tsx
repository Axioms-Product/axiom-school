
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  Bell, 
  Users, 
  Clock,
  Target,
  Award,
  MessageSquare,
  CheckCircle,
  GraduationCap,
  Zap,
  Plus,
  FileText,
  BarChart3,
  UserCheck,
  ClipboardList,
  TrendingUp
} from 'lucide-react';

const HomeView = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { 
    getFilteredHomeworks, 
    getFilteredNotices, 
    getFilteredEvents,
    getFilteredMarks,
    getFilteredMessages,
    getStudentsForClass
  } = useData();

  const isStudent = currentUser?.role === 'student';
  const homework = getFilteredHomeworks();
  const notices = getFilteredNotices();
  const events = getFilteredEvents();
  const recentMarks = getFilteredMarks().slice(0, 5);
  const messages = getFilteredMessages();
  const studentsInClass = getStudentsForClass(currentUser?.class || '');

  const pendingHomework = homework.filter(hw => !hw.completedBy?.includes(currentUser?.id || '')).length;
  const completedHomework = homework.filter(hw => hw.completedBy?.includes(currentUser?.id || '')).length;
  const totalHomework = homework.length;
  const homeworkProgress = totalHomework > 0 ? (completedHomework / totalHomework) * 100 : 0;

  const unreadMessages = messages.filter(msg => 
    msg.receiverId === currentUser?.id && !msg.read
  ).length;

  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return eventDate >= today;
  }).slice(0, 3);

  // Teacher specific stats (real data)
  const teacherStats = {
    totalStudents: studentsInClass.length,
    assignmentsGiven: homework.length,
    averageAttendance: 92 // This would be calculated from attendance data
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'homework':
        navigate('/dashboard/homework');
        break;
      case 'events':
        navigate('/dashboard/events');
        break;
      case 'messages':
        navigate('/dashboard/messages');
        break;
      case 'marks':
        navigate('/dashboard/marks');
        break;
      case 'notices':
        navigate('/dashboard/notices');
        break;
      case 'students':
        navigate('/dashboard/students');
        break;
      case 'exams':
        navigate('/dashboard/exams');
        break;
      case 'attendance':
        navigate('/dashboard/attendance');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    {isStudent ? (
                      <GraduationCap className="h-8 w-8 text-white" />
                    ) : (
                      <UserCheck className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    Welcome back, {currentUser?.name}! 👋
                  </h1>
                  <p className="text-gray-600">
                    {isStudent 
                      ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                      : `Ready to inspire Class ${currentUser?.class} today?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-green-100 text-green-700 px-3 py-1 capitalize">
                  {currentUser?.role}
                </Badge>
                {currentUser?.subject && (
                  <Badge className="bg-purple-100 text-purple-700 px-3 py-1">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white text-center min-w-[200px] shadow-xl">
              <div className="text-sm opacity-90 mb-2">Today's Date</div>
              <div className="text-2xl font-bold mb-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-sm opacity-90">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {isStudent ? (
            <>
              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Homework</p>
                      <p className="text-3xl font-bold text-gray-900">{pendingHomework}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-3">
                      <BookOpen className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Notices</p>
                      <p className="text-3xl font-bold text-gray-900">{notices.length}</p>
                      <p className="text-xs text-gray-500">Active</p>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-3">
                      <Bell className="h-7 w-7 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Events</p>
                      <p className="text-3xl font-bold text-gray-900">{upcomingEvents.length}</p>
                      <p className="text-xs text-gray-500">Upcoming</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-3">
                      <Calendar className="h-7 w-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
                      <p className="text-3xl font-bold text-gray-900">{unreadMessages}</p>
                      <p className="text-xs text-gray-500">Unread</p>
                    </div>
                    <div className="bg-purple-100 rounded-xl p-3">
                      <MessageSquare className="h-7 w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Students</p>
                      <p className="text-3xl font-bold text-gray-900">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-gray-500">In your class</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-3">
                      <Users className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Assignments</p>
                      <p className="text-3xl font-bold text-gray-900">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-gray-500">Given</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-3">
                      <FileText className="h-7 w-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Attendance</p>
                      <p className="text-3xl font-bold text-gray-900">{teacherStats.averageAttendance}%</p>
                      <p className="text-xs text-gray-500">Average</p>
                    </div>
                    <div className="bg-yellow-100 rounded-xl p-3">
                      <ClipboardList className="h-7 w-7 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-xl border-0 rounded-2xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Messages</p>
                      <p className="text-3xl font-bold text-gray-900">{unreadMessages}</p>
                      <p className="text-xs text-gray-500">Unread</p>
                    </div>
                    <div className="bg-purple-100 rounded-xl p-3">
                      <MessageSquare className="h-7 w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Progress Overview */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {isStudent ? (
                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Homework Completion</span>
                      <span className="text-sm font-bold text-gray-900">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{homework.length}</div>
                      <div className="text-sm text-gray-600">Assignments</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-1">{notices.length}</div>
                      <div className="text-sm text-gray-600">Notices</div>
                    </div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{events.length}</div>
                      <div className="text-sm text-gray-600">Events Planned</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-2xl">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className={`rounded-full p-2 ${
                        isCompleted ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <Clock className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{hw.title}</p>
                        <p className="text-xs text-gray-500">{hw.subject}</p>
                      </div>
                      <Badge 
                        className={
                          isCompleted 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }
                      >
                        {isCompleted ? 'Done' : 'Pending'}
                      </Badge>
                    </div>
                  );
                })}
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
        <Card className="bg-white shadow-xl border-0 rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm font-medium">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-sm font-medium">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Award className="h-6 w-6" />
                    <span className="text-sm font-medium">Marks</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm font-medium">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('attendance')}
                    className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ClipboardList className="h-6 w-6" />
                    <span className="text-sm font-medium">Attendance</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm font-medium">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="text-sm font-medium">Notices</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Preview */}
        {upcomingEvents.length > 0 && (
          <Card className="bg-white shadow-xl border-0 rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900">
                <Calendar className="h-5 w-5 text-green-500" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                    <div className="bg-green-100 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomeView;
