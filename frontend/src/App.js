// frontend/src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectListPage from './components/ProjectListPage/ProjectListPage';
import ProjectDetailPage from './components/ProjectDetailPage/ProjectDetailPage';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './Pages/LandingPage';

function App() {
  return (
    // The Router component wraps your entire application to enable routing
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
