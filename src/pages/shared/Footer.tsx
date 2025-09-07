import { MdLocalPhone, MdEmail } from 'react-icons/md';
import { IoMdPin } from 'react-icons/io';
import { FaFacebook, FaInstagram } from 'react-icons/fa6';
import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTop } from '../../App';
import { useGSAP } from '@gsap/react';
import Cta from './Cta';
import { brandOptions } from '../../constant/car';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const boxesRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const linkRefContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: boxesRef.current,
          start: 'top 75%',
          end: 'bottom 20%',
          toggleActions: 'play none none none',
        },
      });
      if (!boxesRef.current) return;

      const children = boxesRef.current.children;

      tl.from(children[0], {
        opacity: 0,
        x: -200,
        duration: 0.6,
        ease: 'power3.inOut',
      });
      tl.from(
        children[1],
        {
          opacity: 0,
          y: 50,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '-=.5'
      );
      tl.from(
        children[2],
        {
          opacity: 0,
          x: 200,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '-=.7'
      );

      tl.from(
        linkRefContainer.current!.querySelectorAll('h4'),
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: 'power3.inOut',
        },
        '+=.2'
      );

      tl.from(linkRefContainer.current!.querySelectorAll('li'), {
        opacity: 0,
        stagger: {
          each: 0.05,
        },
        y: 20,
        duration: 0.6,
        ease: 'power3.inOut',
      });

      // const blocks = linkRefContainer.current?.querySelectorAll(':scope > div');

      // blocks?.forEach((block) => {
      //   const heading = block.querySelector('h4');
      //   const items = block.querySelectorAll('li');

      //   console.log(heading, items);

      //   if (heading) {
      //     tl.from(heading, {
      //       opacity: 0,
      //       y: 20,
      //       duration: 0.6,
      //       ease: 'power3.inOut',
      //     });
      //   }

      //   if (items.length > 0) {
      //     tl.from(
      //       items,
      //       {
      //         opacity: 0,
      //         y: 20,
      //         duration: 0.6,
      //         stagger: 0.5,
      //         ease: 'power3.inOut',
      //       },
      //       '-=.3'
      //     );
      //   }
      // });
    },
    {
      scope: footerRef,
    }
  );

  return (
    <footer
      ref={footerRef}
      className="footer text-gray-800 dark:text-gray-300 container mx-auto py-12 lg:py-18 px-4 md:px-0 overflow-x-hidden"
    >
      <div
        ref={boxesRef}
        className="flex flex-col justify-between md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-6 "
      >
        <div className="flex-1 flex items-center gap-x-2 bg-[#1449e610] px-4 py-3 rounded-lg ">
          <MdEmail size={20} className="text-primary" />
          <div>
            <p>Email</p>
            <p>carhub@gmail.com</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-x-2 bg-[#1449e610] px-4 py-3 rounded-lg ">
          <IoMdPin size={20} className="text-primary" />
          <div>
            <p>Address</p>
            <span>Dhaka, Banani 36/1, Bangladesh</span>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-x-2 bg-[#1449e610] px-4 py-3 rounded-lg ">
          <MdLocalPhone size={20} className="text-primary" />
          <div>
            <p>Phone</p>
            <span>+61 425 840 130</span>
          </div>
        </div>
      </div>
      <div
        className="mx-auto grid grid-cols-1 2xsm:grid-cols-2 md:grid-cols-4 gap-8 font-medium text-gray-600 dark:text-gray-300"
        ref={linkRefContainer}
      >
        <div className="self-start">
          <h4 className="text-lg font-semibold mb-3">CARHUB</h4>
          <ul>
            <li className="text-md">Find the right price, dealer and advice</li>
          </ul>
        </div>

        <div className="md:justify-self-center">
          <h4 className="navigation-heading mb-3 text-xs font-bold text-gray-700 dark:text-gray-300 tracking-widest uppercase">
            Navigation
          </h4>
          <ul className="space-y-2 text-md">
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              Home
            </li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              Stock List
            </li>
            {/* <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              Warranty
            </li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              Car Finance
            </li> */}
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              How it Works
            </li>
          </ul>
        </div>

        <div className="md:justify-self-center">
          <h4 className="mb-3 text-xs font-bold text-gray-700 dark:text-gray-300 tracking-widest uppercase">
            Popular Makes
          </h4>
          <ul className="space-y-2 text-md">
            {brandOptions.map((el) => (
              <li
                key={el.value}
                className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline"
              >
                {el.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:justify-self-end">
          <h4 className="mb-3 text-xs font-bold text-gray-700 dark:text-gray-300 tracking-widest uppercase">
            Social
          </h4>
          <ul className="space-y-2 text-md">
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              <span>Facebook</span>
              <FaFacebook />
            </li>
            <li className="flex items-center gap-2 hover:text-primary transition-colors duration-300 cursor-pointer hover:underline">
              <span>Instagram</span>
              <FaInstagram />
            </li>
          </ul>
        </div>
      </div>
      <div className="pt-8 mt-8 text-center border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={scrollToTop}
          // className="px-4 py-2 text-sm font-medium text-white transition-colors duration-300 rounded-md bg-primary hover:bg-blue-700"
          aria-label="Back to top"
        >
          <Cta iconLeft={true} text="Back to Top" size="sm" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
