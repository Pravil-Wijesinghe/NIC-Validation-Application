import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LinearProgress from '@mui/material/LinearProgress';

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

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    if (selectedFiles.length !== 4) {
      alert('Please upload exactly four files.');
      return;
    }
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length !== 4) {
      alert('Please select exactly four files before uploading.');
      return;
    }
    onUpload(files, setProgress);
  };

  return (
    <div className='w-full flex flex-col items-center gap-2'>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
      >
        Upload file
        <VisuallyHiddenInput type="file" multiple onChange={handleFileChange}/>
      </Button>
      <div className='w-full flex flex-col items-center gap-1 outline-dashed p-2 rounded-lg'>
          {files.map((file, index) => (
            <div key={index} className='bg-white px-2 py-1 rounded-md'>
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
    </div>
  );
}
