// client/src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Highlight the active menu item
  const isActive = (path) => location.pathname === path ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-500 hover:bg-gray-50 hover:text-blue-600";

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  const navItems = [
    { name: "Home", icon: "🏠", path: "/dashboard" },
    { name: "ATS Scanner", icon: "📄", path: "/tools/scanner" }, // Pointing to your existing tool
    { name: "History", icon: "clock", path: "/history" },       // Placeholder for now
    { name: "Profile", icon: "👤", path: "/profile" },  
    { name: "Bullet Fixer", icon: "✍️", path: "/tools/fixer" },        // Placeholder for now
  ];

  return (
    <>
      {/* 1. DESKTOP SIDEBAR (Visible on md+) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r h-screen fixed left-0 top-0 z-20">
        <div className="p-8">
          <Link to="/dashboard" className="flex items-center space-x-3 ">
            <span className="text-2xl font-bold text-blue-600">PlacementPro</span>
          </Link>
          
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)}`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <span>🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MOBILE BOTTOM BAR (Visible on sm only) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t flex justify-around py-3 shadow-lg z-50">
        {navItems.map((item) => (
          <Link key={item.name} to={item.path} className="flex flex-col items-center text-xs text-gray-500">
            <span className="text-xl mb-1">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;