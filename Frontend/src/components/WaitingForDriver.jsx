import React from "react";
import { Link } from "react-router-dom";

const WaitingForDriver = ({ ride, setVehicleFound, setWaitingForDriver }) => {
  const getVehicleImage = (type) => {
    switch (type) {
      case "car":
        return "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg";
      case "moto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      case "auto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
      default:
        return "";
    }
  };

  const handleGoHome = () => {
    setVehicleFound(false);
    setWaitingForDriver(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Top Navigation */}
      <div className="flex justify-end">
        <Link
          to="/home"
          className="text-blue-600 hover:text-blue-800 transition font-semibold"
          onClick={handleGoHome}
        >
          Go to Home →
        </Link>
      </div>

      {/* Driver Information */}
      <div className="flex items-center gap-4 my-6 border-b pb-4">
        <img
          className="h-16 border-gray-300"
          src={getVehicleImage(ride?.captain?.vehicle?.vehicleType)}
          alt={ride?.captain?.vehicle?.vehicleType}
        />
        <div className="text-gray-800">
          <h2 className="text-xl font-semibold capitalize">
            {ride?.captain?.fullname?.firstname || "Driver"}
          </h2>
          <h4 className="text-lg font-medium">{ride?.captain?.vehicle?.plate}</h4>
          <p className="text-sm text-gray-500">
            {ride?.captain?.vehicle?.vehicleType}
          </p>
        </div>
      </div>

      {/* OTP Information */}
      <div className="my-4 p-3 rounded-lg border border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700">
          Your OTP:{" "}
          <span className="text-2xl font-bold text-green-600">
            {ride?.otp || "XXXX"}
          </span>
        </h3>
        <p className="text-gray-600 text-sm mt-1">
          Please provide this OTP to your driver to start the ride.
        </p>
      </div>

      {/* Ride Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 py-2 border-b">
          <i className="ri-map-pin-user-fill text-xl text-blue-600"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">Pickup</h4>
            <p className="text-sm text-gray-600">{ride?.pickup || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2 border-b">
          <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">Destination</h4>
            <p className="text-sm text-gray-600">{ride?.destination || "N/A"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 py-2">
          <i className="ri-currency-line text-xl text-green-600"></i>
          <div>
            <h4 className="text-base font-semibold text-gray-800">Fare</h4>
            <p className="text-sm text-gray-600">
              ₹{ride?.fare || "0"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;