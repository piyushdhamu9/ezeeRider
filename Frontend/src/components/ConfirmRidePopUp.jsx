import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHander = async (e) => {
    e.preventDefault();

    const response = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
      {
        params: {
          rideId: props.ride._id,
          otp: otp,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("driverToken")}`,
        },
      }
    );

    if (response.status === 200) {
      props.setConfirmRidePopupPanel(false);
      props.setRidePopupPanel(false);
      navigate("/captain-riding", { state: { ride: props.ride } });
    }
  };

  return (
    <div className="fixed bottom-0 h-3/4 max-w-md p-6 bg-white shadow-xl rounded-2xl border border-gray-300">
      <h5
        className="absolute top-4 right-6 cursor-pointer"
        onClick={() => {
          props.setRidePopupPanel(false);
        }}
      ></h5>
      <h3 className="text-2xl font-semibold mb-5 text-center">
        Confirm this ride to Start
      </h3>
      <div className="flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3 ">
          <img
            width="80"
            height="80"
            src="https://img.icons8.com/officel/80/guest-male.png"
            alt="guest-male"
            className="h-12 rounded-full object-cover w-12"
          />
          <h2 className="text-lg font-medium capitalize">
            {props.ride?.user.fullname.firstname +
              " " +
              props.ride?.user.fullname.lastname}
          </h2>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>

      <div className="flex gap-2 justify-between flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-3 py-2 border-b">
            <i className="ri-map-pin-user-fill text-xl text-blue-600"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Pickup</h3>
              <p className="text-sm text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b">
            <i className="ri-map-pin-2-fill text-xl text-red-500"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">
                Destination
              </h3>
              <p className="text-sm text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 py-2 border-b">
            <i className="ri-currency-line text-xl text-green-600"></i>
            <div>
              <h3 className="text-base font-semibold text-gray-800">Fare</h3>
              <h3 className="text-base font-semibold text-gray-800">
                ₹{props.ride?.fare}
              </h3>
            </div>
          </div>
        </div>

        <div className="mt-1 w-full">
          <form onSubmit={submitHander}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className="bg-gray-100 px-6 py-3 font-mono text-base rounded-lg w-full mt-1"
              placeholder="Enter OTP"
            />

            <div className="flex gap-2 mt-3">
              <button className="w-full mt-2 text-lg flex justify-center bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition duration-300">
                Confirm
              </button>
              <button
                onClick={() => {
                  props.setConfirmRidePopupPanel(false);
                  props.setRidePopupPanel(false);
                }}
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-lg text-white font-semibold p-3 rounded-lg transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
