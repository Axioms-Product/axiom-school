
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Award, BookOpen, TrendingUp, User, Calendar, BarChart3, Target, GraduationCap } from 'lucide-react';
import AddMarks from './AddMarks';

const MarksView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMarks } = useData();
  
  const marks = getFilteredMarks();
  const isStudent = currentUser?.role === 'student';

  const calculateAverage = () => {
    if (marks.length === 0) return 0;
    const total = marks.reduce((sum, mark) => sum + (mark.score / mark.totalScore * 100), 0);
    return Math.round(total / marks.length);
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-emerald-500' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-green-500' };
    if (percentage >= 70) return { grade: 'B+', color: 'bg-blue-500' };
    if (percentage >= 60) return { grade: 'B', color: 'bg-indigo-500' };
    if (percentage >= 50) return { grade: 'C', color: 'bg-yellow-500' };
    return { grade: 'F', color: 'bg-red-500' };
  };

  const average = calculateAverage();
  const averageGrade = getGrade(average);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mb-4">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            {isStudent ? 'Academic Performance' : 'Student Marks'}
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {isStudent ? 'Track your academic progress and achievements across all subjects' : 'Monitor and manage student performance across different subjects'}
          </p>
        </div>

        {/* Add Marks for Teachers */}
        {!isStudent && (
          <div className="mb-8">
            <AddMarks />
          </div>
        )}

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Total Subjects</p>
                  <p className="text-3xl font-bold text-gray-900">{marks.length}</p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Overall Average</p>
                  <p className="text-3xl font-bold text-green-600">{average}%</p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Current Grade</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-purple-600">{averageGrade.grade}</p>
                    <div className={`w-3 h-3 rounded-full ${averageGrade.color}`}></div>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-2">Highest Score</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {marks.length > 0 ? Math.max(...marks.map(m => Math.round(m.score / m.totalScore * 100))) : 0}%
                  </p>
                </div>
                <div className="bg-orange-100 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Subject Performance Cards */}
          <div className="xl:col-span-2">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6" />
                  Subject Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {marks.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                      <BarChart3 className="h-12 w-12 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No marks available</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      {isStudent ? 'Your marks will appear here once your teachers publish them.' : 'Start adding marks for your students to see their performance here.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {marks.map((mark) => {
                      const percentage = Math.round((mark.score / mark.totalScore) * 100);
                      const gradeInfo = getGrade(percentage);
                      return (
                        <div key={mark.id} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-6 border hover:shadow-md transition-all duration-300">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <BookOpen className="h-6 w-6 text-blue-600" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="font-semibold text-gray-900 text-lg mb-1">{mark.subject}</h3>
                                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span>{new Date(mark.timestamp).toLocaleDateString()}</span>
                                  </div>
                                  <span className="text-gray-400">•</span>
                                  <span className="font-medium">{mark.testName}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`${gradeInfo.color} text-white font-semibold px-3 py-1 text-sm`}>
                              {gradeInfo.grade}
                            </Badge>
                          </div>
                          
                          <div className="mt-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium text-gray-700">Score</span>
                              <span className="text-sm font-bold text-gray-900">
                                {mark.score}/{mark.totalScore} ({percentage}%)
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                              <div 
                                className={`h-3 rounded-full transition-all duration-500 ${gradeInfo.color}`}
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Performance Summary Sidebar */}
          {marks.length > 0 && (
            <div className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6" />
                    Grade Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {[
                      { label: 'Excellent', range: '90-100%', count: marks.filter(m => (m.score / m.totalScore * 100) >= 90).length, color: 'emerald', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
                      { label: 'Good', range: '80-89%', count: marks.filter(m => { const p = (m.score / m.totalScore * 100); return p >= 80 && p < 90; }).length, color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
                      { label: 'Average', range: '60-79%', count: marks.filter(m => { const p = (m.score / m.totalScore * 100); return p >= 60 && p < 80; }).length, color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' },
                      { label: 'Needs Work', range: 'Below 60%', count: marks.filter(m => (m.score / m.totalScore * 100) < 60).length, color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700' }
                    ].map((item) => (
                      <div key={item.label} className={`${item.bgColor} rounded-lg p-4 border border-${item.color}-200`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className={`text-2xl font-bold ${item.textColor} mb-1`}>{item.count}</div>
                            <div className="text-sm font-medium text-gray-700">{item.label}</div>
                            <div className="text-xs text-gray-500">{item.range}</div>
                          </div>
                          <div className={`w-3 h-3 rounded-full bg-${item.color}-500`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-all duration-300">
                      View Detailed Report
                    </button>
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
                      Download Performance Report
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksView;
