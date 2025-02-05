import Button from '../shared/Button';

import { FieldValues, useForm } from 'react-hook-form';
import {
  useGetACarQuery,
  useUpdateCarMutation,
} from '../../redux/features/admin/carManagement.api';
import { toast } from 'sonner';
import { IResponse } from '../../types';
import { useParams } from 'react-router';
import { useEffect } from 'react';

const UpdateCar = () => {
  const { id } = useParams();

  const { data: car } = useGetACarQuery(id);
  const [updateCar] = useUpdateCarMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (car?.data) {
      reset(car.data); // Correct way to update form values
    }
  }, [car, reset]);

  const categoryOptions = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Truck', label: 'Truck' },
    { value: 'Coupe', label: 'Coupe' },
    { value: 'Convertible', label: 'Convertible' },
  ];

  const brandOptions = [
    { value: 'BMW', label: 'BMW' },
    { value: 'Ford', label: 'Ford' },
    { value: 'Audi', label: 'Audi' },
    { value: 'Tesla', label: 'Tesla' },
  ];

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Adding ...');

    // const formData = new FormData();

    // console.log('checking', data?.img);

    const carData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseFloat(data.quantity),
    };

    // const img = data.carImg[0];

    // formData.append('data', JSON.stringify(carData));
    // formData.append('file', img);

    try {
      const res = (await updateCar({ data: carData, id })) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car updated successfully', { id: toastId });
      }
      reset();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="mb-1 inline-block" htmlFor="category">
              Brand
            </label>
            <select
              id="brand"
              className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
              {...register('brand')}
            >
              {brandOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 inline-block" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
              {...register('category')}
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="Model"
              className="inline-block mb-1 text-[15px] text-text font-[400]"
            >
              Model <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="model"
              placeholder="Car Model"
              className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
              {...register('model')}
            />

            {errors.model && (
              <span className="text-red-500">Model name is required!</span>
            )}
          </div>
          <div>
            <label
              htmlFor="Price"
              className="inline-block mb-1 text-[15px] text-text font-[400]"
            >
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="Car price exmp. 3000"
              className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
              {...register('price')}
            />
            {errors.price && (
              <span className="text-red-500">Price is required!</span>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="Quantity"
            className="inline-block mb-1 text-[15px] text-text font-[400]"
          >
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Car quantity exmp. 3"
            className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
            {...register('quantity')}
          />
          {errors.quantity && (
            <span className="text-red-500">Quantity is required!</span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="description"
            className="inline-block mb-1 text-[15px] text-text font-[400]"
          >
            Car Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className="p-2 shadow-sm shadow-blue/15 rounded-sm w-full outline-none focus:border-blue"
            placeholder="Write car description here..."
            {...register('description')}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">
              Car should have some description!
            </span>
          )}
        </div>

        {/* <div className="w-full">
          <label
            htmlFor="car-image"
            className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue transition"
          >
            <FaCloudUploadAlt className="w-8 h-8 text-gray-500" />
            <span className="mt-2 text-gray-700">Click to upload</span>
            <input
              type="file"
              id="car-image"
              className="hidden"
              {...register('carImg')}
              // onChange={(e) => setImgFile(e.target.files?.[0])}
            />
            {errors?.carImg && (
              <p className="text-red-500">Car image must be provided</p>
            )}
          </label>
        </div> */}

        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default UpdateCar;
