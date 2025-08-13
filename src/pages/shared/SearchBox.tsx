import { Search } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { Link } from 'react-router';

function SearchBox() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const searchRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 300);

  const queryArgs = debouncedQuery
    ? [{ name: 'searchTerm', value: debouncedQuery }]
    : [];

  const { data, isFetching } = useGetAllCarsQuery(queryArgs, {
    skip: debouncedQuery.length < 1,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const suggestions = data?.data || [];

  const handleSelect = (name: string) => {
    setQuery(name);
  };

  return (
    <div className="relative" ref={searchRef}>
      <input
        value={query}
        onChange={(e) => {
          setIsOpen(true);
          setQuery(e.target.value);
        }}
        placeholder="Search cars..."
        type="text"
        className="placeholder:text-[16px] text-gray-900 dark:text-white transition duration-300 w-[200px] hover:scale-x-105 bg-primary/8 hover:bg-primary/10 px-2 py-1 rounded-full peer focus:outline-none focus:ring-1 ring-primary/20"
        aria-label="Search"
      />

      <Search className="absolute w-5 h-5 right-[6px] top-1/2 transform duration-300 -translate-y-[50%] peer-focus:right-0 peer-hover:text-blue-500 peer-dark:text-white peer-dark:hover:text-blue-500" />

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute top-12 w-full bg-light-bg dark:bg-gray-900 shadow-lg  overflow-hidden z-99 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300">
          {isFetching ? (
            <li className="dropdown-item py-2.5 px-5 text-gray-900 dark:text-gray-300 text-sm transition duration-300 min-h-10 ">
              Loading...
            </li>
          ) : (
            suggestions.map((car) => (
              <Link
                to={`/cars/${car._id}`}
                key={car._id}
                onClick={() => {
                  setIsOpen(false);
                  handleSelect(car.brand);
                }}
                className="dropdown-item py-2.5 px-5 flex items-center dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300 text-sm transition duration-300 cursor-pointer "
              >
                {car.brand} - {car.year}
              </Link>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
