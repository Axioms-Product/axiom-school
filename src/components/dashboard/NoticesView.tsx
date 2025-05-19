
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
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Trash2 } from 'lucide-react';

const NoticesView = () => {
  const { currentUser } = useAuth();
  const { getFilteredNotices, addNotice, deleteNotice } = useData();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const notices = getFilteredNotices();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addNotice({
      title,
      description,  // Changed from 'content' to 'description' to match the type
      assignedClass: currentUser?.class || '',
    });
    
    // Reset form
    setTitle('');
    setDescription('');  // Changed from setContent
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notices</h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher 
              ? `Manage notices for Class ${currentUser?.class}`
              : `View notices for Class ${currentUser?.class}`
            }
          </p>
        </div>
        
        {isTeacher && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cgs-purple hover:bg-cgs-purple/90">
                Post New Notice
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Create New Notice</DialogTitle>
                <DialogDescription>
                  Post a new notice for your class
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
                      placeholder="e.g., Important Announcement"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Content</Label>
                    <Textarea 
                      id="description"
                      value={description}  // Changed from content
                      onChange={(e) => setDescription(e.target.value)}  // Changed from setContent
                      placeholder="Details of the notice"
                      rows={4}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-cgs-purple hover:bg-cgs-purple/90">
                    Post Notice
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {notices.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">No notices yet</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              {isTeacher 
                ? "Create your first notice by clicking the 'Post New Notice' button."
                : "Your teacher hasn't posted any notices yet."
              }
            </p>
            {isTeacher && (
              <Button 
                className="mt-4 bg-cgs-purple hover:bg-cgs-purple/90"
                onClick={() => setDialogOpen(true)}
              >
                Post New Notice
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {notices.map((notice) => (
            <Card key={notice.id} className="card-3d overflow-hidden">
              <CardHeader className="bg-purple-50 dark:bg-gray-800 pb-4">
                <div className="flex justify-between items-start">
                  <CardTitle>{notice.title}</CardTitle>
                  {isTeacher && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-2 h-8 w-8"
                      onClick={() => handleDelete(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="whitespace-pre-wrap">{notice.description}</p>
              </CardContent>
              <CardFooter className="border-t bg-gray-50 dark:bg-gray-900 text-xs text-muted-foreground pt-3">
                <div className="flex justify-between w-full">
                  <span>Posted by: {notice.creatorName}</span>
                  <span>
                    {formatDistanceToNow(new Date(notice.timestamp), { addSuffix: true })}
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

export default NoticesView;
