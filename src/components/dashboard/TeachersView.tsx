
import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose,
  DialogFooter 
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { MessageCircle, School } from 'lucide-react';

const TeachersView = () => {
  const { currentUser } = useAuth();
  const { getTeachersForClass, sendMessage } = useData();
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  // Only students should see this page
  const isStudent = currentUser?.role === 'student';
  const teachers = getTeachersForClass(currentUser?.class || '');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedTeacher || !currentUser) return;
    
    sendMessage(newMessage, selectedTeacher);
    setNewMessage('');
    setDialogOpen(false);
  };

  const handleMessageClick = (teacherId: string) => {
    setSelectedTeacher(teacherId);
    setDialogOpen(true);
  };

  // Group teachers by subject
  const teachersBySubject = Object.values(Subject).reduce((acc, subject) => {
    const subjectTeachers = teachers.filter(teacher => teacher.subject === subject);
    if (subjectTeachers.length > 0) {
      acc[subject] = subjectTeachers;
    }
    return acc;
  }, {} as Record<Subject, typeof teachers>);

  if (!isStudent) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Teachers</h1>
        <Card className="bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700">
          <CardContent className="p-4">
            <p>This page is only available for students.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Your Teachers</h1>
        <p className="text-muted-foreground mt-1">
          View your class teachers and contact them directly
        </p>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Message to Teacher</DialogTitle>
            <DialogDescription>
              Send a message to your teacher about any questions or concerns you have
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              rows={4}
              className="resize-none"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSendMessage}
              className="bg-cgs-green hover:bg-cgs-green/90"
              disabled={!newMessage.trim()}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {Object.keys(teachersBySubject).length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <School className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No teachers assigned yet</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              There are currently no teachers assigned to your class.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {Object.entries(teachersBySubject).map(([subject, subjectTeachers]) => (
            <Card key={subject} className="overflow-hidden">
              <CardHeader className={`pb-3 ${
                subject === Subject.MATHEMATICS ? 'bg-blue-50' :
                subject === Subject.SCIENCE ? 'bg-green-50' :
                subject === Subject.SOCIAL_SCIENCE ? 'bg-yellow-50' :
                subject === Subject.ENGLISH ? 'bg-purple-50' :
                'bg-cyan-50'
              }`}>
                <CardTitle className="text-lg">{subject}</CardTitle>
                <CardDescription>Class {currentUser?.class}</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {subjectTeachers.map(teacher => (
                  <div key={teacher.id} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground">{teacher.email}</p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-cgs-blue border-cgs-blue hover:bg-cgs-blue/10"
                        onClick={() => handleMessageClick(teacher.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Other ways to reach your teachers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">School Office</h4>
                <p className="text-sm text-muted-foreground">
                  For urgent matters, please contact the school office:
                  <br />
                  Phone: (555) 123-4567
                  <br />
                  Email: office@cgs.edu
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Office Hours</h4>
                <p className="text-sm text-muted-foreground">
                  Teachers are available for in-person meetings:
                  <br />
                  Monday - Friday: 3:00 PM - 4:00 PM
                  <br />
                  Location: Staff Room, Main Building
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeachersView;
