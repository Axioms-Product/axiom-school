
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Book, Save, Edit, Camera, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '+91 9876543210',
    address: '123 Main Street, Delhi, India',
    bio: 'Passionate about learning and education. Always striving for excellence.',
    dateOfBirth: '2005-06-15',
    emergencyContact: '+91 9876543211',
    bloodGroup: 'O+',
    hobbies: 'Reading, Sports, Music'
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically save the data to your backend
      console.log('Saving profile data:', formData);
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    setFormData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: '+91 9876543210',
      address: '123 Main Street, Delhi, India',
      bio: 'Passionate about learning and education. Always striving for excellence.',
      dateOfBirth: '2005-06-15',
      emergencyContact: '+91 9876543211',
      bloodGroup: 'O+',
      hobbies: 'Reading, Sports, Music'
    });
    setIsEditing(false);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 overflow-y-auto">
      <div className="max-w-2xl mx-auto space-y-3">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">My Profile</h1>
          <p className="text-gray-600 text-xs">Manage your personal information</p>
        </div>

        {/* Profile Overview */}
        <Card className="bg-white shadow-md border-0 rounded-xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-4">
            <div className="flex flex-col items-center">
              <div className="relative">
                <Avatar className="h-14 w-14 mb-2 border-3 border-white shadow-lg">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.id}`} />
                  <AvatarFallback className="bg-white text-blue-600 text-base font-bold">
                    {currentUser?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full p-0 bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                )}
              </div>
              <CardTitle className="text-lg font-bold">{formData.name}</CardTitle>
              <div className="flex gap-1.5 mt-2 flex-wrap justify-center">
                <Badge className="bg-white/20 text-white text-xs px-2 py-0.5">
                  Class {currentUser?.class}
                </Badge>
                <Badge className="bg-white/20 text-white capitalize text-xs px-2 py-0.5">
                  {currentUser?.role}
                </Badge>
                {currentUser?.subject && (
                  <Badge className="bg-white/20 text-white text-xs px-2 py-0.5">
                    {currentUser.subject}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white shadow-md border-0 rounded-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4 text-blue-600" />
              Personal Information
            </CardTitle>
            <div className="flex gap-1.5">
              {isEditing && (
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs px-2"
                  disabled={isSaving}
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </Button>
              )}
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={`h-7 text-xs px-2 ${isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                size="sm"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                    Saving...
                  </>
                ) : isEditing ? (
                  <>
                    <Check className="h-3 w-3 mr-1" />
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
          <CardContent className="p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs font-medium">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="dateOfBirth" className="text-xs font-medium">Date of Birth</Label>
                <div className="relative">
                  <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="bloodGroup" className="text-xs font-medium">Blood Group</Label>
                <Select
                  value={formData.bloodGroup}
                  onValueChange={(value) => handleInputChange('bloodGroup', value)}
                  disabled={!isEditing}
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="emergencyContact" className="text-xs font-medium">Emergency Contact</Label>
                <div className="relative">
                  <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    id="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="address" className="text-xs font-medium">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-2 top-2 h-3 w-3 text-gray-400" />
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className="pl-7 h-8 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="hobbies" className="text-xs font-medium">Hobbies & Interests</Label>
                <Input
                  id="hobbies"
                  value={formData.hobbies}
                  onChange={(e) => handleInputChange('hobbies', e.target.value)}
                  disabled={!isEditing}
                  className="h-8 text-xs"
                  placeholder="e.g. Reading, Sports, Music"
                />
              </div>
              
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="bio" className="text-xs font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={2}
                  className="text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Information */}
        <Card className="bg-white shadow-md border-0 rounded-xl">
          <CardHeader className="pb-3 px-3 pt-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4 text-purple-600" />
              Academic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 text-xs">Role</span>
                <Badge className="capitalize text-xs">{currentUser?.role}</Badge>
              </div>
              <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-700 text-xs">Class</span>
                <Badge className="text-xs">Class {currentUser?.class}</Badge>
              </div>
              {currentUser?.subject && (
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 text-xs">Subject</span>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">
                    <Book className="h-2 w-2 mr-1" />
                    {currentUser.subject}
                  </Badge>
                </div>
              )}
              {currentUser?.rollNo && (
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700 text-xs">Roll Number</span>
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
