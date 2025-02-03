import { Link } from 'react-router';
import HomeButton from '../shared/HomeButton';
import img from '../../assets/images/tesla-s.png';

const OfferedCar = () => {
  return (
    <div className="py-18">
      <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:py-4 py-6 gap-[20px] lg:gap-0 bg-gray-100">
        <div className="w-full lg:w-[30%] lg:pl-6">
          <span className="bg-[#2DA5F3] rounded-sm py-1.5 px-3 text-[0.8rem] font-normal text-white">
            SAVE UP TO $200.00
          </span>

          <h4 className="text-[1.7rem] lg:text-[2rem] mt-2 font-semibold text-gray-800">
            Tesla S
          </h4>

          <p className="text-[1rem] mt-2 lg:mt-3 text-gray-700">
            Electric fantasy car with ai boost car driving feature!
          </p>

          <Link to="/cars">
            <HomeButton type="blue" text="Details" />
          </Link>
        </div>

        <div className="relative">
          <p className="bg-blue text-light p-4 rounded-full w-[80px] h-[80px] flex items-center justify-center font-medium border-4 border-gray-300 absolute top-1 lg:top-3 -left-3">
            $1999
          </p>

          <img
            alt="product/image"
            src={img}
            className="w-[450px] md:w-[650px] "
          />
        </div>
      </div>
    </div>
  );
};

export default OfferedCar;
