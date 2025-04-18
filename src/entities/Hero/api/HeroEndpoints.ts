import { EndpointBuilder, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { PersonalDataAccept } from '../model/types';
// import { Hero  } from '../model/types';

export const HeroEndpoints = (
  builder: EndpointBuilder<ReturnType<typeof fetchBaseQuery>, never, 'HeroApi'>
) => ({
    getPersonalDataAccept: builder.query<PersonalDataAccept, void > ({
        query: () => '/personal_data_accepts',
    })
});