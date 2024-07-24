import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AstronomicalObjectV2BaseResponse,
  AstronomicalObjectV2FullResponse,
} from '../types';

export const astronomicalObjectsApi = createApi({
  reducerPath: 'astronomicalObjectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v2/rest/' }),
  endpoints: (builder) => ({
    getAstronomicalObjects: builder.query<
      AstronomicalObjectV2BaseResponse,
      {
        name?: string;
        page: number;
        astronomicalObjectType?: string;
        locationUid?: string;
      }
    >({
      query: ({ name, page, astronomicalObjectType, locationUid }) => ({
        url: 'astronomicalObject/search',
        method: name ? 'POST' : 'GET',
        params: name
          ? undefined
          : {
              pageNumber: (page - 1).toString(),
              pageSize: '10',
            },
        body: name
          ? new URLSearchParams({
              name,
              pageNumber: (page - 1).toString(),
              pageSize: '10',
              ...(astronomicalObjectType && { astronomicalObjectType }),
              ...(locationUid && { locationUid }),
            })
          : undefined,
      }),
    }),
    getAstronomicalObjectById: builder.query<
      AstronomicalObjectV2FullResponse,
      string
    >({
      query: (id) => `astronomicalObject?uid=${id}`,
    }),
  }),
});

export const {
  useGetAstronomicalObjectsQuery,
  useGetAstronomicalObjectByIdQuery,
} = astronomicalObjectsApi;
