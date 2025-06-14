
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Subject } from '@/models/types';

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
        <Input
          placeholder="Full name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="h-14 bg-black/30 border-none rounded-2xl text-white placeholder:text-gray-400 backdrop-blur-sm"
          required
        />
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="h-14 bg-black/30 border-none rounded-2xl text-white placeholder:text-gray-400 backdrop-blur-sm"
          required
        />
      </div>
      
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className="h-14 bg-black/30 border-none rounded-2xl text-white placeholder:text-gray-400 backdrop-blur-sm"
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Select
            value={formData.role}
            onValueChange={(value) => handleInputChange('role', value)}
          >
            <SelectTrigger className="h-14 bg-black/30 border-none rounded-2xl text-white backdrop-blur-sm">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="student" className="text-white">Student</SelectItem>
              <SelectItem value="teacher" className="text-white">Teacher</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Select
            value={formData.assignedClass}
            onValueChange={(value) => handleInputChange('assignedClass', value)}
          >
            <SelectTrigger className="h-14 bg-black/30 border-none rounded-2xl text-white backdrop-blur-sm">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {classes.map((cls) => (
                <SelectItem key={cls} value={cls} className="text-white">
                  Class {cls}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {formData.role === 'teacher' && (
        <div>
          <Select
            value={formData.subject}
            onValueChange={(value) => handleInputChange('subject', value)}
          >
            <SelectTrigger className="h-14 bg-black/30 border-none rounded-2xl text-white backdrop-blur-sm">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {subjects.map((subj) => (
                <SelectItem key={subj} value={subj} className="text-white">
                  {subj}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-sm backdrop-blur-sm">
          {error}
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full h-14 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-2xl border-none shadow-lg mt-8"
        disabled={loading}
      >
        {loading ? 'Creating...' : 'Sign up'}
      </Button>
    </form>
  );
};

export default RegistrationForm;
