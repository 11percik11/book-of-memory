import { configureStore, Middleware } from '@reduxjs/toolkit'
import { heroApi } from '../../entities/Hero/api/heroApi';

export const store = configureStore({
  reducer: {
    [heroApi.reducerPath]: heroApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(heroApi.middleware as Middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;