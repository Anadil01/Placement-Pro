// client/src/pages/ScannerInput.jsx
import React, { useState } from 'react';
import api from '../api/axios'; 
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- 1. IMPORT TOAST

const ScannerInput = () => {
  const navigate = useNavigate();
  const [jobDesc, setJobDesc] = useState('');
  const [file, setFile] = useState(null);
  const [manualText, setManualText] = useState('');
  const [activeTab, setActiveTab] = useState('upload'); 
  const [loading, setLoading] = useState(false);

  const createFormData = () => {
    const formData = new FormData();
    formData.append("jobDescription", jobDesc);
    if (activeTab === 'upload' && file) {
        formData.append("resume", file);
    } else if (activeTab === 'text' && manualText) {
        formData.append("manualText", manualText);
    }
    return formData;
  };

  const handleAnalyze = async () => {
    // Validation
    if (!jobDesc || (activeTab === 'upload' && !file) || (activeTab === 'text' && !manualText)) {
        // --- 2. REPLACED ALERT WITH WARNING TOAST ---
        toast.warning("Please provide both a resume and a job description. ⚠️");
        return;
    }

    setLoading(true);
    try {
      const response = await api.post('/analyze', createFormData(), {
        headers: { "Content-Type": "multipart/form-data" },
      });
      
      // Success Toast
      toast.success("Analysis complete! 🚀");

      // SUCCESS: Navigate to Result Page
      navigate('/tools/scanner/result', { 
        state: { 
            result: response.data,
            jobDesc: jobDesc,
            resumeText: manualText,
        } 
      });

    } catch (error) {
      console.error(error);
      // --- 3. REPLACED ERROR ALERT ---
      toast.error("Analysis failed. Please try again. ❌");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">Scan Your Resume</h1>

        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
            {/* TABS */}
            <div className="flex mb-8 border-b">
                <button onClick={() => setActiveTab('upload')} className={`flex-1 pb-4 font-medium text-lg transition-colors ${activeTab === 'upload' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>Upload PDF</button>
                <button onClick={() => setActiveTab('text')} className={`flex-1 pb-4 font-medium text-lg transition-colors ${activeTab === 'text' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 hover:text-gray-600'}`}>Paste Text</button>
            </div>

            {/* INPUTS */}
            <div className="mb-6">
                {activeTab === 'upload' ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gray-50 hover:bg-blue-50 transition-colors">
                        <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files[0])} className="hidden" id="file-upload" />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                            <span className="text-4xl mb-2">📄</span>
                            <span className="text-blue-600 font-medium text-lg hover:underline">{file ? file.name : "Click to Upload Resume (PDF)"}</span>
                        </label>
                    </div>
                ) : (
                    <textarea className="w-full h-48 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 text-base" placeholder="Paste your full resume text here..." value={manualText} onChange={(e) => setManualText(e.target.value)} />
                )}
            </div>

            <label className="block text-gray-700 font-bold mb-3 text-lg">Job Description</label>
            <textarea className="w-full h-40 p-4 border rounded-xl focus:ring-2 focus:ring-blue-500 mb-6 text-base" placeholder="Paste the LinkedIn/Job Portal description..." value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
            
            <button onClick={handleAnalyze} disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg transform hover:-translate-y-1"}`}>
                {loading ? "Analyzing Resume..." : "🚀 Analyze Match"}
            </button>
        </div>
      </div>
    </div>
  );
};

export default ScannerInput;