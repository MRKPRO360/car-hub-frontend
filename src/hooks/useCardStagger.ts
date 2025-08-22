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
      const children = Array.from(containerRef.current.children);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 50%',
          end: 'top 20%',
          toggleActions: 'play resume resume reset',
        },
      });

      tl.from(headingRef.current, {
        y: 15,
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

      ScrollTrigger.refresh();
    },
    {
      // scope: containerRef,
      dependencies: [containerRef.current?.children.length, deps],
    }
  );
};

export default useCardStagger;
