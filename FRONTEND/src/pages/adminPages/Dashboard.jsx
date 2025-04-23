import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [formType, setFormType] = useState(""); // 'admin' | 'user-login' | 'user-register'
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const payload = { name, mobile, email, password };
      const res = await axios.post("http://localhost:3000/api/auth/register", payload);
      alert(res.data.message);
      setFormType("user-login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login/admin", { email, password });
      if (res.data.role === "admin") {
        localStorage.setItem("userName", res.data.adminName);
        alert("Admin Login Success");
        navigate("/adminourfleet");
      } else {
        alert("Invalid admin credentials");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Admin login failed");
    }
  };

  const handleUserLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", { email, password });
      if (res.data.role === "user") {
        localStorage.setItem("userName", res.data.userName);
        alert("User Login Success");
        navigate("/home");
      } else {
        alert("Invalid user credentials");
      }
    } catch (err) {
      alert(err.response?.data?.message || "User login failed");
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Users/hardikdandekar/Desktop/MajorProject/FRONTEND/src/assets 19-35-03-188/16431350-sd_640_360_24fps.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        {!formType && (
          <div className="flex flex-col md:flex-row gap-6 animate-fade-in">
            <button
              onClick={() => setFormType("admin")}
              className="bg-blue-600 text-white px-24 py-18 rounded-xl text-2xl hover:bg-blue-700 transition-all duration-300"
            >
              Admin
            </button>
            <button
              onClick={() => setFormType("user-login")}
              className="bg-green-600 text-white px-24 py-18 rounded-xl text-2xl hover:bg-green-700 transition-all duration-300"
            >
              User
            </button>
          </div>
        )}

        {(formType === "admin" || formType === "user-login" || formType === "user-register") && (
          <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-full max-w-md animate-slide-up mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              {formType === "admin"
                ? "Admin Login"
                : formType === "user-login"
                ? "User Login"
                : "User Registration"}
            </h2>

            {formType === "user-register" && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full mb-3 px-3 py-2 border rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Mobile"
                  className="w-full mb-3 px-3 py-2 border rounded"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </>
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

            {formType === "admin" && (
              <button
                onClick={handleAdminLogin}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            )}

            {formType === "user-login" && (
              <>
                <button
                  onClick={handleUserLogin}
                  className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                  Login
                </button>
                <p className="text-sm mt-3 text-center text-gray-800">
                  Don't have an account?{" "}
                  <span
                    onClick={() => setFormType("user-register")}
                    className="text-blue-600 cursor-pointer font-semibold"
                  >
                    Register here
                  </span>
                </p>
              </>
            )}

            {formType === "user-register" && (
              <>
                <button
                  onClick={handleRegister}
                  className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
                >
                  Register
                </button>
                <p className="text-sm mt-3 text-center text-gray-800">
                  Already have an account?{" "}
                  <span
                    onClick={() => setFormType("user-login")}
                    className="text-blue-600 cursor-pointer font-semibold"
                  >
                    Login here
                  </span>
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Animations via Tailwind plugin (optional if using custom CSS) */}
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in {
            animation: fade-in 1s ease-in;
          }

          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up {
            animation: slide-up 0.8s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;
