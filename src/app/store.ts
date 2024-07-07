// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
    reducer: {
        // Add the API slice reducer to the store
        [apiSlice.reducerPath]: apiSlice.reducer,
        // Add other reducers here
        auth: authReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// See https://redux-toolkit.js.org/rtk-query/api/setupListeners for more details
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
