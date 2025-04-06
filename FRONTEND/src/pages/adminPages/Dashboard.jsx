import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const url = showAdminForm
        ? "http://localhost:3000/api/auth/login"
        : isLogin
        ? "http://localhost:3000/api/auth/login"
        : "http://localhost:3000/api/auth/register";

      const payload = showAdminForm || isLogin
        ? { email, password }
        : { name, email, password };

      const response = await axios.post(url, payload);

      if (response.data.role === "admin") {
        alert("Admin login success");
        localStorage.setItem("userName", response.data.adminName);
        navigate("/adminourfleet");
      } else if (response.data.role === "user") {
        alert("User login success");
        localStorage.setItem("userName", response.data.userName);
        navigate("/home");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full bg-black"
      />

      <motion.video
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover blur-xs"
        src="https://videos.pexels.com/video-files/5379995/5379995-sd_640_360_24fps.mp4"
      />

      <div className="relative flex flex-col md:flex-row items-center justify-center h-full gap-6 z-10 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          <div
            className="text-center h-48 w-48 md:h-72 md:w-72 flex justify-center items-center text-2xl md:text-4xl font-bold text-white cursor-pointer bg-white/30 rounded-xl shadow-2xl p-6 hover:scale-105 transition-all ease-out"
            onClick={() => {
              setShowAdminForm(true);
              setShowUserForm(false);
              setIsLogin(true);
            }}
          >
            Admin
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 2.2 }}
        >
          <div
            className="text-center h-48 w-48 md:h-72 md:w-72 flex justify-center items-center text-2xl md:text-4xl font-bold text-white cursor-pointer bg-white/30 rounded-xl shadow-2xl p-6 hover:scale-105 transition-all ease-out"
            onClick={() => {
              setShowUserForm(true);
              setShowAdminForm(false);
              setIsLogin(true);
            }}
          >
            User
          </div>
        </motion.div>
      </div>

      {(showAdminForm || showUserForm) && (
        <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-center">
              {showAdminForm ? "Admin Login" : isLogin ? "User Login" : "User Registration"}
            </h2>

            {!isLogin && showUserForm && (
              <input
                type="text"
                placeholder="Name"
                className="w-full mb-3 px-3 py-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}

            <input
              type="email"
              placeholder="Email"
              className="w-full mb-3 px-3 py-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mb-3 px-3 py-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-full bg-red-500 text-white py-2 rounded mb-3"
              onClick={handleSubmit}
            >
              {showAdminForm ? "Login" : isLogin ? "Login" : "Register"}
            </button>

            {showUserForm && (
              <p className="text-sm text-center">
                {isLogin ? "New user?" : "Already have an account?"} {" "}
                <span
                  className="text-blue-600 cursor-pointer underline"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Register" : "Login"}
                </span>
              </p>
            )}

            <button
              onClick={() => {
                setShowAdminForm(false);
                setShowUserForm(false);
              }}
              className="text-red-500 text-sm underline block text-center mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;