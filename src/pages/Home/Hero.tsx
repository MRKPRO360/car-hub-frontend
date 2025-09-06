import heroCover from '../../assets/images/hero-back.jpg';
import lightHeroCover from '../../assets/images/light-hero.png';
import mobileLightHeroCover from '../../assets/images/mobile-light.png';
import mobileDarkHeroCover from '../../assets/images/mobile-dark.jpg';

import Cta from '../shared/Cta';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { brandOptions } from '../../constant/car';
import { useGetAllModelsByBrandQuery } from '../../redux/features/admin/carManagement.api';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';

interface IFormValue {
  brand: string;
  model: string;
}

const Hero = () => {
  gsap.registerPlugin(useGSAP);
  const { theme } = useTheme();
  const bgRef = useRef<HTMLDivElement>(null);
  const h1Refs = useRef<(HTMLElement | null)[]>([]);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);

  const navigate = useNavigate();

  const { register, watch, handleSubmit } = useForm<IFormValue>({
    defaultValues: { brand: '', model: '' },
  });

  const brand = watch('brand');
  const model = watch('model');

  const {
    data: models,
    isLoading,
    isError,
  } = useGetAllModelsByBrandQuery(brand, {
    skip: !brand,
  }) as {
    isLoading: boolean;
    isError: boolean;
    data: { data: { _id: string; model: string }[] };
  };

  const onSubmit = (data: IFormValue) => {
    navigate(`/cars/${data.model}`);
  };

  // GRADIENT VALUES
  const darkGredient =
    'linear-gradient(to right bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.8))';

  const lightGradient =
    'linear-gradient(to right bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.2)), radial-gradient(closest-corner at 50% 80%, rgba(0,0,0,0.8), rgba(127, 17, 224, .4) )';

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
        tl.from(
          h1Refs.current,
          {
            y: 50,
            opacity: 0,
            stagger: 0.4,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=.8'
        ).from(paraRef.current, {
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
          y: 5,
          duration: 0.8,
          stagger: 0.6,
          ease: 'power3.out',
        });
      }
    },
    {
      scope: bgRef,
      // dependencies: [theme],
    }
  );

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 425);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="text-center overflow-hidden">
      <div
        ref={bgRef}
        style={{
          backgroundImage: `${
            theme === 'dark' ? darkGredient : lightGradient
          }, url(${
            theme === 'dark' && !isMobile
              ? heroCover
              : theme === 'dark' && isMobile
              ? mobileDarkHeroCover
              : theme === 'light' && !isMobile
              ? lightHeroCover
              : mobileLightHeroCover
          })`,
          backgroundRepeat: 'no-repeat',
        }}
        //bg-cover xsm:bg-[length:100%_100%]
        className="min-h-[60vh] md:min-h-[90vh] lg:py-14 bg-cover xsm:bg-center bg-blend-overlay dark:bg-blend-darken  md:bg-cover grid place-content-center"
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6"
            ref={searchRef}
          >
            <div className="relative w-60 z-30">
              <select
                {...register('brand')}
                className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <option hidden value="" className="text-gray-400" disabled>
                  Select make
                </option>
                {brandOptions.map((el) => (
                  <option key={el.label} value={el.value}>
                    {el.value}
                  </option>
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
              <select
                {...register('model')}
                disabled={!brand}
                className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                {!isLoading && isError && (
                  <option value="">Something wrong</option>
                )}

                <option hidden value="" disabled>
                  {brand ? 'Select model' : 'Select make first'}
                </option>
                {models?.data?.length <= 0 && (
                  <option value="">No results available</option>
                )}
                {models?.data?.length > 0 &&
                  models?.data?.map((el) => (
                    <option value={el._id} key={el._id}>
                      {el.model}
                    </option>
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
            {model && models && models?.data?.length > 0 ? (
              <button type="submit">
                <Cta text="View Car" />
              </button>
            ) : (
              <Link to="/stock">
                <Cta text="View All Cars" />
              </Link>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
