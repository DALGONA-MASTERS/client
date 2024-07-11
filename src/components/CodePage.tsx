import React, { useEffect, useState } from "react";
import { useSendA2FMutation } from "../features/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { setToken } from "../features/auth/authSlice";
import { handleResponse } from "../utilities/apiUtils";

function CodePage() {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { email } = useParams<{ email: string }>();
  const [code, setCode] = useState("");
  const [sendA2F, sendA2FResult] = useSendA2FMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendA2F({ email: email!, code }).unwrap();

      alert("Code sent successfully!");
    } catch (error) {
      alert("Failed to send code.");
    }
  };
  const { isError, isLoading, isSuccess } = sendA2FResult;
  useEffect(() => {
    handleResponse(sendA2FResult, dispatch, navigate, "/home");
  }, [sendA2FResult]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="code"
          >
            Enter 6-digit Code
          </label>
          <input
            type="text"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="******"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "Sending..." : "Send Code"}
          </button>
        </div>
        {isSuccess && (
          <p className="text-green-500 mt-2">Code sent successfully!</p>
        )}
        {isError && (
          <p className="text-red-500 mt-2">
            Failed to send code. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}

export default CodePage;
