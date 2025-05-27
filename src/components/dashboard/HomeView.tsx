
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  BookOpen, 
  Bell, 
  Calendar, 
  MessageCircle,
  BookIcon, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  Award,
  Zap,
  Target,
  BarChart3,
  Star,
  Users,
  GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredHomeworks, 
    getFilteredNotices, 
    getFilteredEvents, 
    getFilteredMessages,
    getFilteredMarks,
    getFilteredExamSchedules
  } = useData();
  const [stats, setStats] = useState({
    homeworks: 0,
    notices: 0,
    events: 0,
    unreadMessages: 0,
    completedTasks: 0,
    upcomingEvents: 0,
    exams: 0
  });
  const [subjectPerformance, setSubjectPerformance] = useState<{subject: string, average: number}[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const homeworks = getFilteredHomeworks();
    const notices = getFilteredNotices();
    const events = getFilteredEvents();
    const messages = getFilteredMessages();
    const marks = getFilteredMarks();
    const exams = getFilteredExamSchedules();
    
    // Calculate unread messages
    const unreadMessages = messages.filter(msg => 
      msg.receiverId === currentUser?.id && !msg.read
    ).length;
    
    // Calculate upcoming events (events in the next 7 days)
    const now = new Date().getTime();
    const oneWeekFromNow = now + 7 * 24 * 60 * 60 * 1000;
    const upcomingEvents = events.filter(event => {
      const eventDate = new Date(event.date).getTime();
      return eventDate > now && eventDate < oneWeekFromNow;
    }).length;
    
    // Calculate completed tasks (for students only)
    let completedTasks = 0;
    if (currentUser?.role === 'student') {
      completedTasks = homeworks.filter(hw => 
        hw.completedBy?.includes(currentUser.id)
      ).length;
    }
    
    // Calculate subject performance for students
    if (currentUser?.role === 'student' && marks.length > 0) {
      const subjectGroups: Record<string, number[]> = {};
      marks.forEach(mark => {
        if (!subjectGroups[mark.subject]) {
          subjectGroups[mark.subject] = [];
        }
        subjectGroups[mark.subject].push(mark.score);
      });
      
      const subjectAverages = Object.entries(subjectGroups).map(([subject, scores]) => {
        const sum = scores.reduce((acc, score) => acc + score, 0);
        return {
          subject,
          average: Math.round((sum / scores.length) * 10) / 10
        };
      });
      
      setSubjectPerformance(subjectAverages);
    }
    
    setStats({
      homeworks: homeworks.length,
      notices: notices.length,
      events: events.length,
      unreadMessages,
      completedTasks,
      upcomingEvents,
      exams: exams.length
    });
    
    setLoading(false);
  }, [currentUser, getFilteredHomeworks, getFilteredNotices, getFilteredEvents, getFilteredMessages, getFilteredMarks, getFilteredExamSchedules]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getMotivationalQuote = () => {
    const quotes = [
      "Education is the most powerful weapon which you can use to change the world.",
      "The beautiful thing about learning is nobody can take it away from you.",
      "Education is not preparation for life; education is life itself.",
      "Success is not final, failure is not fatal: it is the courage to continue that counts."
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gradient-to-r from-blue-100 to-purple-100 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded"></div>
              <div className="h-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Section with Greeting */}
      <div className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 opacity-95"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='12' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="relative px-6 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl font-bold">{currentUser?.name?.charAt(0)}</span>
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                    {getGreeting()}, {currentUser?.name}!
                  </h1>
                  <p className="text-blue-100 text-lg">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {currentUser?.role === 'teacher' ? 'Teacher' : 'Student'}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                  Class {currentUser?.class}
                </Badge>
                {currentUser?.role === 'teacher' && currentUser?.subject && (
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
              
              <blockquote className="text-blue-100 italic text-lg max-w-2xl">
                "{getMotivationalQuote()}"
              </blockquote>
            </div>
            
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{stats.completedTasks}</div>
                  <div className="text-blue-100 text-sm">Tasks Done</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-white">{stats.upcomingEvents}</div>
                  <div className="text-blue-100 text-sm">Events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Homework</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.homeworks}</p>
              </div>
              <div className="h-12 w-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Notices</p>
                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.notices}</p>
              </div>
              <div className="h-12 w-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Bell className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700 dark:text-green-300">Events</p>
                <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.events}</p>
              </div>
              <div className="h-12 w-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-amber-700 dark:text-amber-300">Messages</p>
                <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">{stats.unreadMessages}</p>
              </div>
              <div className="h-12 w-12 bg-amber-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Exams</p>
                <p className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">{stats.exams}</p>
              </div>
              <div className="h-12 w-12 bg-indigo-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enhanced Activity Progress */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-xl">
              <TrendingUp className="h-6 w-6 text-emerald-600" />
              Progress Overview
            </CardTitle>
            <CardDescription>Track your academic journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <BookIcon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Active Homework</h3>
                    <span className="text-sm font-bold text-blue-600">{stats.homeworks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(stats.homeworks * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Completed Tasks</h3>
                    <span className="text-sm font-bold text-green-600">{stats.completedTasks}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${stats.homeworks > 0 ? Math.min((stats.completedTasks / stats.homeworks) * 100, 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-700 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold">Upcoming Events</h3>
                    <span className="text-sm font-bold text-amber-600">{stats.upcomingEvents}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-3 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min(stats.upcomingEvents * 15, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <Link to="/dashboard/events" className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                View detailed progress →
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Enhanced Performance or Role Info */}
        {currentUser?.role === 'student' && subjectPerformance.length > 0 ? (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <BarChart3 className="h-6 w-6 text-violet-600" />
                Academic Performance
              </CardTitle>
              <CardDescription>Your subject-wise progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectPerformance.map((subject, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-indigo-700 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{subject.subject}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-bold">{subject.average}/10</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          subject.average >= 8 ? 'bg-gradient-to-r from-green-500 to-green-600' : 
                          subject.average >= 6 ? 'bg-gradient-to-r from-amber-500 to-amber-600' : 
                          'bg-gradient-to-r from-red-500 to-red-600'
                        }`} 
                        style={{ width: `${subject.average * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Link to="/dashboard/marks" className="text-violet-600 dark:text-violet-400 hover:underline text-sm font-medium">
                  View detailed marks →
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-6 w-6 text-emerald-600" />
                Your Role: {currentUser?.role === 'teacher' ? 'Teacher' : 'Student'}
              </CardTitle>
              <CardDescription>
                {currentUser?.role === 'teacher' 
                  ? `Managing Class ${currentUser?.class} • ${currentUser?.subject || 'Multiple Subjects'}`
                  : `Student in Class ${currentUser?.class} • Session 2025-2026`
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {currentUser?.role === 'teacher' ? stats.homeworks : stats.completedTasks}
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">
                    {currentUser?.role === 'teacher' ? 'Assignments' : 'Completed'}
                  </div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-white/10 rounded-xl">
                  <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">
                    {currentUser?.class}
                  </div>
                  <div className="text-sm text-emerald-600 dark:text-emerald-400">Class</div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Key Responsibilities</h3>
                <div className="space-y-2">
                  {currentUser?.role === 'teacher' ? (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Create and manage assignments</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Track student progress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Communicate with students</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Complete assignments on time</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Participate in class activities</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                        <span className="text-sm">Stay updated with notices</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Zap className="h-6 w-6 text-orange-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Access your most used features instantly</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link to="/dashboard/homework" className="block group">
              <div className="h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <BookOpen className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Homework</span>
              </div>
            </Link>
            
            <Link to="/dashboard/notices" className="block group">
              <div className="h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <Bell className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Notices</span>
              </div>
            </Link>
            
            <Link to="/dashboard/events" className="block group">
              <div className="h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <Calendar className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Events</span>
              </div>
            </Link>
            
            <Link to="/dashboard/messages" className="block group">
              <div className="h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <MessageCircle className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Messages</span>
              </div>
            </Link>
            
            <Link to="/dashboard/marks" className="block group">
              <div className="h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <Target className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Marks</span>
              </div>
            </Link>
            
            <Link to="/dashboard/exams" className="block group">
              <div className="h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-lg group-hover:shadow-xl">
                <FileText className="h-8 w-8 mb-1" />
                <span className="text-sm font-medium">Exams</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeView;
