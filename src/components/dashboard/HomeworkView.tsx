
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { formatDistanceToNow } from 'date-fns';
import { Trash2, CheckCircle, Circle, Users } from 'lucide-react';

const HomeworkView = () => {
  const { currentUser } = useAuth();
  const { getFilteredHomeworks, addHomework, deleteHomework, markHomeworkComplete, getStudentsForClass } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  const isTeacher = currentUser?.role === 'teacher';
  const homeworks = getFilteredHomeworks();
  const students = getStudentsForClass(currentUser?.class || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser?.subject) {
      console.error('Teacher subject not found');
      return;
    }
    
    addHomework({
      title,
      description,
      subject: currentUser.subject,
      assignedClass: currentUser?.class || '',
      dueDate
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this homework?')) {
      deleteHomework(id);
    }
  };

  const handleMarkComplete = (homeworkId: string) => {
    markHomeworkComplete(homeworkId);
  };

  const getCompletionStatus = (homework: any) => {
    if (!currentUser) return { isCompleted: false, completedCount: 0 };
    
    const completedBy = homework.completedBy || [];
    const isCompleted = completedBy.includes(currentUser.id);
    const completedCount = completedBy.length;
    
    return { isCompleted, completedCount };
  };

  const getFilteredHomeworksBySubject = () => {
    if (activeTab === 'all') return homeworks;
    return homeworks.filter(hw => hw.subject === activeTab);
  };

  const getStudentName = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    return student?.name || 'Unknown Student';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homework</h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher 
              ? `Manage homework assignments for ${currentUser?.subject || 'your subject'} - Class ${currentUser?.class}`
              : `View homework assignments for Class ${currentUser?.class}`
            }
          </p>
        </div>
        
        {isTeacher && currentUser?.subject && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cgs-blue hover:bg-cgs-blue/90">
                Add New Homework
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Homework</DialogTitle>
                <DialogDescription>
                  Add a new homework assignment for your class
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
                      placeholder="e.g., Math Assignment 1"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject" 
                      value={currentUser.subject} 
                      disabled 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Details about the homework assignment"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input 
                      id="dueDate"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-cgs-blue hover:bg-cgs-blue/90">
                    Create Homework
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {homeworks.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">No homework assignments yet</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              {isTeacher 
                ? "Create your first homework assignment by clicking the 'Add New Homework' button."
                : "Your teacher hasn't created any homework assignments yet."
              }
            </p>
            {isTeacher && currentUser?.subject && (
              <Button 
                className="mt-4 bg-cgs-blue hover:bg-cgs-blue/90"
                onClick={() => setDialogOpen(true)}
              >
                Add New Homework
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {getFilteredHomeworksBySubject().map((homework) => {
            const { isCompleted, completedCount } = getCompletionStatus(homework);
            const completedBy = homework.completedBy || [];
            
            return (
              <Card key={homework.id} className="card-3d overflow-hidden">
                <CardHeader className={`${
                  homework.subject === Subject.MATHEMATICS ? 'bg-blue-50' :
                  homework.subject === Subject.SCIENCE ? 'bg-green-50' :
                  homework.subject === Subject.SOCIAL_SCIENCE ? 'bg-yellow-50' :
                  homework.subject === Subject.ENGLISH ? 'bg-purple-50' :
                  'bg-cyan-50'
                } pb-4`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-black/10">
                          {homework.subject}
                        </span>
                        {isTeacher && (
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Users className="h-3 w-3 mr-1" />
                            {completedCount}/{students.length} completed
                          </div>
                        )}
                      </div>
                      <CardTitle>{homework.title}</CardTitle>
                      <CardDescription>
                        Due: {new Date(homework.dueDate).toLocaleDateString()}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isTeacher && (
                        <Button
                          variant={isCompleted ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleMarkComplete(homework.id)}
                          className={isCompleted ? "bg-green-600 hover:bg-green-700" : ""}
                        >
                          {isCompleted ? <CheckCircle className="h-4 w-4 mr-1" /> : <Circle className="h-4 w-4 mr-1" />}
                          {isCompleted ? "Completed" : "Mark Complete"}
                        </Button>
                      )}
                      {isTeacher && homework.createdBy === currentUser?.id && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 h-8 w-8"
                          onClick={() => handleDelete(homework.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="whitespace-pre-wrap">{homework.description}</p>
                  
                  {isTeacher && completedBy.length > 0 && (
                    <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Students who completed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {completedBy.map((studentId) => (
                          <span 
                            key={studentId}
                            className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full"
                          >
                            {getStudentName(studentId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 text-xs text-muted-foreground pt-3">
                  <div className="flex justify-between w-full">
                    <span>Created by: {homework.creatorName}</span>
                    <span>
                      {formatDistanceToNow(new Date(homework.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomeworkView;
