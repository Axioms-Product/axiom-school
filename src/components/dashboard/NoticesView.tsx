
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
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Calendar, Plus, Trash2, Users, Megaphone, Sparkles, GraduationCap, FileText, ArrowRight, Clock, AlertCircle } from 'lucide-react';

const NoticesView = () => {
  const { currentUser } = useAuth();
  const { getFilteredNotices, addNotice, deleteNotice } = useData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const isTeacher = currentUser?.role === 'teacher';
  const notices = getFilteredNotices();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addNotice({
      title,
      content,
      assignedClass: currentUser?.class || '',
    });
    
    setTitle('');
    setContent('');
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      deleteNotice(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-900 p-2 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 rounded-2xl lg:rounded-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.15%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 rounded-2xl lg:rounded-3xl"></div>
          
          <div className="relative px-4 py-8 lg:px-8 lg:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-14 w-14 lg:h-16 lg:w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <Bell className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold mb-2">Important Notices</h1>
                    <p className="text-amber-100 text-base lg:text-lg">
                      {isTeacher 
                        ? "Share important announcements with your class"
                        : "Stay updated with important announcements"
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
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                    <Megaphone className="h-4 w-4 mr-2" />
                    {notices.length} Notice{notices.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              {isTeacher && (
                <div className="lg:ml-8">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full lg:w-auto bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-6 py-3 text-sm rounded-xl shadow-lg">
                        <Plus className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        Post Notice
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-lg rounded-xl">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Create New Notice</DialogTitle>
                        <DialogDescription>
                          Share an important announcement with your class
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium">Notice Title</Label>
                            <Input 
                              id="title"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                              placeholder="e.g., Important Announcement"
                              required
                              className="rounded-lg border-2 focus:border-amber-400"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="content" className="text-sm font-medium">Notice Content</Label>
                            <Textarea 
                              id="content"
                              value={content}
                              onChange={(e) => setContent(e.target.value)}
                              placeholder="Details of the notice..."
                              rows={5}
                              required
                              className="resize-none rounded-lg border-2 focus:border-amber-400"
                            />
                          </div>
                        </div>
                        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
                          <DialogClose asChild>
                            <Button type="button" variant="outline" className="rounded-lg">Cancel</Button>
                          </DialogClose>
                          <Button 
                            type="submit" 
                            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-lg"
                          >
                            <Megaphone className="mr-2 h-4 w-4" />
                            Post Notice
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

        {notices.length === 0 ? (
          <Card className="border-0 shadow-xl rounded-2xl overflow-hidden card-hover">
            <CardContent className="p-8 lg:p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-28 w-28 lg:h-32 lg:w-32 mx-auto bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <Bell className="h-14 w-14 lg:h-16 lg:w-16 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-10 w-10 lg:h-12 lg:w-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  No notices yet
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  {isTeacher 
                    ? "Share important announcements and updates with your students."
                    : "No notices have been posted yet. Check back later for updates!"
                  }
                </p>
                
                {isTeacher && (
                  <Button 
                    className="mt-8 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl px-8 py-4 text-base shadow-lg"
                    onClick={() => setDialogOpen(true)}
                  >
                    <Megaphone className="mr-3 h-5 w-5" />
                    Post First Notice
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {notices.map((notice) => (
              <Card key={notice.id} className="border-0 shadow-lg rounded-2xl overflow-hidden card-hover bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-800 dark:to-amber-900/20">
                <div className="h-2 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
                
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
                          <Megaphone className="h-5 w-5 text-white" />
                        </div>
                        <Badge className="bg-amber-100 text-amber-700 rounded-full px-3 py-1">
                          <Bell className="h-3 w-3 mr-1" />
                          Notice
                        </Badge>
                      </div>
                      <CardTitle className="text-xl lg:text-2xl mb-2 bg-gradient-to-r from-gray-900 to-amber-700 bg-clip-text text-transparent dark:from-white dark:to-amber-300 break-words">
                        {notice.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {formatDistanceToNow(new Date(notice.timestamp), { addSuffix: true })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Class {notice.assignedClass}
                        </div>
                      </div>
                    </div>
                    
                    {isTeacher && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 border-red-200 hover:bg-red-50 rounded-lg shrink-0"
                        onClick={() => handleDelete(notice.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <p className="text-muted-foreground leading-relaxed text-base lg:text-lg whitespace-pre-wrap break-words">{notice.content}</p>
                </CardContent>
                
                <CardFooter className="bg-gradient-to-r from-gray-50 to-amber-50/50 dark:from-gray-800 dark:to-amber-900/20 border-t">
                  <div className="flex justify-between w-full text-sm text-muted-foreground">
                    <span className="font-medium">Posted by: {notice.creatorName}</span>
                    <span>{new Date(notice.timestamp).toLocaleDateString()}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticesView;
