import { useParams } from 'react-router';
import { useGetACarQuery } from '../../redux/features/admin/carManagement.api';
import HomeButton from '../shared/HomeButton';
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';
import { ICar } from '../../types';
import { useCreateOrderMutation } from '../../redux/features/admin/orderManagement.api';
import { useEffect } from 'react';
import { toast } from 'sonner';

function Car() {
  const { id } = useParams();

  const { data: car } = useGetACarQuery(id);
  const [creatOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleClick = async (car: ICar) => {
    const data = [];
    const carData = {
      car: car._id,
      quantity: 1,
    };

    data.push(carData);

    await creatOrder({ cars: data });
  };

  const toastId = 'car';
  useEffect(() => {
    if (isLoading) toast.loading('Processing ...', { id: toastId });

    if (isSuccess) {
      toast.success(data?.message, { id: toastId });
      if (data?.data) {
        setTimeout(() => {
          window.location.href = data.data;
        }, 1000);
      }
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data?.data, data?.message, error, isError, isLoading, isSuccess]);

  // if (isCarLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <p className="text-lg font-semibold text-gray-500">Loading...</p>
  //     </div>
  //   );
  // }

  if (car?.data)
    return (
      <div className=" bg-white max-w-4xl mx-auto my-10 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={car.data.img}
              alt={car.data.model}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Important Info Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {car.data.brand} {car.data.model}
              </h2>
              <p className="text-gray-500">
                {car.data.year} | {car.data.category}
              </p>
              <p className="mt-4 text-lg font-semibold text-green-600">
                ${car.data.price.toLocaleString()}
              </p>
              <p className="mt-2 text-gray-700">{car.data.description}</p>
            </div>
            <div className="block" onClick={() => handleClick(car.data)}>
              <HomeButton
                disabled={car.data.quantity === 0}
                text="Checkout"
                type="blue"
              />
            </div>
          </div>
        </div>
        {/* Additional Details */}
        <div className="mt-18 grid grid-cols-2 md:grid-cols-3 gap-6 text-md text-gray-700">
          <p>
            <span className="font-semibold flex items-center">
              {car.data.inStock ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              Stock:
            </span>
            {car.data.inStock ? 'Available' : 'Out of Stock'}
          </p>
          <p>
            <span className="font-semibold flex items-center">
              <FaBox className="mr-2" /> Quantity:
            </span>
            {car.data.quantity}
          </p>
          <p>
            <span className="font-semibold flex items-center">
              <FaCalendarAlt className="mr-2" /> Created:
            </span>
            {formatDate(car.data.createdAt)}
          </p>
          <p>
            <span className="font-semibold flex items-center">
              <FaCalendarAlt className="mr-2" /> Updated:
            </span>
            {formatDate(car.data.updatedAt)}
          </p>
        </div>
      </div>
    );
}

export default Car;
