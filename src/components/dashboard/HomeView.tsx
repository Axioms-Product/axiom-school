
import { QuickStatsGrid } from './QuickStatsGrid';
import { NotificationPanel } from './NotificationPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, Users, MessageSquare, TrendingUp, Plus } from 'lucide-react';

const HomeView = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome back, Alex! 👋</h1>
            <p className="text-blue-100">You have 3 assignments due this week and 2 upcoming events.</p>
          </div>
          <Button variant="secondary" className="hover:scale-105 transition-transform">
            <Plus className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <QuickStatsGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'Submitted', item: 'Math Assignment #5', time: '2 hours ago', type: 'success' },
                  { action: 'Received', item: 'Grade for English Essay', time: '1 day ago', type: 'info' },
                  { action: 'Joined', item: 'Study Group - Physics', time: '2 days ago', type: 'neutral' },
                  { action: 'Completed', item: 'Science Lab Report', time: '3 days ago', type: 'success' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'success' ? 'bg-green-500' : 
                        activity.type === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`} />
                      <div>
                        <p className="font-medium text-sm">
                          {activity.action} <span className="text-blue-600">{activity.item}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline">{activity.action}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Panel */}
        <div>
          <NotificationPanel />
        </div>
      </div>

      {/* Upcoming Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Assignments */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { subject: 'Math', title: 'Calculus Problem Set', due: 'Tomorrow', priority: 'high' },
                { subject: 'English', title: 'Literature Essay', due: 'Friday', priority: 'medium' },
                { subject: 'Science', title: 'Lab Report', due: 'Next Monday', priority: 'low' },
              ].map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={
                      assignment.priority === 'high' ? 'destructive' : 
                      assignment.priority === 'medium' ? 'default' : 'secondary'
                    }>
                      {assignment.due}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Class Schedule */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: '9:00 AM', subject: 'Mathematics', room: 'Room 101', status: 'completed' },
                { time: '10:30 AM', subject: 'English', room: 'Room 203', status: 'current' },
                { time: '1:00 PM', subject: 'Science', room: 'Lab A', status: 'upcoming' },
                { time: '2:30 PM', subject: 'History', room: 'Room 105', status: 'upcoming' },
              ].map((class_, index) => (
                <div key={index} className={`flex items-center justify-between p-3 rounded-lg border ${
                  class_.status === 'current' ? 'bg-blue-50 border-blue-200' : 
                  class_.status === 'completed' ? 'bg-gray-50' : 'bg-white'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${
                      class_.status === 'completed' ? 'bg-green-500' :
                      class_.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{class_.subject}</p>
                      <p className="text-xs text-muted-foreground">{class_.room}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium">{class_.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HomeView;
