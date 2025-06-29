import { ShieldCheck, CheckCircle, Zap, Settings } from 'lucide-react';

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-blue-600" />,
    title: '3-Year Warranty',
    description: 'Nationwide 3-year warranty on $5,000 cars and above.',
  },
  {
    icon: <Settings className="w-8 h-8 text-blue-600" />,
    title: '24/7 Roadside Assistance',
    description: 'Added for peace of mind across Bangladesh.',
  },
  {
    icon: <Zap className="w-8 h-8 text-blue-600" />,
    title: 'Fast Delivery',
    description: 'Pickup or delivery available nationwide.',
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
    title: 'Easy Pre-Approval',
    description: 'Get approved before you walk in.',
  },
];

const Features = () => {
  return (
    <section className="container mx-auto py-12 lg:py-18 px-4 sm:px-0 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4">{feature.icon}</div>
            <h4 className="font-semibold text-lg text-gray-800 mb-1 dark:text-gray-300">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
