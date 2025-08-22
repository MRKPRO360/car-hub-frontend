import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '../../components/CHCarousel';

import CarouselCarCard from '../shared/CarouselCard';
import CarouselSkeletonCard from '../shared/CarouselSkeletonCard';

// const cars = [
//   {
//     id: 1,
//     name: '2022 BMW X5',
//     image: '/cars/bmw-x5.jpg',
//     status: 'Used',
//     price: '$74,900',
//     km: '15,000 km',
//     fuel: 'Petrol',
//     transmission: 'Automatic',
//   },
//   {
//     id: 2,
//     name: '2023 Kia Sportage',
//     image: '/cars/kia-sportage.jpg',
//     status: 'New',
//     price: '$42,990',
//     km: '0 km',
//     fuel: 'Hybrid',
//     transmission: 'Automatic',
//   },
//   {
//     id: 3,
//     name: '2021 Toyota Camry',
//     image: '/cars/camry.jpg',
//     status: 'Used',
//     price: '$29,990',
//     km: '22,300 km',
//     fuel: 'Petrol',
//     transmission: 'Manual',
//   },
// ];

const FeaturedCars = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  const [data, setData] = useState<ICar[]>(cars?.data || []);

  useEffect(() => {
    if (cars?.data?.length && data !== cars.data) {
      setData(cars?.data);
    }
  }, [cars, data]);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 lg:py-18">
      <div>
        <h2 className="text-4xl font-bold text-center dark:text-gray-300 text-gray-900 mb-12">
          Featured&nbsp;
          <span className="text-blue-600">Cars</span>
        </h2>

        <Carousel className="md:w-full ">
          <CarouselContent className="-ml-1 pb-3 sm:pb-6 ">
            {!isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CarouselSkeletonCard />
                ))
              : data?.map((car: ICar) => (
                  <CarouselCarCard key={car._id} car={car} />
                ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default FeaturedCars;
