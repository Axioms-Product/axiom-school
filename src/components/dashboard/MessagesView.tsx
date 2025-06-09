
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Send, 
  Search, 
  Filter,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  Pin,
  Clock,
  CheckCheck
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const MessagesView = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  // Mock conversations data
  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'teacher',
      lastMessage: 'Great work on the math assignment!',
      timestamp: '2 min ago',
      unread: 2,
      isOnline: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah'
    },
    {
      id: '2',
      name: 'Mike Wilson',
      role: 'student',
      lastMessage: 'Can you help me with the homework?',
      timestamp: '5 min ago',
      unread: 0,
      isOnline: false,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike'
    },
    {
      id: '3',
      name: 'Emma Davis',
      role: 'teacher',
      lastMessage: 'The event schedule has been updated',
      timestamp: '1 hour ago',
      unread: 1,
      isOnline: true,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma'
    }
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending logic here
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4 pb-24 md:pb-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative px-6 py-8">
            <div className="flex items-center gap-4 text-white">
              <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Messages Hub</h1>
                <p className="text-indigo-100 text-lg">
                  Stay connected with teachers and students
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="border-0 shadow-xl rounded-3xl lg:col-span-1">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-3xl">
              <CardTitle className="text-lg font-bold">Conversations</CardTitle>
              <CardDescription className="text-blue-100">
                Your recent messages
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>

              {/* Conversations */}
              <div className="max-h-[400px] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.isOnline && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          {conversation.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs h-5 w-5 rounded-full flex items-center justify-center p-0">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        
                        <Badge variant="outline" className="mt-1 text-xs capitalize">
                          {conversation.role}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="border-0 shadow-xl rounded-3xl lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-3xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversations.find(c => c.id === selectedConversation)?.avatar} />
                        <AvatarFallback>
                          {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">
                          {conversations.find(c => c.id === selectedConversation)?.name}
                        </h3>
                        <p className="text-sm text-purple-100">
                          {conversations.find(c => c.id === selectedConversation)?.isOnline ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <Pin className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0 flex flex-col h-[400px]">
                  {/* Messages Area */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-800/20">
                    <div className="space-y-4">
                      {/* Sample messages */}
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-bl-sm p-3 max-w-xs shadow-sm">
                          <p className="text-sm">Hello! How are you doing with the assignment?</p>
                          <span className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            2:30 PM
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-blue-500 text-white rounded-2xl rounded-br-sm p-3 max-w-xs shadow-sm">
                          <p className="text-sm">I'm doing well! Just finished it.</p>
                          <span className="text-xs text-blue-100 mt-1 flex items-center gap-1 justify-end">
                            <CheckCheck className="h-3 w-3" />
                            2:32 PM
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1 rounded-2xl"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="p-8 flex flex-col items-center justify-center h-full text-center">
                <div className="h-24 w-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg mb-6">
                  <MessageCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                
                <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Select a conversation
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Choose a conversation from the left to start messaging with teachers and students.
                </p>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
