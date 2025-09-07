import { useAppSelector } from '../redux/hooks';
import { selectWishlistedCar } from '../redux/features/wishlist/wishlistSlice';

import CarCard from './shared/CarCard';

const Wishlist = () => {
  const wishlistedCars = useAppSelector(selectWishlistedCar);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
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
              <CarCard car={car} key={car._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
