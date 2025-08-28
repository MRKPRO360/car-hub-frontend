import { useEffect, useState } from 'react';
import {
  useDeleteAnOrderMutation,
  useGetAllOrdersQuery,
  useUpdateAnOderStatusMutation,
} from '../../redux/features/admin/orderManagement.api';
import { IOrder, IResponse } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import Badge from '../../components/ui/badge/Badge';
import { toast } from 'sonner';
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { IoEyeOutline } from 'react-icons/io5';

export default function CustomerOrders() {
  const { data: orders, isLoading } = useGetAllOrdersQuery(undefined);
  const [data, setData] = useState<IOrder[] | []>(orders?.data || []);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const [deleteOrder] = useDeleteAnOrderMutation();
  const [updateStatus] = useUpdateAnOderStatusMutation();

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

  const handleDelete = async (item: IOrder) => {
    const toastId = toast.loading('Deleting...');

    try {
      const res = (await deleteOrder(item._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Deleted successfully!', { id: toastId, duration: 2000 });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  const handleStatusUpdate = async (item: IOrder) => {
    const toastId = toast.loading('Updating status...');
    console.log(item._id);

    try {
      const res = (await updateStatus(item._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('Status updated successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  useEffect(() => {
    if (orders?.data?.length && data !== orders.data) {
      setData(orders?.data);
    }
  }, [orders, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto py-4 ">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] ">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Car Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Transection Id
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
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
            {paginatedData?.map((order, index) => (
              <TableRow className="relative" key={order?._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order?.user.profileImg as string}
                        alt={order?.user.name}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {order?.user.name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {order?.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order?.user.email}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order?.cars[0].car.brand} {order?.cars[0].car.category}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {order?.transaction?.id}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={
                      order?.status === 'PAID'
                        ? 'success'
                        : order?.status === 'COMPLETED'
                        ? 'success'
                        : order?.status === 'PENDING'
                        ? 'warning'
                        : 'error'
                    }
                  >
                    {/* 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'PAID' | 'SHIPPED'; */}
                    {order?.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {order?.totalPrice}
                </TableCell>

                <TableCell className="absolute translate-y-4 translate-x-4">
                  <BsThreeDotsVertical
                    onClick={() =>
                      setOpenActionMenuId(
                        openActionMenuId === order?._id
                          ? null
                          : (order._id as string)
                      )
                    }
                    className="action-btn text-gray-600 cursor-pointer"
                  />
                  <div
                    className={`${
                      openActionMenuId === order._id
                        ? 'opacity-100 scale-100 z-30'
                        : 'opacity-0 scale-90 z-[-1]'
                    } ${
                      index > 0 ? 'bottom-[90%]' : '-top-10 '
                    } zenui-table absolute right-[80%] p-2 rounded-md bg-white dark:bg-gray-900 dark:text-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <button
                      onClick={() => handleDelete(order)}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                      <MdDeleteOutline />
                      Delete
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(order)}
                      className="bg-white dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-100 transition-all duration-200"
                    >
                      <IoEyeOutline />
                      Change Status
                    </button>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="border border-gray-200 dark:border-blue-950 text-gray-300  hover:bg-gray-50 cursor-pointer px-2 text-[0.9rem] py-[8px] rounded-md"
            >
              <BsChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-950 text-white dark:text-gray-300 dark:border-gray-900 text-[0.9rem]  rounded-md cursor-pointer'
                    : 'border border-gray-200 text-gray-500 dark:text-gray-300 dark:border-gray-900 text-[0.9rem]  rounded-md cursor-pointer'
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
              className="border border-gray-200  hover:bg-gray-50 dark:border-blue-950 text-gray-300 cursor-pointer px-2 text-[0.9rem] py-[8px] rounded-md"
            >
              <BsChevronRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
