
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, Users, User as UserIcon, Plus, Clock } from 'lucide-react';

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
  const teachers = isStudent ? getTeachersForClass(currentUser?.class || '') : [];
  const students = !isStudent ? getStudentsForClass(currentUser?.class || '') : [];
  
  // Get messages for current user
  const messages = getFilteredMessages().filter(msg => {
    if (isStudent) {
      return msg.senderId === currentUser?.id || 
             msg.receiverId === currentUser?.id || 
             msg.receiverId === `class-${currentUser?.class}`;
    } else {
      const isFromStudentInClass = students.some(student => student.id === msg.senderId);
      return msg.senderId === currentUser?.id || 
             (msg.receiverId === currentUser?.id && isFromStudentInClass) ||
             msg.receiverId === `class-${currentUser?.class}`;
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  useEffect(() => {
    messages.forEach(msg => {
      if (msg.receiverId === currentUser?.id && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  }, [messages, currentUser, markMessageAsRead]);

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
    if (msg.senderId === currentUser?.id) return 'You';
    
    if (isStudent) {
      const teacher = teachers.find(t => t.id === msg.senderId);
      return teacher ? `${teacher.name} (Teacher)` : 'Teacher';
    } else {
      const student = students.find(s => s.id === msg.senderId);
      return student ? `${student.name}` : 'Student';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                Messages
              </h1>
              <p className="text-gray-600 mb-4 sm:mb-0">
                {isStudent 
                  ? `Communicate with your teachers and classmates in Class ${currentUser?.class}`
                  : `Connect with students in Class ${currentUser?.class}`
                }
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className="bg-blue-100 text-blue-800">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  {messages.length} Messages
                </Badge>
              </div>
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 shadow-lg">
                  <Plus className="mr-2 h-5 w-5" />
                  New Message
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white rounded-2xl border-0 shadow-xl sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-gray-900">Send Message</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  {isStudent && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Message Type</label>
                      <Select value={messageType} onValueChange={(value: 'class' | 'individual') => setMessageType(value)}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="class">
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Class Group
                            </div>
                          </SelectItem>
                          <SelectItem value="individual">
                            <div className="flex items-center gap-2">
                              <UserIcon className="h-4 w-4" />
                              Individual Teacher
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  {messageType === 'individual' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">
                        Select {isStudent ? 'Teacher' : 'Student'}
                      </label>
                      <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                        <SelectTrigger className="bg-gray-50 border-gray-200 h-11">
                          <SelectValue placeholder={`Choose ${isStudent ? 'teacher' : 'student'}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
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
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <Textarea 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message here..."
                      rows={4}
                      className="bg-gray-50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setDialogOpen(false)}
                      className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleSendMessage}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={!newMessage.trim() || (messageType === 'individual' && !selectedRecipient)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Messages */}
        {messages.length === 0 ? (
          <Card className="bg-white shadow-lg border-0 rounded-2xl">
            <CardContent className="p-12 text-center">
              <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No messages yet</h3>
              <p className="text-gray-600 mb-6">
                Start a conversation with your {isStudent ? 'teachers or classmates' : 'students'}
              </p>
              <Button 
                onClick={() => setDialogOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3"
              >
                Send First Message
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="bg-white shadow-lg border-0 rounded-2xl overflow-hidden h-[600px] flex flex-col">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Class {currentUser?.class} Messages
                  </CardTitle>
                </CardHeader>
                
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => {
                      const isSentByCurrentUser = message.senderId === currentUser?.id;
                      const displayName = getMessageDisplayName(message);
                      
                      return (
                        <div 
                          key={message.id}
                          className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                              isSentByCurrentUser 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <p className="mb-2 break-words">{message.content}</p>
                            <div className="flex justify-between items-center text-xs opacity-75 gap-3">
                              <span className="font-medium">{displayName}</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
                
                <div className="border-t bg-gray-50 p-4">
                  <div className="flex gap-3">
                    <Textarea 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none min-h-[60px]"
                      rows={2}
                    />
                    <Button 
                      onClick={() => {
                        if (newMessage.trim()) {
                          sendMessage(newMessage, `class-${currentUser?.class}`);
                          setNewMessage('');
                        }
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 self-end"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-4">
              <Card className="bg-white shadow-lg border-0 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="bg-blue-100 rounded-full p-4 inline-flex mb-4">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">Class {currentUser?.class}</h3>
                  <p className="text-gray-600 text-sm mb-4">Secure Messaging</p>
                  <Badge className="bg-green-100 text-green-800">
                    🔒 Private & Secure
                  </Badge>
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
