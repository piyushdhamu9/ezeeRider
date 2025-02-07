import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate();

  const handleEndRide = async () => {
    try {
      if (!ride || !ride.captain || !ride.captain._id) {
        console.error("Captain information is missing in the ride object.");
        return; // Or handle the error in a way that's appropriate for your application
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: ride._id,
          captainId: ride.captain._id, // Add captainId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setFinishRidePanel(false);
        navigate("/captain-home"); // Navigate to captain's home
      } else {
        console.error("Failed to end ride:", response.status);
      }
    } catch (error) {
      console.error("Error ending ride:", error);
    }
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-5 text-center">Finish Ride</h3>
      <div className="flex items-center justify-between p-3 bg-yellow-100 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src="https://img.icons8.com/officel/80/guest-male.png"
            alt="guest-male"
          />
          <h2 className="text-lg font-medium capitalize">{ride?.user.fullname.firstname}</h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3 py-2 border-b">
          <i className="ri-map-pin-user-fill text-xl text-blue-600"></i>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Pickup</h3>
            <p className="text-sm text-gray-600">{ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2 border-b">
          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Destination</h3>
            <p className="text-sm text-gray-600">{ride?.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 py-2">
          <i className="ri-currency-line text-xl text-green-600"></i>
          <div>
            <h3 className="text-base font-semibold text-gray-800">Fare</h3>
            <h3 className="text-base font-semibold text-gray-800">₹{ride?.fare}</h3>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleEndRide}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-300"
        >
          Confirm Finish Ride
        </button>
      </div>
    </div>
  );
};

export default FinishRide;