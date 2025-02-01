import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <div className="bg-blue px-2 text-light">
      <div className="max-w-[1536px] mx-auto">
        <footer className=" boxShadow w-full p-6 md:p-9">
          <div className="flex justify-center gap-[30px] flex-wrap w-full sm:px-32">
            <div className="flex justify-center sm:justify-between gap-[30px] w-full flex-wrap">
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Service
              </p>
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Features
              </p>
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Our Team
              </p>
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Portfolio
              </p>
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Blog
              </p>
              <p className="text-[0.9rem] text-light hover:text-blue cursor-pointer transition-all duration-200">
                Contact Us
              </p>
            </div>

            <div className="flex items-center flex-wrap gap-[10px] text-light">
              <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-blue transition-all duration-300">
                <FaFacebook />
              </a>
              <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-blue transition-all duration-300">
                <FaTwitter />
              </a>
              <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-blue transition-all duration-300">
                <FaInstagram />
              </a>
              <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-blue transition-all duration-300">
                <FaLinkedin />
              </a>
            </div>

            <div className="border-t border-gray-200 pt-[20px] flex items-center w-full flex-wrap gap-[20px] justify-center">
              <p className="text-[0.8rem] sm:text-[0.9rem] text-light/60">
                © 2025 Car Hub. All Rights Reserved.{' '}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
