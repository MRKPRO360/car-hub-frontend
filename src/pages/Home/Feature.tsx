import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ShieldCheck, CheckCircle, Zap, Settings } from 'lucide-react';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

gsap.registerPlugin(ScrollTrigger);
const Features = () => {
  const featureRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      if (featureRef.current) {
        const children = Array.from(
          featureRef.current.children
        ) as HTMLElement[];

        gsap.from(children, {
          duration: 0.4,
          opacity: 0,
          y: 20,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featureRef.current,
            // markers: true,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    },
    {
      scope: featureRef,
    }
  );
  return (
    <section className="container mx-auto py-12 lg:py-18 px-4 sm:px-0">
      <div
        ref={featureRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center"
      >
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
