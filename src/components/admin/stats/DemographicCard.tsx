import { useMemo, useState } from 'react';
import { MoreDotIcon } from '../../../assets/icons';
import CountryMap from './CountryMap';
import { Dropdown } from '../../ui/dropdown/Dropdown';
import { DropdownItem } from '../../ui/dropdown/DropdownItem';
import { useGetUsersByCountryQuery } from '../../../redux/features/admin/userManagement.api';
import countries from 'world-countries';
import { ICountryData } from '../../../types';

function getCountryInfo(name: string) {
  const country = countries.find(
    (c) => c.name.common.toLowerCase() === name.toLowerCase()
  );

  if (!country) {
    return null;
  }

  return {
    code: country.cca2.toLowerCase(),
    lat: country.latlng[0],
    lng: country.latlng[1],
  };
}

export default function DemographicCard() {
  const { data: countryData, isLoading } = useGetUsersByCountryQuery(undefined);

  // CALCULATING PERCENTAGES AND PROCESS DATA

  const processedData = useMemo(() => {
    if (!countryData?.data) return [];

    const totalCustomers = countryData.data.reduce(
      (acc: number, curr: ICountryData) => acc + curr.customerCount,
      0
    );

    return countryData.data.map((item: ICountryData) => ({
      ...item,
      percentage:
        totalCustomers > 0
          ? Math.round((item.customerCount / totalCustomers) * 100)
          : 0,
    }));
  }, [countryData]);

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  if (isLoading || !countryData?.data) {
    return (
      <div className="flex items-center justify-center h-80">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-500">
          Loading customer demographic data...
        </span>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Customers Demographic
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Number of customer based on country
          </p>
        </div>
        <div className="relative inline-block">
          <button className="dropdown-toggle" onClick={toggleDropdown}>
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              View More
            </DropdownItem>
            <DropdownItem
              onItemClick={closeDropdown}
              className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          <CountryMap
            countryData={(processedData as ICountryData[])
              .map((country) => {
                const info = getCountryInfo(country.country);
                if (!info) return null;

                return {
                  name: country.country,
                  latLng: [info.lat, info.lng] as [number, number],
                  customerCount: country.customerCount,
                };
              })
              .filter(Boolean)}
          />
        </div>
      </div>

      <div className="space-y-5">
        {processedData.map((country: ICountryData) => {
          const data = getCountryInfo(country.country);
          if (!data) return null;
          return (
            <div
              key={country.country}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="items-center w-full rounded-full max-w-8">
                  <img
                    src={`https://flagcdn.com/w40/${data!.code}.png`}
                    alt={country.country}
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                    {country.country}
                  </p>
                  <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                    {country.customerCount} Customers
                  </span>
                </div>
              </div>

              <div className="flex w-full max-w-[140px] items-center gap-3">
                <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                  <div
                    style={{ width: `${country.percentage}%` }}
                    className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  ></div>
                </div>
                <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                  {country.percentage}%
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
