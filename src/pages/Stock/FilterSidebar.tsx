import { useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ICar, ICarFilters } from '../../types';

type FilterSidebarProps = {
  cars: ICar[];
  onFilterChange: (filters: ICarFilters) => void;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  cars,
  onFilterChange,
}) => {
  // Extract unique values for each filter from the cars data
  const allBrands = [...new Set(cars.map((car) => car.brand))];
  const allCategories = [...new Set(cars.map((car) => car.category))];
  const allFuelTypes = [...new Set(cars.map((car) => car.fuelType))];
  const allTransmissions = [...new Set(cars.map((car) => car.transmission))];
  const allConditions = [...new Set(cars.map((car) => car.condition))];

  const allLocations = [
    ...new Set(
      cars.map((car) => `${car?.location?.city}, ${car?.location?.state}`)
    ),
  ];

  // Get min and max for range filters
  const minYear = Math.min(...cars.map((car) => car.year));
  const maxYear = Math.max(...cars.map((car) => car.year));
  const minPrice = Math.min(...cars.map((car) => car.price));
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const minMileage = Math.min(...cars.map((car) => car.mileage));
  const maxMileage = Math.max(...cars.map((car) => car.mileage));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<ICarFilters>({});
  const [rangeValues, setRangeValues] = useState({
    year: [minYear, maxYear] as [number, number],
    price: [minPrice, maxPrice] as [number, number],
    mileage: [minMileage, maxMileage] as [number, number],
  });

  const handleFilterToggle = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleMultiSelect = (filterName: keyof ICarFilters, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[filterName] || [];
      const newValues = currentValues.includes(value as unknown as never)
        ? (currentValues as number[] | string[]).filter((v) => v !== value)
        : [...currentValues, value];

      const newFilters = {
        ...prev,
        [filterName]: newValues.length ? newValues : undefined,
      };

      // Trigger filter change
      onFilterChange(newFilters);

      return newFilters;
    });
  };

  const handleRangeChange = (
    filterName: 'year' | 'price' | 'mileage',
    index: number,
    value: number
  ) => {
    setRangeValues((prev) => {
      const newValues = [...prev[filterName]] as [number, number];
      newValues[index] = value;

      // Sort to ensure min is first
      if (index === 0 && newValues[0] > newValues[1]) {
        newValues[1] = newValues[0];
      } else if (index === 1 && newValues[1] < newValues[0]) {
        newValues[0] = newValues[1];
      }

      const newRangeValues = { ...prev, [filterName]: newValues };

      // Update filters
      setFilters((prevFilters) => {
        const newFilters = {
          ...prevFilters,
          [filterName]:
            newValues[0] === minYear && newValues[1] === maxYear
              ? undefined
              : newValues,
        };

        onFilterChange(newFilters);
        return newFilters;
      });

      return newRangeValues;
    });
  };

  const clearFilter = (filterName: keyof ICarFilters) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [filterName]: undefined };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setFilters({});
    setRangeValues({
      year: [minYear, maxYear],
      price: [minPrice, maxPrice],
      mileage: [minMileage, maxMileage],
    });
    onFilterChange({});
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className=" bg-white dark:bg-gray-950 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 w-full px-2 py-4 sticky top-4 dark:text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
          Filters
        </h2>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          Clear all
        </button>
      </div>

      <div className="space-y-4">
        {/* Brand Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'brand'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('brand')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">Brand</p>
              {filters.brand?.length ? (
                <p className="font-medium text-gray-800">
                  {filters.brand.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400">Select brands</p>
              )}
            </div>
            {filters.brand?.length ? (
              <FiX
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('brand');
                }}
              />
            ) : activeFilter === 'brand' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'brand' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 dark:text-gray-300 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allBrands.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer "
                    onClick={() => handleMultiSelect('brand', brand)}
                  >
                    <input
                      type="checkbox"
                      checked={filters.brand?.includes(brand) || false}
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{brand}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'price'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('price')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Price Range
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-300">
                {formatPrice(rangeValues.price[0])} -{' '}
                {formatPrice(rangeValues.price[1])}
              </p>
            </div>
            {activeFilter === 'price' ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {activeFilter === 'price' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Min: {formatPrice(rangeValues.price[0])}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Max: {formatPrice(rangeValues.price[1])}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={rangeValues.price[0]}
                    onChange={(e) =>
                      handleRangeChange('price', 0, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={rangeValues.price[1]}
                    onChange={(e) =>
                      handleRangeChange('price', 1, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Year Range Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'year'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('year')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Year Range
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-300">
                {rangeValues.year[0]} - {rangeValues.year[1]}
              </p>
            </div>
            {activeFilter === 'year' ? <FiChevronUp /> : <FiChevronDown />}
          </div>

          {activeFilter === 'year' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">
                    Min: {rangeValues.year[0]}
                  </span>
                  <span className="text-sm text-gray-600">
                    Max: {rangeValues.year[1]}
                  </span>
                </div>
                <div className="flex space-x-4">
                  <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={rangeValues.year[0]}
                    onChange={(e) =>
                      handleRangeChange('year', 0, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={minYear}
                    max={maxYear}
                    value={rangeValues.year[1]}
                    onChange={(e) =>
                      handleRangeChange('year', 1, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'category'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('category')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Category
              </p>
              {filters.category?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300">
                  {filters.category.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select categories
                </p>
              )}
            </div>
            {filters.category?.length ? (
              <FiX
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('category');
                }}
              />
            ) : activeFilter === 'category' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'category' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('category', category)}
                  >
                    <input
                      type="checkbox"
                      checked={filters.category?.includes(category) || false}
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Fuel Type Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'fuelType'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('fuelType')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Fuel Type
              </p>
              {filters.fuelType?.length ? (
                <p className="font-medium text-gray-800">
                  {filters.fuelType.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select fuel types
                </p>
              )}
            </div>
            {filters.fuelType?.length ? (
              <FiX
                className="text-gray-400  hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('fuelType');
                }}
              />
            ) : activeFilter === 'fuelType' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'fuelType' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allFuelTypes.map((fuelType) => (
                  <div
                    key={fuelType}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('fuelType', fuelType)}
                  >
                    <input
                      type="checkbox"
                      checked={filters.fuelType?.includes(fuelType) || false}
                      readOnly
                      className="mr-2 rounded border-gray-300  text-blue-600 focus:ring-blue-500"
                    />
                    <span className="dark:text-gray-300">{fuelType}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Transmission Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'transmission'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('transmission')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Transmission
              </p>
              {filters.transmission?.length ? (
                <p className="font-medium text-gray-800">
                  {filters.transmission.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select transmission
                </p>
              )}
            </div>
            {filters.transmission?.length ? (
              <FiX
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('transmission');
                }}
              />
            ) : activeFilter === 'transmission' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'transmission' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allTransmissions.map((transmission) => (
                  <div
                    key={transmission}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() =>
                      handleMultiSelect('transmission', transmission)
                    }
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters.transmission?.includes(transmission) || false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{transmission}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Condition Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'condition'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('condition')}
          >
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Condition
              </p>
              {filters.condition?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300">
                  {filters.condition.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select condition
                </p>
              )}
            </div>
            {filters.condition?.length ? (
              <FiX
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('condition');
                }}
              />
            ) : activeFilter === 'condition' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'condition' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allConditions.map((condition) => (
                  <div
                    key={condition}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() =>
                      handleMultiSelect('condition', condition as string)
                    }
                  >
                    <input
                      type="checkbox"
                      checked={
                        filters.condition?.includes(condition as string) ||
                        false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="relative">
          <div
            className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
              activeFilter === 'location'
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => handleFilterToggle('location')}
          >
            <div>
              <p className="text-xs text-gray-500">Location</p>
              {filters.location?.length ? (
                <p className="font-medium text-gray-800">
                  {filters.location.join(', ')}
                </p>
              ) : (
                <p className="text-gray-400">Select locations</p>
              )}
            </div>
            {filters.location?.length ? (
              <FiX
                className="text-gray-400 hover:text-gray-600"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFilter('location');
                }}
              />
            ) : activeFilter === 'location' ? (
              <FiChevronUp />
            ) : (
              <FiChevronDown />
            )}
          </div>

          {activeFilter === 'location' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allLocations.map((location) => (
                  <div
                    key={location}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('location', location)}
                  >
                    <input
                      type="checkbox"
                      checked={filters.location?.includes(location) || false}
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>{location}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
