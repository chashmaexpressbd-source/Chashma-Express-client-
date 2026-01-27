import React, { useEffect, useState } from 'react';

import axios from 'axios';
import ProductCards from './ProductCards';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-products`,
        );
        setProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className="w-full sm:max-w-7xl mx-auto py-8 px-2 sm:px-0">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
        {products.map(product => (
          <ProductCards key={product._id} product={product}></ProductCards>
        ))}
      </div>
      {/* Trust Badges */}
      <div className=" md:hidden">
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

export default Products;
