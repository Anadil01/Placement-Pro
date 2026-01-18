// client/src/pages/EmailResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- Already imported

const EmailResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get the data passed from the previous page
  const { email, hrName, companyName } = location.state || {};

  // If page is refreshed and data is lost, send back
  if (!email) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />
            <div className="flex-1 md:ml-64 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">No email found. Please generate one first.</p>
                    <button onClick={() => navigate('/tools/email')} className="text-blue-600 font-bold hover:underline">Go Back</button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center justify-center">
        
        <div className="w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Your Draft Email</h1>
                <button onClick={() => navigate('/tools/email')} className="text-gray-500 hover:text-green-600 font-medium">← Create Another</button>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                
                {/* Email Metadata */}
                <div className="mb-6 pb-6 border-b flex flex-wrap gap-6 text-sm text-gray-500">
                    <div><span className="font-bold text-gray-700">To:</span> {hrName || "Hiring Manager"}</div>
                    <div><span className="font-bold text-gray-700">Company:</span> {companyName || "Unknown"}</div>
                </div>

                {/* The Email Text */}
                <pre className="whitespace-pre-wrap font-sans text-gray-800 text-lg leading-relaxed mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    {email}
                </pre>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                        onClick={() => {
                            navigator.clipboard.writeText(email);
                            // --- REPLACED ALERT WITH TOAST ---
                            toast.success("Copied to clipboard! 📋");
                        }}
                        className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
                    >
                        📋 Copy Text
                    </button>
                    
                    <a 
                        href={`mailto:?subject=Application for ${companyName || 'Job Position'}&body=${encodeURIComponent(email)}`}
                        className="flex-1 border-2 border-gray-200 hover:border-green-500 text-gray-700 hover:text-green-600 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                        🚀 Open Mail App
                    </a>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default EmailResult;