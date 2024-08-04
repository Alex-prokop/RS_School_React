// src/services/astronomicalObjectsApi.tsx
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
        const pageNumberStr = (page - 1)?.toString();
        const pageSizeStr = pageSize?.toString();

        if (!pageNumberStr || !pageSizeStr) {
          throw new Error('Page and PageSize must be defined');
        }

        console.log('Запрос параметров:', {
          name,
          pageNumber: pageNumberStr,
          pageSize: pageSizeStr,
          astronomicalObjectType,
          locationUid,
        });

        return {
          url: 'astronomicalObject/search',
          method: name ? 'POST' : 'GET',
          params: name
            ? undefined
            : {
                pageNumber: pageNumberStr,
                pageSize: pageSizeStr,
                ...(astronomicalObjectType && { astronomicalObjectType }),
                ...(locationUid && { locationUid }),
              },
          body: name
            ? new URLSearchParams({
                name,
                pageNumber: pageNumberStr,
                pageSize: pageSizeStr,
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
      query: (uid) => {
        if (!uid) {
          throw new Error('UID must be defined');
        }
        return {
          url: 'astronomicalObject',
          method: 'GET',
          params: { uid },
        };
      },
    }),
  }),
});

export const {
  useGetAstronomicalObjectsQuery,
  useGetAstronomicalObjectByIdQuery,
} = astronomicalObjectsApi;
1;
