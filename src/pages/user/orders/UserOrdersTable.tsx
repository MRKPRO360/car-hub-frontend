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
  console.log(data);

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
          You don't have any orders yet. Try to order something ):
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
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
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
                Email
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Car Name
              </TableCell>
              <TableCell
                isHeader
                className="text-start text-theme-xs dark:text-gray-400 px-5 py-3 font-medium text-gray-500"
              >
                Transection Id
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
                Price
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {data?.map((order) => (
              <TableRow key={order?._id}>
                <TableCell className="sm:px-6 text-start px-5 py-4">
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
                      <span className="text-theme-sm dark:text-white/90 block font-medium text-gray-800">
                        {order?.user.name}
                      </span>
                      <span className="text-theme-xs dark:text-gray-400 block text-gray-500">
                        {order?.user.role}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
                  {order?.user.email}
                </TableCell>

                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
                  {order?.cars[0].car.brand} {order?.cars[0].car.category}
                </TableCell>

                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
                  {order?.transaction?.id}
                </TableCell>

                <TableCell className="text-start text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
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
                <TableCell className="text-theme-sm dark:text-gray-400 px-4 py-3 text-gray-500">
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
