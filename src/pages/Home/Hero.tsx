import heroCover from '../../assets/images/hero-back.jpg';
import lightHeroCover from '../../assets/images/lightHero.png';
import Cta from '../shared/Cta';
import { useTheme } from '../../context/ThemeContext';
const Hero = () => {
  const { theme } = useTheme();

  const gradient =
    theme === 'dark'
      ? 'linear-gradient(to right bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5))'
      : 'linear-gradient(to right bottom, rgba(0,0,0,0.05), rgba(0,0,0,0.4))';

  return (
    // <section className="relative bg-blue-50 dark:bg-gray-900 py-14 overflow-hidden">
    //   {/* Background illustration */}
    //   <img
    //     //   src="/hero-bg.svg"
    //     src={blueBg}
    //     alt="background illustration"
    //     className="w-full h-full object-cover absolute inset-0 z-10 opacity-10"
    //   />
    //   <div className="container mx-auto">
    //     {/* Content */}

    //     <div className="flex flex-col lg:flex-row justify-between items-center  z-10 text-center">
    //       <div className="w-full md:w-auto md:flex-2 md:mr-auto">
    //         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-300 mb-4">
    //           <span className="text-blue-600">Find</span> your next match.
    //         </h1>
    //         <p className="text-gray-600 mb-8">
    //           Find the right price, dealer and advice.
    //         </p>

    //         {/* Search Filters */}
    //         <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
    //           <div className="relative w-60 z-30">
    //             <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
    //               <option className="text-gray-400">Select make</option>
    //               <option>Toyota</option>
    //               <option>Kia</option>
    //               <option>Mazda</option>
    //             </select>
    //             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    //               <svg
    //                 className="w-5 h-5 text-blue-600"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M19 9l-7 7-7-7"
    //                 />
    //               </svg>
    //             </div>
    //           </div>

    //           <div className="relative w-60 z-30">
    //             <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
    //               <option>Select model</option>
    //               <option>Corolla</option>
    //               <option>Seltos</option>
    //               <option>CX-5</option>
    //             </select>
    //             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    //               <svg
    //                 className="w-5 h-5 text-blue-600"
    //                 fill="none"
    //                 stroke="currentColor"
    //                 viewBox="0 0 24 24"
    //                 xmlns="http://www.w3.org/2000/svg"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth={2}
    //                   d="M19 9l-7 7-7-7"
    //                 />
    //               </svg>
    //             </div>
    //           </div>

    //           <Cta text="View 4,820 Cars" />
    //         </div>
    //       </div>
    //       {/* Car Image */}
    //       <div className="bais-[300px] md:basis-[650px]">
    //         <img src={hero} alt="Hero cars" className="" />
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section className="text-center">
      <div
        style={{
          backgroundImage: `${gradient}, url(${
            theme === 'dark' ? heroCover : lightHeroCover
          })`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        className="min-h-[60vh] md:min-h-[90vh] lg:py-14  bg-blend-overlay dark:bg-blend-darken bg-[length:100%_100%] md:bg-cover grid place-content-center"
      >
        <div className="md:-translate-y-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-300 mb-4 ">
            <span className="text-blue-600">Find</span> your next match.
          </h1>
          <p className="text-gray-300 text-xl tracking-tight mb-8">
            Find the right price, dealer and advice.
          </p>

          {/* Search Filters */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-6">
            <div className="relative w-60 z-30">
              <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <option className="text-gray-400">Select make</option>
                <option>Toyota</option>
                <option>Kia</option>
                <option>Mazda</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <div className="relative w-60 z-30">
              <select className="px-4 py-3 border-0 rounded-full text-sm w-full bg-white text-gray-800  drop-shadow-xl   focus:ring-2 focus:ring-blue-700 focus:outline-none appearance-none cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                <option>Select model</option>
                <option>Corolla</option>
                <option>Seltos</option>
                <option>CX-5</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            <Cta text="View 4,820 Cars" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
