import React from 'react';
import NavBar from '../Components/NavBar';
import InputFileUpload from '../Components/InputFileUpload';
import { Button } from '@mui/material';

function ImportFiles() {
  return (
    <div>
      <NavBar />
      <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold text-3xl'>Import Files</h1>
            <div className='w-full flex flex-col justify-center mt-5 gap-4'>
                <InputFileUpload/>
                <Button variant='contained' className=''>Upload</Button>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ImportFiles

