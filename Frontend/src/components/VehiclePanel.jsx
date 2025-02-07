import React from "react";

const VehiclePanel = ({
  fare,
  setConfirmRidePanel,
  setVehiclePanel,
  selectVehicle,
  availableDrivers,
}) => {
  const handleVehicleSelect = (type) => {
    selectVehicle(type);
    setVehiclePanel(false);
    setConfirmRidePanel(true);
  };

  const getVehicleImage = (type) => {
    switch (type) {
      case "car":
        return "https://banner2.cleanpng.com/20180616/oph/aa61w3amk.webp";
      case "moto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      case "auto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-2xl border border-gray-300">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-bold text-gray-800">Choose a Ride</h3>
        <button
          onClick={() => setVehiclePanel(false)}
          className="text-gray-500 hover:text-gray-700 transition duration-200"
        >
          <i className="ri-arrow-left-line text-2xl"></i>
        </button>
      </div>

      {availableDrivers &&
        availableDrivers.map((driver) => (
          <div
            key={driver._id}
            onClick={() => handleVehicleSelect(driver.vehicle.vehicleType)}
            className="flex items-center justify-between p-4 mb-3 bg-gray-100 border-2 border-transparent hover:border-gray-700 rounded-xl cursor-pointer transition duration-300"
          >
            <img
              className="h-12 "
              src={getVehicleImage(driver.vehicle.vehicleType)}
              alt={driver.vehicle.vehicleType}
            />
            <div className="ml-3 w-2/3">
              <h4 className="font-semibold text-lg text-gray-800 flex items-center gap-1">
                {driver.vehicle.vehicleType.charAt(0).toUpperCase() + driver.vehicle.vehicleType.slice(1)}
                <span className="flex items-center text-gray-600 text-sm">
                  <i className="ri-user-3-fill mr-1"></i>
                  {driver.vehicle.capacity}
                </span>
              </h4>
              <h5 className="text-gray-600 text-sm">2 mins away</h5>
              <p className="text-xs text-gray-500">Driver: {driver.fullname.firstname}</p>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">₹{fare[driver.vehicle.vehicleType]}</h2>
          </div>
        ))}
    </div>
  );
};

export default VehiclePanel;
