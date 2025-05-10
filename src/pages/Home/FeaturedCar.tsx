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
          <CarouselContent className="-ml-1">
            {data?.map((car: ICar) => (
              <CarouselItem
                key={car._id}
                className="pl-1 sm:basis-1/2 lg:basis-1/4"
              >
                <div
                  key={car._id}
                  className="bg-white rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] overflow-hidden hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300"
                >
                  <img
                    src={car.coverImage}
                    alt={car.model}
                    className="w-full h-50 object-cover"
                  />
                  <div className="p-5">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {car.brand}
                      </h3>
                      <span className="text-xs font-semibold bg-blue-100 text-primary px-2 py-1 rounded">
                        {car.condition}
                      </span>
                    </div>
                    <div className="flex items-center ">
                      <DollarSign
                        strokeWidth={3}
                        className="w-4 h-4 self-start text-gray-600 font-semibold"
                      />{' '}
                      {car.price}
                      <p className="text-lg font-bold text-blue-700 mb-4"></p>
                    </div>
                    <div className="flex flex-wrap text-sm text-gray-600 gap-x-4 gap-y-2 mb-4">
                      <div className="flex items-center gap-1">
                        <GaugeCircle
                          className="w-4 h-4 text-primary"
                          strokeWidth={2.5}
                        />
                        <span>{car.horsepower}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel
                          className="w-4 h-4 text-primary"
                          strokeWidth={2.5}
                        />
                        <span>{car.fuelType}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Settings
                          className="w-4 h-4 text-primary"
                          strokeWidth={2.5}
                        />
                        <span>{car.transmission}</span>
                      </div>
                    </div>
                    <button className="mt-auto w-full py-2 text-sm font-medium bg-primary text-white rounded hover:bg-blue-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </CarouselItem>
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
