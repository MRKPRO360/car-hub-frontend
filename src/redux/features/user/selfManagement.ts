import { IQueryParam } from '../../../types';
import { setUser } from '../auth/authSlice';
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

    getMe: builder.query({
      query: () => {
        return {
          url: '/users/me',
          method: 'GET',
        };
      },
      providesTags: ['profile'],
    }),
    updateMe: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: updateResult } = await queryFulfilled;
          const userPayload = updateResult?.data;

          if (userPayload?.user) {
            // If a new token is returned, update the auth slice first.
            if (userPayload.token) {
              dispatch(
                setUser({ user: userPayload.user, token: userPayload.token })
              );
            }

            // Update the 'getMe' query cache with the new user data.
            // This avoids a refetch and the race condition.
            dispatch(
              selfApi.util.updateQueryData('getMe', undefined, (draft) => {
                // The 'draft' is the cached response from 'getMe'.
                // The error indicates the user object is at `draft.data`, not `draft.data.user`.
                if (draft.data) {
                  Object.assign(draft.data, userPayload.user);
                }
              })
            );
          }
        } catch (err) {
          console.log(err);

          // The query was rejected, no cache update needed.
        }
      },
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useChangeMyPasswordMutation,
  useDeleteMyOrdersMutation,
  useGetMeQuery,
  useUpdateMeMutation,
} = selfApi;
