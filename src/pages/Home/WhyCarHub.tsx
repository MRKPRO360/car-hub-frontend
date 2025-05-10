import { ShieldCheck, Car, CheckCircle, Zap } from 'lucide-react';

const benefits = [
  {
    title: 'Three Year Warranty',
    description:
      'Maximum Claim Limit up to $3000 and drive for multiple years. Opt for total car cost cover or parts/labor-specific terms.',
    icon: <ShieldCheck strokeWidth={1.5} className="w-14 h-14 text-blue-600" />,
  },
  {
    title: '24/7 Roadside Assistance',
    description:
      'All our vehicles come with standard roadside cover and an added three years of 24/7 nationwide help.',
    icon: <Car strokeWidth={1.5} className="w-14 h-14 text-blue-600" />,
  },
  {
    title: 'Fast Home Delivery',
    description:
      'Pick up or delivery within minutes. Your car reaches your doorstep or preferred center without delay.',
    icon: <Zap strokeWidth={1.5} className="w-14 h-14 text-blue-600" />,
  },
  {
    title: 'Easy Pre-Approval',
    description:
      'With just basic info, receive quick approval and know your finance amount before selecting your car.',
    icon: <CheckCircle strokeWidth={1.5} className="w-14 h-14 text-blue-600" />,
  },
];

const WhyCarHub = () => {
  return (
    <section className="bg-light-bg py-12 lg:py-18 px-4 sm:px-0">
      <div className="container mx-auto ">
        {/* <section className=""> */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why <span className="text-blue-600">Carbarn</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white rounded-lg drop-shadow-[0_8px_8px_rgba(37,99,235,0.05)] overflow-hidden hover:drop-shadow-[0_8px_4px_rgba(37,99,235,0.1)] transition duration-300 px-4 py-10"
            >
              <div className="mb-6 flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 leading-tighter">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCarHub;
