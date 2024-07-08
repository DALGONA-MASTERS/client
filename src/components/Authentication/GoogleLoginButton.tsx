import React, { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { redirect, useNavigate } from "react-router-dom";
import { handleResponse } from "../../utilities/apiUtils";
import { useGoogleAuthMutation } from "../../features/api/apiSlice";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/auth/authSlice";

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const [googleAuth, googleAuthResult] = useGoogleAuthMutation();

  const handleSuccess = async (response: any) => {
    console.log("Google login success:", response);

    try {
      await googleAuth({ token: response.accessToken }).unwrap();
      redirect("/home");
    } catch (error) {
      console.error("Error authenticating with Google:", error);
    }
  };

  useEffect(() => {
    handleResponse(googleAuthResult, dispatch, navigate, "/home");
  }, [googleAuthResult, dispatch]);

  const handleFailure = () => {
    console.error("Google login failure");
    redirect("/");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default GoogleLoginButton;
