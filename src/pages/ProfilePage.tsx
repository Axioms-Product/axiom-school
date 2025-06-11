
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Book, Save, Edit } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    bio: '',
    dateOfBirth: ''
  });

  const handleSave = () => {
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', formData);
    setIsEditing(false);
    // You can add actual save functionality here when backend is ready
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    // Reset form data to original values
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '',
      address: '',
      bio: '',
      dateOfBirth: ''
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 md:p-4 overflow-y-auto">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">My Profile</h1>
          <p className="text-gray-600 text-sm">Manage your personal information</p>
        </div>

        {/* Profile Overview */}
        <Card className="bg-white shadow-lg border-0 rounded-lg overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-6">
            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16 mb-3 border-4 border-white shadow-lg">
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
                <AvatarFallback className="bg-white text-blue-600 text-lg font-bold">
                  {currentUser?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl font-bold">{currentUser?.name}</CardTitle>
              <div className="flex gap-2 mt-2 flex-wrap justify-center">
                <Badge className="bg-white/20 text-white text-xs">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-white/20 text-white capitalize text-xs">
                  {currentUser?.role}
                </Badge>
                {currentUser?.subject && (
                  <Badge className="bg-white/20 text-white text-xs">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white shadow-lg border-0 rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="h-4 w-4 text-blue-600" />
              Personal Information
            </CardTitle>
            <div className="flex gap-2">
              {isEditing && (
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`text-xs ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                size="sm"
              >
                {isEditing ? (
                  <>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-sm"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-sm">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-sm"
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio" className="text-sm">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={3}
                  className="text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card className="bg-white shadow-lg border-0 rounded-lg">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 text-sm">Role</span>
                <Badge className="capitalize text-xs">{currentUser?.role}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 text-sm">Class</span>
                <Badge className="text-xs">Class {currentUser?.class}</Badge>
              </div>
              {currentUser?.subject && (
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 text-sm">Subject</span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Book className="h-2 w-2 mr-1" />
                    {currentUser.subject}
                  </Badge>
                </div>
              )}
              {currentUser?.rollNo && (
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 text-sm">Roll Number</span>
                  <Badge className="text-xs">{currentUser.rollNo}</Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
