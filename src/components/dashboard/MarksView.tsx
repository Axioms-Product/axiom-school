
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogClose 
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useData } from '@/contexts/DataContext';
import { Subject, Mark } from '@/models/types';
import { format } from 'date-fns';
import { Book, PlusCircle } from 'lucide-react';

const MarksView = () => {
  const { currentUser } = useAuth();
  const { getFilteredMarks, addMark } = useData();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [subject, setSubject] = useState<Subject>(
    (currentUser?.role === 'teacher' && currentUser?.subject) 
      ? currentUser.subject 
      : Subject.MATHEMATICS
  );
  const [score, setScore] = useState('');
  const [totalScore, setTotalScore] = useState('100');
  const [testName, setTestName] = useState('');
  const [activeTab, setActiveTab] = useState<Subject | 'all'>(
    (currentUser?.role === 'teacher' && currentUser?.subject) 
      ? currentUser.subject 
      : 'all'
  );
  
  const isTeacher = currentUser?.role === 'teacher';
  const marks = getFilteredMarks();

  // Get students from the class for teacher to select
  const students = useData().getTeachersForClass(currentUser?.class || '').filter(
    user => user.role === 'student'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studentId || !testName || !score) return;
    
    addMark({
      studentId,
      subject,
      score: Number(score),
      totalScore: Number(totalScore),
      testName
    });
    
    // Reset form
    setStudentId('');
    setTestName('');
    setScore('');
    setTotalScore('100');
    setDialogOpen(false);
  };

  const getFilteredMarksBySubject = () => {
    if (activeTab === 'all') return marks;
    return marks.filter(mark => mark.subject === activeTab);
  };

  const calculateAverage = (subj: Subject) => {
    const subjectMarks = marks.filter(mark => mark.subject === subj);
    if (subjectMarks.length === 0) return 'N/A';
    
    const total = subjectMarks.reduce((acc, mark) => acc + (mark.score / mark.totalScore) * 100, 0);
    return `${(total / subjectMarks.length).toFixed(1)}%`;
  };

  const subjectList = Object.values(Subject);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marks</h1>
          <p className="text-muted-foreground mt-1">
            {isTeacher 
              ? `Manage student marks for ${currentUser?.subject}`
              : "View your academic performance"
            }
          </p>
        </div>
        
        {isTeacher && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-cgs-blue hover:bg-cgs-blue/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Mark
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Mark</DialogTitle>
                <DialogDescription>
                  Enter the details for the student's mark
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="student">Student</Label>
                    <Select
                      value={studentId}
                      onValueChange={setStudentId}
                      required
                    >
                      <SelectTrigger id="student">
                        <SelectValue placeholder="Select Student" />
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
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    {currentUser?.subject ? (
                      <Input 
                        id="subject" 
                        value={currentUser.subject} 
                        disabled 
                      />
                    ) : (
                      <Select
                        value={subject}
                        onValueChange={(val) => setSubject(val as Subject)}
                        required
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjectList.map((subj) => (
                            <SelectItem key={subj} value={subj}>
                              {subj}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="test-name">Test Name</Label>
                    <Input 
                      id="test-name"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      placeholder="e.g., Midterm Exam"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="score">Score</Label>
                      <Input 
                        id="score"
                        type="number"
                        min="0"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="total-score">Total Score</Label>
                      <Input 
                        id="total-score"
                        type="number"
                        min="1"
                        value={totalScore}
                        onChange={(e) => setTotalScore(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit" className="bg-cgs-blue hover:bg-cgs-blue/90">
                    Add Mark
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {!isTeacher && marks.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {subjectList.map((subj) => (
            <Card key={subj} className="relative overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">{subj}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{calculateAverage(subj)}</div>
              </CardContent>
              <div className={`absolute inset-y-0 right-0 w-1 ${
                calculateAverage(subj) === 'N/A' 
                  ? 'bg-gray-300' 
                  : parseInt(calculateAverage(subj)) >= 85
                    ? 'bg-green-500'
                    : parseInt(calculateAverage(subj)) >= 70
                      ? 'bg-blue-500'
                      : parseInt(calculateAverage(subj)) >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
              }`}></div>
            </Card>
          ))}
        </div>
      )}

      {marks.length === 0 ? (
        <Card className="bg-gray-50 dark:bg-gray-800 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="rounded-full bg-gray-100 dark:bg-gray-700 p-3">
              <Book className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-medium">No marks found</h3>
            <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
              {isTeacher 
                ? "You haven't added any marks yet. Add marks for your students."
                : "Your teachers haven't added any marks yet."
              }
            </p>
            {isTeacher && (
              <Button 
                className="mt-4 bg-cgs-blue hover:bg-cgs-blue/90"
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Mark
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{isTeacher ? "Student Marks" : "Your Marks"}</CardTitle>
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Subject | 'all')}>
                  <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                    <TabsTrigger value="all">All</TabsTrigger>
                    {subjectList.map(subj => (
                      <TabsTrigger key={subj} value={subj} disabled={isTeacher && currentUser?.subject && currentUser.subject !== subj}>
                        {subj.substring(0, 3)}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isTeacher ? "Student" : "Subject"}</TableHead>
                      <TableHead>{isTeacher ? "Subject" : "Test"}</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredMarksBySubject().map((mark) => {
                      // Find student name if we're a teacher
                      const studentName = isTeacher 
                        ? students.find(s => s.id === mark.studentId)?.name || "Unknown Student"
                        : "";
                        
                      const percentage = ((mark.score / mark.totalScore) * 100).toFixed(1);
                      
                      return (
                        <TableRow key={mark.id}>
                          <TableCell>
                            {isTeacher ? studentName : mark.subject}
                          </TableCell>
                          <TableCell>
                            {isTeacher ? mark.subject : mark.testName}
                          </TableCell>
                          <TableCell>
                            {mark.score}/{mark.totalScore}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className={
                                Number(percentage) >= 85
                                  ? 'text-green-600'
                                  : Number(percentage) >= 70
                                    ? 'text-blue-600'
                                    : Number(percentage) >= 50
                                      ? 'text-yellow-600'
                                      : 'text-red-600'
                              }>
                                {percentage}%
                              </span>
                              <div className="hidden md:block w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className={`h-full ${
                                  Number(percentage) >= 85
                                    ? 'bg-green-500'
                                    : Number(percentage) >= 70
                                      ? 'bg-blue-500'
                                      : Number(percentage) >= 50
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                                }`} style={{ width: `${percentage}%` }}></div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {format(new Date(mark.timestamp), 'MMM d, yyyy')}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarksView;
