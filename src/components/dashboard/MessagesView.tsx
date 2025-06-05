
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, Users, GraduationCap, Sparkles, ArrowRight, User as UserIcon, Clock, CheckCircle, Shield, Lock, School, Rocket, Heart, Star } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredMessages, 
    sendMessage, 
    markMessageAsRead,
    getTeachersForClass,
    getStudentsForClass
  } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [messageType, setMessageType] = useState<'class' | 'individual'>('class');
  
  const isStudent = currentUser?.role === 'student';
  const isTeacher = currentUser?.role === 'teacher';
  
  // Get appropriate users based on role
  const teachers = isStudent ? getTeachersForClass(currentUser?.class || '') : [];
  const students = isTeacher ? getStudentsForClass(currentUser?.class || '') : [];
  
  // Enhanced message filtering with proper bidirectional communication
  const messages = getFilteredMessages().filter(msg => {
    if (isStudent) {
      // Students see messages they sent, messages to them, and class group messages
      return msg.senderId === currentUser?.id || 
             msg.receiverId === currentUser?.id || 
             (msg.receiverId === `class-${currentUser?.class}` && msg.senderId !== currentUser?.id);
    } else if (isTeacher) {
      // Teachers see messages they sent and messages to them from students in their class
      const isFromStudentInClass = students.some(student => student.id === msg.senderId);
      return msg.senderId === currentUser?.id || 
             (msg.receiverId === currentUser?.id && isFromStudentInClass) ||
             (msg.receiverId === `class-${currentUser?.class}` && msg.senderId === currentUser?.id);
    }
    return false;
  }).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  useEffect(() => {
    if (currentUser) {
      messages.forEach(msg => {
        if (msg.receiverId === currentUser.id && !msg.read) {
          markMessageAsRead(msg.id);
        }
      });
    }
  }, [currentUser, messages, markMessageAsRead]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !currentUser) return;
    
    let recipientId = '';
    
    if (messageType === 'class') {
      recipientId = `class-${currentUser.class}`;
    } else {
      recipientId = selectedRecipient;
    }
    
    if (!recipientId) return;
    
    sendMessage(newMessage, recipientId);
    setNewMessage('');
    setSelectedRecipient('');
    setDialogOpen(false);
  };

  const getMessageDisplayName = (msg: any) => {
    if (msg.senderId === currentUser?.id) {
      return 'You';
    }
    
    if (msg.receiverId === `class-${currentUser?.class}`) {
      // For class messages, show the sender's role
      if (isStudent) {
        // If current user is student, other senders are either teachers or classmates
        const teacher = teachers.find(t => t.id === msg.senderId);
        return teacher ? `${teacher.name} (Teacher)` : 'Classmate';
      } else {
        // If current user is teacher, other senders are students
        const student = students.find(s => s.id === msg.senderId);
        return student ? `${student.name} (Student)` : 'Student';
      }
    }
    
    // For individual messages, show role-based names
    if (isStudent) {
      const teacher = teachers.find(t => t.id === msg.senderId);
      return teacher ? `${teacher.name} (Teacher)` : 'Teacher';
    } else {
      const student = students.find(s => s.id === msg.senderId);
      return student ? `${student.name} (Student)` : 'Student';
    }
  };

  const getRecipientOptions = () => {
    if (messageType === 'class') return [];
    
    if (isStudent) {
      return teachers.map(teacher => ({
        id: teacher.id,
        name: `${teacher.name} (${teacher.subject})`
      }));
    } else {
      return students.map(student => ({
        id: student.id,
        name: student.name
      }));
    }
  };

  return (
    <div className="min-h-screen animated-gradient-slow">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="card-3d glass-effect rounded-3xl overflow-hidden border border-white/20">
            <div className="relative px-4 sm:px-8 py-8 sm:py-12">
              {/* Floating decorative elements */}
              <div className="absolute top-4 right-4 text-4xl animate-bounce">💬</div>
              <div className="absolute bottom-4 left-4 text-3xl float">📱</div>
              <div className="absolute top-1/2 right-8 text-2xl float-delayed">✨</div>
              
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="text-white">
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div className="card-3d bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg p-4">
                      <MessageCircle className="h-8 w-8 text-white pulse-glow" />
                    </div>
                    <div>
                      <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2 neon-text">Messages</h1>
                      <p className="text-blue-100 text-sm sm:text-lg">
                        {isStudent 
                          ? `🎓 Connect with teachers and Class ${currentUser?.class} students`
                          : `👨‍🏫 Communicate with Class ${currentUser?.class} students`
                        }
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm neon-border">
                      <Shield className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                      Secure Messaging
                    </Badge>
                    <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                      Class {currentUser?.class}
                    </Badge>
                    <Badge className="glass-effect text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                      <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                      {messages.length} Message{messages.length !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                </div>
                
                <div className="mt-6 lg:mt-0">
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="card-3d-interactive glass-effect text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg rounded-2xl shadow-lg neon-border">
                        <Rocket className="mr-2 sm:mr-3 h-4 sm:h-6 w-4 sm:w-6 group-hover:scale-110 transition-transform" />
                        Send Message
                        <ArrowRight className="ml-2 sm:ml-3 h-3 sm:h-5 w-3 sm:w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="card-3d glass-effect border-white/20 sm:max-w-[500px] rounded-2xl mx-4">
                      <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500" />
                          Send Message
                        </DialogTitle>
                        <DialogDescription className="text-sm sm:text-lg">
                          Send a message to {isStudent ? 'teachers or classmates' : 'students in your class'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 sm:py-6 space-y-4">
                        {isStudent && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">Message Type</label>
                            <Select value={messageType} onValueChange={(value: 'class' | 'individual') => setMessageType(value)}>
                              <SelectTrigger className="card-3d glass-effect border-white/20 rounded-xl">
                                <SelectValue placeholder="Select message type" />
                              </SelectTrigger>
                              <SelectContent className="glass-effect border-white/20">
                                <SelectItem value="class">Class Group 👥</SelectItem>
                                <SelectItem value="individual">Individual Teacher 👨‍🏫</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        {messageType === 'individual' && (
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              {isStudent ? 'Select Teacher' : 'Select Student'}
                            </label>
                            <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                              <SelectTrigger className="card-3d glass-effect border-white/20 rounded-xl">
                                <SelectValue placeholder={`Select ${isStudent ? 'teacher' : 'student'}`} />
                              </SelectTrigger>
                              <SelectContent className="glass-effect border-white/20">
                                {getRecipientOptions().map((option) => (
                                  <SelectItem key={option.id} value={option.id}>
                                    {option.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Message</label>
                          <Textarea 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message here..."
                            rows={4}
                            className="card-3d glass-effect border-white/20 focus:border-blue-400 rounded-xl text-sm sm:text-base"
                          />
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                          <Lock className="h-3 sm:h-4 w-3 sm:w-4" />
                          <span>Messages are secure and private</span>
                        </div>
                      </div>
                      <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                        <DialogClose asChild>
                          <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl px-4 sm:px-6 text-sm sm:text-base">Cancel</Button>
                        </DialogClose>
                        <Button 
                          onClick={handleSendMessage}
                          className="w-full sm:w-auto card-3d-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 sm:px-8 text-sm sm:text-base"
                          disabled={!newMessage.trim() || (messageType === 'individual' && !selectedRecipient)}
                        >
                          <Send className="mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                          Send Message
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <Card className="card-3d glass-effect border-white/20 overflow-hidden">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="card-3d bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mx-auto shadow-lg p-8">
                    <MessageCircle className="h-16 w-16 text-blue-600 dark:text-blue-400 mx-auto" />
                  </div>
                  <div className="absolute -top-2 -right-2 card-3d bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse p-3">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent neon-text">
                  No messages yet
                </h3>
                <p className="text-sm sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                  {isStudent 
                    ? 'Start a conversation with your teachers or classmates. All messages are secure and private.'
                    : 'Start communicating with your students. All messages are secure and private.'
                  }
                </p>
                
                <Button 
                  className="card-3d-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-6 text-lg shadow-lg"
                  onClick={() => setDialogOpen(true)}
                >
                  <MessageCircle className="mr-3 h-6 w-6" />
                  Send First Message
                  <Heart className="ml-3 h-6 w-6 animate-pulse" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
            {/* Enhanced Chat Area */}
            <div className="lg:col-span-3">
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500" />
                <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-4 sm:p-6 relative">
                  <div className="absolute top-2 right-2 text-2xl opacity-50 float">🌟</div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center">
                    <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
                    Class {currentUser?.class} Messages
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1">Secure & Private Communication</p>
                </div>
                
                <div className="flex flex-col h-[400px] sm:h-[600px]">
                  <ScrollArea className="flex-1 p-3 sm:p-6">
                    <div className="space-y-3 sm:space-y-6">
                      {messages.map((message) => {
                        const isSentByCurrentUser = message.senderId === currentUser?.id;
                        const displayName = getMessageDisplayName(message);
                        
                        return (
                          <div 
                            key={message.id}
                            className={cn(
                              "flex max-w-[85%] sm:max-w-[80%] animate-fade-in",
                              isSentByCurrentUser ? "ml-auto" : "mr-auto"
                            )}
                          >
                            <div className="flex items-start gap-2 sm:gap-3 w-full">
                              {!isSentByCurrentUser && (
                                <div className="card-3d bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                  {displayName.includes('Teacher') ? (
                                    <School className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 dark:text-blue-400" />
                                  ) : (
                                    <UserIcon className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 dark:text-blue-400" />
                                  )}
                                </div>
                              )}
                              <div
                                className={cn(
                                  "card-3d rounded-2xl p-3 sm:p-4 shadow-lg max-w-full",
                                  isSentByCurrentUser 
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md ml-auto"
                                    : "glass-effect border border-white/20 rounded-bl-md"
                                )}
                              >
                                <p className="mb-2 sm:mb-3 leading-relaxed break-words text-sm sm:text-base">{message.content}</p>
                                <div className={cn(
                                  "text-xs flex justify-between items-center gap-2 sm:gap-3",
                                  isSentByCurrentUser ? "text-blue-100" : "text-muted-foreground"
                                )}>
                                  <span className="font-medium truncate">
                                    {displayName}
                                  </span>
                                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                                    <Clock className="h-3 w-3" />
                                    <span className="text-xs">{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
                                    {isSentByCurrentUser && message.read && (
                                      <CheckCircle className="h-3 w-3 text-green-300" />
                                    )}
                                  </div>
                                </div>
                              </div>
                              {isSentByCurrentUser && (
                                <div className="card-3d bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 p-2">
                                  <UserIcon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/50 p-3 sm:p-6">
                    <div className="flex gap-2 sm:gap-3">
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply here..."
                        className="card-3d glass-effect border-white/20 focus:border-blue-400 min-h-[60px] sm:min-h-[80px] text-sm sm:text-base rounded-xl flex-1"
                        rows={2}
                      />
                      <Button 
                        onClick={() => {
                          if (newMessage.trim()) {
                            sendMessage(newMessage, `class-${currentUser?.class}`);
                            setNewMessage('');
                          }
                        }}
                        className="card-3d-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-3 sm:px-6 self-end h-fit"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 sm:h-5 w-4 sm:w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Enhanced Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              <Card className="card-3d glass-effect border-white/20 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500" />
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="card-3d bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl mx-auto mb-4 shadow-lg p-6">
                      <GraduationCap className="h-10 w-10 text-blue-600 dark:text-blue-400 mx-auto" />
                    </div>
                    
                    <h3 className="font-bold text-base sm:text-lg mb-1">Class {currentUser?.class}</h3>
                    <p className="text-muted-foreground mb-3 text-xs sm:text-sm">Secure Messaging</p>
                    <Badge className="glass-effect border-white/20 rounded-full mb-6 text-xs sm:text-sm px-3 py-1">
                      <Shield className="h-3 w-3 mr-1" />
                      Private & Secure
                    </Badge>

                    <Button 
                      className="w-full card-3d-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-3 text-sm sm:text-base"
                      onClick={() => setDialogOpen(true)}
                    >
                      <MessageCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      New Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesView;
