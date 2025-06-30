import { useEffect, useState } from 'react';
import { IResponse, IUser } from '../../types';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { toast } from 'sonner';
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { ImEyeBlocked } from 'react-icons/im';

import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useDeleteAUserMutation,
  useGetAllUsersQuery,
} from '../../redux/features/admin/userManagement.api';

export default function AllUsers() {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const { data: users, isLoading } = useGetAllUsersQuery(undefined);

  const [deleteUser] = useDeleteAUserMutation();
  const [blockUser] = useDeactivateUserMutation();
  const [unBlockUser] = useActivateUserMutation();

  const [data, setData] = useState<IUser[] | []>(users?.data || []);

  useEffect(() => {
    if (users?.data?.length && data !== users.data) {
      setData(users?.data);
    }
  }, [users, data]);

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

  const handleDelete = async (user: IUser) => {
    const toastId = toast.loading('Deleting...');

    try {
      const res = (await deleteUser(user._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('User deleted successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  const handleBlock = async (user: IUser) => {
    const toastId = toast.loading('Blocking user...');

    try {
      const res = (await blockUser(user._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('User blocked successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
  };

  const handleUnBlock = async (user: IUser) => {
    const toastId = toast.loading('UnBlocking user...');

    try {
      const res = (await unBlockUser(user._id)) as IResponse<any>;

      if (res.error) {
        toast.error(res?.error?.data?.message, { id: toastId });
      } else {
        toast.success('User unblocked successfully!', {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong!', { id: toastId, duration: 2000 });
    }
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
                User
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
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
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Deleted
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
            {paginatedData?.map((user, index) => (
              <TableRow className="relative" key={user?._id}>
                <TableCell className="px-4 py-3 ">
                  <img
                    className="w-10 h-10 sm:w-16 sm:h-16 rounded-full object-cover"
                    src={user?.profileImg}
                    alt={`${user?.name}`}
                  />
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user?.name}
                </TableCell>

                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {user?.email}
                </TableCell>

                <TableCell
                  className={`px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ${
                    !user.isBlocked ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user.isBlocked ? 'Blocked' : 'Active'}
                </TableCell>

                <TableCell
                  className={`px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 ${
                    !user.isDeleted ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user?.isDeleted ? 'Deleted' : 'N/A'}
                </TableCell>

                <TableCell className="absolute translate-y-8 translate-x-4">
                  <BsThreeDotsVertical
                    onClick={() =>
                      setOpenActionMenuId(
                        openActionMenuId === user?._id
                          ? null
                          : (user._id as string)
                      )
                    }
                    className="action-btn text-gray-600 cursor-pointer"
                  />
                  <div
                    className={`${
                      openActionMenuId === user._id
                        ? 'opacity-100 scale-100 z-30 block'
                        : 'opacity-0 scale-90 z-[-1] hidden'
                    } ${
                      index > 0 ? 'bottom-[90%]' : '-top-10 '
                    } zenui-table absolute right-[80%] p-2 rounded-md bg-white dark:bg-gray-900 dark:text-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <button
                      onClick={() => handleDelete(user)}
                      className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer   hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                    >
                      <MdDeleteOutline />
                      Delete
                    </button>
                    {!user.isBlocked && (
                      <button
                        onClick={() => handleBlock(user)}
                        className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer   hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                      >
                        <ImEyeBlocked />
                        Block
                      </button>
                    )}

                    {user.isBlocked && (
                      <button
                        onClick={() => handleUnBlock(user)}
                        className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer   hover:bg-gray-100
                      dark:hover:bg-gray-700 transition-all duration-200 dark:text-white dark:hover:text-gray-100"
                      >
                        <ImEyeBlocked />
                        UnBlock
                      </button>
                    )}
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
