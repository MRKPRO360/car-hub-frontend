import { useGSAP } from '@gsap/react';
import MainLayout from './components/layout/MainLayout';
import Lenis from '@studio-freight/lenis';
import ScrollToTop from './components/ScrollToTop';

let lenisInstance: Lenis | null = null;

function App() {
  useGSAP(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Store the instance globally
    lenisInstance = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  });
  return (
    <>
      <ScrollToTop />
      <MainLayout />
    </>
  );
}

export const scrollToTop = () => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, {
      duration: 1.2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
  }
};
export default App;
