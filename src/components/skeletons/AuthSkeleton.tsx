
import { Skeleton, SkeletonButton } from '@/components/ui/skeleton';

const AuthSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
          {/* Header */}
          <div className="text-center mb-8">
            <Skeleton className="w-16 h-16 rounded-2xl mx-auto mb-4" />
            <Skeleton className="h-7 w-48 mx-auto mb-2" />
            <Skeleton className="h-4 w-40 mx-auto" />
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-12 h-12 rounded-xl mx-auto mb-2" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            ))}
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-12 w-full rounded-md" />
              </div>
            ))}
            
            <SkeletonButton className="w-full h-12" />
          </div>

          {/* Footer Link */}
          <div className="text-center mt-6">
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center mt-6">
          <Skeleton className="h-3 w-56 mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default AuthSkeleton;
