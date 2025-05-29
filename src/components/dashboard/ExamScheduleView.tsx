import { useState } from 'react';
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { format, formatDistanceToNow } from 'date-fns';
import { GraduationCap, Calendar, Clock, FileText, Sparkles, Plus, ArrowRight, BookOpen, Target, Zap } from 'lucide-react';

const ExamScheduleView = () => {
  const { currentUser } = useAuth();
  const { getFilteredExamSchedules, addExamSchedule } = useData();
  const [subject, setSubject] = useState<Subject | ''>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const exams = getFilteredExamSchedules();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For teachers with assigned subject, use their subject; otherwise use selected subject
    const examSubject = (isTeacher && currentUser?.subject) ? currentUser.subject : subject as Subject;
    
    // Validate that we have all required fields
    if (examSubject && date && time && duration) {
      addExamSchedule({
        subject: examSubject,
        date,
        time,
        duration,
        assignedClass: currentUser?.class || '',
      });
      
      setSubject('');
      setDate('');
      setTime('');
      setDuration('');
      setDialogOpen(false);
    }
  };

  const isUpcoming = (examDate: string) => {
    return new Date(examDate) > new Date();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 rounded-3xl"></div>
          
          <div className="relative px-6 sm:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">Exam Schedule</h1>
                    <p className="text-indigo-100 text-base sm:text-lg">
                      {isTeacher 
                        ? `Schedule exams for ${currentUser?.subject || 'your subject'}`
                        : "Stay prepared with upcoming examinations"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    <BookOpen className="h-4 w-4 mr-2" />
                    {isTeacher ? "Exam Scheduler" : "Student Portal"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    Class {currentUser?.class}
                  </Badge>
                  {currentUser?.role === 'teacher' && currentUser?.subject && (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                      {currentUser.subject}
                    </Badge>
                  )}
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 text-sm">
                    <Target className="h-4 w-4 mr-2" />
                    {exams.length} Exam{exams.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {isTeacher && (
                <div className="mt-8 lg:mt-0">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl shadow-lg">
                        <Plus className="mr-3 h-5 sm:h-6 w-5 sm:w-6 group-hover:scale-110 transition-transform" />
                        Schedule Exam
                        <ArrowRight className="ml-3 h-4 sm:h-5 w-4 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl">Schedule New Exam</DialogTitle>
                        <DialogDescription className="text-base sm:text-lg">
                          Schedule an examination for your assigned subject
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4 sm:space-y-6 py-4 sm:py-6">
                          <div className="space-y-2">
                            <Label htmlFor="subject" className="text-base font-medium">Subject</Label>
                            {currentUser?.subject ? (
                              <Input 
                                id="subject" 
                                value={currentUser.subject} 
                                disabled 
                                className="rounded-xl border-2 bg-gray-50"
                              />
                            ) : (
                              <Select value={subject} onValueChange={(value) => setSubject(value as Subject)}>
                                <SelectTrigger className="rounded-xl border-2 focus:border-indigo-400">
                                  <SelectValue placeholder="Select subject" />
                                </SelectTrigger>
                                <SelectContent>
                                  {Object.values(Subject).map((sub) => (
                                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date" className="text-base font-medium">Exam Date</Label>
                            <Input 
                              id="date"
                              type="date"
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              required
                              className="rounded-xl border-2 focus:border-indigo-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="time" className="text-base font-medium">Exam Time</Label>
                            <Input 
                              id="time"
                              type="time"
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              required
                              className="rounded-xl border-2 focus:border-indigo-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="duration" className="text-base font-medium">Duration (minutes)</Label>
                            <Input 
                              id="duration"
                              type="number"
                              min="30"
                              max="180"
                              value={duration}
                              onChange={(e) => setDuration(e.target.value)}
                              placeholder="e.g., 90"
                              required
                              className="rounded-xl border-2 focus:border-indigo-400"
                            />
                          </div>
                        </div>
                        <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl px-6">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-8"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Schedule Exam
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

        {exams.length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-8 sm:p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-24 sm:h-32 w-24 sm:w-32 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <GraduationCap className="h-12 sm:h-16 w-12 sm:w-16 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  No exams scheduled yet
                </h3>
                <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Schedule examinations to assess student progress and knowledge."
                    : "No examinations have been scheduled yet. Check back for updates!"
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="mr-3 h-5 sm:h-6 w-5 sm:w-6" />
                    Schedule First Exam
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {exams.map((exam) => {
              const upcoming = isUpcoming(exam.date);
              
              return (
                <Card key={exam.id} className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-2 ${
                    upcoming ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    'bg-gradient-to-r from-red-400 to-pink-500'
                  }`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start mb-3">
                      <Badge className={`${
                        exam.subject === Subject.MATHEMATICS ? 'bg-blue-100 text-blue-700' :
                        exam.subject === Subject.SCIENCE ? 'bg-green-100 text-green-700' :
                        exam.subject === Subject.SOCIAL_SCIENCE ? 'bg-yellow-100 text-yellow-700' :
                        exam.subject === Subject.ENGLISH ? 'bg-purple-100 text-purple-700' :
                        exam.subject === Subject.COMPUTER ? 'bg-cyan-100 text-cyan-700' :
                        'bg-gray-100 text-gray-700'
                      } rounded-full px-3 py-1`}>
                        {exam.subject}
                      </Badge>
                      <Badge className={`rounded-full px-3 py-1 ${
                        upcoming ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        <Clock className="h-3 w-3 mr-1" />
                        {upcoming ? 'Upcoming' : 'Completed'}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl mb-2">{exam.subject} Examination</CardTitle>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>{exam.date} at {exam.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>{exam.duration} minutes</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Class {exam.assignedClass}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(exam.date), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t">
                    <div className="flex justify-between w-full text-sm text-muted-foreground">
                      <span className="truncate mr-2">By: {exam.creatorName}</span>
                      <span className="flex-shrink-0">{formatDistanceToNow(new Date(exam.timestamp), { addSuffix: true })}</span>
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamScheduleView;
