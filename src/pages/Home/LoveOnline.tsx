import { useRef } from 'react';
import carWithRoad from '../../assets/images/car with road.jpg';
import carWithRoadDark from '../../assets/images/car with road dark.png';
import Cta from '../shared/Cta';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router';

gsap.registerPlugin(ScrollTrigger);

function LoveOnline() {
  const loveOnlineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'top 20%',
          toggleActions: 'play none none none',
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
        backgroundImage: `linear-gradient(to bottom, ${
          theme === 'dark' ? 'rgba(16, 24, 40, .9)' : 'rgba(255,255,255, 1)'
        } 0%, rgba(0,0,0,0.1) 80%), url(${
          theme === 'dark' ? carWithRoadDark : carWithRoad
        })`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
      className="py-12 lg:py-18 text-center min-h-[60vh] dark:bg-gradient-to-b dark:via-80%   dark:from-gray-900 dark:to-[rgba(1,11,39,1)] "
    >
      <div>
        <div className="overflow-y-hidden mb-6">
          <h2
            ref={headingRef}
            className="text-4xl font-bold  dark:text-gray-300  text-gray-900"
          >
            A better way to &nbsp;
            <span className="text-blue-600">buy a pre-loved</span>
            <br />
            car entirely online
          </h2>
        </div>
        <div ref={loveOnlineRef}>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Connecter adipiscing elit duis tristique sollicitudin cursus vitae
            convallis.
          </p>
          <div>
            <Link to="/stock">
              <Cta arrowRight={true} text="Browse All Cars" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoveOnline;
