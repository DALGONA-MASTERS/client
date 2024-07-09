import React, { useEffect, useState } from "react";
import { FaPhotoVideo, FaVideo } from "react-icons/fa";
import { useAddPostMutation } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { handleAddData, handleFetchedData } from "../../utilities/apiUtils";
import { AppDispatch } from "../../app/store";
import { addPostData } from "../../features/posts/postsSice";

function CreatePost() {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUser);
  const [content, setContent] = useState("");
  const [addPost, addPostResult] = useAddPostMutation();
  useEffect(() => {
    console.log(user);
  }, [user]);
  const handleCreatePost = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event bubbling
    e.preventDefault(); // Prevent default action

    if (content.trim() === "") {
      return;
    }
    const newPost = { author: user!.id, content };

    try {
      console.log("Sending post:", newPost); // Log the data being sent
      await addPost(newPost).unwrap();
      setContent(""); // Clear the input field after successful post creation
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  // Handler
  useEffect(() => {
    handleAddData(addPostResult, dispatch, addPostData);
  }, [addPostResult]);

  return (
    <div className="h-44 w-[80%] custom-border-style rounded-3xl flex p-4 mt-2 flex-col justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div className="w-auto flex items-center">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
        <div className="flex-1 flex items-center">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className=" w-full px-2 py-1 border rounded-2xl focus:outline-none focus:ring focus:border-green-300"
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center space-y-2">
        <button className="bg-white text-green-900 hover:bg-gray-100 px-2 py-2 rounded-full">
          <FaPhotoVideo className="text-xl" />
        </button>
        <button className="bg-white text-green-900 hover:bg-gray-100 px-2 py-2 rounded-full">
          <FaVideo className="text-xl" />
        </button>
        <button
          className="bg-green-900 text-white px-4 py-2 rounded-full ml-4"
          onClick={handleCreatePost}
        >
          Create Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
