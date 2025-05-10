import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, BedDouble, Search, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-soft py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <BedDouble className="h-8 w-8 text-secondary-500" />
          <span className="text-xl font-bold font-heading text-primary-800">StayScape</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <Link to="/search" className="px-4 py-2 text-primary-700 hover:text-secondary-600 transition-colors">
            <div className="flex items-center gap-1">
              <Search size={16} />
              <span>Explore</span>
            </div>
          </Link>
          
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-neutral-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-secondary-100 flex items-center justify-center">
                  {user?.image ? (
                    <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <User size={16} className="text-secondary-500" />
                  )}
                </div>
                <span className="text-primary-700">{user?.name?.split(' ')[0]}</span>
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-medium border border-neutral-200 animate-fade-in">
                  <div className="py-1">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/bookings" 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      My Bookings
                    </Link>
                    <Link 
                      to="/saved" 
                      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Saved Listings
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-error-500 hover:bg-neutral-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link 
                to="/login" 
                className="px-4 py-2 text-primary-700 hover:text-secondary-600 rounded-2xl transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-secondary-500 text-white rounded-2xl hover:bg-secondary-600 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden rounded-full p-2 hover:bg-neutral-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 animate-slide-up">
          <div className="flex flex-col space-y-2 px-2">
            <Link 
              to="/search" 
              className="px-4 py-3 text-primary-700 hover:bg-neutral-100 rounded-2xl"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Search size={18} />
                <span>Explore</span>
              </div>
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="px-4 py-3 text-primary-700 hover:bg-neutral-100 rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/bookings" 
                  className="px-4 py-3 text-primary-700 hover:bg-neutral-100 rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Bookings
                </Link>
                <Link 
                  to="/saved" 
                  className="px-4 py-3 text-primary-700 hover:bg-neutral-100 rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saved Listings
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-left px-4 py-3 text-error-500 hover:bg-neutral-100 rounded-2xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-3 text-primary-700 hover:bg-neutral-100 rounded-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-3 bg-secondary-500 text-white rounded-2xl hover:bg-secondary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;