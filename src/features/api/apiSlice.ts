// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCred } from '../../types/User';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8042/' }),
    endpoints: (builder) => ({

        //User endpoints

        getUser: builder.query<User, UserCred>({
            query: (id) => ({
                url: `user/${id}`,
                method: 'GET'
            })
        }),
        loginUser: builder.mutation<User, UserCred>({
            query: (data) => ({
                url: "api/users/login",
                body: data,
                method: 'POST'
            })
        }),
        registerUser: builder.mutation<User, UserCred>({
            query: (data) => ({
                url: "api/users/signUp",
                body: data,
                method: 'POST'
            })
        }),
        googleAuth: builder.mutation<User, { token: string }>({
            query: (data) => ({
                url: "login",
                body: data,
                method: 'POST'
            })
        }),


    }),
});

export const { useGetUserQuery, useLoginUserMutation, useGoogleAuthMutation, useRegisterUserMutation } = apiSlice;
