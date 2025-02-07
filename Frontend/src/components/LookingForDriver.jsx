import React from "react";
import PropTypes from "prop-types";

const LookingForDriver = (props) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-2xl font-semibold">Looking for a Driver</h3>
        <button
          onClick={() => {
            if (props.setVehicleFound) props.setVehicleFound(false);
            if (props.setConfirmRidePanel) props.setConfirmRidePanel(true);
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <i className="ri-arrow-left-line text-xl"></i>
        </button>
      </div>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          alt=""
        />
        <div className="w-full mt-5">
          <div className="flex items-center gap-3 py-2 border-b">
            <i className="ri-map-pin-user-fill text-xl text-blue-600"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">PickUp</h3>
              <p className="text-sm text-gray-600">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b">
            <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Destination
              </h3>
              <p className="text-sm text-gray-600">{props.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2">
            <i className="ri-currency-line text-xl text-green-600"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Fare</h3>
              <h3 className="text-base font-semibold text-gray-800">
                ₹{props.fare[props.vehicleType]}
              </h3>
              {/* <p className="text-sm text-gray-600">Cash</p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

LookingForDriver.propTypes = {
  setVehicleFound: PropTypes.func,
  setConfirmRidePanel: PropTypes.func,
  pickup: PropTypes.string,
  destination: PropTypes.string,
  fare: PropTypes.object,
  vehicleType: PropTypes.string,
};

export default LookingForDriver;
