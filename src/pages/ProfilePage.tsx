
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { User, Mail, Phone, School, Book, MapPin, Clock, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const { currentUser, updateUserProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (updateUserProfile) {
        await updateUserProfile({ name, email });
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

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
  };

  return (
    <div className="container mx-auto max-w-4xl py-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-3xl">{name.charAt(0)}</span>
                </div>
                <h2 className="text-xl font-bold">{currentUser?.name}</h2>
                <p className="text-sm text-muted-foreground capitalize">{currentUser?.role}</p>
                <p className="text-sm mt-2">Class {currentUser?.class}</p>
                
                {currentUser?.role === 'teacher' && currentUser?.subject && (
                  <div className="mt-2 px-4 py-1 bg-cgs-purple/20 text-cgs-purple rounded-full text-sm">
                    {currentUser.subject}
                  </div>
                )}
                
                <div className="w-full mt-4 space-y-2">
                  {!isEditing && (
                    <Button 
                      className="w-full"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
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
        
        <div className="md:col-span-2">
          {isEditing ? (
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="class">Class</Label>
                    <Input
                      id="class"
                      value={currentUser?.class || ''}
                      disabled
                    />
                  </div>
                  
                  {currentUser?.role === 'teacher' && (
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={currentUser?.subject || ''}
                        disabled
                      />
                    </div>
                  )}
                  
                  <div className="flex gap-4 pt-2">
                    <Button type="submit" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setName(currentUser?.name || '');
                        setEmail(currentUser?.email || '');
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Full Name</Label>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-cgs-purple" />
                        <p>{currentUser?.name}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Email</Label>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-cgs-purple" />
                        <p>{currentUser?.email}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Role</Label>
                      <div className="flex items-center">
                        <School className="h-4 w-4 mr-2 text-cgs-purple" />
                        <p className="capitalize">{currentUser?.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <Label className="text-muted-foreground text-sm">Class</Label>
                      <div className="flex items-center">
                        <Book className="h-4 w-4 mr-2 text-cgs-purple" />
                        <p>Class {currentUser?.class}</p>
                      </div>
                    </div>
                    
                    {currentUser?.role === 'teacher' && currentUser?.subject && (
                      <div className="space-y-1">
                        <Label className="text-muted-foreground text-sm">Subject</Label>
                        <div className="flex items-center">
                          <Book className="h-4 w-4 mr-2 text-cgs-purple" />
                          <p>{currentUser.subject}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {currentUser?.role === 'student' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Your Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">Track your academic progress in the Marks section</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {currentUser?.role === 'teacher' && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Teaching Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentUser.subject ? (
                        <div>
                          <Label className="text-muted-foreground text-sm">Subject Teaching</Label>
                          <p className="font-medium">{currentUser.subject}</p>
                        </div>
                      ) : (
                        <div>
                          <Label className="text-muted-foreground text-sm">Subject Teaching</Label>
                          <p className="text-muted-foreground italic">No subject assigned</p>
                        </div>
                      )}
                      <div>
                        <Label className="text-muted-foreground text-sm">Class Assignment</Label>
                        <p className="font-medium">Class {currentUser.class}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
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
