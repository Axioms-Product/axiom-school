
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LeftSideIllustration from '@/components/auth/LeftSideIllustration';
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
    <div className="min-h-screen flex bg-gray-50">
      <LeftSideIllustration />
      
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <RegistrationHeader />
          <RegistrationForm />
          <RegistrationFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;
