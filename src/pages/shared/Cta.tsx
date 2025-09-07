import { LoaderCircle } from 'lucide-react';
import { FaAnglesUp, FaArrowRightLong } from 'react-icons/fa6';

interface ICta {
  text: string;
  variant?: 'filled' | 'outline';
  arrowRight?: boolean;
  className?: string;
  size?: 'xs' | 'sm' | 'lg';
  isSubmitting?: boolean;
  submittingText?: string;
  isLoading?: boolean;
  iconLeft?: boolean;
}

function Cta({
  text,
  variant = 'filled',
  iconLeft = false,
  arrowRight = false,
  className = '',
  size = 'lg',
  isSubmitting = false,
  submittingText,
  isLoading,
}: ICta) {
  const baseClasses = ` ${
    size === 'lg'
      ? 'py-3 px-4 text-lg sm:text-base'
      : size === 'sm'
      ? 'py-2 px-8 text-xs sm:text-base'
      : 'py-1 px-2 text-lg sm:text-[12px] sm:text-base'
  } rounded-full  focus:ring-2 focus:ring-blue-700  focus:outline-none active:translate-y-0.5 appearance-none cursor-pointer transition duration-200 inline-block ${className}`;

  const filledClasses =
    'bg-blue-600 text-white hover:bg-blue-700 drop-shadow-[0_4px_4px_rgba(37,99,235,0.3)] border-0';

  const outlineClasses =
    'bg-transparent text-blue-600 hover:text-white hover:bg-blue-600 border-2 border-blue-600 hover:border-blue-700 drop-shadow-[0_4px_4px_rgba(37,99,235,0.1)]';

  return (
    <div
      className={`${baseClasses} ${
        variant === 'filled' ? filledClasses : outlineClasses
      }`}
    >
      <div
        className={`w-full flex items-center transition duration-300 gap-1.5 font-semibold hover:gap-2 relative z-50 text-center justify-center  ${
          isSubmitting && 'cursor-not-allowed'
        }`}
      >
        {isSubmitting ? submittingText : isLoading ? 'Loading...' : text}
        {/* {text} */}
        {isSubmitting && <LoaderCircle className="animate-spin w-5 h-5" />}
        {arrowRight && <FaArrowRightLong className="text-xl" />}
        {iconLeft && (
          <div className="relative h-6 w-5 overflow-hidden">
            <FaAnglesUp className="absolute text-xl scroll-up-animation" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Cta;
