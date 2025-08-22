// import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Car, CheckCircle, Zap } from 'lucide-react';
import { useRef } from 'react';
import useCardStagger from '../../hooks/useCardStagger';
import Benefit from '../shared/Benefit';

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

gsap.registerPlugin(ScrollTrigger);

const WhyCarHub = () => {
  const benefitsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useCardStagger(headingRef, benefitsRef);

  return (
    <section className="bg-light-bg dark:bg-gray-900 py-12 lg:py-18 px-4 sm:px-0">
      <div className="container mx-auto ">
        <div className="overflow-y-hidden text-center mb-12">
          <h2
            ref={headingRef}
            className="text-4xl font-bold text-center text-gray-900 dark:text-gray-300 mb-12"
          >
            Why <span className="text-blue-600">Carhub</span>
          </h2>
        </div>
        <div
          ref={benefitsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit, index) => (
            <Benefit benefit={benefit} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyCarHub;
