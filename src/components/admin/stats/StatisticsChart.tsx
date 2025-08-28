/* eslint-disable no-case-declarations */
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import ChartTab from '../../../pages/shared/ChartTab';
import { useState } from 'react';
import {
  IChartType,
  ICustomerOrderAnalytics,
  IMonthlySales,
  IMonthlyTargetDetails,
} from '../../../types';
import useStatisticsData from '../../../hooks/useStatisticsData';
import { months } from '../../../constant/city';

export default function StatisticsChart() {
  const [chartType, setChartType] = useState<IChartType>('sales');

  const { data, loading, error, refetch } = useStatisticsData(chartType, 50000);

  const transformChartData = () => {
    if (!data) return { series: [], categories: [], title: '', subtitle: '' };

    switch (chartType) {
      case 'sales':
        const salesData = data as IMonthlySales[];
        if (!Array.isArray(salesData) || salesData.length === 0) {
          return {
            series: [],
            categories: [],
            title: 'Monthly Sales & Revenue',
            subtitle: 'No data available',
          };
        }
        return {
          series: [
            {
              name: 'Sales',
              data: salesData.map((item) => item.sales),
            },
            {
              name: 'Revenue',
              data: salesData.map((item) => Math.round(item.revenue / 1000)),
            },
          ],
          categories: salesData.map((item) => item.month),
          title: 'Monthly Sales & Revenue',
          subtitle: 'Track your monthly performance metrics',
        };

      case 'target':
        const targetData = data as IMonthlyTargetDetails;
        const curMonth = new Date().getMonth();

        if (!targetData || typeof targetData !== 'object') {
          return {
            series: [],
            categories: [],
            title: 'Monthly Target vs Actual',
            subtitle: 'No data available',
          };
        }

        const targetVsActual = months.map((month, index) => {
          if (index === curMonth) {
            return {
              target: Math.round(targetData.targetAmount / 1000),
              actual: Math.round(targetData.curRevenue / 1000),
            };
          } else if (index < curMonth) {
            return {
              target: Math.round(targetData.targetAmount / 1000),
              actual: Math.round((targetData.targetAmount * 0.8) / 1000),
            };
          } else {
            return {
              target: Math.round(targetData.targetAmount / 1000),
              actual: 0,
            };
          }
        });

        return {
          series: [
            {
              name: 'Target',
              data: targetVsActual.map((item) => item.target),
            },
            {
              name: 'Actual',
              data: targetVsActual.map((item) => item.actual),
            },
          ],
          categories: months,
          title: 'Monthly Target vs Actual',
          subtitle: `Current Progress ${targetData.progressPercentage.toFixed(
            1
          )}% | Growth: ${targetData.growthPercentage}% ${
            targetData.isGrowthPositive ? '↑' : '↓'
          }`,
        };

      case 'analytics':
        const analyticsData = data as ICustomerOrderAnalytics;

        if (!analyticsData || !analyticsData.cur || !analyticsData.prev) {
          return {
            series: [],
            categories: [],
            title: 'Customer & Order Analytics',
            subtitle: 'No data available',
          };
        }

        return {
          series: [
            {
              name: 'Current Month',
              data: [
                analyticsData.cur.customers.length,
                analyticsData.cur.orders.length,
              ],
            },
            {
              name: 'Previous Month',
              data: [
                analyticsData.prev.customers.length,
                analyticsData.prev.orders.length,
              ],
            },
          ],
          categories: ['Customers', 'Orders'],
          title: 'Customer & Order Analytics',
          subtitle: `Customer Growth: ${analyticsData.analytics.customerChange}% | Order Growth: ${analyticsData.analytics.orderChange}%`,
        };

      default:
        return { series: [], categories: [], title: '', subtitle: '' };
    }
  };

  const { series, categories, title, subtitle } = transformChartData();

  const isValidSeriesData =
    series &&
    series.length > 0 &&
    series.every((s) => s.data && Array.isArray(s.data) && s.data.length > 0);

  const isValidCategories =
    categories && Array.isArray(categories) && categories.length > 0;

  const options: ApexOptions = {
    legend: {
      show: false, // Hide legend
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#465FFF', '#9CB9FF'], // Define line colors
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'line', // Set the chart type to 'line'
      toolbar: {
        show: false, // Hide chart toolbar
      },
    },
    stroke: {
      curve: 'straight', // Define the line style (straight, smooth, or step)
      width: [2, 2], // Line width for each dataset
    },

    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0, // Size of the marker points
      strokeColors: '#fff', // Marker border color
      strokeWidth: 2,
      hover: {
        size: 6, // Marker size on hover
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false, // Hide grid lines on x-axis
        },
      },
      yaxis: {
        lines: {
          show: true, // Show grid lines on y-axis
        },
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels
    },
    tooltip: {
      enabled: true, // Enable tooltip
      x: {
        format: 'dd MMM yyyy', // Format for x-axis tooltip
      },
    },
    xaxis: {
      type: 'category', // Category-based x-axis
      categories: isValidCategories ? categories : [],
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
      tooltip: {
        enabled: false, // Disable tooltip for x-axis points
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '12px', // Adjust font size for y-axis labels
          colors: ['#6B7280'], // Color of the labels
        },
      },
      title: {
        text: '', // Remove y-axis title
        style: {
          fontSize: '0px',
        },
      },
    },
    noData: {
      text: 'No data available',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#6B7280',
        fontSize: '14px',
        fontFamily: 'Outfit, sans-serif',
      },
    },
  };

  // Error state
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-800 dark:bg-red-900/20">
        <p className="text-red-600 dark:text-red-400 mb-3">
          Failed to load chart data
        </p>
        <p className="text-sm text-red-500 dark:text-red-400 mb-4">
          {error ? error.toString() : 'Something went very wrong!'}
        </p>
        <button
          onClick={refetch}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  // loading state

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="animate-pulse">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            </div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  if (!isValidSeriesData || !isValidCategories) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
        <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {title || 'Statistics'}
            </h3>
            <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
              {subtitle || 'No data available'}
            </p>
          </div>
          <div className="flex items-start w-full gap-3 sm:justify-end">
            <button
              onClick={refetch}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              Refresh
            </button>
            <ChartTab setChartType={setChartType} chartType={chartType} />
          </div>
        </div>

        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-2 text-sm">No chart data available</p>
            <p className="text-xs text-gray-400">
              Try refreshing or changing the chart type
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        <div className="flex items-start w-full gap-3 sm:justify-end">
          <button
            onClick={refetch}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 transition-colors dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
          <ChartTab setChartType={setChartType} chartType={chartType} />
        </div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] xl:min-w-full">
          <Chart
            options={options}
            series={
              isValidSeriesData ? series : [{ name: 'No Data', data: [] }]
            }
            type="area"
            height={310}
          />
        </div>
      </div>
    </div>
  );
}
