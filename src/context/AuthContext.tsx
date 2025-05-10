import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { getUserByEmail } from '../data/users';
import toast from 'react-hot-toast';

const initialState: AuthContextType = {
  user: null,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialState);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would be an API call to validate credentials
      const user = getUserByEmail(email);
      
      if (user) {
        // Store user in state and localStorage
        setUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(user));
        toast.success('Successfully logged in');
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const existingUser = getUserByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }
      
      // In a real app, this would create a new user in the database
      const newUser: User = {
        id: `user${Date.now()}`,
        name,
        email,
        savedListings: [],
        bookings: [],
      };
      
      // Store user in state and localStorage
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast.success('Account created successfully');
    } catch (error) {
      toast.error('Signup failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};