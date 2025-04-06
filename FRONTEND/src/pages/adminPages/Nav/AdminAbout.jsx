import React from "react";
import Footer from "../../../components/Footer";
import { motion } from "framer-motion";
import AdminHeader from "../component/AdminHeader";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 }
  })
};

const AdminAbout = () => {
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="h-[250px] sm:h-[300px] md:h-[350px]"
        style={{
          backgroundImage: "url('/images/bg-images/about.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AdminHeader />
        <div className="flex justify-center items-center h-full">
          <motion.h1
            variants={fadeIn}
            className="text-zinc-100 text-4xl sm:text-5xl md:text-6xl font-extrabold"
          >
            About Us
          </motion.h1>
        </div>
      </motion.div>

      <section className="bg-white py-10">
        <div className="bg-white max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center md:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="md:w-1/2 flex justify-center mb-8 md:mb-0"
          >
            <div
              className="h-[300px] sm:h-[400px] w-[80%] rounded-xl border-2 border-zinc-200 relative bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://plus.unsplash.com/premium_photo-1674375348397-30a89d88cdf3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8')",
              }}
            >
              <img
                className="h-[150px] sm:h-[220px] absolute bottom-0 left-1/2 transform -translate-x-1/2"
                src="https://images.jdmagicbox.com/quickquotes/images_main/thar-lx-4-str-hard-top-mld-at-diesel-red-rage-272768654-x7f7q.png"
                alt=""
              />
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="md:w-1/2"
          >
            <h4 className="mb-2 text-red-500 text-sm sm:text-[17px] font-bold">
              About us
            </h4>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug">
              Feel The Best Experience<br />With Our Rental Deals
            </h1>
            <div className="mb-6 mt-2 text-lg flex gap-1 text-red-500">
              <i className="ri-bubble-chart-fill"></i>
              <i className="ri-menu-2-line"></i>
            </div>
            <p className="text-sm sm:text-base text-zinc-500 mb-5">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum,
              reprehenderit. Minima maiores ducimus ea neque reiciendis
              voluptatum vel ad incidunt quisquam laboriosam!
            </p>
            <div className="flex flex-col sm:flex-row gap-5 text-sm">
              <div>
                <ul className="space-y-2">
                  {["amet consectetur adipisicing elit.", "Nostrum, reprehenderit.", "maiores ducimus ea neque.", "incidunt quisquam laboriosam"].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="ri-arrow-right-double-fill text-red-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-2">
                  {["Rem tempora vitae, excepturi", "inventore autem ipsa deleniti", "Perferendis quis iusto animi eius", "laudantium quaerat minus id modi,"].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="ri-arrow-right-double-fill text-red-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-12 bg-zinc-100"
        >
          <div className="text-center mb-10">
            <h4 className="text-red-500 text-sm sm:text-[17px] font-bold mb-2">
              Features
            </h4>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Our Best Goal's</h1>
            <div className="text-xl text-red-500">
              <i className="ri-arrow-left-double-line"></i>
              <i className="ri-donut-chart-fill mx-1"></i>
              <i className="ri-arrow-right-double-line"></i>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {["Mission", "Vision", "Strategy"].map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="flex items-start gap-4"
              >
                <div className="w-[75px] h-[75px] bg-red-500 shadow-md rounded flex justify-center items-center">
                  <i className="ri-focus-2-line text-white text-3xl"></i>
                </div>
                <div>
                  <h2 className="font-bold text-lg mb-2">Our {item}</h2>
                  <p className="text-sm text-zinc-500">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Iusto architecto ad expedita.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonial Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="py-12 bg-white"
        >
          <div className="text-center mb-10">
            <h4 className="text-red-500 text-sm sm:text-[17px] font-bold mb-2">
              Testimonial
            </h4>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">
              What Our Clients Say
            </h1>
            <div className="text-xl text-red-500">
              <i className="ri-arrow-left-double-line"></i>
              <i className="ri-donut-chart-fill mx-1"></i>
              <i className="ri-arrow-right-double-line"></i>
            </div>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {["Steve Smith", "Jason Roy", "Joe Root"].map((name, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="shadow-md rounded-xl p-6 text-center"
              >
                <div className="text-amber-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>
                <p className="text-sm text-zinc-600 mb-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  commodi excepturi sapiente? Eum culpa.
                </p>
                <h2 className="font-bold text-lg">{name}</h2>
                <h3 className="text-sm text-red-500 mb-3">Customer</h3>
                <div className="flex justify-center">
                  <div className="h-[80px] w-[80px] border border-dashed border-red-500 rounded-full flex justify-center items-center">
                    <img
                      className="h-[75px] w-[75px] rounded-full"
                      src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                      alt="profile"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </>
  );
};

export default AdminAbout;