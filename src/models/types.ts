export interface Homework {
  id: string;
  title: string;
  description: string;
  assignedClass: string;
  subject: Subject;
  dueDate: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface Notice {
  id: string;
  title: string;
  description: string;
  assignedClass: string;
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  assignedClass: string;
  location: string;
  date: string;
  time: string;
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
  timestamp: number;
  createdBy: string;
  creatorName: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  month: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  paidDate?: string;
  createdBy: string;
  timestamp: number;
}

export interface ExamSchedule {
  id: string;
  title: string;
  assignedClass: string;
  subject: Subject;
  date: string;
  startTime: string;
  endTime: string;
  roomNumber?: string;
  description?: string;
  createdBy: string;
  creatorName: string;
  timestamp: number;
}

export enum Subject {
  MATHEMATICS = "Mathematics",
  SCIENCE = "Science",
  SOCIAL_SCIENCE = "Social Science",
  ENGLISH = "English",
  COMPUTER = "Computer"
}
