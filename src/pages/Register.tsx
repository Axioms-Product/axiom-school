
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { Eye, EyeOff, User, Mail, Lock, UserCheck, ArrowRight, Users, Award, BookOpen } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Mobile-optimized container */}
      <div className="flex-1 flex items-center justify-center p-3 sm:p-6">
        <div className="w-full max-w-xs sm:max-w-sm space-y-4">
          {/* Header Section */}
          <div className="text-center space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Join Axioms School</h1>
            <p className="text-gray-600 text-xs sm:text-sm">Create your account and start learning</p>
          </div>

          {/* Feature highlights - smaller on mobile */}
          <div className="grid grid-cols-3 gap-2 py-2">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs text-gray-600">Learn</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <Users className="h-4 w-4 text-green-600" />
              </div>
              <p className="text-xs text-gray-600">Connect</p>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                <Award className="h-4 w-4 text-orange-600" />
              </div>
              <p className="text-xs text-gray-600">Achieve</p>
            </div>
          </div>

          {/* Register Form - Compact */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <Input
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="h-9 sm:h-10 pl-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Username</label>
              <div className="relative">
                <Input
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="h-9 sm:h-10 pl-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-xs sm:text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="h-9 sm:h-10 pl-9 text-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="h-9 pr-8 pl-8 text-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Confirm</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="h-9 pr-8 pl-8 text-xs border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                  <Lock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Role</label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange('role', value)}
                >
                  <SelectTrigger className="h-9 sm:h-10 border-gray-300 focus:border-blue-500 text-xs sm:text-sm">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Class</label>
                <Select
                  value={formData.assignedClass}
                  onValueChange={(value) => handleInputChange('assignedClass', value)}
                >
                  <SelectTrigger className="h-9 sm:h-10 border-gray-300 focus:border-blue-500 text-xs sm:text-sm">
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
              <div className="space-y-1">
                <label className="text-xs sm:text-sm font-medium text-gray-700">Subject</label>
                <Select
                  value={formData.subject}
                  onValueChange={(value) => handleInputChange('subject', value)}
                >
                  <SelectTrigger className="h-9 sm:h-10 border-gray-300 focus:border-blue-500 text-xs sm:text-sm">
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
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  <span className="text-xs sm:text-sm">Creating account...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm">Create Account</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-safe-area-inset-bottom p-2">
        <p className="text-xs text-gray-500">© 2025 Axioms School. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
