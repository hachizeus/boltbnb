import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the path the user was trying to access before being redirected to login
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }
    
    try {
      setIsLoading(true);
      await login(email, password);
      
      // Navigate to the page they were trying to access, or home if they came directly to login
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      // Error toast is shown in the AuthContext
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-medium max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary-800 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Sign in to continue your journey</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 w-full p-3 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-secondary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-secondary-500 focus:ring-secondary-500 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700">
                Remember me
              </label>
            </div>
            
            <a href="#" className="text-sm font-medium text-secondary-600 hover:text-secondary-700">
              Forgot password?
            </a>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 ${
              isLoading
                ? 'bg-neutral-400'
                : 'bg-secondary-500 hover:bg-secondary-600'
            } text-white rounded-2xl transition-colors flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <>
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In</span>
              </>
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-neutral-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-secondary-600 hover:text-secondary-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 text-center mb-4">
            For demo purposes, you can sign in with:
          </p>
          <div className="bg-primary-50 p-3 rounded-lg text-sm">
            <p><strong>Email:</strong> john@example.com</p>
            <p><strong>Password:</strong> password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;