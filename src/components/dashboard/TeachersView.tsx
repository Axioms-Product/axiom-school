import { useState } from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { MessageCircle, School, Users, Sparkles, GraduationCap, Mail, Phone, Clock, ArrowRight, User, BookOpen } from 'lucide-react';

const TeachersView = () => {
  const { currentUser } = useAuth();
  const { getTeachersForClass, sendMessage } = useData();
  const [selectedTeacher, setSelectedTeacher] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const teachersBySubject = Object.values(Subject).reduce((acc, subject) => {
    const subjectTeachers = teachers.filter(teacher => teacher.subject === subject);
    if (subjectTeachers.length > 0) {
      acc[subject] = subjectTeachers;
    }
    return acc;
  }, {} as Record<Subject, typeof teachers>);

  if (!isStudent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-red-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-red-400 to-pink-500" />
            <CardContent className="p-12">
              <div className="text-center">
                <div className="h-24 w-24 mx-auto bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <Users className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Teachers Page</h3>
                <p className="text-lg text-muted-foreground">This page is only available for students.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 rounded-3xl"></div>
          
          <div className="relative px-8 py-12">
            <div className="text-white">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                  <School className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2">Your Teachers</h1>
                  <p className="text-blue-100 text-lg">
                    Connect with your class teachers and get guidance
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Student Portal
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-4 py-2 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  {teachers.length} Teacher{teachers.length !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
            <DialogHeader>
              <DialogTitle className="text-xl sm:text-2xl">Send Message to Teacher</DialogTitle>
              <DialogDescription className="text-base sm:text-lg">
                Send a message to your teacher about any questions or concerns
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 sm:py-6">
              <Textarea 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
                className="resize-none rounded-xl border-2 focus:border-blue-400"
              />
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl px-6">Cancel</Button>
              </DialogClose>
              <Button 
                onClick={handleSendMessage}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl px-8"
                disabled={!newMessage.trim()}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {Object.keys(teachersBySubject).length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-3xl overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="relative mb-8">
                  <div className="h-32 w-32 mx-auto bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <School className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-12 w-12 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  No teachers assigned yet
                </h3>
                <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Teachers will be assigned to your class soon. Check back later!
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(teachersBySubject).map(([subject, subjectTeachers]) => (
              <Card key={subject} className="border-0 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className={`h-2 ${
                  subject === Subject.MATHEMATICS ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  subject === Subject.SCIENCE ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  subject === Subject.SOCIAL_SCIENCE ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  subject === Subject.ENGLISH ? 'bg-gradient-to-r from-purple-400 to-purple-600' :
                  subject === Subject.COMPUTER ? 'bg-gradient-to-r from-cyan-400 to-cyan-600' :
                  'bg-gradient-to-r from-gray-400 to-gray-600'
                }`} />
                
                <CardHeader className={`pb-3 sm:pb-4 p-4 sm:p-6 ${
                  subject === Subject.MATHEMATICS ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20' :
                  subject === Subject.SCIENCE ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20' :
                  subject === Subject.SOCIAL_SCIENCE ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20' :
                  subject === Subject.ENGLISH ? 'bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20' :
                  subject === Subject.COMPUTER ? 'bg-gradient-to-r from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20' :
                  'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/20 dark:to-gray-800/20'
                }`}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className={`h-10 sm:h-12 w-10 sm:w-12 rounded-lg sm:rounded-xl flex items-center justify-center shadow-md ${
                      subject === Subject.MATHEMATICS ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                      subject === Subject.SCIENCE ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      subject === Subject.SOCIAL_SCIENCE ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                      subject === Subject.ENGLISH ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      subject === Subject.COMPUTER ? 'bg-gradient-to-br from-cyan-500 to-cyan-600' :
                      'bg-gradient-to-br from-gray-500 to-gray-600'
                    }`}>
                      <BookOpen className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-base sm:text-xl truncate">{subject}</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">Class {currentUser?.class}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-2 sm:pt-4 space-y-3 sm:space-y-4 p-4 sm:p-6">
                  {subjectTeachers.map(teacher => (
                    <div key={teacher.id} className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                          <div className="h-8 sm:h-10 w-8 sm:w-10 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">{teacher.name}</h3>
                            <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                              <Mail className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{teacher.email}</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl text-xs sm:text-sm"
                          onClick={() => handleMessageClick(teacher.id)}
                        >
                          <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1" />
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
        
        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-indigo-400 to-purple-500" />
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 sm:p-6">
            <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 sm:gap-3">
              <Phone className="h-5 sm:h-6 w-5 sm:w-6 text-indigo-600" />
              Contact Information
            </CardTitle>
            <CardDescription className="text-base sm:text-lg">Other ways to reach your teachers and school</CardDescription>
          </CardHeader>
          <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-8 sm:h-10 w-8 sm:w-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Phone className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-base sm:text-lg">School Office</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  For urgent matters, please contact the school office:
                  <br />
                  <span className="font-medium">Phone:</span> +91 8092710478
                  <br />
                  <span className="font-medium">Email:</span> axiomsproduct@gmail.com
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-8 sm:h-10 w-8 sm:w-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <Clock className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-base sm:text-lg">Office Hours</h4>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  Teachers are available for in-person meetings:
                  <br />
                  <span className="font-medium">Monday to Saturday:</span> 7am to 2pm
                  <br />
                  <span className="font-medium">Location:</span> Staffroom, 3rd floor
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeachersView;
