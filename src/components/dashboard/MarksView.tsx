import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '@/components/ui/chart';
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject, Mark } from '@/models/types';
import { format } from 'date-fns';
import { Trophy, TrendingUp, Award, Star, Target, BarChart3, Calendar, CheckCircle, Clock, FileText, Zap, Brain, Sparkles, Rocket, Heart, ArrowRight, PlayCircle, ChevronRight, GraduationCap, BookOpen, PieChart as PieChartIcon, Filter } from 'lucide-react';

const MarksView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMarks, addMark, getStudentsForClass } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState<Subject>(
    (currentUser?.role === 'teacher' && currentUser?.subject) 
      ? currentUser.subject 
      : Subject.MATHEMATICS
  );
  const [score, setScore] = useState('');
  const [totalScore, setTotalScore] = useState('100');
  const [testName, setTestName] = useState('');
  const [activeTab, setActiveTab] = useState<Subject | 'all'>(
    (currentUser?.role === 'teacher' && currentUser?.subject) 
      ? currentUser.subject 
      : 'all'
  );
  const [selectedChartSubject, setSelectedChartSubject] = useState<Subject | 'all'>('all');
  
  const isTeacher = currentUser?.role === 'teacher';
  const marks = getFilteredMarks();
  const students = getStudentsForClass(currentUser?.class || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !testName || !score) return;
    
    if (isTeacher && currentUser?.subject) {
      addMark({
        studentId,
        subject: currentUser.subject,
        score: Number(score),
        totalScore: Number(totalScore),
        testName
      });
    } else {
      addMark({
        studentId,
        subject,
        score: Number(score),
        totalScore: Number(totalScore),
        testName
      });
    }
    
    setStudentId('');
    setTestName('');
    setScore('');
    setTotalScore('100');
    setDialogOpen(false);
  };

  const getFilteredMarksBySubject = () => {
    if (activeTab === 'all') return marks;
    return marks.filter(mark => mark.subject === activeTab);
  };

  const calculateAverage = (subj: Subject) => {
    const subjectMarks = marks.filter(mark => mark.subject === subj);
    if (subjectMarks.length === 0) return 'N/A';
    
    const total = subjectMarks.reduce((acc, mark) => acc + (mark.score / mark.totalScore) * 100, 0);
    return `${(total / subjectMarks.length).toFixed(1)}%`;
  };

  const getPerformanceColor = (percentage: string) => {
    if (percentage === 'N/A') return 'from-gray-400 to-gray-500';
    const num = parseInt(percentage);
    if (num >= 90) return 'from-emerald-500 to-green-600';
    if (num >= 80) return 'from-blue-500 to-indigo-600';
    if (num >= 70) return 'from-yellow-500 to-orange-500';
    if (num >= 60) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-pink-600';
  };

  const getPerformanceIcon = (percentage: string) => {
    if (percentage === 'N/A') return Clock;
    const num = parseInt(percentage);
    if (num >= 90) return Trophy;
    if (num >= 80) return Award;
    if (num >= 70) return Star;
    if (num >= 60) return Target;
    return TrendingUp;
  };

  const subjectList = Object.values(Subject);

  // Chart data preparation
  const getChartData = () => {
    const filteredMarks = selectedChartSubject === 'all' 
      ? marks 
      : marks.filter(mark => mark.subject === selectedChartSubject);

    // For bar chart - average by subject
    const subjectAverages = subjectList.map(subj => {
      const subjMarks = marks.filter(mark => mark.subject === subj);
      const average = subjMarks.length > 0 
        ? subjMarks.reduce((acc, mark) => acc + (mark.score / mark.totalScore) * 100, 0) / subjMarks.length
        : 0;
      return {
        subject: subj.substring(0, 8),
        average: parseFloat(average.toFixed(1)),
        color: subj === Subject.MATHEMATICS ? '#3b82f6' :
               subj === Subject.SCIENCE ? '#10b981' :
               subj === Subject.ENGLISH ? '#f59e0b' :
               subj === Subject.SOCIAL_SCIENCE ? '#ef4444' :
               subj === Subject.HINDI ? '#8b5cf6' :
               subj === Subject.COMPUTER ? '#6b7280' : '#6b7280'
      };
    }).filter(item => item.average > 0);

    // For line chart - performance trend
    const trendData = filteredMarks
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
      .map((mark, index) => ({
        test: index + 1,
        percentage: parseFloat(((mark.score / mark.totalScore) * 100).toFixed(1)),
        testName: mark.testName.substring(0, 10)
      }));

    // For pie chart - grade distribution
    const gradeDistribution = filteredMarks.reduce((acc, mark) => {
      const percentage = (mark.score / mark.totalScore) * 100;
      const grade = percentage >= 90 ? 'A' :
                    percentage >= 80 ? 'B' :
                    percentage >= 70 ? 'C' :
                    percentage >= 60 ? 'D' : 'F';
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(gradeDistribution).map(([grade, count]) => ({
      grade,
      count,
      color: grade === 'A' ? '#10b981' :
             grade === 'B' ? '#3b82f6' :
             grade === 'C' ? '#f59e0b' :
             grade === 'D' ? '#f97316' : '#ef4444'
    }));

    return { subjectAverages, trendData, pieData };
  };

  const chartConfig = {
    average: {
      label: "Average",
      color: "hsl(var(--chart-1))",
    },
    percentage: {
      label: "Percentage",
      color: "hsl(var(--chart-2))",
    },
  };

  const { subjectAverages, trendData, pieData } = getChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-2 sm:p-4 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
              <div className="text-white">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30">
                    <GraduationCap className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1">Academic Performance</h1>
                    <p className="text-indigo-100 text-xs sm:text-sm md:text-lg">
                      {isTeacher 
                        ? `Track student progress in ${currentUser?.subject}`
                        : "Monitor your academic journey with detailed analytics"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 text-xs">
                    <Brain className="h-3 w-3 mr-1" />
                    {isTeacher ? "Teacher" : "Student"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 text-xs">
                    Class {currentUser?.class}
                  </Badge>
                  {currentUser?.role === 'teacher' && currentUser?.subject && (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-2 py-1 text-xs">
                      {currentUser.subject}
                    </Badge>
                  )}
                </div>
              </div>
              
              {isTeacher && (
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-lg text-sm sm:text-base">
                      <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Add Mark
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Add New Mark</DialogTitle>
                      <DialogDescription>
                        Enter the details for the student's performance
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="student">Student</Label>
                          <Select value={studentId} onValueChange={setStudentId} required>
                            <SelectTrigger id="student" className="rounded-xl">
                              <SelectValue placeholder="Select Student" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          {currentUser?.subject ? (
                            <Input 
                              id="subject" 
                              value={currentUser.subject} 
                              disabled 
                              className="rounded-xl"
                            />
                          ) : (
                            <Select value={subject} onValueChange={(val) => setSubject(val as Subject)} required>
                              <SelectTrigger id="subject" className="rounded-xl">
                                <SelectValue placeholder="Select Subject" />
                              </SelectTrigger>
                              <SelectContent>
                                {subjectList.map((subj) => (
                                  <SelectItem key={subj} value={subj}>
                                    {subj}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="test-name">Test Name</Label>
                          <Input 
                            id="test-name"
                            value={testName}
                            onChange={(e) => setTestName(e.target.value)}
                            placeholder="e.g., Midterm Exam"
                            required
                            className="rounded-xl"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="score">Score</Label>
                            <Input 
                              id="score"
                              type="number"
                              min="0"
                              value={score}
                              onChange={(e) => setScore(e.target.value)}
                              required
                              className="rounded-xl"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="total-score">Total Score</Label>
                            <Input 
                              id="total-score"
                              type="number"
                              min="1"
                              value={totalScore}
                              onChange={(e) => setTotalScore(e.target.value)}
                              required
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="rounded-xl">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl">
                          <Star className="mr-2 h-4 w-4" />
                          Add Mark
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>
        </div>

        {/* Performance Overview for Students */}
        {!isTeacher && marks.length > 0 && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 flex items-center">
              <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-600" />
              Subject Performance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4">
              {subjectList.map((subj) => {
                const average = calculateAverage(subj);
                const IconComponent = getPerformanceIcon(average);
                
                return (
                  <Card key={subj} className="relative overflow-hidden border-0 shadow-lg rounded-xl sm:rounded-2xl hover:shadow-xl transition-all duration-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getPerformanceColor(average)} opacity-10`}></div>
                    <CardHeader className="pb-1 sm:pb-2 p-3 sm:p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xs sm:text-sm font-bold truncate">{subj}</CardTitle>
                        <div className={`h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br ${getPerformanceColor(average)} flex items-center justify-center shadow-md`}>
                          <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-lg sm:text-2xl font-bold mb-1">{average}</div>
                      <div className="text-xs text-muted-foreground">Average</div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Charts Section */}
        {marks.length > 0 && (
          <div className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold flex items-center">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-indigo-600" />
                Performance Analytics
              </h2>
              <div className="flex items-center gap-2">
                <Filter className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
                <Select value={selectedChartSubject} onValueChange={(value) => setSelectedChartSubject(value as Subject | 'all')}>
                  <SelectTrigger className="w-full sm:w-48 rounded-xl text-sm">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjectList.map((subj) => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Subject Averages Bar Chart */}
              <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                    Subject Averages
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Compare performance across subjects
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={subjectAverages} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="subject" 
                          tick={{ fontSize: 10 }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="average" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Performance Trend Line Chart */}
              <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                    <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Performance Trend
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Track progress over time
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-2 sm:p-6">
                  <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trendData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="test" tick={{ fontSize: 10 }} />
                        <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="percentage" 
                          stroke="#10b981" 
                          strokeWidth={2}
                          dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              {/* Grade Distribution Pie Chart */}
              {pieData.length > 0 && (
                <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl lg:col-span-2">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
                      <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                      Grade Distribution
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      Breakdown of grades achieved
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 sm:p-6">
                    <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-8">
                      <div className="flex-1 w-full">
                        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius="80%"
                                fill="#8884d8"
                                dataKey="count"
                                label={({ grade, count }) => `${grade}: ${count}`}
                                labelLine={false}
                                fontSize={10}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <ChartTooltip content={<ChartTooltipContent />} />
                            </PieChart>
                          </ResponsiveContainer>
                        </ChartContainer>
                      </div>
                      <div className="flex flex-wrap gap-2 lg:flex-col justify-center lg:justify-start">
                        {pieData.map((entry) => (
                          <div key={entry.grade} className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full" 
                              style={{ backgroundColor: entry.color }}
                            ></div>
                            <span className="text-xs sm:text-sm font-medium">
                              Grade {entry.grade}: {entry.count} tests
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {marks.length === 0 ? (
          <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="h-16 w-16 sm:h-24 sm:w-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg mb-4 sm:mb-6">
                <BookOpen className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                No marks recorded yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-base">
                {isTeacher 
                  ? "Start tracking student performance by adding their first marks."
                  : "Your academic journey starts here. Marks will appear as teachers add them."
                }
              </p>
              
              {isTeacher && (
                <Button 
                  className="mt-4 sm:mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base"
                  onClick={() => setDialogOpen(true)}
                >
                  <Star className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Add First Mark
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-xl rounded-2xl sm:rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-t-2xl sm:rounded-t-3xl">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                <CardTitle className="text-lg sm:text-xl font-bold">
                  {isTeacher ? "Student Records" : "Your Records"}
                </CardTitle>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Subject | 'all')}>
                  <TabsList className="bg-white/20 border-white/30">
                    <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 text-xs sm:text-sm">All</TabsTrigger>
                    {subjectList.slice(0, 3).map(subj => (
                      <TabsTrigger 
                        key={subj} 
                        value={subj} 
                        disabled={isTeacher && currentUser?.subject && currentUser.subject !== subj}
                        className="text-white data-[state=active]:bg-white data-[state=active]:text-indigo-600 text-xs sm:text-sm hidden sm:inline-flex"
                      >
                        {subj.substring(0, 4)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50 dark:bg-gray-800/50">
                      <TableHead className="font-bold text-xs sm:text-sm">{isTeacher ? "Student" : "Subject"}</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm">{isTeacher ? "Subject" : "Test"}</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm">Score</TableHead>
                      <TableHead className="font-bold text-xs sm:text-sm">Performance</TableHead>
                      <TableHead className="hidden md:table-cell font-bold text-xs sm:text-sm">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredMarksBySubject().map((mark) => {
                      const studentName = isTeacher 
                        ? students.find(s => s.id === mark.studentId)?.name || "Unknown"
                        : "";
                        
                      const percentage = ((mark.score / mark.totalScore) * 100).toFixed(1);
                      const performanceColor = getPerformanceColor(`${percentage}%`);
                      
                      return (
                        <TableRow key={mark.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <TableCell className="font-medium text-xs sm:text-sm p-2 sm:p-4">
                            {isTeacher ? studentName : mark.subject}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm p-2 sm:p-4">
                            {isTeacher ? mark.subject : mark.testName}
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <Badge variant="outline" className="font-bold text-xs">
                              {mark.score}/{mark.totalScore}
                            </Badge>
                          </TableCell>
                          <TableCell className="p-2 sm:p-4">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <span className={`text-xs sm:text-sm font-bold ${
                                Number(percentage) >= 90 ? 'text-emerald-600' :
                                Number(percentage) >= 80 ? 'text-blue-600' :
                                Number(percentage) >= 70 ? 'text-yellow-600' :
                                Number(percentage) >= 60 ? 'text-orange-600' : 'text-red-600'
                              }`}>
                                {percentage}%
                              </span>
                              <div className="w-12 sm:w-16 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${performanceColor} rounded-full`} 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground text-xs sm:text-sm p-2 sm:p-4">
                            {format(new Date(mark.timestamp), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarksView;
