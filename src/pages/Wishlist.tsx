import { Fuel, DollarSign, GaugeCircle, Settings } from 'lucide-react';
import { ICar } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addCar,
  selectWishlistedCar,
} from '../redux/features/wishlist/wishlistSlice';

import { Link } from 'react-router';
import { TruncateText } from '../components/TruncateText/TruncateText';
import formatPrice from '../utils/formatPrice';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlistedCars = useAppSelector(selectWishlistedCar);

  const handleWishlist = (car: ICar) => {
    dispatch(addCar(car));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center dark:text-gray-300 text-gray-900 mb-12">
          My&nbsp;
          <span className="text-blue-600">Wishlist</span>
        </h2>

        {wishlistedCars.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistedCars.map((car) => (
              <div
                key={car._id}
                className="overflow-hidden bg-white dark:bg-gray-950 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300  "
              >
                <Link
                  to={`/cars/${car._id}`}
                  className="flex items-center justify-center"
                >
                  <img
                    src={car.coverImage as string}
                    alt={car.model}
                    className="w-72 md:w-full md:h-36 object-cover"
                  />
                </Link>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
                      <TruncateText
                        maxLength={20}
                        text={`${car.brand} ${car.model}`}
                      />
                    </h3>

                    <span className="text-xs font-semibold bg-blue-100 text-primary px-2 py-1 rounded">
                      {car.condition}
                    </span>
                  </div>
                  <div className="flex items-center border-b-2 border-b-gray-100 pb-2">
                    <DollarSign
                      strokeWidth={3}
                      className="w-4 h-4 self-start text-gray-600 font-semibold"
                    />

                    <p className="text-lg font-bold dark:text-gray-300">
                      {formatPrice(car.price)}
                    </p>
                  </div>
                  <div className="flex flex-wrap text-sm text-gray-600 dark:text-gray-300 gap-x-4 gap-y-2 my-2 font-semibold">
                    <div className="flex items-center gap-1">
                      <GaugeCircle
                        className="w-4 h-4 text-primary"
                        strokeWidth={2.5}
                      />
                      <span>{car.horsepower}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel
                        className="w-4 h-4 text-primary"
                        strokeWidth={2.5}
                      />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Settings
                        className="w-4 h-4 text-primary"
                        strokeWidth={2.5}
                      />
                      <span>{car.transmission}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleWishlist(car)}
                    className="bg-red-300/90 text-red-800 text-md px-1 py-[0.5px] rounded-sm cursor-pointer mt-4"
                    aria-label="Wishlist"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
