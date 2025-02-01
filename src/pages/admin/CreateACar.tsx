import { FaCloudUploadAlt } from 'react-icons/fa';
import Button from '../shared/Button';

import { FieldValues, useForm } from 'react-hook-form';

const CreateACar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // img?: string;

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

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const formData = new FormData();

    const img = data.img[0];

    formData.append('data', JSON.stringify(data));
    formData.append('file', img);

    console.log(formData);
    reset();
  };

  return (
    <div className="w-full mx-auto p-6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="category">Brand</label>
          <select
            id="brand"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('brand', { required: true })}
          >
            {brandOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('category', { required: true })}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="Model" className="text-[15px] text-text font-[400]">
            Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="model"
            placeholder="Car Model"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('model', { required: true })}
          />

          {errors.model && (
            <span className="text-red-500">Model name is required!</span>
          )}
        </div>
        <div>
          <label htmlFor="Price" className="text-[15px] text-text font-[400]">
            Price <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            placeholder="Car price exmp. 3000"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('price', { required: true })}
          />
          {errors.price && (
            <span className="text-red-500">Price is required!</span>
          )}
        </div>

        <div>
          <label
            htmlFor="Quantity"
            className="text-[15px] text-text font-[400]"
          >
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="quantity"
            placeholder="Car quantity exmp. 3"
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register('quantity', { required: true })}
          />
          {errors.quantity && (
            <span className="text-red-500">Quantity is required!</span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Car Description
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full block mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            placeholder="Write car description here..."
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && (
            <span className="text-red-500">
              Car should have some description!
            </span>
          )}
        </div>

        <div className="w-full">
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
          >
            <FaCloudUploadAlt className="w-8 h-8 text-gray-500" />
            <span className="mt-2 text-gray-700">Click to upload</span>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              {...register('img', { required: true })}
            />
            {errors?.img && (
              <p className="text-red-500">Car image must be provided</p>
            )}
          </label>
        </div>

        <Button type="submit" text="Submit" />
      </form>
    </div>
  );
};

export default CreateACar;
