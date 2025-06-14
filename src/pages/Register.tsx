
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import Logo from '@/components/ui/logo';
import { Eye, EyeOff, User, Mail, Lock, UserCheck, BookOpen, Users, Award, Sparkles, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-float opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Enhanced Header with Logo */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
            <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
              <div className="flex flex-col items-center gap-4">
                <Logo size="lg" showText={false} />
                <div className="text-center">
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Axioms School
                  </h1>
                  <p className="text-white/80 text-sm mt-1 flex items-center gap-2 justify-center">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    Excellence in Education
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                  </p>
                </div>
              </div>
              
              {/* Enhanced feature highlights */}
              <div className="flex items-center justify-center gap-6 mt-6">
                <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
                  <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300 transform group-hover:scale-110">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <span>Learn</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
                  <div className="p-2 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                    <Users className="h-4 w-4" />
                  </div>
                  <span>Connect</span>
                </div>
                <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
                  <div className="p-2 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-all duration-300 transform group-hover:scale-110">
                    <Award className="h-4 w-4" />
                  </div>
                  <span>Achieve</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-white/80 flex items-center gap-2 justify-center">
              <GraduationCap className="h-5 w-5 text-blue-400" />
              Create your account and start your journey
            </p>
          </div>
        </div>

        {/* Enhanced Register Form with 3D effects */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white/95 backdrop-blur-2xl border border-white/30 rounded-3xl p-8 shadow-2xl transform hover:shadow-3xl transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="p-1 bg-blue-100 rounded-lg">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    Full Name
                  </label>
                  <div className="relative group">
                    <Input
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-sm transition-all duration-300 transform focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="p-1 bg-emerald-100 rounded-lg">
                      <UserCheck className="h-4 w-4 text-emerald-600" />
                    </div>
                    Username
                  </label>
                  <div className="relative group">
                    <Input
                      placeholder="Choose a unique username"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 text-sm transition-all duration-300 transform focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <div className="p-1 bg-purple-100 rounded-lg">
                      <Mail className="h-4 w-4 text-purple-600" />
                    </div>
                    Email Address
                  </label>
                  <div className="relative group">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="h-12 border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 text-sm transition-all duration-300 transform focus:scale-[1.02] bg-white/80 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <Lock className="h-3 w-3 text-red-500" />
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className="h-11 pr-10 border-2 border-gray-200 focus:border-red-500 focus:ring-3 focus:ring-red-500/20 text-sm transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      Confirm
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className="h-11 pr-10 border-2 border-gray-200 focus:border-green-500 focus:ring-3 focus:ring-green-500/20 text-sm transition-all duration-300 bg-white/80 backdrop-blur-sm"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 hover:bg-gray-100 rounded-lg"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Role</label>
                    <Select
                      value={formData.role}
                      onValueChange={(value) => handleInputChange('role', value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 text-sm bg-white/80 backdrop-blur-sm">
                        <SelectValue placeholder="Select Role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">🎓 Student</SelectItem>
                        <SelectItem value="teacher">👨‍🏫 Teacher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Class</label>
                    <Select
                      value={formData.assignedClass}
                      onValueChange={(value) => handleInputChange('assignedClass', value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-indigo-500 text-sm bg-white/80 backdrop-blur-sm">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>
                            📚 Class {cls}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {formData.role === 'teacher' && (
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Subject You Teach</label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => handleInputChange('subject', value)}
                    >
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-orange-500 text-sm bg-white/80 backdrop-blur-sm">
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subj) => (
                          <SelectItem key={subj} value={subj}>
                            📖 {subj}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm animate-fade-in shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      {error}
                    </div>
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 hover:from-blue-700 hover:via-purple-700 hover:to-emerald-700 text-white font-bold h-14 rounded-2xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl shadow-lg relative overflow-hidden group"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:animate-pulse"></div>
                  {loading ? (
                    <div className="flex items-center gap-3 relative z-10">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span className="text-lg">Creating your account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 relative z-10">
                      <span className="text-lg">Create Account</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced Sign In Link */}
        <div className="relative mt-8">
          <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:underline">
                Sign in here →
              </Link>
            </p>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-8 space-y-3">
          <div className="flex items-center justify-center gap-3 text-white/70 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span>Trusted</span>
            </div>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              <span>Reliable</span>
            </div>
          </div>
          <p className="text-white/60 text-xs">© 2025 Axioms School. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
