import React, { useEffect, useState } from "react";
import { useGetUsersMutation } from "../../features/api/apiSlice";
import { User } from "../../types/User";
import { useNavigate } from "react-router-dom";

function Discussion() {
  const [getUsers, getUsersResult] = useGetUsersMutation();
  const [users, setUsers] = useState<User[]>();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    if (getUsersResult.status === "fulfilled") {
      setUsers(getUsersResult.data);
    } else if (getUsersResult.status === "rejected") {
      console.error(getUsersResult.error);
    } else {
      console.log("Loading...");
    }
  }, [getUsersResult]);

  return (
    <div className="home-container flex flex-col items-center h-full overflow-y-auto custom-scrollbar mt-[130px]">
      <div className="flex flex-col items-center justify-center w-[300px] mt-[100px]">
        <h1 className="text-4xl font-bold">Welcome to the Discussion!</h1>
        <p className="mt-10 text-gray-600">
          Here, you can connect with other users, share your thoughts, and
          discuss any topics of interest.
        </p>
      </div>
      {users && (
        <div className="flex flex-col w-[300px] mt-10">
          <h2 className="text-2xl font-bold">Recent Users</h2>
          <ul className="mt-5">
            {users.map((user) => (
              <li
                key={user._id}
                className="flex items-center gap-4 cursor-pointer"
                onClick={() => navigate(`/discussion/${user._id}`)}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={user.profilePic}
                  alt={user.username}
                />
                <span>{user.username}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Discussion;
