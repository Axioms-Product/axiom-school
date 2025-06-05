
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, School, Eye, EyeOff, Lock, User, Sparkles, BookOpen, GraduationCap } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center p-4 animated-gradient relative overflow-hidden">
      {/* Floating educational elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute text-white/10 text-2xl ${
              i % 4 === 0 ? 'float' : i % 4 === 1 ? 'float-delayed' : i % 4 === 2 ? 'float-slow' : 'animate-pulse'
            }`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {['📚', '🎓', '✏️', '🔬', '🎨', '💻', '📐', '🌟'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      {/* Geometric pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 2px, transparent 2px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="w-full max-w-md z-10 animate-scale-in">
        {/* Header with enhanced logo */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Logo size="lg" className="justify-center mb-6" />
            <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold animate-pulse">
              v2.0
            </div>
          </div>
          <div className="glass-effect rounded-2xl px-6 py-3 border border-white/30">
            <p className="text-white text-lg font-medium">🚀 Neural Learning Portal</p>
          </div>
        </div>
        
        <Card className="card-3d glass-effect border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-white font-bold flex items-center justify-center gap-2">
              <GraduationCap className="h-6 w-6 text-cyan-400" />
              Access Portal
              <Sparkles className="h-6 w-6 text-yellow-400 animate-pulse" />
            </CardTitle>
            <CardDescription className="text-gray-200">
              Enter your credentials to access the learning ecosystem
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <Tabs defaultValue="student" className="mb-6" onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid grid-cols-2 w-full glass-effect border-white/20">
                <TabsTrigger 
                  value="student" 
                  className="flex items-center gap-2 data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:neon-border"
                >
                  <UserRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Student</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="teacher" 
                  className="flex items-center gap-2 data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-200 data-[state=active]:neon-border"
                >
                  <School className="h-4 w-4" />
                  <span className="hidden sm:inline">Teacher</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-xl glass-effect animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  {error}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-200 font-medium flex items-center gap-2">
                  <User className="h-4 w-4 text-cyan-400" />
                  Username
                </Label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="glass-effect border-white/20 text-white placeholder-gray-300 focus:border-cyan-400/50 focus:ring-cyan-400/20 rounded-xl pl-4 pr-4 py-3"
                    required
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200 font-medium flex items-center gap-2">
                  <Lock className="h-4 w-4 text-purple-400" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-effect border-white/20 text-white placeholder-gray-300 focus:border-purple-400/50 focus:ring-purple-400/20 rounded-xl pl-4 pr-12 py-3"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className={`w-full h-14 text-white font-bold rounded-xl shadow-lg card-3d-interactive ${
                  role === 'student' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 neon-border' 
                    : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 neon-border'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Authenticating...</span>
                    <div className="flex space-x-1">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1 h-1 bg-white rounded-full animate-bounce"
                          style={{ animationDelay: `${i * 0.2}s` }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Access as {role.charAt(0).toUpperCase() + role.slice(1)}</span>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <div className="glass-effect rounded-xl px-4 py-2 border border-white/20">
              <p className="text-sm text-gray-200">
                New to the platform?{' '}
                <Link to="/register" className="text-cyan-300 hover:text-cyan-200 transition-colors font-medium neon-text">
                  Initialize Account →
                </Link>
              </p>
            </div>
          </CardFooter>
        </Card>
        
        {/* Additional decorative elements */}
        <div className="flex justify-center mt-6 space-x-4">
          <div className="glass-effect rounded-full p-3 border border-white/20">
            <div className="text-2xl">🎓</div>
          </div>
          <div className="glass-effect rounded-full p-3 border border-white/20">
            <div className="text-2xl">📚</div>
          </div>
          <div className="glass-effect rounded-full p-3 border border-white/20">
            <div className="text-2xl">🌟</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
