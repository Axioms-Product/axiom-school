
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-white text-2xl font-semibold mb-2">Axioms School</h1>
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Illustration Card */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-lg max-w-sm w-full">
        <div className="text-center">
          {/* Simple Illustration */}
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <svg viewBox="0 0 120 120" className="w-24 h-24">
                {/* Documents */}
                <rect x="20" y="30" width="30" height="40" rx="4" fill="#e5e7eb" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="25" y="20" width="30" height="40" rx="4" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="30" y="10" width="30" height="40" rx="4" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
                
                {/* Calendar */}
                <rect x="70" y="25" width="30" height="35" rx="4" fill="#ffffff" stroke="#d1d5db" strokeWidth="2"/>
                <rect x="70" y="25" width="30" height="8" rx="4" fill="#3b82f6"/>
                <circle cx="75" cy="35" r="1.5" fill="#d1d5db"/>
                <circle cx="80" cy="35" r="1.5" fill="#d1d5db"/>
                <circle cx="85" cy="35" r="1.5" fill="#d1d5db"/>
                <circle cx="90" cy="35" r="1.5" fill="#d1d5db"/>
                <circle cx="95" cy="35" r="1.5" fill="#d1d5db"/>
                <circle cx="75" cy="40" r="1.5" fill="#3b82f6"/>
                <circle cx="80" cy="40" r="1.5" fill="#d1d5db"/>
                <circle cx="85" cy="40" r="1.5" fill="#d1d5db"/>
                
                {/* Cute faces */}
                <circle cx="40" cy="25" r="3" fill="#fbbf24"/>
                <circle cx="38" cy="23" r="0.5" fill="#1f2937"/>
                <circle cx="42" cy="23" r="0.5" fill="#1f2937"/>
                <path d="M37 26 Q40 28 43 26" stroke="#1f2937" strokeWidth="0.5" fill="none"/>
                
                <circle cx="85" cy="45" r="3" fill="#f87171"/>
                <circle cx="83" cy="43" r="0.5" fill="#1f2937"/>
                <circle cx="87" cy="43" r="0.5" fill="#1f2937"/>
                <circle cx="85" cy="46" r="0.5" fill="#1f2937"/>
              </svg>
            </div>
            
            {/* Plus Button */}
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-6">Axioms School Enterprise</p>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Transformative collaboration<br/>
            for larger teams
          </h2>
        </div>
      </div>

      {/* Get Started Button */}
      <Button 
        onClick={() => navigate('/login')}
        className="w-full max-w-sm bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-2xl h-12 font-medium hover:bg-white/30 transition-all"
      >
        Get Started
      </Button>
    </div>
  );
};

export default Welcome;
