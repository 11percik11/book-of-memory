import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HeroEndpoints } from './HeroEndpoints';

export const heroApi = createApi({
  reducerPath: 'heroApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://book-memory-new.itlabs.top/api' }),
  endpoints: HeroEndpoints,
});

export const { 
    useGetPersonalDataAcceptQuery,
} = heroApi;