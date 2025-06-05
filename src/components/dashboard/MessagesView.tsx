
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
import { MessageCircle, Send, Users, User as UserIcon, Clock, Bell } from 'lucide-react';

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
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Attendance Notifications for Students */}
        {isStudent && unrespondedNotifications.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-xl shadow-lg">
            <div className="flex items-center mb-3">
              <Bell className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-lg font-semibold text-amber-800">Attendance Notifications</h3>
            </div>
            <div className="space-y-3">
              {unrespondedNotifications.map((notification) => (
                <div key={notification.id} className="bg-white rounded-lg p-4 border border-amber-200">
                  <p className="text-gray-800 mb-3">
                    <span className="font-medium">{notification.teacherName}</span> marked you as{' '}
                    <span className={`font-medium ${
                      notification.status === 'present' ? 'text-green-600' : 
                      notification.status === 'absent' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {notification.status}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAttendanceResponse(notification.id, 'confirmed')}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAttendanceResponse(notification.id, 'disputed')}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Dispute
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border border-blue-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                Messages
              </h1>
              <p className="text-gray-600">
                {isStudent 
                  ? `Communicate with teachers and classmates in Class ${currentUser?.class}`
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
                {isStudent && unrespondedNotifications.length > 0 && (
                  <Badge className="bg-amber-100 text-amber-800 animate-pulse">
                    {unrespondedNotifications.length} Attendance Alert{unrespondedNotifications.length > 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden h-[600px] flex flex-col">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
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
                      const messageTypeDisplay = getMessageTypeDisplay(message);
                      
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
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className={`text-xs font-medium ${
                                  isSentByCurrentUser ? 'text-blue-100' : 'text-gray-500'
                                }`}>
                                  {displayName}
                                </span>
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
                              <p className="break-words">{message.content}</p>
                            </div>
                            <div className="flex items-center gap-1 text-xs opacity-75">
                              <Clock className="h-3 w-3" />
                              <span>{format(new Date(message.timestamp), 'MMM d, h:mm a')}</span>
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
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 self-end"
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
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
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
            
            {/* Class Members */}
            <Card className="bg-white shadow-xl border-0 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Class Members</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Teachers</h4>
                    <div className="space-y-2">
                      {teachers.map(teacher => (
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
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">
                      Students ({isStudent ? classStudents.length - 1 : students.length})
                    </h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {(isStudent ? classStudents.filter(s => s.id !== currentUser?.id) : students).map(student => (
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
