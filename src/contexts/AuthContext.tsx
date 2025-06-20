
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Subject } from '../models/types';

export type UserRole = 'student' | 'teacher';

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  role: UserRole;
  class: string;
  subject?: Subject;
  avatar?: string;
  phone?: string;
  address?: string;
  joiningDate?: string;
  bio?: string;
  qualifications?: string[];
  achievements?: string[];
  emergencyContact?: string;
  experienceYears?: number;
  dateOfBirth?: string;
  bloodGroup?: string;
  hobbies?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUserProfile?: (updates: Partial<User>) => Promise<void>;
}

interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  assignedClass: string;
  subject?: Subject;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = currentUser !== null;

  // Check if there's a logged-in user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const authToken = localStorage.getItem('authToken');
    
    if (storedUser && authToken) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      }
    }
    setLoading(false);
  }, []);

  // Login with username instead of email
  const login = async (username: string, password: string) => {
    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userRecord = Object.values(users).find(
        (u: any) => u.user.username === username && u.password === password
      ) as { user: User, password: string } | undefined;
      
      if (!userRecord) {
        throw new Error('Invalid username or password');
      }
      
      const user = userRecord.user;
      const authToken = `token_${user.id}_${Date.now()}`;
      
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('authToken', authToken);
      
      return;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Updated registration function
  const register = async (userData: RegisterData) => {
    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userExists = Object.values(users).some(
        (u: any) => u.user.email === userData.email || u.user.username === userData.username
      );
      
      if (userExists) {
        throw new Error('User with this email or username already exists');
      }
      
      // Create new user
      const userId = Date.now().toString();
      const newUser: User = {
        id: userId,
        name: userData.name,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        class: userData.assignedClass,
        joiningDate: new Date().toISOString().split('T')[0],
        ...(userData.role === 'teacher' && userData.subject ? { subject: userData.subject } : {})
      };
      
      // Store user in localStorage
      users[userId] = {
        user: newUser,
        password: userData.password
      };
      
      localStorage.setItem('users', JSON.stringify(users));
      
      return;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Logout function - clear all auth data
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('authToken');
  };

  // Enhanced update user profile function
  const updateUserProfile = async (updates: Partial<User>) => {
    if (!currentUser) {
      throw new Error('No authenticated user');
    }

    try {
      // Simulated API request delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update user in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '{}');
      const userRecord = users[currentUser.id];
      
      if (!userRecord) {
        throw new Error('User not found');
      }
      
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      userRecord.user = updatedUser;
      users[currentUser.id] = userRecord;
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
