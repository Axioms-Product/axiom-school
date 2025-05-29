
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { format, isToday, isTomorrow } from 'date-fns';
import { 
  BookOpen, 
  Calendar, 
  Trophy, 
  Bell, 
  Clock, 
  TrendingUp, 
  Target,
  Award,
  Star,
  Zap,
  Brain,
  Sparkles,
  GraduationCap,
  Users,
  MessageCircle,
  CheckCircle,
  FileText,
  ClipboardList,
  CalendarCheck,
  School,
  ChevronRight,
  Timer,
  MapPin
} from 'lucide-react';

const HomeView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredHomeworks, 
    getFilteredMarks, 
    getFilteredNotices, 
    getFilteredEvents,
    getFilteredExamSchedules
  } = useData();

  const homework = getFilteredHomeworks().filter(hw => !hw.completedBy?.includes(currentUser?.id || ''));
  const recentMarks = getFilteredMarks().slice(-3);
  const recentNotices = getFilteredNotices().slice(0, 3);
  const upcomingEvents = getFilteredEvents().slice(0, 2);
  const upcomingExams = getFilteredExamSchedules().slice(0, 2);

  const calculateAverage = () => {
    const marks = getFilteredMarks();
    if (marks.length === 0) return 0;
    const total = marks.reduce((acc, mark) => acc + (mark.score / mark.totalScore) * 100, 0);
    return Math.round(total / marks.length);
  };

  const getSubjectAverage = (subject: Subject) => {
    const marks = getFilteredMarks().filter(mark => mark.subject === subject);
    if (marks.length === 0) return 0;
    const total = marks.reduce((acc, mark) => acc + (mark.score / mark.totalScore) * 100, 0);
    return Math.round(total / marks.length);
  };

  const getPerformanceColor = (percentage: number) => {
    if (percentage >= 85) return 'from-emerald-500 to-green-600';
    if (percentage >= 70) return 'from-blue-500 to-indigo-600';
    if (percentage >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 17) return '☀️ Good Afternoon';
    return '🌙 Good Evening';
  };

  const overallAverage = calculateAverage();
  const subjects = Object.values(Subject);
  const isStudent = currentUser?.role === 'student';
  const isTeacher = currentUser?.role === 'teacher';

  // Current date and time information
  const currentDate = new Date();
  const dayName = format(currentDate, 'EEEE');
  const dateString = format(currentDate, 'MMMM d, yyyy');
  const timeString = format(currentDate, 'h:mm a');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Enhanced Welcome Header with Floating Elements */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl opacity-90"></div>
          
          {/* Floating background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-2xl sm:rounded-3xl">
            {Array.from({ length: 15 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10 animate-pulse"
                style={{
                  width: `${Math.random() * 30 + 10}px`,
                  height: `${Math.random() * 30 + 10}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>
          
          <div className="relative px-4 sm:px-8 py-8 sm:py-12">
            <div className="text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="h-12 sm:h-16 w-12 sm:w-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30 shadow-lg hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-xl sm:text-4xl font-bold mb-1 sm:mb-2 animate-fade-in">
                        {getGreeting()}, {currentUser?.name}!
                      </h1>
                      <p className="text-blue-100 text-sm sm:text-lg">
                        Welcome back to your {isStudent ? 'learning' : 'teaching'} dashboard
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white/30 transition-colors">
                      <Users className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                      Class {currentUser?.class}
                    </Badge>
                    {isStudent && (
                      <>
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white/30 transition-colors">
                          <BookOpen className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                          {homework.length} Pending Tasks
                        </Badge>
                        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white/30 transition-colors">
                          <Trophy className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                          {overallAverage}% Average
                        </Badge>
                      </>
                    )}
                    {isTeacher && (
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm hover:bg-white/30 transition-colors">
                        <School className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        {currentUser?.subject} Teacher
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Enhanced Date and Time Card */}
                <div className="mt-6 lg:mt-0">
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/30 shadow-lg hover:bg-white/25 transition-all duration-300 hover:scale-105">
                    <div className="text-center text-white">
                      <div className="flex items-center justify-center gap-2 mb-3">
                        <div className="h-8 w-8 bg-white/20 rounded-full flex items-center justify-center">
                          <Calendar className="h-4 sm:h-5 w-4 sm:w-5" />
                        </div>
                        <span className="font-bold text-sm sm:text-lg">{dayName}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-blue-100 mb-3">{dateString}</p>
                      <div className="flex items-center justify-center gap-2 bg-white/10 rounded-lg px-3 py-1">
                        <Clock className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span className="text-xs sm:text-sm font-medium">{timeString}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats with Animations */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {isStudent ? (
            <>
              <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <BookOpen className="h-12 w-12" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{homework.length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Homework</p>
                    </div>
                    <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <BookOpen className="h-4 sm:h-6 w-4 sm:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Trophy className="h-12 w-12" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Average</p>
                      <p className="text-lg sm:text-2xl font-bold text-emerald-600">{overallAverage}%</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Performance</p>
                    </div>
                    <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Trophy className="h-4 sm:h-6 w-4 sm:w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <ClipboardList className="h-12 w-12" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-2xl font-bold text-green-600">{getFilteredHomeworks().length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Homework</p>
                    </div>
                    <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ClipboardList className="h-4 sm:h-6 w-4 sm:w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileText className="h-12 w-12" />
                  </div>
                  <div className="flex items-center justify-between relative z-10">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{getFilteredMarks().length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Marks Added</p>
                    </div>
                    <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-4 sm:h-6 w-4 sm:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500" />
            <CardContent className="p-3 sm:p-6 relative">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <Bell className="h-12 w-12" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Notices</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">{recentNotices.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Recent</p>
                </div>
                <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Bell className="h-4 sm:h-6 w-4 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg rounded-xl sm:rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500" />
            <CardContent className="p-3 sm:p-6 relative">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <CalendarCheck className="h-12 w-12" />
              </div>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Events</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">{upcomingEvents.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Upcoming</p>
                </div>
                <div className="h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg sm:rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CalendarCheck className="h-4 sm:h-6 w-4 sm:w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-3">
          {/* Academic Performance - Only for Students */}
          {isStudent && (
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl font-bold flex items-center">
                    <Trophy className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
                    Academic Performance
                    <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                  </CardTitle>
                  <CardDescription className="text-emerald-100 text-sm sm:text-base">
                    Your recent marks and subject performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {recentMarks.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="h-16 sm:h-20 w-16 sm:w-20 mx-auto bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full flex items-center justify-center mb-3 sm:mb-4 shadow-lg animate-pulse">
                        <Trophy className="h-8 sm:h-10 w-8 sm:w-10 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">No marks yet</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Your academic performance will appear here once teachers add marks.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Enhanced Overall Performance */}
                      <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center justify-between mb-3 sm:mb-4">
                          <h4 className="font-bold text-sm sm:text-lg flex items-center">
                            <Target className="h-4 w-4 mr-2 text-emerald-600" />
                            Overall Average
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-lg sm:text-2xl font-bold text-emerald-600">{overallAverage}%</span>
                            <div className="h-8 w-8 bg-emerald-100 rounded-full flex items-center justify-center">
                              <Star className="h-4 w-4 text-emerald-600" />
                            </div>
                          </div>
                        </div>
                        <Progress value={overallAverage} className="h-3 sm:h-4 mb-3" />
                        <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {overallAverage >= 85 ? 'Excellent performance! Keep up the amazing work! 🎉' :
                           overallAverage >= 70 ? 'Good work! You\'re doing great! 👍' :
                           overallAverage >= 50 ? 'You\'re making progress! Keep going! 📈' :
                           'Keep working hard! Every effort counts! 💪'}
                        </p>
                      </div>

                      {/* Enhanced Subject Performance */}
                      <div>
                        <h4 className="font-bold text-sm sm:text-lg mb-3 sm:mb-4 flex items-center">
                          <Brain className="h-4 w-4 mr-2 text-blue-600" />
                          Subject Performance
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {subjects.slice(0, 6).map((subject) => {
                            const average = getSubjectAverage(subject);
                            const colorClass = getPerformanceColor(average);
                            
                            return (
                              <div key={subject} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-xs sm:text-sm truncate pr-2">{subject}</h5>
                                  <Badge variant="outline" className="text-xs group-hover:scale-110 transition-transform">{average}%</Badge>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-700 group-hover:animate-pulse`}
                                    style={{ width: `${average}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Enhanced Recent Marks */}
                      <div>
                        <h4 className="font-bold text-sm sm:text-lg mb-3 sm:mb-4 flex items-center">
                          <Award className="h-4 w-4 mr-2 text-purple-600" />
                          Recent Marks
                        </h4>
                        <div className="space-y-2 sm:space-y-3">
                          {recentMarks.map((mark) => (
                            <div key={mark.id} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-300 group">
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm sm:text-base truncate flex items-center">
                                  <BookOpen className="h-3 w-3 mr-2 text-blue-600" />
                                  {mark.subject}
                                </p>
                                <p className="text-xs sm:text-sm text-muted-foreground truncate">{mark.testName}</p>
                              </div>
                              <div className="text-right ml-3">
                                <div className="flex items-center gap-2">
                                  <div className="text-right">
                                    <p className="font-bold text-sm sm:text-base">{mark.score}/{mark.totalScore}</p>
                                    <p className="text-xs sm:text-sm text-muted-foreground">
                                      {Math.round((mark.score / mark.totalScore) * 100)}%
                                    </p>
                                  </div>
                                  <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enhanced Teacher Overview - Only for Teachers */}
          {isTeacher && (
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-2xl font-bold flex items-center">
                    <GraduationCap className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
                    Teaching Overview
                    <Sparkles className="h-4 w-4 ml-2 animate-pulse" />
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-sm sm:text-base">
                    Your class management dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 sm:p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm sm:text-lg flex items-center">
                          <School className="h-4 w-4 mr-2 text-blue-600" />
                          Subject
                        </h4>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-blue-600 mb-1">{currentUser?.subject}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        Class {currentUser?.class}
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 sm:p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-sm sm:text-lg flex items-center">
                          <Users className="h-4 w-4 mr-2 text-green-600" />
                          Students
                        </h4>
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-green-600 mb-1">
                        {getFilteredMarks().reduce((acc, mark) => {
                          if (!acc.includes(mark.studentId)) acc.push(mark.studentId);
                          return acc;
                        }, [] as string[]).length}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total enrolled</p>
                    </div>
                  </div>
                  
                  {/* Quick Actions for Teachers */}
                  <div className="mt-6">
                    <h4 className="font-bold text-sm sm:text-lg mb-3 flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-yellow-600" />
                      Quick Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-3 border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center">
                          <ClipboardList className="h-4 w-4 text-purple-600 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Add Homework</span>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-300 cursor-pointer group">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 text-orange-600 mr-2 group-hover:scale-110 transition-transform" />
                          <span className="text-sm font-medium">Add Marks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enhanced Sidebar Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Pending Homework - Only for Students */}
            {isStudent && (
              <Card className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-bold flex items-center">
                    <BookOpen className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                    Pending Tasks
                    {homework.length > 0 && (
                      <Badge className="ml-2 bg-white/20 text-white border-white/30">
                        {homework.length}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {homework.length === 0 ? (
                    <div className="text-center py-4 sm:py-6">
                      <div className="h-12 sm:h-16 w-12 sm:w-16 mx-auto bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full flex items-center justify-center mb-3 shadow-lg animate-pulse">
                        <CheckCircle className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base mb-1">All caught up!</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">No pending homework</p>
                    </div>
                  ) : (
                    <div className="space-y-3 sm:space-y-4">
                      {homework.slice(0, 3).map((hw) => (
                        <div key={hw.id} className="flex items-start gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg sm:rounded-xl hover:shadow-md transition-all duration-300 group">
                          <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{hw.title}</p>
                            <p className="text-xs text-muted-foreground flex items-center mt-1">
                              <BookOpen className="h-3 w-3 mr-1" />
                              {hw.subject}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Timer className="h-3 w-3 text-orange-500" />
                              <span className="text-xs text-orange-600">
                                Due {format(new Date(hw.dueDate), 'MMM d')}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {homework.length > 3 && (
                        <p className="text-xs text-center text-muted-foreground">
                          +{homework.length - 3} more task{homework.length - 3 > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Enhanced Upcoming Events */}
            <Card className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500" />
              <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6">
                <CardTitle className="text-base sm:text-lg font-bold flex items-center">
                  <Calendar className="h-4 sm:h-5 w-4 sm:w-5 mr-2" />
                  Upcoming Events
                  {upcomingEvents.length > 0 && (
                    <Badge className="ml-2 bg-white/20 text-white border-white/30">
                      {upcomingEvents.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-4 sm:py-6">
                    <div className="h-12 sm:h-16 w-12 sm:w-16 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center mb-3 shadow-lg animate-pulse">
                      <Calendar className="h-6 sm:h-8 w-6 sm:w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base mb-1">No events scheduled</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Check back later for updates</p>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg sm:rounded-xl border border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-300 group">
                        <h4 className="font-medium text-sm truncate flex items-center">
                          <CalendarCheck className="h-3 w-3 mr-2 text-purple-600" />
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {format(new Date(event.date), 'MMM d')} at {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.location}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
