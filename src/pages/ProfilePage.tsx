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
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
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
  ArrowLeft,
  Settings,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const { getStudentsForClass } = useData();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId');
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 1500);

  const students = currentUser?.role === 'teacher' ? getStudentsForClass(currentUser?.class || '') : [];

  const profileUser = useMemo(() => {
    if (studentId && currentUser?.role === 'teacher') {
      return students.find(user => user.id === studentId) || currentUser;
    }
    return currentUser;
  }, [studentId, currentUser, students]);

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

  // Calculate profile completion percentage
  const profileCompletion = useMemo(() => {
    const fields = [
      formData.name,
      formData.email,
      formData.phone,
      formData.address,
      formData.bio,
      formData.dateOfBirth,
      formData.emergencyContact,
      formData.bloodGroup,
      formData.hobbies
    ];
    
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    return Math.round((filledFields / fields.length) * 100);
  }, [formData]);

  if (isLoading) {
    return <ProfileSkeleton />;
  }

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Enhanced Header Section */}
        <div className="mb-8">
          {isViewingOtherProfile && (
            <Button
              onClick={handleBackToStudents}
              variant="outline"
              size="sm"
              className="mb-4 flex items-center gap-2 hover:bg-blue-50 border-blue-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Students
            </Button>
          )}
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {isViewingOtherProfile ? `${profileUser?.name}'s Profile` : 'My Profile'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {isViewingOtherProfile ? 'Student Information' : 'Manage your personal information'}
                  </p>
                </div>
              </div>
            </div>
            
            {!isViewingOtherProfile && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Enhanced Profile Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card with enhanced design */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <CardContent className="p-6 text-center -mt-12 relative">
                <div className="relative inline-block mb-4">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-xl mx-auto">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.id}`} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {profileUser?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && !isViewingOtherProfile && (
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-blue-600 hover:bg-blue-700 shadow-lg"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  )}
                  <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-2">{formData.name}</h2>
                <p className="text-gray-600 mb-4 break-all text-sm">{profileUser?.email}</p>
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                    {profileUser?.role}
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                    Class {profileUser?.class}
                  </Badge>
                  {profileUser?.subject && (
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {profileUser.subject}
                    </Badge>
                  )}
                </div>

                {/* Profile completion indicator */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Profile Complete</span>
                    <span className="text-sm font-bold text-blue-600">{profileCompletion}%</span>
                  </div>
                  <div className="bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${profileCompletion}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Quick Stats */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="h-5 w-5 text-orange-500" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-600 text-sm flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      Blood Group
                    </span>
                    <Badge variant="outline" className="text-red-600 border-red-200">
                      {formData.bloodGroup || 'Not set'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="text-gray-600 text-sm flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-500" />
                      Emergency Contact
                    </span>
                    <span className={`text-sm font-medium ${formData.emergencyContact ? 'text-green-600' : 'text-red-600'}`}>
                      {formData.emergencyContact ? '✓ Set' : '✗ Not set'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Details Section */}
          <div className="xl:col-span-3 space-y-6">
            {/* Personal Information with enhanced design */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    Personal Information
                  </CardTitle>
                  
                  {!isViewingOtherProfile && (
                    <div className="flex gap-3">
                      {isEditing && (
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                          className="transition-all duration-200"
                          disabled={isSaving}
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      )}
                      <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`transition-all duration-200 ${
                          isEditing ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                        }`}
                        size="sm"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : isEditing ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        ) : (
                          <>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <User className="h-4 w-4 text-blue-500" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-green-500" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-green-500 border-gray-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-purple-500" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-purple-500 border-gray-200"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-orange-500" />
                      Date of Birth
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-orange-500 border-gray-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bloodGroup" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Heart className="h-4 w-4 text-red-500" />
                      Blood Group
                    </Label>
                    <Select
                      value={formData.bloodGroup}
                      onValueChange={(value) => handleInputChange('bloodGroup', value)}
                      disabled={!isEditing || isViewingOtherProfile}
                    >
                      <SelectTrigger className="h-11 transition-all duration-200 focus:ring-2 focus:ring-red-500 border-gray-200">
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
                    <Label htmlFor="emergencyContact" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <Shield className="h-4 w-4 text-indigo-500" />
                      Emergency Contact
                    </Label>
                    <Input
                      id="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-indigo-500 border-gray-200"
                      placeholder="Emergency contact number"
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="address" className="text-sm font-semibold flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-pink-500" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-pink-500 border-gray-200"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="hobbies" className="text-sm font-semibold text-gray-700">
                      Hobbies & Interests
                    </Label>
                    <Input
                      id="hobbies"
                      value={formData.hobbies}
                      onChange={(e) => handleInputChange('hobbies', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      className="h-11 transition-all duration-200 focus:ring-2 focus:ring-blue-500 border-gray-200"
                      placeholder="e.g. Reading, Sports, Music"
                    />
                  </div>
                  
                  <div className="space-y-2 lg:col-span-2">
                    <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
                      About Me
                    </Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing || isViewingOtherProfile}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 resize-none border-gray-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Academic Information */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  Academic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <Settings className="h-6 w-6 text-blue-600" />
                      <Badge className="bg-blue-600 text-white">{profileUser?.role}</Badge>
                    </div>
                    <h3 className="font-semibold text-blue-900 mb-1">Role</h3>
                    <p className="text-blue-700 text-sm capitalize">{profileUser?.role}</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <GraduationCap className="h-6 w-6 text-purple-600" />
                      <Badge className="bg-purple-600 text-white">Class {profileUser?.class}</Badge>
                    </div>
                    <h3 className="font-semibold text-purple-900 mb-1">Class</h3>
                    <p className="text-purple-700 text-sm">Class {profileUser?.class}</p>
                  </div>
                  
                  {profileUser?.subject && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <Book className="h-6 w-6 text-green-600" />
                        <Badge className="bg-green-600 text-white">{profileUser.subject}</Badge>
                      </div>
                      <h3 className="font-semibold text-green-900 mb-1">Subject</h3>
                      <p className="text-green-700 text-sm">{profileUser.subject}</p>
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
