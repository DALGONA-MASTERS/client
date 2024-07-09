import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { apiSlice } from '../features/api/apiSlice'
import authReducer from '../features/auth/authSlice'

const userPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'token'],
}

const persistedReducer = persistReducer(userPersistConfig, authReducer)

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: persistedReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export const persistor = persistStore(store) // persistor can be used to persist store locally
