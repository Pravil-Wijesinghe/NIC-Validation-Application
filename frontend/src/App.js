import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPasswordEnterEmail from './Pages/ForgotPasswordEnterEmail';
import ForgotPasswordEnterOTP from './Pages/ForgotPasswordEnterOTP';
import ResetPassword from './Pages/ResetPassword';
import ImportFiles from './Pages/ImportFiles';
import Dashboard from './Pages/Dashboard';
import Reports from './Pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPasswordEnterEmail" element={<ForgotPasswordEnterEmail />} />
        <Route path="/ForgotPasswordEnterOTP" element={<ForgotPasswordEnterOTP/>}/>
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/ImportFiles" element={<ImportFiles />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
