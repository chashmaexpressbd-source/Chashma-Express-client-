import React from 'react';
import Marquee from 'react-fast-marquee';

const NavMarquee = () => {
  return (
    <nav>
      <Marquee
        className="text-white "
        speed={50}
        pauseOnHover={true}
        gradient={false}
      >
        চশমা এক্সপ্রেস বিডি একটি অনলাইন প্ল্যাটফর্ম, যার প্রধান লক্ষ্য প্রতিটি
        চোখে মানসম্মত চশমা পৌঁছে দেওয়া। 📞 Call / Message WhatsApp: 01302-596174{' '}
        <span className="mr-2"></span>
      </Marquee>
    </nav>
  );
};

export default NavMarquee;
