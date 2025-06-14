
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { MessageSquare, Send, User, Clock, Mail, Users } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { 
    getFilteredMessages, 
    sendMessage, 
    markMessageAsRead, 
    getStudentsForClass, 
    getTeachersForClass 
  } = useData();
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  
  const messages = getFilteredMessages();
  const students = getStudentsForClass(currentUser?.class || '');
  const teachers = getTeachersForClass(currentUser?.class || '');
  
  const isStudent = currentUser?.role === 'student';
  const recipients = isStudent ? teachers : students;

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedReceiver) {
      sendMessage(newMessage, selectedReceiver);
      setNewMessage('');
      setSelectedReceiver('');
    }
  };

  const handleMessageClick = (messageId: string) => {
    markMessageAsRead(messageId);
  };

  const unreadCount = messages.filter(msg => 
    msg.receiverId === currentUser?.id && !msg.read
  ).length;

  const recentMessages = messages.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-1">Messages</h1>
                  <p className="text-blue-100">
                    {isStudent ? 'Communicate with your teachers' : 'Connect with your students'}
                  </p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                <div className="text-2xl font-bold">{unreadCount}</div>
                <div className="text-sm opacity-90">Unread</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-blue-600">{messages.length}</p>
                  <p className="text-xs text-gray-500">Messages</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Unread</p>
                  <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
                  <p className="text-xs text-gray-500">New</p>
                </div>
                <div className="bg-orange-100 rounded-lg p-3">
                  <MessageSquare className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Contacts</p>
                  <p className="text-2xl font-bold text-green-600">{recipients.length}</p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Sent</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {messages.filter(msg => msg.senderId === currentUser?.id).length}
                  </p>
                  <p className="text-xs text-gray-500">By you</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <Send className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send Message */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Send to:
                </label>
                <select
                  value={selectedReceiver}
                  onChange={(e) => setSelectedReceiver(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                >
                  <option value="">Select recipient...</option>
                  {recipients.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name} ({person.role})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message:
                </label>
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !selectedReceiver}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 h-12"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Message List */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {messages.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                  <p className="text-gray-600">
                    Start a conversation by sending your first message.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {recentMessages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => handleMessageClick(message.id)}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        message.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.senderId === currentUser?.id ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <span className="font-medium text-gray-900 text-sm">
                              {message.senderId === currentUser?.id ? 'You' : message.senderName}
                            </span>
                            {!message.read && message.receiverId === currentUser?.id && (
                              <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock className="h-3 w-3" />
                          {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* All Messages */}
        {messages.length > 5 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                All Messages ({messages.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {messages.slice(5).map((message) => (
                  <div 
                    key={message.id}
                    onClick={() => handleMessageClick(message.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      message.read ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900 text-sm">
                        {message.senderId === currentUser?.id ? 'You' : message.senderName}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm truncate">{message.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MessagesView;
