
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, GraduationCap } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    assignedClass: '',
    subject: '' as Subject | '',
    rollNo: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const classes = ['VI', 'VII', 'VIII', 'IX', 'X'];
  const subjects = Object.values(Subject);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (formData.role !== 'teacher') {
      setFormData(prev => ({ ...prev, subject: '' }));
    }
  }, [formData.role]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!formData.assignedClass) {
      setError('Please select a class');
      return;
    }
    
    if (formData.role === 'teacher' && !formData.subject) {
      setError('Please select a subject you teach');
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        name: formData.name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        assignedClass: formData.assignedClass,
        rollNo: formData.rollNo || undefined,
        subject: formData.role === 'teacher' ? formData.subject as Subject : undefined
      });
      navigate('/login');
    } catch (err) {
      setError((err as Error).message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-8 bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-lg z-10 my-8">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Axioms School</h1>
          <p className="text-gray-600">Create your account to start learning</p>
        </div>
        
        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center pb-6">
            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
            <CardDescription className="text-purple-100">Fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-9 bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 h-11"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-700 font-medium">Username</Label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      placeholder="john_doe"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="pl-9 bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 h-11"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-9 bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-9 pr-9 bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 h-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-9 pr-9 bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 h-11"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-gray-700 font-medium">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => handleInputChange('role', value)}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 h-11">
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      <SelectItem value="student" className="text-gray-900">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Student
                        </div>
                      </SelectItem>
                      <SelectItem value="teacher" className="text-gray-900">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4" />
                          Teacher
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="class" className="text-gray-700 font-medium">
                    {formData.role === 'teacher' ? 'Assigned Class' : 'Your Class'}
                  </Label>
                  <Select
                    value={formData.assignedClass}
                    onValueChange={(value) => handleInputChange('assignedClass', value)}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 h-11">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      {classes.map((cls) => (
                        <SelectItem key={cls} value={cls} className="text-gray-900">
                          Class {cls}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {formData.role === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 font-medium">Subject You Teach</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => handleInputChange('subject', value)}
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 text-gray-900 h-11">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200">
                      {subjects.map((subj) => (
                        <SelectItem key={subj} value={subj} className="text-gray-900">
                          {subj}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="bg-gray-50 text-center py-4">
            <p className="text-sm text-gray-600 w-full">
              Already have an account?{' '}
              <Link to="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                Sign In
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
