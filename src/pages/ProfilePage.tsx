
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  GraduationCap, 
  Book, 
  Edit, 
  Camera, 
  Check, 
  X, 
  LogOut,
  Heart,
  Shield,
  Award,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const { users } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Determine which user profile to show
  const profileUser = useMemo(() => {
    if (studentId && currentUser?.role === 'teacher') {
      return users.find(user => user.id === studentId) || currentUser;
    }
    return currentUser;
  }, [studentId, currentUser, users]);

  const isViewingOtherProfile = studentId && currentUser?.role === 'teacher' && profileUser?.id !== currentUser?.id;

  const [formData, setFormData] = useState({
    name: profileUser?.name || '',
    email: profileUser?.email || '',
    phone: profileUser?.phone || '',
    address: profileUser?.address || '',
    bio: profileUser?.bio || '',
    dateOfBirth: profileUser?.dateOfBirth || '',
    emergencyContact: profileUser?.emergencyContact || '',
    bloodGroup: profileUser?.bloodGroup || '',
    hobbies: profileUser?.hobbies || ''
  });

  const handleSave = async () => {
    if (!updateUserProfile || isViewingOtherProfile) return;
    
    setIsSaving(true);
    try {
      await updateUserProfile(formData);
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
      name: profileUser?.name || '',
      email: profileUser?.email || '',
      phone: profileUser?.phone || '',
      address: profileUser?.address || '',
      bio: profileUser?.bio || '',
      dateOfBirth: profileUser?.dateOfBirth || '',
      emergencyContact: profileUser?.emergencyContact || '',
      bloodGroup: profileUser?.bloodGroup || '',
      hobbies: profileUser?.hobbies || ''
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleBackToStudents = () => {
    navigate('/dashboard/students');
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section - Mobile Optimized */}
        <div className="flex flex-col space-y-3 sm:space-y-4">
          {isViewingOtherProfile && (
            <Button
              onClick={handleBackToStudents}
              variant="outline"
              size="sm"
              className="self-start flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </Button>
          )}
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
            <div className="w-full sm:w-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                {isViewingOtherProfile ? `${profileUser?.name}'s Profile` : 'Profile Settings'}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {isViewingOtherProfile ? 'View student information' : 'Manage your personal information and preferences'}
              </p>
            </div>
            
            {!isViewingOtherProfile && (
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full sm:w-auto text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Mobile-First Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Profile Overview - Mobile Optimized */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Profile Card */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6 text-center">
                <div className="relative inline-block mb-3 sm:mb-4">
                  <Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-white shadow-lg mx-auto">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.id}`} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl sm:text-2xl font-bold">
                      {profileUser?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && !isViewingOtherProfile && (
                    <Button
                      size="sm"
                      className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 h-7 w-7 sm:h-8 sm:w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
                    >
                      <Camera className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{formData.name}</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 break-all">{profileUser?.email}</p>
                <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs sm:text-sm">
                    {profileUser?.role}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs sm:text-sm">
                    Class {profileUser?.class}
                  </Badge>
                  {profileUser?.subject && (
                    <Badge className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm">
                      {profileUser.subject}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  Quick Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">Blood Group</span>
                  <Badge variant="outline" className="text-red-600 border-red-200 text-xs">
                    {formData.bloodGroup || 'Not set'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">Emergency Contact</span>
                  <span className="text-xs sm:text-sm font-medium">
                    {formData.emergencyContact ? '✓ Set' : '✗ Not set'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-xs sm:text-sm">Date of Birth</span>
                  <span className="text-xs sm:text-sm font-medium">
                    {formData.dateOfBirth ? '✓ Set' : '✗ Not set'}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details Section - Mobile Optimized */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Personal Information */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  Personal Information
                </CardTitle>
                
                {!isViewingOtherProfile && (
                  <div className="flex gap-2 w-full sm:w-auto">
                    {isEditing && (
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                        className="flex-1 sm:flex-none transition-all duration-200 text-xs sm:text-sm"
                        disabled={isSaving}
                      >
                        <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        Cancel
                      </Button>
                    )}
                    <Button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className={`flex-1 sm:flex-none transition-all duration-200 text-xs sm:text-sm ${
                        isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      size="sm"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-1"></div>
                          Saving...
                        </>
                      ) : isEditing ? (
                        <>
                          <Check className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Save Changes
                        </>
                      ) : (
                        <>
                          <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Edit Profile
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Blood Group
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(value) => handleInputChange('bloodGroup', value)}
                      disabled={!isEditing || isViewingOtherProfile}
                    >
                      <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm">
                        <SelectValue placeholder="Select blood group" />
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

                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Emergency contact number"
                    />
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address" className="text-xs sm:text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="hobbies" className="text-xs sm:text-sm font-medium">
                      Hobbies & Interests
                    </Label>
                    <Input
                      id="hobbies"
                      value={formData.hobbies}
                      onChange={(e) => handleInputChange('hobbies', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="e.g. Reading, Sports, Music"
                    />
                  </div>
                  
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="bio" className="text-xs sm:text-sm font-medium">
                      About Me
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Academic Information */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-blue-900 text-sm">Role</span>
                      <Badge className="bg-blue-600 text-white capitalize text-xs">{profileUser?.role}</Badge>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-purple-900 text-sm">Class</span>
                      <Badge className="bg-purple-600 text-white text-xs">Class {profileUser?.class}</Badge>
                    </div>
                  </div>
                  {profileUser?.subject && (
                    <div className="p-3 sm:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-green-900 flex items-center gap-2 text-sm">
                          <Book className="h-3 w-3 sm:h-4 sm:w-4" />
                          Subject
                        </span>
                        <Badge className="bg-green-600 text-white text-xs">
                          {profileUser.subject}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
