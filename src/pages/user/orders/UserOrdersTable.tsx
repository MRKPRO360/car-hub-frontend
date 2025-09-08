import { useEffect, useState } from 'react';
import { useGetMyOrdersQuery } from '../../../redux/features/user/selfManagement';
import Badge from '../../../components/ui/badge/Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { IOrder } from '../../../types';
import { Frown, LoaderCircle } from 'lucide-react';

export default function UserOrdersTable() {
  const { data: orders, isLoading, isError } = useGetMyOrdersQuery(undefined);

  const [data, setData] = useState<IOrder[] | []>(orders?.data || []);

  useEffect(() => {
    if (orders?.data?.length && data !== orders.data) {
      setData(orders?.data);
    }
  }, [orders, data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[65vh]">
        <p className="text-lg font-semibold text-gray-500">
          <LoaderCircle
            strokeWidth={2.5}
            size={30}
            className="text-gray-500 block dark:text-primary/80 animate-spin"
          />
        </p>
      </div>
    );
  }

  if (!data)
    return (
      <div className="flex justify-center items-center min-h-[65vh] gap-2">
        <Frown
          className="text-gray-500 dark:text-primary/80"
          strokeWidth={2.5}
        />
        <p className="text-lg font-semibold text-gray-500">
          You don't have any orders yet. Try to order something ):
        </p>
      </div>
    );

  if (isError && !isLoading)
    return (
      <div className="flex justify-center items-center h-64 gap-2">
        <Frown
          className="text-gray-500 dark:text-primary/80"
          strokeWidth={2.5}
        />
        <p className="text-lg font-semibold text-gray-500">
          Something unexpected occured. Try again later ):
        </p>
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((order) => (
              <TableRow key={order?._id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={order?.user?.profileImg as string}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
