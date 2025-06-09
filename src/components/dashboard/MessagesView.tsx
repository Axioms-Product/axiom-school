
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { format } from 'date-fns';
import { MessageCircle, Send, Users, User as UserIcon, Clock, Bell, Plus, Trash2, Star, StarOff } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredMessages, 
    sendMessage, 
    markMessageAsRead,
    getTeachersForClass,
    getStudentsForClass,
    attendanceNotifications,
    respondToAttendance
  } = useData();
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<string>('');
  const [messageType, setMessageType] = useState<'class' | 'individual'>('class');
  const [starredMessages, setStarredMessages] = useState<string[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  
  const isStudent = currentUser?.role === 'student';
  const teachers = isStudent ? getTeachersForClass(currentUser?.class || '') : [];
  const students = !isStudent ? getStudentsForClass(currentUser?.class || '') : [];
  const classStudents = isStudent ? getStudentsForClass(currentUser?.class || '') : [];
  
  // Get attendance notifications for current student
  const unrespondedNotifications = attendanceNotifications.filter(
    notification => notification.studentId === currentUser?.id && !notification.responded
  );

  // Get all messages for current user
  const allMessages = getFilteredMessages();

  useEffect(() => {
    // Load starred messages from localStorage
    const stored = localStorage.getItem('starredMessages');
    if (stored) {
      setStarredMessages(JSON.parse(stored));
    }

    // Mark messages as read when component loads
    allMessages.forEach(msg => {
      if ((msg.receiverId === currentUser?.id || 
           (msg.receiverId === `class-${currentUser?.class}` && msg.senderId !== currentUser?.id)) && 
          !msg.read) {
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

  const toggleStarMessage = (messageId: string) => {
    const newStarred = starredMessages.includes(messageId)
      ? starredMessages.filter(id => id !== messageId)
      : [...starredMessages, messageId];
    
    setStarredMessages(newStarred);
    localStorage.setItem('starredMessages', JSON.stringify(newStarred));
  };

  const deleteMessage = (messageId: string) => {
    // Implementation would depend on your data context
    console.log('Delete message:', messageId);
  };

  const getMessageDisplayName = (msg: any) => {
    if (msg.senderId === currentUser?.id) return 'You';
    
    // Check if it's from a teacher
    const teacher = teachers.find(t => t.id === msg.senderId);
    if (teacher) return `${teacher.name} (Teacher)`;
    
    // Check if it's from a student in the class
    const student = classStudents.find(s => s.id === msg.senderId);
    if (student) return student.name;
    
    // If it's a teacher viewing, check students in their class
    if (!isStudent) {
      const studentInClass = students.find(s => s.id === msg.senderId);
      if (studentInClass) return studentInClass.name;
    }
    
    return msg.senderName || 'Unknown User';
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

  const getMessageTypeDisplay = (msg: any) => {
    if (msg.receiverId.startsWith('class-')) {
      return 'Class Group';
    }
    return 'Direct Message';
  };

  const handleAttendanceResponse = (notificationId: string, response: 'confirmed' | 'disputed') => {
    respondToAttendance(notificationId, response);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5"></div>
          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-2xl">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  Messages Hub
                </h1>
                <p className="text-gray-600 text-lg">
                  {isStudent 
                    ? `Connect with teachers and classmates in Class ${currentUser?.class}`
                    : `Engage with students in Class ${currentUser?.class}`
                  }
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge className="bg-blue-100 text-blue-800 px-3 py-1">
                    Class {currentUser?.class}
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 px-3 py-1">
                    {allMessages.length} Total Messages
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 px-3 py-1">
                    {starredMessages.length} Starred
                  </Badge>
                  {isStudent && unrespondedNotifications.length > 0 && (
                    <Badge className="bg-amber-100 text-amber-800 animate-pulse px-3 py-1">
                      {unrespondedNotifications.length} Alert{unrespondedNotifications.length > 1 ? 's' : ''}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6">
                      <Plus className="h-4 w-4 mr-2" />
                      New Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Compose New Message</DialogTitle>
                      <DialogDescription>
                        Send a message to your class or an individual
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Select value={messageType} onValueChange={(value: 'class' | 'individual') => setMessageType(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class">Class Group</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {messageType === 'individual' && (
                        <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${isStudent ? 'teacher' : 'student'}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {getRecipientOptions().map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                {option.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      
                      <Textarea 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here..."
                        className="min-h-[100px]"
                      />
                      
                      <Button 
                        onClick={handleSendMessage}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                        disabled={!newMessage.trim() || (messageType === 'individual' && !selectedRecipient)}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Messages Interface */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden h-[700px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Class {currentUser?.class} Messages
                  </div>
                  <Badge className="bg-white/20 text-white">
                    {allMessages.length} messages
                  </Badge>
                </CardTitle>
              </CardHeader>
              
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-4">
                  {allMessages.length === 0 ? (
                    <div className="text-center py-16 text-gray-500">
                      <div className="bg-gray-100 rounded-full p-6 inline-flex mb-4">
                        <MessageCircle className="h-12 w-12 text-gray-400" />
                      </div>
                      <p className="text-xl font-medium mb-2">No messages yet</p>
                      <p className="text-gray-400">Start a conversation with your class!</p>
                    </div>
                  ) : (
                    allMessages.map((message) => {
                      const isSentByCurrentUser = message.senderId === currentUser?.id;
                      const displayName = getMessageDisplayName(message);
                      const messageTypeDisplay = getMessageTypeDisplay(message);
                      const isStarred = starredMessages.includes(message.id);
                      
                      return (
                        <div 
                          key={message.id}
                          className={`flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'} group`}
                        >
                          <div 
                            className={`max-w-[85%] rounded-2xl p-4 shadow-sm relative ${
                              isSentByCurrentUser 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                                : 'bg-white border border-gray-200 text-gray-900'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-xs font-medium ${
                                    isSentByCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {displayName}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Badge 
                                      className={`text-xs ${
                                        isSentByCurrentUser 
                                          ? 'bg-white/20 text-white' 
                                          : message.receiverId.startsWith('class-') 
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-blue-100 text-blue-700'
                                      }`}
                                    >
                                      {messageTypeDisplay}
                                    </Badge>
                                  </div>
                                </div>
                                <p className="break-words leading-relaxed">{message.content}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs opacity-75">
                                <Clock className="h-3 w-3" />
                                <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
                              </div>
                              
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className={`h-6 w-6 p-0 ${isSentByCurrentUser ? 'text-white hover:bg-white/20' : 'text-gray-600 hover:bg-gray-100'}`}
                                  onClick={() => toggleStarMessage(message.id)}
                                >
                                  {isStarred ? <Star className="h-3 w-3 fill-current" /> : <StarOff className="h-3 w-3" />}
                                </Button>
                                
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className={`h-6 w-6 p-0 ${isSentByCurrentUser ? 'text-white hover:bg-white/20' : 'text-gray-600 hover:bg-gray-100'}`}
                                      onClick={() => setSelectedMessage(message)}
                                    >
                                      <MessageCircle className="h-3 w-3" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Message Details</DialogTitle>
                                      <VisuallyHidden>
                                        <DialogDescription>
                                          View detailed information about this message
                                        </DialogDescription>
                                      </VisuallyHidden>
                                    </DialogHeader>
                                    {selectedMessage && (
                                      <div className="space-y-4">
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">From</label>
                                          <p className="text-gray-900">{getMessageDisplayName(selectedMessage)}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">Type</label>
                                          <p className="text-gray-900">{getMessageTypeDisplay(selectedMessage)}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">Sent</label>
                                          <p className="text-gray-900">{format(new Date(selectedMessage.timestamp), 'MMMM d, yyyy at h:mm a')}</p>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-gray-500">Message</label>
                                          <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedMessage.content}</p>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </ScrollArea>
              
              {/* Quick Message Input */}
              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-3">
                  <Textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Quick message to class..."
                    className="flex-1 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none min-h-[50px]"
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        if (newMessage.trim()) {
                          sendMessage(newMessage, `class-${currentUser?.class}`);
                          setNewMessage('');
                        }
                      }
                    }}
                  />
                  <Button 
                    onClick={() => {
                      if (newMessage.trim()) {
                        sendMessage(newMessage, `class-${currentUser?.class}`);
                        setNewMessage('');
                      }
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 self-end"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl border-0 rounded-2xl">
              <CardContent className="p-6 text-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-4 inline-flex mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-lg">Class {currentUser?.class}</h3>
                <p className="text-gray-600 text-sm mb-4">Secure Messaging Hub</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-blue-600">{allMessages.length}</p>
                    <p className="text-xs text-gray-500">Messages</p>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-2xl font-bold text-purple-600">{starredMessages.length}</p>
                    <p className="text-xs text-gray-500">Starred</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Class Members */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Class Members
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Teachers ({teachers.length})
                    </h4>
                    <div className="space-y-2">
                      {teachers.map(teacher => (
                        <div key={teacher.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-50 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {teacher.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{teacher.name}</p>
                            <p className="text-xs text-gray-500">{teacher.subject}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Students ({isStudent ? classStudents.length - 1 : students.length})
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {(isStudent ? classStudents.filter(s => s.id !== currentUser?.id) : students).map(student => (
                        <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors">
                          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-white">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{student.name}</p>
                            <p className="text-xs text-gray-500">Student</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
