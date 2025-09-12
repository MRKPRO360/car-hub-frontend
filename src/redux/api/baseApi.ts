import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { toast } from 'sonner';
import { IError } from '../../types';
import { logout, setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  // baseUrl: import.meta.env.VITE_API_LOCAL_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('Authorization', token);
    }
    return headers;
  },
});

const baseQueryWihRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error((result.error as IError).data.message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error as IError).data.message);
  }
  if (result?.error?.status === 401) {
    // SENDING REFESH TOKEN
    console.log('SENDING REFRESH TOKEN');

    const refreshResult = await baseQuery(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    const data = refreshResult.data as any;

    if (data?.data?.token) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.token,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWihRefreshToken,
  endpoints: () => ({}),
  tagTypes: ['orders', 'cars', 'users', 'userOrders', 'profile'],
});
