import React, { useEffect, useState } from "react";
import { useUpdateUserMutation } from "../../features/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../../features/auth/authSlice";
import { handleEditData } from "../../utilities/apiUtils";
import { AppDispatch } from "../../app/store";

function Profil() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUser)!;

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [updateUser, updateUserResult] = useUpdateUserMutation();

  const handleUpdate = async (e: React.FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    // Log form field values
    console.log("username:", username);
    console.log("password:", password);
    console.log("profilePic:", profilePic);

    const formData = new FormData();
    formData.append("_id", user._id);

    if (username !== user.username) {
      formData.append("username", username);
    }
    if (password) {
      formData.append("password", password);
    }
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    // Convert the FormData entries to an array to log them
    const formDataEntries = Array.from(formData.entries());
    formDataEntries.forEach(([key, value]) => {
      console.log(key, value);
    });

    try {
      console.log("FormData being sent:", formData);
      await updateUser(formData).unwrap();
      setProfilePic(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  useEffect(() => {
    handleEditData(updateUserResult, dispatch, setUser);
  }, [updateUserResult, dispatch]);

  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.profilePic || "https://via.placeholder.com/150"}
          alt="Profile"
          className="h-24 w-24 rounded-full mb-2"
        />
        <label
          htmlFor="profilePicInput"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Upload New Profile Picture
          <input
            id="profilePicInput"
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            className="hidden"
          />
        </label>
      </div>
      <form onSubmit={handleUpdate} className="flex flex-col space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default Profil;
