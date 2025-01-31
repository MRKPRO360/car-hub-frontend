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
      transformResponse: (response: IResponseRedux<ICar[]>) => {
        return {
          data: response.data,
          meta: response.meta,
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
      query: () => ({
        url: '/cars',
        method: 'DELETE',
      }),
    }),
    updateCar: builder.mutation({
      query: (data) => ({
        url: '/cars',
        method: 'PATCH',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useAddCarMutation,
  useDeleteACarMutation,
  useUpdateCarMutation,
} = carsApi;
