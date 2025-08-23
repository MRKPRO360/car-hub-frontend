import clsx from 'clsx';
import { useTheme } from '../../context/ThemeContext';
import { HiMoon, HiSun } from 'react-icons/hi2';

interface IThemeToggleButton {
  isBorder?: boolean;
}

export const ThemeToggleButton = ({ isBorder = true }: IThemeToggleButton) => {
  const { toggleTheme } = useTheme();
  const baseClass =
    'relative flex items-center justify-center transition-colors rounded-full hover:text-blue-500 dark:text-white dark:hover:text-blue-500 text-primary';
  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        baseClass,
        isBorder
          ? 'border dark:border-gray-800 h-11 w-11 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800'
          : 'border border-transparent '
      )}
    >
      <HiSun className="hidden dark:block text-2xl" />
      <HiMoon className="dark:hidden text-xl" />
    </button>
  );
};
