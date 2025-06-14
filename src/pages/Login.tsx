
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button 
          onClick={() => navigate('/')}
          className="text-white p-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">Don't have an account?</span>
          <Link 
            to="/register"
            className="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-white text-2xl font-semibold">Axioms School</h1>
      </div>

      {/* Login Form Card */}
      <div className="bg-white rounded-t-3xl min-h-[70vh] px-6 pt-8">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600 text-sm mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">Email</label>
              <Input
                type="text"
                placeholder="nicholas@ergemla.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="text-gray-700 text-sm font-medium block mb-2">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium h-12 rounded-xl mt-8"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
