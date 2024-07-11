// src/features/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, UserCred } from '../../types/User';
import { CommentBodyEdit, CommentUi, Post, PostData, UpdatePostData } from '../../types/Post'
import { selectToken } from '../auth/authSlice';
import { RootState } from '../../app/store';
import { EventData, EventType, UpdateEventData } from '../../types/Event';
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

        getUser: builder.mutation<User, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET'
            })
        }),
        getUserData: builder.mutation<User, string>({
            query: (id) => ({
                url: `users/${id}`,
                method: 'GET'
            })
        }),

        updateUser: builder.mutation<User, FormData>({
            query: (formData) => {
                console.log("FormDD", formData, "IDD", formData.get('profilePic'))

                return {
                    url: `users/${formData.get('_id')}`, // Use the `_id` from `FormData`
                    body: formData,
                    method: 'PATCH',
                }
            },
        }),
        loginUser: builder.mutation<User, UserCred>({
            query: (data) => ({
                url: "users/login",
                body: data,
                method: 'POST'
            })
        }),
        registerUser: builder.mutation<User, UserCred>({
            query: (data) => ({
                url: "users/signUp",
                body: data,
                method: 'POST'
            })
        }),
        googleAuth: builder.mutation<User, { token: string }>({
            query: (data) => ({
                url: "users/google-login",
                body: data,
                method: 'POST'
            })
        }),

        sendA2F: builder.mutation<User, { email: string, code: string }>({
            query: (data) => ({
                url: "users/verify-code",
                body: data,
                method: 'POST'
            })
        }),




        //Posts
        addPost: builder.mutation<Post, FormData>({
            query: (data) => {

                console.log(data)

                return {
                    url: "posts/",
                    body: data,
                    method: 'POST'
                }
            }
        }),
        getPosts: builder.mutation<Post, void>({
            query: () => ({
                url: "posts/",
                method: 'GET'
            })
        }),
        getPost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'GET'
            })
        }),
        updatePost: builder.mutation<Post, UpdatePostData>({
            query: (data) => ({
                url: `posts/${data._id}`,
                body: data,
                method: 'PATCH'
            })
        }),
        deletePost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `posts/${id}`,
                method: 'DELETE'
            })
        }),
        likePost: builder.mutation<Post, string>({
            query: (id) => ({
                url: `posts/${id}/like`,
                method: 'PATCH'
            })
        }),
        addComment: builder.mutation<Post, { postId: string, comment: string }>({
            query: ({ postId, ...data }) => ({
                url: `posts/${postId}/comments`,
                body: { ...data },
                method: 'POST'
            })
        }),
        updateComment: builder.mutation<Post, CommentBodyEdit>({
            query: (data) => ({
                url: `posts/${data.postId}/comments/${data._id}`,
                body: { comment: data.comment },
                method: 'PATCH'
            })
        }),
        deleteComment: builder.mutation<Post, { postId: string, commentId: string }>({
            query: (data) => ({
                url: `posts/${data.postId}/comments/${data.commentId}`,
                method: 'DELETE'
            })
        }),


        // Events
        createEvent: builder.mutation<Event, { title: string, startDate: string }>({
            query: (data) => ({
                url: 'events/',
                body: data,
                method: 'POST',
            }),
        }),
        getAllEvents: builder.mutation<EventType[], void>({
            query: () => ({
                url: 'events/',
                method: 'GET',
            }),
        }),
        getGetEvent: builder.mutation<EventType, string>({
            query: (id) => ({
                url: `events/${id}`,
                method: 'GET',
            }),
        }),
        joinEvent: builder.mutation<void, { eventId: string }>({
            query: ({ eventId }) => ({
                url: `events/${eventId}/join`,
                method: 'PUT',
            }),
        }),
        leaveEvent: builder.mutation<void, { eventId: string }>({
            query: ({ eventId }) => ({
                url: `events/${eventId}/leave`,
                method: 'PUT',
            }),
        }),
        updateEvent: builder.mutation<Event, UpdateEventData>({
            query: (data) => ({
                url: `events/${data._id}`,
                body: data,
                method: 'PATCH',
            }),
        }),
        deleteEvent: builder.mutation<void, { eventId: string }>({
            query: ({ eventId }) => ({
                url: `events/${eventId}`,
                method: 'DELETE',
            }),
        }),
        excludeParticipant: builder.mutation<void, { eventId: string; userId: string }>({
            query: ({ eventId, userId }) => ({
                url: `events/${eventId}/exclude`,
                body: { userId },
                method: 'POST',
            }),
        }),
        getEventsByUser: builder.mutation<Event[], void>({
            query: () => ({
                url: 'events/user',
                method: 'GET',
            }),
        }),
        unblockParticipant: builder.mutation<void, { eventId: string; userId: string }>({
            query: ({ eventId, userId }) => ({
                url: `events/${eventId}/unblock`,
                body: { userId },
                method: 'PUT',
            }),
        }),



        //Contributions
        addContribution: builder.mutation<void, { eventId: string; value: number }>({
            query: (data) => ({
                url: `contributions/`,
                body: data,
                method: 'POST',
            }),
        }),
        editContribution: builder.mutation<void, { contributionId: string; value: number }>({
            query: (data) => ({
                url: `contributions/${data.contributionId}`,
                body: data,
                method: 'PATCH',
            }),
        }),
        validateContribution: builder.mutation<void, { contributionId: string; value: number }>({
            query: (data) => ({
                url: `contributions/validate/${data.contributionId}`,
                body: data,
                method: 'POST',
            }),
        }),
        getUsersContribution: builder.mutation<void, void>({
            query: (data) => ({
                url: `contributions/user`,
                method: 'GET',
            }),
        }),
        getAllContribution: builder.mutation<void, void>({
            query: (data) => ({
                url: `contributions/`,
                method: 'GET',
            }),
        }),
        getStats: builder.mutation<any, void>({
            query: () => ({
                url: `stats/`,
                method: 'GET',
            }),
        }),












    }),
});

export const {
    useGetUserMutation,
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
    useCreateEventMutation,
    useDeleteEventMutation,
    useExcludeParticipantMutation,
    useGetAllEventsMutation,
    useGetEventsByUserMutation,
    useJoinEventMutation,
    useLeaveEventMutation,
    useUnblockParticipantMutation,
    useUpdateEventMutation,
    useUpdateUserMutation,
    useGetUserDataMutation,
    useSendA2FMutation,
    useGetGetEventMutation,
    useAddContributionMutation,
    useEditContributionMutation,
    useGetAllContributionMutation,
    useGetUsersContributionMutation,
    useGetStatsMutation,
    useValidateContributionMutation,



} = apiSlice;