// client/src/pages/EmailGen.jsx
import React, { useState } from 'react';
import api from '../api/axios'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- 1. IMPORT TOAST

const EmailGen = () => {
  const navigate = useNavigate();
  
  // Input States
  const [activeTab, setActiveTab] = useState('upload'); 
  const [file, setFile] = useState(null);
  const [manualText, setManualText] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [hrName, setHrName] = useState('');
  const [companyName, setCompanyName] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // Validation
    if (!jobDesc || (activeTab === 'upload' && !file) || (activeTab === 'text' && !manualText)) {
        // --- 2. REPLACED ALERT WITH WARNING TOAST ---
        toast.warning("Please provide both your Resume and the Job Description. ⚠️");
        return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("jobDescription", jobDesc);
      formData.append("hrName", hrName);
      formData.append("companyName", companyName);

      if (activeTab === 'upload' && file) {
          formData.append("resume", file);
      } else if (activeTab === 'text' && manualText) {
          formData.append("manualText", manualText);
      }

      const response = await api.post('/email', formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Optional: Show success before moving
      toast.success("Email generated successfully! 🚀");

      // Navigate to Result Page
      navigate('/tools/email/result', { 
        state: { 
            email: response.data.email, 
            hrName, 
            companyName 
        } 
      });

    } catch (error) {
      console.error(error);
      // --- 3. REPLACED ERROR ALERT ---
      toast.error("Failed to generate email. Please try again. ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Cold Email Generator</h1>

        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
            
            {/* 1. TARGET DETAILS */}
            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Hiring Manager (Optional)</label>
                    <input 
                        type="text" 
                        placeholder="e.g. John Smith" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={hrName}
                        onChange={(e) => setHrName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Company Name</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Google" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
            </div>

            {/* 2. JOB DESCRIPTION */}
            <div className="mb-6">
                <label className="block text-gray-700 font-bold mb-2">Job Description</label>
                <textarea 
                    className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-sm" 
                    placeholder="Paste the job requirements here..." 
                    value={jobDesc} 
                    onChange={(e) => setJobDesc(e.target.value)} 
                />
            </div>

            {/* 3. RESUME INPUT */}
            <label className="block text-gray-700 font-bold mb-2">Your Resume</label>
            <div className="flex mb-4 border-b">
                <button 
                    onClick={() => setActiveTab('upload')} 
                    className={`flex-1 pb-2 font-medium ${activeTab === 'upload' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
                >
                    Upload PDF
                </button>
                <button 
                    onClick={() => setActiveTab('text')} 
                    className={`flex-1 pb-2 font-medium ${activeTab === 'text' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-400'}`}
                >
                    Paste Text
                </button>
            </div>

            <div className="mb-8">
                {activeTab === 'upload' ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                        <input 
                            type="file" 
                            accept=".pdf" 
                            onChange={(e) => setFile(e.target.files[0])} 
                            className="hidden" 
                            id="email-file-upload" 
                        />
                        <label htmlFor="email-file-upload" className="cursor-pointer flex flex-col items-center">
                            <span className="text-3xl mb-2">📄</span>
                            <span className="text-green-600 font-medium hover:underline">
                                {file ? file.name : "Click to Upload Resume (PDF)"}
                            </span>
                        </label>
                    </div>
                ) : (
                    <textarea 
                        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-green-500 text-sm" 
                        placeholder="Paste your full resume text here..." 
                        value={manualText} 
                        onChange={(e) => setManualText(e.target.value)} 
                    />
                )}
            </div>
            
            {/* SUBMIT BUTTON */}
            <button 
                onClick={handleGenerate} 
                disabled={loading} 
                className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all 
                ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1"}`}
            >
                {loading ? "Writing Email..." : "✨ Generate Email"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default EmailGen;