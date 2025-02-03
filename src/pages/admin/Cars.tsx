import React, { useEffect, useMemo, useState } from 'react';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';
import { useGetAllCarsQuery } from '../../redux/features/admin/carManagement.api';
import { ICar } from '../../types';
import { FiSearch } from 'react-icons/fi';
// import Modal from '../shared/Modal';

const Table: React.FC = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  const [data, setData] = useState<Partial<ICar>[]>(cars?.data || []);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isConfirm, setIsConfirm] = useState(false);

  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ICar | null;
    direction: 'asc' | 'desc';
  }>({
    key: null,
    direction: 'asc',
  });
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    if (cars?.data?.length && data !== cars.data) {
      setData(cars?.data);
    }
  }, [cars, data]);

  // Handle search filtering
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value?.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Handle sorting
  const handleSort = (key: keyof ICar) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key!]! < b[sortConfig.key!]!)
        return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key!]! > b[sortConfig.key!]!)
        return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !event.target ||
        (!(event.target as HTMLElement).closest('.zenui-table') &&
          !(event.target as HTMLElement).closest('.action-btn'))
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  // const handleClick = (item: ICar) => {
  //   setIsModalOpen(true);
  // };

  return (
    <div className="customTable overflow-y-auto p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
      <div className="w-full mx-auto p-4">
        {/* Search Input */}
        <div className="relative w-full max-w-[350px] md:max-w-[500px] mb-3">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by brand, model, inStock etc..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition"
          />
        </div>
        {/* Table */}
        <div className="customTable w-full rounded-md border overflow-hidden border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                {['brand', 'model', 'year', 'price', 'inStock'].map((key) => (
                  <th
                    key={key}
                    className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  >
                    <div className="flex items-center gap-1">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <HiOutlineArrowsUpDown
                        onClick={() => handleSort(key as keyof ICar)}
                        className="hover:bg-gray-200 p-1 rounded-md text-[1.6rem] cursor-pointer"
                      />
                    </div>
                  </th>
                ))}
                <th className="p-3 text-left font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-3">{item.brand}</td>
                  <td className="p-3">{item.model}</td>
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">
                    ${(item?.price as number).toLocaleString()}
                  </td>
                  <td
                    className={`p-3 font-semibold ${
                      item.inStock ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {item.inStock ? 'Available' : 'Not Available'}
                  </td>
                  <td className="p-3 relative">
                    <BsThreeDotsVertical
                      onClick={() =>
                        setOpenActionMenuId(
                          openActionMenuId === item?._id
                            ? null
                            : (item._id as string)
                        )
                      }
                      className="action-btn text-gray-600 cursor-pointer"
                    />
                    <div
                      className={`${
                        openActionMenuId === item._id
                          ? 'opacity-100 scale-100 z-30'
                          : 'opacity-0 scale-90 z-[-1]'
                      } ${
                        index > 0 ? 'bottom-[90%]' : 'top-[90%]'
                      } zenui-table absolute right-[80%] p-2 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                    >
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <MdOutlineEdit />
                        Edit
                      </p>
                      <button
                        // onClick={() => handleClick(item)}
                        className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                      >
                        <MdDeleteOutline />
                        Delete
                      </button>
                      <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                        <IoEyeOutline />
                        View Details
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {!paginatedData.length && (
            <p className="text-sm text-gray-500 py-6 text-center w-full">
              No data found!
            </p>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue text-white px-[10px] text-[0.9rem] py-[1px] rounded-md cursor-pointer'
                    : 'border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md cursor-pointer'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
            >
              <BsChevronRight />
            </button>
          </div>
        )}
      </div>

      {/* <Modal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setIsConfirm={setIsConfirm}
      /> */}
    </div>
  );
};

export default Table;
