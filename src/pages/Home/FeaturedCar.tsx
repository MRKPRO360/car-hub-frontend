import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../components/CHCarousel';

import CarouselCarCard from '../shared/CarouselCarCard';
import CarouselSkeletonCard from '../shared/CarouselSkeletonCard';

import { useRef } from 'react';

import useCardStagger from '../../hooks/useCardStagger';

const FeaturedCars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useCardStagger(headingRef, containerRef, cars?.data);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 lg:py-18">
      <div>
        <div className="overflow-y-hidden mb-12">
          <h2
            ref={headingRef}
            className="text-4xl font-bold text-center dark:text-gray-300 text-gray-900"
          >
            Featured&nbsp;
            <span className="text-blue-600">Cars</span>
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
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedCars;
