// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ImageProvider } from './context/ImageContext';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GenerateImage from './pages/GenerateImage';
import ImageHistory from './pages/ImageHistory';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ImageProvider>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/generate" 
                  element={
                    <PrivateRoute>
                      <GenerateImage />
                    </PrivateRoute>
                  } 
                />
                <Route 
                  path="/history" 
                  element={
                    <PrivateRoute>
                      <ImageHistory />
                    </PrivateRoute>
                  } 
                />
              </Routes>
            </div>
          </div>
        </Router>
      </ImageProvider>
    </AuthProvider>
  );
}

export default App;