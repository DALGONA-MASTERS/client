// Generic response handler

import { useEffect } from "react";
import { logout, setToken, setUser } from "../features/auth/authSlice";
import { AppDispatch } from "../app/store";

export const handleResponse = (result: any, dispatch: AppDispatch, navigate: Function, route: string) => {

    if (result.status === "fulfilled") {
        const { token, ...userWithoutToken } = result.data;

        console.log("Request successful");
        dispatch(setUser({ ...userWithoutToken.user }));
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

export const handleFetchedData = (result: any, dispatch: AppDispatch, setState: Function) => {

    if (result.status === "fulfilled") {

        dispatch(setState(result.data))


        console.log("Request successful");

    } else if (result.status === "rejected") {
        console.log("Request failed");
        // handle
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};

export const handleAddData = (result: any, dispatch: AppDispatch, addState: Function) => {
    console.log('1')
    if (result.status === "fulfilled") {
        console.log(result.data)
        dispatch(addState(result.data))


        console.log("Request successful");

    } else if (result.status === "rejected") {
        console.log("Request failed");
        // handle
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};
export const handleEditData = (result: any, dispatch: AppDispatch, editState: Function) => {

    if (result.status === "fulfilled") {

        dispatch(editState(result.data))


        console.log("Request successful");

    } else if (result.status === "rejected") {
        console.log("Request failed");
        // handle
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};
export const handleDeleteData = (result: any, dispatch: AppDispatch, deleteState: Function) => {

    if (result.status === "fulfilled") {

        dispatch(deleteState(result.data._id))


        console.log("Request successful");

    } else if (result.status === "rejected") {
        console.log("Request failed");
        // handle
    } else if (result.status === "pending") {
        console.log("Pending...");
    }
};