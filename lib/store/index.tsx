'use client';
// src/lib/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { reduxAPI } from './api/root';
import rootReducer from './reducers'; // If you have other reducers
import userReducer from './userSlice'; // Import the user reducer

// Combine reducers here
const combinedReducers = {
  ...rootReducer,  // Include your other reducers if needed
  user: userReducer,  // Add user reducer
};

export const makeStore = () =>
  configureStore({
    reducer: combinedReducers,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reduxAPI.middleware),
  });

export const store = makeStore();

setupListeners(store.dispatch);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();
