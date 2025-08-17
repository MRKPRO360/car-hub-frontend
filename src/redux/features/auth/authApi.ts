import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    googleLogin: builder.mutation({
      query: (token) => ({
        url: '/auth/google-login',
        method: 'POST',
        body: { token },
      }),
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
    signup: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGoogleLoginMutation } =
  authApi;
