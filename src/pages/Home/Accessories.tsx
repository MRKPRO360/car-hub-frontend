// react icons
import img1 from '../../assets/images/disc.png';
import img2 from '../../assets/images/tire.png';
import img3 from '../../assets/images/pngwing.com.png';
import { FaAngleRight } from 'react-icons/fa';
const Accessories = () => {
  return (
    <div className="py-18">
      <h1 className="text-center mb-10 font-semibold text-3xl  ">
        Accessories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] w-full min-h-[550px]">
        {/* left card with row span 2 */}
        <div className="col-span-1 overflow-hidden flex justify-between flex-col rounded-sm row-span-2 bg-[#f2f4f6] h-full py-8">
          <div className="px-8">
            <h4 className="text-[1.5rem] font-medium text-gray-900">Disc</h4>
            <div className="flex items-center hover:gap-3 w-max transition-all duration-300 gap-[10px] text-[0.9rem] mt-3 ">
              <span className="text-md">Shop Now</span>
              <FaAngleRight className="text-xl" />
            </div>
          </div>

          <img
            alt="product/image"
            src={img1}
            className="w-[350px] sm:w-[500px]"
          />
        </div>

        {/* right top card */}
        <div className="bg-[#f2f4f6] rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">
          <div className="px-6 mt-auto pb-9">
            <h4 className="text-[1.5rem] font-medium text-gray-900">Tire</h4>
            <div className="flex items-center hover:gap-3 w-max transition-all duration-300 gap-[10px] text-[0.9rem] mt-3 ">
              <span className="text-md">Shop Now</span>
              <FaAngleRight className="text-xl" />
            </div>
          </div>

          <img
            alt="product/image"
            src={img2}
            className="w-[200px] sm:w-[300px] h-full"
          />
        </div>

        {/* right bottom card */}
        <div className="bg-[#f2f4f6] rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">
          <div className="px-6 mt-auto pb-9">
            <h4 className="text-[1.5rem] font-medium text-gray-900">Wheel</h4>
            <div className="flex items-center hover:gap-3 w-max transition-all duration-300 gap-[10px] text-[0.9rem] mt-3 ">
              <span className="text-md">Shop Now</span>
              <FaAngleRight className="text-xl" />
            </div>
          </div>

          <img
            alt="product/image"
            src={img3}
            className="w-[200px] sm:w-[300px] h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Accessories;
