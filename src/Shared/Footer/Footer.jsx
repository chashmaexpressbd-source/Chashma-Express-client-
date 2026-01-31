import React from 'react';
import {
  FaEnvelope,
  FaFacebook,
  FaMapMarkerAlt,
  FaPhone,
  FaWhatsapp,
} from 'react-icons/fa';
import ICON from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#eaf4f4] via-[#e9ecef] to-[#ced4da]">
      {/* Main Footer Content */}
      <div className="pt-10 md:pb-6">
        <div className="sm:max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-6">
            {/* Company Info */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-4 mb-6">
                <img className="h-14 md:h-16" src={ICON} alt="Logo" />
                <div className="flex flex-col hidden md:flex">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Chashma Express
                  </h2>
                  <p className="text-sm text-gray-600">Premium Eyewear</p>
                </div>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed text-sm">
                Your trusted partner for premium eyewear and accessories.
                Quality products at competitive prices with exceptional customer
                service.
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  target="_blank"
                  href="https://www.facebook.com/share/19Zvd7i5pV/"
                  className="bg-white p-3 rounded-lg hover:bg-blue-50 transition duration-200 shadow-md hover:shadow-lg"
                >
                  <FaFacebook className="w-5 h-5 text-blue-600" />
                </a>

                {/* WhatsApp */}
                <a
                  target="_blank"
                  href="https://wa.me/+8801302596174"
                  className="bg-white p-3 rounded-lg hover:bg-green-50 transition duration-200 shadow-md hover:shadow-lg"
                >
                  <FaWhatsapp className="w-5 h-5 text-green-600" />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-400">
                Shop Categories
              </h3>
              <ul className="space-y-3">
                {[
                  'Sunglasses',
                  'Prescription Glasses',
                  'Reading Glasses',
                  'Contact Lenses',
                  'Frames',
                  'Accessories',
                ].map(item => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-blue-600 transition duration-200 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3 group-hover:bg-blue-500 group-hover:scale-125 transition duration-200"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6 pb-3 border-b border-gray-400">
                Contact Information
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Naogaon Sadar, Naogaon, Rajshahi
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <FaPhone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">+88 01302596174</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-red-100 p-2 rounded-lg mr-3 flex-shrink-0">
                    <FaEnvelope className="w-4 h-4 text-red-600" />
                  </div>
                  <span className="text-gray-700">
                    chashmaexpressbd@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-400 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm mb-4 md:mb-0 text-center">
                © {new Date().getFullYear()} Chashma Express BD. All rights
                reserved.
              </p>
              <div className="hidden md:flex flex flex-wrap justify-center gap-6">
                {[
                  'Privacy Policy',
                  'Terms of Service',
                  'Return Policy',
                  'Shipping Policy',
                ].map(item => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-600 hover:text-blue-600 text-sm transition duration-200 hover:underline"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
