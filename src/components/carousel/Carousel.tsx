// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import Slide from './Slide';

import img1 from '../../assets/images/header-.jpg';
import img2 from '../../assets/images/header-1.jpg';
import img3 from '../../assets/images/header-3.jpg';

const slideData = [
  { text: 'Affordable and beautiful', img: img1 },
  { text: 'Luxurious and limitless', img: img2 },
  { text: 'Durability to take reace', img: img3 },
];

function Carousel() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      pagination={{ clickable: true }}
      slidesPerView={1}
      navigation
      spaceBetween={50}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {slideData.map((el, i) => (
        <SwiperSlide key={i}>
          <Slide data={el} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Carousel;
