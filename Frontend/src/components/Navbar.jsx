import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem("userToken");
      const driverToken = localStorage.getItem("driverToken");
      setIsLoggedIn(!!(userToken || driverToken));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("driverToken");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-black text-white p-2 flex justify-between items-center">
      <div className="text-3xl mx-11">
        <Link to="/">Rider</Link>
      </div>
      <div className="text-base space-x-4 mx-6 flex items-center">
        <button className="p-1">EN</button>
        <button className="p-1">Help</button>
        {isLoggedIn ? (
          <div className="relative">
            <img
              className="invert cursor-pointer w-8 h-8"
              src="https://img.icons8.com/ios-filled/50/user-male-circle.png"
              alt="user profile"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-2 text-white hover:bg-white hover:text-black hover:rounded-full"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="px-3 py-2 text-white hover:bg-white hover:text-black hover:rounded-full"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;