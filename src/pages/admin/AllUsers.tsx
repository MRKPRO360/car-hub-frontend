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
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdDeleteOutline } from 'react-icons/md';
import { ImEyeBlocked } from 'react-icons/im';

import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useDeleteAUserMutation,
  useGetAllUsersQuery,
} from '../../redux/features/admin/userManagement.api';
import { ChevronLeft, ChevronRight, Frown, LoaderCircle } from 'lucide-react';
import Modal from '../shared/Modal';

export default function AllUsers() {
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  const { data: users, isLoading, isError } = useGetAllUsersQuery(undefined);

  const [deleteUser] = useDeleteAUserMutation();
  const [blockUser] = useDeactivateUserMutation();
  const [unBlockUser] = useActivateUserMutation();
  const [data, setData] = useState<IUser[] | []>(users?.data || []);

  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  useEffect(() => {
    if (users?.data?.length && data !== users.data) {
      setData(users?.data);
    }
  }, [users, data]);

  useEffect(() => {
    const performDelete = async () => {
      if (isConfirm && userToDelete) {
        const toastId = toast.loading('Deleting...');

        try {
          const res = (await deleteUser(userToDelete._id)) as IResponse<any>;

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
          toast.error('Something went wrong!', {
            id: toastId,
            duration: 2000,
          });
        } finally {
          setIsOpen(false);
          setIsConfirm(false);
          setUserToDelete(null);
        }
      }
    };
    performDelete();
  }, [isConfirm, userToDelete, deleteUser]);

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
        (!(event.target as HTMLElement).closest('.ch-table') &&
          !(event.target as HTMLElement).closest('.action-btn'))
      ) {
        setOpenActionMenuId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleDeleteClick = (user: IUser) => {
    setIsOpen(true);
    setUserToDelete(user);
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
      <div className="flex justify-center items-center min-h-[65vh]">
        <p className="text-lg font-semibold text-gray-500">
          <LoaderCircle
            strokeWidth={2.5}
            size={30}
            className="dark:text-primary/80 animate-spin block text-gray-500"
          />
        </p>
      </div>
    );
  }

  if (!data.length)
    return (
      <div className="flex justify-center items-center min-h-[65vh] gap-2">
        <Frown
          className="dark:text-primary/80 text-gray-500"
          strokeWidth={2.5}
        />
        <p className="text-lg font-semibold text-gray-500">
          There's no user yet ):
        </p>
      </div>
    );

  if (isError && !isLoading)
    return (
      <div className="flex items-center justify-center h-64 gap-2">
        <Frown
          className="dark:text-primary/80 text-gray-500"
          strokeWidth={2.5}
        />
        <p className="text-lg font-semibold text-gray-500">
          Something unexpected occured. Try again later ):
        </p>
      </div>
    );

  return (
    <div className=" rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full py-4 overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] ">
            <TableRow>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                User
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Email
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Deleted
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedData?.map((user, index) => (
              <TableRow className="relative" key={user?._id}>
                <TableCell className=" px-4 py-3">
                  <img
                    className="sm:w-16 sm:h-16 object-cover w-10 h-10 rounded-full"
                    src={user?.profileImg as string}
                    alt={`${user?.name}`}
                  />
                </TableCell>
                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
                  {user?.name}
                </TableCell>

                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
                  {user?.email}
                </TableCell>

                <TableCell
                  className={`px-4 py-3  text-start text-theme-sm  ${
                    !user.isBlocked ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user.isDeleted ? ' ' : user.isBlocked ? 'Blocked' : 'Active'}
                </TableCell>

                <TableCell
                  className={`px-4 py-3  text-start text-theme-sm  ${
                    !user.isDeleted ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {user?.isDeleted ? 'Deleted' : 'N/A'}
                </TableCell>

                {!user.isDeleted && (
                  <TableCell className="absolute translate-x-4 translate-y-8">
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
                      } ch-table absolute right-[80%] p-2 rounded-md bg-light dark:bg-gray-900 min-w-[160px] drop-shadow-[0_8px_8px_rgba(37,99,235,0.1)] hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.15)] dark:drop-shadow-[0_8px_4px_rgba(0,0,0,0.1)] dark:hover:drop-shadow-[0_8px_4px_rgba(0,0,0,0.3)] transition duration-300`}
                    >
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md cursor-pointer transition-all duration-200  dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300"
                      >
                        <MdDeleteOutline />
                        Delete
                      </button>
                      {!user.isBlocked && (
                        <button
                          onClick={() => handleBlock(user)}
                          className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md cursor-pointer transition-all duration-200  dark:hover:bg-gray-800 hover:bg-gray-200 text-gray-900 dark:text-gray-300"
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
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!paginatedData.length && (
          <p className="w-full py-6 text-sm text-center text-gray-500">
            No data found!
          </p>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="xl:text-sm flex justify-center mt-8 space-x-2 text-xs">
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
              <ChevronLeft className="w-5 h-5" />
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
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
      <Modal
        isModalOpen={isOpen}
        setIsModalOpen={setIsOpen}
        setIsConfirm={setIsConfirm}
        text={userToDelete ? userToDelete.name : ''}
      />
    </div>
  );
}
