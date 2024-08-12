import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navRef = useRef();
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();

  const showNavbar = () => {
    navRef.current.classList.toggle('transform-none');
    setIsNavVisible(!isNavVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className='fixed z-50 w-full font-montserrat text-black'>
      <header className='top-0 left-0 w-full lg:px-24 px-10 pt-8 flex justify-between'>
        <a href='/Dashboard' className='text-2xl w-full font-extrabold'>
          NIC Validation
        </a>
        <nav
          ref={navRef}
          className='lg:relative fixed top-0 left-0 lg:text-lg text-xl font-medium flex lg:flex-row flex-col lg:gap-12 lg:transform-none bg-bg-color gap-10 w-full h-full lg:justify-end justify-center items-center transition duration-1000 transform -translate-y-full-vh'
        >
          <a
            href='/Dashboard'
            className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
          >
            Dashboard
          </a>
          <a
            href='/ImportFiles'
            className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
          >
            Import Files
          </a>
          <a
            href='/Reports'
            className="relative before:content-[''] before:absolute before:top-full before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-full"
          >
            Reports
          </a>
          <Button size='small' variant='outlined' color='error' onClick={handleLogout}>
            Logout
          </Button>
          {isNavVisible && (
            <Button
              onClick={showNavbar}
              className='absolute top-8 right-8 text-black lg:hidden'
              size='medium'
              variant='text'
            >
              <CloseIcon className='text-3xl' />
            </Button>
          )}
        </nav>
        {!isNavVisible && (
          <Button
            onClick={showNavbar}
            className='text-black lg:hidden'
            size='medium'
            variant='text'
          >
            <DensityMediumIcon className='text-3xl' />
          </Button>
        )}
      </header>
    </div>
  );
}

export default NavBar;
