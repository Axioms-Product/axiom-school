
import { GraduationCap } from 'lucide-react';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
          Create Account
        </h1>
        <p className="text-white/70 flex items-center gap-2 justify-center text-lg">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          Join Axioms School today
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;
