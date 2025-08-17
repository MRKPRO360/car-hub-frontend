import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../components/CHCarousel';
import Cta from '../shared/Cta';
import CarouselCarCard from '../shared/CarouselCard';

const MatchYourBudget = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  const [data, setData] = useState<ICar[]>(cars?.data || []);

  useEffect(() => {
    if (cars?.data?.length && data !== cars.data) {
      setData(cars?.data);
    }
  }, [cars, data]);
  return (
    <section className="dark:from-gray-dark  bg-gradient-to-b via-80% from-white to-[rgba(20,73,230,0.06)] py-12 lg:py-18">
      <div className="">
        <h2 className="text-4xl font-bold text-center dark:text-gray-300 text-gray-900 mb-12">
          Match Your&nbsp;
          <span className="text-blue-600">Budget</span>
        </h2>

        <Carousel className="md:w-full ">
          <CarouselContent className="-ml-1 pb-3 sm:pb-6">
            {data?.map((car: ICar) => (
              <CarouselCarCard car={car} key={car._id} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="text-center my-10">
        <Cta text="Browse All Cars Under $20K" />
      </div>
    </section>
  );
};

export default MatchYourBudget;
