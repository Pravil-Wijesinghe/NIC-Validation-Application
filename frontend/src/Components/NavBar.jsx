import React from 'react';
import Button from '@mui/material/Button';

function NavBar() {
  return (
    <div className='fixed z-50 w-full font-montserrat text-black'>
      <header className='top-0 left-0 w-full px-24 pt-8 flex justify-between items-center'>
        <a href='/Dashboard' className='text-2xl font-extrabold'>NIC Validation</a>
        <nav className="relative text-lg font-medium flex gap-12">
            <a href='/Dashboard' className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">Dashboard</a>
            <a href='/ImportFiles' className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">Import Files</a>
            <a href='/Reports' className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full">Reports</a>
            <Button size='small' variant="outlined" color='error'>Logout</Button>
        </nav>
      </header>
    </div>
  )
}

export default NavBar
