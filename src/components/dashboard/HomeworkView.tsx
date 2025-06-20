
import { useState, useMemo } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
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
import { formatDistanceToNow } from 'date-fns';
import { BookOpen, Calendar, CheckCircle, Clock, Plus, Trash2, Users, FileText, AlertCircle, Search } from 'lucide-react';

const HomeworkView = () => {
  const { currentUser } = useAuth();
  const { getFilteredHomeworks, addHomework, deleteHomework, markHomeworkComplete } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<Subject | 'all'>('all');

  const isTeacher = currentUser?.role === 'teacher';
  const allHomeworks = getFilteredHomeworks();

  // Optimized filtering with useMemo
  const filteredHomeworks = useMemo(() => {
    return allHomeworks.filter(homework => {
      const matchesSearch = homework.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           homework.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = filterSubject === 'all' || homework.subject === filterSubject;
      return matchesSearch && matchesSubject;
    });
  }, [allHomeworks, searchTerm, filterSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const homeworkSubject = (isTeacher && currentUser?.subject) 
      ? currentUser.subject 
      : subject as Subject;
    
    if (homeworkSubject) {
      addHomework({
        title,
        description,
        dueDate,
        subject: homeworkSubject,
        assignedClass: currentUser?.class || '',
      });
      
      setTitle('');
      setDescription('');
      setDueDate('');
      setSubject('');
      setDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      deleteHomework(id);
    }
  };

  const handleMarkComplete = (id: string) => {
    markHomeworkComplete(id);
  };

  const isCompleted = (homework: any) => {
    return homework.completedBy?.includes(currentUser?.id);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  const getSubjectColor = (subject: Subject) => {
    const colors = {
      [Subject.MATHEMATICS]: 'bg-blue-50 text-blue-700 border-blue-200',
      [Subject.SCIENCE]: 'bg-green-50 text-green-700 border-green-200',
      [Subject.SOCIAL_SCIENCE]: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      [Subject.ENGLISH]: 'bg-purple-50 text-purple-700 border-purple-200',
      [Subject.COMPUTER]: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      [Subject.HINDI]: 'bg-orange-50 text-orange-700 border-orange-200',
    };
    return colors[subject] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const pendingHomeworks = filteredHomeworks.filter(hw => !isCompleted(hw));
  const completedHomeworks = filteredHomeworks.filter(hw => isCompleted(hw));

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-3 sm:p-4 lg:p-6 space-y-4 sm:space-y-6">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {isTeacher ? 'Manage Assignments' : 'My Homework'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {isTeacher 
                  ? "Create and manage assignments for your students"
                  : "Keep track of your assignments and deadlines"
                }
              </p>
            </div>
            
            {isTeacher && (
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg h-9 px-4 text-sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Assignment
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md mx-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg">Create Assignment</DialogTitle>
                    <DialogDescription className="text-sm">
                      Add a new homework assignment for your class
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-3 py-3">
                      <div className="space-y-1">
                        <Label htmlFor="title" className="text-sm">Assignment Title</Label>
                        <Input 
                          id="title"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="e.g., Chapter 5 Math Problems"
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="subject" className="text-sm">Subject</Label>
                        {currentUser?.subject ? (
                          <Input 
                            id="subject" 
                            value={currentUser.subject} 
                            disabled 
                            className="bg-gray-50 h-9 text-sm"
                          />
                        ) : (
                          <Select value={subject} onValueChange={(value) => setSubject(value as Subject)}>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.values(Subject).map((sub) => (
                                <SelectItem key={sub} value={sub} className="text-sm">{sub}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="description" className="text-sm">Description</Label>
                        <Textarea 
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Assignment details and instructions"
                          rows={3}
                          required
                          className="resize-none text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="dueDate" className="text-sm">Due Date</Label>
                        <Input 
                          id="dueDate"
                          type="datetime-local"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter className="gap-2">
                      <DialogClose asChild>
                        <Button type="button" variant="outline" size="sm" className="h-8 px-3 text-sm">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700 h-8 px-3 text-sm">
                        Create Assignment
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Search and Filter - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-9 text-sm"
              />
            </div>
            <Select value={filterSubject} onValueChange={(value) => setFilterSubject(value as Subject | 'all')}>
              <SelectTrigger className="w-full sm:w-40 h-9 text-sm">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-sm">All Subjects</SelectItem>
                {Object.values(Subject).map((sub) => (
                  <SelectItem key={sub} value={sub} className="text-sm">{sub}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <Card className="border-l-4 border-l-blue-500 shadow-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Total</p>
                  <p className="text-lg sm:text-2xl font-bold text-gray-900">{filteredHomeworks.length}</p>
                </div>
                <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          {!isTeacher && (
            <>
              <Card className="border-l-4 border-l-green-500 shadow-sm">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Completed</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">{completedHomeworks.length}</p>
                    </div>
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-orange-500 shadow-sm">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Pending</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">{pendingHomeworks.length}</p>
                    </div>
                    <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-red-500 shadow-sm">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">Overdue</p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {pendingHomeworks.filter(hw => isOverdue(hw.dueDate)).length}
                      </p>
                    </div>
                    <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Assignments List - Optimized */}
        {filteredHomeworks.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-300 shadow-sm">
            <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
              <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                {searchTerm || filterSubject !== 'all' ? 'No assignments found' : (isTeacher ? 'No assignments created yet' : 'No assignments available')}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 text-center max-w-md px-4">
                {searchTerm || filterSubject !== 'all' 
                  ? "Try adjusting your search or filter criteria."
                  : isTeacher 
                    ? "Create your first assignment to help students learn and grow."
                    : "No assignments have been posted yet. Check back later!"
                }
              </p>
              {isTeacher && !searchTerm && filterSubject === 'all' && (
                <Button 
                  className="mt-4 bg-blue-600 hover:bg-blue-700 h-9 px-4 text-sm"
                  onClick={() => setDialogOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create First Assignment
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredHomeworks.map((homework) => {
              const completed = isCompleted(homework);
              const overdue = isOverdue(homework.dueDate);
              
              return (
                <Card key={homework.id} className={`transition-all duration-200 hover:shadow-md shadow-sm will-change-transform ${
                  completed ? 'bg-green-50 border-green-200' : 
                  overdue ? 'bg-red-50 border-red-200' : 
                  'bg-white'
                }`}>
                  <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                          <Badge className={`border text-xs ${getSubjectColor(homework.subject)}`}>
                            {homework.subject}
                          </Badge>
                          {completed && (
                            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {overdue && !completed && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-base sm:text-lg mb-2 break-words leading-tight">{homework.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            Due {formatDistanceToNow(new Date(homework.dueDate), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                            Class {homework.assignedClass}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 flex-shrink-0">
                        {!isTeacher && !completed && (
                          <Button 
                            size="sm"
                            onClick={() => handleMarkComplete(homework.id)}
                            className="bg-green-600 hover:bg-green-700 text-white h-8 px-3 text-xs"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="hidden sm:inline">Mark Complete</span>
                            <span className="sm:hidden">Complete</span>
                          </Button>
                        )}
                        {isTeacher && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 border-red-200 hover:bg-red-50 h-8 px-3 text-xs"
                            onClick={() => handleDelete(homework.id)}
                          >
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 p-3 sm:p-4">
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{homework.description}</p>
                  </CardContent>
                  
                  <CardFooter className="bg-gray-50 border-t text-xs sm:text-sm text-gray-600 p-3 sm:p-4">
                    <div className="flex justify-between w-full">
                      <span>By: {homework.creatorName}</span>
                      <span>{formatDistanceToNow(new Date(homework.timestamp), { addSuffix: true })}</span>
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

export default HomeworkView;
