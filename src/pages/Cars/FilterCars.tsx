import { useState } from 'react';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';

import { ICar } from '../../types';
import { IoIosSearch } from 'react-icons/io';
import CarouselCarCard from '../shared/CarouselCard';

function FilterCars() {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);

  const [inputText, setInputText] = useState('');

  const [minPrice, setMinPrice] = useState<number | string>('');
  const [maxPrice, setMaxPrice] = useState<number | string>('');

  const [filters, setFilters] = useState<Record<string, string>>({
    brand: 'All',
    model: 'All',
    category: 'All',
    inStock: 'All',
  });

  // Get unique filter options dynamically
  const getUniqueValues = (key: keyof ICar) => [
    'All',
    ...new Set(cars?.data?.map((item) => item[key])),
  ];

  // Apply multiple filters
  const filteredData = cars?.data?.filter((item) => {
    const matchesFilters =
      (filters.brand === 'All' || item.brand === filters.brand) &&
      (filters.model === 'All' || item.model === filters.model) &&
      (filters.category === 'All' || item.category === filters.category) &&
      (filters.inStock === 'All' ||
        item.inStock === (filters.inStock === 'true')) &&
      (minPrice === '' || item.price >= Number(minPrice)) &&
      (maxPrice === '' || item.price <= Number(maxPrice));

    const matchesSearch =
      inputText.trim() === '' ||
      item.brand.toLowerCase().includes(inputText.toLowerCase()) ||
      item.model.toLowerCase().includes(inputText.toLowerCase()) ||
      item.category.toLowerCase().includes(inputText.toLowerCase()) ||
      (item.inStock ? 'in stock' : 'out of stock').includes(
        inputText.toLowerCase()
      );

    return matchesFilters && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <div className="p-6 bg-white shadow-lg rounded-sm">
      <div className="relative w-full mb-4 product_search_input">
        <input
          className="px-4 py-2 shadow-sm shadow-blue/15 rounded-sm w-full pl-[40px] outline-none focus:border-blue"
          placeholder="Search by category, brand, name, stock etc..."
          onChange={(e) => setInputText(e.target.value)}
        />
        <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
      </div>

      <h2 className="text-xl font-bold mb-4">Filter Vehicles</h2>

      {/* Filter Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {['brand', 'model', 'category'].map((key) => (
          <select
            key={key}
            className="w-full p-3   rounded-sm bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue/50"
            value={filters[key]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
          >
            {getUniqueValues(key as keyof ICar).map((option) => (
              <option key={option?.toString()} value={String(option)}>
                {String(option)}
              </option>
            ))}
          </select>
        ))}

        {/* Stock Filter */}
        <select
          className="w-full p-3   rounded-sm bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue/50"
          value={filters.inStock}
          onChange={(e) => setFilters({ ...filters, inStock: e.target.value })}
        >
          <option value="All">All Stock</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <div className="flex flex-col">
          <label htmlFor="minPrice" className="text-sm">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            placeholder="Min"
            className="p-3 rounded-sm bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue/50"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="maxPrice" className="text-sm">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            placeholder="Max"
            className="p-3 rounded-sm bg-white shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue/50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 overflow-hidden">
        {filteredData && filteredData?.length > 0 ? (
          filteredData?.map((el) => <CarouselCarCard key={el._id} car={el} />)
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}

export default FilterCars;
