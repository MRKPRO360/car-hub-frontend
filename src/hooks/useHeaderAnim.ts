import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RefObject } from 'react';

gsap.registerPlugin(ScrollTrigger);

const useHeaderAnim = (headingRef: RefObject<HTMLHeadingElement>) => {
  useGSAP(
    () => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            end: 'top 20%',
            markers: true,
            toggleActions: 'play none none none',
          },
        });
      }
    },
    {
      scope: headingRef,
    }
  );
};

export default useHeaderAnim;
