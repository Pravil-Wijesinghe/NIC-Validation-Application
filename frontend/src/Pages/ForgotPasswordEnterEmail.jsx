// File: ForgotPasswordEnterEmail.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function ForgotPasswordEnterEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State to control dialog visibility

  const navigate = useNavigate();

  //validate email
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Clear any previous error messages
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/forgot-password', { email });
      if (response && response.data) {
        // Display a dialog to inform the user that the email has been sent
        setOpen(true);
        localStorage.setItem('email', email); // Store the email in localStorage
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message); // Display backend error messages
      } else {
        setError('An unexpected error occurred.');
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/ForgotPasswordEnterOTP'); // Navigate to the Enter OTP page on dialog close
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
        <div>
            <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center',} }} open={open} onClose={handleClose}>
                <DialogTitle>OTP Code Sent Successfully</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        OTP Code have successfully sent. Click OK to enter OTP code.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    </div>
  );
}

export default ForgotPasswordEnterEmail;
