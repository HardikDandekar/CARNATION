import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import OurFleet from "../pages/OurFleet";
import About from "../pages/About";
import Dashboard from "../pages/adminPages/Dashboard";
import ViewCar from "../pages/ViewCar";
import CityMapForm from "../pages/adminPages/CityMapForm";
import AdminOurFleet from "../pages/adminPages/AdminOurFleet";
import AdminLogin from "../pages/adminPages/component/AdminLogin";
import UserAuth from "../pages/adminPages/component/UserAuth";
import AdminView from "../pages/adminPages/AdminView";
import AdminHome from "../pages/adminPages/Nav/AdminHome";
import AdminAbout from "../pages/adminPages/Nav/AdminAbout";
import AdminService from "../pages/adminPages/Nav/AdminService";
import AdminBookingList from "../pages/adminPages/AdminBookingList";
import MyBooking from "../pages/MyBooking";

const Routess = () => {
  return (
    <Routes>
      {/* Front view */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/user/auth" element={<UserAuth />} />

     


      {/* Admin Pages */}
      <Route path="/admin/bookings" element={<AdminBookingList />} />
      <Route path="/adminourfleet" element={<AdminOurFleet />} />
      <Route path="/adminourfleet/:id" element={<AdminView />} />
      <Route path="/adminhome" element={<AdminHome />} />
      <Route path="/adminabout" element={<AdminAbout />} />
      <Route path="/adminservice" element={<AdminService />} />
      <Route path="/admin/cityform" element={<CityMapForm />} />

      {/* User Pages */}
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/ourFleet" element={<OurFleet />} />
      <Route path="/myBooking" element={<MyBooking />} />
      

      {/* Nested Route */}
      <Route path="/ourFleet/:id" element={<ViewCar />}>
        <Route path="book" element={<CityMapForm />} />
      </Route>
    </Routes>
  );
};

export default Routess;
