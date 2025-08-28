import { IChartType } from '../../types';

interface IChartTab {
  chartType: IChartType;
  setChartType: React.Dispatch<React.SetStateAction<IChartType>>;
}

const ChartTab = ({ chartType, setChartType }: IChartTab) => {
  const getButtonClass = (option: IChartType) =>
    chartType === option
      ? 'shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800'
      : 'text-gray-500 dark:text-gray-400';

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => setChartType('sales')}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          'sales'
        )}`}
      >
        Monthly
      </button>

      <button
        onClick={() => setChartType('target')}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          'target'
        )}`}
      >
        Quarterly
      </button>

      <button
        onClick={() => setChartType('analytics')}
        className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
          'analytics'
        )}`}
      >
        Annually
      </button>
    </div>
  );
};

export default ChartTab;
