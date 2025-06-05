
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, Users, User as UserIcon, Clock } from 'lucide-react';

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
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [messageType, setMessageType] = useState<'class' | 'individual'>('class');
  
  const isStudent = currentUser?.role === 'student';
  const teachers = isStudent ? getTeachersForClass(currentUser?.class || '') : [];
  const students = !isStudent ? getStudentsForClass(currentUser?.class || '') : [];
  
  // Get all messages for current user (including class messages and individual messages)
  const allMessages = getFilteredMessages().filter(msg => {
    // For students: show messages sent to them, sent by them, or class messages
    if (isStudent) {
      return msg.senderId === currentUser?.id || 
             msg.receiverId === currentUser?.id || 
             msg.receiverId === `class-${currentUser?.class}`;
    } else {
      // For teachers: show messages from their class students, sent by them, or class messages
      const isFromStudentInClass = students.some(student => student.id === msg.senderId);
      return msg.senderId === currentUser?.id || 
             (msg.receiverId === currentUser?.id && isFromStudentInClass) ||
             msg.receiverId === `class-${currentUser?.class}` ||
             (msg.senderId === currentUser?.id && msg.receiverId.startsWith('class-'));
    }
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  useEffect(() => {
    // Mark messages as read when component loads
    allMessages.forEach(msg => {
      if ((msg.receiverId === currentUser?.id || msg.receiverId === `class-${currentUser?.class}`) && !msg.read) {
        markMessageAsRead(msg.id);
      }
    });
  }, [allMessages, currentUser, markMessageAsRead]);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                Messages
              </h1>
              <p className="text-gray-600">
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
                  {allMessages.length} Messages
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl overflow-hidden h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Class {currentUser?.class} Messages
                </CardTitle>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {allMessages.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">No messages yet</p>
                      <p>Start a conversation below!</p>
                    </div>
                  ) : (
                    allMessages.map((message) => {
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
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                                : 'bg-white border border-gray-200 text-gray-900'
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
                    })
                  )}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="border-t bg-gray-50 p-4">
                <div className="space-y-3">
                  {/* Message Type Selection */}
                  <div className="flex gap-2">
                    <Select value={messageType} onValueChange={(value: 'class' | 'individual') => setMessageType(value)}>
                      <SelectTrigger className="w-40 bg-white border-gray-200 h-10">
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
                            Individual
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    
                    {messageType === 'individual' && (
                      <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                        <SelectTrigger className="flex-1 bg-white border-gray-200 h-10">
                          <SelectValue placeholder={`Select ${isStudent ? 'teacher' : 'student'}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {getRecipientOptions().map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                              {option.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  {/* Message Input */}
                  <div className="flex gap-3">
                    <Textarea 
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none min-h-[60px]"
                      rows={2}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl px-6 self-end"
                      disabled={!newMessage.trim() || (messageType === 'individual' && !selectedRecipient)}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
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
            
            {/* Online Users */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">
                  {isStudent ? 'Teachers' : 'Students'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {isStudent ? (
                    teachers.map(teacher => (
                      <div key={teacher.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {teacher.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{teacher.name}</p>
                          <p className="text-xs text-gray-500">{teacher.subject}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    students.slice(0, 5).map(student => (
                      <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-green-600">
                            {student.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-gray-500">Student</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
