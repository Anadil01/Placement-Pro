# 🚀 Placement-Pro

**Placement-Pro** is an AI-powered platform designed to assist students in their job search journey. It features a Resume Analyzer, Dashboard, and User Authentication system to help candidates prepare for placements effectively.

## 🔗 Live Demo
- **Frontend (Website):** [https://placement-pro.vercel.app](https://placement-pro.vercel.app)
- **Backend (API):** [https://placement-pro-api.vercel.app](https://placement-pro-api.vercel.app)

---

## 🛠️ Tech Stack

### **Frontend**
- **React.js** 
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)
- **React Router DOM** (Navigation)

### **Backend**
- **Node.js** & **Express.js**
- **MongoDB** (Database)
- **JWT** (Authentication)
- **Vercel** (Deployment)

---

## ✨ Features

- **🔐 User Authentication:** Secure Login and Signup using JWT.
- **📄 Resume Analysis:** AI-powered feedback on resumes (checks for keywords, formatting, etc.).
- **📊 Dashboard:** User-friendly interface to manage profile and view results.
- **📱 Responsive Design:** Fully optimized for mobile and desktop screens.

---

## 📂 Project Structure

```bash
Placement-Pro/
├── backend/            # Node.js & Express API
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic
│   ├── models/         # MongoDB Schemas
│   ├── routes/         # API Routes
│   └── index.js        # Entry point
│
└── frontend/           # React Frontend
    ├── public/         # Static assets
    ├── src/
    │   ├── api/        # Axios setup
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Application pages (Login, Dashboard, etc.)
    │   └── App.jsx     # Main App component
