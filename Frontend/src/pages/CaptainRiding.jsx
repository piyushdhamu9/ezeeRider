import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import LiveTracking from "../components/LiveTracking";
import Navbar from "../components/Navbar";
import CaptainDetails from "../components/CaptainDetails";

const CaptainRiding = () => {
  const location = useLocation();
  const rideData = location.state?.ride;
  const [pickup, setPickup] = useState(rideData?.pickup || "");
  const [destination, setDestination] = useState(rideData?.destination || "");

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow h-full">
        {/* Captain Details Section */}
        <div className="w-1/3 h-full p-6 bg-white shadow-lg flex flex-col justify-between overflow-y-auto">
          <CaptainDetails />
          <FinishRide ride={rideData} />
        </div>

        {/* Live Tracking Section */}
        <div className="w-2/3 h-full">
          <LiveTracking pickup={pickup} destination={destination} showDirections={true} />
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
