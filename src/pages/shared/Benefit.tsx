import { forwardRef } from 'react';

const Benefit = forwardRef<
  HTMLDivElement,
  { benefit: { title: string; description: string; icon: JSX.Element } }
>(({ benefit }, ref) => {
  return (
    <div
      ref={ref}
      className="bg-white dark:bg-gray-950 rounded-lg drop-shadow-md overflow-hidden px-4 py-10"
    >
      <div className="mb-6 flex items-center justify-center">
        {benefit.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-gray-300">
        {benefit.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
    </div>
  );
});

export default Benefit;
