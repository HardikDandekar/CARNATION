import React from 'react'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <section
        className="min-h-screen"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1697935248301-d6f331b26e2f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />

        <div className='flex flex-col lg:flex-row'>
          <motion.div 
            initial={{ opacity: 0, x: -50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
            className="p-6 sm:p-10 lg:p-14 w-full lg:w-1/2"
          >
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-zinc-200'>
              Your Premier Limo Chauffeur Service
            </h1>
            <p className='text-sm sm:text-base mt-6 mb-6 text-zinc-300'>
              At Car Nation, we believe in delivering unparalleled <br className="hidden sm:block" />
              luxury and professionalism to every journey
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              className='bg-amber-400 py-2 sm:py-3 px-6 sm:px-7 rounded-2xl text-sm sm:text-base'
            >
              Explore more
            </motion.button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 flex justify-center items-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white bg-opacity-80 mt-10 lg:mt-64 rounded-2xl shadow-xl p-8 max-w-md text-center"
            >
              <h2 className="text-2xl font-bold mb-4 text-zinc-800">Experience Luxury on Wheels</h2>
              <p className="text-zinc-600 mb-4 text-sm">
                Ride in style with our top-tier fleet and professional chauffeurs. Let your next journey be as elegant as your destination.
              </p>
              <ul className="text-left text-sm text-zinc-700 space-y-2">
                <li><i className="ri-check-line text-green-600 mr-2"></i>Premium vehicles at your service</li>
                <li><i className="ri-check-line text-green-600 mr-2"></i>Trained professional chauffeurs</li>
                <li><i className="ri-check-line text-green-600 mr-2"></i>On-time pickup and drop</li>
                <li><i className="ri-check-line text-green-600 mr-2"></i>City tours & long-distance travel</li>
              </ul>
              <motion.button 
                whileTap={{ scale: 0.95 }} 
                whileHover={{ scale: 1.05 }} 
                onClick={() => navigate("ourFleet")}
                className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-5 rounded-full transition duration-300"
              >
                View Our Fleet
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
