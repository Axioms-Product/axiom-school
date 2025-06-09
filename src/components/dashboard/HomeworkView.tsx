
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { format } from 'date-fns';
import { BookOpen, Calendar, Clock, Plus, CheckCircle, AlertCircle, FileText, Target, Users, Zap, Brain, Sparkles } from 'lucide-react';

const HomeworkView = () => {
  const { currentUser } = useAuth();
  const { homeworks = [], addHomework } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState<Subject>(
    (currentUser?.role === 'teacher' && currentUser?.subject) 
      ? currentUser.subject 
      : Subject.MATHEMATICS
  );
  const [dueDate, setDueDate] = useState('');

  const isTeacher = currentUser?.role === 'teacher';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !dueDate || !addHomework) return;
    
    if (isTeacher && currentUser?.subject) {
      addHomework({
        title,
        description,
        subject: currentUser.subject,
        dueDate: dueDate,
        assignedClass: currentUser.class || ''
      });
    } else {
      addHomework({
        title,
        description,
        subject,
        dueDate: dueDate,
        assignedClass: currentUser?.class || ''
      });
    }
    
    setTitle('');
    setDescription('');
    setDueDate('');
    setDialogOpen(false);
  };

  const getFilteredHomework = () => {
    if (!homeworks || !Array.isArray(homeworks)) return [];
    
    if (isTeacher) {
      return homeworks.filter(hw => hw.createdBy === currentUser?.id);
    } else {
      return homeworks.filter(hw => hw.assignedClass === currentUser?.class);
    }
  };

  const filteredHomework = getFilteredHomework();

  const getStatusColor = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'from-red-500 to-pink-600';
    if (diffDays <= 1) return 'from-orange-500 to-red-500';
    if (diffDays <= 3) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-emerald-600';
  };

  const getStatusIcon = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return AlertCircle;
    if (diffDays <= 1) return Clock;
    return CheckCircle;
  };

  const subjectList = Object.values(Subject);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative px-6 py-8 md:py-12">
            <div className="flex flex-col items-center text-center gap-6">
              <div className="text-white">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <BookOpen className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">Homework Hub</h1>
                <p className="text-indigo-100 text-lg mb-4">
                  {isTeacher 
                    ? "Manage and assign homework to your students"
                    : "Track your assignments and due dates"
                  }
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                    <Brain className="h-4 w-4 mr-1" />
                    {isTeacher ? "Teacher" : "Student"}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                    Class {currentUser?.class}
                  </Badge>
                  {currentUser?.role === 'teacher' && currentUser?.subject && (
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                      {currentUser.subject}
                    </Badge>
                  )}
                </div>
              </div>
              
              {isTeacher && (
                <div className="flex justify-center">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl shadow-lg">
                        <Plus className="mr-2 h-5 w-5" />
                        Create Homework
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl text-center">Create New Homework</DialogTitle>
                        <DialogDescription className="text-center">
                          Assign homework to your students
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input 
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g., Math Worksheet Chapter 5"
                              required
                              className="rounded-xl"
                            />
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
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                              id="description"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              placeholder="Describe the homework assignment..."
                              required
                              className="rounded-xl min-h-[100px]"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="due-date">Due Date</Label>
                            <Input 
                              id="due-date"
                              type="datetime-local"
                              value={dueDate}
                              onChange={(e) => setDueDate(e.target.value)}
                              required
                              className="rounded-xl"
                            />
                          </div>
                        </div>
                        
                        <DialogFooter className="flex justify-center gap-4">
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-xl">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Homework
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

        {filteredHomework.length === 0 ? (
          <div className="flex justify-center">
            <Card className="border-0 shadow-xl rounded-3xl max-w-md w-full">
              <CardContent className="p-8 text-center">
                <div className="h-24 w-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <BookOpen className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  No homework assigned
                </h3>
                <p className="text-muted-foreground mb-6">
                  {isTeacher 
                    ? "Start creating homework assignments for your students."
                    : "No homework has been assigned yet. Check back later!"
                  }
                </p>
                
                {isTeacher && (
                  <div className="flex justify-center">
                    <Button 
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-6 py-3"
                      onClick={() => setDialogOpen(true)}
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Create First Homework
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHomework.map((hw) => {
              const StatusIcon = getStatusIcon(hw.dueDate);
              const statusColor = getStatusColor(hw.dueDate);
              
              return (
                <Card key={hw.id} className="border-0 shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${statusColor}`}></div>
                  
                  <CardHeader className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${statusColor} flex items-center justify-center shadow-lg`}>
                        <StatusIcon className="h-6 w-6 text-white" />
                      </div>
                      <Badge variant="outline" className="text-xs font-semibold">
                        {hw.subject}
                      </Badge>
                    </div>
                    
                    <CardTitle className="text-lg font-bold mb-2">{hw.title}</CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {hw.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Due: {format(new Date(hw.dueDate), 'MMM d, yyyy h:mm a')}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>Class {hw.assignedClass}</span>
                      </div>
                      
                      {(() => {
                        const now = new Date();
                        const due = new Date(hw.dueDate);
                        const diffTime = due.getTime() - now.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        
                        return (
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className={`font-medium ${
                              diffDays < 0 ? 'text-red-600' :
                              diffDays <= 1 ? 'text-orange-600' :
                              diffDays <= 3 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                              {diffDays < 0 ? 'Overdue' :
                               diffDays === 0 ? 'Due today' :
                               diffDays === 1 ? 'Due tomorrow' :
                               `${diffDays} days left`}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                    
                    {!isTeacher && (
                      <div className="flex justify-center mt-4">
                        <Button 
                          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          View Details
                        </Button>
                      </div>
                    )}
                  </CardContent>
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
