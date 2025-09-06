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
import { Controller, useForm } from 'react-hook-form';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react';
import { Link, useNavigate } from 'react-router';
import { ChevronsUpDownIcon } from 'lucide-react';

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

  const { control, watch, handleSubmit, setValue } = useForm<IFormValue>({
    defaultValues: { brand: '', model: '' },
  });

  const brand = watch('brand');
  const model = watch('model');

  useEffect(() => {
    setValue('model', '');
  }, [brand, setValue]);

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
    <section className="text-center overflow-hidden relative">
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
        className="relative min-h-[60vh] md:min-h-[90vh] lg:py-14 bg-cover xsm:bg-center bg-blend-overlay dark:bg-blend-darken  md:bg-cover grid place-content-center"
      >
        <div className="md:-translate-y-20 relative z-10">
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
            {/* BRAND  */}

            <Controller
              name="brand"
              control={control}
              render={({ field }) => (
                <Listbox value={field.value} onChange={field.onChange}>
                  <div className="relative w-60 z-30">
                    <ListboxButton className="relative w-full cursor-pointer rounded-full bg-white py-3 px-4 text-left text-sm text-gray-800 shadow-md ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600">
                      <span className="block truncate">
                        {field.value || 'Select Make'}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronsUpDownIcon className="h-5 w-5 text-blue-600" />
                      </span>
                    </ListboxButton>

                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 focus:outline-none z-50">
                        {brandOptions.map((el) => (
                          <ListboxOption
                            key={el.value}
                            value={el.value}
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-blue-100 text-blue-900'
                                  : 'text-gray-800'
                              }`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {el.label}
                                </span>
                              </>
                            )}
                          </ListboxOption>
                        ))}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              )}
            />

            {/* MODEL */}
            <Controller
              name="model"
              control={control}
              render={({ field }) => (
                <Listbox
                  value={field.value}
                  onChange={field.onChange}
                  disabled={!brand}
                >
                  <div className="relative w-60 z-20">
                    <ListboxButton
                      className={`relative w-full cursor-pointer rounded-full py-3 px-4 text-left text-sm shadow-md ring-1 ring-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        !brand
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-800'
                      }`}
                    >
                      <span className="block truncate">
                        {field.value
                          ? models?.data?.find((el) => el._id === field.value)
                              ?.model
                          : brand
                          ? 'Select model'
                          : 'Select make first'}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <ChevronsUpDownIcon className="h-5 w-5 text-blue-600" />
                      </span>
                    </ListboxButton>
                    <Transition
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <ListboxOptions className="absolute mt-1 max-h-60 w-full overflow-y-auto rounded-md bg-white py-1 text-sm shadow-lg ring-1 ring-black/10 focus:outline-none z-40">
                        {models?.data?.length > 0 ? (
                          models.data.map((el) => (
                            <ListboxOption
                              key={el._id}
                              value={el._id}
                              className={({ active }) =>
                                `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                  active
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'text-gray-800'
                                }`
                              }
                            >
                              {({ selected }) => (
                                <span
                                  className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                  }`}
                                >
                                  {el.model}
                                </span>
                              )}
                            </ListboxOption>
                          ))
                        ) : !isLoading && isError ? (
                          <ListboxOption
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-blue-100 text-blue-900'
                                  : 'text-gray-800'
                              }`
                            }
                            value=""
                          >
                            {({ selected }) => (
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                Something went wrong
                              </span>
                            )}
                          </ListboxOption>
                        ) : (
                          <ListboxOption
                            className={({ active }) =>
                              `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                                active
                                  ? 'bg-blue-100 text-blue-900'
                                  : 'text-gray-800'
                              }`
                            }
                            value=""
                          >
                            {({ selected }) => (
                              <span
                                className={`block truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                No results available
                              </span>
                            )}
                          </ListboxOption>
                        )}
                      </ListboxOptions>
                    </Transition>
                  </div>
                </Listbox>
              )}
            />

            {model && models && models?.data?.length > 0 ? (
              <button type="submit" className="z-10">
                {' '}
                <Cta text="View Car" />{' '}
              </button>
            ) : (
              <Link to="/stock" className="z-10">
                {' '}
                <Cta text="View All Cars" />{' '}
              </Link>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
