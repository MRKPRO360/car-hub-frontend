import { Link } from 'react-router';
import HomeButton from '../../pages/shared/HomeButton';

function Slide({ data }: { data: { text: string; img: string } }) {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to right, rgba(13, 27, 42, 1), rgba(13, 27, 42, 0.5)), url(${data.img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="min-w-screen text-light relative h-[80vh] md:h-[91vh]"
    >
      <div className="absolute top-[40%] sm:left-40 left-20">
        <h1 className="mb-2 font-semibold text-xl sm:text-2xl ">{data.text}</h1>
        <p className="font-light text-2xl sm:text-3xl">30 MONTHS | 0%</p>
        <span className="font-light">Our birthday. Your gift</span>
        <div className="mt-5">
          <Link to="/cars">
            <HomeButton type="light" text="View More" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Slide;
