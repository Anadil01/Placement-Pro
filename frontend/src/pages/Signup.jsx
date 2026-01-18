// client/src/pages/Signup.jsx
import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Navbar from '../components/Navbar'; // <--- Imported

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', { name, email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success("Account created! Welcome aboard 🎉");
      
      navigate('/dashboard'); 
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed. Email might be taken. ❌");
    }
  };

  return (
    // 1. REMOVED 'flex items-center justify-center' from here
    <div className="min-h-screen bg-gray-100">
      
      {/* 2. NAVBAR AT THE TOP */}
      <Navbar />

      {/* 3. CENTERED WRAPPER FOR THE FORM */}
      <div className="flex items-center justify-center py-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Create Account</h2>
          
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input type="password" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">Sign Up</button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;