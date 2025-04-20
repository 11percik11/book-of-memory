// import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { PersonalDataAccept, MilitaryRanks, heroAwardAll } from '../model/types';
// import { Hero  } from '../model/types';

export const HeroEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'heroApi'>
) => ({
    getPersonalDataAccept: builder.query<PersonalDataAccept, void > ({
      query: () => '/personal_data_accepts',
    }),
    getMilitaryRanks: builder.query<MilitaryRanks[], {category: string} > ({
      query: ({category}) => {
        if (!category) {
          return '/military_ranks';
        }
        return `/military_ranks?category=${encodeURIComponent(category)}`},
    }),
    getHeroAward: builder.query<heroAwardAll[], {category: string} > ({
      query: ({category}) => {
        if (!category) {
          return '/hero_awards';
        }
        return `/hero_awards?category=${encodeURIComponent(category)}`},
    }),
});