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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2 sm:p-4">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Welcome Header - Smaller */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-lg">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  {isStudent ? (
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  ) : (
                    <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  )}
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold mb-1">Welcome back, {currentUser?.name}! 👋</h1>
                  <p className="text-xs sm:text-sm text-blue-100">
                    {isStudent 
                      ? `Ready to explore new lessons in Class ${currentUser?.class}?`
                      : `Ready to inspire Class ${currentUser?.class} today?`
                    }
                  </p>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                <div className="text-xs opacity-90 mb-1">Today's Date</div>
                <div className="text-sm sm:text-base font-bold">
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

        {/* Stats Grid - Smaller Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {isStudent ? (
            <>
              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-blue-600">{pendingHomework}</p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <Bell className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-orange-600">{notices.length}</p>
                      <p className="text-xs text-gray-500">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-green-100 rounded-lg p-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-green-600">{upcomingEvents.length}</p>
                      <p className="text-xs text-gray-500">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-purple-100 rounded-lg p-2">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-purple-600">{averageMarks}%</p>
                      <p className="text-xs text-gray-500">Score</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-indigo-100 rounded-lg p-2">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-indigo-600">{unreadMessages}</p>
                      <p className="text-xs text-gray-500">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-emerald-100 rounded-lg p-2">
                      <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-emerald-600">{completedHomework}</p>
                      <p className="text-xs text-gray-500">Tasks</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Users className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-blue-600">{teacherStats.totalStudents}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-green-100 rounded-lg p-2">
                      <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-green-600">{teacherStats.assignmentsGiven}</p>
                      <p className="text-xs text-gray-500">Assignments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-orange-100 rounded-lg p-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-orange-600">{teacherStats.eventsPlanned}</p>
                      <p className="text-xs text-gray-500">Events</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-purple-100 rounded-lg p-2">
                      <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-purple-600">{messages.length}</p>
                      <p className="text-xs text-gray-500">Messages</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-indigo-100 rounded-lg p-2">
                      <School className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-indigo-600">{currentUser?.class}</p>
                      <p className="text-xs text-gray-500">Class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-2 sm:p-3">
                  <div className="flex flex-col items-center text-center gap-1">
                    <div className="bg-teal-100 rounded-lg p-2">
                      <BookCheck className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-lg sm:text-xl font-bold text-teal-600">{notices.length}</p>
                      <p className="text-xs text-gray-500">Notices</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Main Content Cards - Smaller */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Progress Overview */}
          <Card className="shadow-md border-0 h-full">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Target className="h-4 w-4" />
                {isStudent ? 'Learning Progress' : 'Class Overview'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              {isStudent ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">Homework Completion</span>
                      <span className="text-xs font-bold text-gray-900">{Math.round(homeworkProgress)}%</span>
                    </div>
                    <Progress value={homeworkProgress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600 mb-1">{completedHomework}</div>
                      <div className="text-xs text-gray-600">Completed</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600 mb-1">{pendingHomework}</div>
                      <div className="text-xs text-gray-600">Pending</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600 mb-1">{homework.length}</div>
                    <div className="text-xs text-gray-600">Assignments</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600 mb-1">{notices.length}</div>
                    <div className="text-xs text-gray-600">Notices</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-md border-0 h-full">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Activity className="h-4 w-4" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-3">
                {homework.slice(0, 3).map((hw) => {
                  const isCompleted = hw.completedBy?.includes(currentUser?.id || '');
                  return (
                    <div key={hw.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className={`rounded-full p-1.5 ${
                        isCompleted ? 'bg-green-100' : 'bg-orange-100'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-3 w-3 text-green-600" />
                        ) : (
                          <Clock className="h-3 w-3 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 truncate">{hw.title}</p>
                        <p className="text-xs text-gray-500">{hw.subject}</p>
                      </div>
                      <Badge 
                        className={`text-xs px-2 py-0.5 ${
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
                  <div className="text-center py-6 text-gray-500">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">No homework assigned yet</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions - Smaller */}
        <Card className="shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg p-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Zap className="h-4 w-4" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
              {isStudent ? (
                <>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Homework</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('messages')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Messages</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('marks')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Award className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Marks</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Profile</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => handleQuickAction('students')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Students</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('homework')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Assignment</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('events')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Events</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('notices')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Notices</span>
                  </Button>
                  <Button 
                    onClick={() => handleQuickAction('profile')}
                    className="h-12 sm:h-16 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg flex flex-col items-center gap-1 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Star className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="text-xs font-medium">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events - Smaller */}
        {upcomingEvents.length > 0 && (
          <Card className="shadow-md border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg p-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="space-y-2">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <div className="bg-green-100 rounded-full p-1.5">
                      <Calendar className="h-3 w-3 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900">{event.title}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 text-xs px-2 py-0.5">
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
