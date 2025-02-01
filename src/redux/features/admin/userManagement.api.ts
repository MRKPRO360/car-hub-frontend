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
    }),
    getAUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: 'GET',
        };
      },
    }),

    deleteACar: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: (args) => ({
        url: `/users/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetAUserQuery,
  useDeleteACarMutation,
  useUpdateUserMutation,
} = usersApi;
