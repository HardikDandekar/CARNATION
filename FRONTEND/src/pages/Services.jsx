import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
};

const Services = () => {
  return (
    <>
    <motion.div
  initial="hidden"
  animate="visible"
  variants={fadeIn}
  className='relative h-[250px] sm:h-[300px] md:h-[350px]'
  style={{
    backgroundImage: "url('/images/bg-images/services.avif')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  }}
>
  {/* Header fixed at top */}
  <div className="absolute top-0 left-0 w-full z-20">
    <Header />
  </div>

  {/* Centered Heading */}
  <div className='flex justify-center items-center h-full relative z-10'>
    <motion.h1
      variants={fadeIn}
      className='text-zinc-100 text-3xl sm:text-5xl md:text-6xl font-extrabold text-center mt-24'
    >
      Services
    </motion.h1>
  </div>

  {/* Optional overlay for better text visibility */}
  <div className="absolute inset-0 bg-black/30 z-0"></div>
</motion.div>



      <section className='bg-neutral-300 py-10'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {["/images/corporate.avif", "/images/Airport.webp", "/images/events.webp"].map((img, i) => (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className='h-[260px] hover:h-[290px] w-full bg-amber-50 hover:scale-105 transition-all duration-500 rounded-3xl'
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat"
                }}
              >
                <div className='h-14 flex items-center'>
                  <span className='bg-white px-5 py-1 rounded ml-3 text-sm sm:text-base'>
                    {i === 0 ? "Corporate travel" : i === 1 ? "Airport transfers" : "Special events"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className='mt-10 text-center'
          >
            <p className='text-lg sm:text-xl md:text-2xl'>Whether you're traveling for business, leisure, or a special<br className="hidden sm:block" />
              occasion, our chauffeur-driven limousines ensure you arrive<br className="hidden sm:block" />
              in style, comfort, and on time.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className='mt-6 flex justify-center'
          >
            <button className='bg-amber-400 px-6 py-2 rounded text-white hover:bg-amber-500 transition'>Explore</button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Services;