import Accessories from './Accessories';
import Cars from './Cars';
import HomeBanner from './HomeBanner';
import OfferedCar from './OfferedCar';
import Testimonials from './Testimonials';

function Home() {
  return (
    <div>
      <HomeBanner />
      <Cars renderBtn={true} />
      <Accessories />
      <OfferedCar />
      <Testimonials />
    </div>
  );
}

export default Home;
