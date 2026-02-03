import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

export default function RelatedProducts({ products }) {
  return (
    <div className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
          <p className="text-gray-600 mt-1">You might also like these</p>
        </div>
        <Link
          to="/"
          className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2"
        >
          View all
          <FaArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {products?.slice(0, 4).map(product => (
          <div
            key={product._id}
            className="group bg-white rounded-md border border-gray-200 overflow-hidden hover:border-red-300 hover:shadow-xl transition-all duration-300"
          >
            <Link to={`/products-details/${product._id}`}>
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                    NEW
                  </span>
                )}
                {product.discountPrice &&
                  product.price > product.discountPrice && (
                    <span className="absolute top-3 right-3 bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-bold">
                      SALE
                    </span>
                  )}
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-gray-900 line-clamp-1 mb-2 group-hover:text-red-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    {product.discountPrice &&
                    product.price > product.discountPrice ? (
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          ৳{product.discountPrice}
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ৳{product.price}
                      </span>
                    )}
                  </div>{' '}
                  <button
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
text-white px-3 py-1 rounded text-xs font-medium 
transition-all duration-200 hover:shadow-md active:scale-95"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
