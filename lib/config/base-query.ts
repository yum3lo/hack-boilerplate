export const baseQueryUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});
