import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { SignUp } from './pages'
import { LogIn } from './pages'
import { DashboardScreen } from './pages'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/LogIn" element={<LogIn />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
    </Routes>
  );
};


export default App