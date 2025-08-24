import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

const CarDetailsSkeleton = () => {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (skeletonRef.current) {
      const children = Array.from(
        skeletonRef.current.children
      ) as HTMLDivElement[];

      gsap.to(children, {
        opacity: 0.4,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        stagger: 0.4,
        ease: 'power3.inOut',
      });
    }
  });

  return (
    <section
      ref={skeletonRef}
      className="container mx-auto pt-14 pb-6 animate-pulse"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left column (images) */}
        <div className="col-left space-y-4">
          <div className="w-full h-40 sm:h-60 lg:h-80 bg-gray-200 dark:bg-gray-700 rounded-md" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-24 w-40 bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>
        </div>

        {/* Right column (details) */}
        <div className="col-right space-y-4">
          {/* Title & Price */}
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />

          {/* Description */}
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"
              />
            ))}
          </div>

          {/* Classification boxes */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 bg-gray-200 dark:bg-gray-700 rounded"
              />
            ))}
          </div>

          {/* CTA button */}
          <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mt-4" />
        </div>
      </div>

      {/* Features */}
      <div className="mt-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4" />
        <ul className="flex gap-4 flex-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <li
              key={i}
              className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CarDetailsSkeleton;
