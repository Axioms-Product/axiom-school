
import Logo from '@/components/ui/logo';
import { Sparkles, BookOpen, Users, Award, GraduationCap } from 'lucide-react';

const RegistrationHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
        <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl transform hover:scale-105 transition-all duration-500">
          <div className="flex flex-col items-center gap-4">
            <Logo size="lg" showText={false} />
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Axioms School
              </h1>
              <p className="text-white/80 text-sm mt-1 flex items-center gap-2 justify-center">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                Excellence in Education
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </p>
            </div>
          </div>
          
          {/* Enhanced feature highlights */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
              <div className="p-2 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300 transform group-hover:scale-110">
                <BookOpen className="h-4 w-4" />
              </div>
              <span>Learn</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
              <div className="p-2 bg-emerald-500/20 rounded-xl group-hover:bg-emerald-500/30 transition-all duration-300 transform group-hover:scale-110">
                <Users className="h-4 w-4" />
              </div>
              <span>Connect</span>
            </div>
            <div className="flex flex-col items-center gap-1 text-white/80 text-xs group cursor-pointer">
              <div className="p-2 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-all duration-300 transform group-hover:scale-110">
                <Award className="h-4 w-4" />
              </div>
              <span>Achieve</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-emerald-200 bg-clip-text text-transparent">
          Join Our Community
        </h2>
        <p className="text-white/80 flex items-center gap-2 justify-center">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          Create your account and start your journey
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;
