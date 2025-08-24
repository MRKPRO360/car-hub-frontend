import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { scrollToTop } from '../../App';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop(); // Use Lenis scroll instead of window.scrollTo
  }, [pathname]);

  return null;
};

export default ScrollToTop;
