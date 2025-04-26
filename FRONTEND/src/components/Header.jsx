import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem('loginUser');
    if (data) {
      setUser(JSON.parse(data) || []);
    }
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setUserName('');
    navigate('/');
  };

  return (
    <nav className='flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-8 relative '>
      
      {/* Left Side - Logo */}
      <div className='flex items-center w-full sm:w-auto justify-start'>
        <h1 className='text-white text-3xl sm:text-4xl font-bold'>
          Car <span className='text-4xl sm:text-5xl text-red-400 font-extrabold'>Nation</span>
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
          <Link to='/home' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to='/about' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>About</Link>
          <Link to='/ourFleet' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Our Fleet</Link>
          <Link to='/services' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to='/myBooking' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>My Booking</Link>

          {userName ? (
            <button
              onClick={() => { setShowDropdown(false); handleLogout(); setMenuOpen(false); }}
              className="px-4 text-left hover:text-red-600"
            >
              Logout
            </button>
          ) : (
            <Link to='/user-auth' className='hover:text-red-600 px-4' onClick={() => setMenuOpen(false)}>Login</Link>
          )}
        </div>
      )}

      {/* Right Side - Links for Desktop */}
      <div className='hidden sm:flex flex-1 justify-end items-center gap-7 text-white text-sm sm:text-base'>
        <Link to='/home' className='hover:text-gray-300'>Home</Link>
        <Link to='/about' className='hover:text-gray-300'>About</Link>
        <Link to='/ourFleet' className='hover:text-gray-300'>Our Fleet</Link>
        <Link to='/services' className='hover:text-gray-300'>Services</Link>
        <Link to='/myBooking' className='hover:text-gray-300'>My Booking</Link>

        {userName ? (
          <div className='relative'>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition duration-200"
            >
              <i className="ri-user-line w-6 h-6 text-gray-600"></i>
              <span className="capitalize font-medium">{userName}</span>
            </button>

            {showDropdown && (
              <div className='absolute right-0 mt-2 bg-white text-black rounded shadow-md py-2 z-20'>
                <button
                  onClick={handleLogout}
                  className='block px-4 py-2 hover:bg-gray-200 w-full text-left'
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to='/user-auth' className='hover:text-gray-300'>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
