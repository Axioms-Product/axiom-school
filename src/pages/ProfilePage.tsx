import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { 
  User, Mail, Phone, School, Book, MapPin, Clock, LogOut, 
  Edit3, Save, X, Plus, Calendar, Award, Users, BookOpen,
  GraduationCap, Star, Target, MessageSquare
} from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const { getStudentsForClass } = useData();
  const [searchParams] = useSearchParams();
  const studentId = searchParams.get('studentId');
  
  // Get the profile to display (either current user or specific student)
  const profileUser = studentId 
    ? getStudentsForClass(currentUser?.class || '').find(s => s.id === studentId) || currentUser
    : currentUser;
  
  const isViewingOtherProfile = studentId && studentId !== currentUser?.id;
  const canEdit = !isViewingOtherProfile;

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [formData, setFormData] = useState({
    name: profileUser?.name || '',
    email: profileUser?.email || '',
    phone: profileUser?.phone || '',
    address: profileUser?.address || '',
    bio: profileUser?.bio || '',
    emergencyContact: profileUser?.emergencyContact || ''
  });
  const [newQualification, setNewQualification] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [loading, setLoading] = useState(false);

  // Update form data when profileUser changes
  useEffect(() => {
    if (profileUser) {
      setFormData({
        name: profileUser.name || '',
        email: profileUser.email || '',
        phone: profileUser.phone || '',
        address: profileUser.address || '',
        bio: profileUser.bio || '',
        emergencyContact: profileUser.emergencyContact || ''
      });
    }
  }, [profileUser]);

  const calculateYearsInSchool = () => {
    if (!profileUser?.joiningDate) return 0;
    return Math.floor((new Date().getTime() - new Date(profileUser.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    
    setLoading(true);
    
    try {
      if (updateUserProfile) {
        await updateUserProfile(formData);
        toast.success('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addQualification = async () => {
    if (!newQualification.trim() || !updateUserProfile || !canEdit) return;
    
    try {
      const updatedQualifications = [...(currentUser?.qualifications || []), newQualification];
      await updateUserProfile({ qualifications: updatedQualifications });
      setNewQualification('');
      toast.success('Qualification added');
    } catch (error) {
      toast.error('Failed to add qualification');
    }
  };

  const addAchievement = async () => {
    if (!newAchievement.trim() || !updateUserProfile || !canEdit) return;
    
    try {
      const updatedAchievements = [...(currentUser?.achievements || []), newAchievement];
      await updateUserProfile({ achievements: updatedAchievements });
      setNewAchievement('');
      toast.success('Achievement added');
    } catch (error) {
      toast.error('Failed to add achievement');
    }
  };

  const removeQualification = async (index: number) => {
    if (!updateUserProfile || !canEdit) return;
    
    try {
      const updatedQualifications = currentUser?.qualifications?.filter((_, i) => i !== index) || [];
      await updateUserProfile({ qualifications: updatedQualifications });
      toast.success('Qualification removed');
    } catch (error) {
      toast.error('Failed to remove qualification');
    }
  };

  const removeAchievement = async (index: number) => {
    if (!updateUserProfile || !canEdit) return;
    
    try {
      const updatedAchievements = currentUser?.achievements?.filter((_, i) => i !== index) || [];
      await updateUserProfile({ achievements: updatedAchievements });
      toast.success('Achievement removed');
    } catch (error) {
      toast.error('Failed to remove achievement');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto max-w-6xl py-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isViewingOtherProfile ? `${profileUser?.name}'s Profile` : 'Profile Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isViewingOtherProfile ? 'View student information' : 'Manage your account and preferences'}
          </p>
        </div>
        <div className="flex gap-2">
          {!isEditing && canEdit && (
            <Button 
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-3xl">{profileUser?.name?.charAt(0)}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <div className="h-3 w-3 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold">{profileUser?.name}</h2>
                <p className="text-sm text-muted-foreground">@{profileUser?.username}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={profileUser?.role === 'teacher' ? 'default' : 'secondary'}>
                    {profileUser?.role === 'teacher' ? 'Teacher' : 'Student'}
                  </Badge>
                  <Badge variant="outline">Class {profileUser?.class}</Badge>
                </div>
                
                {profileUser?.role === 'teacher' && profileUser?.subject && (
                  <div className="mt-2 px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    {profileUser.subject}
                  </div>
                )}
                
                {!isViewingOtherProfile && (
                  <div className="w-full mt-6 space-y-2">
                    <Button 
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* School Information */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">School Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Mon-Sat, 7 AM to 4 PM</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">Bhabua, Bihar 821101</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">+91 8092710478</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-sm">axiomsproduct@gmail.com</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                Personal Information
              </CardTitle>
              {isEditing && canEdit && (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: profileUser?.name || '',
                        email: profileUser?.email || '',
                        phone: profileUser?.phone || '',
                        address: profileUser?.address || '',
                        bio: profileUser?.bio || '',
                        emergencyContact: profileUser?.emergencyContact || ''
                      });
                    }}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing && canEdit ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter your full address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Full Name</Label>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        <p>{profileUser?.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Username</Label>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        <p>@{profileUser?.username}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Email</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-blue-500" />
                        <p>{profileUser?.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Phone</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-blue-500" />
                        <p>{profileUser?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Role</Label>
                      <div className="flex items-center">
                        <School className="h-4 w-4 mr-2 text-blue-500" />
                        <p className="capitalize">{profileUser?.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Class</Label>
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-blue-500" />
                        <p>Class {profileUser?.class}</p>
                      </div>
                    </div>

                    {profileUser?.joiningDate && (
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">Joining Date</Label>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          <p>{new Date(profileUser.joiningDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Emergency Contact</Label>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-red-500" />
                        <p>{profileUser?.emergencyContact || 'Not provided'}</p>
                      </div>
                    </div>
                  </div>
                  
                  {profileUser?.address && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Address</Label>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                        <p>{profileUser.address}</p>
                      </div>
                    </div>
                  )}
                  
                  {profileUser?.bio && (
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Bio</Label>
                      <div className="flex items-start">
                        <MessageSquare className="h-4 w-4 mr-2 text-blue-500 mt-1" />
                        <p className="text-sm leading-relaxed">{profileUser.bio}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Academic Information for Teachers */}
          {profileUser?.role === 'teacher' && (
            <>
              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-purple-600" />
                    Qualifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profileUser?.qualifications && profileUser.qualifications.length > 0 ? (
                        profileUser.qualifications.map((qual, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center gap-1">
                            {qual}
                            {canEdit && (
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                                onClick={() => removeQualification(index)}
                              />
                            )}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No qualifications added yet</p>
                      )}
                    </div>
                    
                    {canEdit && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add a qualification (e.g., M.Sc. Mathematics)"
                          value={newQualification}
                          onChange={(e) => setNewQualification(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addQualification()}
                        />
                        <Button onClick={addQualification} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {profileUser?.achievements && profileUser.achievements.length > 0 ? (
                        profileUser.achievements.map((achievement, index) => (
                          <Badge key={index} variant="outline" className="flex items-center gap-1 border-yellow-200 text-yellow-700">
                            <Star className="h-3 w-3" />
                            {achievement}
                            {canEdit && (
                              <X 
                                className="h-3 w-3 cursor-pointer hover:text-red-500" 
                                onClick={() => removeAchievement(index)}
                              />
                            )}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-muted-foreground text-sm">No achievements added yet</p>
                      )}
                    </div>
                    
                    {canEdit && (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Add an achievement (e.g., Best Teacher Award 2025)"
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                        />
                        <Button onClick={addAchievement} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Teaching Information */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Teaching Information
                  </CardTitle>
                  {canEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsEditingExperience(!isEditingExperience)}
                    >
                      <Edit3 className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Subject Teaching</Label>
                        <p className="font-medium">{profileUser.subject || 'No subject assigned'}</p>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Class Assignment</Label>
                        <p className="font-medium">Class {profileUser.class}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-muted-foreground text-sm">Teaching Experience</Label>
                        {isEditingExperience && canEdit ? (
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="Years of experience"
                              defaultValue={calculateYearsInSchool().toString()}
                              className="w-24"
                            />
                            <span className="self-center text-sm">years</span>
                          </div>
                        ) : (
                          <p className="font-medium">
                            {profileUser.joiningDate 
                              ? `${calculateYearsInSchool()} years`
                              : 'Not available'
                            }
                          </p>
                        )}
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm">Specialization</Label>
                        <p className="font-medium">{profileUser.subject || 'Not specified'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Student Information */}
          {profileUser?.role === 'student' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Student Information
                </CardTitle>
                {canEdit && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingExperience(!isEditingExperience)}
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Current Class</Label>
                      <p className="font-medium">Class {profileUser.class}</p>
                    </div>
                    {profileUser.joiningDate && (
                      <div>
                        <Label className="text-muted-foreground text-sm">Years in School</Label>
                        {isEditingExperience && canEdit ? (
                          <div className="flex gap-2 mt-1">
                            <Input
                              placeholder="Years in school"
                              defaultValue={calculateYearsInSchool().toString()}
                              className="w-24"
                            />
                            <span className="self-center text-sm">years</span>
                          </div>
                        ) : (
                          <p className="font-medium">{calculateYearsInSchool()} years</p>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-muted-foreground text-sm">Student Status</Label>
                      <p className="font-medium">Active</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground text-sm">Academic Year</Label>
                      <p className="font-medium">2025-2026</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <footer className="mt-12 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-800 pt-6">
        <p>© 2025 Axioms School. All rights reserved.</p>
        <p className="mt-1">Developed with ❤️ by Satyam Rojha</p>
      </footer>
    </div>
  );
};

export default ProfilePage;
