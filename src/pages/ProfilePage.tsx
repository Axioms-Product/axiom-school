
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, Users, Edit } from 'lucide-react';
import { useState } from 'react';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!currentUser) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900 p-4 pb-24 md:pb-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
          
          <div className="relative px-6 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex items-center gap-6 text-white">
                <Avatar className="h-24 w-24 border-4 border-white/30 shadow-2xl">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.id}`} />
                  <AvatarFallback className="bg-white/20 text-white text-2xl font-bold">
                    {currentUser.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <h1 className="text-4xl font-bold mb-2">{currentUser.name}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                      <User className="h-4 w-4 mr-1" />
                      {currentUser.role}
                    </Badge>
                    <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                      <GraduationCap className="h-4 w-4 mr-1" />
                      Class {currentUser.class}
                    </Badge>
                    {currentUser.subject && (
                      <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm px-3 py-1">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {currentUser.subject}
                      </Badge>
                    )}
                  </div>
                  <p className="text-indigo-100 text-lg">
                    {currentUser.role === 'teacher' 
                      ? `Teaching ${currentUser.subject} • Class ${currentUser.class}`
                      : `Student in Class ${currentUser.class}`
                    }
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 px-6 py-3 rounded-xl shadow-lg"
              >
                <Edit className="mr-2 h-5 w-5" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card className="border-0 shadow-xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-3xl">
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-6 w-6" />
                Personal Information
              </CardTitle>
              <CardDescription className="text-blue-100">
                Your basic profile details
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  value={currentUser.name}
                  disabled={!isEditing}
                  className="rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={currentUser.email}
                    disabled={!isEditing}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="Enter phone number"
                    disabled={!isEditing}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder="Enter address"
                    disabled={!isEditing}
                    className="pl-10 rounded-xl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="border-0 shadow-xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-t-3xl">
              <CardTitle className="flex items-center gap-2 text-xl">
                <GraduationCap className="h-6 w-6" />
                Academic Information
              </CardTitle>
              <CardDescription className="text-purple-100">
                Your academic details and role
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Role</Label>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="capitalize font-medium">{currentUser.role}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Class</Label>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="font-medium">Class {currentUser.class}</span>
                </div>
              </div>
              
              {currentUser.subject && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Subject</Label>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="font-medium">{currentUser.subject}</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Member Since</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <div className="pl-10 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <span className="font-medium">September 2024</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        {isEditing && (
          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 rounded-xl"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => setIsEditing(false)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
