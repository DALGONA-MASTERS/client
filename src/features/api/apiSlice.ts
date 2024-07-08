// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCred } from '../../types/User';
import { Post, PostData, UpdatePostData } from '../../types/Post'
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



        //Posts
        addPost: builder.mutation<Post, PostData>({
            query: (data) => ({
                url: "api/posts/",
                body: data,
                method: 'POST'
            })
        }),
        getPosts: builder.mutation<Post, any>({
            query: () => ({
                url: "api/posts/",
                method: 'Get'
            })
        }),
        getPost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: 'GET'
            })
        }),
        updatePost: builder.mutation<Post, UpdatePostData>({
            query: (data) => ({
                url: `api/posts/${data._id}`,
                body: data,
                method: 'PATCH'
            })
        }),
        deletePost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `api/posts/${id}`,
                method: 'DELETE'
            })
        }),
        likePost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `api/posts/${id}/like`,
                method: 'PATCH'
            })
        }),
        addComment: builder.mutation<Post, { postId: string, comment: string }>({
            query: (data) => ({
                url: `api/posts/${data.postId}/comments`,
                body: data.comment,
                method: 'POST'
            })
        }),
        updateComment: builder.mutation<Post, { postId: string, commentId: string, comment: string }>({
            query: (data) => ({
                url: `api/posts/${data.postId}/comments/${data.commentId}`,
                body: data.comment,
                method: 'PATCH'
            })
        }),
        deleteComment: builder.mutation<Post, { postId: string, commentId: string }>({
            query: (data) => ({
                url: `api/posts/${data.postId}/comments/${data.commentId}`,
                method: 'DELETE'
            })
        }),






    }),
});

export const { useGetUserQuery, useLoginUserMutation, useGoogleAuthMutation, useRegisterUserMutation } = apiSlice;
