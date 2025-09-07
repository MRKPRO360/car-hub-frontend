import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../components/CHCarousel';
import Cta from '../shared/Cta';
import CarouselCarCard from '../shared/CarouselCarCard';
import CarouselSkeletonCard from '../shared/CarouselSkeletonCard';
import useCardStagger from '../../hooks/useCardStagger';

const MatchYourBudget = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useCardStagger(headingRef, containerRef, cars?.data);

  return (
    <section className="dark:from-gray-dark  bg-gradient-to-b via-80% from-white to-[rgba(20,73,230,0.06)] py-12 lg:py-18">
      <div className="overflow-y-hidden mb-12">
        <h2
          ref={headingRef}
          className="text-4xl font-bold text-center dark:text-gray-300 text-gray-900"
        >
          Match Your&nbsp;
          <span className="text-blue-600">Budget</span>
        </h2>
      </div>
      <Carousel className="md:w-full">
        {isLoading ? (
          <CarouselContent className="-ml-1 ">
            {Array.from({ length: 4 }).map((_, i) => (
              <CarouselSkeletonCard key={i} />
            ))}
          </CarouselContent>
        ) : (
          <div ref={containerRef}>
            <CarouselContent className="-ml-1 ">
              {cars?.data?.map((car: ICar) => (
                <CarouselCarCard key={car._id} car={car} />
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />

            <div className="text-center my-10 cta">
              <Cta isLoading={isLoading} text="Browse All Cars Under $20K" />
            </div>
          </div>
        )}
      </Carousel>
    </section>
  );
};

export default MatchYourBudget;
