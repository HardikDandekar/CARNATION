import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const baseurl = import.meta.env.VITE_API_BASE_URL;

const MyBooking = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const userData = localStorage.getItem('loginUser');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    if (user && user._id) {
      const fetchBookings = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseurl}/api/bookings/history/${user._id}`);
          console.log("Fetched Bookings:", response.data);
          setBookings(response.data);
        } catch (err) {
          setError("Failed to fetch bookings");
          console.error("Error fetching bookings:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchBookings();
    }
  }, [user]);

  if (!user) {
    return <div className="text-center">Please log in to view your bookings.</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-blue-600">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-semibold text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Your Bookings</h2>

      {/* Back button */}
      <button
        onClick={() => navigate(-1)}  // Navigate to the previous page
        className="mb-6 text-white bg-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Back
      </button>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{booking.carName}</h3>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Pickup Location:</span> {booking.pickupLocation}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Drop Location:</span> {booking.dropLocation}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Pickup Date:</span> {new Date(booking.pickupDate).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-1"><span className="font-semibold">Total Price:</span> ₹{booking.totalPrice}</p>
              <p className="text-gray-700 mt-2">
                <span className="font-semibold">Payment Status:</span> 
                <span className={booking.paymentStatus ? 'text-green-600 font-bold' : 'text-red-500 font-bold'}>
                  {booking.paymentStatus ? ' Paid' : ' Pending'}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;
