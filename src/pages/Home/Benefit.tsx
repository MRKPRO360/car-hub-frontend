const Benefit = ({
  benefit,
}: {
  benefit: {
    title: string;
    description: string;
    icon: JSX.Element;
  };
}) => {
  return (
    <div className="benefit bg-white dark:bg-gray-950 rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)]  hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)]  dark:hover:drop-shadow-[0_8px_16px_rgba(37,99,235,0.15)] transition transform duration-300 relative px-4 py-10 hover:scale-105">
      <div className="mb-6 flex items-center justify-center">
        {benefit.icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-gray-300">
        {benefit.title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
    </div>
  );
};

export default Benefit;
