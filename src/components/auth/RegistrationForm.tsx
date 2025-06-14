
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';
import { Eye, EyeOff } from 'lucide-react';

const RegistrationForm = () => {
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const classes = ['VI', 'VII', 'VIII', 'IX', 'X'];
  const subjects = Object.values(Subject);

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-2">Email</label>
        <Input
          type="email"
          placeholder="nicholas@ergemla.com"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm"
          required
        />
      </div>
      
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-2">Name</label>
        <Input
          placeholder="Nicholas Ergemla"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm"
          required
        />
      </div>
      
      <div>
        <label className="text-gray-700 text-sm font-medium block mb-2">Username</label>
        <Input
          placeholder="nicholasergemla"
          value={formData.username}
          onChange={(e) => handleInputChange('username', e.target.value)}
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
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
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
          <div className="absolute right-12 top-1/2 transform -translate-y-1/2 text-xs text-green-500 font-medium">
            Strong
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-gray-700 text-sm font-medium block mb-2">Role</label>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange('role', value)}
          >
            <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="student">Student</SelectItem>
              <SelectItem value="teacher">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-gray-700 text-sm font-medium block mb-2">Class</label>
          <Select
            value={formData.assignedClass}
            onValueChange={(value) => handleInputChange('assignedClass', value)}
          >
            <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls}>
                  Class {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {formData.role === 'teacher' && (
        <div>
          <label className="text-gray-700 text-sm font-medium block mb-2">Subject</label>
          <Select
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
          >
            <SelectTrigger className="h-12 border-gray-200 rounded-xl bg-gray-50 border-0 text-sm">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subj) => (
                <SelectItem key={subj} value={subj}>
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

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
        {loading ? 'Creating...' : 'Sign up'}
      </Button>
    </form>
  );
};

export default RegistrationForm;
