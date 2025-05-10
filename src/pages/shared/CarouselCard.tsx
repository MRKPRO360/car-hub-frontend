import { DollarSign, Fuel, GaugeCircle, Settings } from 'lucide-react';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router';
import { ICar } from '../../types';
import { CarouselItem } from '../../components/CHCarousel';

function CarouselCarCard({ car, key }: { car: ICar; key: string }) {
  return (
    <CarouselItem key={key} className="pl-1 sm:basis-1/2 lg:basis-1/4">
      <div className="bg-white rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] overflow-hidden hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 relative">
        <button
          className="text-blue-500 text-lg absolute top-2 right-2 z-50 cursor-pointer"
          aria-label="Wishlist"
        >
          <FiHeart />
        </button>
        <Link to={`/cars/${car._id}`}>
          <img
            src={car.coverImage}
            alt={car.model}
            className="w-full h-50 object-cover"
          />
        </Link>
        <div className="p-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-800">
              {car.brand} {car.model}
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

            <p className="text-lg font-bold">{car.price}</p>
          </div>
          <div className="flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-2 my-2 font-semibold">
            <div className="flex items-center gap-1">
              <GaugeCircle className="w-4 h-4 text-primary" strokeWidth={2.5} />
              <span>{car.horsepower}</span>
            </div>
            <div className="flex items-center gap-1">
              <Fuel className="w-4 h-4 text-primary" strokeWidth={2.5} />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center gap-1">
              <Settings className="w-4 h-4 text-primary" strokeWidth={2.5} />
              <span>{car.transmission}</span>
            </div>
          </div>
        </div>
      </div>
    </CarouselItem>
  );
}

export default CarouselCarCard;
