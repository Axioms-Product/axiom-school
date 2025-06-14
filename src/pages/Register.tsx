
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronLeft } from 'lucide-react';
import RegistrationForm from '@/components/auth/RegistrationForm';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-12">
        <button 
          onClick={() => navigate('/login')}
          className="text-white p-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4">
          <span className="text-white text-sm">Already have an account?</span>
          <Link 
            to="/login"
            className="text-white text-sm font-medium bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <h1 className="text-white text-2xl font-semibold">Axioms School</h1>
      </div>

      {/* Registration Form Card */}
      <div className="bg-white rounded-t-3xl min-h-[70vh] px-6 pt-8">
        <div className="max-w-sm mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Get started free.</h2>
          <p className="text-gray-600 text-sm mb-8">Free forever. No credit card needed.</p>

          <RegistrationForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
