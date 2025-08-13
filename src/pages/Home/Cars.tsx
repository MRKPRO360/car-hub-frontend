import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { Link } from 'react-router';
import HomeButton from '../shared/HomeButton';
import CarouselCarCard from '../shared/CarouselCard';

function Cars({ renderBtn }: { renderBtn: boolean }) {
  const { data: cars } = useGetAllCarsQuery(undefined);

  const carsContent = renderBtn
    ? cars?.data
        ?.slice(0, 4)
        .map((el) => <CarouselCarCard key={el._id} car={el} />)
    : cars?.data?.map((el) => <CarouselCarCard key={el._id} car={el} />);

  return (
    <div className="py-18">
      <h1 className="text-center mb-10 font-semibold text-3xl  ">
        Our Crafted Car
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8 overflow-hidden">
        {carsContent}
      </div>

      {renderBtn && (
        <div className="flex items-center justify-center">
          <Link to="/cars">
            <HomeButton type="blue" text="View More" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Cars;
