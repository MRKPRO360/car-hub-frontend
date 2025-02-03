import { IQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const selfApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/orders/my-orders',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['userOrders'],
    }),

    changeMyPassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/change-password',
          method: 'POST',
          body: data,
        };
      },
    }),

    deleteMyOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['userOrders'],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useChangeMyPasswordMutation,
  useDeleteMyOrdersMutation,
} = selfApi;
