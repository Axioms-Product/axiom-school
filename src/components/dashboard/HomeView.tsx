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
  UserCheck,
  TrendingUp,
  Star,
  Activity,
  School
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

  // Teacher specific stats
  const teacherStats = {
    totalStudents: studentsInClass.length,
    assignmentsGiven: homework.length,
    eventsPlanned: events.length
  };

  // Calculate average performance for student
  const averageMarks = recentMarks.length > 0 
    ? Math.round(recentMarks.reduce((sum, mark) => sum + (mark.score / mark.totalScore * 100), 0) / recentMarks.length)
    : 0;

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
      case 'profile':
        navigate('/dashboard/profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Enhanced Welcome Header */}
        <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 border border-blue-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200 to-purple-200 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg">
                    {isStudent ? (
                      <GraduationCap className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    ) : (
                      <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    )}
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                    Welcome back, {currentUser?.name}! 👋
                  </h1>
                  <p className="text-sm md:text-base text-gray-600">
                    {isStudent 
                      ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                      : `Ready to inspire Class ${currentUser?.class} today?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-blue-100 text-blue-700 px-3 py-1 text-xs md:text-sm font-medium">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-green-100 text-green-700 px-3 py-1 text-xs md:text-sm font-medium capitalize">
                  {currentUser?.role}
                </Badge>
                {currentUser?.subject && (
                  <Badge className="bg-purple-100 text-purple-700 px-3 py-1 text-xs md:text-sm font-medium">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl md:rounded-2xl p-4 md:p-6 text-white text-center min-w-[160px] md:min-w-[200px] shadow-xl">
              <div className="text-xs md:text-sm opacity-90 mb-1 md:mb-2">Today's Date</div>
              <div className="text-lg md:text-2xl font-bold mb-1 md:mb-2">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
              <div className="text-xs md:text-sm opacity-90">
                {new Date().getFullYear()}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          {isStudent ? (
            <>
              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Homework</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{pendingHomework}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 md:p-3">
                      <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Notices</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{notices.length}</p>
                      <p className="text-xs text-gray-500">Active</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 md:p-3">
                      <Bell className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Events</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{upcomingEvents.length}</p>
                      <p className="text-xs text-gray-500">Upcoming</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-2 md:p-3">
                      <Calendar className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Average</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{averageMarks}%</p>
                      <p className="text-xs text-gray-500">Performance</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 md:p-3">
                      <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Messages</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{unreadMessages}</p>
                      <p className="text-xs text-gray-500">Unread</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg p-2 md:p-3">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Students</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-gray-500">In your class</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 md:p-3">
                      <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Assignments</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-gray-500">Given</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-2 md:p-3">
                      <FileText className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Events</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-gray-500">Planned</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 md:p-3">
                      <Calendar className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Messages</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{messages.length}</p>
                      <p className="text-xs text-gray-500">Total</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 md:p-3">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg border-0 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">Class</p>
                      <p className="text-xl md:text-2xl font-bold text-gray-900">{currentUser?.class}</p>
                      <p className="text-xs text-gray-500">Teaching</p>
                    </div>
                    <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg p-2 md:p-3">
                      <School className="h-5 w-5 md:h-6 md:w-6 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Enhanced Progress Overview */}
          <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 md:p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5" />
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
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
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{homework.length}</div>
                      <div className="text-sm text-gray-600">Assignments</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">{notices.length}</div>
                      <div className="text-sm text-gray-600">Notices</div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="text-2xl font-bold text-purple-600 mb-1">{events.length}</div>
                    <div className="text-sm text-gray-600">Events Planned</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-3 md:p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Activity className="h-4 w-4 md:h-5 md:w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200">
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
                        className={`text-xs ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}
                      >
                        {isCompleted ? 'Done' : 'Pending'}
                      </Badge>
                    </div>
                  );
                })}
                {homework.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5 text-yellow-300" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm font-medium">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-sm font-medium">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Award className="h-6 w-6" />
                    <span className="text-sm font-medium">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Star className="h-6 w-6" />
                    <span className="text-sm font-medium">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Users className="h-6 w-6" />
                    <span className="text-sm font-medium">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="h-6 w-6" />
                    <span className="text-sm font-medium">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Bell className="h-6 w-6" />
                    <span className="text-sm font-medium">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <Star className="h-6 w-6" />
                    <span className="text-sm font-medium">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Preview */}
        {upcomingEvents.length > 0 && (
          <Card className="bg-white shadow-xl border-0 rounded-xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                    <div className="bg-green-100 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700">
                      {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days
                    </Badge>
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
