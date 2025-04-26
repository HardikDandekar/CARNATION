import React, { useRef, useEffect, useState } from "react";
import Header from "../components/Header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../store/reducers/CarSlice";
import { motion } from 'framer-motion';

const ViewCar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cars } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [car, setCar] = useState(null);

  // Fetch cars initially if not available
  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, cars.length]);

  // Find car once cars are loaded or id changes
  useEffect(() => {
    if (cars.length > 0 && id) {
      const foundCar = cars.find((c) => String(c._id) === id);
      setCar(foundCar);
    }
  }, [cars, id]);


  if (!car) {
    return <div className="text-center mt-10 text-xl text-blue-600">Loading car details...</div>;
  }

  const fadeInUps = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 }
    })
  };

  return (
    <>
    <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUps}
        className="h-[250px] sm:h-[300px] md:h-[350px]"
        style={{
          backgroundImage: "url('/images/bg-images/about.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
         <Header />
        <div className="flex justify-center items-center h-full">
      
          <motion.h1

          
            variants={fadeInUps}
            className="text-zinc-100 text-4xl sm:text-5xl md:text-6xl mb-40 font-extrabold"
          >
            Vehicle Detail
            
          </motion.h1>
        </div>
      </motion.div>

      <section className="bg-neutral-200 py-10 px-4 sm:px-10 md:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex justify-center items-center lg:w-[40%]">
            <div
              className="w-full max-w-[350px] h-[300px] sm:h-[360px] border-2 bg-white border-neutral-300 rounded-2xl"
              style={{
                backgroundImage: `url(${car.image})`,
                backgroundSize: "90%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <div className="lg:w-[60%] flex items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                {car.name}
              </h1>
              <div className="text-red-500 mb-3 text-xl">
                <i className="ri-star-s-fill"></i>
                <i className="ri-star-s-fill"></i>
                <i className="ri-star-s-fill"></i>
                <i className="ri-star-half-s-fill"></i>
              </div>

              <div className="flex mb-4 items-end">
                <span className="text-xl sm:text-2xl mr-1 text-red-500">{car.price}</span>
                <span className="text-xs text-red-500">/Day</span>
              </div>

              <p className="text-sm sm:text-base mb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur perferendis delectus, sapiente et quasi eaque? Sunt similique ratione deserunt vitae ullam doloribus nesciunt dolore odio fugiat doloremque dolorum eveniet hic, corporis velit mollitia quae quidem ducimus dolores? Voluptatum eaque beatae mollitia expedita quas, assumenda deserunt cumque dolore reprehenderit, nostrum illum!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    navigate("book");
                    setTimeout(() => {
                      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  }}
                  className="bg-red-500 px-5 py-3 cursor-pointer text-white rounded text-sm"
                >
                  Book Your Ride
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="bg-red-500 px-5 py-3 cursor-pointer text-white rounded text-sm"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll target and outlet */}
      <div ref={scrollRef}></div>
      <Outlet context={{ scrollRef }} />
    </>
  );
};

export default ViewCar;
