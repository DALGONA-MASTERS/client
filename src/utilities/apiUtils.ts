// Generic response handler

import { useEffect } from "react";
import { logout, setToken, setUser } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

export const handleResponse = (result: any, dispatch: AppDispatch, navigate: Function, route: string) => {

    if (result.status === "fulfilled") {
        const { token, ...userWithoutToken } = result.data;

        console.log("Request successful");
        dispatch(setUser({ ...userWithoutToken }));
        dispatch(setToken(token));
        navigate(route);
    } else if (result.status === "rejected") {
        console.log("Request failed");
        dispatch(logout());
        navigate('/');
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};