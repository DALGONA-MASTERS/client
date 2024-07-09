import React, { useEffect, useState } from "react";

import Form from "./Form";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Authentication: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("here");
    dispatch(logout());
  }, []);
  const [loginPage, setLoginPage] = useState(true);

  const toggleForm = () => {
    setLoginPage(!loginPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Form loginPage={loginPage} toggleForm={toggleForm} />
    </div>
  );
};

export default Authentication;
