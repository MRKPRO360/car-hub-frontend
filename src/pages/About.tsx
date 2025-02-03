import HomeButton from './shared/HomeButton';

const About = () => {
  return (
    <div className="w-full bg-gray-100 py-12 px-6">
      <div className="max-w-screen-xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-4">
          About Our Company
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          At <span className="font-semibold text-blue">Car Hub</span>, we are
          passionate about bringing you the best selection of high-quality
          vehicles that combine innovation, performance, and luxury. With over
          20 years of experience in the automotive industry, we’ve earned a
          reputation for providing top-tier customer service and reliable
          vehicles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-light rounded-xs shadow-sm shadow-blue/20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              Our mission is simple: to provide the best cars and customer
              experience for our community. We focus on offering vehicles that
              cater to various needs, from performance-driven sports cars to
              reliable family vehicles.
            </p>
          </div>

          <div className="p-6 bg-light rounded-xs shadow-sm shadow-blue/20">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              <li>Wide variety of top-quality vehicles</li>
              <li>Competitive pricing and financing options</li>
              <li>Exceptional customer service and support</li>
              <li>Years of trusted industry experience</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-3xl font-semibold text-gray-900 mb-4">
            Join the Car Hub Family
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're looking for your next dream car or need assistance
            with your current vehicle, we're here to help! Get in touch with our
            team today and experience the AutoTech difference.
          </p>
          <a href="#">
            <HomeButton text="Contact Us" type="blue" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
