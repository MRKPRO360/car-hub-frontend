import { Link } from 'react-router';
import { ICar } from '../../types';
import { FaAngleRight } from 'react-icons/fa';

function CarsCard({ car }: { car: ICar }) {
  return (
    <div
      style={{ backfaceVisibility: 'hidden' }}
      key={car.id}
      className="border border-blue/10 border-t-0 p-4 rounded-sm shadow-md shadow-blue/10 bg-white hover:shadow-xl transition duration-300 translate-z-0 hover:scale-[1.01] will-change-transform"
    >
      <div className="w-full aspect-video mb-4">
        <img
          className="w-full h-full object-cover object-center rounded-md"
          src={car.img}
          alt={car.brand}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-1">
          <h1 className="text-lg font-semibold">{car.brand}</h1> ({' '}
          <span className="text-gray-700">{car.model}</span>)
        </div>

        <div className="flex items-center gap-1">
          <p>Published Year</p>
          <span className="text-gray-500 text-sm font-semibold">
            {car.year}
          </span>
        </div>
        <Link
          to={`/cars/${car._id}`}
          className="  border-b-2 shadow-sm shadow-blue/20 "
        >
          <div className="flex items-center hover:gap-3 cursor-pointer">
            <span className="text-md">More</span>
            <FaAngleRight className="text-xl" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default CarsCard;
