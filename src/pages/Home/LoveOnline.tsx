import { useRef } from 'react';
import carWithRoad from '../../assets/images/car with road.jpg';
import Cta from '../shared/Cta';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function LoveOnline() {
  const loveOnlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'top 20%',
          toggleActions: 'play none none reverse',
        },
      });

      if (!headingRef.current || !loveOnlineRef.current) return;

      tl.from(headingRef.current, {
        opacity: 0,
        ease: 'power3.inOut',
        duration: 0.6,
        y: 60,
      });

      const children = Array.from(
        loveOnlineRef.current.children
      ) as HTMLElement[];

      tl.from(children, {
        stagger: 0.5,
        opacity: 0,
        ease: 'power3.inOut',
        duration: 0.6,
        y: 70,
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(255,255,255, 1) 0%, rgba(0,0,0,0.1) 80%), url(${carWithRoad})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
      className="py-12 lg:py-18 text-center min-h-[60vh] dark:bg-gradient-to-b dark:via-80%   dark:from-gray-900 dark:to-[rgba(1,11,39,1)] dark:opacity-65"
    >
      <div>
        <div className="overflow-y-hidden mb-6">
          <h2 ref={headingRef} className="text-4xl font-bold  text-gray-900">
            A better way to &nbsp;
            <span className="text-blue-600">buy a pre-loved</span>
            <br />
            car entirely online
          </h2>
        </div>
        <div ref={loveOnlineRef}>
          <p className="mb-8">
            Connecter adipiscing elit duis tristique sollicitudin cursus vitae
            convallis.
          </p>
          <div>
            <Cta arrowRight={true} text="Browse 4,020 Cars" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoveOnline;
