import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function Loading() {
    return (
        <div className="flex flex-col items-center justify-center text-3xl font-bold h-screen w-full bg-bg-color">
            <CircularProgress size={60} />
            <h1 className='mt-4'>NIC Validation</h1>
            <h1>Application</h1>
        </div>
    );
}

export default Loading;
