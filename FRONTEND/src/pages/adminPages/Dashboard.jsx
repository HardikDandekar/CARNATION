import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [formType, setFormType] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [user , setUser] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const updateVideo = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setVideoUrl("https://videos.pexels.com/video-files/5927708/5927708-hd_1080_1920_30fps.mp4");
       
     
      } else {
        setVideoUrl("https://videos.pexels.com/video-files/3066446/3066446-sd_960_506_24fps.mp4");
       
      }
    };

    updateVideo();
    window.addEventListener("resize", updateVideo);

    return () => window.removeEventListener("resize", updateVideo);
  }, []);

  const handleRegister = async () => {
    try {
      const payload = { name, mobile, email, password };
      const res = await axios.post(`${baseurl}/api/auth/register`, payload);
      alert(res.data.message);
      setFormType("user-login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post(`${baseurl}/api/auth/login/admin`, { email, password });
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
      const res = await axios.post(`${baseurl}/api/auth/login`, { email, password });
      if (res.data.role === "user") {
        localStorage.setItem("userName", res.data.user.name);
        localStorage.setItem("loginUser", JSON.stringify(res.data.user));
        setUser(res.data.user ||[])
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
      {videoUrl && (
        <video autoPlay muted loop className="absolute inset-0 h-full w-full object-cover">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 z-10" />

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

      {/* Animations */}
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
