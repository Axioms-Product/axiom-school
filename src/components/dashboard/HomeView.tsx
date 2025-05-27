
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  GraduationCap,
  Activity,
  Brain,
  Trophy,
  Sparkles,
  Rocket,
  Heart,
  ArrowRight,
  PlayCircle,
  ChevronRight
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
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

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

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅";
    if (hour < 18) return "☀️";
    return "🌙";
  };

  const motivationalQuotes = [
    "Education is the most powerful weapon which you can use to change the world.",
    "The beautiful thing about learning is nobody can take it away from you.",
    "Education is not preparation for life; education is life itself.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Your potential is endless. Go do what you were created to do."
  ];

  // Rotate quotes every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % motivationalQuotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="space-y-6 p-4">
        {/* Enhanced Hero Section with Interactive Elements */}
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"60\" cy=\"12\" r=\"4\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 animate-bounce">
            <Sparkles className="h-6 w-6 text-yellow-300 opacity-70" />
          </div>
          <div className="absolute bottom-4 left-4 animate-pulse">
            <Rocket className="h-5 w-5 text-blue-200 opacity-60" />
          </div>
          
          <div className="relative px-6 py-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-16 w-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30">
                      <span className="text-2xl font-bold">{currentUser?.name?.charAt(0)}</span>
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 leading-tight">
                        {getGreeting()}, {currentUser?.name}! {getGreetingEmoji()}
                      </h1>
                      <p className="text-blue-100 text-sm flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date().toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 text-xs hover:bg-white/30 transition-colors">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {currentUser?.role === 'teacher' ? 'Teacher' : 'Student'}
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 text-xs hover:bg-white/30 transition-colors">
                      Class {currentUser?.class}
                    </Badge>
                    {currentUser?.role === 'teacher' && currentUser?.subject && (
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1 text-xs hover:bg-white/30 transition-colors">
                        {currentUser.subject}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <blockquote className="text-blue-100 italic text-lg max-w-2xl leading-relaxed transition-opacity duration-500">
                      <span className="text-xl text-yellow-300">&quot;</span>
                      {motivationalQuotes[currentQuoteIndex]}
                      <span className="text-xl text-yellow-300">&quot;</span>
                    </blockquote>
                    <div className="flex gap-1 mt-3">
                      {motivationalQuotes.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                            index === currentQuoteIndex ? 'bg-yellow-300 w-6' : 'bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Link to="/dashboard/homework">
                      <Button className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group">
                        <PlayCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Start Learning
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link to="/dashboard/marks">
                      <Button variant="outline" className="bg-white/10 text-white border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                        <Trophy className="h-4 w-4 mr-2" />
                        View Progress
                      </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0 lg:ml-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">{stats.completedTasks}</div>
                      <div className="text-blue-100 text-xs font-medium">Tasks Completed</div>
                      <CheckCircle className="h-4 w-4 mx-auto mt-1 text-green-300" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-white mb-1 group-hover:scale-110 transition-transform">{stats.upcomingEvents}</div>
                      <div className="text-blue-100 text-xs font-medium">Events This Week</div>
                      <Calendar className="h-4 w-4 mx-auto mt-1 text-orange-300" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compact Stats Grid with Enhanced Design */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Homework</p>
                  <p className="text-lg font-bold text-blue-900 dark:text-blue-100">{stats.homeworks}</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Notices</p>
                  <p className="text-lg font-bold text-purple-900 dark:text-purple-100">{stats.notices}</p>
                </div>
                <div className="h-8 w-8 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-green-700 dark:text-green-300 mb-1">Events</p>
                  <p className="text-lg font-bold text-green-900 dark:text-green-100">{stats.events}</p>
                </div>
                <div className="h-8 w-8 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">Messages</p>
                  <p className="text-lg font-bold text-amber-900 dark:text-amber-100">{stats.unreadMessages}</p>
                </div>
                <div className="h-8 w-8 bg-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-indigo-700 dark:text-indigo-300 mb-1">Exams</p>
                  <p className="text-lg font-bold text-indigo-900 dark:text-indigo-100">{stats.exams}</p>
                </div>
                <div className="h-8 w-8 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-0 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 cursor-pointer">
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-rose-700 dark:text-rose-300 mb-1">Tasks</p>
                  <p className="text-lg font-bold text-rose-900 dark:text-rose-100">{stats.completedTasks}</p>
                </div>
                <div className="h-8 w-8 bg-rose-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Progress Overview */}
          <Card className="lg:col-span-2 border-0 shadow-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                Progress Overview
                <Badge className="ml-auto bg-emerald-100 text-emerald-700">Live</Badge>
              </CardTitle>
              <CardDescription>Track your academic journey and achievements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center group">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <BookIcon className="h-6 w-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Active Homework</h3>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stats.homeworks}</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(stats.homeworks * 10, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <CheckCircle className="h-6 w-6 text-green-700 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Completed Tasks</h3>
                  <div className="text-2xl font-bold text-green-600 mb-1">{stats.completedTasks}</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ 
                        width: `${stats.homeworks > 0 ? Math.min((stats.completedTasks / stats.homeworks) * 100, 100) : 0}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center group">
                  <div className="h-12 w-12 mx-auto mb-2 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Clock className="h-6 w-6 text-amber-700 dark:text-amber-400" />
                  </div>
                  <h3 className="font-semibold mb-1">Upcoming Events</h3>
                  <div className="text-2xl font-bold text-amber-600 mb-1">{stats.upcomingEvents}</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-amber-600 h-1.5 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(stats.upcomingEvents * 15, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <Link to="/dashboard/events" className="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2 group">
                  View detailed progress
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Performance or Role Info */}
          {currentUser?.role === 'student' && subjectPerformance.length > 0 ? (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="h-8 w-8 rounded-xl bg-violet-500 flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-5 w-5 text-white" />
                  </div>
                  Performance
                </CardTitle>
                <CardDescription>Your academic progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {subjectPerformance.slice(0, 3).map((subject, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <div className="h-8 w-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="h-4 w-4 text-indigo-700 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium text-sm">{subject.subject}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          <span className="text-sm font-bold">{subject.average}/10</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full transition-all duration-1000 ${
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
                
                <div className="pt-3 border-t">
                  <Link to="/dashboard/marks" className="text-violet-600 dark:text-violet-400 hover:underline text-sm font-medium flex items-center gap-2 group">
                    View all subjects
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-0 shadow-xl bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="h-8 w-8 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  Your Role
                </CardTitle>
                <CardDescription>
                  {currentUser?.role === 'teacher' 
                    ? `Teaching Class ${currentUser?.class}`
                    : `Learning in Class ${currentUser?.class}`
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-white/50 dark:bg-white/10 rounded-xl hover:bg-white/70 transition-colors">
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                      {currentUser?.role === 'teacher' ? stats.homeworks : stats.completedTasks}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400">
                      {currentUser?.role === 'teacher' ? 'Assignments' : 'Completed'}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/50 dark:bg-white/10 rounded-xl hover:bg-white/70 transition-colors">
                    <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                      {currentUser?.class}
                    </div>
                    <div className="text-xs text-emerald-600 dark:text-emerald-400">Class</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm">Key Focus</h3>
                  <div className="space-y-2">
                    {currentUser?.role === 'teacher' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-xs">Student progress tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-xs">Assignment management</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-xs">Complete assignments</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-xs">Improve performance</span>
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
        <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="h-8 w-8 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              Quick Actions
              <Badge className="ml-auto bg-orange-100 text-orange-700">Interactive</Badge>
            </CardTitle>
            <CardDescription>Access your most used features instantly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <Link to="/dashboard/homework" className="block group">
                <div className="h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <BookOpen className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Homework</span>
                </div>
              </Link>
              
              <Link to="/dashboard/notices" className="block group">
                <div className="h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <Bell className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Notices</span>
                </div>
              </Link>
              
              <Link to="/dashboard/events" className="block group">
                <div className="h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <Calendar className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Events</span>
                </div>
              </Link>
              
              <Link to="/dashboard/messages" className="block group">
                <div className="h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <MessageCircle className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Messages</span>
                </div>
              </Link>
              
              <Link to="/dashboard/marks" className="block group">
                <div className="h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <Target className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Marks</span>
                </div>
              </Link>
              
              <Link to="/dashboard/exams" className="block group">
                <div className="h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex flex-col items-center justify-center text-white hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg">
                  <FileText className="h-5 w-5 mb-1 group-hover:animate-bounce" />
                  <span className="text-xs font-medium">Exams</span>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Footer */}
        <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Brain className="h-6 w-6 animate-pulse" />
              <h3 className="text-xl font-bold">Keep Learning, Keep Growing!</h3>
              <Trophy className="h-6 w-6 animate-pulse" />
            </div>
            <p className="text-blue-100 max-w-xl mx-auto mb-3 text-sm">
              Every day is a new opportunity to learn something new and achieve your goals. 
              Stay focused, stay motivated, and remember that success is a journey, not a destination.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Heart className="h-4 w-4 text-red-300 animate-pulse" />
              <span className="text-xs">Made with love for your education</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
