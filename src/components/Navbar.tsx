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
import axios from "axios";
import SearchEvent from "./searchEvents";
import { log } from "console";

function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState([]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  // request to handle the search for an event
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform search logic here
    console.log(`Searching for: ${searchTerm}`);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}events/search?query=${searchTerm}`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setSearchResults(response.data);
      setSearchTerm("");
      setIsSearchOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error searching for events:" + error.message);
      } else {
        console.error("An unknown error occurred while searching for events.");
      }
    }
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
          <SearchEvent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
          />
          <FaBell className="text-green-700 text-xl" />
          <FaUserCircle className="text-green-700 text-xl" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
