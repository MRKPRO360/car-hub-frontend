import Features from './Feature';
import FeaturedCars from './FeaturedCar';
import Hero from './Hero';
import LoveOnline from './LoveOnline';
import MatchYourBudget from './MatchYourBudget';

import WhyCarHub from './WhyCarHub';
import HyBridBenefit from './HyBridBenefit';

function Home() {
  return (
    <div>
      {/* <HomeBanner /> */}
      {/* <Cars renderBtn={true} /> */}
      <Hero />
      <div className="px-2">
        <Features />
        <FeaturedCars />
        <WhyCarHub />
        <MatchYourBudget />
        <HyBridBenefit />
        <LoveOnline />
      </div>
      {/* <Accessories />
      <OfferedCar />
      <Testimonials /> */}
    </div>
  );
}

export default Home;
