'use client';
import {
  Api,
  BaseQueryFn,
  coreModuleName,
  createApi,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  reactHooksModuleName,
} from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { baseQuery } from '@/lib/config/base-query';

const TAG_TYPES = <const>['GET_ME', 'GET_TODOS', 'AUTH', 'FILE'];

export type TagType = (typeof TAG_TYPES)[number];

export type ReduxBuilder = EndpointBuilder<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  TagType,
  'api'
>;

export type ReduxApi = Api<
  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
  {},
  'api',
  TagType,
  typeof coreModuleName | typeof reactHooksModuleName
>;

export const reduxAPI = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: TAG_TYPES,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return (
        action.payload as {
          api: any;
        }
      )[reducerPath];
    }
  },
  endpoints: (builder) => ({
    // Just an example
    getMe: builder.query<unknown, null>({
      query() {
        return {
          url: 'auth/user',
        };
      },
      providesTags: ['GET_ME'],
    }),
  }),
});

export const APIMiddleware = reduxAPI.middleware;

export const { useGetMeQuery, useLazyGetMeQuery } = reduxAPI;
