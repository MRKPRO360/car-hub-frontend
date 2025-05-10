import Benefit from './Benefit';

import Features from './Feature';
import FeaturedCars from './FeaturedCar';
import Hero from './Hero';
import LoveOnline from './LoveOnline';
import MatchYourBudget from './MatchYourBudget';

import WhyCarHub from './WhyCarHub';

function Home() {
  return (
    <div>
      {/* <HomeBanner /> */}
      {/* <Cars renderBtn={true} /> */}
      <Hero />
      <Features />
      <FeaturedCars />
      <WhyCarHub />
      <MatchYourBudget />
      <Benefit />
      <LoveOnline />
      {/* <Accessories />
      <OfferedCar />
      <Testimonials /> */}
    </div>
  );
}

export default Home;
