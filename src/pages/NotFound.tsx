// const Error = () => {
//   return (
//     <div className="boxShadow px-10 w-full flex items-center flex-col justify-center py-20 rounded-xl">
//       <img
//         src="https://i.ibb.co/SVMTKPy/Frame-5.png"
//         alt="illustration"
//         className="w-full lg:w-[400px]"
//       />
//       <p className="text-[#73718A] text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4">
//         The page cannot be found. The requested URL was not found on this
//         server.
//       </p>

import { Link } from 'react-router';

//       <button className="py-3 px-8 rounded-full bg-blue text-white mt-8">
//         Back to home
//       </button>
//     </div>
//   );
// };

// export default Error;

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-gradient-to-br from-yellow-200 to-yellow-400 shadow-lg opacity-80 animate-float-slow hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-gradient-to-br from-red-200 to-red-400 shadow-lg opacity-80 animate-float-medium hidden md:block"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 shadow-lg opacity-80 animate-float-fast hidden md:block"></div>

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* 404 text with CSS animation */}
        <div className="mb-8 animate-scale-in">
          <h1 className="text-8xl sm:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
            404
          </h1>
        </div>

        {/* Astronaut illustration */}
        <div className="mb-12 flex justify-center animate-float">
          <div className="relative w-40 h-40 sm:w-48 sm:h-48">
            {/* Helmet */}
            <div className="absolute w-32 h-32 sm:w-40 sm:h-40 bg-blue-500 rounded-full top-0 left-1/2 transform -translate-x-1/2 z-10"></div>
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-full top-4 sm:top-5 left-1/2 transform -translate-x-1/2 z-20"></div>

            {/* Visor */}
            <div className="absolute w-24 h-12 sm:w-32 sm:h-16 bg-blue-200 rounded-b-full top-12 sm:top-16 left-1/2 transform -translate-x-1/2 z-30 overflow-hidden">
              <div className="absolute w-16 h-8 sm:w-24 sm:h-12 bg-blue-300 rounded-b-full top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>

            {/* Body */}
            <div className="absolute w-24 h-16 sm:w-32 sm:h-20 bg-blue-500 rounded-lg top-24 sm:top-28 left-1/2 transform -translate-x-1/2 z-10"></div>
            <div className="absolute w-16 h-12 sm:w-24 sm:h-16 bg-blue-50 rounded-lg top-28 sm:top-32 left-1/2 transform -translate-x-1/2 z-20"></div>

            {/* Arms */}
            <div className="absolute w-16 h-4 sm:w-20 sm:h-5 bg-blue-500 rounded-full top-28 sm:top-32 left-1/4 transform -translate-x-1/2 z-0"></div>
            <div className="absolute w-16 h-4 sm:w-20 sm:h-5 bg-blue-500 rounded-full top-28 sm:top-32 right-1/4 transform translate-x-1/2 z-0"></div>

            {/* Legs */}
            <div className="absolute w-6 h-10 sm:w-8 sm:h-12 bg-blue-500 rounded-b-full top-40 sm:top-44 left-1/3 transform -translate-x-1/2 z-10"></div>
            <div className="absolute w-6 h-10 sm:w-8 sm:h-12 bg-blue-500 rounded-b-full top-40 sm:top-44 right-1/3 transform translate-x-1/2 z-10"></div>
          </div>
        </div>

        {/* Message with fade-in effect */}
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Lost in Space
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto">
            The page you&apo;re looking for doesn&apos;t exist or has been
            moved. Don&apos;t worry, our astronaut will help you find your way
            back.
          </p>
        </div>

        {/* Back button with hover animation */}
        <div className="animate-fade-in-delay">
          <Link
            to="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Return to Home
          </Link>
        </div>
      </div>

      {/* Add custom animations in your global CSS */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes scale-in {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.2s both;
        }
        .animate-fade-in-delay {
          animation: fade-in 0.6s ease-out 0.4s both;
        }
      `}</style>
    </div>
  );
}
