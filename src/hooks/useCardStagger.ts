import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { RefObject } from 'react';
import { ICar } from '../types';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useCardStagger = (
  headingRef: RefObject<HTMLHeadingElement>,
  containerRef: RefObject<HTMLDivElement>,
  deps?: ICar[]
) => {
  useGSAP(
    () => {
      if (!containerRef.current || !headingRef.current) return;

      const carouselContent = containerRef.current.querySelector(
        '[data-slot="carousel-content"]'
      );
      const prevButton = containerRef.current.querySelector(
        '[data-slot="carousel-previous"]'
      );
      const nextButton = containerRef.current.querySelector(
        '[data-slot="carousel-next"]'
      );

      const cta = containerRef.current.querySelector('.cta');

      if (!carouselContent || !prevButton || !nextButton) return;

      const children = Array.from(carouselContent.children);
      const buttons = [prevButton, nextButton].filter(Boolean);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 50%',
          end: 'top 20%',
          toggleActions: 'play none none none',
        },
      });

      tl.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.inOut',
      });

      tl.from(children, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.inOut',
      });

      tl.fromTo(
        buttons,
        { opacity: 0, y: 0 },
        {
          y: -20,
          opacity: 1,
          duration: 0.8,
          stagger: 0.5,
          ease: 'power3.inOut',
        },
        '-=0.05'
      );

      if (cta) {
        tl.fromTo(
          '.cta',
          { opacity: 0, y: 30 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.5,
            ease: 'power3.inOut',
          }
        );
      }

      ScrollTrigger.refresh();
    },
    {
      // scope: containerRef,
      dependencies: [containerRef.current?.children.length, deps],
    }
  );
};

export default useCardStagger;
