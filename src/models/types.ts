
export enum Subject {
  MATHEMATICS = 'Mathematics',
  SCIENCE = 'Science',
  SOCIAL_SCIENCE = 'Social Science',
  ENGLISH = 'English',
  HINDI = 'Hindi',
  COMPUTER = 'Computer'
}

export interface Homework {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  assignedClass: string;
  dueDate: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
  completedBy?: string[]; // Array of student IDs who completed this homework
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  assignedClass: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  assignedClass: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

export interface Mark {
  id: string;
  studentId: string;
  subject: Subject;
  score: number;
  totalScore: number;
  testName: string;
  examType: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  amount: number;
  purpose: string;
  dueDate: string;
  isPaid: boolean;
  paidDate?: string;
  timestamp: number;
  createdBy: string;
}

export interface ExamSchedule {
  id: string;
  subject: Subject;
  date: string;
  time: string;
  duration: string;
  assignedClass: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}
