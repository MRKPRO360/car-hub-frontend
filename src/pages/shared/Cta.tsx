import { FaArrowRightLong } from 'react-icons/fa6';

interface ICta {
  text: string;
  variant?: 'filled' | 'outline';
  arrowRight?: boolean;
}

function Cta({ text, variant = 'filled', arrowRight = false }: ICta) {
  const baseClasses =
    'px-4 py-3 rounded-full text-sm focus:ring-2 focus:ring-blue-700 focus:outline-none active:translate-y-0.5 appearance-none cursor-pointer transition duration-200 inline-block';

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
      <button className="flex items-center transition duration-300 gap-1.5 font-semibold hover:gap-2 relative z-50">
        {text}
        {arrowRight && <FaArrowRightLong className="text-xl" />}
      </button>
    </div>
  );
}

export default Cta;
