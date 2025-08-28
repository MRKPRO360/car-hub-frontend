import {
  useGetAllOrdersAndCustomersQuery,
  useGetMonthlySalesQuery,
  useGetMonthlyTargetQuery,
} from '../redux/features/admin/orderManagement.api';

function useStatisticsData(chartType: string, refreshInterval: number) {
  const salesQuery = useGetMonthlySalesQuery(undefined, {
    skip: chartType !== 'sales',
    pollingInterval: chartType === 'sales' ? refreshInterval : undefined,
  });

  const targetQuery = useGetMonthlyTargetQuery(undefined, {
    skip: chartType !== 'target',
    pollingInterval: chartType === 'target' ? refreshInterval : undefined,
  });

  const analyticsQuery = useGetAllOrdersAndCustomersQuery(undefined, {
    skip: chartType !== 'analytics',
    pollingInterval: chartType === 'analytics' ? refreshInterval : undefined,
  });

  // selecting active query
  const activeQuery =
    chartType === 'sales'
      ? salesQuery
      : chartType === 'target'
      ? targetQuery
      : analyticsQuery;

  return {
    data: activeQuery?.data?.data,
    loading: activeQuery.isLoading,
    error: activeQuery.error,
    refetch: activeQuery.refetch,
  };
}

export default useStatisticsData;
