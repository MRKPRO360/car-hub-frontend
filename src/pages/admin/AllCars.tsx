import { useEffect, useState } from 'react';
import { ICar, IResponse } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { toast } from 'sonner';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteOutline, MdOutlineEdit } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';
import {
  useDeleteACarMutation,
  useGetAllCarsQuery,
} from '../../redux/features/admin/carManagement.api';
import { Link, useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AllCars() {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const { data: cars, isLoading } = useGetAllCarsQuery(undefined);
  const navigate = useNavigate();

  const [deleteCar] = useDeleteACarMutation();
  const [data, setData] = useState<ICar[] | []>(cars?.data || []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (cars?.data?.length && data !== cars.data) {
      setData(cars?.data);
    }
  }, [cars, data]);

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
    navigate(`/dashboard/update-car/${item._id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto py-4">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] ">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Car
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Brand
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                In Stock
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Quantity
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Price
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData?.map((car, index) => (
              <TableRow className="relative" key={car?._id}>
                <TableCell className="px-4 py-3 ">
                  <Link to={`/cars/${car._id}`}>
                    <img
                      className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover"
                      src={car?.coverImage as string}
                      alt={`${car?.category} ${car?.brand}`}
                    />
                  </Link>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {car?.brand}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {car?.category}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span
                    className={`font-semibold ${
                      car.inStock ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {car.inStock ? 'Available' : 'Not available'}
                  </span>
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {car?.quantity}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {car?.price}
                </TableCell>

                <TableCell className="absolute translate-y-8 translate-x-4">
                  <BsThreeDotsVertical
                    onClick={() =>
                      setOpenActionMenuId(
                        openActionMenuId === car?._id
                          ? null
                          : (car._id as string)
                      )
                    }
                    className="action-btn text-gray-600 cursor-pointer"
                  />
                  <div
                    className={`${
                      openActionMenuId === car._id
                        ? 'opacity-100 scale-100 z-30 block'
                        : 'opacity-0 scale-90 z-[-1] hidden'
                    } ${
                      index > 0 ? 'bottom-[90%]' : '-top-10 '
                    } zenui-table absolute right-[80%] p-2 rounded-md bg-white dark:bg-gray-900  shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <button
                      onClick={() => handleUpdate(car)}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer 
                      hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                    >
                      <MdOutlineEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(car)}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer   hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                    >
                      <MdDeleteOutline />
                      Delete
                    </button>
                    <Link
                      to={`/cars/${car._id}`}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer   hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                    >
                      <IoEyeOutline />
                      View Details
                    </Link>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!paginatedData.length && (
          <p className="text-sm text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
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
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
  );
}
