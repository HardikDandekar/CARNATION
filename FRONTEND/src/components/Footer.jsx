import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-yellow-950 text-zinc-200 px-4 sm:px-8 md:px-12 lg:px-20 py-8">
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 md:justify-between">
        {/* Left */}
        <div className="md:w-1/3">
          <h1 className="text-3xl font-extrabold mb-4">CAR NATION</h1>
          <p className="text-sm">136 C Sector Sonagiri Bhopal 412023</p>
          <Link className="text-sm hover:text-zinc-300">carNation@gmail.com</Link>
          <div className="mt-6">
            <h2 className="text-xl mb-2">Subscribe to the newsletter</h2>
            <div className="flex gap-2">
              <input
                className="outline-none border-amber-900 border-2 rounded px-4 py-2 flex-grow"
                type="email"
                placeholder="Email"
              />
              <button className="bg-zinc-200 text-zinc-800 px-4 py-2 rounded">
                Click
              </button>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="md:w-2/3 flex flex-wrap justify-between gap-8 md:gap-4 lg:gap-8">
          <div className="min-w-[150px]">
            <h2 className="text-lg font-semibold mb-3">Top Cities</h2>
            <ul className="text-sm text-zinc-400">
              <li>Indore</li>
              <li>Bhopal</li>
              <li>Pune</li>
              <li>Mumbai</li>
              <li>Hyderabad</li>
            </ul>
          </div>
          <div className="min-w-[150px]">
            <h2 className="text-lg font-semibold mb-3">Explore</h2>
            <ul className="text-sm text-zinc-400">
              <li>Intercity rides</li>
              <li>Limosine service</li>
              <li>Chauffeur service</li>
              <li>Private car service</li>
              <li>Airport transfer</li>
            </ul>
          </div>
          <div className="min-w-[150px]">
            <h2 className="text-lg font-semibold mb-3">Intercity Rides</h2>
            <ul className="text-sm text-zinc-400">
              <li>Indore - Vijay Nagar</li>
              <li>Bhopal - MP Nagar</li>
              <li>Indore - Geeta Bhawan</li>
              <li>Mumbai - Thane</li>
              <li>Bhopal - Indrapuri</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-zinc-700 pt-4">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-xl font-extralight">&#169;</span>
          <h1>2025 CAR NATION</h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400 my-2 sm:my-0">
          <p>Terms</p>
          <p>Privacy policy</p>
          <p>Legal notice</p>
          <p>Accessibility</p>
        </div>
        <div className="flex gap-4 text-xl text-zinc-300">
          <i className="ri-youtube-fill"></i>
          <i className="ri-facebook-fill"></i>
          <i className="ri-instagram-fill"></i>
          <i className="ri-twitter-fill"></i>
          <i className="ri-linkedin-fill"></i>
        </div>
      </div>
    </div>
  );
};

export default Footer;