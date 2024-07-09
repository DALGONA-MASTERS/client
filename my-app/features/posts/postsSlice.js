import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload
    },
    addPostData(state, action) {
      state.posts.push(action.payload)
    },
    editPostData(state, action) {
      const index = state.posts.findIndex(
        (post) => post._id === action.payload._id
      )
      if (index !== -1) {
        state.posts[index] = action.payload
      }
    },
  },
})

export const { setPosts, addPostData, editPostData } = postsSlice.actions
export const selectPosts = (state) => state.posts

export default postsSlice.reducer
