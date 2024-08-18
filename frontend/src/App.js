import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import ForgotPasswordEnterEmail from './Pages/ForgotPasswordEnterEmail';
import ForgotPasswordEnterOTP from './Pages/ForgotPasswordEnterOTP';
import ResetPassword from './Pages/ResetPassword';
import ImportFiles from './Pages/ImportFiles';
import Dashboard from './Pages/Dashboard';
import Reports from './Pages/Reports';
import ProtectedRoute from './Components/ProtectedRoute';
import Signup from './Pages/Signup';
import LoginPage from './Pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/ForgotPasswordEnterEmail" element={<ForgotPasswordEnterEmail />} />
        <Route path="/ForgotPasswordEnterOTP" element={<ForgotPasswordEnterOTP/>}/>
        <Route path="/ResetPassword" element={<ResetPassword />}/>
        <Route path="/ImportFiles" element={<ProtectedRoute><ImportFiles /></ProtectedRoute>} />
        <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/Reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/Signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
