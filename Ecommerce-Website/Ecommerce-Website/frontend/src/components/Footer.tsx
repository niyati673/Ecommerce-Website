import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo_Kora2.png'; 

const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="mb-6">
    <h3 className="font-bold mb-2">{title}</h3>
    <ul>
      {items.map((item, index) => (
        <li key={index} className="mb-1">
          <Link to="/" className="text-gray-300 hover:text-gray-100">
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

function Footer() {
  return (
    <footer className="bg-[#3A3845] pt-12 pb-6 text-white bottom-0 left-0 right-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="w-full md:w-3/10 pr-4 mb-8 md:mb-0 col-span-1">
            <div className="flex items-center mb-4">
              <img src={logo} alt="Kora Logo" className="h-8 w-8" /> 
              <span className="ml-2 text-xl font-bold">Kora</span>
            </div>
            {/* Wrap the button with Link to enable navigation */}
            <Link to="/" className="bg-transparent border px-4 py-2 flex items-center hover:bg-blue-50 hover:text-gray-900 transition duration-300">
              Get Started
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          <div className="w-full md:w-7/10 md:pl-8 md:border-l border-gray-300 col-span-1 md:col-span-2 lg:col-span-3">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                <FooterSection
                  title="ABOUT US"
                  items={[
                    'Mission',
                    'Our team',
                    'Awards',
                    'Testimonials',
                    'Privacy policy',
                  ]}
                />
              </div>
              <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
                <FooterSection
                  title="SERVICES"
                  items={[
                    'Web design',
                    'Web development',
                    'Mobile design',
                    'UI/UX design',
                    'Branding design',
                  ]}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <FooterSection
                  title="PORTFOLIO"
                  items={[
                    'Corporate websites',
                    'E-commerce',
                    'Mobile apps',
                    'Landing pages',
                    'UI/UX projects',
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm text-gray-400">
          <p>
            Copyright © 2024 Kora | All Rights Reserved |{' '}
            <Link to="/" className="hover:text-gray-200">
              Terms and Conditions
            </Link>{' '}
            |{' '}
            <Link to="/" className="hover:text-gray-200">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
