
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <>
      <div className="mt-6">
        <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-white/60 text-xs">© 2025 Axioms School. All rights reserved.</p>
      </div>
    </>
  );
};

export default RegistrationFooter;
