// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import ScannerInput from './pages/ScannerInput';
import ScannerResult from './pages/ScannerResult';
import EmailGen from './pages/EmailGen';
import EmailResult from './pages/EmailResult';
import Profile from './pages/Profile';
import BulletFixer from './pages/BulletFixer';
import History from './pages/History';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* NOTICE: It is "tools" (PLURAL) here */}
        <Route 
          path="/tools/scanner" 
          element={
            <ProtectedRoute>
              <ScannerInput />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/tools/scanner/result" 
          element={
            <ProtectedRoute>
              <ScannerResult />
            </ProtectedRoute>
          } 
        />
        

        {/* COLD EMAILER ROUTES (New Independent Tool) */}
        <Route path="/tools/email" element={<ProtectedRoute><EmailGen /></ProtectedRoute>} />
        <Route path="/tools/email/result" element={<ProtectedRoute><EmailResult /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/tools/fixer" element={<ProtectedRoute><BulletFixer /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;