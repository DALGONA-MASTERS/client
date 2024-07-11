import React, { useState, useEffect, useRef } from "react";
import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaHome,
  FaCalendarAlt,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  useEffect(() => {
    const closeSearchOnOutsideClick = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSearchOnOutsideClick);

    return () => {
      document.removeEventListener("mousedown", closeSearchOnOutsideClick);
    };
  }, [isSearchOpen]);

  return (
    <nav className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/logo.png" alt="Logo" className="h-[100%] w-[100px]" />
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <FaHome className="text-green-700 text-xl" />
          <FaCalendarAlt className="text-green-700 text-xl" />
          <FaChartLine className="text-green-700 text-xl" />
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/home"
            className="text-green-700 hover:text-green-900 flex items-center"
          >
            <FaHome className="text-xl" />
            <span className="ml-2">Accueil</span>
          </Link>
          <Link
            to="/events"
            className="text-green-700 hover:text-green-900 flex items-center"
          >
            <FaCalendarAlt className="text-xl" />
            <span className="ml-2">Événement</span>
          </Link>
          <Link
            to="/stats"
            className="text-green-700 hover:text-green-900 flex items-center"
          >
            <FaChartLine className="text-xl" />
            <span className="ml-2">Suivi de l’impact écologique</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative flex items-center" ref={searchRef}>
            <div
              className="block md:hidden cursor-pointer"
              onClick={toggleSearch}
            >
              <FaSearch className="text-green-700 text-xl" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className={`px-2 py-1 border border-green-400 rounded-2xl text-sm text-green-700 placeholder-green-700 outline-none focus:border-green-400 md:w-48 ${
                isSearchOpen ? "block" : "hidden"
              } md:block`}
            />
          </div>
          <FaBell className="text-green-700 text-xl" />
          <Link to="/profil">
            <FaUserCircle className="text-green-700 text-xl" />{" "}
          </Link>
        </div>
        {/* Mobile Navigation Menu */}
      </div>
    </nav>
  );
}

export default Navbar;
