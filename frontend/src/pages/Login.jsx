// client/src/pages/Login.jsx
import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import Navbar from '../components/Navbar'; // <--- Imported

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data));

      toast.success(`Welcome back, ${data.name}! 👋`);
      
      navigate('/dashboard'); 
    } catch (error) {
      toast.error(error.response?.data?.error || "Invalid Email or Password ❌");
    }
  };

  return (
    // 1. Changed layout: Removed 'flex items-center justify-center' from here
    // so the Navbar can stay at the top.
    <div className="min-h-screen bg-gray-100">
     
      {/* 2. ADD NAVBAR HERE */}
      <Navbar />

      {/* 3. WRAPPER: This handles the centering of the login box now */}
      <div className="flex items-center justify-center py-24">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input 
                type="email" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input 
                type="password" 
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all">
              Login
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;