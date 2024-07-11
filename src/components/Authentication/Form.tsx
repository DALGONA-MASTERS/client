import React, { useEffect, useState } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import FacebookLoginButton from "./FacebookLoginButton";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
// Endpoints
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../features/api/apiSlice";
import { UserFormProps, UserFormState } from "../../types/User";
import { redirect, useNavigate } from "react-router-dom";
import { logout, setUser } from "../../features/auth/authSlice";
import { handleResponse } from "../../utilities/apiUtils";

const Form: React.FC<UserFormProps> = ({ loginPage, toggleForm }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [formState, setFormState] = useState<UserFormState>({
    email: "",
    password: "",
    username: "",
  });

  const [loginUser, loginUserResult] = useLoginUserMutation();
  const [registerUser, registerUserResult] = useRegisterUserMutation();

  // //### Handlers
  useEffect(() => {
    handleResponse(loginUserResult, dispatch, navigate, "/home");
  }, [loginUserResult, dispatch]);
  useEffect(() => {
    handleResponse(registerUserResult, dispatch, navigate, "/");
  }, [registerUserResult, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (loginPage) {
        await loginUser({ ...formState }).unwrap();
      } else {
        await registerUser({ ...formState }).unwrap();
      }
    } catch (error) {
      console.error("Failed to authenticate:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        {loginPage ? "Login" : "Register"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!loginPage && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              type="text"
<<<<<<< Updated upstream
              id="name"
              name="name"
              value={formState.name}
=======
              id="username"
              name="username"
              value={formState.username}
>>>>>>> Stashed changes
              onChange={handleChange}
              required={!loginPage}
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          type="submit"
        >
          {loginPage ? "Login" : "Register"}
        </button>
      </form>
      <div className="my-4 flex justify-between">
        <GoogleLoginButton />
      </div>
      <button
        className="w-full mt-4 text-green-600 hover:underline"
        onClick={toggleForm}
      >
        {loginPage ? "Need an account? Register" : "Have an account? Login"}
      </button>
    </div>
  );
};

export default Form;
