
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
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Subject } from '@/models/types';
import { Calendar, Clock, MapPin, FileText, Trash2 } from 'lucide-react';

const ExamScheduleView = () => {
  const { currentUser } = useAuth();
  const { getFilteredExamSchedules, addExamSchedule, deleteExamSchedule } = useData();
  const [subject, setSubject] = useState<Subject | ''>('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const examSchedules = getFilteredExamSchedules();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (subject) {
      addExamSchedule({
        subject,
        date,
        time,
        duration,
        assignedClass: currentUser?.class || '',
      });
      
      // Reset form
      setSubject('');
      setDate('');
      setTime('');
      setDuration('');
      setDialogOpen(false);
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this exam schedule?')) {
      deleteExamSchedule(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Exam Schedule</h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher 
              ? `Manage exam schedule for Class ${currentUser?.class}`
              : `View exam schedule for Class ${currentUser?.class}`
            }
          </p>
        </div>
        
        {isTeacher && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cgs-green hover:bg-cgs-green/90">
                Add New Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Schedule New Exam</DialogTitle>
                <DialogDescription>
                  Add a new exam to the schedule for your class
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={subject} 
                      onValueChange={(value) => setSubject(value as Subject)}
                      required
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Subject).map((subj) => (
                          <SelectItem 
                            key={subj} 
                            value={subj}
                            disabled={isTeacher && currentUser?.subject !== subj}
                          >
                            {subj}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input 
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time"
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (e.g., 2 hours)</Label>
                    <Input 
                      id="duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="e.g., 2 hours"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-cgs-green hover:bg-cgs-green/90">
                    Schedule Exam
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {examSchedules.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No exams scheduled yet</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              {isTeacher 
                ? "Schedule your first exam by clicking the 'Add New Exam' button."
                : "No exams have been scheduled for your class yet."
              }
            </p>
            {isTeacher && (
              <Button 
                className="mt-4 bg-cgs-green hover:bg-cgs-green/90"
                onClick={() => setDialogOpen(true)}
              >
                Add New Exam
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {examSchedules.map((exam) => (
            <Card key={exam.id} className="card-3d overflow-hidden h-full">
              <CardHeader className="bg-green-50 dark:bg-gray-800 pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg sm:text-xl line-clamp-2">{exam.subject}</CardTitle>
                  {isTeacher && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 h-8 w-8"
                      onClick={() => handleDelete(exam.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <CardDescription>
                  Class {exam.assignedClass}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{new Date(exam.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{exam.time}</span>
                </div>
                <div className="flex items-center text-sm">
                  <FileText className="h-4 w-4 mr-2 text-gray-500" />
                  <span>Duration: {exam.duration}</span>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 text-xs text-muted-foreground pt-3">
                <div className="flex justify-between w-full">
                  <span>Added by: {exam.creatorName}</span>
                  <span>
                    {formatDistanceToNow(new Date(exam.timestamp), { addSuffix: true })}
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

export default ExamScheduleView;
