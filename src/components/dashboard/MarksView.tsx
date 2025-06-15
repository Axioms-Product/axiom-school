
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Award, BookOpen, TrendingUp, User, Calendar, BarChart3 } from 'lucide-react';
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

  const performanceData = {
    excellent: marks.filter(m => (m.score / m.totalScore * 100) >= 80).length,
    good: marks.filter(m => {
      const percentage = (m.score / m.totalScore * 100);
      return percentage >= 60 && percentage < 80;
    }).length,
    average: marks.filter(m => {
      const percentage = (m.score / m.totalScore * 100);
      return percentage >= 40 && percentage < 60;
    }).length,
    poor: marks.filter(m => (m.score / m.totalScore * 100) < 40).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-y-auto">
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white border-0 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Award className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {isStudent ? 'My Academic Performance' : 'Student Marks Overview'}
                </h1>
                <p className="text-purple-100">
                  {isStudent ? 'Track your progress across all subjects' : 'Monitor and manage student grades'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add Marks for Teachers */}
        {!isStudent && <AddMarks />}

        {/* Overview Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{marks.length}</p>
                  <p className="text-xs text-gray-500">Subjects</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Average</p>
                  <p className="text-2xl font-bold text-green-600">{average}%</p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Grade</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-purple-600">{averageGrade.grade}</p>
                    <div className={`w-3 h-3 rounded-full ${averageGrade.color}`}></div>
                  </div>
                  <p className="text-xs text-gray-500">Overall</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Best</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {marks.length > 0 ? Math.max(...marks.map(m => Math.round(m.score / m.totalScore * 100))) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
                <div className="bg-orange-100 rounded-lg p-3">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Marks Table */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Subject Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {marks.length === 0 ? (
              <div className="text-center py-12">
                <Award className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No marks available</h3>
                <p className="text-gray-600">
                  {isStudent ? 'Your marks will appear here once teachers publish them.' : 'Start adding marks for your students.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Subject</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">Score</th>
                      <th className="text-center py-4 px-6 font-semibold text-gray-900">Grade</th>
                      <th className="text-left py-4 px-6 font-semibold text-gray-900">Date</th>
                      {!isStudent && <th className="text-left py-4 px-6 font-semibold text-gray-900">Student</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {marks.map((mark, index) => {
                      const percentage = Math.round((mark.score / mark.totalScore) * 100);
                      const gradeInfo = getGrade(percentage);
                      return (
                        <tr key={mark.id} className={`border-b hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-900">{mark.subject}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <div className="text-lg font-bold text-gray-900">
                                {mark.score}/{mark.totalScore}
                              </div>
                              <div className="text-sm text-gray-600">({percentage}%)</div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Badge className={`${gradeInfo.color} text-white font-semibold`}>
                              {gradeInfo.grade}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{new Date(mark.timestamp).toLocaleDateString()}</span>
                            </div>
                          </td>
                          {!isStudent && (
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{mark.studentId}</span>
                              </div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Performance Summary */}
        {marks.length > 0 && (
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600 mb-1">{performanceData.excellent}</div>
                  <div className="text-sm text-gray-600">Excellent (80+%)</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{performanceData.good}</div>
                  <div className="text-sm text-gray-600">Good (60-79%)</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{performanceData.average}</div>
                  <div className="text-sm text-gray-600">Average (40-59%)</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-1">{performanceData.poor}</div>
                  <div className="text-sm text-gray-600">Needs Work (&lt;40%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MarksView;
