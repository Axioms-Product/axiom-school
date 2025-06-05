
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
  Rocket,
  Globe,
  Heart
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
    <div className="min-h-screen animated-gradient-slow p-3 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Enhanced Welcome Header */}
        <div className="relative">
          <div className="card-3d glass-effect rounded-3xl overflow-hidden border border-white/20">
            <div className="relative px-4 sm:px-8 py-8 sm:py-12">
              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 text-4xl animate-bounce">🎓</div>
              <div className="absolute bottom-4 left-4 text-3xl float">📚</div>
              <div className="absolute top-1/2 right-8 text-2xl float-delayed">⭐</div>
              
              <div className="text-white relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="card-3d bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg p-4">
                        <GraduationCap className="h-8 w-8 text-white pulse-glow" />
                      </div>
                      <div>
                        <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 neon-text">
                          {getGreeting()}, {currentUser?.name}! 
                        </h1>
                        <p className="text-blue-100 text-sm sm:text-lg">
                          Welcome back to your {isStudent ? 'learning' : 'teaching'} dashboard ✨
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm neon-border">
                        <Users className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                        Class {currentUser?.class}
                      </Badge>
                      {isStudent && (
                        <>
                          <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                            <BookOpen className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            {homework.length} Pending Tasks
                          </Badge>
                          <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                            <Trophy className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                            {overallAverage}% Average
                          </Badge>
                        </>
                      )}
                      {isTeacher && (
                        <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                          <BookOpen className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                          {currentUser?.subject} Teacher
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Enhanced Date and Time Card */}
                  <div className="mt-6 lg:mt-0">
                    <div className="card-3d glass-effect rounded-2xl p-4 sm:p-6 border border-white/30">
                      <div className="text-center text-white">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-cyan-400" />
                          <span className="font-bold text-sm sm:text-lg">{dayName}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-100 mb-2">{dateString}</p>
                        <div className="flex items-center justify-center gap-2">
                          <Clock className="h-3 sm:h-4 w-3 sm:w-4 text-yellow-400 animate-pulse" />
                          <span className="text-xs sm:text-sm font-medium">{timeString}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {isStudent ? (
            <>
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-20">📝</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Pending</p>
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{homework.length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Homework</p>
                    </div>
                    <div className="card-3d bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
                      <BookOpen className="h-4 sm:h-6 w-4 sm:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-20">🏆</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Average</p>
                      <p className="text-lg sm:text-2xl font-bold text-emerald-600">{overallAverage}%</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Performance</p>
                    </div>
                    <div className="card-3d bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
                      <Trophy className="h-4 sm:h-6 w-4 sm:w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-green-400 to-emerald-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-20">📋</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-2xl font-bold text-green-600">{getFilteredHomeworks().length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Homework</p>
                    </div>
                    <div className="card-3d bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
                      <ClipboardList className="h-4 sm:h-6 w-4 sm:w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-cyan-500" />
                <CardContent className="p-3 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-20">📊</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm text-muted-foreground">Total</p>
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">{getFilteredMarks().length}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">Marks Added</p>
                    </div>
                    <div className="card-3d bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
                      <FileText className="h-4 sm:h-6 w-4 sm:w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          <Card className="card-3d glass-effect border-white/20 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500" />
            <CardContent className="p-3 sm:p-6 relative">
              <div className="absolute top-2 right-2 text-2xl opacity-20">📢</div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Notices</p>
                  <p className="text-lg sm:text-2xl font-bold text-purple-600">{recentNotices.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Recent</p>
                </div>
                <div className="card-3d bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
                  <Bell className="h-4 sm:h-6 w-4 sm:w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-3d glass-effect border-white/20 overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-orange-400 to-red-500" />
            <CardContent className="p-3 sm:p-6 relative">
              <div className="absolute top-2 right-2 text-2xl opacity-20">🎉</div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground">Events</p>
                  <p className="text-lg sm:text-2xl font-bold text-orange-600">{upcomingEvents.length}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">Upcoming</p>
                </div>
                <div className="card-3d bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl flex items-center justify-center p-2 sm:p-3">
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
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-emerald-400 to-green-500" />
                <CardHeader className="bg-gradient-to-r from-emerald-600/20 to-green-600/20 text-foreground p-4 sm:p-6 relative">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 float">🌟</div>
                  <CardTitle className="text-lg sm:text-2xl font-bold flex items-center">
                    <Trophy className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 text-emerald-600" />
                    Academic Performance
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    Your recent marks and subject performance
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {recentMarks.length === 0 ? (
                    <div className="text-center py-6 sm:py-8">
                      <div className="card-3d bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 rounded-full mx-auto mb-3 sm:mb-4 shadow-lg p-6">
                        <Trophy className="h-10 sm:h-12 w-10 sm:w-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold mb-2">No marks yet</h3>
                      <p className="text-sm sm:text-base text-muted-foreground">Your academic performance will appear here once teachers add marks.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Enhanced Overall Performance */}
                      <div className="card-3d bg-gradient-to-r from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 border border-emerald-200/50">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-lg flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Overall Average
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-emerald-600">{overallAverage}%</span>
                            <Rocket className="h-5 w-5 text-emerald-600" />
                          </div>
                        </div>
                        <Progress value={overallAverage} className="h-3 mb-2" />
                        <p className="text-sm text-muted-foreground">
                          {overallAverage >= 85 ? 'Excellent performance! 🎉' :
                           overallAverage >= 70 ? 'Good work! Keep it up! 👍' :
                           overallAverage >= 50 ? 'You\'re doing well! 📈' :
                           'Keep working hard! 💪'}
                        </p>
                      </div>

                      {/* Subject Performance */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Brain className="h-5 w-5 text-indigo-600" />
                          Subject Performance
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {subjects.slice(0, 6).map((subject) => {
                            const average = getSubjectAverage(subject);
                            const colorClass = getPerformanceColor(average);
                            
                            return (
                              <div key={subject} className="card-3d glass-effect rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-sm truncate pr-2">{subject}</h5>
                                  <Badge variant="outline" className="text-xs">{average}%</Badge>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div 
                                    className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
                                    style={{ width: `${average}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recent Marks */}
                      <div>
                        <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                          <Award className="h-5 w-5 text-purple-600" />
                          Recent Marks
                        </h4>
                        <div className="space-y-3">
                          {recentMarks.map((mark) => (
                            <div key={mark.id} className="card-3d glass-effect rounded-xl p-4 border border-white/20">
                              <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-base truncate">{mark.subject}</p>
                                  <p className="text-sm text-muted-foreground truncate">{mark.testName}</p>
                                </div>
                                <div className="text-right ml-3">
                                  <p className="font-bold text-base">{mark.score}/{mark.totalScore}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {Math.round((mark.score / mark.totalScore) * 100)}%
                                  </p>
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

          {/* Teacher Overview - Only for Teachers */}
          {isTeacher && (
            <div className="lg:col-span-2">
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-foreground p-4 sm:p-6 relative">
                  <div className="absolute top-4 right-4 text-3xl opacity-30 float-delayed">🎯</div>
                  <CardTitle className="text-lg sm:text-2xl font-bold flex items-center">
                    <GraduationCap className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                    Teaching Overview
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm sm:text-base">
                    Your class management dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="card-3d bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Globe className="h-5 w-5 text-blue-600" />
                        Subject
                      </h4>
                      <p className="text-xl font-bold text-blue-600">{currentUser?.subject}</p>
                      <p className="text-sm text-muted-foreground">Class {currentUser?.class}</p>
                    </div>
                    
                    <div className="card-3d bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200/50">
                      <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-green-600" />
                        Students
                      </h4>
                      <p className="text-xl font-bold text-green-600">
                        {getFilteredMarks().reduce((acc, mark) => {
                          if (!acc.includes(mark.studentId)) acc.push(mark.studentId);
                          return acc;
                        }, [] as string[]).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Total enrolled</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Pending Homework - Only for Students */}
            {isStudent && (
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-500" />
                <CardHeader className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-foreground p-4 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-30">⚡</div>
                  <CardTitle className="text-base sm:text-lg font-bold flex items-center">
                    <Zap className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-blue-600" />
                    Pending Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {homework.length === 0 ? (
                    <div className="text-center py-6">
                      <div className="card-3d bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-full mx-auto mb-3 shadow-lg p-4">
                        <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto" />
                      </div>
                      <h3 className="font-bold text-base mb-1">All caught up!</h3>
                      <p className="text-sm text-muted-foreground">No pending homework</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {homework.slice(0, 3).map((hw) => (
                        <div key={hw.id} className="card-3d glass-effect rounded-xl p-3 border border-white/20">
                          <div className="flex items-start gap-3">
                            <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0 animate-pulse"></div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{hw.title}</p>
                              <p className="text-xs text-muted-foreground">{hw.subject}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <Clock className="h-3 w-3 text-orange-500" />
                                <span className="text-xs text-orange-600">
                                  Due {format(new Date(hw.dueDate), 'MMM d')}
                                </span>
                              </div>
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

            {/* Upcoming Events */}
            <Card className="card-3d glass-effect border-white/20 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-purple-400 to-pink-500" />
              <CardHeader className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-foreground p-4 sm:p-6 relative">
                <div className="absolute top-2 right-2 text-2xl opacity-30 float">🎊</div>
                <CardTitle className="text-base sm:text-lg font-bold flex items-center">
                  <Sparkles className="h-4 sm:h-5 w-4 sm:w-5 mr-2 text-purple-600" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {upcomingEvents.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="card-3d bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mx-auto mb-3 shadow-lg p-4">
                      <Calendar className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto" />
                    </div>
                    <h3 className="font-bold text-base mb-1">No events scheduled</h3>
                    <p className="text-sm text-muted-foreground">Check back later for updates</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div key={event.id} className="card-3d bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-3 border border-purple-200/50">
                        <h4 className="font-medium text-sm truncate">{event.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(event.date), 'MMM d')} at {event.time}
                        </p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
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
