
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';

const HomeworkView = () => {
  const { currentUser } = useAuth();
  const { getFilteredHomeworks, addHomework, deleteHomework } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [subject, setSubject] = useState<Subject>(
    (currentUser?.subject as Subject) || Subject.MATHEMATICS
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('all');

  const isTeacher = currentUser?.role === 'teacher';
  const homeworks = getFilteredHomeworks();
  const subjectList = Object.values(Subject);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only allow teachers to add homework for their assigned subject
    if (isTeacher && currentUser?.subject && currentUser.subject !== subject) {
      return;
    }
    
    addHomework({
      title,
      description,
      subject: currentUser?.subject as Subject || subject,
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

  const getFilteredHomeworksBySubject = () => {
    if (activeTab === 'all') return homeworks;
    return homeworks.filter(hw => hw.subject === activeTab);
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
        
        {isTeacher && (
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
                    {currentUser?.subject ? (
                      <Input 
                        id="subject" 
                        value={currentUser.subject} 
                        disabled 
                      />
                    ) : (
                      <Select
                        value={subject}
                        onValueChange={(val) => setSubject(val as Subject)}
                      >
                        <SelectTrigger id="subject">
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

      {homeworks.length > 0 && (
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 sm:grid-cols-6">
            <TabsTrigger value="all">All</TabsTrigger>
            {subjectList.map(subj => (
              <TabsTrigger key={subj} value={subj}>
                {subj.substring(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      )}

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
            {isTeacher && (
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
          {getFilteredHomeworksBySubject().map((homework) => (
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
                    </div>
                    <CardTitle>{homework.title}</CardTitle>
                    <CardDescription>
                      Due: {new Date(homework.dueDate).toLocaleDateString()}
                    </CardDescription>
                  </div>
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
              </CardHeader>
              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap">{homework.description}</p>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeworkView;
