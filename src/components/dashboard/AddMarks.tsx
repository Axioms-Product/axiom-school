
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject } from '@/models/types';
import { Plus, Save, X } from 'lucide-react';

const AddMarks = () => {
  const { currentUser } = useAuth();
  const { addMark, getStudentsForClass } = useData();
  const [formData, setFormData] = useState({
    studentId: '',
    subject: currentUser?.subject || '',
    score: '',
    totalScore: '',
    examType: 'Weekly Test',
    testName: ''
  });
  const [isAdding, setIsAdding] = useState(false);

  const students = getStudentsForClass(currentUser?.class || '');
  
  // Teacher can only add marks for their own subject
  const availableSubjects = currentUser?.role === 'teacher' && currentUser?.subject 
    ? [currentUser.subject] 
    : Object.values(Subject);

  const examTypes = [
    'Weekly Test',
    'Periodic Test',
    'Half Yearly',
    'Final Exam',
    'Others'
  ];

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
      examType: 'Weekly Test',
      testName: ''
    });
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <Card className="bg-white shadow-md border-0 rounded-xl">
        <CardContent className="p-3">
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-9 text-sm font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Student Marks
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md border-0 rounded-xl">
      <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-xl p-3">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Student Marks
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(false)}
            className="h-6 w-6 p-0 hover:bg-white/20 text-white"
          >
            <X className="h-3 w-3" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="student" className="text-xs font-medium">Select Student</Label>
            <Select
              value={formData.studentId}
              onValueChange={(value) => handleInputChange('studentId', value)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Choose student..." />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="subject" className="text-xs font-medium">Subject</Label>
            <Select
              value={formData.subject}
              onValueChange={(value) => handleInputChange('subject', value)}
              disabled={currentUser?.role === 'teacher'}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {availableSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="examType" className="text-xs font-medium">Exam Type</Label>
            <Select
              value={formData.examType}
              onValueChange={(value) => handleInputChange('examType', value)}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="testName" className="text-xs font-medium">Test Name (Optional)</Label>
            <Input
              id="testName"
              value={formData.testName}
              onChange={(e) => handleInputChange('testName', e.target.value)}
              placeholder="e.g. Chapter 1 Test"
              className="h-8 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="score" className="text-xs font-medium">Marks Obtained</Label>
              <Input
                id="score"
                type="number"
                value={formData.score}
                onChange={(e) => handleInputChange('score', e.target.value)}
                placeholder="85"
                className="h-8 text-xs"
                min="0"
                required
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="totalScore" className="text-xs font-medium">Total Marks</Label>
              <Input
                id="totalScore"
                type="number"
                value={formData.totalScore}
                onChange={(e) => handleInputChange('totalScore', e.target.value)}
                placeholder="100"
                className="h-8 text-xs"
                min="1"
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAdding(false)}
              className="flex-1 h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 h-8 text-xs"
            >
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMarks;
