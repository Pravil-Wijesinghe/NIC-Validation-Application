// File: InputFileUpload.jsx

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from 'react-dropzone';

// Hidden input styling for regular file input
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onUpload }) {

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState([]);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false);
  const [error, setError] = useState('');

  // Dropzone for drag-and-drop functionality
  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length !== 4) {
      setError('Please upload exactly four files.');
      setErrorDialogOpen(true);
      return;
    }
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf, image/*', // Restrict to specific file types
    multiple: true,
    maxFiles: 4,
  });

  // File input change handler
  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length !== 4) {
      setError('Please upload exactly four files.');
      setErrorDialogOpen(true);
      return;
    }
    setFiles(selectedFiles);
  };

  // Handle file upload
  const handleUpload = () => {
    if (files.length !== 4) {
      setError('Please select exactly four files before uploading.');
      setErrorDialogOpen(true);
      return;
    }
    onUpload(files, setProgress);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <div className="hidden md:block w-full">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-4 rounded-md text-center ${
            isDragActive ? 'bg-gray-200' : 'bg-white'
          }`}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here...</p>
          ) : (
            <p>Drag and drop files here, or click to select files (exactly 4 files)</p>
          )}
        </div>
      </div>
      <div className="block md:hidden">
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" multiple onChange={handleFileChange} />
        </Button>
      </div>
      <div className="w-full flex flex-col items-center gap-1 outline-dashed p-2 rounded-lg">
        {files.map((file, index) => (
          <div key={index} className="bg-white px-2 py-1 rounded-md">
            <p>{file.name}</p>
            {progress[index] !== undefined && (
              <LinearProgress variant="determinate" value={progress[index]} />
            )}
          </div>
        ))}
      </div>
      <Button variant="contained" onClick={handleUpload} disabled={files.length !== 4}>
        Upload
      </Button>
      <Dialog open={errorDialogOpen} onClose={handleErrorDialogClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>{error}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleErrorDialogClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}