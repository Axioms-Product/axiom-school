
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import RegistrationBackground from '@/components/auth/RegistrationBackground';
import RegistrationHeader from '@/components/auth/RegistrationHeader';
import RegistrationForm from '@/components/auth/RegistrationForm';
import RegistrationFooter from '@/components/auth/RegistrationFooter';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 py-8 relative overflow-hidden">
      <RegistrationBackground />

      <div className="w-full max-w-lg relative z-10">
        <RegistrationHeader />
        <RegistrationForm />
        <RegistrationFooter />
      </div>
    </div>
  );
};

export default Register;
