import React, { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import LiveTracking from "../components/LiveTracking";
import Navbar from "../components/Navbar";
import axios from "axios";

const Riding = () => {
  const location = useLocation();
  const { ride } = location.state || {};
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [pickup, setPickup] = useState(ride?.pickup || "");
  const [destination, setDestination] = useState(ride?.destination || "");

  useEffect(() => {
    socket.on("ride-ended", () => {
      navigate("/home");
    });
  }, [socket, navigate]);

  const handleEndRide = async () => {
    try {
      // Make API request to end the ride
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        {
          rideId: ride._id,
        }
      );

      if (response.status === 200) {
        // Navigate to home after successful ride end
        navigate("/home"); // Navigate to user's home
      } else {
        console.error("Failed to end ride:", response.status);
        // Handle error appropriately (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error ending ride:", error);
      // Handle error appropriately (e.g., show an error message)
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow h-full">
        {/* Left Section - Details */}
        <div className="w-1/3 h-full p-4 flex flex-col justify-between overflow-y-auto bg-white shadow-lg">
          <div>
            <div className="flex items-center justify-between mb-4">
              <img
                className="h-12"
                src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
                alt="Captain's Vehicle"
              />
              <div className="text-right">
                <h2 className="text-lg font-medium capitalize">
                  {ride?.captain.fullname.firstname}
                </h2>
                <h4 className="text-xl font-semibold -mt-1 -mb-1">
                  {ride?.captain.vehicle.plate}
                </h4>
                <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
              </div>
            </div>

            <div className="w-full mt-5">
              <div className="flex items-center gap-5 p-3 border-b-2">
                <i className="text-lg ri-map-pin-2-fill"></i>
                <div>
                  <h3 className="text-lg font-medium">Destination</h3>
                  <p className="text-sm -mt-1 text-gray-600">
                    {ride?.destination}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-5 p-3">
                <i className="ri-currency-line"></i>
                <div>
                  <h3 className="text-lg font-medium">₹{ride?.fare} </h3>
                  <p className="text-sm -mt-1 text-gray-600">Cash</p>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleEndRide}
            className="w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-lg"
          >
            End Ride
          </button>
        </div>

        {/* Right Section - Map */}
        <div className="w-2/3 h-full">
          <LiveTracking
            pickup={pickup}
            destination={destination}
            showDirections={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Riding;