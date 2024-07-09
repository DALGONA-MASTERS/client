import { createSlice } from '@reduxjs/toolkit'

// Define your User type if you have one, otherwise omit this
// import { User } from '../../types/User';

// Initial state
const initialState = {
  token: null,
  user: null,
}

// Create auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(action.payload)
      state.token = action.payload
      document.cookie = `jwt=${action.payload}; path=/; samesite=strict; secure`
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.token = null
      state.user = null
    },
  },
})

// Export actions
export const { setToken, setUser, logout } = authSlice.actions

// Selectors
export const selectUser = (state) => state.auth.user
export const selectToken = (state) => state.auth.token

// Export reducer
export default authSlice.reducer
