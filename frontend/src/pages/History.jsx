// client/src/pages/History.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- 1. IMPORT TOAST

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await api.get('/auth/history');
        // The backend returns the list reversed (newest first), but if not, 
        // you can reverse it here: setHistory(data.reverse());
        setHistory(data);
      } catch (error) {
        console.error("Failed to load history");
        // --- 2. ADD ERROR TOAST ---
        toast.error("Failed to load your history. ⚠️");
      }
      setLoading(false);
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Scan History 🕒</h1>

        <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg border overflow-hidden">
            
            {loading ? (
                <div className="p-8 text-center text-gray-500">Loading your history...</div>
            ) : history.length === 0 ? (
                <div className="p-12 text-center">
                    <p className="text-gray-400 mb-4">You haven't scanned any resumes yet.</p>
                </div>
            ) : (
                <div className="divide-y">
                    {history.map((scan, index) => (
                        <div key={index} className="p-6 hover:bg-gray-50 transition-colors flex flex-col md:flex-row justify-between items-center gap-4">
                            
                            {/* Left: Info */}
                            <div className="flex-1">
                                <h3 className="font-bold text-lg text-gray-800">{scan.company || "General Scan"}</h3>
                                <p className="text-sm text-gray-500">
                                    {new Date(scan.date).toLocaleDateString()} at {new Date(scan.date).toLocaleTimeString()}
                                </p>
                            </div>

                            {/* Center: Score */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-600 font-medium text-sm uppercase tracking-wide">Match Score:</span>
                                <div className={`px-4 py-1 rounded-full font-bold text-white shadow-sm
                                    ${scan.score >= 70 ? 'bg-green-500' : scan.score >= 40 ? 'bg-orange-400' : 'bg-red-500'}`}>
                                    {scan.score}%
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default History;