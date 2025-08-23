import { Zap, BatteryCharging, SwitchCamera, Recycle } from 'lucide-react';

import hybridDarkCar from '../../assets/images/hybrid-dark.png';

import Cta from '../shared/Cta';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
const hybridBenefits = [
  {
    title: 'Effortless Acceleration',
    description:
      'Experience smooth, responsive acceleration thanks to hybrid technology’s instant torque and power delivery.',
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Self-Charging on the Go',
    description:
      'Hybrids convert braking and deceleration energy into electricity, recharging the battery as you drive.',
    icon: <BatteryCharging className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Smart Energy Switching',
    description:
      'Automatically alternate between electric and petrol power for optimal performance and fuel savings.',
    icon: <SwitchCamera className="w-8 h-8 text-primary" />,
  },
  {
    title: 'Sustainable by Design',
    description:
      'Advanced regenerative braking and energy reuse reduce waste and promote sustainability in hybrid technology.',
    icon: <Recycle className="w-8 h-8 text-primary" />,
  },
];

gsap.registerPlugin(ScrollTrigger);

const HyBridBenefit = () => {
  const hybridBenefitsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (!sectionRef.current) return;

        gsap.from(sectionRef.current!.querySelector('.left-col'), {
          x: -150,
          opacity: 0,
          duration: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current!.querySelector(
              '.left-col img:not(.hidden)'
            ),
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play resume resume reset',
          },
        });
        gsap.from(sectionRef.current!.querySelector('.right-col'), {
          x: 150,
          opacity: 0,
          ease: 'power3.out',
          duration: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            // markers: true,
            start: 'top 40%',
            end: 'top 20%',
            toggleActions: 'play resume resume reset',
          },
        });

        if (hybridBenefitsRef.current) {
          const children = Array.from(
            hybridBenefitsRef.current.children
          ) as HTMLElement[];

          gsap.fromTo(
            children,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.3,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: hybridBenefitsRef.current,
                start: 'top 70%',
                end: 'top 20%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      return () => ctx.revert();
    },
    {
      scope: sectionRef,
    }
  );
  return (
    <section
      className="container mx-auto py-12 lg:py-18 px-4 sm:px-0 overflow-x-hidden"
      ref={sectionRef}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
        <div className="left-col">
          <img
            src={hybridDarkCar}
            alt="Hybrid Vehicles"
            className="w-full h-auto drop-shadow-[2px_3px_4px_rgba(0,0,0,0.4)] dark:drop-shadow-[2px_3px_4px_rgba(37,99,235,0.2)]"
          />
        </div>
        <div className="right-col">
          <h2 className="text-4xl font-bold dark:text-gray-300  text-gray-900 mb-6">
            What are the <span className="text-blue-600">Benefits</span>
            &nbsp;of <br />
            <span className="text-blue-600">Hybrid</span>
            &nbsp;Vehicles
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-tighter mb-4">
            With a hybrid, you get all the power and torque advantages of an
            electric vehicle while also gaining the flexibility of a petrol
            engine. Enjoy efficient travel, reduced CO₂ emissions, and a driving
            experience that combines sustainability and performance.
          </p>
          <Cta
            arrowRight={true}
            variant="outline"
            text="Browse all hybrid cars"
          ></Cta>
        </div>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        ref={hybridBenefitsRef}
      >
        {hybridBenefits.map((item, index) => (
          <div
            key={index}
            className="bg-primary-50 p-10 first:pl-0 last:pr-0 flex justify-center flex-col items-center text-center"
          >
            <div className="mb-6 ">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300  mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-500 leading-tighter">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HyBridBenefit;
