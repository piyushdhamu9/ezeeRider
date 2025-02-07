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
        return "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg";
      case "moto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png";
      case "auto":
        return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Choose a Ride</h3>
        <button
          onClick={() => setVehiclePanel(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>
      </div>

      {availableDrivers &&
        availableDrivers.map((driver) => (
          <div
            key={driver._id}
            onClick={() => handleVehicleSelect(driver.vehicle.vehicleType)}
            className="flex border-2 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between"
          >
            <img
              className="h-10"
              src={getVehicleImage(driver.vehicle.vehicleType)}
              alt={driver.vehicle.vehicleType}
            />
            <div className="ml-2 w-1/2">
              <h4 className="font-medium text-base">
                {driver.vehicle.vehicleType}{" "}
                <span>
                  <i className="ri-user-3-fill"></i>
                  {driver.vehicle.capacity}
                </span>
              </h4>
              <h5 className="font-medium text-sm">2 mins away </h5>
              <p className="font-normal text-xs text-gray-600">
                {driver.fullname.firstname}
              </p>
            </div>
            <h2 className="text-lg font-semibold">
              ₹{fare[driver.vehicle.vehicleType]}
            </h2>
          </div>
        ))}
    </div>
  );
};

export default VehiclePanel;