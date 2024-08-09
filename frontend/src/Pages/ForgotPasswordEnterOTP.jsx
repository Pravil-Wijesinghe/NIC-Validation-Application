import React, {useState} from 'react';
import Button from '@mui/material/Button';
import OTP from '../Components/OTP';

function ForgotPasswordEnterOTP() {
  const [otp, setOtp] = useState('');

  return (
    <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>  
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold md:text-3xl text-2xl'>Forgot Password?</h1>
            <form className='flex flex-col items-center justify-center gap-3 mt-5'>
                <OTP separator={<span>-</span>} value={otp} onChange={setOtp} length={4} />
                <Button variant="contained" className='md:w-52 w-40'>Next</Button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasswordEnterOTP
