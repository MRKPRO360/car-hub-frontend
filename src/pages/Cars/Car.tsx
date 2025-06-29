import { useParams } from 'react-router';
import { useGetACarQuery } from '../../redux/features/admin/carManagement.api';

import {
  Fuel,
  Settings,
  Palette,
  Gauge,
  Zap,
  Activity,
  Users,
  CheckCircle2,
  Star,
} from 'lucide-react';

import { ICar } from '../../types';
import { useCreateOrderMutation } from '../../redux/features/admin/orderManagement.api';
import { useEffect } from 'react';
import { toast } from 'sonner';
import Cta from '../shared/Cta';

function Car() {
  const { id } = useParams();

  const { data: car } = useGetACarQuery(id);

  const [creatOrder, { isLoading, isSuccess, data, isError, error }] =
    useCreateOrderMutation();

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

  if (car?.data) {
    return (
      <div className="container mx-auto pt-14 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={car?.data?.coverImage}
              alt={car.model}
              className="rounded-2xl w-full object-cover"
            />
            <div className="flex flex-wrap mt-4 gap-2">
              {car?.data?.images?.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`Car ${i}`}
                  className="flex-1 h-26 rounded-xs object-cover"
                />
              ))}
            </div>
          </div>
          <div className="md:justify-self-end md:self-end">
            <h1 className="text-2xl font-bold dark:text-gray-300">{`${car?.data.year} ${car?.data.brand} ${car?.data.model}`}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-200">
              ${Number(car?.data.price).toFixed(2)}
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-200">
              {car?.data?.location?.city}, {car?.data?.location?.state},{' '}
              {car?.data?.location?.country}
            </p>
            <p className="mt-4 text-base text-gray-700 dark:text-gray-400">
              {car?.data?.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 text-sm dark:text-gray-400">
              <div className="flex items-center gap-2 ">
                <div className="bg-primary/10 rounded-full p-2">
                  <Fuel strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Fuel Type:</strong> {car?.data?.fuelType}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Settings strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>

                <span>
                  <strong>Transmission:</strong> {car?.data?.transmission}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Palette strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Color:</strong> {car?.data?.color}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Gauge strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Engine:</strong> {car?.data?.engine}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Zap strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Horsepower:</strong> {car?.data?.horsepower} HP
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Activity strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Torque:</strong> {car?.data?.torque} Nm
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Gauge strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Mileage:</strong> {car?.data?.mileage} km/l
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Users strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Seating:</strong> {car?.data?.seatingCapacity} Seats
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <CheckCircle2
                    strokeWidth={3}
                    className="w-4 h-4 text-primary"
                  />
                </div>
                <span>
                  <strong>Condition:</strong> {car?.data?.condition}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Star strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>
                <span>
                  <strong>Rating:</strong> {car?.data?.ratingAverage} ⭐ (
                  {car?.data?.ratingQuantity} reviews)
                </span>
              </div>
            </div>
            <div className="mt-4" onClick={() => handleClick(car.data)}>
              <Cta
                className="w-full flex items-center justify-center"
                text="Checkout"
              />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="font-semibold mb-2 text-lg dark:text-gray-300">
            Features
          </h3>
          <ul className="text-sm space-y-2 dark:text-gray-400">
            {car?.data?.features?.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center gap-2">
                <div className="bg-primary/10 rounded-full p-2">
                  <Zap strokeWidth={3} className="w-4 h-4 text-primary" />
                </div>

                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  // return (
  //   <div className=" bg-white max-w-4xl mx-auto my-10 ">
  //     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  //       {/* Image Section */}
  //       <div>
  //         <img
  //           src={car.data.img}
  //           alt={car.data.model}
  //           className="w-full h-[280px] object-cover object-center"
  //         />
  //       </div>
  //       {/* Important Info Section */}
  //       <div className="flex flex-col justify-between">
  //         <div>
  //           <h2 className="text-2xl font-bold">
  //             {car.data.brand} {car.data.model}
  //           </h2>
  //           <p className="text-gray-500">
  //             {car.data.year} | {car.data.category}
  //           </p>
  //           <p className="mt-4 text-lg font-semibold text-green-600">
  //             ${car.data.price.toLocaleString()}
  //           </p>
  //           <p className="mt-2 text-gray-700">{car.data.description}</p>
  //         </div>
  //         <div className="block" onClick={() => handleClick(car.data)}>
  //           <HomeButton
  //             disabled={car.data.quantity === 0}
  //             text="Checkout"
  //             type="blue"
  //           />
  //         </div>
  //       </div>
  //     </div>
  //     {/* Additional Details */}
  //     <div className="mt-18 grid grid-cols-2 md:grid-cols-3 gap-6 text-md text-gray-700">
  //       <p>
  //         <span className="font-semibold flex items-center">
  //           {car.data.inStock ? (
  //             <FaCheckCircle className="text-green-500 mr-2" />
  //           ) : (
  //             <FaTimesCircle className="text-red-500 mr-2" />
  //           )}
  //           Stock:
  //         </span>
  //         {car.data.inStock ? 'Available' : 'Out of Stock'}
  //       </p>
  //       <p>
  //         <span className="font-semibold flex items-center">
  //           <FaBox className="mr-2" /> Quantity:
  //         </span>
  //         {car.data.quantity}
  //       </p>
  //       <p>
  //         <span className="font-semibold flex items-center">
  //           <FaCalendarAlt className="mr-2" /> Created:
  //         </span>
  //         {formatDate(car.data.createdAt)}
  //       </p>
  //       <p>
  //         <span className="font-semibold flex items-center">
  //           <FaCalendarAlt className="mr-2" /> Updated:
  //         </span>
  //         {formatDate(car.data.updatedAt)}
  //       </p>
  //     </div>
  //   </div>
  // );
}

export default Car;
