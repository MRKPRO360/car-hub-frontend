// react icons
import { HiArrowRight } from 'react-icons/hi';

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
            <h4 className="text-[1.5rem] font-medium text-gray-900">
              Living Room
            </h4>
            <button className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
              Shop Now
              <HiArrowRight className="group-hover:ml-1 transition-all duration-200" />
            </button>
          </div>

          <img
            alt="product/image"
            src="https://i.ibb.co.com/F7MBZqh/Paste-image-removebg-preview.png"
            className="w-[500px]"
          />
        </div>

        {/* right top card */}
        <div className="bg-[#f2f4f6] rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">
          <div className="px-6 mt-auto pb-9">
            <h4 className="text-[1.5rem] font-medium text-gray-900">Bedroom</h4>
            <button className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
              Shop Now
              <HiArrowRight className="group-hover:ml-1 transition-all duration-200" />
            </button>
          </div>

          <img
            alt="product/image"
            src="https://i.ibb.co.com/PCw23Vs/Paste-image-1-removebg-preview.png"
            className="w-[200px] h-[200px]"
          />
        </div>

        {/* right bottom card */}
        <div className="bg-[#f2f4f6] rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">
          <div className="px-6 mt-auto pb-9">
            <h4 className="text-[1.5rem] font-medium text-gray-900">Kitchen</h4>
            <button className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
              Shop Now
              <HiArrowRight className="group-hover:ml-1 transition-all duration-200" />
            </button>
          </div>

          <img
            alt="product/image"
            src="https://i.ibb.co.com/4FjR02m/Paste-image-2-removebg-preview.png"
            className="w-[200px] h-max"
          />
        </div>
      </div>
    </div>
  );
};

export default Accessories;
