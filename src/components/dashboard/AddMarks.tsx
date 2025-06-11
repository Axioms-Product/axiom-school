
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { Plus, Save } from 'lucide-react';

const AddMarks = () => {
  const { currentUser } = useAuth();
  const { addMark, getStudentsForClass } = useData();
  const [formData, setFormData] = useState({
    studentId: '',
    subject: currentUser?.subject || '',
    score: '',
    totalScore: '',
    examType: 'Test',
    testName: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const students = getStudentsForClass(currentUser?.class || '');
  const subjects = Object.values(Subject);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.subject || !formData.score || !formData.totalScore) {
      return;
    }

    addMark({
      studentId: formData.studentId,
      subject: formData.subject as Subject,
      score: parseInt(formData.score),
      totalScore: parseInt(formData.totalScore),
      examType: formData.examType,
      testName: formData.testName || formData.examType
    });

    // Reset form
    setFormData({
      studentId: '',
      subject: currentUser?.subject || '',
      score: '',
      totalScore: '',
      examType: 'Test',
      testName: ''
    });
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Card className="bg-white shadow-lg border-0 rounded-lg">
        <CardContent className="p-4">
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student Marks
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-lg border-0 rounded-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Plus className="h-4 w-4" />
          Add Student Marks
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="student" className="text-sm">Select Student</Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) => handleInputChange('studentId', value)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Choose student..." />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} {student.rollNo && `(${student.rollNo})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm">Subject</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange('subject', value)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="score" className="text-sm">Marks Obtained</Label>
              <Input
                id="score"
                type="number"
                value={formData.score}
                onChange={(e) => handleInputChange('score', e.target.value)}
                placeholder="e.g. 85"
                className="h-8 text-sm"
                min="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalScore" className="text-sm">Total Marks</Label>
              <Input
                id="totalScore"
                type="number"
                value={formData.totalScore}
                onChange={(e) => handleInputChange('totalScore', e.target.value)}
                placeholder="e.g. 100"
                className="h-8 text-sm"
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="examType" className="text-sm">Exam Type</Label>
            <Select
              value={formData.examType}
              onValueChange={(value) => handleInputChange('examType', value)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Test">Test</SelectItem>
                <SelectItem value="Quiz">Quiz</SelectItem>
                <SelectItem value="Assignment">Assignment</SelectItem>
                <SelectItem value="Exam">Exam</SelectItem>
                <SelectItem value="Final">Final Exam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              className="flex-1 text-sm"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-sm"
            >
              <Save className="h-3 w-3 mr-1" />
              Save Marks
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMarks;
