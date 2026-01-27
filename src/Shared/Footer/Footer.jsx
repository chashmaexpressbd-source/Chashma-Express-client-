import React from 'react';
import {
  FaCreditCard,
  FaEnvelope,
  FaFacebook,
  FaHeadset,
  FaMapMarkerAlt,
  FaPhone,
  FaShieldAlt,
  FaShippingFast,
  FaWhatsapp,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#831010] to-[#B91C1C] text-white">
      {/* Main Footer Content */}
      <div className="pt-12 pb-8">
        <div className="sm:max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-2">
            {/* Company Info */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-2 text-white mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center relative shadow-lg">
                  <div className="w-10 h-10 bg-red-400 rounded-full flex items-center justify-center">
                    <span className="text-[#831010] font-bold text-sm">CE</span>
                  </div>
                  <div className="absolute top-1 left-1 w-2 h-2 bg-white bg-opacity-40 rounded-full"></div>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-bold text-xl">Chashma Express BD</span>
                  <span className="text-xs text-red-200">BEATS PREMIUM</span>
                </div>
              </div>
              <p className="text-red-200 mb-6 leading-relaxed hidden sm:block">
                Your trusted partner for premium eyewear and accessories.
                Quality products at competitive prices with exceptional customer
                service.
              </p>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  target="_blank"
                  href="https://www.facebook.com/share/19Zvd7i5pV/"
                  className="bg-[#1877F2] p-3 rounded-full hover:opacity-80 transition duration-200"
                >
                  <FaFacebook className="w-5 h-5 text-white" />
                </a>

                {/* WhatsApp */}
                <a
                  target="_blank"
                  href="https://wa.me/+8801302596174"
                  className="bg-[#25D366] p-3 rounded-full hover:opacity-80 transition duration-200"
                >
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Categories */}
            <div className="hidden lg:block">
              <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-red-600">
                Categories
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
                      className="text-red-200 hover:text-white transition duration-200 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-red-300 rounded-full mr-3 group-hover:bg-white transition duration-200"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-red-600">
                Contact Info
              </h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="w-5 h-5 text-white mt-1 mr-3 flex-shrink-0" />
                  <span className="text-red-200">
                    Naogaon Sadar, Naogaon, Rajshahi
                  </span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                  <span className="text-red-200">+88 01302596174</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="w-5 h-5 text-white mr-3 flex-shrink-0" />
                  <span className="text-red-200">
                    minalhossain902@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-red-600 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-red-200 text-sm mb-4 md:mb-0 text-center">
                © {new Date().getFullYear()} Chashma Express BD. All rights
                reserved.
              </p>
              <div className="flex flex-wrap justify-center space-x-6 hidden md:flex">
                {[
                  'Privacy Policy',
                  'Terms of Service',
                  'Return Policy',
                  'Shipping Policy',
                ].map(item => (
                  <a
                    key={item}
                    href="#"
                    className="text-red-200 hover:text-white text-sm transition duration-200 mb-2 md:mb-0"
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
