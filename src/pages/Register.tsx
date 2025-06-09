
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { Eye, EyeOff, GraduationCap } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as UserRole,
    assignedClass: '',
    subject: '' as Subject | '',
    rollNo: ''
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
        rollNo: formData.rollNo || undefined,
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-8">
      <div className="max-w-sm w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <GraduationCap className="h-12 w-12 mx-auto text-blue-600 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Axioms School</h1>
            <p className="text-gray-600 text-sm mt-2">Sign up to get started</p>
          </div>
        </div>

        {/* Register Form */}
        <div className="bg-white border border-gray-300 rounded-lg p-6 mb-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="bg-gray-50 border-gray-300 text-sm h-11"
              required
            />
            
            <Input
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className="bg-gray-50 border-gray-300 text-sm h-11"
              required
            />
            
            <Input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-gray-50 border-gray-300 text-sm h-11"
              required
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
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
            
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="bg-gray-50 border-gray-300 text-sm h-11 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            <Select
              value={formData.role}
              onValueChange={(value) => handleInputChange('role', value)}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 h-11">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="teacher">Teacher</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={formData.assignedClass}
              onValueChange={(value) => handleInputChange('assignedClass', value)}
            >
              <SelectTrigger className="bg-gray-50 border-gray-300 h-11">
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
            
            {formData.role === 'teacher' && (
              <Select
                value={formData.subject}
                onValueChange={(value) => handleInputChange('subject', value)}
              >
                <SelectTrigger className="bg-gray-50 border-gray-300 h-11">
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
            )}

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
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500 font-semibold hover:text-blue-700">
              Sign in
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

export default Register;
