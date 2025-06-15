
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Award, BookOpen, TrendingUp, User, Calendar, BarChart3, Target } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-2 sm:p-4 space-y-3 sm:space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white border-0 shadow-xl">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <BarChart3 className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold mb-1">
                  {isStudent ? 'Academic Performance' : 'Student Marks'}
                </h1>
                <p className="text-indigo-100 text-xs sm:text-sm">
                  {isStudent ? 'Track your progress across subjects' : 'Monitor student performance'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Marks for Teachers */}
        {!isStudent && <AddMarks />}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Subjects</p>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{marks.length}</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-1.5 sm:p-2">
                  <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Average</p>
                  <p className="text-lg sm:text-xl font-bold text-green-600">{average}%</p>
                </div>
                <div className="bg-green-100 rounded-lg p-1.5 sm:p-2">
                  <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Grade</p>
                  <div className="flex items-center gap-2">
                    <p className="text-lg sm:text-xl font-bold text-purple-600">{averageGrade.grade}</p>
                    <div className={`w-2 h-2 rounded-full ${averageGrade.color}`}></div>
                  </div>
                </div>
                <div className="bg-purple-100 rounded-lg p-1.5 sm:p-2">
                  <Award className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Best Score</p>
                  <p className="text-lg sm:text-xl font-bold text-orange-600">
                    {marks.length > 0 ? Math.max(...marks.map(m => Math.round(m.score / m.totalScore * 100))) : 0}%
                  </p>
                </div>
                <div className="bg-orange-100 rounded-lg p-1.5 sm:p-2">
                  <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subject Performance - Vertical Layout */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-lg p-3 sm:p-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {marks.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No marks available</h3>
                <p className="text-gray-600 text-sm px-4">
                  {isStudent ? 'Your marks will appear here once published.' : 'Start adding marks for students.'}
                </p>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {marks.map((mark, index) => {
                  const percentage = Math.round((mark.score / mark.totalScore) * 100);
                  const gradeInfo = getGrade(percentage);
                  return (
                    <div key={mark.id} className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{mark.subject}</h3>
                            <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(mark.timestamp).toLocaleDateString()}</span>
                              </div>
                              {!isStudent && (
                                <>
                                  <span className="hidden sm:inline">•</span>
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span className="truncate max-w-20 sm:max-w-none">{mark.studentId}</span>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${gradeInfo.color} text-white font-semibold px-2 py-1 text-xs sm:text-sm flex-shrink-0`}>
                          {gradeInfo.grade}
                        </Badge>
                      </div>
                      
                      {/* Score Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm font-medium text-gray-700">Score</span>
                          <span className="text-xs sm:text-sm font-bold text-gray-900">
                            {mark.score}/{mark.totalScore} ({percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${gradeInfo.color}`}
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

        {/* Performance Summary */}
        {marks.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                {[
                  { label: 'Excellent', range: '80+%', count: marks.filter(m => (m.score / m.totalScore * 100) >= 80).length, color: 'emerald' },
                  { label: 'Good', range: '60-79%', count: marks.filter(m => { const p = (m.score / m.totalScore * 100); return p >= 60 && p < 80; }).length, color: 'blue' },
                  { label: 'Average', range: '40-59%', count: marks.filter(m => { const p = (m.score / m.totalScore * 100); return p >= 40 && p < 60; }).length, color: 'yellow' },
                  { label: 'Needs Work', range: '<40%', count: marks.filter(m => (m.score / m.totalScore * 100) < 40).length, color: 'red' }
                ].map((item) => (
                  <div key={item.label} className={`text-center p-3 sm:p-4 bg-${item.color}-50 rounded-xl border border-${item.color}-200`}>
                    <div className={`text-xl sm:text-2xl font-bold text-${item.color}-600 mb-1`}>{item.count}</div>
                    <div className="text-xs font-medium text-gray-700">{item.label}</div>
                    <div className="text-xs text-gray-500">({item.range})</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarksView;
