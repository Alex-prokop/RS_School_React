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
        pageSize: number;
        astronomicalObjectType?: string;
        locationUid?: string;
      }
    >({
      query: ({
        name,
        page,
        pageSize,
        astronomicalObjectType,
        locationUid,
      }) => {
        console.log('Запрос параметров:', {
          name,
          pageNumber: (page - 1).toString(),
          pageSize: pageSize.toString(),
          astronomicalObjectType,
          locationUid,
        });
        return {
          url: 'astronomicalObject/search',
          method: name ? 'POST' : 'GET', // Используем GET для пагинации и POST для поиска
          params: name
            ? undefined
            : {
                pageNumber: (page - 1).toString(),
                pageSize: pageSize.toString(),
                ...(astronomicalObjectType && { astronomicalObjectType }),
                ...(locationUid && { locationUid }),
              },
          body: name
            ? new URLSearchParams({
                name,
                pageNumber: (page - 1).toString(),
                pageSize: pageSize.toString(),
                ...(astronomicalObjectType && { astronomicalObjectType }),
                ...(locationUid && { locationUid }),
              })
            : undefined,
        };
      },
    }),
    getAstronomicalObjectById: builder.query<
      AstronomicalObjectV2FullResponse,
      string
    >({
      query: (uid) => ({
        url: 'astronomicalObject',
        method: 'GET',
        params: { uid },
      }),
    }),
  }),
});

export const {
  useGetAstronomicalObjectsQuery,
  useGetAstronomicalObjectByIdQuery,
} = astronomicalObjectsApi;
