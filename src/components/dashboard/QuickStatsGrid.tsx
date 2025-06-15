
import { EnhancedStatsCard } from './EnhancedStatsCard';
import { BookOpen, Users, Award, Calendar, TrendingUp, Clock } from 'lucide-react';

export const QuickStatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
      <EnhancedStatsCard
        title="Total Students"
        value="1,234"
        change="+12%"
        changeType="positive"
        icon={Users}
        description="Active this semester"
        gradient="from-blue-500 to-blue-600"
      />
      
      <EnhancedStatsCard
        title="Assignments Due"
        value="8"
        change="2 today"
        changeType="neutral"
        icon={BookOpen}
        description="Pending submissions"
        gradient="from-green-500 to-green-600"
      />
      
      <EnhancedStatsCard
        title="Average Grade"
        value="87.5%"
        change="+3.2%"
        changeType="positive"
        icon={Award}
        description="This month"
        gradient="from-purple-500 to-purple-600"
      />
      
      <EnhancedStatsCard
        title="Upcoming Events"
        value="5"
        change="Next 7 days"
        changeType="neutral"
        icon={Calendar}
        description="School activities"
        gradient="from-orange-500 to-orange-600"
      />
      
      <EnhancedStatsCard
        title="Performance"
        value="94.2%"
        change="+1.8%"
        changeType="positive"
        icon={TrendingUp}
        description="Overall progress"
        gradient="from-pink-500 to-pink-600"
      />
      
      <EnhancedStatsCard
        title="Study Time"
        value="24.5h"
        change="This week"
        changeType="neutral"
        icon={Clock}
        description="Total logged hours"
        gradient="from-indigo-500 to-indigo-600"
      />
    </div>
  );
};
