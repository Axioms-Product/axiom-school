import { Link } from 'react-router-dom';

const LeftSideIllustration = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center p-12">
      <div className="text-center">
        <div className="mb-8">
          <svg viewBox="0 0 400 300" className="w-80 h-60">
            {/* Team illustration */}
            <g>
              {/* Person 1 */}
              <ellipse cx="120" cy="250" rx="60" ry="15" fill="#e5e7eb" opacity="0.3"/>
              <g transform="translate(120, 200)">
                <ellipse cx="0" cy="30" rx="15" ry="25" fill="#3b82f6"/>
                <circle cx="0" cy="0" r="12" fill="#fbbf24"/>
                <ellipse cx="0" cy="-5" rx="8" ry="6" fill="#1f2937"/>
              </g>
              
              {/* Person 2 */}
              <ellipse cx="280" cy="250" rx="60" ry="15" fill="#e5e7eb" opacity="0.3"/>
              <g transform="translate(280, 200)">
                <ellipse cx="0" cy="30" rx="15" ry="25" fill="#1f2937"/>
                <circle cx="0" cy="0" r="12" fill="#fbbf24"/>
                <ellipse cx="0" cy="-5" rx="8" ry="6" fill="#1f2937"/>
              </g>
              
              {/* Connection lines */}
              <g>
                <circle cx="150" cy="150" r="8" fill="#3b82f6"/>
                <circle cx="200" cy="120" r="6" fill="#8b5cf6"/>
                <circle cx="250" cy="150" r="8" fill="#06b6d4"/>
                <line x1="150" y1="150" x2="200" y2="120" stroke="#3b82f6" strokeWidth="2"/>
                <line x1="200" y1="120" x2="250" y2="150" stroke="#3b82f6" strokeWidth="2"/>
              </g>
            </g>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Team work all</h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Convallis vitae dictum justo, iaculis ut.<br/>
          Cras a ac augue netus sagittis semper<br/>
          varius facilisis id.
        </p>
        
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
        </div>
        
        <div className="flex space-x-4">
          <Link 
            to="/login"
            className="px-8 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Sign in
          </Link>
          <Link 
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeftSideIllustration;
