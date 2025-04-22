import React, { useState, useContext, useRef, useEffect } from "react";
import { Menu, X, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import userAuthenticatedAxiosInstance from "../../../services/users/userAuthenticatedAxiosInstance";
import lionlogo from "../../../assets/lionsymbol.png";
import TranslateToggle from "../translate/googleTranslater";
import TranslatePopup from "../translate/googleTranslater";
import Yojana_Sahayak_logo from "../../../assets/Yojana_Sahayak_logo.svg";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const userAxiosInstance = userAuthenticatedAxiosInstance("/api/v1/users");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await userAxiosInstance.post("/logout");
      console.log(response);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("An error occurred", error.message);
    } finally {
      localStorage.removeItem("accessToken");
      setIsUserLoggedIn(false);
      setIsProfileOpen(false);
      navigate("/");
      console.log("User logged out unsuccessfully");
    }
  };

  return (
    <>
     
      <header className="bg-gradient-to-r from-green-500 to-green-600 h-20 flex items-center justify-center px-4 md:px-8 w-full relative shadow-md">
        {/* Logo and company name with z-index to appear above other elements */}
        <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10">
          <Link className="flex items-center" to="/">
            <img
              src={Yojana_Sahayak_logo || "/placeholder.svg"}
              alt="logo"
              className="w-12 md:w-16 mr-3"
            />
            <h1 className="text-white text-xl md:text-3xl font-bold tracking-tight">
              Yojna Sahayak
            </h1>
          </Link>
        </div>

        {/* Centered navigation links */}
        <nav className="hidden text-xl font-bold md:flex items-center gap-8 mx-auto">
          <Link
            to="/"
            className="text-white hover:text-green-100 font-bold transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-white hover:text-green-100 font-bold transition-colors"
          >
            About
          </Link>
          <Link
            to="/schemes"
            className="text-white hover:text-green-100 font-bold transition-colors"
          >
            Schemes
          </Link>
          <Link
            to="/recommendations"
            className="text-white hover:text-green-100 font-bold transition-colors"
          >
            Suggestions
          </Link>
        </nav>

        {/* Login/profile section - positioned absolutely on the right */}
        <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex gap-4 items-center">
        <div className="hidden md:block">

          <TranslatePopup/>
        </div>
          {isUserLoggedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="bg-white text-black rounded-full p-2 hover:bg-gray-100 transition-colors shadow-sm"
              >
                <User size={24} className="text-green-600" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-green-700 rounded-md px-4 py-2 flex items-center gap-2 font-medium hover:bg-gray-50 transition-colors shadow-sm"
            >
              <LogIn size={18} />
              Login
            </Link>
          )}
          <button
            className="md:hidden text-white p-2 rounded-md hover:bg-green-700 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu Button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-20 left-0 right-0 bg-green-700 md:hidden z-50 px-6 py-4 shadow-lg">
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-white hover:text-green-100 py-2 font-medium border-b border-green-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-green-100 py-2 font-medium border-b border-green-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/schemes"
                className="text-white hover:text-green-100 py-2 font-medium border-b border-green-600"
                onClick={() => setIsOpen(false)}
              >
                Schemes
              </Link>
              <Link
                to="/recommendations"
                className="text-white hover:text-green-100 py-2 font-medium border-b border-green-600"
                onClick={() => setIsOpen(false)}
              >
                Suggestions
              </Link>
              <TranslatePopup/>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
