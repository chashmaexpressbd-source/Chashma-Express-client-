import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

import Image1 from '../../assets/banner-1.jpeg';
import Image2 from '../../assets/banner-2.jpeg';
import Image3 from '../../assets/banner-3.jpeg';
import Image4 from '../../assets/banner-4.jpeg';

const Banner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const slides = [
    { id: 1, image: Image1, hideOnMobile: true },
    { id: 2, image: Image2, hideOnMobile: true },
    { id: 3, image: Image3, hideOnMobile: false },
    { id: 4, image: Image4, hideOnMobile: false },
  ];

  const visibleSlides = isMobile
    ? slides.filter(slide => !slide.hideOnMobile)
    : slides;

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
        className="overflow-hidden shadow-xl"
      >
        {visibleSlides.map(slide => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-[200px] sm:h-[450px] md:h-[480px] overflow-hidden">
              <img
                src={slide.image}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Trust Badges */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {[
            { icon: '📞', text: 'Order Now', subtext: '01302-596174' },
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
            { icon: '👓', text: 'Genuine Products', subtext: '100% Authentic' },
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
