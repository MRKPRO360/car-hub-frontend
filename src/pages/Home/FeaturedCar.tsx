import { DollarSign, Fuel, GaugeCircle, Settings } from 'lucide-react';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../../components/CHCarousel';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router';
import CarouselCarCard from '../shared/CarouselCard';

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
  console.log(cars);

  useEffect(() => {
    if (cars?.data?.length && data !== cars.data) {
      setData(cars?.data);
    }
  }, [cars, data]);
  return (
    <section className="bg-gray-50 py-12 lg:py-18">
      <div className="">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Cars
        </h2>

        <Carousel className="md:w-full ">
          <CarouselContent className="-ml-1 pb-3 sm:pb-6 ">
            {data?.map((car: ICar) => (
              <CarouselCarCard key={car._id} car={car} />
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        {/* <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"></div> */}
      </div>
    </section>
  );
};

export default FeaturedCars;
