import heroCover from '../../assets/images/hero-back.jpg';
import lightHeroCover from '../../assets/images/light-hero.png';
import Cta from '../shared/Cta';
import { useTheme } from '../../context/ThemeContext';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { brandOptions } from '../../constant/car';

const Hero = () => {
  gsap.registerPlugin(useGSAP);

  const { theme } = useTheme();
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Refs = useRef<(HTMLElement | null)[]>([]);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // GRADIENT VALUES
  const darkGredient =
    'linear-gradient(to right bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))';

  const lightGradient =
    'linear-gradient(to right bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), radial-gradient(closest-corner at 50% 80%, rgba(0,0,0,0.8), rgba(127, 17, 224, .4) )';

  useGSAP(
    () => {
      const tl = gsap.timeline();

      if (bgRef.current) {
        // Animating background fade theme changes
        tl.fromTo(
          bgRef.current,
          { opacity: 0, scale: 1.05 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      }

      if (h1Refs.current?.length && paraRef.current) {
        tl.from(h1Refs.current, {
          y: 50,
          opacity: 0,
          stagger: 0.4,
          duration: 0.8,
          ease: 'power3.out',
        }).from(paraRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.out',
        });
      }

      if (searchRef.current) {
        const children = Array.from(
          searchRef.current.children
        ) as HTMLElement[];

        tl.from(children, {
          opacity: 0,
          y: 10,
          duration: 0.6,
          stagger: 0.4,
          ease: 'power3.out',
        });
      }
    },
    {
      scope: bgRef,
      // dependencies: [theme],
    }
  );

  return (
    <section className="text-center overflow-hidden">
      <div
        ref={bgRef}
        style={{
          backgroundImage: `${
            theme === 'dark' ? darkGredient : lightGradient
          }, url(${theme === 'dark' ? heroCover : lightHeroCover})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        //bg-cover xsm:bg-[length:100%_100%]
        className="min-h-[80vh] md:min-h-[90vh] lg:py-14 bg-cover bg-blend-overlay dark:bg-blend-darken  md:bg-cover grid place-content-center"
      >
        <div className="md:-translate-y-20">
          <h1 className="text-3xl xsm:text-4xl md:text-5xl font-bold text-gray-300 mb-4 overflow-hidden">
            <span
              className="text-blue-600 inline-block"
              ref={(el) => (h1Refs.current[0] = el)}
            >
              Find
            </span>{' '}
            <span
              className="text-light inline-block"
              ref={(el) => (h1Refs.current[1] = el)}
            >
              your next match.
            </span>
          </h1>
          <div className="overflow-y-hidden mb-8">
            <p ref={paraRef} className="text-gray-200 text-xl tracking-tight">
              Find the right price, dealer and advice.
            </p>
          </div>

          {/* Search Filters */}

          <div
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6"
            ref={searchRef}
          >
            <div className="relative w-60 z-30">
              <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <option className="text-gray-400">Select make</option>
                {brandOptions.map((el) => (
                  <option key={el.label}>{el.value}</option>
                ))}
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-60 z-30">
              <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <option>Select model</option>
                <option>Corolla</option>
                <option>Seltos</option>
                <option>CX-5</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div>
              <Cta text="View 4,820 Cars" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
