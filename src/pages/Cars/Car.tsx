import { useParams } from 'react-router';
import { useGetACarQuery } from '../../redux/features/admin/carManagement.api';
import HomeButton from '../shared/HomeButton';
import {
  FaBox,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

function Car() {
  const { id } = useParams();

  const { data: car, isLoading } = useGetACarQuery(id);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) return 'Loading ...';

  if (car?.data)
    return (
      <div className="py-6 bg-white max-w-4xl mx-auto  ">
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
            <HomeButton text="Checkout" type="blue" />
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
