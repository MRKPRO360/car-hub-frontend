import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import { useAddCarMutation } from '../../redux/features/admin/carManagement.api';
import { toast } from 'sonner';
import { ICarForm, IResponse, IUser } from '../../types';

import ImageUpload from '../../components/ui/imageUpload/ImageUpload';
import Cta from '../shared/Cta';
import { CircleAlert, Plus, Trash2 } from 'lucide-react';
import { useAppSelector } from '../../redux/hooks';
import { selectCurrentToken } from '../../redux/features/auth/authSlice';
import { verifyToken } from '../../utils/verifyToken';
import { countriesOptions } from '../../constant/city';
import { useNavigate } from 'react-router';
import {
  brandOptions,
  categoryOptions,
  conditionOptions,
  fuelTypeOptions,
  transmissionOptions,
} from '../../constant/car';

const AddACar = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    reset,
    control,
  } = useForm<ICarForm>({
    defaultValues: {
      features: [{ value: '' }],
    },
  });

  const [addCar] = useAddCarMutation();
  const token = useAppSelector(selectCurrentToken);

  let user: undefined | IUser = undefined;

  if (token) {
    user = verifyToken(token);
  }

  const {
    fields: featuresFilelds,
    append: addFeatures,
    remove: removeFeatures,
  } = useFieldArray<any>({
    control,
    name: 'features',
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Adding ...');
    const formData = new FormData();

    const carData = {
      ...data,
      price: parseFloat(data.price),
      quantity: parseFloat(data.quantity),
      seatingCapacity: parseFloat(data.seatingCapacity),
      mileage: parseFloat(data.mileage),
      horsepower: parseFloat(data.horsepower),
      torque: parseFloat(data.torque),
      year: new Date().getFullYear(),
      features: data.features.map(
        (feature: { value: string }) => feature.value
      ),
      author: user?.userID,
    };

    formData.append('data', JSON.stringify(carData));

    if (data.coverImage?.[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    data.images.forEach((file: File) => {
      formData.append('images', file);
    });

    // for (const pair of formData.entries()) {
    //   console.log(pair[0] + ': ' + pair[1]);
    // }

    try {
      const res = (await addCar(formData)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car added successfully', { id: toastId });
        navigate('/dashboard/all-cars');
      }

      reset();
    } catch (err) {
      reset();

      console.log(err);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              className="block text-gray-600 font-semibold text-base dark:text-white/80"
              htmlFor="brand"
            >
              Brand
            </label>
            <select
              defaultValue=""
              id="brand"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800${
                errors.brand
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }
              `}
              {...register('brand', { required: 'Brand is required' })}
            >
              <option value="" hidden disabled>
                -- Selct a brand --
              </option>
              {brandOptions.map((option) => (
                <option
                  className="dark:text-gray-800"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.brand && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.brand.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              className="block font-semibold text-gray-600 dark:text-white/80 font-base"
              htmlFor="category"
            >
              Category
            </label>
            <select
              defaultValue=""
              id="category"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
                errors.category
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }
              `}
              {...register('category', {
                required: 'Category is required',
              })}
            >
              <option value="" disabled hidden>
                -- Select a category --
              </option>
              {categoryOptions.map((option) => (
                <option
                  className="dark:text-gray-800"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.category.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="Model"
              className="block text-gray-600 dark:text-white/80 font-semibold text-base"
            >
              Model <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="model"
              placeholder="Car Model"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
                errors.model
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('model', {
                required: 'Model is required',
              })}
            />
            {errors.model && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.model.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Price"
              className="block dark:text-white/80 text-gray-600 font-semibold text-base"
            >
              Price <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="Car price exmp. 3000"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.price
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('price', {
                required: 'Price is required',
              })}
            />
            {errors.price && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.price.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="Quantity"
            className="block font-semibold text-base text-gray-600 dark:text-white/80"
          >
            Quantity <span className="text-red-700">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Car quantity exmp. 3"
            className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
              errors.quantity
                ? 'border-red-800'
                : 'focus:border-primary border-gray-300'
            }`}
            {...register('quantity', { required: 'Quantity is required!' })}
          />
          {errors.quantity && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.quantity.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="description"
            className="block font-semibold text-base text-gray-600 dark:text-white/80"
          >
            Car Description <span className="text-red-700">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
              errors.description
                ? 'border-red-800'
                : 'focus:border-primary border-gray-300'
            }`}
            {...register('description', {
              required: 'Description is required',
            })}
            placeholder="Write car description here..."
          ></textarea>
          {errors.description && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.description.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="mileage"
              className="block text-gray-600 dark:text-white/80 font-semibold text-base"
            >
              Mileage <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="mileage"
              placeholder="Mileage exmp. 14.5"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.mileage
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('mileage', {
                required: 'Mileage is required',
              })}
            />
            {errors.mileage && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.mileage.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="enginge"
              className="block text-gray-600 dark:text-white/80 font-semibold text-base"
            >
              Engine <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="engine"
              placeholder="exmp. 2.2L mHawk Diesel"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.engine
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('engine', {
                required: 'Engine is required',
              })}
            />
            {errors.engine && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.engine.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>
        {/* FUEL TYPE */}
        <div>
          <label
            htmlFor="fuelType"
            className="block text-gray-600 dark:text-white/80 font-semibold text-base"
          >
            Fuel Type<span className="text-red-700">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {fuelTypeOptions.map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={type}
                  {...register('fuelType', {
                    required: 'Fuel type is required',
                  })}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400
           checked:border-[4px] checked:border-primary
           hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-brand focus:outline-hidden  focus:ring-1 focus:ring-primary transition"
                />
                <span className="text-gray-800 dark:text-white/80 ">
                  {type}
                </span>
              </label>
            ))}
          </div>
          {errors.fuelType && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.fuelType.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        {/* TRANSMISSION  */}
        <div>
          <label
            htmlFor="transmission"
            className="block text-gray-600 dark:text-white/80 font-semibold text-base"
          >
            Transmission<span className="text-red-700">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {transmissionOptions.map((transmission) => (
              <label
                key={transmission}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={transmission}
                  {...register('transmission', {
                    required: 'Transmission is required',
                  })}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400
           checked:border-[4px] checked:border-primary
           hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-brand focus:outline-hidden  focus:ring-1 focus:ring-primary transition"
                />
                <span className="text-gray-800 dark:text-white/80">
                  {transmission}
                </span>
              </label>
            ))}
          </div>
          {errors.transmission && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.transmission.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        {/* COLOR & HORSEPOWER*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="color"
              className="font-semibold text-base block text-gray-600 dark:text-white/80"
            >
              Color
              <span className="text-red-700">*</span>
            </label>

            <input
              type="text"
              placeholder="color exmp. Daytona Grey"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.color
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('color', {
                required: 'Color is required',
              })}
            />

            {errors.color && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.color.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="horsepower"
              className="font-semibold text-base block text-gray-600 dark:text-white/80"
            >
              Horsepower
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 786"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.horsepower
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('horsepower', {
                required: 'Horsepower is required',
              })}
            />

            {errors.horsepower && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.horsepower.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>

        {/* TORQUE AND SEATING CAPACITY */}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="torque"
              className="font-semibold text-base block text-gray-600 dark:text-white/80"
            >
              Torque
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 400"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.torque
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('torque', {
                required: 'Torque is required',
              })}
            />

            {errors.torque && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.torque.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="seatingCapacity"
              className="font-semibold text-base block text-gray-600"
            >
              Seating Capacity
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 6"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.seatingCapacity
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('seatingCapacity', {
                required: 'Seating capacity is required',
              })}
            />

            {errors.seatingCapacity && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {errors.seatingCapacity.message}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>

        {/* FEATURES */}
        <div className="space-y-3">
          <label
            htmlFor="features"
            className="font-semibold text-base block text-gray-600"
          >
            Features
            <span className="text-red-700">*</span>
          </label>
          {featuresFilelds.map((field, index) => (
            <div key={field.id}>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder={`Feature ${index + 1}`}
                  {...register(`features.${index}.value`, {
                    required:
                      featuresFilelds.length <= 1 &&
                      'At least one feature is required',
                  })}
                  className={`flex-1 py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                    errors.features?.[index]?.value?.message
                      ? 'border-red-500'
                      : 'border-gray-300 focus:border-primary'
                  }`}
                />

                {featuresFilelds.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeatures(index)}
                    className="text-red-700 hover:text-red-700"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => addFeatures({ value: '' })}
                  className="flex items-center gap-2 text-primary hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              {errors.features?.[index]?.value?.message && (
                <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                  {errors.features?.[index]?.value?.message}

                  <CircleAlert
                    className="text-red-800 dark:text-red-500"
                    size={20}
                  />
                </p>
              )}
            </div>
          ))}
        </div>

        {/* CONDITION */}
        <div>
          <label
            htmlFor="condition"
            className="block text-gray-600 dark:text-white/80 font-semibold text-base"
          >
            Condition<span className="text-red-700">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-6 gap-3">
            {conditionOptions.map((condition) => (
              <label
                key={condition}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  value={condition}
                  {...register('condition', {
                    required: 'Condition is required',
                  })}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400
           checked:border-[4px] checked:border-primary
           hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-brand focus:outline-hidden  focus:ring-1 focus:ring-primary transition"
                />
                <span className="text-gray-800 dark:text-white/80">
                  {condition}
                </span>
              </label>
            ))}
          </div>
          {errors.condition && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.condition.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>

        {/* CITY, STREET, COUNTRY */}

        <div className="flex items-center gap-3">
          <div className="flex-1 min-h-[90px]">
            <label
              htmlFor="city"
              className="block text-gray-600 dark:text-white/80 font-semibold text-base"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="exmp. New York City"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.location?.city
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('location.city', {
                required: 'City is required',
              })}
            />
            {errors.location?.city && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {typeof errors.location?.city.message === 'string'
                  ? errors.location.city.message
                  : 'Invalid city'}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
          <div className="flex-1 min-h-[90px]">
            <label
              htmlFor="street"
              className="block text-gray-600 dark:text-white/80 font-semibold text-base"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="exmp. New York"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.location?.state
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('location.state')}
            />
          </div>
          <div className="flex-1 min-h-[90px]">
            <div>
              <label
                className="block text-gray-600 dark:text-white/80 font-semibold text-base"
                htmlFor="country"
              >
                Country
              </label>
              <select
                defaultValue=""
                id="country"
                className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                  errors.location?.country
                    ? 'border-red-500'
                    : 'border-gray-300 focus:border-primary'
                }
              `}
                {...register('location.country', {
                  required: 'Country is required',
                  validate: (value) =>
                    value !== '' || 'Please select your country',
                })}
              >
                {/* Default unselected placeholder */}
                <option className="dark:text-white/80" value="" disabled hidden>
                  -- Select a country --
                </option>

                {countriesOptions.map((country, idx) => (
                  <option
                    className="dark:text-gray-800"
                    key={idx}
                    value={country}
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>
            {errors.location?.country && (
              <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                {typeof errors.location?.country.message === 'string'
                  ? errors.location.country.message
                  : 'Invalid country'}

                <CircleAlert
                  className="text-red-800 dark:text-red-500"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>

        {/* COVER IMAGE AND CAR IMAGES */}
        <div className="w-full">
          <ImageUpload
            label="Cover Photo (One Image)"
            multiple={false}
            onChange={(files) => {
              if (
                Array.isArray(files) &&
                files.length > 0 &&
                files[0] instanceof File
              ) {
                setValue('coverImage', files as File[], {
                  shouldValidate: true,
                });
                trigger('coverImage');
              }
            }}
          />

          <input
            type="hidden"
            {...register('coverImage', {
              required: 'A car should have a cover image!',
              validate: (files: File[]) =>
                files?.length > 0 || 'Please select a cover image',
            })}
          />
          {errors.coverImage && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.coverImage.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="w-full">
          <ImageUpload
            label="Car Images (Ensure 3 Images)"
            multiple={true}
            minFiles={3}
            onChange={(files) => {
              if (
                Array.isArray(files) &&
                files.length > 0 &&
                files[0] instanceof File
              ) {
                setValue('images', files as File[]);
                trigger('images');
              }
            }}
          />

          <input
            type="hidden"
            {...register('images', {
              required: 'Provide at least 3 images',
              validate: (files: File[]) =>
                files.length >= 3 || 'Select at least 3 images',
            })}
          />

          {errors.images && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.images.message}

              <CircleAlert
                className="text-red-800 dark:text-red-500"
                size={20}
              />
            </p>
          )}
        </div>
        <button className="w-full mt-5" disabled={isSubmitting} type="submit">
          <Cta
            className="w-full"
            text="Submit"
            isSubmitting={isSubmitting}
            submittingText="Submitting"
          />
        </button>
      </form>
    </div>
  );
};

export default AddACar;
