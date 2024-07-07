import React from "react";
import FacebookLogin from "react-facebook-login";

const FacebookLoginButton: React.FC = () => {
  const handleResponse = (response: any) => {
    console.log("Facebook login response:", response);
    // Handle login success (e.g., send the token to your backend for verification)
  };

  return (
    <FacebookLogin
      appId="YOUR_FACEBOOK_APP_ID"
      autoLoad={false}
      fields="name,email,picture"
      callback={handleResponse}
      icon="fa-facebook"
    />
  );
};

export default FacebookLoginButton;
