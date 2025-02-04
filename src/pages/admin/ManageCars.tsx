import React, { useEffect, useMemo, useState } from 'react';
import { HiOutlineArrowsUpDown } from 'react-icons/hi2';
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';

import { ICar, IResponse } from '../../types';

import { IoIosSearch } from 'react-icons/io';
import { toast } from 'sonner';
import {
  useDeleteACarMutation,
  useGetAllCarsQuery,
} from '../../redux/features/admin/carManagement.api';
import { IoEyeOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router';

const ManageCars: React.FC = () => {
  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  const navigate = useNavigate();

  const [deleteCar] = useDeleteACarMutation();
  const [data, setData] = useState<ICar[]>(cars?.data || []);

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

  const handleDelete = async (item: ICar) => {
    const toastId = toast.loading('Deleting...');

    try {
      const res = (await deleteCar(item._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Car deleted successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  const handleUpdate = async (item: ICar) => {
    navigate(`/admin/dashboard/manage-cars/${item.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto p-6 ">
      <div className="customTable overflow-y-auto p-8 mb-4 w-full flex items-center flex-col gap-5 justify-center">
        <div className="w-full">
          {/* Search Input */}

          <div className="relative w-full mb-4 product_search_input">
            <input
              className="px-4 py-2 shadow-sm shadow-blue/15 rounded-sm w-full pl-[40px] outline-none focus:border-blue"
              placeholder="Search by brand, model, category etc..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          </div>
          {/* Table */}
          <div className="customTable w-full rounded-md border  border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {['Image', 'Brand', 'category', 'inStock', 'quantity'].map(
                    (key) => (
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
                    )
                  )}
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
                    <td className="p-3 ">
                      <img
                        className="w-10 h-10 sm:w-16 sm:h-16 object-cover"
                        src={`${item.img}`}
                        alt=""
                      />
                    </td>
                    <td className="p-3">{item.brand}</td>
                    <td className="p-3">{item.category}</td>

                    <td className="p-3">
                      <p
                        className={`font-semibold ${
                          item.inStock ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {item.inStock ? 'Available' : 'Not available'}
                      </p>
                    </td>

                    <td className="p-3">{item.quantity}</td>

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
                        <button
                          onClick={() => handleUpdate(item)}
                          className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                        >
                          <MdOutlineEdit />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                        >
                          <MdDeleteOutline />
                          Delete
                        </button>
                        <Link
                          to={`/cars/${item._id}`}
                          className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200"
                        >
                          <IoEyeOutline />
                          View Details
                        </Link>
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
      </div>
    </div>
  );
};

export default ManageCars;
