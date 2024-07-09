import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8042/' }),
  endpoints: (builder) => ({
    // User endpoints

    getUser: builder.query({
      query: (id) => ({
        url: `user/${id}`,
        method: 'GET',
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: 'api/users/login',
        body: data,
        method: 'POST',
      }),
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: 'api/users/signUp',
        body: data,
        method: 'POST',
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: 'login',
        body: data,
        method: 'POST',
      }),
    }),

    // Posts
    addPost: builder.mutation({
      query: (data) => ({
        url: 'api/posts/',
        body: data,
        method: 'POST',
      }),
    }),
    getPosts: builder.mutation({
      query: () => ({
        url: 'api/posts/',
        method: 'GET',
      }),
    }),
    getPost: builder.mutation({
      query: (id) => ({
        url: `api/posts/${id}`,
        method: 'GET',
      }),
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `api/posts/${data._id}`,
        body: data,
        method: 'PATCH',
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `api/posts/${id}`,
        method: 'DELETE',
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `api/posts/${id}/like`,
        method: 'PATCH',
      }),
    }),
    addComment: builder.mutation({
      query: (data) => ({
        url: `api/posts/${data.postId}/comments`,
        body: data.comment,
        method: 'POST',
      }),
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `api/posts/${data.postId}/comments/${data.commentId}`,
        body: data.comment,
        method: 'PATCH',
      }),
    }),
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `api/posts/${data.postId}/comments/${data.commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

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
} = apiSlice
