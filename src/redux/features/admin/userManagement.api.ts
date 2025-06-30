import { IQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/users',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['users'],
    }),
    getAUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'GET',
        };
      },
    }),
    getMe: builder.query({
      query: () => {
        return {
          url: '/users/me',
          method: 'GET',
        };
      },
    }),

    deleteAUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['users'],
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['users'],
    }),
    deactivateUser: builder.mutation({
      query: (id) => ({
        url: `/users/deactivate-user/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
    }),
    activateUser: builder.mutation({
      query: (id) => ({
        url: `/users/activate-user/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAUserQuery,
  useDeleteAUserMutation,
  useUpdateUserMutation,
  useDeactivateUserMutation,
  useActivateUserMutation,
  useGetMeQuery,
} = usersApi;
