
import { Skeleton, SkeletonCard, SkeletonAvatar, SkeletonButton, SkeletonText } from '@/components/ui/skeleton';

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="h-12 w-12 rounded-xl" />
                <div>
                  <Skeleton className="h-8 w-64 mb-2" />
                  <Skeleton className="h-4 w-48" />
                </div>
              </div>
            </div>
            <SkeletonButton className="w-24" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Profile Sidebar Skeleton */}
          <div className="xl:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-lg overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              <div className="p-6 text-center -mt-12 relative">
                <SkeletonAvatar className="h-24 w-24 mx-auto mb-4" />
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-48 mx-auto mb-4" />
                
                <div className="flex flex-wrap gap-2 justify-center mb-4">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>

                {/* Profile completion */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <SkeletonCard>
              <Skeleton className="h-5 w-24 mb-4" />
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
              </div>
            </SkeletonCard>
          </div>

          {/* Details Section Skeleton */}
          <div className="xl:col-span-3 space-y-6">
            {/* Personal Information */}
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-lg">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <SkeletonButton />
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-11 w-full rounded-md" />
                    </div>
                  ))}
                  <div className="lg:col-span-2 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-24 w-full rounded-md" />
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-lg">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b p-6">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                      <div className="flex items-center justify-between mb-3">
                        <Skeleton className="h-6 w-6" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </div>
                      <Skeleton className="h-5 w-12 mb-1" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
