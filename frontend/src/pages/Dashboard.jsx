// client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [user, setUser] = useState({ name: "Student" });
  const [history, setHistory] = useState([]);

  // Load User Data & Recent History
  useEffect(() => {
    // 1. Get Name
    const storedUser = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) setUser(storedUser);

    // 2. Get History (and cut it to top 3)
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/auth/history');
        setHistory(data.slice(0, 3)); // <--- ONLY KEEP TOP 3
      } catch (error) {
        console.error("Failed to load history on dashboard");
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 1. SIDEBAR */}
      <Sidebar />
      
      {/* 2. MAIN CONTENT */}
      <div className="flex-1 md:ml-64 p-8 pb-24">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Hello, {user.name}! 👋</h1>
          <p className="text-gray-500 mt-2">Ready to land your dream job? Pick a tool below.</p>
        </div>

        {/* TOOL CARDS (Grid) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1: Scanner */}
          <Link to="/tools/scanner" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">📄</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">ATS Scanner</h3>
            <p className="text-gray-500 text-sm">Check your resume score and find missing keywords.</p>
          </Link>

          {/* Card 2: Emailer */}
          <Link to="/tools/email" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">✉️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cold Emailer</h3>
            <p className="text-gray-500 text-sm">Write professional emails to HR in seconds.</p>
          </Link>

          {/* Card 3: Bullet Fixer */}
          <Link to="/tools/fixer" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">✍️</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Bullet Fixer</h3>
            <p className="text-gray-500 text-sm">Rewrite your experience to sound more impressive.</p>
          </Link>
        
        </div>

        {/* RECENT ACTIVITY SECTION */}
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Scans</h2>
            <Link to="/history" className="text-blue-600 font-medium text-sm hover:underline">View All</Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border divide-y overflow-hidden">
          {history.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
                <p>No scans yet.</p>
                <Link to="/tools/scanner" className="text-blue-500 text-sm font-bold mt-2 block">Try the ATS Scanner</Link>
            </div>
          ) : (
            history.map((scan, index) => (
              <div key={index} className="p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                <div>
                  <div className="font-bold text-gray-700">{scan.company || "Job Analysis"}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(scan.date).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Score Badge */}
                <div className={`px-3 py-1 rounded-full text-sm font-bold 
                    ${scan.score >= 70 ? 'bg-green-100 text-green-700' : scan.score >= 40 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                  {scan.score}%
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;