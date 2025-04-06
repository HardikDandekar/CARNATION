import React from 'react';

const AdminLogin = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-neutral-200">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 px-3 py-2 border rounded" />
        <input type="password" placeholder="Password" className="w-full mb-4 px-3 py-2 border rounded" />
        <button className="bg-red-500 text-white w-full py-2 rounded hover:bg-red-600">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
