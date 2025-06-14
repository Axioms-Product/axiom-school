
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { User, Mail, Lock, GraduationCap, BookOpen } from 'lucide-react';

const RegistrationForm = () => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const classes = ['VI', 'VII', 'VIII', 'IX', 'X'];
  const subjects = Object.values(Subject);

  useEffect(() => {
    if (formData.role !== 'teacher') {
      setFormData(prev => ({ ...prev, subject: '' }));
    }
  }, [formData.role]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.assignedClass) {
      setError('Please select a class');
      return false;
    }
    if (formData.role === 'teacher' && !formData.subject) {
      setError('Please select a subject you teach');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await register({
        name: formData.name,
        username: formData.username || formData.email.split('@')[0], // Generate username from email if not provided
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Input with Icon */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <User className="h-5 w-5" />
        </div>
        <Input
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
          required
        />
      </div>
      
      {/* Email Input with Icon */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Mail className="h-5 w-5" />
        </div>
        <Input
          type="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
          required
        />
      </div>
      
      {/* Password Input with Icon */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Lock className="h-5 w-5" />
        </div>
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
          required
        />
      </div>

      {/* Confirm Password Input with Icon */}
      <div className="relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Lock className="h-5 w-5" />
        </div>
        <Input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
          required
        />
      </div>
      
      {/* Role and Class Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <GraduationCap className="h-5 w-5" />
          </div>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange('role', value)}
          >
            <SelectTrigger className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-purple-400">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
              <SelectItem value="student" className="text-white hover:bg-white/10">Student</SelectItem>
              <SelectItem value="teacher" className="text-white hover:bg-white/10">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select
            value={formData.assignedClass}
            onValueChange={(value) => handleInputChange('assignedClass', value)}
          >
            <SelectTrigger className="h-14 bg-white/5 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-purple-400">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls} className="text-white hover:bg-white/10">
                  Class {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Subject Selection for Teachers */}
      {formData.role === 'teacher' && (
        <div className="relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
            <BookOpen className="h-5 w-5" />
          </div>
          <Select
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
          >
            <SelectTrigger className="h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white backdrop-blur-sm focus:border-purple-400">
              <SelectValue placeholder="Subject You Teach" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900/95 backdrop-blur-md border-gray-700">
              {subjects.map((subj) => (
                <SelectItem key={subj} value={subj} className="text-white hover:bg-white/10">
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-400 rounded-xl blur opacity-20"></div>
          <div className="relative bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
            {error}
          </div>
        </div>
      )}
      
      {/* Enhanced Submit Button */}
      <Button 
        type="submit" 
        className="w-full h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl border-none shadow-2xl mt-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/25"
        disabled={loading}
      >
        <div className="flex items-center justify-center space-x-2">
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Creating Account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </div>
      </Button>
    </form>
  );
};

export default RegistrationForm;
