
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <>
      {/* Enhanced Sign In Link */}
      <div className="relative mt-8">
        <div className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"></div>
        <div className="relative bg-white/90 backdrop-blur-xl border border-white/30 rounded-2xl p-5 text-center shadow-lg hover:shadow-xl transition-all duration-300">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:underline">
              Sign in here →
            </Link>
          </p>
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="text-center mt-8 space-y-3">
        <div className="flex items-center justify-center gap-3 text-white/70 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Secure</span>
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <span>Trusted</span>
          </div>
          <div className="w-1 h-1 bg-white/40 rounded-full"></div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <span>Reliable</span>
          </div>
        </div>
        <p className="text-white/60 text-xs">© 2025 Axioms School. All rights reserved.</p>
      </div>
    </>
  );
};

export default RegistrationFooter;
