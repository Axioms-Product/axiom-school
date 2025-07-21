
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
  Sparkles,
  Heart,
  Flame,
  Rocket
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Welcome Header */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white border-0 shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"7\" cy=\"7\" r=\"5\"/%3E%3Ccircle cx=\"53\" cy=\"53\" r=\"5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12 animate-pulse delay-1000"></div>
          
          <CardContent className="relative p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-2xl border border-white/30 animate-bounce">
                    {isStudent ? (
                      <GraduationCap className="h-8 w-8 text-white" />
                    ) : (
                      <UserCheck className="h-8 w-8 text-white" />
                    )}
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-yellow-300 animate-spin" />
                  <Heart className="absolute -bottom-1 -left-1 h-4 w-4 text-pink-300 animate-pulse" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2">
                    Welcome back, {currentUser?.name}! 
                    <Flame className="h-8 w-8 text-orange-300 animate-bounce" />
                  </h1>
                  <p className="text-purple-100 text-lg font-medium flex items-center gap-2">
                    <Rocket className="h-5 w-5 animate-pulse" />
                    {isStudent 
                      ? `Ready to conquer new challenges in Class ${currentUser?.class}?`
                      : `Ready to inspire brilliant minds in Class ${currentUser?.class}?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-4 text-center border border-white/30 shadow-xl">
                  <div className="text-sm opacity-90 mb-2 font-medium">Today's Date</div>
                  <div className="text-lg font-bold">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {isStudent ? (
            <>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-blue-600 mb-1">{pendingHomework}</p>
                      <p className="text-xs text-blue-700 font-semibold">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Bell className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-orange-600 mb-1">{notices.length}</p>
                      <p className="text-xs text-orange-700 font-semibold">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-600 mb-1">{upcomingEvents.length}</p>
                      <p className="text-xs text-green-700 font-semibold">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-purple-600 mb-1">{averageMarks}%</p>
                      <p className="text-xs text-purple-700 font-semibold">Average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300 relative">
                      <MessageSquare className="h-4 w-4 text-white" />
                      {unreadMessages > 0 && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{unreadMessages}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-indigo-600 mb-1">{unreadMessages}</p>
                      <p className="text-xs text-indigo-700 font-semibold">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-emerald-600 mb-1">{completedHomework}</p>
                      <p className="text-xs text-emerald-700 font-semibold">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-blue-600 mb-1">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-blue-700 font-semibold">Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-green-600 mb-1">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-green-700 font-semibold">Assignments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-orange-600 mb-1">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-orange-700 font-semibold">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageSquare className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-purple-600 mb-1">{messages.length}</p>
                      <p className="text-xs text-purple-700 font-semibold">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <School className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-indigo-600 mb-1">{currentUser?.class}</p>
                      <p className="text-xs text-indigo-700 font-semibold">Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:-translate-y-1 hover:scale-105">
                <CardContent className="p-3">
                  <div className="flex flex-col items-center text-center gap-2">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl p-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <BookCheck className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xl font-bold text-teal-600 mb-1">{notices.length}</p>
                      <p className="text-xs text-teal-700 font-semibold">Notices</p>
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
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
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
                      <span className="text-sm font-bold text-gray-700">Homework Completion</span>
                      <span className="text-lg font-bold text-gray-900 bg-blue-100 px-2 py-1 rounded-full">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-xs text-green-700 font-semibold">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-xs text-orange-700 font-semibold">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600 mb-1">{homework.length}</div>
                    <div className="text-xs text-blue-700 font-semibold">Total Assignments</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                    <div className="text-2xl font-bold text-green-600 mb-1">{notices.length}</div>
                    <div className="text-xs text-green-700 font-semibold">Active Notices</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
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
                    <div key={hw.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-200">
                      <div className={`rounded-xl p-2 ${
                        isCompleted ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          <Clock className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{hw.title}</p>
                        <p className="text-xs text-gray-600 font-medium">{hw.subject}</p>
                      </div>
                      <Badge className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        isCompleted 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {isCompleted ? 'Done' : 'Pending'}
                      </Badge>
                    </div>
                  );
                })}
                {homework.length === 0 && (
                  <div className="text-center py-6 text-gray-500">
                    <BookOpen className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-semibold">No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-indigo-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-600/5"></div>
          <CardHeader className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
            <CardTitle className="flex items-center gap-2 text-lg font-bold">
              <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="relative p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="group h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="group h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="group h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="group h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Award className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="group h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="group h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="group h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Plus className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="group h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Calendar className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="group h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="group h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-xl flex flex-col items-center gap-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
                  >
                    <Star className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-bold">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="relative overflow-hidden bg-gradient-to-br from-white to-green-50/50 border-0 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-teal-600/5"></div>
            <CardHeader className="relative bg-gradient-to-r from-green-500 to-teal-600 text-white p-4">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg font-bold">
                  <div className="bg-white/20 rounded-lg p-2 backdrop-blur-sm">
                    <Calendar className="h-4 w-4" />
                  </div>
                  Upcoming Events
                </div>
                <Button
                  onClick={() => handleQuickAction('events')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-lg text-sm font-semibold"
                >
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="relative p-4">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl hover:from-green-100 hover:to-teal-100 transition-all duration-300 border border-green-200">
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-2">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-600 font-medium">
                        {new Date(event.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200 px-2 py-1 text-xs font-semibold rounded-full">
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
