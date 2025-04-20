import { configureStore } from "@reduxjs/toolkit";
import { heroApi } from "../../entities/Hero/api/heroApi";
import heroReducer from '../../entities/Hero/api/heroSlice';

export const store = configureStore({
    reducer: {
        [heroApi.reducerPath]: heroApi.reducer,
        hero: heroReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(heroApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;