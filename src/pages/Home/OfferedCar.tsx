// react icons
import { HiArrowRight } from 'react-icons/hi';
import { Link } from 'react-router';
import HomeButton from '../shared/HomeButton';

const OfferedCar = () => {
  return (
    <div className="py-18">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:py-4 py-6 px-6 lg:px-8 gap-[20px] lg:gap-0 bg-gray-100">
        <div className="w-full lg:w-[30%] lg:pl-6">
          <span className="bg-[#2DA5F3] rounded-sm py-1.5 px-3 text-[0.8rem] font-normal text-white">
            SAVE UP TO $200.00
          </span>

          <h4 className="text-[1.7rem] lg:text-[2rem] mt-2 font-semibold text-gray-800">
            Macbook Pro
          </h4>

          <p className="text-[1rem] mt-2 lg:mt-3 text-gray-700">
            Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage
          </p>

          <Link to="/cars">
            <HomeButton type="blue" text="View More" />
          </Link>
        </div>

        <div className="relative">
          <p className="bg-[#FFCEAD] text-gray-900 p-4 rounded-full w-[80px] h-[80px] flex items-center justify-center font-medium border-4 border-white absolute top-1 lg:top-3 -left-3">
            $1999
          </p>

          <img
            alt="product/image"
            src="https://i.ibb.co.com/zSm0TRR/Image-6.png"
            className="w-[350px] rounded-l-md"
          />
        </div>
      </div>
    </div>
  );
};

export default OfferedCar;
