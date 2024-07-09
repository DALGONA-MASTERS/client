// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCred } from '../../types/User';
import { CommentBodyEdit, CommentUi, Post, PostData, UpdatePostData } from '../../types/Post'
import { selectToken } from '../auth/authSlice';
import { RootState } from '../../app/store';
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8042/',
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState; // Explicitly type the getState function

            const token = selectToken(state); // Get the token from the Redux store
            console.log(token);
            if (token) {
                headers.set('jwt', token);
            }
            return headers;
        },
        credentials: 'include'


    }),

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
        getPosts: builder.mutation<Post, void>({
            query: () => ({
                url: "api/posts/",
                method: 'GET'
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
            query: ({ postId, ...data }) => ({
                url: `api/posts/${postId}/comments`,
                body: { ...data },
                method: 'POST'
            })
        }),
        updateComment: builder.mutation<Post, CommentBodyEdit>({
            query: (data) => ({
                url: `api/posts/${data.postId}/comments/${data._id}`,
                body: { comment: data.comment },
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

export const {
    useGetUserQuery,
    useLoginUserMutation,
    useGoogleAuthMutation,
    useRegisterUserMutation,
    useAddPostMutation,
    useGetPostsMutation,
    useGetPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
} = apiSlice;