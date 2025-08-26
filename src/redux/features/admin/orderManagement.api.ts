import { IQueryParam } from '../../../types';
import { baseApi } from '../../api/baseApi';

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/orders',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['orders'],
    }),

    getAnOrder: builder.query({
      query: (id) => {
        return {
          url: `/orders/${id}`,
          method: 'GET',
        };
      },
    }),
    getAllOrdersAndCustomers: builder.query({
      query: () => {
        return {
          url: '/orders/customers',
          method: 'GET',
        };
      },
    }),
    getMonthlySales: builder.query({
      query: () => {
        return {
          url: '/orders/monthly-sales',
          method: 'GET',
        };
      },
    }),
    getMonthlyTarget: builder.query({
      query: () => {
        return {
          url: '/orders/monthly-target',
          method: 'GET',
        };
      },
    }),
    createOrder: builder.mutation({
      query: (data) => {
        return {
          url: '/orders/',
          method: 'POST',
          body: data,
        };
      },
    }),

    deleteAnOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['orders'],
    }),
    updateAnOderStatus: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['orders'],
    }),

    verifyOrder: builder.query({
      query: (order_id) => ({
        url: '/orders/verify-order',
        params: { order_id },
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetAllOrdersAndCustomersQuery,
  useGetMonthlySalesQuery,
  useGetMonthlyTargetQuery,
  useCreateOrderMutation,
  useGetAnOrderQuery,
  useDeleteAnOrderMutation,
  useUpdateAnOderStatusMutation,
  useVerifyOrderQuery,
} = ordersApi;
