import { FaAngleRight } from 'react-icons/fa';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { Link } from 'react-router';
import HomeButton from '../shared/HomeButton';

function Cars() {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  console.log(cars);

  return (
    <div className="py-18">
      <h1 className="text-center mb-10 font-semibold text-3xl  ">
        Our Crafted Car
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8 overflow-hidden">
        {cars?.data?.slice(0, 4).map((el) => (
          <div
            style={{ backfaceVisibility: 'hidden' }}
            key={el.id}
            className="border border-blue/10 border-t-0 p-4 rounded-sm shadow-md shadow-blue/10 bg-white hover:shadow-xl transition duration-300 translate-z-0 hover:scale-[1.01] will-change-transform"
          >
            <div className="w-full aspect-video mb-4">
              <img
                className="w-full h-full object-cover object-center rounded-md"
                src={el.img}
                alt={el.brand}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <h1 className="text-lg font-semibold">{el.brand}</h1> ({' '}
                <span className="text-gray-700">{el.model}</span>)
              </div>

              <div className="flex items-center gap-1">
                <p>Published Year</p>
                <span className="text-gray-500 text-sm font-semibold">
                  {el.year}
                </span>
              </div>
              <Link
                to={`/cars/${el._id}`}
                className="  border-b-2 shadow-sm shadow-blue/20 "
              >
                <div className="flex items-center hover:gap-3">
                  <span className="text-md">More</span>
                  <FaAngleRight className="text-xl" />
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <Link to=" /cars/">
          <HomeButton type="blue" text="View More" />
        </Link>
      </div>
    </div>
  );
}

export default Cars;
