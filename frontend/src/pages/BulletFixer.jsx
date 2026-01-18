import React, { useState } from 'react';
import api from '../api/axios'; 
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- 1. IMPORT ADDED

const BulletFixer = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); 

  const handleFix = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post('/fix-bullet', { bullet: input });
      setResult(data.fixed);
      
      // Add to local history list
      setHistory(prev => [{ original: input, fixed: data.fixed }, ...prev]);
      
        // --- 2. REPLACE SUCCESS ALERT ---
      toast.success("Rewritten successfully! ✨");

    } catch (error) {
      // --- 2. REPLACE ERROR ALERT ---
      toast.error("Failed to fix text. Try again. ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Bullet Point Fixer ✍️</h1>
        
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8">
            
            {/* LEFT: INPUT */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit">
                <h3 className="font-bold text-gray-700 mb-4">Your Draft (Weak)</h3>
                <textarea 
                    className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-purple-500 text-lg"
                    placeholder="e.g. I made a website for food..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button 
                    onClick={handleFix}
                    disabled={loading || !input}
                    className={`w-full mt-4 py-3 rounded-xl text-white font-bold text-lg transition-all 
                    ${loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700 shadow-md hover:-translate-y-1"}`}
                >
                    {loading ? "Polishing..." : "✨ Rewrite Magic"}
                </button>
            </div>

            {/* RIGHT: OUTPUT */}
            <div className="bg-white p-6 rounded-xl shadow-lg h-fit border-2 border-purple-50">
                <h3 className="font-bold text-purple-700 mb-4">Professional Version</h3>
                
                {result ? (
                    <div className="animate-fade-in">
                        <div className="bg-purple-50 p-6 rounded-xl border border-purple-100 mb-4">
                            <p className="text-xl text-gray-800 font-medium leading-relaxed">"{result}"</p>
                        </div>
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(result);
                                // --- 3. REPLACE COPIED ALERT ---
                                toast.success("Copied to clipboard! 📋"); 
                            }}
                            className="text-sm font-bold text-purple-600 hover:text-purple-800 flex items-center gap-2"
                        >
                            📋 Copy to Clipboard
                        </button>
                    </div>
                ) : (
                    <div className="h-40 flex items-center justify-center text-gray-400 italic bg-gray-50 rounded-xl">
                        AI output will appear here...
                    </div>
                )}
            </div>

        </div>

        {/* SESSION HISTORY */}
        {history.length > 0 && (
            <div className="w-full max-w-4xl mt-12">
                <h3 className="text-gray-500 font-bold mb-4 uppercase text-sm tracking-wider">Recent Fixes</h3>
                <div className="space-y-4">
                    {history.map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border flex flex-col md:flex-row gap-4 items-start md:items-center">
                            <div className="flex-1 text-gray-400 line-through text-sm">{item.original}</div>
                            <div className="text-gray-300">➜</div>
                            <div className="flex-1 text-gray-800 font-medium">{item.fixed}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default BulletFixer;