
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
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-cyan-50 p-3 sm:p-4 md:p-6 smooth-scroll">
      <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Enhanced Welcome Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-xl transform rotate-3">
                      {isStudent ? (
                        <GraduationCap className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      ) : (
                        <UserCheck className="h-8 w-8 md:h-10 md:w-10 text-white" />
                      )}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                      <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                      Welcome back, {currentUser?.name}! ✨
                    </h1>
                    <p className="text-sm md:text-lg text-white/90">
                      {isStudent 
                        ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                        : `Ready to inspire Class ${currentUser?.class} today?`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-3 py-1">
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-3 py-1 capitalize">
                    {currentUser?.role}
                  </Badge>
                  {currentUser?.subject && (
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 px-3 py-1">
                      {currentUser.subject}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 md:p-6 text-center min-w-[180px] border border-white/30">
                <div className="text-xs md:text-sm opacity-90 mb-2">Today's Date</div>
                <div className="text-lg md:text-2xl font-bold mb-2">
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
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {isStudent ? (
            <>
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Homework</p>
                      <p className="text-lg md:text-2xl font-bold">{pendingHomework}</p>
                      <p className="text-xs opacity-80">Pending</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Notices</p>
                      <p className="text-lg md:text-2xl font-bold">{notices.length}</p>
                      <p className="text-xs opacity-80">Active</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <Bell className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Events</p>
                      <p className="text-lg md:text-2xl font-bold">{upcomingEvents.length}</p>
                      <p className="text-xs opacity-80">Upcoming</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Messages</p>
                      <p className="text-lg md:text-2xl font-bold">{unreadMessages}</p>
                      <p className="text-xs opacity-80">Unread</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Students</p>
                      <p className="text-lg md:text-2xl font-bold">{teacherStats.totalStudents}</p>
                      <p className="text-xs opacity-80">In your class</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <Users className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Assignments</p>
                      <p className="text-lg md:text-2xl font-bold">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs opacity-80">Given</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <FileText className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Events</p>
                      <p className="text-lg md:text-2xl font-bold">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs opacity-80">Planned</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-xl border-0 rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs md:text-sm font-medium opacity-90 mb-1">Messages</p>
                      <p className="text-lg md:text-2xl font-bold">{messages.length}</p>
                      <p className="text-xs opacity-80">Total</p>
                    </div>
                    <div className="bg-white/20 rounded-lg p-2">
                      <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Enhanced Progress Overview */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-3 md:p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Target className="h-4 w-4 md:h-5 md:w-5" />
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4">
              {isStudent ? (
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs md:text-sm font-medium text-gray-700">Homework Completion</span>
                      <span className="text-xs md:text-sm font-bold text-gray-900">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-3" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-xs md:text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                      <div className="text-lg md:text-2xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-xs md:text-sm text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <div className="text-lg md:text-2xl font-bold text-blue-600 mb-1">{homework.length}</div>
                      <div className="text-xs md:text-sm text-gray-600">Assignments</div>
                    </div>
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                      <div className="text-lg md:text-2xl font-bold text-green-600 mb-1">{notices.length}</div>
                      <div className="text-xs md:text-sm text-gray-600">Notices</div>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border border-purple-100">
                    <div className="text-center">
                      <div className="text-lg md:text-2xl font-bold text-purple-600 mb-1">{events.length}</div>
                      <div className="text-xs md:text-sm text-gray-600">Events Planned</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white p-3 md:p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Clock className="h-4 w-4 md:h-5 md:w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4">
              <div className="space-y-3">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border">
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
                        <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{hw.title}</p>
                        <p className="text-xs text-gray-500">{hw.subject}</p>
                      </div>
                      <Badge 
                        className={`text-xs ${
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
        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-3 md:p-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Zap className="h-4 w-4 md:h-5 md:w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 md:p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <BookOpen className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-16 md:h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-16 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageSquare className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-16 md:h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Award className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Marks</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-16 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Users className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-16 md:h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Plus className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-16 md:h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-16 md:h-20 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl flex flex-col items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Bell className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="text-xs md:text-sm font-medium">Notices</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events Preview */}
        {upcomingEvents.length > 0 && (
          <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-3 md:p-4">
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Calendar className="h-4 w-4 md:h-5 md:w-5" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4">
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="bg-green-100 rounded-full p-2">
                      <Calendar className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs md:text-sm font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Star className="h-4 w-4 text-yellow-500" />
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
