import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='sm:w-[80%] w-[95%] max-w-[1920px] mx-auto h-screen flex flex-col items-center justify-center'>
      <h1 className='text-4xl font-extrabold'>Page Not Found</h1>
      <Link
        to='/'
        className='inline-block mt-8 px-6 py-4 text-lg font-semibold bg-purple-950 text-white rounded-full transition duration-200 ease-in-out hover:bg-white hover:text-purple-950 hover:border-purple-950 hover:border-2'
      >
        Return To HomePage
      </Link>
    </div>
  );
};

export default NotFound;
