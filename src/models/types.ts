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

export enum Subject {
  MATHEMATICS = "Mathematics",
  SCIENCE = "Science",
  SOCIAL_SCIENCE = "Social Science",
  ENGLISH = "English",
  COMPUTER = "Computer"
}
