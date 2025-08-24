import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

function CarouselSkeletonCard() {
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
    <div className="min-w-0 shrink-0 grow-0 basis-full pl-4 2xsm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
      <div
        ref={skeletonRef}
        className="bg-white dark:bg-gray-950 rounded-lg transition duration-300 relative animate-pulse shadow z-100"
      >
        <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
        <div className="p-5">
          <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 mb-2" />
          <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
          <div className="flex gap-2 mb-2">
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-12 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  );
}

export default CarouselSkeletonCard;
