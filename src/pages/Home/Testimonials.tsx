// react icons
import { FaQuoteLeft, FaRegStar, FaStar } from 'react-icons/fa';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';

// Import Swiper styles

const Testimonials = () => {
  const [slides, setSlides] = useState(0);
  const setSlidesPerview = () => {
    setSlides(
      window.innerWidth <= 550
        ? 1
        : window.innerWidth <= 768
        ? 2
        : window.innerWidth > 1023
        ? 3
        : 0
    );
  };

  useEffect(() => {
    // Initially set the amount of slides on page load
    setSlidesPerview();
    // Add the event listener on component mount
    window.addEventListener('resize', setSlidesPerview);
    // Remove the listener on unmount
    return () => {
      window.removeEventListener('resize', setSlidesPerview);
    };
  }, []);

  return (
    <div className="py-18">
      <h1 className="text-center mb-10 font-semibold text-3xl  ">
        Our Happy Clients
      </h1>

      <div className="py-5">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={slides}
          spaceBetween={50}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          {[0, 1, 2, 3, 4].map((el, i) => (
            <SwiperSlide key={i}>
              <div className="w-full md:w-[80%] mt-8 p-4 bg-white shadow-xl rounded-sm relative ">
                <FaQuoteLeft className=" absolute -top-2 left-[5%] text-[1.3rem] text-[#727272]" />
                <img
                  src="https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?size=626&ext=jpg&ga=GA1.1.71340048.1688965399&semt=sph"
                  alt="demo/image"
                  className="w-[100px] h-[100px] object-cover rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2 border-4 border-blue"
                />
                <p className="text-[#424242] text-[0.9rem] mt-16">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Vitae non, explicabo cum dolorem temporibus alias odio quod
                  officiis nam. Debitis odio libero dolorum harum magnam
                  inventore ut molestias rerum sapiente!
                </p>

                <div className="flex items-start mt-5 justify-between">
                  <div>
                    <h2 className="text-[1.2rem] font-[600]">Jhone Dehon</h2>
                    <p className="text-[1rem] text-[#727272]">CEO of Miracle</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-[1.3rem] text-[#ffba24]" />
                    <FaStar className="text-[1.3rem] text-[#ffba24]" />
                    <FaStar className="text-[1.3rem] text-[#ffba24]" />
                    <FaStar className="text-[1.3rem] text-[#ffba24]" />
                    <FaRegStar className="text-[#ffba24] text-[1.3rem]" />
                  </div>
                </div>
                <FaQuoteLeft className="absolute -bottom-2 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
