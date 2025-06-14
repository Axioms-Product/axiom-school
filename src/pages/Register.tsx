
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { Eye, EyeOff, GraduationCap, User, Mail, Lock, UserCheck, BookOpen, Users, Award } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-blue-900 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-16 left-16 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-16 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-8 right-8 w-4 h-4 bg-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-6 h-6 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-white/30 rotate-45 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative">
                  <GraduationCap className="h-10 w-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Axioms School</h1>
                  <p className="text-white/80 text-sm">Excellence in Education</p>
                </div>
              </div>
              
              {/* Feature highlights */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-white/70 text-xs">
                  <BookOpen className="h-3 w-3" />
                  <span>Learn</span>
                </div>
                <div className="flex items-center gap-1 text-white/70 text-xs">
                  <Users className="h-3 w-3" />
                  <span>Connect</span>
                </div>
                <div className="flex items-center gap-1 text-white/70 text-xs">
                  <Award className="h-3 w-3" />
                  <span>Achieve</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Join Axioms School</h2>
            <p className="text-white/80">Create your account and start learning today</p>
          </div>
        </div>

        {/* Enhanced Register Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    Full Name
                  </label>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-gray-500" />
                    Username
                  </label>
                  <Input
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="h-11 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">Password</label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="h-10 pr-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-700">Confirm</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-10 pr-10 border-2 border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-sm transition-all duration-300"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Role</label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange('role', value)}
                    >
                      <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-emerald-500 text-sm">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="teacher">Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Class</label>
                    <Select
                      value={formData.assignedClass}
                      onValueChange={(value) => handleInputChange('assignedClass', value)}
                    >
                      <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-emerald-500 text-sm">
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Subject</label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleInputChange('subject', value)}
                    >
                      <SelectTrigger className="h-11 border-2 border-gray-200 focus:border-emerald-500 text-sm">
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
                  <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      {error}
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 hover:from-emerald-700 hover:via-teal-700 hover:to-blue-700 text-white font-semibold h-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Creating your account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Create Account</span>
                      <div className="w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced Sign In Link */}
        <div className="relative mt-6">
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-4 text-center shadow-lg">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text font-semibold hover:from-emerald-700 hover:to-teal-700 transition-all duration-200">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 space-y-2">
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>Secure</span>
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
            <span>Trusted</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span>Reliable</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          </div>
          <p className="text-white/60 text-xs">© 2025 Axioms School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
