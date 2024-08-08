import React from 'react'
import NavBar from '../Components/NavBar'

function Reports() {
  return (
    <div className='font-montserrat'>
        <NavBar/>
        <div className='relative flex items-center justify-center w-full h-screen bg-bg-color'>  
            <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
                <h1 className='font-bold text-3xl'>Reports</h1>
            </div>
        </div>
    </div>
  )
}

export default Reports
