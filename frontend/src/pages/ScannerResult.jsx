// client/src/pages/ScannerResult.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- 1. IMPORT TOAST

const ScannerResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Retrieve data passed from the Input Page
  const { result, jobDesc, resumeText } = location.state || {};

  const [email, setEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);

  // Security Check
  useEffect(() => {
    if (!result) {
        navigate('/tools/scanner');
    }
  }, [result, navigate]);

  const handleGenerateEmail = async () => {
    setEmailLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobDescription", jobDesc);
      
      if (resumeText) {
          formData.append("manualText", resumeText);
      } else {
        formData.append("manualText", "Resume context from previous scan."); 
      }

      const response = await api.post('/email', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setEmail(response.data.email);
      // Optional: Success Toast
      toast.success("Email generated successfully! ✉️");

    } catch (error) {
      // --- 2. REPLACED ALERT WITH ERROR TOAST ---
      toast.error("Could not generate email. Please try pasting the resume text manually. ❌");
    }
    setEmailLoading(false);
  };

  if (!result) return null; 

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center">
        
        <div className="w-full max-w-3xl">
            {/* Header / Back Button */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Analysis Results</h1>
                <button onClick={() => navigate('/tools/scanner')} className="text-blue-600 hover:underline font-medium">← Scan Another</button>
            </div>

            {/* SCORE CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border-t-8 border-blue-600 mb-8 animate-fade-in">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Match Compatibility</h2>
                        <p className="text-gray-500">Based on the job description provided.</p>
                    </div>
                    <div className={`mt-4 md:mt-0 text-6xl font-black ${result.score >= 70 ? 'text-green-500' : result.score >= 40 ? 'text-orange-500' : 'text-red-500'}`}>
                        {result.score}%
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <h3 className="font-bold text-red-500 mb-3 uppercase tracking-wider text-sm">⚠️ Missing Keywords</h3>
                        <div className="flex flex-wrap gap-2">
                            {result.missingKeywords.length > 0 ? (
                                result.missingKeywords.map((k, i) => (
                                    <span key={i} className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-medium border border-red-100">{k}</span>
                                ))
                            ) : (
                                <span className="text-green-600 font-medium">No critical keywords missing! Great job.</span>
                            )}
                        </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                        <h3 className="font-bold text-blue-700 mb-3 uppercase tracking-wider text-sm">💡 AI Improvements</h3>
                        <ul className="space-y-3">
                            {result.advice.map((tip, i) => (
                                <li key={i} className="flex items-start text-gray-700">
                                    <span className="mr-3 text-blue-500 text-xl">•</span> 
                                    <span>{tip}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* EMAIL GENERATOR CARD */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Cold Email Assistant</h3>
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase">Bonus Tool</span>
                </div>
                
                <p className="text-gray-500 mb-6">Ready to apply? Let the AI write a personalized email to the Hiring Manager based on this specific analysis.</p>

                <button 
                    onClick={handleGenerateEmail}
                    disabled={emailLoading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
                >
                    {emailLoading ? (
                        <><span>✨</span> Writing your email...</>
                    ) : (
                        <><span>✉️</span> Generate Professional Email</>
                    )}
                </button>

                {email && (
                    <div className="mt-6 bg-gray-50 p-6 rounded-xl border border-gray-200 relative group">
                        <button 
                            onClick={() => {
                                navigator.clipboard.writeText(email);
                                // --- 3. ADDED COPY FEEDBACK TOAST ---
                                toast.success("Copied to clipboard! 📋");
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 text-sm font-bold"
                        >
                            Copy
                        </button>
                        <pre className="whitespace-pre-wrap font-sans text-gray-700 leading-relaxed">{email}</pre>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScannerResult;