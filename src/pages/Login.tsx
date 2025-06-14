
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap, Mail, Lock, BookOpen, Users, Award } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-10 right-10 w-4 h-4 bg-white/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-6 h-6 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-white/30 rotate-45 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="relative">
                  <GraduationCap className="h-10 w-10 text-white" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
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
            <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
            <p className="text-white/80">Sign in to continue your learning journey</p>
          </div>
        </div>

        {/* Enhanced Login Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Username or Email
                </label>
                <div className="relative group">
                  <Input
                    type="text"
                    placeholder="Enter your username or email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-300 group-hover:border-gray-300"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-gray-500" />
                  Password
                </label>
                <div className="relative group">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm transition-all duration-300 group-hover:border-gray-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

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
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold h-12 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Signing you in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign In</span>
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-pulse"></div>
                  </div>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Enhanced Sign Up Link */}
        <div className="relative mt-6">
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl"></div>
          <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-4 text-center shadow-lg">
            <p className="text-sm text-gray-600">
              New to Axioms School?{' '}
              <Link to="/register" className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                Create your account
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

export default Login;
