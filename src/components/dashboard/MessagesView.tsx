
import { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
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
import { cn } from '@/lib/utils';
import { useAuth, User } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, User as UserIcon } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredMessages, 
    sendMessage, 
    getTeacherForClass, 
    markMessageAsRead 
  } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<User | null>(null);
  
  const isTeacher = currentUser?.role === 'teacher';
  const messages = getFilteredMessages();

  // Get class teacher info for students
  useEffect(() => {
    if (!isTeacher && currentUser) {
      const teacher = getTeacherForClass(currentUser.class || '');
      if (teacher) {
        setTeacherInfo(teacher);
      }
    }
  }, [isTeacher, currentUser, getTeacherForClass]);

  // Mark messages as read when viewed
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
    
    if (isTeacher) {
      // Teacher is replying to a student
      const studentId = messages.find(msg => msg.senderId !== currentUser.id)?.senderId;
      if (studentId) {
        sendMessage(newMessage, studentId);
      }
    } else if (teacherInfo) {
      // Student is sending to teacher
      sendMessage(newMessage, teacherInfo.id);
    }
    
    setNewMessage('');
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher 
              ? "Respond to student questions"
              : `Send messages to your class teacher`
            }
          </p>
        </div>
        
        {!isTeacher && teacherInfo && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cgs-green hover:bg-cgs-green/90">
                <MessageCircle className="mr-2 h-4 w-4" />
                Send New Message
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Send Message to Teacher</DialogTitle>
                <DialogDescription>
                  Send a message to your class teacher: {teacherInfo.name}
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
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {messages.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <MessageCircle className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              {isTeacher 
                ? "No messages from students yet. Once students send messages, they will appear here."
                : teacherInfo 
                  ? "Start a conversation with your teacher by sending a message."
                  : "No teacher has been assigned to your class yet."
              }
            </p>
            {!isTeacher && teacherInfo && (
              <Button 
                className="mt-4 bg-cgs-green hover:bg-cgs-green/90"
                onClick={() => setDialogOpen(true)}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Send New Message
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="h-full">
              <CardContent className="p-4">
                <div className="flex flex-col h-[400px] md:h-[500px]">
                  <div className="border-b pb-3 mb-3">
                    <h3 className="font-medium">Message History</h3>
                  </div>
                  <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isSentByCurrentUser = message.senderId === currentUser?.id;
                        
                        return (
                          <div 
                            key={message.id}
                            className={cn(
                              "flex max-w-[80%]",
                              isSentByCurrentUser ? "ml-auto" : "mr-auto"
                            )}
                          >
                            <div
                              className={cn(
                                "rounded-lg p-3 shadow-sm",
                                isSentByCurrentUser 
                                  ? "bg-cgs-blue text-white rounded-br-none"
                                  : "bg-gray-100 dark:bg-gray-800 rounded-bl-none"
                              )}
                            >
                              <p className="mb-1">{message.content}</p>
                              <div className="text-xs opacity-70 flex justify-between mt-1">
                                <span>{message.senderName}</span>
                                <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex gap-2">
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply here..."
                        className="resize-none flex-1"
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-cgs-blue hover:bg-cgs-blue/90"
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col items-center py-4">
                  <div className="h-20 w-20 rounded-full bg-cgs-blue/10 flex items-center justify-center mb-4">
                    <UserIcon className="h-10 w-10 text-cgs-blue" />
                  </div>
                  
                  {isTeacher ? (
                    messages.length > 0 && (
                      <>
                        <h3 className="font-medium text-lg">Student</h3>
                        <p className="text-muted-foreground">
                          {messages[0].senderId === currentUser?.id 
                            ? messages[0].receiverId 
                            : messages[0].senderName}
                        </p>
                        <p className="text-sm mt-2">Class {currentUser?.class}</p>
                      </>
                    )
                  ) : (
                    teacherInfo && (
                      <>
                        <h3 className="font-medium text-lg">Teacher</h3>
                        <p className="text-muted-foreground">{teacherInfo.name}</p>
                        <p className="text-sm mt-2">Class {teacherInfo.class}</p>

                        <Button 
                          className="mt-6 w-full bg-cgs-green hover:bg-cgs-green/90"
                          onClick={() => setDialogOpen(true)}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          New Message
                        </Button>
                      </>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <h3 className="font-medium mb-2">How it works</h3>
              <Card>
                <CardContent className="p-4 text-sm">
                  <ul className="space-y-2">
                    {isTeacher ? (
                      <>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">1</div>
                          <span>Students send you questions or doubts</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">2</div>
                          <span>You can respond to their messages</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">3</div>
                          <span>Communication is private between you and each student</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">1</div>
                          <span>Send messages to your class teacher</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">2</div>
                          <span>Get personalized responses</span>
                        </li>
                        <li className="flex gap-2">
                          <div className="h-5 w-5 rounded-full bg-cgs-blue text-white flex items-center justify-center text-xs">3</div>
                          <span>Your communication is private</span>
                        </li>
                      </>
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesView;
