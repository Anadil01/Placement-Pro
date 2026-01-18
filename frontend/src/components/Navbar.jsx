import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  // Helper to check if link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* --- LOGO SECTION (OPTION 1: GRADIENT) --- */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* Icon with subtle bounce animation */}
            <div className="text-3xl group-hover:-translate-y-1 transition-transform duration-300">
              🚀
            </div>
            
            {/* Gradient Text */}
            <span className="text-2xl font-extrabold tracking-tighter bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              PlacementPro
            </span>
          </Link>
          {/* ----------------------------------------- */}

          {/* Right Side Buttons */}
          <div className="flex items-center gap-4">
            
            {/* Hide Login button if on Login page */}
            {!isActive('/login') && (
              <Link 
                to="/login" 
                className="text-gray-600 font-medium hover:text-blue-600 transition-colors px-4 py-2"
              >
                Login
              </Link>
            )}

            {/* Hide Signup button if on Signup page */}
            {!isActive('/signup') && (
              <Link 
                to="/signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;