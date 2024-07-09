import React from "react";
import { FaShare, FaSignInAlt } from "react-icons/fa";
import { useGetPostMutation } from "../../features/api/apiSlice";
function Event() {
  return (
    <div className="md:h-44 min-h-44s w-[80%] custom-border-style rounded-3xl flex mt-2">
      {/* Left part */}
      <div className="flex flex-col justify-around items-start w-1/2 p-4">
        <div className="font-bold font-inter text-green-900 text-sm sm:text-base md:text-lg">
          Lundi, 21 Juillet 2024 · 14:00
        </div>
        <div className="text-lg sm:text-xl font-extrabold font-inter text-black">
          Plantation d'arbre pour creer une foret
        </div>
        <div className="font-bold font-inter text-green-900 text-sm sm:text-base md:text-lg">
          50 Participants
        </div>
      </div>
      {/* Right part */}
      <div className="flex w-1/2 p-4 md:flex-row flex-col justify-center items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Event"
          className="w-[80%] md:w-1/3 h-auto rounded-md"
        />
        <div className="flex md:flex-col flex-row  justify-center items-center w-2/3 md:space-y-2 mt-2 md:mt-0 ">
          {/* For small screens, show icons; for larger screens, show buttons */}
          <button className="bg-green-900 text-white p-2 rounded-md md:hidden">
            <FaShare className="text-xl" />
          </button>
          <button className="bg-blue-500 text-white p-2 rounded-md md:hidden">
            <FaSignInAlt className="text-xl" />
          </button>
          <button className="hidden md:block bg-green-900 text-white px-4 py-2 rounded-md">
            Partager cet événement
          </button>
          <button className="hidden md:block bg-blue-500 text-white px-4 py-2 rounded-md">
            Rejoindre cet événement
          </button>
        </div>
      </div>
    </div>
  );
}

export default Event;
