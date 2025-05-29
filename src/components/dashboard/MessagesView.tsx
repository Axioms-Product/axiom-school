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
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth, User } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, Users, GraduationCap, Sparkles, ArrowRight, User as UserIcon, Clock, CheckCircle, Shield, Lock } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredMessages, 
    sendMessage, 
    markMessageAsRead 
  } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Get all messages for the current user's class (class-based messaging)
  const messages = getFilteredMessages().filter(msg => 
    // Filter messages based on class - since messages don't have assignedClass,
    // we need to filter by sender/receiver being in the same class
    msg.senderId === currentUser?.id || msg.receiverId === currentUser?.id ||
    msg.receiverId === 'class-group'
  );

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
    
    // Send message to class group (no specific receiver)
    sendMessage(newMessage, 'class-group');
    
    setNewMessage('');
    setDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="max-w-7xl mx-auto p-3 sm:p-6 space-y-6 sm:space-y-8">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl sm:rounded-3xl opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2260%22%20cy=%2212%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30 rounded-2xl sm:rounded-3xl"></div>
          
          <div className="relative px-4 sm:px-8 py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="text-white">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="h-12 sm:h-16 w-12 sm:w-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <MessageCircle className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">Class Messages</h1>
                    <p className="text-blue-100 text-sm sm:text-lg">
                      Secure class communication for Class {currentUser?.class}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    <Shield className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                    End-to-End Encrypted
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
                    <MessageCircle className="h-3 sm:h-4 w-3 sm:w-4 mr-1 sm:mr-2" />
                    {messages.length} Message{messages.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
              
              <div className="mt-6 lg:mt-0">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group px-4 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg rounded-xl sm:rounded-2xl shadow-lg">
                      <MessageCircle className="mr-2 sm:mr-3 h-4 sm:h-6 w-4 sm:w-6 group-hover:scale-110 transition-transform" />
                      Send Message
                      <ArrowRight className="ml-2 sm:ml-3 h-3 sm:h-5 w-3 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px] rounded-2xl mx-4">
                    <DialogHeader>
                      <DialogTitle className="text-xl sm:text-2xl">Send Message to Class</DialogTitle>
                      <DialogDescription className="text-sm sm:text-lg">
                        Send an encrypted message to your Class {currentUser?.class} group
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4 sm:py-6">
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here..."
                        rows={4}
                        className="resize-none rounded-xl border-2 focus:border-blue-400 text-sm sm:text-base"
                      />
                      <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-muted-foreground">
                        <Lock className="h-3 sm:h-4 w-3 sm:w-4" />
                        <span>Messages are encrypted and anonymous</span>
                      </div>
                    </div>
                    <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
                      <DialogClose asChild>
                        <Button type="button" variant="outline" className="w-full sm:w-auto rounded-xl px-4 sm:px-6 text-sm sm:text-base">Cancel</Button>
                      </DialogClose>
                      <Button 
                        onClick={handleSendMessage}
                        className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 sm:px-8 text-sm sm:text-base"
                        disabled={!newMessage.trim()}
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

        {messages.length === 0 ? (
          <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
            <CardContent className="p-6 sm:p-12">
              <div className="text-center">
                <div className="relative mb-6 sm:mb-8">
                  <div className="h-20 sm:h-32 w-20 sm:w-32 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg">
                    <MessageCircle className="h-10 sm:h-16 w-10 sm:w-16 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 h-8 sm:h-12 w-8 sm:w-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Sparkles className="h-4 sm:h-6 w-4 sm:w-6 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  No messages yet
                </h3>
                <p className="text-sm sm:text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Start a conversation with your classmates. All messages are encrypted and anonymous for your privacy.
                </p>
                
                <Button 
                  className="mt-6 sm:mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl sm:rounded-2xl px-6 sm:px-8 py-3 sm:py-6 text-sm sm:text-lg shadow-lg"
                  onClick={() => setDialogOpen(true)}
                >
                  <MessageCircle className="mr-2 sm:mr-3 h-4 sm:h-6 w-4 sm:w-6" />
                  Send First Message
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
            {/* Enhanced Chat Area */}
            <div className="lg:col-span-3">
              <Card className="border-0 shadow-2xl rounded-2xl sm:rounded-3xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500" />
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center">
                    <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6 mr-2 sm:mr-3" />
                    Class {currentUser?.class} Discussion
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm mt-1">Anonymous & Encrypted</p>
                </div>
                
                <div className="flex flex-col h-[400px] sm:h-[600px]">
                  <ScrollArea className="flex-1 p-3 sm:p-6">
                    <div className="space-y-3 sm:space-y-6">
                      {messages.map((message) => {
                        const isSentByCurrentUser = message.senderId === currentUser?.id;
                        
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
                                <div className="h-8 sm:h-10 w-8 sm:w-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                  <UserIcon className="h-4 sm:h-5 w-4 sm:w-5 text-blue-600 dark:text-blue-400" />
                                </div>
                              )}
                              <div
                                className={cn(
                                  "rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg max-w-full",
                                  isSentByCurrentUser 
                                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md ml-auto"
                                    : "bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-bl-md"
                                )}
                              >
                                <p className="mb-2 sm:mb-3 leading-relaxed break-words text-sm sm:text-base">{message.content}</p>
                                <div className={cn(
                                  "text-xs flex justify-between items-center gap-2 sm:gap-3",
                                  isSentByCurrentUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                                )}>
                                  <span className="font-medium truncate">
                                    {isSentByCurrentUser ? "You" : "Classmate"}
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
                                <div className="h-8 sm:h-10 w-8 sm:w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                                  <UserIcon className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  
                  <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-3 sm:p-6">
                    <div className="flex gap-2 sm:gap-3">
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your reply here..."
                        className="resize-none flex-1 rounded-xl border-2 focus:border-blue-400 min-h-[60px] sm:min-h-[80px] text-sm sm:text-base"
                        rows={2}
                      />
                      <Button 
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-3 sm:px-6 self-end h-fit"
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
              <Card className="border-0 shadow-xl rounded-xl sm:rounded-2xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-blue-400 to-purple-500" />
                <CardContent className="p-4 sm:p-6">
                  <div className="text-center">
                    <div className="h-16 sm:h-20 w-16 sm:w-20 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg">
                      <GraduationCap className="h-8 sm:h-10 w-8 sm:w-10 text-blue-600 dark:text-blue-400" />
                    </div>
                    
                    <h3 className="font-bold text-base sm:text-lg mb-1">Class {currentUser?.class}</h3>
                    <p className="text-muted-foreground mb-3 text-xs sm:text-sm">Anonymous Chat Room</p>
                    <Badge className="bg-blue-100 text-blue-700 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm">
                      <Shield className="h-3 w-3 mr-1" />
                      Secure & Private
                    </Badge>

                    <Button 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-2 sm:py-3 text-sm sm:text-base"
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
