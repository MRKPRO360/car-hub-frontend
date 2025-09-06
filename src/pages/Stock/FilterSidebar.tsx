import { useState, useEffect, useMemo } from 'react';
import { FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { ICar, ICarFilters } from '../../types';
import formatPrice from '../../utils/formatPrice';
import useDebounce from '../../hooks/useDebounce';

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
  const allBrands = useMemo(
    () => [...new Set(cars.map((car) => car.brand))].sort(),
    [cars]
  );

  const allCategories = useMemo(
    () => [...new Set(cars.map((car) => car.category))],
    [cars]
  );
  const allFuelTypes = useMemo(
    () => [...new Set(cars.map((car) => car.fuelType))],
    [cars]
  );

  const allTransmissions = useMemo(
    () => [...new Set(cars.map((car) => car.transmission))],
    [cars]
  );

  const allConditions = useMemo(
    () => [...new Set(cars.map((car) => car.condition))],
    [cars]
  );

  const allLocations = useMemo(
    () =>
      [
        ...new Set(
          cars.map(
            (car) =>
              `${
                car?.location?.city ||
                car?.location?.state ||
                car?.location?.country
              }`
          )
        ),
      ].sort(),
    [cars]
  );

  // Get min and max for range filters with safety checks
  const getMinMax = (
    values: number[],
    fallbackMin: number,
    fallbackMax: number
  ) => {
    if (values.length === 0) {
      return { min: fallbackMin, max: fallbackMax };
    }
    const min = Math.min(...values);
    const max = Math.max(...values);
    return {
      min: isFinite(min) ? min : fallbackMin,
      max: isFinite(max) ? max : fallbackMax,
    };
  };

  const yearValues = cars
    .map((car) => car.year)
    .filter((year) => typeof year === 'number' && isFinite(year));
  const priceValues = cars
    .map((car) => car.price)
    .filter((price) => typeof price === 'number' && isFinite(price));

  const { min: minYear, max: maxYear } = getMinMax(yearValues, 2020, 2025);
  const { min: minPrice, max: maxPrice } = getMinMax(
    priceValues,
    10000,
    100000
  );

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Simple range state - no complex useEffect logic
  const [yearRange, setYearRange] = useState<[number, number]>([
    minYear,
    maxYear,
  ]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    minPrice,
    maxPrice,
  ]);

  const debouncedYearRange = useDebounce(yearRange, 500);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  // Sync range sliders with current filters
  useEffect(() => {
    if (
      currentFilters.year &&
      Array.isArray(currentFilters.year) &&
      currentFilters.year.length === 2
    ) {
      setYearRange(currentFilters.year as [number, number]);
    } else if (!currentFilters.year) {
      // Reset to default range when no year filter is set
      setYearRange([minYear, maxYear]);
    }

    if (
      currentFilters.price &&
      Array.isArray(currentFilters.price) &&
      currentFilters.price.length === 2
    ) {
      setPriceRange(currentFilters.price as [number, number]);
    } else if (!currentFilters.price) {
      // Reset to default range when no price filter is set
      setPriceRange([minPrice, maxPrice]);
    }
  }, [currentFilters, minYear, maxYear, minPrice, maxPrice]);

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

  // Simple range change handlers
  const handleYearRangeChange = (value: number | number[]) => {
    const newRange = value as [number, number];
    setYearRange(newRange);
    onFilterChange({ ...currentFilters, year: newRange });
  };

  const handlePriceRangeChange = (value: number | number[]) => {
    const newRange = value as [number, number];
    setPriceRange(newRange);
    onFilterChange({ ...currentFilters, price: newRange });
  };

  const clearFilter = (filterName: keyof ICarFilters) => {
    const newFilters = { ...currentFilters };
    delete newFilters[filterName];

    // Reset range values if it's a range filter
    if (filterName === 'year') {
      setYearRange([minYear, maxYear]);
    } else if (filterName === 'price') {
      setPriceRange([minPrice, maxPrice]);
    }

    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    setYearRange([minYear, maxYear]);
    setPriceRange([minPrice, maxPrice]);
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
                {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
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
                    Min: {formatPrice(priceRange[0])}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Max: {formatPrice(priceRange[1])}
                  </span>
                </div>
                <Slider
                  range
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                  className="mb-2"
                />
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
                {yearRange[0]} - {yearRange[1]}
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
                    Min: {yearRange[0]}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Max: {yearRange[1]}
                  </span>
                </div>
                <Slider
                  range
                  min={minYear}
                  max={maxYear}
                  value={yearRange}
                  onChange={handleYearRangeChange}
                  className="mb-2"
                />
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
