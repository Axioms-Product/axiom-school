
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

  // Empty conversations - no dummy data
  const conversations: any[] = [];

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
            <div className="flex justify-center">
              <div className="text-center text-white">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold mb-2">Messages Hub</h1>
                <p className="text-indigo-100 text-lg">
                  Stay connected with teachers and students
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex justify-center">
          <Card className="border-0 shadow-xl rounded-3xl max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="h-24 w-24 mx-auto bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center shadow-lg mb-6">
                <MessageCircle className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                No conversations yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start a conversation with your teachers and classmates to begin messaging.
              </p>
              
              <div className="flex justify-center">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl px-6 py-3">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start Conversation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MessagesView;
