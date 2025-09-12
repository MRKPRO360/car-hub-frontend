import exchange from '../assets/images/exchage.png';

function HowItWorks() {
  return (
    <section className="px-2 dark:from-gray-dark  bg-gradient-to-b via-80% from-white to-[rgba(20,73,230,0.06)] py-12 lg:py-18">
      {/* 1st row */}
      <div className="md:flex items-center justify-between">
        <div className="">
          <span className="text-primary tracking-wider">How it works</span>
          <p>
            <span className="uppercase">CarHub</span> is <b>revolutionizing</b>{' '}
            the way you buy used cars particularly those manufactured by Desi
            automakers
          </p>

          <span>
            Our process is completely online, making it easy and hassle-free
          </span>
        </div>
        <div className="w-full max-w-96">
          <img
            className="w-full h-full"
            src={exchange}
            alt="car purchasing and giving money"
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
