
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { MessageSquare, Send, User, Clock } from 'lucide-react';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMessages, users, addMessage } = useData();
  const [newMessage, setNewMessage] = useState({ receiverId: '', subject: '', content: '' });

  const messages = getFilteredMessages();
  
  const handleSendMessage = () => {
    if (newMessage.receiverId && newMessage.subject && newMessage.content) {
      addMessage({
        senderId: currentUser?.id || '',
        receiverId: newMessage.receiverId,
        subject: newMessage.subject,
        content: newMessage.content,
        timestamp: new Date().toISOString(),
        read: false
      });
      setNewMessage({ receiverId: '', subject: '', content: '' });
    }
  };

  const availableUsers = users.filter(user => user.id !== currentUser?.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-gray-600">Send and receive messages with your classmates and teachers</p>
        </div>

        {/* Send New Message */}
        <Card className="bg-white shadow-lg border-0 rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send New Message
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">To</label>
                <Select value={newMessage.receiverId} onValueChange={(value) => setNewMessage({...newMessage, receiverId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Subject</label>
                <Input
                  placeholder="Message subject"
                  value={newMessage.subject}
                  onChange={(e) => setNewMessage({...newMessage, subject: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <label className="text-sm font-medium text-gray-700">Message</label>
              <Textarea
                placeholder="Type your message here..."
                value={newMessage.content}
                onChange={(e) => setNewMessage({...newMessage, content: e.target.value})}
                rows={4}
              />
            </div>
            <div className="text-center">
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Messages List */}
        <Card className="bg-white shadow-lg border-0 rounded-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-xl">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Your Messages
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Start a conversation by sending your first message!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => {
                  const sender = users.find(u => u.id === message.senderId);
                  const receiver = users.find(u => u.id === message.receiverId);
                  const isReceived = message.receiverId === currentUser?.id;
                  
                  return (
                    <div key={message.id} className={`p-4 rounded-lg border-l-4 ${
                      isReceived 
                        ? 'bg-blue-50 border-l-blue-500' 
                        : 'bg-green-50 border-l-green-500'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-900">
                            {isReceived ? `From: ${sender?.name}` : `To: ${receiver?.name}`}
                          </span>
                          <Badge variant={isReceived ? "default" : "secondary"}>
                            {isReceived ? 'Received' : 'Sent'}
                          </Badge>
                          {!message.read && isReceived && (
                            <Badge className="bg-red-500 text-white">New</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          {new Date(message.timestamp).toLocaleDateString()}
                        </div>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{message.subject}</h4>
                      <p className="text-gray-700">{message.content}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MessagesView;
