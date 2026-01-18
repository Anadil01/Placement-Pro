import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* 2. HERO SECTION */}
      <header className="flex flex-col items-center text-center mt-20 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Stop Getting Rejected. <br />
          <span className="text-blue-600">Beat the Resume Bots.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mb-10">
          AI-powered resume optimization built specifically for BCA & B.Tech students. 
          Get a higher ATS score and write perfect cold emails in seconds.
        </p>
        
        <Link to="/signup" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all">
          Check My Resume Score (Free)
        </Link>
        
        <p className="mt-4 text-sm text-gray-400">No credit card required • Instant Analysis</p>
      </header>

      {/* 3. FEATURE GRID */}
      <section className="max-w-6xl mx-auto mt-32 px-6 grid md:grid-cols-3 gap-10">
        {/* Feature 1 */}
        <div className="p-8 bg-gray-50 rounded-2xl border hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-3xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Instant ATS Check</h3>
          <p className="text-gray-600">Find out exactly why your resume is getting rejected. We scan for missing keywords like "Docker" or "React".</p>
        </div>

        {/* Feature 2 */}
        <div className="p-8 bg-gray-50 rounded-2xl border hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center text-3xl mb-4">📧</div>
          <h3 className="text-xl font-bold mb-2">AI Email Writer</h3>
          <p className="text-gray-600">Don't know what to say? Our AI writes professional cold emails to hiring managers based on your resume.</p>
        </div>

        {/* Feature 3 */}
        <div className="p-8 bg-gray-50 rounded-2xl border hover:shadow-xl transition-all">
          <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center text-3xl mb-4">💡</div>
          <h3 className="text-xl font-bold mb-2">Expert Feedback</h3>
          <p className="text-gray-600">Get specific advice on how to improve your bullet points to sound more result-oriented and professional.</p>
        </div>
      </section>

      {/* 4. SOCIAL PROOF */}
      <section className="mt-32 pb-20 text-center">
        <p className="text-gray-500 font-medium mb-6 uppercase tracking-widest">Trusted by students from</p>
        <div className="flex justify-center gap-8 opacity-50 grayscale">
          <span className="text-2xl font-bold">IIT Delhi</span>
          <span className="text-2xl font-bold">BITS Pilani</span>
          <span className="text-2xl font-bold">VIT</span>
          <span className="text-2xl font-bold">DTU</span>
        </div>
      </section>
    </div>
  );
};

export default Landing;