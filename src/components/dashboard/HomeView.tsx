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
  School,
  Trophy,
  BookCheck
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

  const teacherStats = {
    totalStudents: studentsInClass.length,
    assignmentsGiven: homework.length,
    eventsPlanned: events.length
  };

  const averageMarks = recentMarks.length > 0 
    ? Math.round(recentMarks.reduce((sum, mark) => sum + (mark.score / mark.totalScore * 100), 0) / recentMarks.length)
    : 0;

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'homework': navigate('/dashboard/homework'); break;
      case 'events': navigate('/dashboard/events'); break;
      case 'messages': navigate('/dashboard/messages'); break;
      case 'marks': navigate('/dashboard/marks'); break;
      case 'notices': navigate('/dashboard/notices'); break;
      case 'students': navigate('/dashboard/students'); break;
      case 'profile': navigate('/dashboard/profile'); break;
      default: break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2 sm:p-4 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Enhanced Welcome Header */}
        <Card className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white border-0 shadow-2xl overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg"></div>
          </div>
          
          <CardContent className="p-6 sm:p-8 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg">
                  {isStudent ? (
                    <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
                  ) : (
                    <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 text-white drop-shadow-lg" />
                  )}
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
                    Welcome back, {currentUser?.name}! 👋
                  </h1>
                  <p className="text-base sm:text-lg text-blue-100 font-medium">
                    {isStudent 
                      ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                      : `Ready to inspire Class ${currentUser?.class} today?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 sm:p-6 text-center border border-white/20 shadow-lg">
                <div className="text-sm sm:text-base opacity-90 mb-2 font-medium">Today's Date</div>
                <div className="text-xl sm:text-2xl font-bold drop-shadow-lg">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid - Enhanced with better spacing */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {isStudent ? (
            <>
              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Pending</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">{pendingHomework}</p>
                      <p className="text-xs text-gray-500 font-medium">Homework</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <BookOpen className="h-5 w-5 sm:h-7 sm:w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Active</p>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-600">{notices.length}</p>
                      <p className="text-xs text-gray-500 font-medium">Notices</p>
                    </div>
                    <div className="bg-orange-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Bell className="h-5 w-5 sm:h-7 sm:w-7 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Upcoming</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">{upcomingEvents.length}</p>
                      <p className="text-xs text-gray-500 font-medium">Events</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Calendar className="h-5 w-5 sm:h-7 sm:w-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Average</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-600">{averageMarks}%</p>
                      <p className="text-xs text-gray-500 font-medium">Score</p>
                    </div>
                    <div className="bg-purple-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <TrendingUp className="h-5 w-5 sm:h-7 sm:w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Unread</p>
                      <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{unreadMessages}</p>
                      <p className="text-xs text-gray-500 font-medium">Messages</p>
                    </div>
                    <div className="bg-indigo-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <MessageSquare className="h-5 w-5 sm:h-7 sm:w-7 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Study</p>
                      <p className="text-2xl sm:text-3xl font-bold text-emerald-600">4.2h</p>
                      <p className="text-xs text-gray-500 font-medium">Today</p>
                    </div>
                    <div className="bg-emerald-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Clock className="h-5 w-5 sm:h-7 sm:w-7 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Students</p>
                      <p className="text-2xl sm:text-3xl font-bold text-blue-600">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-gray-500 font-medium">In class</p>
                    </div>
                    <div className="bg-blue-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Users className="h-5 w-5 sm:h-7 sm:w-7 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Assignments</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-gray-500 font-medium">Given</p>
                    </div>
                    <div className="bg-green-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <FileText className="h-5 w-5 sm:h-7 sm:w-7 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Events</p>
                      <p className="text-2xl sm:text-3xl font-bold text-orange-600">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-gray-500 font-medium">Planned</p>
                    </div>
                    <div className="bg-orange-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Calendar className="h-5 w-5 sm:h-7 sm:w-7 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Messages</p>
                      <p className="text-2xl sm:text-3xl font-bold text-purple-600">{messages.length}</p>
                      <p className="text-xs text-gray-500 font-medium">Total</p>
                    </div>
                    <div className="bg-purple-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <MessageSquare className="h-5 w-5 sm:h-7 sm:w-7 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Class</p>
                      <p className="text-2xl sm:text-3xl font-bold text-indigo-600">{currentUser?.class}</p>
                      <p className="text-xs text-gray-500 font-medium">Teaching</p>
                    </div>
                    <div className="bg-indigo-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <School className="h-5 w-5 sm:h-7 sm:w-7 text-indigo-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 h-full border-0 shadow-lg">
                <CardContent className="p-4 sm:p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-600 mb-2">Active</p>
                      <p className="text-2xl sm:text-3xl font-bold text-teal-600">85%</p>
                      <p className="text-xs text-gray-500 font-medium">Students</p>
                    </div>
                    <div className="bg-teal-100 rounded-xl p-3 sm:p-4 self-center shadow-sm">
                      <Activity className="h-5 w-5 sm:h-7 sm:w-7 text-teal-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Progress Overview */}
          <Card className="shadow-lg border-0 h-full">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
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
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-lg border-0 h-full">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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

        {/* Quick Actions */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Zap className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Bell className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-16 sm:h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 sm:gap-2 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Star className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span className="text-xs sm:text-sm font-medium">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg p-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calendar className="h-5 w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
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
