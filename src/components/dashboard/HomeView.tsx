
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/30 p-3">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Welcome Header */}
        <Card className="relative overflow-hidden bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-700 text-white border-0 shadow-xl">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 animate-pulse delay-1000"></div>
          
          <CardContent className="relative p-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm shadow-lg border border-white/30">
                    {isStudent ? (
                      <GraduationCap className="h-6 w-6 text-white" />
                    ) : (
                      <UserCheck className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-300" />
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold mb-1 flex items-center gap-2">
                    Welcome back, {currentUser?.name}! 
                    <Heart className="h-5 w-5 text-pink-300" />
                  </h1>
                  <p className="text-purple-100 text-sm font-medium flex items-center gap-1">
                    <Rocket className="h-4 w-4" />
                    {isStudent 
                      ? `Ready to learn in Class ${currentUser?.class}?`
                      : `Teaching Class ${currentUser?.class}`
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-white/15 backdrop-blur-xl rounded-xl p-3 text-center border border-white/30">
                <div className="text-xs opacity-90 mb-1">Today</div>
                <div className="text-sm font-bold">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {isStudent ? (
            <>
              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-1.5 shadow-md">
                      <BookOpen className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{pendingHomework}</p>
                      <p className="text-xs text-blue-700 font-medium">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-1.5 shadow-md">
                      <Bell className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600">{notices.length}</p>
                      <p className="text-xs text-orange-700 font-medium">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-1.5 shadow-md">
                      <Calendar className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{upcomingEvents.length}</p>
                      <p className="text-xs text-green-700 font-medium">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-1.5 shadow-md">
                      <TrendingUp className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{averageMarks}%</p>
                      <p className="text-xs text-purple-700 font-medium">Average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-1.5 shadow-md relative">
                      <MessageSquare className="h-3 w-3 text-white" />
                      {unreadMessages > 0 && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">{unreadMessages}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-indigo-600">{unreadMessages}</p>
                      <p className="text-xs text-indigo-700 font-medium">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg p-1.5 shadow-md">
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-emerald-600">{completedHomework}</p>
                      <p className="text-xs text-emerald-700 font-medium">Completed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-1.5 shadow-md">
                      <Users className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-blue-600">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-blue-700 font-medium">Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-1.5 shadow-md">
                      <FileText className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-green-600">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-green-700 font-medium">Assignments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-1.5 shadow-md">
                      <Calendar className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-orange-600">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-orange-700 font-medium">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-1.5 shadow-md">
                      <MessageSquare className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-purple-600">{messages.length}</p>
                      <p className="text-xs text-purple-700 font-medium">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg p-1.5 shadow-md">
                      <School className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-indigo-600">{currentUser?.class}</p>
                      <p className="text-xs text-indigo-700 font-medium">Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-md transition-all duration-300 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:scale-105">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg p-1.5 shadow-md">
                      <BookCheck className="h-3 w-3 text-white" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-teal-600">{notices.length}</p>
                      <p className="text-xs text-teal-700 font-medium">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Progress Overview */}
          <Card className="bg-gradient-to-br from-white to-blue-50/50 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <div className="bg-white/20 rounded-lg p-1.5 backdrop-blur-sm">
                  <Target className="h-4 w-4" />
                </div>
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              {isStudent ? (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-gray-700">Homework Completion</span>
                      <span className="text-base font-bold text-gray-900 bg-blue-100 px-2 py-1 rounded-full">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-2 bg-gray-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                      <div className="text-xl font-bold text-green-600">{completedHomework}</div>
                      <div className="text-xs text-green-700 font-medium">Completed</div>
                    </div>
                    <div className="text-center p-2 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                      <div className="text-xl font-bold text-orange-600">{pendingHomework}</div>
                      <div className="text-xs text-orange-700 font-medium">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="text-xl font-bold text-blue-600">{homework.length}</div>
                    <div className="text-xs text-blue-700 font-medium">Total Assignments</div>
                  </div>
                  <div className="text-center p-2 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                    <div className="text-xl font-bold text-green-600">{notices.length}</div>
                    <div className="text-xs text-green-700 font-medium">Active Notices</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-white to-purple-50/50 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3">
              <CardTitle className="flex items-center gap-2 text-base font-bold">
                <div className="bg-white/20 rounded-lg p-1.5 backdrop-blur-sm">
                  <Activity className="h-4 w-4" />
                </div>
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-2 p-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                      <div className={`rounded-lg p-1.5 ${
                        isCompleted ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-3 w-3 text-white" />
                        ) : (
                          <Clock className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{hw.title}</p>
                        <p className="text-xs text-gray-600 font-medium">{hw.subject}</p>
                      </div>
                      <Badge className={`px-2 py-1 text-xs font-medium rounded-full ${
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
                  <div className="text-center py-4 text-gray-500">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm font-medium">No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-white to-indigo-50/50 border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3">
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <div className="bg-white/20 rounded-lg p-1.5 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
              </div>
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="text-xs font-bold">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-bold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="text-xs font-bold">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-14 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Award className="h-4 w-4" />
                    <span className="text-xs font-bold">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-14 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Star className="h-4 w-4" />
                    <span className="text-xs font-bold">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-14 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Users className="h-4 w-4" />
                    <span className="text-xs font-bold">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Plus className="h-4 w-4" />
                    <span className="text-xs font-bold">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-14 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Calendar className="h-4 w-4" />
                    <span className="text-xs font-bold">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-14 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="text-xs font-bold">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-14 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 border-0"
                  >
                    <Star className="h-4 w-4" />
                    <span className="text-xs font-bold">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <Card className="bg-gradient-to-br from-white to-green-50/50 border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-base font-bold">
                  <div className="bg-white/20 rounded-lg p-1.5 backdrop-blur-sm">
                    <Calendar className="h-4 w-4" />
                  </div>
                  Upcoming Events
                </div>
                <Button
                  onClick={() => handleQuickAction('events')}
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 rounded-lg text-sm font-medium"
                >
                  View All
                  <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-2 p-2 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                    <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-lg p-1.5">
                      <Calendar className="h-3 w-3 text-white" />
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
