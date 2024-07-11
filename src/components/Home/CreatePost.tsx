import React, { useEffect, useState } from "react";
import { FaImage, FaVideo } from "react-icons/fa";
import {
  useAddPostMutation,
  useGetUserDataMutation,
} from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/auth/authSlice";
import { handleAddData } from "../../utilities/apiUtils";
import { AppDispatch } from "../../app/store";
import { addPostData } from "../../features/posts/postsSice";

function CreatePost() {
  const user = useSelector(selectUser);

  const [userData, setUserData] = useState<any | null>(null);
  const [getUserData, getUserDataResult] = useGetUserDataMutation();
  useEffect(() => {
    if (user?._id) {
      getUserData(user?._id);
    }
  }, [user?._id, getUserData]);
  useEffect(() => {
    if (getUserDataResult.isSuccess && getUserDataResult.data) {
      setUserData(getUserDataResult.data);
    } else if (getUserDataResult.isError) {
      console.error("Error fetching user", getUserDataResult.error);
    }
  }, [getUserDataResult]);

  const dispatch = useDispatch<AppDispatch>();
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null); // State to hold the selected image file
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

    const formData = new FormData();

    formData.append("author", user!._id);
    formData.append("content", content);
    if (image) {
      formData.append("picture", image);
    }

    try {
      console.log("Sending post:", formData); // Log the data being sent
      await addPost(formData).unwrap();
      setContent(""); // Clear the input field after successful post creation
      setImage(null); // Clear the selected image
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  // Handler
  useEffect(() => {
    handleAddData(addPostResult, dispatch, addPostData);
  }, [addPostResult]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <div className="h-44 w-[80%] custom-border-style rounded-3xl flex p-4 mt-2 flex-col justify-between">
      <div className="flex flex-row items-center space-x-2">
        <div className="w-auto flex items-center">
          <img
            src={userData?.profilePic || "https://via.placeholder.com/100"}
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
            className="w-full px-2 py-1 border rounded-2xl focus:outline-none focus:ring focus:border-green-300"
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center space-y-2">
        <label
          htmlFor="imageInput"
          className="bg-white text-green-900 hover:bg-gray-100 px-2 py-2 rounded-full cursor-pointer"
        >
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <FaImage className="text-xl" />
        </label>
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
