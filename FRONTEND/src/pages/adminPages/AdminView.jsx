import React, { useRef, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars } from "../../store/reducers/CarSlice";
import axios from "axios";
const baseurl = import.meta.env.VITE_API_BASE_URL;

const AdminView = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cars } = useSelector((state) => state.car);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const [car, setCar] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", price: "", image: "" });

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCars());
    }
  }, [dispatch, cars.length]);

  useEffect(() => {
    if (cars.length > 0 && id) {
      const foundCar = cars.find((c) => String(c._id) === id);
      setCar(foundCar);
      setEditData({
        name: foundCar?.name || "",
        price: foundCar?.price || "",
        image: foundCar?.image || "",
      });
    }
  }, [cars, id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await axios.delete(`${baseurl}/api/cars/${car._id}`);
      alert("✅ Car deleted");
      dispatch(fetchCars());
      navigate("/adminourfleet"); // ✅ Navigate after deleting
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting car");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${baseurl}/api/cars/${car._id}`, editData);
      alert("✅ Car updated");
      dispatch(fetchCars());
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("❌ Error updating car");
    }
  };

  if (!car) {
    return (
      <div className="text-center mt-10 text-xl text-blue-600">
        Loading car details...
      </div>
    );
  }

  return (
    <>
      <div
        className="h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px]"
        style={{
          backgroundImage: "url('/images/bg-images/about.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <div className="flex justify-center items-center h-full">
          <h1 className="text-zinc-100 mb-64 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Vehicle Detail
          </h1>
        </div>
      </div>

      <section className="bg-neutral-200 py-10 px-4 sm:px-10 md:px-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex justify-center items-center lg:w-[40%]">
            <div
              className="w-full max-w-[350px] h-[300px] sm:h-[360px] border-2 bg-white border-neutral-300 rounded-2xl"
              style={{
                backgroundImage: `url(${editData.image})`,
                backgroundSize: "90%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>

          <div className="lg:w-[60%] flex items-center">
            <div>
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="mb-3 p-2 border rounded w-full text-sm"
                    placeholder="Car Name"
                  />
                  <input
                    type="text"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                    className="mb-3 p-2 border rounded w-full text-sm"
                    placeholder="Price"
                  />
                  <input
                    type="text"
                    value={editData.image}
                    onChange={(e) =>
                      setEditData({ ...editData, image: e.target.value })
                    }
                    className="mb-6 p-2 border rounded w-full text-sm"
                    placeholder="Image URL"
                  />
                  <div className="flex gap-4 flex-wrap">
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 px-5 py-2 text-white rounded text-sm"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 px-5 py-2 text-white rounded text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3">
                    {car.name}
                  </h1>
                  <div className="text-red-500 mb-3 text-xl">
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-s-fill"></i>
                    <i className="ri-star-half-s-fill"></i>
                  </div>
                  <div className="flex mb-4 items-end">
                    <span className="text-xl sm:text-2xl mr-1 text-red-500">
                      {car.price}
                    </span>
                    <span className="text-xs text-red-500">/Day</span>
                  </div>
                  <p className="text-sm sm:text-base mb-6">
                    This is a sample description for the car. You can modify
                    this section or fetch from backend later.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-500 px-5 py-3 text-white rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 px-5 py-3 text-white rounded text-sm"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(-1)}
                      className="bg-gray-700 px-5 py-3 text-white rounded text-sm"
                    >
                      Back
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <div ref={scrollRef}></div>
      <Outlet context={{ scrollRef }} />
    </>
  );
};

export default AdminView;
