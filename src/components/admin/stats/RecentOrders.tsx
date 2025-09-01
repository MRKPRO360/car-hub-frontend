import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '../../ui/table';
import Badge from '../../ui/badge/Badge';
import { useCallback, useEffect, useRef, useState } from 'react';
import { IOrder, IQueryParam, IRecentOrders } from '../../../types';
import { useGetAllOrdersQuery } from '../../../redux/features/admin/orderManagement.api';
import Cta from '../../../pages/shared/Cta';
import formateDate from '../../../utils/formatDate';
import formatPrice from '../../../utils/formatPrice';
import { Frown } from 'lucide-react';

export default function RecentOrders({
  limit = 10,
  showFilters = true,
  showPagination = true,
  title = 'Recent Orders',
}: IRecentOrders) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [curPage, setCurPage] = useState(1);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!showFilterDropdown) return;
    const handleDropdownOutside = (e: MouseEvent) => {
      console.log(e);

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };

    window.addEventListener('mousedown', handleDropdownOutside);

    return () => {
      window.removeEventListener('mousedown', handleDropdownOutside);
    };
  }, [showFilterDropdown]);

  const buildQueryParams = useCallback((): IQueryParam[] => {
    const params: IQueryParam[] = [
      { name: 'limit', value: limit.toString() },
      { name: 'page', value: curPage.toString() },
      { name: 'sort', value: '-createdAt' },
    ];

    if (searchTerm.trim()) {
      params.push({ name: 'searchTerm', value: searchTerm.trim() });
    }

    if (selectedStatus) {
      params.push({ name: 'status', value: selectedStatus });
    }

    return params;
  }, [limit, curPage, searchTerm, selectedStatus]);

  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useGetAllOrdersQuery(buildQueryParams());

  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Shipped', label: 'Shipped' },
    { value: 'Completed', label: 'Completed' },
    { value: 'Canceled', label: 'Canceled' },
  ];

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    setCurPage(1);
    setShowFilterDropdown(false);
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedStatus('');
    setCurPage(1);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'canceled':
        return 'error';
      case 'shipped':
        return 'primary';
      case 'paid':
        return 'info';
      default:
        return;
    }
  };

  if (isLoading || !orders) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500">
          Loading customer orders data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-500 mb-2">Error loading orders</p>
            <button onClick={refetch}>
              <Cta size="xs" text="Try Again!" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {orders.meta && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing {orders.data.length} of {orders.meta.total} orders
            </p>
          )}
        </div>

        {showFilters && (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {showFilters && (
              <div className="flex items-center gap-3">
                {/* Status Filter Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z"
                      />
                    </svg>
                    {selectedStatus || 'Filter Status'}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showFilterDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 z-10 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 drop-shadow-[0_8px_8px_rgba(37,99,235,0.08)]  ring-1 ring-primary drop ring-opacity-5"
                    >
                      <div className="py-1">
                        {statusOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setShowFilterDropdown(!showFilterDropdown);
                              return handleStatusChange(option.value);
                            }}
                            className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                              selectedStatus === option.value
                                ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Clear Filters */}
                {(searchTerm || selectedStatus) && (
                  <button
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Clear
                  </button>
                )}

                {/* Refresh Button */}
                <button
                  onClick={() => refetch()}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white  text-sm px-3 py-[8px] font-medium  hover:bg-gray-50 dark:border-gray-700  dark:text-gray-400 dark:hover:bg-white/[0.03] shadow-theme-xs text-gray-900  dark:bg-gray-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
            <TableRow>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Customer & Items
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Order Date
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Total Price
              </TableCell>
              <TableCell
                isHeader
                className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {orders.data.length === 0 ? (
              <TableRow className="w-full">
                <TableCell colSpan={6} className="py-12 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Frown className="text-gray-500" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {searchTerm || selectedStatus
                        ? 'No orders match your filters'
                        : 'No orders found'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              orders.data.map((order: IOrder) => (
                <TableRow key={order._id} className="">
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-20 w-20 overflow-hidden rounded-md bg-gray-100 dark:bg-gray-800">
                        {order.cars[0]?.car ? (
                          <img
                            src={order.cars[0]?.car.coverImage as string}
                            className="h-full w-full object-contain"
                            alt={`${order.cars[0]?.car.brand} ${order.cars[0]?.car.model}`}
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center">
                            <svg
                              className="h-5 w-5 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm dark:text-white/90">
                          {order.user.name}
                        </p>
                        <span className="text-gray-500 text-xs dark:text-gray-400">
                          {order.cars[0]?.car ? order.cars.length : 'No items'}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formateDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {formatPrice(order.totalPrice)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <Badge size="sm" color={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && orders.meta && orders.meta.totalPage >= 1 && (
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <span>
              Page {curPage} of {orders.meta.totalPage}
            </span>
            <span>•</span>
            <span>{orders.meta.total} total orders</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurPage((prev) => Math.max(prev - 1, 1))}
              disabled={curPage === 1}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex items-center gap-1">
              {Array.from(
                { length: Math.min(5, orders.meta.totalPage) },
                (_, i) => {
                  const pageNum = curPage <= 3 ? i + 1 : curPage - 2 + i;
                  if (pageNum > orders.meta.totalPage) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurPage(pageNum)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        curPage === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}
            </div>

            <button
              onClick={() =>
                setCurPage((prev) => Math.min(prev + 1, orders.meta.totalPage))
              }
              disabled={curPage === orders.meta.totalPage}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Next
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
