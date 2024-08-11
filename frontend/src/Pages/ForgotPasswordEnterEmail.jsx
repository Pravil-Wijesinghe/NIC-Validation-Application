// File: ForgotPasswordEnterEmail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

function ForgotPasswordEnterEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //validate email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    //validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
  
    // Clear any previous error messages
    setError('');

    axios.post('http://localhost:3000/forgot-password', { email })
      .then(response => {
        if (response && response.data) {
          alert(response.data.message);
          localStorage.setItem('email', email); // Store the email in localStorage
          navigate('/ForgotPasswordEnterOTP');
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          alert(error.response.data.message);
        } else if (error.message) {
          alert(`Request failed: ${error.message}`);
        } else {
          alert('An unexpected error occurred.');
        }
      });
  };

  return (
    <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>  
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold md:text-3xl text-2xl'>Forgot Password?</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 mt-5'>
                <TextField 
                    required 
                    id="outlined-basic" 
                    size='small' 
                    label="Enter your email" 
                    className='md:w-72 w-56 rounded-lg'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!error} // Material UI prop to indicate error state
                    helperText={error} // Material UI prop to show error message
                />
                <Button type="submit" variant="contained" className='md:w-52 w-40'>Next</Button>
            </form>
        </div>
    </div>
  );
}

export default ForgotPasswordEnterEmail;
