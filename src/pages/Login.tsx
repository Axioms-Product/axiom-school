
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap, Mail, Lock } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/4 right-10 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse delay-700"></div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4">
            <GraduationCap className="h-8 w-8 mx-auto text-white mb-2" />
            <h1 className="text-xl font-bold text-white">Axioms School</h1>
            <p className="text-white/80 text-xs mt-1">Welcome back! Please sign in</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Username or Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm transition-all duration-200"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-10 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg text-xs animate-fade-in">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold h-10 rounded-lg transition-all duration-300 transform hover:scale-105"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span className="text-xs">Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-4 mt-4 text-center shadow-lg">
          <p className="text-xs text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200">
              Sign up here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/80 text-xs">
          © 2025 Axioms School. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
