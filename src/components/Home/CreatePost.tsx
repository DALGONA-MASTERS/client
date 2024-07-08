import React from "react";
import { FaPhotoVideo, FaVideo } from "react-icons/fa";

function CreatePost() {
  return (
    <div className="h-44 w-[80%] custom-border-style rounded-3xl flex p-4 mt-2 flex-col justify-between">
      {/* Left part */}
      <div className="flex flex-row items-center space-x-2">
        {/* Left part */}
        <div className="w-auto flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
        {/* Middle part */}
        <div className="flex-1 flex items-center">
          <input
            type="text"
            placeholder="What's on your mind?"
            className=" w-full px-2 py-1 border rounded-2xl focus:outline-none focus:ring focus:border-green-300"
          />
        </div>
      </div>
      {/* Right part */}
      <div className="w-full flex flex-row justify-center items-center space-y-2">
        <button className="bg-white text-green-900 hover:bg-gray-100 px-2 py-2 rounded-full">
          <FaPhotoVideo className="text-xl" />
        </button>
        <button className="bg-white text-green-900 hover:bg-gray-100 px-2 py-2 rounded-full">
          <FaVideo className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
