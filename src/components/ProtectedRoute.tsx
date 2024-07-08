import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { selectToken } from "../features/auth/authSlice";

const ProtectedRoute: React.FC<{ element: React.ReactElement }> = ({
  element,
}) => {
  const navigate = useNavigate();
  const token = useSelector(selectToken);

  useEffect(() => {
    console.log(token);
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return token ? element : null;
};

export default ProtectedRoute;
