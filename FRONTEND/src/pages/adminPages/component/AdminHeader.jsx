import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <>
      <nav className='flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-8'>
        <div className='text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-0'>
          <h1>LOGO</h1>
        </div>
        <div className='text-white flex flex-wrap justify-center gap-4 sm:gap-7 text-sm sm:text-base'>
          <Link to='/adminhome' className='hover:text-gray-300'>Home</Link>
          <Link to='/adminabout' className='hover:text-gray-300'>About</Link>
          <Link to='/adminourFleet' className='hover:text-gray-300'>Our fleet</Link>
          <Link to='/adminservice' className='hover:text-gray-300'>Services</Link>
          <Link to='/admin/bookings' className='hover:text-gray-300 '>History</Link>
          <Link to='/' className='hover:text-gray-300'>Logout</Link>
        </div>
      </nav>
    </>
  );
};

export default AdminHeader;

