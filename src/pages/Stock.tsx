import { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Filter, Search, X } from 'lucide-react';
import { useGetAllCarsQuery } from '../redux/features/admin/carManagement.api';
import CarCard from './shared/CarCard';
import FilterSidebar from './Stock/FilterSidebar';
import { ICarFilters, IQueryParam } from '../types';
import useDebounce from '../hooks/useDebounce';
import CarouselSkeletonCard from './shared/CarouselSkeletonCard';

function Stock() {
  const [showFilter, setShowFilter] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<ICarFilters>({});

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const queryParams = useMemo(() => {
    const params: IQueryParam[] = [];

    // PAGINATION
    params.push({ name: 'page', value: currentPage.toString() });
    params.push({ name: 'limit', value: itemsPerPage.toString() });

    // SEARCH
    if (debouncedSearchTerm.trim()) {
      params.push({ name: 'searchTerm', value: debouncedSearchTerm });
    }

    // FILTER
    if (filters.brand?.length) {
      filters.brand.forEach((brand) => {
        params.push({ name: 'brand', value: brand });
      });
    }

    if (filters.category?.length) {
      filters.category.forEach((cat) => {
        params.push({ name: 'category', value: cat });
      });
    }

    if (filters.fuelType?.length) {
      filters.fuelType.forEach((fuel) => {
        params.push({ name: 'fuelType', value: fuel });
      });
    }

    if (filters.transmission?.length) {
      filters.transmission.forEach((tran) => {
        params.push({ name: 'transmission', value: tran });
      });
    }

    if (filters.condition?.length) {
      filters.condition.forEach((cond) => {
        params.push({ name: 'condition', value: cond });
      });
    }

    if (filters.location?.length) {
      params.push({ name: 'searchTerm', value: filters.location.join(',') });
    }

    if (filters.year?.length === 2) {
      params.push({ name: 'year[gte]', value: filters.year[0].toString() });
      params.push({ name: 'year[lte]', value: filters.year[1].toString() });
    }

    if (filters.price?.length === 2) {
      params.push({ name: 'price[gte]', value: filters.price[0].toString() });
      params.push({ name: 'price[lte]', value: filters.price[1].toString() });
    }

    return params;
  }, [currentPage, debouncedSearchTerm, filters]);

  const handleFilterChange = useCallback((updatedFilters: ICarFilters) => {
    setFilters(updatedFilters);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const {
    data: carsData,
    isError,
    isLoading,
  } = useGetAllCarsQuery(queryParams);

  const cars = carsData?.data || [];
  const totalCars = carsData?.meta?.total || 0;
  const totalPages = carsData?.meta?.totalPage || 1;

  if (isError) {
    return (
      <div className="pt-14 min-h-screen px-2 pb-4">
        <div className="py-10 text-center">
          <h3 className="text-lg font-medium text-red-600">
            Error loading cars
          </h3>
          <p className="mt-2 text-gray-500">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-14 min-h-screen px-2 pb-4">
      <div className="relative w-full">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
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
        <Search className="right-3 top-3 text-primary absolute w-5 h-5" />
      </div>

      <div className="mt-4 text-sm text-gray-600">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <span>
            Showing {cars.length} of {totalCars} cars
            {debouncedSearchTerm && ` for "${debouncedSearchTerm}"`}
          </span>
        )}
      </div>

      {/* Mobile filter toggle */}
      <div className="lg:hidden  relative my-5">
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
              <X className="group-hover:scale-110 w-5 h-5 transition-transform duration-300" />
            ) : (
              <Filter className="group-hover:scale-110 w-5 h-5 transition-transform duration-300" />
            )}
          </span>
        </button>
      </div>

      {/* Mobile Sidebar */}
      {showFilter && (
        <div className="lg:hidden w-full mt-5">
          <FilterSidebar
            cars={cars || []}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </div>
      )}

      <div className="flex gap-8 mt-16 mb-10">
        {/* Desktop Sidebar */}
        <div className="lg:block hidden w-full max-w-xs">
          <FilterSidebar
            cars={cars || []}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />
        </div>

        {/* Car Listings */}
        <div className="flex-1">
          {isLoading ? (
            <div className="2xsm:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 grid grid-cols-1 gap-8">
              {Array.from({ length: itemsPerPage }).map((_, index: number) => (
                <CarouselSkeletonCard key={index} />
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="text-lg font-medium">
                {debouncedSearchTerm || Object.keys(filters).length > 0
                  ? 'No cars match your search criteria'
                  : 'No cars available'}
              </h3>
              <p className="mt-2 text-gray-500">
                {debouncedSearchTerm || Object.keys(filters).length > 0
                  ? 'Try adjusting your search or filter criteria'
                  : 'Please check back later'}
              </p>
            </div>
          ) : (
            <div className="2xsm:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 grid grid-cols-1 gap-8">
              {cars?.map((car) => (
                <CarCard car={car} key={car._id} />
              ))}
            </div>
          )}

          {/* {filteredCars && filteredCars.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="text-lg font-medium">
                No cars match your filters
              </h3>
              <p className="mt-2 text-gray-500">
                Try adjusting your filter criteria
              </p>
            </div>
          ) : (
            <div className="2xsm:grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4 grid grid-cols-1 gap-8">
              {carsToDisplay?.map((car) => (
                <CarCard car={car} key={car._id} />
              ))}
            </div>
          )} */}

          {totalPages > 1 && (
            <div className="xl:text-sm flex justify-center mt-8 space-x-2 text-xs">
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
                <ChevronLeft className="w-5 h-5" />
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
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stock;
