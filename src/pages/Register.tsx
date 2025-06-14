
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-600/30 to-pink-600/30 rounded-full blur-3xl transform -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-violet-600/20 to-purple-600/20 rounded-full blur-3xl transform translate-x-20 translate-y-20"></div>
      <div className="absolute bottom-20 left-10 w-64 h-32 bg-gradient-to-r from-pink-500/40 to-red-500/40 rounded-full blur-2xl"></div>

      {/* Back button */}
      <div className="absolute top-12 left-6 z-10">
        <button 
          onClick={() => navigate('/login')}
          className="text-white/80 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex items-center justify-center min-h-screen px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Create</h1>
            <h2 className="text-4xl font-bold text-white">Account</h2>
          </div>

          <RegistrationForm />

          <div className="text-center mt-8">
            <span className="text-gray-400 text-sm">Already have an account? </span>
            <Link to="/login" className="text-purple-400 hover:text-purple-300 text-sm font-medium">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
