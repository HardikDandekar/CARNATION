import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { Link, NavLink } from 'react-router-dom';
import Footer from '../../components/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchCars } from '../../store/reducers/CarSlice';
import axios from 'axios';
import AdminHeader from './component/AdminHeader';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 }
  })
};

const AdminOurFleet = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);
  const [newCar, setNewCar] = useState({ name: '', price: '', image: '' });

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleAddCar = async () => {
    try {
      await axios.post('http://localhost:3000/api/cars/create', newCar);
      alert('✅ Car Added');
      setNewCar({ name: '', price: '', image: '' });
      dispatch(fetchCars());
    } catch (err) {
      alert('❌ Error adding car');
    }
  };

  return (
    <>
      {/* Header Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className='h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]'
        style={{
          backgroundImage: "url('/images/bg-images/ourFleet.avif')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <AdminHeader />
        <div className='flex justify-center items-center h-full'>
          <motion.h1
            variants={fadeInUp}
            className='text-zinc-100 mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold'
          >
            Our Fleet
          </motion.h1>
        </div>
      </motion.div>

      {/* Fleet Section */}
      <section className='bg-neutral-300 mt-6 md:mt-8 lg:mt-10 px-3 sm:px-6 md:px-12 lg:px-20 pb-10'>
        {/* Filter Buttons */}
        <motion.nav
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          variants={fadeInUp}
          className='mb-4 flex gap-2 sm:gap-4 md:gap-5 items-center justify-center md:justify-start flex-wrap'
        >
          <NavLink className='px-4 sm:px-6 py-1 rounded bg-zinc-800 text-white'>ALL</NavLink>
          <NavLink className='px-4 sm:px-6 py-1 rounded bg-zinc-500 text-white'>SEDAN</NavLink>
          <NavLink className='px-4 sm:px-6 py-1 rounded bg-zinc-500 text-white'>LUXURY</NavLink>
          <NavLink className='px-4 sm:px-6 py-1 rounded bg-zinc-500 text-white'>SUV</NavLink>
        </motion.nav>

        {/* Cars Grid */}
        <div className='py-4 px-2 sm:px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
          {/* Render All Cars */}
          {cars.map((car, idx) => (
            <motion.div
              key={car._id}
              custom={idx}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              variants={fadeInUp}
              className='h-[200px] w-full max-w-[300px] rounded-xl bg-white shadow-md'
              style={{
                backgroundImage: `url(${car.image})`,
                backgroundSize: '60%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className='h-14 p-3'>
                <h6 className='font-light text-sm'>{car.name}</h6>
                <p className='font-extralight text-xs'>{car.price}</p>
              </div>
              <div className='h-[130px] px-3 flex justify-end items-end'>
                <Link
                  to={`/adminourfleet/${car._id}`}
                  className='bg-zinc-800 text-white px-4 py-1 rounded mb-2 cursor-pointer text-sm'
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}

          {/* Add Car Form with Delayed Animation */}
          <motion.div
            custom={cars.length + 1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className='min-h-[300px] w-full max-w-[300px] rounded-xl bg-white shadow-md p-4 flex flex-col gap-3 justify-center'
          >
            <input
              type='text'
              placeholder='Car Name'
              className='border px-3 py-1 rounded text-sm'
              value={newCar.name}
              onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            />
            <input
              type='text'
              placeholder='Price'
              className='border px-3 py-1 rounded text-sm'
              value={newCar.price}
              onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            />
            <input
              type='text'
              placeholder='Image URL'
              className='border px-3 py-1 rounded text-sm'
              value={newCar.image}
              onChange={(e) => setNewCar({ ...newCar, image: e.target.value })}
            />
            <button
              onClick={handleAddCar}
              className='bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition'
            >
              Add Car
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default AdminOurFleet;
