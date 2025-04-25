import React, { useEffect, useState } from "react";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [carFilter, setCarFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const fetchBookings = () => {
    axios
      .get(`${baseurl}/api/bookings`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("❌ Error loading bookings", err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${baseurl}/api/bookings/${id}`);
        alert("✅ Booking deleted");
        fetchBookings();
      } catch (err) {
        console.error("❌ Delete failed", err);
        alert("Failed to delete booking");
      }
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const carMatch = carFilter ? b.carName?.toLowerCase().includes(carFilter.toLowerCase()) : true;
    const dateMatch = dateFilter ? b.pickupDate === dateFilter : true;
    return carMatch && dateMatch;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {/* 🔍 Filter section */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by car"
          value={carFilter}
          onChange={(e) => setCarFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-1 rounded"
        />
      </div>

      {filteredBookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        filteredBookings.map((b) => (
          <div key={b._id} className="border p-4 mb-4 rounded bg-white shadow">
            <p><strong>User:</strong> {b.name}</p>
            <p><strong>Mobile:</strong> {b.mobile}</p>
            <p><strong>Car:</strong> {b.carName}</p>
            <p><strong>Pickup Location:</strong> {b.pickupLocation}</p>
            <p><strong>Drop Location:</strong> {b.dropLocation}</p>
            <p><strong>Pickup Date:</strong> {b.pickupDate}</p>
            <p><strong>Distance:</strong> {b.distance?.toFixed(2)} km</p>
            <p><strong>Total Price:</strong> ₹{b.totalPrice}</p>
            <p className="text-sm text-gray-500"><strong>Booked on:</strong> {new Date(b.createdAt).toLocaleString()}</p>

            <button
              onClick={() => handleDelete(b._id)}
              className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminBookingList;
