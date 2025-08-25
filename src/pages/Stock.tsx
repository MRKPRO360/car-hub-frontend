import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, X } from 'lucide-react';
import { useGetAllCarsQuery } from '../redux/features/admin/carManagement.api';
import CarCard from './shared/CarCard';
import FilterSidebar from './Stock/FilterSidebar';
import { ICar, ICarFilters } from '../types';

function Stock() {
  const { data: carData } = useGetAllCarsQuery(undefined);

  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [filteredCars, setFilteredCars] = useState<ICar[] | undefined>(
    undefined
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ICarFilters>({});

  useEffect(() => {
    if (!carData?.data) return;

    const filtered = carData.data.filter((car: ICar) => {
      if (filters.brand?.length && !filters.brand.includes(car.brand))
        return false;
      if (
        filters.price &&
        (car.price < filters.price[0] || car.price > filters.price[1])
      )
        return false;
      if (
        filters.year &&
        (car.year < filters.year[0] || car.year > filters.year[1])
      )
        return false;
      if (filters.category?.length && !filters.category.includes(car.category))
        return false;
      if (filters.fuelType?.length && !filters.fuelType.includes(car.fuelType))
        return false;
      if (
        filters.transmission?.length &&
        !filters.transmission.includes(car.transmission)
      )
        return false;
      if (
        filters.condition?.length &&
        !filters.condition.includes(car.condition as string)
      )
        return false;

      if (filters.location?.length) {
        const carLocation = `${car?.location?.city}, ${car?.location?.state}`;
        if (!filters.location.includes(carLocation)) return false;
      }

      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matches = [
          car.brand,
          car.model,
          car?.location?.city,
          car?.location?.state,
        ].some((field) => field?.toLowerCase().includes(term));
        if (!matches) return false;
      }

      return true;
    });

    setFilteredCars(filtered);
  }, [filters, searchTerm, carData]);

  const handleFilterChange = (updatedFilters: ICarFilters) => {
    setFilters(updatedFilters);
  };

  const allCars = filteredCars ?? carData?.data ?? [];
  const totalPages = Math.ceil(allCars.length / itemsPerPage);
  const carsToDisplay = allCars.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="px-2 min-h-screen pt-14 pb-4">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by brand, model, or location"
          className="bg-white dark:bg-gray-950 dark:text-gray-50 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] overflow-hidden hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300
      w-full px-6 py-3 
       border-gray-200
      focus:outline-none focus:border-transparent
      focus:ring-1 focus:ring-inset-2
      focus:ring-blue-500 focus:bg-white
      
      shadow-xs hover:shadow-sm
    "
        />
        <Search className="absolute right-3 top-3 h-5 w-5 text-primary" />
      </div>
      {/* Mobile filter toggle */}
      <div className="lg:hidden relative my-5 ">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="
    group cursor-pointer relative max-w-[300px]  px-6 py-3 rounded-lg
    bg-gradient-to-r from-blue-500 to-blue-600
    text-white font-medium shadow-md
    hover:shadow-lg hover:from-blue-600 hover:to-blue-700
    transition-all duration-300
    flex items-center justify-between
  "
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
          <span className="ml-2">
            {showFilter ? (
              <X className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            ) : (
              <Filter className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
            )}
          </span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {showFilter && carData?.data && (
        <div className="w-full mt-5 lg:hidden">
          <FilterSidebar
            cars={carData.data}
            onFilterChange={handleFilterChange}
          />
        </div>
      )}

      <div className="flex gap-8 mt-16 mb-10">
        {/* Desktop Sidebar */}
        <div className="w-full max-w-xs hidden lg:block">
          {carData?.data && (
            <FilterSidebar
              cars={carData.data}
              onFilterChange={handleFilterChange}
            />
          )}
        </div>

        {/* Car Listings */}
        <div className="flex-1">
          {filteredCars && filteredCars.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">
                No cars match your filters
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 2xsm:grid-cols-2 sm:grid-cols-3  2xl:grid-cols-4 gap-8">
              {carsToDisplay?.map((car) => (
                <CarCard car={car} key={car._id} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2 text-xs xl:text-sm">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`
    flex items-center gap-1 px-4 py-2 rounded-md 
    bg-white border border-gray-300 text-gray-700 
    font-medium transition-all duration-200
    hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}
  `}
              >
                <ChevronLeft className="h-5 w-5" />
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md font-medium transition-all cursor-pointer duration-200 ${
                    currentPage === i + 1
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className={`
    flex items-center gap-1 px-4 py-2 rounded-md 
    bg-white border border-gray-300 text-gray-700 
    font-medium transition-all duration-200
    hover:bg-gray-50 hover:border-blue-400 hover:text-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white
    ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}
  `}
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stock;
