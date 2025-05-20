
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import AnimatedBackground from '@/components/AnimatedBackground';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRound, School, Settings } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatedBackground />
      
      <div className="w-full max-w-md z-10 animate-scale-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-cgs-blue to-cgs-purple animate-pulse-glow flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cgs-blue to-cgs-purple">
            Axioms School
          </h1>
          <p className="mt-2 text-muted-foreground">Log in to your account</p>
        </div>
        
        <Card className="w-full glass-effect border-white/20">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="student" className="mb-6" onValueChange={(value) => setRole(value as UserRole)}>
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <UserRound className="h-4 w-4" />
                  <span className="hidden sm:inline">Student</span>
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <School className="h-4 w-4" />
                  <span className="hidden sm:inline">Teacher</span>
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className={`w-full ${
                  role === 'student' 
                    ? 'bg-gradient-to-r from-cgs-blue to-cgs-purple' 
                    : role === 'teacher' 
                      ? 'bg-gradient-to-r from-cgs-purple to-cgs-pink'
                      : 'bg-gradient-to-r from-gray-600 to-gray-800'
                } hover:opacity-90`}
                disabled={loading}
              >
                {loading ? 'Logging in...' : `Log In as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-cgs-blue hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="text-center mt-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-cgs-blue">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
