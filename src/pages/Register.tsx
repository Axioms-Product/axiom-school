import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { Eye, EyeOff, GraduationCap, User, Mail, Lock, UserCheck } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    assignedClass: '',
    subject: '' as Subject | ''
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 flex items-center justify-center p-4 py-6 overflow-hidden">
      {/* Animated Background Images */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-28 h-28 rounded-full overflow-hidden opacity-20 animate-float">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=center" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full overflow-hidden opacity-15 animate-float delay-500">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=400&fit=crop&crop=center" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full overflow-hidden opacity-25 animate-float delay-1000">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=400&fit=crop&crop=center" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute bottom-1/4 left-16 w-14 h-14 rounded-full overflow-hidden opacity-20 animate-float delay-700">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop&crop=center" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        <div className="absolute top-1/2 right-12 w-12 h-12 rounded-full overflow-hidden opacity-30 animate-float delay-300">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop&crop=center" 
            alt="" 
            className="w-full h-full object-cover blur-sm"
          />
        </div>
        {/* Floating particles */}
        <div className="absolute top-10 left-10 w-28 h-28 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-5">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
            <GraduationCap className="h-8 w-8 mx-auto text-white mb-2" />
            <h1 className="text-xl font-bold text-white">Axioms School</h1>
            <p className="text-white/80 text-xs mt-1">Create your account to get started</p>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-9 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Username</label>
              <div className="relative">
                <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="pl-9 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-9 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-8 pr-8 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Confirm</label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-8 pr-8 h-9 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-xs transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Role</label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger className="h-9 text-xs border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Class</label>
                <Select
                  value={formData.assignedClass}
                  onValueChange={(value) => handleInputChange('assignedClass', value)}
                >
                  <SelectTrigger className="h-9 text-xs border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {formData.role === 'teacher' && (
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-700">Subject</label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleInputChange('subject', value)}
                >
                  <SelectTrigger className="h-9 text-xs border-gray-200 focus:border-blue-500">
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subj) => (
                      <SelectItem key={subj} value={subj}>
                        {subj}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs animate-fade-in">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold h-10 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-xs">Creating Account...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mt-4 text-center shadow-lg">
          <p className="text-xs text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Footer - Centered */}
        <div className="text-center mt-6">
          <p className="text-white/80 text-xs">© 2025 Axioms School. All rights reserved.</p>
          <p className="text-white/70 text-xs mt-1">Powered by Axioms Product with Satyam Rojha!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
