import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Sign from './components/Sign';
import Login from './components/Login';
import Home from './components/Home';
import Forgot from './components/Forgot';
import Notfound from './components/Notfound';
import Reset from './components/Reset';

const App = () => {
  // Function to check if the user is authenticated
  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <>
      <Routes>
        <Route path='/signup' element={<Sign />} />
        <Route path='/' element={<Login />} />
        {/* Protect the home route */}
        <Route 
          path='/home/:id' 
          element={isAuthenticated() ? <Home /> : <Navigate to='/' />} 
        />
        <Route path='/reset/:id' element={<Reset />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/reset' element={<Reset />} />
        <Route path='/*' element={<Notfound />} />
      </Routes>
    </>
  );
};

export default App;
