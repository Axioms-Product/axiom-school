import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { toast } from 'sonner';
import { useSearchParams } from 'react-router-dom';
import { 
  User, Mail, Phone, School, Book, MapPin, Clock, LogOut, 
  Edit3, Save, X, Plus, Calendar, Award, Users, BookOpen,
  GraduationCap, Star, Target, MessageSquare, Timer,
  HelpCircle, ExternalLink, TrendingUp, Activity,
  CheckCircle, AlertCircle, Trophy, Zap, Heart
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
  const [experienceYears, setExperienceYears] = useState('0');
  const [newQualification, setNewQualification] = useState('');
  const [newAchievement, setNewAchievement] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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
      
      // Set initial experience years
      if (profileUser.role === 'teacher') {
        setExperienceYears((profileUser.experienceYears || 0).toString());
      } else {
        const years = calculateYearsInSchool();
        setExperienceYears(years.toString());
      }
    }
  }, [profileUser]);

  // Countdown timer for Class 10 board exams
  useEffect(() => {
    if (profileUser?.class === '10') {
      const examDate = new Date('2026-02-17T00:00:00');
      
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = examDate.getTime() - now;
        
        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [profileUser?.class]);

  const calculateYearsInSchool = () => {
    if (!profileUser?.joiningDate) return 0;
    return Math.floor((new Date().getTime() - new Date(profileUser.joiningDate).getTime()) / (1000 * 60 * 60 * 24 * 365));
  };

  // Get attendance records from localStorage
  const getAttendanceStats = () => {
    const stored = localStorage.getItem('attendanceRecords');
    if (!stored || !profileUser) return { total: 0, present: 0, percentage: 0 };
    
    const records = JSON.parse(stored);
    const userRecords = records.filter((r: any) => r.studentId === profileUser.id);
    const present = userRecords.filter((r: any) => r.isPresent).length;
    
    return {
      total: userRecords.length,
      present,
      percentage: userRecords.length > 0 ? Math.round((present / userRecords.length) * 100) : 0
    };
  };

  const attendanceStats = getAttendanceStats();

  // Calculate weekly progress (mock data for demo)
  const getWeeklyProgress = () => {
    return Math.floor(Math.random() * 30) + 70; // 70-100%
  };

  const weeklyProgress = getWeeklyProgress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canEdit) return;
    
    setLoading(true);
    
    try {
      if (updateUserProfile) {
        await updateUserProfile(formData);
        toast.success('Profile updated successfully! 🎉');
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update profile 😞');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExperienceSubmit = async () => {
    if (!canEdit || !updateUserProfile) return;
    
    try {
      const years = parseInt(experienceYears) || 0;
      
      await updateUserProfile({ 
        experienceYears: years
      });
      
      setIsEditingExperience(false);
      toast.success(profileUser?.role === 'student' ? 'Years in school updated! 📚' : 'Experience updated! 👨‍🏫');
    } catch (error) {
      toast.error('Failed to update experience 😞');
    }
  };

  const addQualification = async () => {
    if (!newQualification.trim() || !updateUserProfile || !canEdit) return;
    
    try {
      const updatedQualifications = [...(currentUser?.qualifications || []), newQualification];
      await updateUserProfile({ qualifications: updatedQualifications });
      setNewQualification('');
      toast.success('Qualification added! 🎓');
    } catch (error) {
      toast.error('Failed to add qualification 😞');
    }
  };

  const addAchievement = async () => {
    if (!newAchievement.trim() || !updateUserProfile || !canEdit) return;
    
    try {
      const updatedAchievements = [...(currentUser?.achievements || []), newAchievement];
      await updateUserProfile({ achievements: updatedAchievements });
      setNewAchievement('');
      toast.success('Achievement added! 🏆');
    } catch (error) {
      toast.error('Failed to add achievement 😞');
    }
  };

  const removeQualification = async (index: number) => {
    if (!updateUserProfile || !canEdit) return;
    
    try {
      const updatedQualifications = currentUser?.qualifications?.filter((_, i) => i !== index) || [];
      await updateUserProfile({ qualifications: updatedQualifications });
      toast.success('Qualification removed! ✅');
    } catch (error) {
      toast.error('Failed to remove qualification 😞');
    }
  };

  const removeAchievement = async (index: number) => {
    if (!updateUserProfile || !canEdit) return;
    
    try {
      const updatedAchievements = currentUser?.achievements?.filter((_, i) => i !== index) || [];
      await updateUserProfile({ achievements: updatedAchievements });
      toast.success('Achievement removed! ✅');
    } catch (error) {
      toast.error('Failed to remove achievement 😞');
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully! 👋');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="container mx-auto max-w-7xl py-4 md:py-8 px-4">
        {/* Enhanced Header with Animation */}
        <div className="relative mb-8 md:mb-12 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl opacity-10"></div>
          <div className="relative p-6 md:p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white animate-pulse">
                  <span className="text-white font-bold text-2xl md:text-3xl">{profileUser?.name?.charAt(0)}</span>
                </div>
                <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <Heart className="h-3 w-3 text-white fill-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 md:mb-4">
              {isViewingOtherProfile ? `${profileUser?.name}'s Profile 👋` : 'Your Profile Dashboard 🌟'}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 md:mb-6">
              {isViewingOtherProfile ? 'View student information and achievements 📊' : 'Manage your account, track progress, and customize your experience 🚀'}
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-200">
                <span className="text-sm font-medium">📚 Class {profileUser?.class}</span>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-green-200">
                <span className="text-sm font-medium">✅ {attendanceStats.percentage}% Attendance</span>
              </div>
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-purple-200">
                <span className="text-sm font-medium">📈 {weeklyProgress}% Weekly Progress</span>
              </div>
            </div>

            {!isEditing && canEdit && (
              <Button 
                onClick={() => setIsEditing(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <Edit3 className="h-5 w-5 mr-2" />
                Edit Profile ✨
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Enhanced Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main Profile Card */}
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 overflow-hidden transform hover:scale-105 transition-all duration-300">
              <div className="h-20 md:h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
              <CardContent className="pt-0 pb-8">
                <div className="flex flex-col items-center text-center -mt-10 md:-mt-12">
                  <div className="relative mb-6">
                    <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl border-4 border-white">
                      <span className="text-white font-bold text-2xl md:text-3xl">{profileUser?.name?.charAt(0)}</span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center animate-pulse">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold mb-1">{profileUser?.name}</h2>
                  <p className="text-muted-foreground mb-3">@{profileUser?.username}</p>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    <Badge variant={profileUser?.role === 'teacher' ? 'default' : 'secondary'} className="px-3 py-1 animate-bounce">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      {profileUser?.role === 'teacher' ? '👨‍🏫 Teacher' : '🎓 Student'}
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      📚 Class {profileUser?.class}
                    </Badge>
                  </div>
                  
                  {profileUser?.role === 'teacher' && profileUser?.subject && (
                    <div className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                      📖 {profileUser.subject}
                    </div>
                  )}
                  
                  {!isViewingOtherProfile && (
                    <Button 
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 mt-4 transform hover:scale-105 transition-all duration-200"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout 👋
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Progress & Stats Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                  Progress Stats 📊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Attendance Rate</span>
                    <span className="text-sm text-green-600 font-bold">{attendanceStats.percentage}%</span>
                  </div>
                  <Progress value={attendanceStats.percentage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Weekly Progress</span>
                    <span className="text-sm text-blue-600 font-bold">{weeklyProgress}%</span>
                  </div>
                  <Progress value={weeklyProgress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-green-600">{attendanceStats.present}</div>
                    <div className="text-xs text-green-500">Present Days</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 text-center">
                    <div className="text-lg font-bold text-orange-600">{attendanceStats.total - attendanceStats.present}</div>
                    <div className="text-xs text-orange-500">Absent Days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Class 10 Board Exam Countdown */}
            {profileUser?.class === '10' && (
              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 animate-pulse">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-orange-600">
                    <Timer className="h-5 w-5" />
                    Board Exam 2026 🎯
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{countdown.days}</div>
                      <div className="text-xs text-orange-500">Days</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{countdown.hours}</div>
                      <div className="text-xs text-orange-500">Hours</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{countdown.minutes}</div>
                      <div className="text-xs text-orange-500">Min</div>
                    </div>
                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="text-xl md:text-2xl font-bold text-orange-600">{countdown.seconds}</div>
                      <div className="text-xs text-orange-500">Sec</div>
                    </div>
                  </div>
                  <p className="text-sm text-orange-600 font-medium">Until Board Exams 📚</p>
                  <p className="text-xs text-muted-foreground mt-1">February 17, 2026</p>
                </CardContent>
              </Card>
            )}

            {/* Help & Support Card */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <HelpCircle className="h-5 w-5" />
                  Help & Support 🆘
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <a 
                  href="mailto:satyamrojhax@gmail.com" 
                  className="flex items-center gap-2 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors group transform hover:scale-105 duration-200"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">Email Support 📧</div>
                    <div className="text-xs text-muted-foreground">satyamrojhax@gmail.com</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-600" />
                </a>
                
                <a 
                  href="https://wa.me/918092710478" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 bg-white/50 rounded-lg hover:bg-white/80 transition-colors group transform hover:scale-105 duration-200"
                >
                  <Phone className="h-4 w-4 text-green-600" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">WhatsApp Support 💬</div>
                    <div className="text-xs text-muted-foreground">+91 8092710478</div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-green-600" />
                </a>
              </CardContent>
            </Card>

            {/* School Information */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg">School Information 🏫</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">⏰ Mon-Sat, 7 AM to 4 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">📍 Bhabua, Bihar 821101</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">📞 +91 8092710478</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm">✉️ axiomsproduct@gmail.com</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            {/* Personal Information */}
            <Card className="border-0 shadow-xl transform hover:scale-[1.02] transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <User className="h-6 w-6 text-blue-600" />
                  Personal Information 👤
                </CardTitle>
                {isEditing && canEdit && (
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 transform hover:scale-105 transition-all duration-200"
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save ✅
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        // ... keep existing code for resetting form data
                      }}
                      size="sm"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Cancel ❌
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                {isEditing && canEdit ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name 📝</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="transform focus:scale-105 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email 📧</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="transform focus:scale-105 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number 📱</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="+91 9876543210"
                          className="transform focus:scale-105 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact 🚨</Label>
                        <Input
                          id="emergencyContact"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                          placeholder="+91 9876543210"
                          className="transform focus:scale-105 transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address 🏠</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Enter your full address"
                        className="transform focus:scale-105 transition-all duration-200"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio 📖</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        rows={3}
                        className="transform focus:scale-105 transition-all duration-200"
                      />
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Full Name 📝</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <User className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">{profileUser?.name}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Username 👤</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <User className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">@{profileUser?.username}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Email 📧</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <Mail className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">{profileUser?.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Phone 📱</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <Phone className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">{profileUser?.phone || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Role 💼</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <School className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium capitalize">{profileUser?.role}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Class 📚</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <Book className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">Class {profileUser?.class}</p>
                        </div>
                      </div>

                      {profileUser?.joiningDate && (
                        <div className="space-y-2">
                          <Label className="text-muted-foreground text-sm font-medium">Joining Date 📅</Label>
                          <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                            <p className="font-medium">{new Date(profileUser.joiningDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Emergency Contact 🚨</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <Phone className="h-4 w-4 mr-2 text-red-500" />
                          <p className="font-medium">{profileUser?.emergencyContact || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {profileUser?.address && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Address 🏠</Label>
                        <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                          <p className="font-medium">{profileUser.address}</p>
                        </div>
                      </div>
                    )}
                    
                    {profileUser?.bio && (
                      <div className="space-y-2">
                        <Label className="text-muted-foreground text-sm font-medium">Bio 📖</Label>
                        <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg transform hover:scale-105 transition-all duration-200">
                          <MessageSquare className="h-4 w-4 mr-2 text-blue-500 mt-1" />
                          <p className="leading-relaxed">{profileUser.bio}</p>
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
                      Qualifications 🎓
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
                      Achievements 🏆
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
                <Card className="border-0 shadow-xl">
                  <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <BookOpen className="h-6 w-6 text-green-600" />
                      Teaching Information 📚
                    </CardTitle>
                    {canEdit && (
                      <div className="flex gap-2">
                        {isEditingExperience ? (
                          <>
                            <Button
                              onClick={handleExperienceSubmit}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="h-4 w-4 mr-1" />
                              Save ✅
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => {
                                setIsEditingExperience(false);
                                setExperienceYears((profileUser?.experienceYears || 0).toString());
                              }}
                              size="sm"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel ❌
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsEditingExperience(true)}
                          >
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit ✏️
                          </Button>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <Label className="text-muted-foreground text-sm font-medium">Subject Teaching 📚</Label>
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="font-medium">{profileUser.subject || 'No subject assigned'}</p>
                          </div>
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-sm font-medium">Class Assignment 📚</Label>
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="font-medium">Class {profileUser.class}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <Label className="text-muted-foreground text-sm font-medium">Teaching Experience 👨‍🏫</Label>
                          {isEditingExperience && canEdit ? (
                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Years of experience"
                                value={experienceYears}
                                onChange={(e) => setExperienceYears(e.target.value)}
                                className="w-24"
                                type="number"
                                min="0"
                              />
                              <span className="self-center text-sm">years</span>
                            </div>
                          ) : (
                            <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <p className="font-medium">{experienceYears} years</p>
                            </div>
                          )}
                        </div>
                        <div>
                          <Label className="text-muted-foreground text-sm font-medium">Specialization 📚</Label>
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="font-medium">{profileUser.subject || 'Not specified'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Student Information */}
            {profileUser?.role === 'student' && (
              <Card className="border-0 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="h-6 w-6 text-blue-600" />
                    Student Information 🎓
                  </CardTitle>
                  {canEdit && (
                    <div className="flex gap-2">
                      {isEditingExperience ? (
                        <>
                          <Button
                            onClick={handleExperienceSubmit}
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save ✅
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsEditingExperience(false);
                              setExperienceYears((profileUser?.experienceYears || calculateYearsInSchool()).toString());
                            }}
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel ❌
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditingExperience(true)}
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit ✏️
                        </Button>
                      )}
                    </div>
                  )}
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <Label className="text-muted-foreground text-sm font-medium">Current Class 📚</Label>
                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="font-medium">Class {profileUser.class}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm font-medium">Years in School 📚</Label>
                        {isEditingExperience && canEdit ? (
                          <div className="flex gap-2 mt-2">
                            <Input
                              placeholder="Years in school"
                              value={experienceYears}
                              onChange={(e) => setExperienceYears(e.target.value)}
                              className="w-24"
                              type="number"
                              min="0"
                              max="15"
                            />
                            <span className="self-center text-sm">years</span>
                          </div>
                        ) : (
                          <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <p className="font-medium">{profileUser?.experienceYears || calculateYearsInSchool()} years</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-muted-foreground text-sm font-medium">Student Status 🎓</Label>
                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="font-medium">Active</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-muted-foreground text-sm font-medium">Academic Session 📅</Label>
                        <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="font-medium">2025-2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        <footer className="mt-12 md:mt-16 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="max-w-2xl mx-auto">
            <p className="mb-2">© 2025 Axioms School. All rights reserved. 🏫</p>
            <p className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
              Developed with ❤️ by Satyam Rojha ✨
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProfilePage;
