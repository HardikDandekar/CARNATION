import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminBookingList = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    axios
      .get("http://localhost:3000/api/bookings")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("❌ Error loading bookings", err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`http://localhost:3000/api/bookings/${id}`);
        alert("✅ Booking deleted");
        fetchBookings(); // reload bookings
      } catch (err) {
        console.error("❌ Delete failed", err);
        alert("Failed to delete booking");
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        bookings.map((b, idx) => (
          <div key={b._id} className="border p-4 mb-4 rounded bg-white shadow">
            <p>
              <strong>Car:</strong> {b.carName || "N/A"}
            </p>
            <p>
              <strong>Distance:</strong> {b.distance?.toFixed(2)} km
            </p>
            <p>
              <strong>Map Price:</strong> ₹{b.mapPrice}
            </p>
            <p>
              <strong>Car Price:</strong> ₹{b.carPrice}
            </p>
            <p>
              <strong>Total Price:</strong> ₹{b.totalPrice}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Booked on:</strong>{" "}
              {new Date(b.createdAt).toLocaleString()}
            </p>

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
