import * as React from 'react';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: CarouselPlugin;
  orientation?: 'horizontal' | 'vertical';
  setApi?: (api: CarouselApi) => void;
};

type CarouselButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'outline' | 'primary';
  size?: 'sm' | 'md' | 'lg';
};

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  currentIndex: number;
  slidesCount: number;
  selectedIndex: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

function Carousel({
  orientation = 'horizontal',
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & CarouselProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [slidesCount, setSlidesCount] = React.useState(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
    setSelectedIndex(api.selectedScrollSnap());
    setCurrentIndex(api.selectedScrollSnap());
    setSlidesCount(api.scrollSnapList().length);
  }, []);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
  }, [api, onSelect]);

  React.useEffect(() => {
    if (api && setApi) {
      setApi(api);
    }
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext.Provider
      value={{
        selectedIndex,
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        currentIndex,
        slidesCount,
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

const CarouselContent = React.forwardRef<
  HTMLDivElement, // 👈 the element type you want ref for
  React.ComponentProps<'div'> // 👈 props type
>(({ className, ...props }, ref) => {
  const { carouselRef, orientation, canScrollPrev, canScrollNext } =
    useCarousel();

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={carouselRef} // from carousel context
      className="overflow-hidden relative sm:pb-6
pb-3 "
      data-slot="carousel-content"
    >
      {/* Fade Left */}
      {isHorizontal && canScrollPrev && (
        <div className="pointer-events-none absolute left-0 top-0 h-[90%] sm:h-[94%]  w-18 z-10 sm:bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent" />
      )}
      {/* Fade Right */}
      {isHorizontal && canScrollNext && (
        <div className="pointer-events-none absolute right-0 top-0  h-[90%] sm:h-[94%] w-18 z-10 sm:bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent" />
      )}
      <div
        ref={ref} // 👈 forward the ref here
        className={cn(
          'flex',
          isHorizontal ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
    </div>
  );
});

function CarouselItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useCarousel();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  variant = 'outline',
  size = 'lg',
  ...props
}: CarouselButtonProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  // if (!canScrollPrev) return;
  return (
    <button
      data-slot="carousel-previous"
      className={cn(
        'absolute rounded-full shadow-md dark:shadow-gray-800 cursor-pointer z-10 dark:text-gray-300 transition duration-300',
        orientation === 'horizontal'
          ? 'top-1/2 left-2 2xl:-left-6 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        variant === 'primary'
          ? 'bg-primary/90 hover:bg-primary text-white'
          : 'bg-light border border-gray-200 dark:border-gray-800/90 hover:dark:border-gray-600 hover:border-gray-300',
        size === 'sm' ? 'size-6' : size === 'md' ? 'size-7' : 'size-8',

        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft
        style={{
          height: '2rem',
          width: '2rem',
          color: '#062c41',
        }}
      />
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

function CarouselNext({
  className,
  variant = 'outline',
  size = 'lg',
  ...props
}: CarouselButtonProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <button
      data-slot="carousel-next"
      className={cn(
        'absolute size-8 rounded-full shadow-md cursor-pointer z-100 dark:text-gray-400 dark:shadow-gray-800',
        orientation === 'horizontal'
          ? 'top-1/2 right-2 2xl:-right-6 -translate-y-1/2'
          : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
        variant === 'primary'
          ? 'bg-primary/90 hover:bg-primary text-white'
          : 'bg-light border border-gray-200 dark:border-gray-800/90 hover:dark:border-gray-600 hover:border-gray-300',
        size === 'sm' ? 'size-6' : size === 'md' ? 'size-7' : 'size-8',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight
        style={{
          height: '2rem',
          width: '2rem',
          color: '#062c41',
        }}
      />
      <span className="sr-only">Next slide</span>
    </button>
  );
}

export {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
