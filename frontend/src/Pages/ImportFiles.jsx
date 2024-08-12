import React from 'react';
import NavBar from '../Components/NavBar';
import InputFileUpload from '../Components/InputFileUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ImportFiles() {

  const navigate = useNavigate();

  const handleFileUpload = (files, setProgress) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    axios.post('http://localhost:3002/nic/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        setProgress((prevProgress) => {
          return Array(files.length).fill(percent);
        });
      },
    })
      .then((response) => {
        alert('Files uploaded and processed successfully!');
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        alert('Failed to upload files.');
      });
  };

  return (
    <div>
      <NavBar />
      <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold text-3xl'>Import Files</h1>
            <div className='w-full flex flex-col justify-center mt-5 gap-4'>
                <InputFileUpload onUpload={handleFileUpload}/>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ImportFiles

