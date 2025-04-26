import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminUser'); // Optional: Admin ke liye alag key remove karni hai to
    navigate('/');
  };

  return (
    <nav className='flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-8 relative'>
      
      {/* Left Side - Logo */}
      <div className='flex items-center w-full sm:w-auto justify-start'>
        <h1 className='text-white text-3xl sm:text-4xl font-bold'>
          Car<span className='text-4xl sm:text-5xl text-red-400 font-extrabold'>Nation</span>
        </h1>
      </div>

      {/* Menu Icon for Mobile */}
      <div className='sm:hidden absolute right-4 top-4 z-30'>
        <button onClick={() => setMenuOpen(!menuOpen)} className='text-white'>
          <i className="text-3xl ri-menu-line"></i>
        </button>
      </div>

      {/* Links Dropdown for Mobile */}
      {menuOpen && (
        <div className='absolute top-full right-4 mt-2 w-48 bg-gray-100 text-black rounded-lg shadow-lg py-4 flex flex-col items-start gap-4 z-20 transition-all duration-300'>
          <Link to='/adminhome' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/adminabout' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>About</Link>
          <Link to='/adminourFleet' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Our Fleet</Link>
          <Link to='/adminservice' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to='/admin/bookings' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>History</Link>
          <button onClick={() => { handleLogout(); setMenuOpen(false); }} className='px-4 text-left hover:text-red-600'>
            Logout
          </button>
        </div>
      )}

      {/* Right Side - Links for Desktop */}
      <div className='hidden sm:flex flex-1 justify-end items-center gap-7 text-white text-sm sm:text-base'>
        <Link to='/adminhome' className='hover:text-gray-300'>Home</Link>
        <Link to='/adminabout' className='hover:text-gray-300'>About</Link>
        <Link to='/adminourFleet' className='hover:text-gray-300'>Our Fleet</Link>
        <Link to='/adminservice' className='hover:text-gray-300'>Services</Link>
        <Link to='/admin/bookings' className='hover:text-gray-300'>History</Link>
        <button onClick={handleLogout} className='hover:text-gray-300'>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminHeader;
