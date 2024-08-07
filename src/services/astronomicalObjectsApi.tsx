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
        const params = new URLSearchParams({
          pageNumber: (page - 1).toString(),
          pageSize: pageSize.toString(),
          ...(astronomicalObjectType && { astronomicalObjectType }),
          ...(locationUid && { locationUid }),
        });

        if (name) {
          params.append('name', name);
        }

        return {
          url: 'astronomicalObject/search',
          method: name ? 'POST' : 'GET',
          ...(name
            ? {
                body: params.toString(),
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
              }
            : { params }),
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
