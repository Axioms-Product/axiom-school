
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, School, Eye, EyeOff, Lock, User, BookOpen, GraduationCap } from 'lucide-react';
import Logo from '@/components/ui/logo';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<UserRole>('student');
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="w-full max-w-md z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>
        
        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center pb-6">
            <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6" />
              Student Portal
            </CardTitle>
            <CardDescription className="text-blue-100">
              Access your educational dashboard
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 space-y-6">
            <Tabs defaultValue="student" className="mb-6" onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid grid-cols-2 w-full bg-gray-100">
                <TabsTrigger 
                  value="student" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <UserRound className="h-4 w-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger 
                  value="teacher" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  <School className="h-4 w-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  {error}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-blue-600" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border-gray-200 text-gray-900 focus:border-blue-500 focus:ring-blue-500 rounded-lg h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border-gray-200 text-gray-900 focus:border-purple-500 focus:ring-purple-500 rounded-lg h-12 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className={`w-full h-12 text-white font-semibold rounded-lg transition-all duration-200 ${
                  role === 'student' 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
                    : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="bg-gray-50 text-center py-4">
            <p className="text-sm text-gray-600 w-full">
              New to Axioms School?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Create Account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
