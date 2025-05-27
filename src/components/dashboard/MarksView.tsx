
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
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject, Mark } from '@/models/types';
import { format } from 'date-fns';
import { Trophy, TrendingUp, Award, Star, Target, BarChart3, Calendar, CheckCircle, Clock, FileText, Zap, Brain, Sparkles, Rocket, Heart, ArrowRight, PlayCircle, ChevronRight } from 'lucide-react';

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
  
  const isTeacher = currentUser?.role === 'teacher';
  const marks = getFilteredMarks();
  const students = getStudentsForClass(currentUser?.class || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !testName || !score) return;
    
    // Only allow teachers to add marks for their assigned subject
    if (isTeacher && currentUser?.subject) {
      // Force the subject to be the teacher's assigned subject
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
    
    // Reset form
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
    if (percentage === 'N/A') return 'from-gray-300 to-gray-400';
    const num = parseInt(percentage);
    if (num >= 85) return 'from-emerald-500 to-green-600';
    if (num >= 70) return 'from-blue-500 to-indigo-600';
    if (num >= 50) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const getPerformanceIcon = (percentage: string) => {
    if (percentage === 'N/A') return Clock;
    const num = parseInt(percentage);
    if (num >= 85) return Trophy;
    if (num >= 70) return Award;
    if (num >= 50) return Target;
    return TrendingUp;
  };

  const subjectList = Object.values(Subject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 rounded-3xl"></div>
          
          <div className="relative px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Academic Performance</h1>
                    <p className="text-violet-100 text-lg">
                      {isTeacher 
                        ? `Track student progress in ${currentUser?.subject}`
                        : "Monitor your academic journey"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <Brain className="h-4 w-4 mr-2" />
                    {isTeacher ? "Teacher Dashboard" : "Student Performance"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    Class {currentUser?.class}
                  </Badge>
                  {currentUser?.role === 'teacher' && currentUser?.subject && (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                      {currentUser.subject}
                    </Badge>
                  )}
                </div>
              </div>
              
              {isTeacher && (
                <div className="mt-8 lg:mt-0">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-8 py-6 text-lg rounded-2xl shadow-lg">
                        <Star className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Add New Mark
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Add New Mark</DialogTitle>
                        <DialogDescription className="text-lg">
                          Enter the details for the student's performance
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-6 py-6">
                          <div className="space-y-2">
                            <Label htmlFor="student" className="text-base font-medium">Student</Label>
                            <Select
                              value={studentId}
                              onValueChange={setStudentId}
                              required
                            >
                              <SelectTrigger id="student" className="rounded-xl border-2">
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
                            <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                            {currentUser?.subject ? (
                              <Input 
                                id="subject" 
                                value={currentUser.subject} 
                                disabled 
                                className="rounded-xl border-2"
                              />
                            ) : (
                              <Select
                                value={subject}
                                onValueChange={(val) => setSubject(val as Subject)}
                                required
                              >
                                <SelectTrigger id="subject" className="rounded-xl border-2">
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
                            <Label htmlFor="test-name" className="text-base font-medium">Test Name</Label>
                            <Input 
                              id="test-name"
                              value={testName}
                              onChange={(e) => setTestName(e.target.value)}
                              placeholder="e.g., Midterm Exam"
                              required
                              className="rounded-xl border-2"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="score" className="text-base font-medium">Score</Label>
                              <Input 
                                id="score"
                                type="number"
                                min="0"
                                value={score}
                                onChange={(e) => setScore(e.target.value)}
                                required
                                className="rounded-xl border-2"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="total-score" className="text-base font-medium">Total Score</Label>
                              <Input 
                                id="total-score"
                                type="number"
                                min="1"
                                value={totalScore}
                                onChange={(e) => setTotalScore(e.target.value)}
                                required
                                className="rounded-xl border-2"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-xl px-6">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit" className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl px-8">
                            <Star className="mr-2 h-4 w-4" />
                            Add Mark
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subject Performance Cards for Students */}
        {!isTeacher && marks.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-3 text-violet-600" />
              Subject Performance Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {subjectList.map((subj) => {
                const average = calculateAverage(subj);
                const IconComponent = getPerformanceIcon(average);
                
                return (
                  <Card key={subj} className="relative overflow-hidden border-0 shadow-xl rounded-2xl group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                    <div className={`absolute inset-0 bg-gradient-to-br ${getPerformanceColor(average)} opacity-10`}></div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base font-bold truncate">{subj}</CardTitle>
                        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${getPerformanceColor(average)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold mb-2">{average}</div>
                      <div className="text-sm text-muted-foreground">Overall Average</div>
                    </CardContent>
                    <div className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${getPerformanceColor(average)}`}></div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {marks.length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-32 w-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <Trophy className="h-16 w-16 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-12 w-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  No marks recorded yet
                </h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Start tracking student performance by adding their first marks and assessments."
                    : "Your academic journey starts here. Marks will appear as teachers add them."
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl px-8 py-6 text-lg shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Star className="mr-3 h-6 w-6" />
                    Add First Mark
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold">
                  {isTeacher ? "Student Performance Records" : "Your Academic Records"}
                </CardTitle>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Subject | 'all')}>
                  <TabsList className="bg-white/20 border-white/30">
                    <TabsTrigger value="all" className="text-white data-[state=active]:bg-white data-[state=active]:text-violet-600">All</TabsTrigger>
                    {subjectList.map(subj => (
                      <TabsTrigger 
                        key={subj} 
                        value={subj} 
                        disabled={isTeacher && currentUser?.subject && currentUser.subject !== subj}
                        className="text-white data-[state=active]:bg-white data-[state=active]:text-violet-600"
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
                      <TableHead className="font-bold">{isTeacher ? "Student" : "Subject"}</TableHead>
                      <TableHead className="font-bold">{isTeacher ? "Subject" : "Test"}</TableHead>
                      <TableHead className="font-bold">Score</TableHead>
                      <TableHead className="font-bold">Performance</TableHead>
                      <TableHead className="hidden md:table-cell font-bold">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredMarksBySubject().map((mark) => {
                      // Find student name if we're a teacher
                      const studentName = isTeacher 
                        ? students.find(s => s.id === mark.studentId)?.name || "Unknown Student"
                        : "";
                        
                      const percentage = ((mark.score / mark.totalScore) * 100).toFixed(1);
                      const performanceColor = getPerformanceColor(`${percentage}%`);
                      
                      return (
                        <TableRow key={mark.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                          <TableCell className="font-medium">
                            {isTeacher ? studentName : mark.subject}
                          </TableCell>
                          <TableCell>
                            {isTeacher ? mark.subject : mark.testName}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="font-bold">
                              {mark.score}/{mark.totalScore}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span className={
                                Number(percentage) >= 85
                                  ? 'text-emerald-600 font-bold'
                                  : Number(percentage) >= 70
                                    ? 'text-blue-600 font-bold'
                                    : Number(percentage) >= 50
                                      ? 'text-yellow-600 font-bold'
                                      : 'text-red-600 font-bold'
                              }>
                                {percentage}%
                              </span>
                              <div className="hidden md:block w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${performanceColor} rounded-full transition-all duration-500`} 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
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
