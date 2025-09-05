import { useEffect, useState } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { ICar, ICarFilters } from '../../types';
import formatPrice from '../../utils/formatPrice';

type FilterSidebarProps = {
  cars: ICar[];
  onFilterChange: (filters: ICarFilters) => void;
  currentFilters?: ICarFilters;
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  cars,
  onFilterChange,
  currentFilters = {},
}) => {
  // Extract unique values for each filter from the cars data
  const [allBrands] = useState(() =>
    [...new Set(cars.map((car) => car.brand))].sort()
  );

  const [allCategories] = useState(() => [
    ...new Set(cars.map((car) => car.category)),
  ]);
  const [allFuelTypes] = useState(() => [
    ...new Set(cars.map((car) => car.fuelType)),
  ]);

  const [allTransmissions] = useState(() => [
    ...new Set(cars.map((car) => car.transmission)),
  ]);

  const [allConditions] = useState(() => [
    ...new Set(cars.map((car) => car.condition)),
  ]);

  const [allLocations] = useState(() =>
    [
      ...new Set(
        // cars.map((car) => car?.location?.country)
        cars.map(
          (car) =>
            `${
              car?.location?.city ||
              car?.location?.state ||
              car?.location?.country
            }`
        )
      ),
    ].sort()
  );

  const [yearRange, setYearRange] = useState<[number, number]>(() => [
    Math.min(...cars.map((car) => car.year)),
    Math.max(...cars.map((car) => car.year)),
  ]);

  const [priceRange, setPriceRange] = useState<[number, number]>(() => [
    Math.min(...cars.map((car) => car.price)),
    Math.max(...cars.map((car) => car.price)),
  ]);

  // Get min and max for range filters
  const minYear = Math.min(...cars.map((car) => car.year));
  const maxYear = Math.max(...cars.map((car) => car.year));
  const minPrice = Math.min(...cars.map((car) => car.price));
  const maxPrice = Math.max(...cars.map((car) => car.price));
  const minMileage = Math.min(...cars.map((car) => car.mileage));
  const maxMileage = Math.max(...cars.map((car) => car.mileage));

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const [rangeValues, setRangeValues] = useState({
    year: [minYear, maxYear] as [number, number],
    price: [minPrice, maxPrice] as [number, number],
    mileage: [minMileage, maxMileage] as [number, number],
  });

  const handleFilterToggle = (filterName: string) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const handleMultiSelect = (filterName: keyof ICarFilters, value: string) => {
    const currentValues = currentFilters[filterName] || [];
    const newValues = currentValues.includes(value as unknown as never)
      ? (currentValues as number[] | string[]).filter((v) => v !== value)
      : [...currentValues, value];

    const newFilters = {
      ...currentFilters,
      [filterName]: newValues.length ? newValues : undefined,
    };

    // Remove undefined values to clean up the filters object
    Object.keys(newFilters).forEach((key) => {
      if (newFilters[key as keyof ICarFilters] === undefined) {
        delete newFilters[key as keyof ICarFilters];
      }
    });

    onFilterChange(newFilters);
  };

  useEffect(() => {
    setRangeValues({
      year: (currentFilters.year as [number, number]) || [minYear, maxYear],
      price: (currentFilters.price as [number, number]) || [minPrice, maxPrice],
      mileage: (currentFilters.mileage as [number, number]) || [
        minMileage,
        maxMileage,
      ],
    });
  }, [
    currentFilters,
    minYear,
    maxYear,
    minPrice,
    maxPrice,
    minMileage,
    maxMileage,
  ]);

  const handleRangeChange = (
    type: 'price' | 'year',
    index: 0 | 1,
    value: number
  ) => {
    if (type === 'price') {
      const newRange: [number, number] = [...priceRange] as [number, number];
      newRange[index] = value;
      setPriceRange(newRange);
      onFilterChange?.({ ...currentFilters, price: newRange });
    }

    if (type === 'year') {
      const newRange: [number, number] = [...yearRange] as [number, number];
      newRange[index] = value;
      setYearRange(newRange);
      onFilterChange?.({ ...currentFilters, year: newRange });
    }
  };

  const clearFilter = (filterName: keyof ICarFilters) => {
    const newFilters = { ...currentFilters };
    delete newFilters[filterName];

    // Reset range values if it's a range filter
    if (
      filterName === 'year' ||
      filterName === 'price' ||
      filterName === 'mileage'
    ) {
      setRangeValues((prev) => ({
        ...prev,
        [filterName]:
          filterName === 'year'
            ? ([minYear, maxYear] as [number, number])
            : filterName === 'price'
            ? ([minPrice, maxPrice] as [number, number])
            : ([minMileage, maxMileage] as [number, number]),
      }));
    }

    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setRangeValues({
      year: [minYear, maxYear],
      price: [minPrice, maxPrice],
      mileage: [minMileage, maxMileage],
    });
    onFilterChange({});
  };

  // Check if any filters are active
  const hasActiveFilters = Object.keys(currentFilters).length > 0;

  return (
    <div className=" bg-white dark:bg-gray-950 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 w-full px-2 py-4 sticky top-4 dark:text-gray-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
          Filters
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-full">
              {Object.keys(currentFilters).length}
            </span>
          )}
        </h2>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear all
          </button>
        )}
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">Brand</p>
              {currentFilters.brand?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.brand.length === 1
                    ? currentFilters.brand[0]
                    : `${currentFilters.brand[0]} +${
                        currentFilters.brand.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select brands
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.brand?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('brand');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'brand' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'brand' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 dark:text-gray-300 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allBrands.map((brand) => (
                  <div
                    key={brand}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMultiSelect('brand', brand);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={currentFilters.brand?.includes(brand) || false}
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleMultiSelect('brand', brand);
                      }}
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Price Range
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-300 truncate">
                {formatPrice(rangeValues.price[0])} -{' '}
                {formatPrice(rangeValues.price[1])}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.price && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('price');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              )}
              {activeFilter === 'price' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'price' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Min: {formatPrice(rangeValues.price[0])}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Max: {formatPrice(rangeValues.price[1])}
                  </span>
                </div>
                {/* <div className="flex space-x-4">
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
                </div> */}

                <div className="flex space-x-4">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      handleRangeChange('price', 0, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Year Range
              </p>
              <p className="font-medium text-gray-500 dark:text-gray-300">
                {rangeValues.year[0]} - {rangeValues.year[1]}
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.year && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('year');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              )}
              {activeFilter === 'year' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'year' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 p-4">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Min: {rangeValues.year[0]}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Category
              </p>
              {currentFilters.category?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.category.length === 1
                    ? currentFilters.category[0]
                    : `${currentFilters.category[0]} +${
                        currentFilters.category.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select categories
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.category?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('category');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'category' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'category' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allCategories.map((category) => (
                  <div
                    key={category}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('category', category)}
                  >
                    <input
                      type="checkbox"
                      checked={
                        currentFilters.category?.includes(category) || false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="dark:text-gray-300">{category}</span>
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Fuel Type
              </p>
              {currentFilters.fuelType?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.fuelType.length === 1
                    ? currentFilters.fuelType[0]
                    : `${currentFilters.fuelType[0]} +${
                        currentFilters.fuelType.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select fuel types
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.fuelType?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('fuelType');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'fuelType' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'fuelType' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allFuelTypes.map((fuelType) => (
                  <div
                    key={fuelType}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('fuelType', fuelType)}
                  >
                    <input
                      type="checkbox"
                      checked={
                        currentFilters.fuelType?.includes(fuelType) || false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Transmission
              </p>
              {currentFilters.transmission?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.transmission.length === 1
                    ? currentFilters.transmission[0]
                    : `${currentFilters.transmission[0]} +${
                        currentFilters.transmission.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select transmission
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.transmission?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('transmission');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'transmission' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'transmission' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
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
                        currentFilters.transmission?.includes(transmission) ||
                        false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="dark:text-gray-300">{transmission}</span>
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Condition
              </p>
              {currentFilters.condition?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.condition.length === 1
                    ? currentFilters.condition[0]
                    : `${currentFilters.condition[0]} +${
                        currentFilters.condition.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select condition
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.condition?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('condition');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'condition' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'condition' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border border-gray-200 dark:border-blue-500 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
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
                        currentFilters.condition?.includes(
                          condition as string
                        ) || false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="dark:text-gray-300">{condition}</span>
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
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 dark:text-gray-300">
                Location
              </p>
              {currentFilters.location?.length ? (
                <p className="font-medium text-gray-800 dark:text-gray-300 truncate">
                  {currentFilters.location.length === 1
                    ? currentFilters.location[0]
                    : `${currentFilters.location[0]} +${
                        currentFilters.location.length - 1
                      } more`}
                </p>
              ) : (
                <p className="text-gray-400 dark:text-gray-300">
                  Select locations
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-2">
              {currentFilters.location?.length ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter('location');
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <FiX size={16} />
                </button>
              ) : null}
              {activeFilter === 'location' ? (
                <FiChevronUp size={16} />
              ) : (
                <FiChevronDown size={16} />
              )}
            </div>
          </div>

          {activeFilter === 'location' && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-950 border dark:border-blue-500 border-gray-200 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 max-h-60 overflow-auto">
              <div className="p-2">
                {allLocations.map((location) => (
                  <div
                    key={location}
                    className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded cursor-pointer"
                    onClick={() => handleMultiSelect('location', location)}
                  >
                    <input
                      type="checkbox"
                      checked={
                        currentFilters.location?.includes(location) || false
                      }
                      readOnly
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="dark:text-gray-300">{location}</span>
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
