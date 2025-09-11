import { FieldValues, useFieldArray, useForm } from 'react-hook-form';
import {
  useGetACarQuery,
  useUpdateCarMutation,
} from '../../redux/features/admin/carManagement.api';
import { toast } from 'sonner';
import { IResponse, UpdateICarForm } from '../../types';
import { useEffect } from 'react';
import ImageUpload from '../../components/ui/imageUpload/ImageUpload';
import Cta from '../shared/Cta';
import { CircleAlert, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { countriesOptions } from '../../constant/city';
import { useNavigate, useParams } from 'react-router';
import {
  brandOptions,
  categoryOptions,
  conditionOptions,
  fuelTypeOptions,
  transmissionOptions,
} from '../../constant/car';

const UpdateACar = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: car, isLoading } = useGetACarQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  const [updateCar] = useUpdateCarMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    setValue,
    reset,
    control,
  } = useForm<UpdateICarForm>({
    // ENSURES OLD FEATURES ARE REPLACED PROPERLY
    shouldUnregister: true,
    // Provide static defaults. The form will be populated with async data
    // from the `useEffect` hook below.
    defaultValues: {
      features: [{ value: '' }],
    },
  });

  useEffect(() => {
    if (car?.data) {
      const carFeatures = car.data.features || [];
      reset({
        ...car.data,
        features:
          carFeatures.length > 0
            ? carFeatures.map((feature: string) => ({ value: feature }))
            : [{ value: '' }],
      });
    }
  }, [car?.data, reset]);

  const {
    fields: featuresFilelds,
    append: addFeatures,
    remove: removeFeatures,
  } = useFieldArray<UpdateICarForm>({
    control,
    name: 'features',
  });

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading('Updating ...');
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
    };

    formData.append('data', JSON.stringify(carData));

    if (data.coverImage?.[0]) {
      formData.append('coverImage', data.coverImage[0]);
    }

    data.images.forEach((file: File) => {
      formData.append('images', file);
    });

    try {
      const res = (await updateCar({ data: formData, id })) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car updated successfully', { id: toastId });
        navigate('/dashboard/all-cars');
      }

      reset();
    } catch (err) {
      reset();

      console.log(err);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[65vh]">
        <p className="text-lg font-semibold text-gray-500">
          <LoaderCircle
            strokeWidth={2.5}
            size={30}
            className="dark:text-primary/80 animate-spin block text-gray-500"
          />
        </p>
      </div>
    );
  }
  return (
    <div className=" w-full p-6 mx-auto">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="md:grid-cols-2 grid gap-4">
          <div>
            <label
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
              htmlFor="brand"
            >
              Brand
            </label>
            <select
              defaultValue=""
              id="brand"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-gray-800 dark:bg-gray-300"
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              className="dark:text-gray-400 font-base block mb-1 font-semibold text-gray-600"
              htmlFor="category"
            >
              Category
            </label>
            <select
              defaultValue=""
              id="category"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800  ${
                errors.category
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }
                `}
              {...register('category', {
                required: 'Category is required',
              })}
            >
              <option
                className="dark:text-gray-800 dark:bg-gray-300"
                value=""
                disabled
                hidden
              >
                -- Select a category --
              </option>
              {categoryOptions.map((option) => (
                <option
                  className="dark:text-gray-800 dark:bg-gray-300"
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>
        <div className="md:grid-cols-2 grid gap-4">
          <div>
            <label
              htmlFor="Model"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Model <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="model"
              placeholder="Car Model"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="Price"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Price <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="price"
              placeholder="Car price exmp. 3000"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="Quantity"
            className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
          >
            Quantity <span className="text-red-700">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Car quantity exmp. 3"
            className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                className="dark:text-red-500 text-red-800"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="description"
            className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
          >
            Car Description <span className="text-red-700">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                className="dark:text-red-500 text-red-800"
                size={20}
              />
            </p>
          )}
        </div>
        <div className="md:grid-cols-2 grid gap-4">
          <div>
            <label
              htmlFor="mileage"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Mileage <span className="text-red-700">*</span>
            </label>
            <input
              type="number"
              id="mileage"
              placeholder="Mileage exmp. 14.5"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="enginge"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Engine <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              id="engine"
              placeholder="exmp. 2.2L mHawk Diesel"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
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
            className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
          >
            Fuel Type<span className="text-red-700">*</span>
          </label>
          <div className="sm:grid-cols-3 xl:grid-cols-6 grid grid-cols-1 gap-3">
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
             hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
                <span className="dark:text-gray-400 text-gray-800">{type}</span>
              </label>
            ))}
          </div>
          {errors.fuelType && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.fuelType.message}

              <CircleAlert
                className="dark:text-red-500 text-red-800"
                size={20}
              />
            </p>
          )}
        </div>
        {/* TRANSMISSION  */}
        <div>
          <label
            htmlFor="transmission"
            className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
          >
            Transmission<span className="text-red-700">*</span>
          </label>
          <div className="sm:grid-cols-2 grid grid-cols-1 gap-3">
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
             hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
                <span className="dark:text-gray-400 text-gray-800">
                  {transmission}
                </span>
              </label>
            ))}
          </div>
          {errors.transmission && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.transmission.message}

              <CircleAlert
                className="dark:text-red-500 text-red-800"
                size={20}
              />
            </p>
          )}
        </div>
        {/* COLOR & HORSEPOWER*/}
        <div className="sm:grid-cols-2 grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="color"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Color
              <span className="text-red-700">*</span>
            </label>

            <input
              type="text"
              placeholder="color exmp. Daytona Grey"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="horsepower"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Horsepower
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 786"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>
        </div>

        {/* TORQUE AND SEATING CAPACITY */}

        <div className="sm:grid-cols-2 grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="torque"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Torque
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 400"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
                  size={20}
                />
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="seatingCapacity"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              Seating Capacity
              <span className="text-red-700">*</span>
            </label>

            <input
              type="number"
              placeholder="exmp. 6"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
                  className="dark:text-red-500 text-red-800"
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
            className="block text-base font-semibold text-gray-600"
          >
            Features
            <span className="text-red-700">*</span>
          </label>
          {featuresFilelds.map((field, index) => {
            const fieldError = errors.features?.[index]?.value;
            return (
              <div key={field.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder={`Feature ${index + 1}`}
                    {...register(`features.${index}.value`, {
                      required: 'Feature cannot be empty',
                    })}
                    className={`flex-1 py-2.5 px-4 dark:placeholder:text-white/30 appearance-none w-full outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800 focus:outline-hidden rounded-lg border placeholder:text-gray-400 bg-transparent text-gray-800 border-gray-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800 ${
                      fieldError
                        ? 'border-red-500'
                        : 'border-gray-300 focus:border-primary'
                    }`}
                  />

                  {featuresFilelds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeatures(index)}
                      className="hover:text-red-700 text-red-700"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {fieldError && (
                  <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                    {fieldError.message}

                    <CircleAlert
                      className="dark:text-red-500 text-red-800"
                      size={20}
                    />
                  </p>
                )}
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => addFeatures({ value: '' })}
            className="text-primary hover:text-blue-700 flex items-center gap-2 mt-2 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Feature
          </button>
        </div>

        {/* CONDITION */}
        <div>
          <label
            htmlFor="condition"
            className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
          >
            Condition<span className="text-red-700">*</span>
          </label>
          <div className="sm:grid-cols-3 xl:grid-cols-6 grid grid-cols-1 gap-3">
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
             hover:ring-2 hover:ring-primary/30 focus:outline-none focus:ring-1 focus:ring-primary transition"
                />
                <span className="dark:text-gray-400 text-gray-800">
                  {condition}
                </span>
              </label>
            ))}
          </div>
          {errors.condition && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.condition.message}

              <CircleAlert
                className="dark:text-red-500 text-red-800"
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
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="exmp. New York city"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
                errors.location?.city
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('location.city', {
                required: 'City is required',
              })}
            />

            <div className="relative h-6">
              {errors.location?.city && (
                <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                  {typeof errors.location?.city.message === 'string'
                    ? errors.location.city.message
                    : 'Invalid city'}

                  <CircleAlert
                    className="dark:text-red-500 text-red-800"
                    size={20}
                  />
                </p>
              )}
            </div>
          </div>
          <div className="flex-1 min-h-[90px]">
            <label
              htmlFor="street"
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
            >
              State
            </label>
            <input
              type="text"
              id="state"
              placeholder="exmp. New York"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
                errors.location?.state
                  ? 'border-red-800'
                  : 'border-gray-300 focus:border-primary'
              }`}
              {...register('location.state')}
            />
          </div>
          <div className="flex-1 min-h-[90px]">
            <label
              className="dark:text-white/80 block mb-1 text-base font-semibold text-gray-600"
              htmlFor="country"
            >
              Country
            </label>
            <select
              defaultValue=""
              id="country"
              className={`py-2.5 px-4  dark:placeholder:text-white/30 appearance-none w-full  outline-none focus:outline-none focus:ring-3 shadow-theme-xs focus:border-brand-300 dark:focus-broder-brand-800  focus:outline-hidden  rounded-lg border    placeholder:text-gray-400  dark:bg-gray-900  bg-transparent text-gray-800 border-gray-300  focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800 ${
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
              <option
                className="dark:text-gray-800 dark:bg-gray-300"
                value=""
                hidden
                disabled
              >
                -- Country --
              </option>

              {countriesOptions.map((country, idx) => (
                <option
                  className="dark:text-gray-800 dark:bg-gray-300"
                  key={idx}
                  value={country}
                >
                  {country}
                </option>
              ))}
            </select>

            <div className="relative h-6">
              {errors.location?.country && (
                <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
                  {typeof errors.location?.country.message === 'string'
                    ? errors.location.country.message
                    : 'Invalid country'}

                  <CircleAlert
                    className="dark:text-red-500 text-red-800"
                    size={20}
                  />
                </p>
              )}
            </div>
          </div>
        </div>

        {/* COVER IMAGE AND CAR IMAGES */}
        <div className="w-full">
          <ImageUpload
            label="Cover Photo (One Image)"
            multiple={false}
            onChange={(files) => {
              setValue('coverImage', files as File[], { shouldValidate: true });
              trigger('coverImage');
            }}
            initialImages={
              car?.data?.coverImage ? [car?.data?.coverImage as string] : []
            }
          />

          <input
            type="hidden"
            {...register('coverImage', {
              required: 'A car should have a cover image!',
              validate: (files: File[] | string) =>
                files?.length > 0 || 'Please select a cover image',
            })}
          />
          {errors.coverImage && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.coverImage.message}

              <CircleAlert
                className="dark:text-red-500 text-red-800"
                size={20}
              />
            </p>
          )}

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
                setValue('images', files);
                trigger('images');
              }
            }}
            initialImages={
              car?.data?.images ? (car?.data?.images as string[]) : []
            }
          />

          <input
            type="hidden"
            {...register('images', {
              required: 'Provide at least 3 images',
              validate: (files: File[] | string[]) =>
                files.length >= 3 || 'Select at least 3 images',
            })}
          />

          {errors.images && (
            <p className="bg-red-100/90 rounded-2xl text-red-800 dark:bg-red-900/30 dark:text-red-400 text-sm mt-1 inline-flex px-1 py-0.5 gap-0.5">
              {errors.images.message}

              <CircleAlert
                className="dark:text-red-500 text-red-800"
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

export default UpdateACar;
