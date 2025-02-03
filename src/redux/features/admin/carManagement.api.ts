import { ICar, IQueryParam, IResponseRedux } from '../../../types';
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
    getACar: builder.query({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: 'GET',
        };
      },
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
      query: (args) => ({
        url: `/cars/${args.id}`,
        method: 'PATCH',
        body: args.data,
      }),
      invalidatesTags: ['cars'],
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
