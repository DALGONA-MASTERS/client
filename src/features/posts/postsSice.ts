
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../../types/Post'; // Import your Post type from where it's defined
import { RootState } from '@reduxjs/toolkit/query';

interface PostsState {
    posts: Post[];

}

const initialState: PostsState = {
    posts: [],

};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {

        setPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload;

        },
        addPostData(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload);

        },
        editPostData(state, action: PayloadAction<Post>) {
            const index = state.posts.findIndex(post => post._id === action.payload._id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        }

    },
});

export const { setPosts, addPostData, editPostData } = postsSlice.actions;
export const selectPosts = (state: any) => state.posts.posts;

export default postsSlice.reducer;