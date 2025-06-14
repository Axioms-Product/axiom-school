
import { Link } from 'react-router-dom';

const RegistrationFooter = () => {
  return (
    <div className="text-center mt-6">
      <p className="text-gray-600 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-700">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegistrationFooter;
