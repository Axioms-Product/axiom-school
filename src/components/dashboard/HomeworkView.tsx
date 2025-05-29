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
import { BookOpen, Calendar, CheckCircle, Clock, Plus, Trash2, Users, Target, Sparkles, GraduationCap, FileText, ArrowRight } from 'lucide-react';

const HomeworkView = () => {
  const { currentUser } = useAuth();
  const { getFilteredHomeworks, addHomework, deleteHomework, markHomeworkComplete } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState<Subject | ''>('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const homeworks = getFilteredHomeworks();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Teachers can only add homework for their assigned subject
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-violet-900 p-4 sm:p-6">
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
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">Homework</h1>
                    <p className="text-violet-100 text-lg">
                      {isTeacher 
                        ? "Manage assignments for your class"
                        : "Track your assignments and deadlines"
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    {isTeacher ? "Teacher Portal" : "Student Portal"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    {homeworks.length} Assignment{homeworks.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {isTeacher && (
                <div className="mt-8 lg:mt-0">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-8 py-6 text-lg rounded-2xl shadow-lg">
                        <Plus className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                        Create Assignment
                        <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">Create New Assignment</DialogTitle>
                        <DialogDescription className="text-lg">
                          Add a new homework assignment for your class
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-6 py-6">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-base font-medium">Assignment Title</Label>
                            <Input 
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g., Chapter 5 Math Problems"
                              required
                              className="rounded-xl border-2 focus:border-violet-400"
                            />
                          </div>
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
                                <SelectTrigger className="rounded-xl border-2 focus:border-violet-400">
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
                            <Label htmlFor="description" className="text-base font-medium">Description</Label>
                            <Textarea 
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Detailed instructions for the assignment"
                              rows={4}
                              required
                              className="resize-none rounded-xl border-2 focus:border-violet-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="dueDate" className="text-base font-medium">Due Date</Label>
                            <Input 
                              id="dueDate"
                              type="datetime-local"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                              required
                              className="rounded-xl border-2 focus:border-violet-400"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-xl px-6">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl px-8"
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create Assignment
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

        {homeworks.length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-32 w-32 mx-auto bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="h-16 w-16 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-12 w-12 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  No assignments yet
                </h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Create your first assignment to help students learn and grow."
                    : "No assignments have been posted yet. Check back later!"
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl px-8 py-6 text-lg shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Plus className="mr-3 h-6 w-6" />
                    Create First Assignment
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {homeworks.map((homework) => {
              const completed = isCompleted(homework);
              const overdue = isOverdue(homework.dueDate);
              
              return (
                <Card key={homework.id} className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`h-2 ${
                    completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
                    overdue ? 'bg-gradient-to-r from-red-400 to-rose-500' :
                    'bg-gradient-to-r from-violet-400 to-purple-500'
                  }`} />
                  
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge className={`${
                            homework.subject === Subject.MATHEMATICS ? 'bg-blue-100 text-blue-700' :
                            homework.subject === Subject.SCIENCE ? 'bg-green-100 text-green-700' :
                            homework.subject === Subject.SOCIAL_SCIENCE ? 'bg-yellow-100 text-yellow-700' :
                            homework.subject === Subject.ENGLISH ? 'bg-purple-100 text-purple-700' :
                            homework.subject === Subject.COMPUTER ? 'bg-cyan-100 text-cyan-700' :
                            'bg-gray-100 text-gray-700'
                          } rounded-full px-3 py-1`}>
                            {homework.subject}
                          </Badge>
                          {completed && (
                            <Badge className="bg-green-100 text-green-700 rounded-full px-3 py-1">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                          {overdue && !completed && (
                            <Badge className="bg-red-100 text-red-700 rounded-full px-3 py-1">
                              <Clock className="h-3 w-3 mr-1" />
                              Overdue
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl mb-2">{homework.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Due {formatDistanceToNow(new Date(homework.dueDate), { addSuffix: true })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            Class {homework.assignedClass}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {!isTeacher && !completed && (
                          <Button 
                            size="sm"
                            onClick={() => handleMarkComplete(homework.id)}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Mark Complete
                          </Button>
                        )}
                        {isTeacher && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 border-red-200 hover:bg-red-50 rounded-xl"
                            onClick={() => handleDelete(homework.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-muted-foreground leading-relaxed">{homework.description}</p>
                  </CardContent>
                  
                  <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 border-t">
                    <div className="flex justify-between w-full text-sm text-muted-foreground">
                      <span>Posted by: {homework.creatorName}</span>
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
