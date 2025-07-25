import { ICar, IQueryParam, IResponseRedux, TResponse } from '../../../types';
import { baseApi } from '../../api/baseApi';

const carsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/cars',
          method: 'GET',
          params: params,
        };
      },
      providesTags: ['cars'],
      transformResponse: (response: IResponseRedux<ICar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getACar: builder.query<TResponse<ICar>, string>({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: 'GET',
        };
      },
      providesTags: (_result, _error, id) => [{ type: 'cars', id }],
    }),
    addCar: builder.mutation({
      query: (data) => ({
        url: '/cars',
        method: 'POST',
        body: data,
      }),
    }),
    deleteACar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cars'],
    }),
    updateCar: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/cars/${id}`,
          method: 'PATCH',
          body: data, // ✅ Send formData directly
        };
      },
      invalidatesTags: (_result, _error, { id }) => [{ type: 'cars', id }],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useGetACarQuery,
  useAddCarMutation,
  useDeleteACarMutation,
  useUpdateCarMutation,
} = carsApi;
