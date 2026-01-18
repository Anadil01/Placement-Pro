// client/src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify'; // <--- Already imported

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    degree: '',
    university: '',
    gradYear: '',
    linkedin: '',
    skills: '' 
  });
  
  const [loading, setLoading] = useState(true);
  // REMOVED: const [message, setMessage] = useState(null); <--- Not needed anymore

  // 1. Fetch Data on Load
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/auth/profile');
        setFormData({
            name: data.name || '',
            email: data.email || '',
            degree: data.degree || '',
            university: data.university || '',
            gradYear: data.gradYear || '',
            linkedin: data.linkedin || '',
            skills: data.skills ? data.skills.join(', ') : '' 
        });
        setLoading(false);
      } catch (error) {
        console.error("Failed to load profile");
        // Optional: Add a subtle error toast if loading fails
        toast.error("Could not load profile data."); 
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // 2. Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Save Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // REMOVED: setMessage(null);
    
    try {
      await api.put('/auth/profile', formData);
      
      // SUCCESS TOAST
      toast.success("Profile updated successfully! ✅");
      
      // Update local storage name if it changed
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      userInfo.name = formData.name;
      localStorage.setItem('userInfo', JSON.stringify(userInfo));

    } catch (error) {
      // ERROR TOAST
      toast.error("Failed to update profile. ❌");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg">
            
            {/* REMOVED: The old {message && ...} block is gone */}

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Full Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Email (Cannot change)</label>
                            <input type="email" value={formData.email} disabled className="w-full p-3 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed" />
                        </div>
                    </div>

                    {/* Education */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Degree / Major</label>
                            <input type="text" name="degree" placeholder="e.g. B.Tech CSE" value={formData.degree} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">University / College</label>
                            <input type="text" name="university" placeholder="e.g. IIT Delhi" value={formData.university} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Grad Year & LinkedIn */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">Graduation Year</label>
                            <input type="text" name="gradYear" placeholder="e.g. 2025" value={formData.gradYear} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-2">LinkedIn URL</label>
                            <input type="text" name="linkedin" placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-gray-700 font-bold mb-2">Skills (Separate with commas)</label>
                        <textarea 
                            name="skills"
                            placeholder="e.g. React, Node.js, Python, Java"
                            value={formData.skills} 
                            onChange={handleChange}
                            className="w-full h-24 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">This helps the AI tailor recommendations for you.</p>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-md">
                        Save Changes
                    </button>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;