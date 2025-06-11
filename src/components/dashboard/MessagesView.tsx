
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { MessageSquare, Send, User, Clock } from 'lucide-react';

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
  
  // Combine teachers and students for recipient list
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">
            {isStudent ? 'Communicate with your teachers' : 'Connect with your students'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send Message */}
          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send New Message
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full"
                />
              </div>
              
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || !selectedReceiver}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Message List */}
          <Card className="bg-white shadow-lg border-0 rounded-xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl">
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
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => handleMessageClick(message.id)}
                      className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                        message.read ? 'border-gray-300 bg-gray-50' : 'border-blue-500 bg-blue-50'
                      } hover:shadow-md`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {message.senderId === currentUser?.id ? 'You' : message.senderName}
                          </span>
                          {!message.read && message.receiverId === currentUser?.id && (
                            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500 text-sm">
                          <Clock className="h-3 w-3" />
                          {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
