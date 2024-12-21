import { reduxAPI } from '@/lib/store/api/root';
import { LoginPayload, LoginResponse } from '@/app/login/types';

export const authApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query(body) {
        return {
          url: `auth/login`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AUTH'],
    }),
    logout: builder.mutation<void, void>({
      query() {
        return {
          url: `auth/logout`,
          method: 'POST',
        };
      },
      invalidatesTags: ['AUTH'],
    }),
    getCurrentUser: builder.query<LoginResponse, void>({
      query() {
        return {
          url: `auth/me`,
          method: 'GET',
        };
      },
      providesTags: ['AUTH'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} = authApi;
