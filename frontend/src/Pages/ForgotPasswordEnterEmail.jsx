import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function ForgotPasswordEnterEmail() {
  return (
    <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>  
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold text-3xl'>Forgot Password?</h1>
            <form className='flex flex-col items-center justify-center gap-3 mt-5'>
                <TextField required id="outlined-basic" size='small' label="Enter your email" sx={{'& > :not(style)': { m: 1, width: '300px', borderRadius: '5px' }}}/>
                <Button variant="contained" sx={{width:'200px'}}>Next</Button>
            </form>
        </div>
    </div>
  )
}

export default ForgotPasswordEnterEmail
