import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { fetchCars } from '../store/reducers/CarSlice';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5 }
  })
};

const OurFleet = () => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const filteredCars = cars
    .filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === 'high') return b.price - a.price;
      if (sortOrder === 'low') return a.price - b.price;
      return 0;
    });

  return (
    <>
   <motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
  className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] relative"
  style={{
    backgroundImage: "url('/images/bg-images/ourFleet.avif')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  }}
>
  <Header />
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
    <motion.h1
      variants={fadeInUp}
      className="text-zinc-100 mb-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mt-48"
    >
      Our Fleet
    </motion.h1>
  </div>
</motion.div>


      <section className='bg-neutral-300 mt-6 md:mt-8 lg:mt-10 px-3 sm:px-6 md:px-12 lg:px-20 pb-10'>
        <div className='mb-4 flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start'>
          <input
            type='text'
            placeholder='Search Cars...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='px-4 py-2 border-black border-1 rounded outline-none w-full sm:max-w-xs'
          />

        </div>

        <div className='py-4 px-2 sm:px-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center'>
          {filteredCars.map((car, idx) => (
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
                  to={`/ourFleet/${car._id}`}
                  className='bg-zinc-800 text-white px-4 py-1 rounded mb-2 cursor-pointer text-sm'
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OurFleet;