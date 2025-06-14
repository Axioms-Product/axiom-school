
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Login = () => {
  const [email, setEmail] = useState('');
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
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Primary gradient orbs */}
        <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-3xl transform -translate-x-32 -translate-y-32 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-gradient-to-tl from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-20 translate-y-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-blue-400/60 rounded-full animate-bounce delay-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Back button */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 md:p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white/80 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo size="lg" showText={false} />
            </div>
            <div className="relative mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
                Welcome Back
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20"></div>
            </div>
            <p className="text-gray-300 text-base md:text-lg">
              Sign in to continue to Axioms School
            </p>
          </div>

          {/* Enhanced Form Container */}
          <div className="relative">
            {/* 3D Card Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input with Icon */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 md:h-14 pl-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                    required
                  />
                </div>
                
                {/* Password Input with Icon and Toggle */}
                <div className="relative">
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 md:h-14 pl-12 pr-12 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

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
                  className="w-full h-12 md:h-14 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-semibold rounded-xl border-none shadow-2xl mt-8 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-purple-500/25"
                  disabled={loading}
                >
                  <div className="flex items-center justify-center space-x-2">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </div>
                </Button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
  );
};

export default Login;
