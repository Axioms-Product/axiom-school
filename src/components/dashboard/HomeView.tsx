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
  BookCheck,
  ArrowRight,
  Sparkles
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 p-2 sm:p-3 lg:p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Welcome Header - Compact */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-700/20"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
          
          <CardContent className="relative p-4 sm:p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg">
                    {isStudent ? (
                      <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    ) : (
                      <UserCheck className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                    )}
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1">
                    Welcome back, {currentUser?.name}! 👋
                  </h1>
                  <p className="text-blue-100 text-xs sm:text-sm lg:text-base font-medium">
                    {isStudent 
                      ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                      : `Ready to inspire Class ${currentUser?.class} today?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/15 backdrop-blur-md rounded-xl p-3 text-center border border-white/20 shadow-lg">
                  <div className="text-xs opacity-90 mb-1">Today's Date</div>
                  <div className="text-sm font-bold">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid - Smaller Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {isStudent ? (
            <>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600 mb-1">{pendingHomework}</p>
                      <p className="text-xs text-gray-600 font-medium">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600 mb-1">{notices.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600 mb-1">{upcomingEvents.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600 mb-1">{averageMarks}%</p>
                      <p className="text-xs text-gray-600 font-medium">Average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-indigo-600 mb-1">{unreadMessages}</p>
                      <p className="text-xs text-gray-600 font-medium">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600 mb-1">{completedHomework}</p>
                      <p className="text-xs text-gray-600 font-medium">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600 mb-1">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-gray-600 font-medium">Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600 mb-1">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-gray-600 font-medium">Assignments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600 mb-1">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-gray-600 font-medium">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600 mb-1">{messages.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <School className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-indigo-600 mb-1">{currentUser?.class}</p>
                      <p className="text-xs text-gray-600 font-medium">Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-white/70 backdrop-blur-sm border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookCheck className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-teal-600 mb-1">{notices.length}</p>
                      <p className="text-xs text-gray-600 font-medium">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Cards - Smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Progress Overview */}
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <div className="bg-white/20 rounded-lg p-1.5">
                  <Target className="h-4 w-4" />
                </div>
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-4">
              {isStudent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-700">Homework Completion</span>
                      <span className="text-sm font-bold text-gray-900">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                      <div className="text-2xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-xs text-green-700 font-medium">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 shadow-sm">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-xs text-orange-700 font-medium">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-sm">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{homework.length}</div>
                    <div className="text-xs text-blue-700 font-medium">Total Assignments</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 shadow-sm">
                    <div className="text-2xl font-bold text-green-600 mb-1">{notices.length}</div>
                    <div className="text-xs text-green-700 font-medium">Active Notices</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <div className="bg-white/20 rounded-lg p-1.5">
                  <Activity className="h-4 w-4" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-4">
              <div className="space-y-3">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="group flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-200 hover:border-blue-200 hover:shadow-md">
                      <div className={`rounded-xl p-2 shadow-sm ${
                        isCompleted ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-gray-900 truncate mb-1">{hw.title}</p>
                        <p className="text-xs text-gray-600 font-medium">{hw.subject}</p>
                      </div>
                      <Badge 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          isCompleted 
                            ? 'bg-green-100 text-green-700 border-green-200' 
                            : 'bg-orange-100 text-orange-700 border-orange-200'
                        }`}
                      >
                        {isCompleted ? 'Done' : 'Pending'}
                      </Badge>
                    </div>
                  );
                })}
                {homework.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <div className="bg-gray-100 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-gray-400" />
                    </div>
                    <p className="text-xs font-medium">No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Smaller */}
        <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5"></div>
          <CardHeader className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <div className="bg-white/20 rounded-lg p-1.5">
                <Zap className="h-4 w-4" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-4">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="group h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="group h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="group h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="group h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Award className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="group h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="group h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="group h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Plus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="group h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="group h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="group h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-semibold">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events - Smaller */}
        {upcomingEvents.length > 0 && (
          <Card className="relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white p-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-bold">
                  <div className="bg-white/20 rounded-lg p-1.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  Upcoming Events
                </div>
                <Button
                  onClick={() => handleQuickAction('events')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-lg text-xs"
                >
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-4">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="group flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl hover:from-green-100 hover:to-teal-100 transition-all duration-300 border border-green-200 hover:border-green-300 hover:shadow-md">
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-2 shadow-sm">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900 mb-1">{event.title}</p>
                      <p className="text-xs text-gray-600 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-1 text-xs font-medium rounded-full">
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
