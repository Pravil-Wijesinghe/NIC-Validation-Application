import React, {useState} from 'react';
import NavBar from '../Components/NavBar';
import InputFileUpload from '../Components/InputFileUpload';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ImportFiles() {

  const [error, setError] = useState('');
  const [open, setOpen] = useState(false); // State to control dialog visibility
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State to control error dialog visibility

  const navigate = useNavigate();

  const handleFileUpload = (files, setProgress) => {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    axios.post('http://localhost:3002/nic/upload', formData, {
      //FIle name with progress bar
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
        // alert('Files uploaded and processed successfully!');
        setOpen(true);
        setError(null);
        // navigate('/dashboard');
      })
      .catch((error) => {
        // console.error('Error uploading files:', error);
        setError('Failed to upload files.');
        setErrorDialogOpen(true); // Open error dialog when an error occurs
      });
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/dashboard'); // Navigate to the Dashboard page on dialog close
  };

  const handleErrorDialogClose = () => {
      setErrorDialogOpen(false); // Close the error dialog
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
        <div>
            {/* Success Dialog */}
            <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center',} }} open={open} onClose={handleClose}>
                <DialogTitle>Files uploaded successfully</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                      Files uploaded and processed successfully!. Click OK to continue to the Dashboard page.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    OK
                </Button>
                </DialogActions>
            </Dialog>
            {/* Error Dialog */}
            <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center', color:'#f44336'} }} open={errorDialogOpen} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={handleErrorDialogClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>  
    </div>
    </div>
  )
}

export default ImportFiles

