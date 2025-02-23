// src/features/auth/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { RootState } from '../../app/store';

interface AuthState {
    token: string | null;
    user: User | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            console.log(action.payload)
            state.token = action.payload;
            document.cookie = `jwt=${action.payload}; path=/; samesite=strict; secure`;

        },
        setUser: (state, action: PayloadAction<User | undefined>) => {
            state.user = action.payload!;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;
