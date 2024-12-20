export const baseQueryUrl =
  process.env.NEXT_PUBLIC_API_URL || 'https://jsonplaceholder.typicode.com';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
  baseUrl: baseQueryUrl,
  prepareHeaders: (headers) => {
    return headers;
  },
});
