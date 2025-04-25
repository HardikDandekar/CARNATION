import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseurl = import.meta.env.VITE_API_BASE_URL;

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      if (isLogin) {
        const res = await axios.post(`${baseurl}/api/login`, {
          email,
          password
        });

        localStorage.setItem("user", JSON.stringify({
          name: res.data.role === "admin" ? res.data.adminName : res.data.userName,
          email: res.data.email
        }));
        localStorage.setItem("role", res.data.role);

        alert("✅ " + res.data.message);
        navigate("/home");
      } else {
        const res = await axios.post(`${baseurl}/api/register`, {
          name,
          email,
          password
        });

        if (res.status === 201) {
          alert("✅ Registration successful! Please log in.");
          setIsLogin(true);
          setName("");
          setEmail("");
          setPassword("");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
      console.error("❌ Auth error:", err);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex mb-4">
          <button
            className={`w-1/2 py-2 rounded-l ${isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 rounded-r ${!isLogin ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleAuth}>
          <h2 className="text-xl font-semibold mb-4 text-center">
            {isLogin ? "User Login" : "User Sign Up"}
          </h2>

          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              className="w-full px-3 py-2 border rounded mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
