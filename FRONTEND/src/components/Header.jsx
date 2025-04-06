import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react'; 

const Header = () => {
  const [userName, setUserName] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem('userName');
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('role');
    setUserName(''); // 👈 remove name from state too
    navigate('/');
  };

  return (
    <nav className='flex flex-col sm:flex-row justify-between items-center py-3 px-4 sm:px-8 '>
      <div className='text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-0'>
        <h1 className='text-3xl'>Car <span className='text-4xl text-red-400 font-extrabold'>Nation</span></h1>
      </div>

      <div className='text-white flex flex-wrap justify-center items-center gap-4 sm:gap-7 text-sm sm:text-base'>
        <Link to='/home' className='hover:text-gray-300'>Home</Link>
        <Link to='/about' className='hover:text-gray-300'>About</Link>
        <Link to='/ourFleet' className='hover:text-gray-300'>Our fleet</Link>
        <Link to='/services' className='hover:text-gray-300'>Services</Link>

        {/* ✅ Show name or Login based on login status */}
        {userName ? (
          <div className='relative'>
           <button
  onClick={() => setShowDropdown(!showDropdown)}
  className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition duration-200"
>
  <User className="w-5 h-5 text-gray-600" />
  <span className="capitalize font-medium">{userName}</span>
</button>

            {showDropdown && (
              <div className='absolute right-0 mt-2 bg-white text-black rounded shadow-md py-2 z-10'>
                <button
                  onClick={handleLogout}
                  className='block px-4 py-2 hover:bg-gray-200 w-full text-left '
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
