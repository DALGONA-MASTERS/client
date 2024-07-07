// Generic response handler

import { useEffect } from "react";
import { logout, setUser } from "../features/auth/authSlice";
import { redirect } from "react-router-dom";
import { AppDispatch } from "../app/store";

export const handleResponse = (result: any, dispatch: AppDispatch) => {

    if (result.status === "fulfilled") {
        console.log("Request successful");
        dispatch(setUser(result.data));
        redirect("/home");
    } else if (result.status === "rejected") {
        console.log("Request failed");
        dispatch(logout());
        redirect("/");
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};