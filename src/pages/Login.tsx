
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-sm w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Axioms School</h1>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border-gray-300 text-sm h-11"
              required
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border-gray-300 text-sm h-11 pr-10"
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

            {error && (
              <div className="text-red-500 text-sm text-center">
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold h-11 rounded-lg"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* Sign Up Link */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 font-semibold hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-400">
          © 2024 Axioms School. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;
