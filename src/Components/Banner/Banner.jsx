import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import Image2 from '../../assets/glass-2.png';
import Image5 from '../../assets/glass-5.png';
import { FiPhoneCall } from 'react-icons/fi';

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const slides = [
    {
      id: 2,
      background: 'bg-gradient-to-r from-amber-900 to-red-900',
      image: Image2,
      title: 'Double Poly Sunglasses Trendy designs & premium ',
      subtitle: 'Maximum Eye Protection',
      description:
        'quality 100% UV Protection Lightweight & Comfortable Perfect for Daily Use & Outdoor Fun',
      price: 'Save up to 40% today!',
      badge: 'Hot Deal',
      buttonText: 'Order Now',

      buttonColor: 'bg-red-600 hover:bg-red-700',
    },
    {
      id: 3,
      background: 'bg-gradient-to-r from-gray-800 to-gray-600',
      image: Image5,
      title: 'Premium TR Metal Frame Stylish Design Premium Quality',
      subtitle: 'Crystal-Clear Vision Everyday',
      description:
        'High-quality prescription-ready lenses with modern frames, crafted for comfort and clarity. Perfect fit for your daily lifestyle.',
      price: 'Free Eye Checkup Included!',
      badge: 'Premium',
      buttonText: 'Shop Now',
      buttonColor: 'bg-gray-700 hover:bg-gray-800',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: 'swiper-pagination-bullet bg-white opacity-50',
          bulletActiveClass:
            'swiper-pagination-bullet-active !bg-red-500 !opacity-100',
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={1000}
        className=" overflow-hidden shadow-xl"
      >
        {slides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div
              className={`relative ${slide.background} h-[230px] sm:h-[450px] md:h-[500px] flex items-center`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
                <div
                  className="w-full h-full bg-repeat"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                ></div>
              </div>

              {/* Content Container */}
              <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-row items-center justify-between h-full gap-4 sm:gap-6 lg:gap-8">
                  {/* Text Content - Left Side */}
                  <div className="text-white w-1/2 sm:w-1/2 lg:w-1/2 space-y-2 sm:space-y-3 lg:space-y-4">
                    {slide.badge && (
                      <span className="inline-block px-2 py-1  bg-opacity-20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white border-opacity-30">
                        {slide.badge}
                      </span>
                    )}

                    <h1 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 font-light">
                      {slide.subtitle}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 hidden md:block">
                      {slide.description}
                    </p>
                    <button className="bg-red-500 hover:bg-red-600 py-0.5 md:py-3 px-2 md:px-6 rounded-md md:font-medium flex items-center gap-2">
                      {slide.buttonText} {slide.call}
                    </button>
                  </div>

                  {/* Image - Right Side */}
                  <div className="w-1/2 sm:w-1/2 lg:w-1/2 flex justify-center items-center">
                    <div className="relative">
                      {/* Glow Effect - Visible on all screens */}
                      <div className=" mt-10 ml-5 md:mt-12 md:ml-12 w-32 h-32 lg:w-56 lg:h-56 bg-white bg-opacity-10 rounded-full absolute -inset-3 sm:-inset-4 blur-3xl md:blur-2xl"></div>

                      {/* Main Image */}
                      <div className="relative z-10">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="w-48 h-48 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-64 lg:h-64 xl:w-80 xl:h-80 object-contain transform hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                          style={{
                            filter:
                              'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))',
                          }}
                          onError={e => {
                            e.target.style.backgroundColor = 'transparent';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent z-0"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trust Badges */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 ">
          {[
            {
              icon: '📞',
              text: 'Order Now',
              subtext: '01302-596174',
            },
            {
              icon: '🚚',
              text: 'Home Delivery',
              subtext: 'All Over Bangladesh',
            },
            {
              icon: '💳',
              text: 'Cash on Delivery',
              subtext: '100% Trusted Site',
            },
            {
              icon: '👓',
              text: 'Genuine Products',
              subtext: '100% Authentic',
            },
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-white p-3 sm:p-4 rounded-lg shadow-md text-center border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                {badge.icon}
              </div>
              <div className="font-semibold text-gray-800 text-xs sm:text-sm">
                {badge.text}
              </div>
              <div className="text-gray-500 text-xs">{badge.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
