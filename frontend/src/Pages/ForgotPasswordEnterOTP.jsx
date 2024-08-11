import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ForgotPasswordEnterOTP() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = localStorage.getItem('email'); // Retrieve the stored email

    console.log('Retrieved email from localStorage:', email);
    console.log('Entered OTP:', otp);

    if (!email || !otp) {
      setError('Both email and OTP are required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/forgot-password/validate-otp', { email, otp });
      console.log('Response from server:', response.data);
      alert(response.data.message);
      navigate('/ResetPassword'); // Navigate to ResetPassword.jsx
    } catch (error) {
      console.error('Error during request:', error);
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(`Request failed: ${error.message}`);
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>  
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold md:text-3xl text-2xl'>Forgot Password?</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 mt-5'>
                {/* Replace the custom OTP component with a simple text input for testing */}
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className='md:w-72 w-56 rounded-lg'
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" variant="contained" className='md:w-52 w-40'>Next</Button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasswordEnterOTP;
