import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../store/reducers/CarSlice";
import axios from "axios";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 22.7196,
  lng: 75.8577,
};

const CityMapForm = () => {
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [pickupRef, setPickupRef] = useState(null);
  const [dropRef, setDropRef] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const summaryRef = useRef(null);
  const [user, setUser] = useState({ name: "", email: "" });

  const { id } = useParams();
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.car);
  const [car, setCar] = useState(null);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  useEffect(() => {
    if (cars.length > 0 && id) {
      const foundCar = cars.find((c) => String(c._id) === id);
      setCar(foundCar);
    }
  }, [cars, id]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.name && userData?.email) {
      setUser(userData);
      setUsername(userData.name);
    }
  }, []);

  const getRoute = (origin, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
          const route = result.routes[0].legs[0];
          const distInKm = route.distance.value / 1000;
          setDistance(distInKm);
          setPrice(distInKm * 10);
        } else {
          console.error("Directions request failed", result);
        }
      }
    );
  };

  const handleAddressSubmit = () => {
    const pickupPlace = pickupRef?.getPlace();
    const dropPlace = dropRef?.getPlace();

    if (!pickupPlace || !dropPlace || !pickupDate || !username || !mobile) {
      alert("Please fill all details correctly");
      return;
    }

    const pickupLatLng = {
      lat: pickupPlace.geometry.location.lat(),
      lng: pickupPlace.geometry.location.lng(),
    };

    const dropLatLng = {
      lat: dropPlace.geometry.location.lat(),
      lng: dropPlace.geometry.location.lng(),
    };

    setPickup({ ...pickupLatLng, name: pickupPlace.formatted_address });
    setDrop({ ...dropLatLng, name: dropPlace.formatted_address });
    getRoute(pickupLatLng, dropLatLng);
    setShowSummary(true);
    setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const carPrice = car ? parseInt(car.price.replace(/[^\d]/g, "")) : 0;
  const total = price + carPrice;

  const handleConfirmBooking = async () => {
    if (!pickup || !drop || !pickupDate || !car) {
      alert("Missing data for booking.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(total * 100) }), // in paise
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_s1rja5JPkrJPIn",
        amount: order.amount,
        currency: "INR",
        name: "CarNation",
        description: "Booking Payment",
        order_id: order.id,
        prefill: {
          name: username,
          email: user.email,
        },
        handler: async function (response) {
          const bookingData = {
            name: username,
            email: user.email,
            mobile,
            carName: car.name,
            pickupLocation: pickup?.name || "one",
            dropLocation: drop?.name || "two",
            pickupDate,
            distance,
            mapPrice: price,
            carPrice,
            totalPrice: total,
            paymentStatus: true,
          };
          
          const bookingRes = await fetch("http://localhost:3000/api/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bookingData),
          });

          const result = await bookingRes.json();
          console.log("✅ Booking confirmed:", result);
          alert("✅ Booking Successful!");
        },
        theme: {
          color: "#EF4444",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("❌ Razorpay Error:", err);
      alert("Payment failed");
    }
  };

  return (
    <div className="px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Book Your Ride via Map</h1>

      <LoadScript googleMapsApiKey="AIzaSyCEoUWv31_ZySfro9zQoYIrJyObMZVRcEY" libraries={["places"]}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
          {pickup && <Marker position={pickup} label="P" />}
          {drop && <Marker position={drop} label="D" />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        <div className="mt-6 p-4 border rounded bg-white shadow w-full max-w-md">
          <Autocomplete onLoad={(ref) => setPickupRef(ref)}>
            <input
              type="text"
              placeholder="Enter Pickup Location"
              className="w-full mb-3 p-2 border border-gray-400 rounded"
            />
          </Autocomplete>

          <Autocomplete onLoad={(ref) => setDropRef(ref)}>
            <input
              type="text"
              placeholder="Enter Drop Location"
              className="w-full mb-3 p-2 border border-gray-400 rounded"
            />
          </Autocomplete>

          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-400 rounded"
          />

          <input
            type="text"
            value={username}
            placeholder="Enter Name"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-400 rounded"
          />

          <input
            type="text"
            value={mobile}
            placeholder="Enter Mobile"
            onChange={(e) => setMobile(e.target.value)}
            className="w-full mb-3 p-2 border border-gray-400 rounded"
          />

          <button
            onClick={handleAddressSubmit}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Set Route
          </button>

          <p className="mt-4">
            <strong>Distance:</strong> {distance.toFixed(2)} km
          </p>
          <p>
            <strong>Map Price:</strong> ₹{price.toFixed(0)}
          </p>
        </div>
      </LoadScript>

      {showSummary && car && (
        <div
          ref={summaryRef}
          className="mt-6 p-4 border border-gray-400 rounded bg-white shadow w-full max-w-xl"
        >
          <h2 className="text-lg font-bold mb-4">Booking Summary</h2>
          <p><strong>Name:</strong> {username}</p>
          <p><strong>Mobile:</strong> {mobile}</p>
          <p><strong>Car:</strong> {car.name}</p>
          <p><strong>Pickup:</strong> {pickup?.name}</p>
          <p><strong>Drop:</strong> {drop?.name}</p>
          <p><strong>Pickup Date:</strong> {pickupDate}</p>
          <p><strong>Map Price:</strong> ₹{price.toFixed(0)}</p>
          <p><strong>Car Price:</strong> ₹{carPrice}</p>
          <p className="mt-4 text-lg">
            <strong>Total:</strong> ₹{total.toFixed(0)}
          </p>

          <button
            onClick={handleConfirmBooking}
            className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Pay & Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default CityMapForm;
