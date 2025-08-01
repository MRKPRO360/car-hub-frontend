import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { toast } from 'sonner';
import { IError } from '../../types';
import { logout, setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  // baseUrl: 'http://localhost:5000/api/v1',
  baseUrl: 'https://car-hub-puce-three.vercel.app/api/v1',
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
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
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

    toast.error((result.error as IError).data.message);

    const res = await fetch(
      'https://car-hub-puce-three.vercel.app/api/v1/auth/refresh-token',
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    const data = await res.json();

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
  tagTypes: ['orders', 'cars', 'users', 'userOrders'],
});
