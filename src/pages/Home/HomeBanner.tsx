import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const HomeBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      content: 'Carousel 2 - Slide 1 Content',
      imgSrc: '/caorusel_image/carousel.jpg',
    },
    {
      id: 2,
      content: 'Carousel 2 - Slide 2 Content',
      imgSrc: '/caorusel_image/carousel-2.jpg',
    },
    {
      id: 3,
      content: 'Carousel 2 - Slide 3 Content',
      imgSrc: '/caorusel_image/carousel-3.jpg',
    },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[200px] rounded-lg">
      <FiChevronLeft
        className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
        onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {
          <img
            src={slides[currentSlide].imgSrc}
            alt={slides[currentSlide].content}
            className="w-full object-cover text-black"
          />
        }
      </div>
      <FiChevronRight
        className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
        onClick={nextSlide}
      />
    </div>
  );
};

export default HomeBanner;
