import React from 'react';
import {
  FaHeart,
  FaEye,
  FaFire,
  FaStar,
  FaShippingFast,
  FaTag,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductCards = ({ product }) => {
  const {
    _id,
    name,
    price,
    discountPrice,
    brand = 'Porsche Design',
    images,

    stock = 15,
    freeDelivery = false,
    gender = 'Women',
    category = 'Frame Collection',
    specifications = [],
  } = product || {};
  console.log(product);

  const discountPercent =
    discountPrice && price
      ? Math.round(
          ((parseFloat(price) - parseFloat(discountPrice)) /
            parseFloat(price)) *
            100,
        )
      : 0;

  const displayPrice = parseFloat(price) || 0;
  const displayDiscountPrice = discountPrice ? parseFloat(discountPrice) : null;

  return (
    <div className="group bg-white rounded-lg sm:rounded-xl lg:rounded-md shadow-sm sm:shadow-md lg:shadow-lg overflow-hidden hover:shadow-xl lg:hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-amber-100">
      {/* Product Image Section */}
      <div className="relative overflow-hidden">
        <Link to={`/products-details/${_id}`}>
          {/* Image Container */}
          <div className="relative w-full pt-[100%] bg-gradient-to-br from-gray-50 to-gray-100">
            <img
              src={
                images && images[0]
                  ? images[0]
                  : 'https://via.placeholder.com/400x400'
              }
              alt={name}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Overlay gradient on hover - only on desktop */}
            <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Top Badges - Top Left */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 lg:top-4 lg:left-4 flex flex-col gap-1 sm:gap-2 z-10">
          {freeDelivery && (
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] xs:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-full font-semibold shadow-md flex items-center gap-1">
              <FaShippingFast size={8} />
              <span className="">FREE DELIVERY</span>
            </div>
          )}
        </div>

        {/* Discount Badge - Top Right */}
        {discountPercent > 0 && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white text-[10px] xs:text-xs sm:text-sm font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-full shadow-md lg:shadow-lg">
            -{discountPercent}%
          </div>
        )}

        {/* Quick Action Buttons - Bottom Right - Hidden on mobile, shown on hover desktop */}
        <div className="hidden sm:absolute sm:bottom-3 sm:right-3 lg:bottom-4 lg:right-4 sm:flex flex-col gap-1 lg:gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <button className="bg-white p-1.5 lg:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 hover:bg-gray-50 active:scale-95">
            <FaHeart
              className="text-gray-600 hover:text-red-500 transition-colors"
              size={12}
            />
          </button>
          <Link to={`/products-details/${_id}`}>
            <button className="bg-white p-1.5 lg:p-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 hover:bg-gray-50 active:scale-95">
              <FaEye
                className="text-gray-600 hover:text-blue-500 transition-colors"
                size={12}
              />
            </button>
          </Link>
        </div>

        {/* Stock Indicator - Bottom Left */}
        {parseInt(stock) < 20 && (
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 lg:bottom-4 lg:left-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] xs:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 lg:px-3 lg:py-1.5 rounded-full font-medium shadow-md flex items-center gap-1">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full" />
            <span className="hidden xs:inline">Only {stock} left</span>
            <span className="xs:hidden">{stock} left</span>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-3 sm:p-4 lg:p-5 flex-grow flex flex-col">
        {/* Category & Gender Tags */}
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
          <span className="bg-gray-100 text-gray-600 text-[10px] xs:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium">
            {category?.substring(0, 10)}
            {category?.length > 10 ? '...' : ''}
          </span>
          {gender && (
            <span className="bg-pink-50 text-pink-600 text-[10px] xs:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full font-medium">
              {gender?.substring(0, 8)}
              {gender?.length > 8 ? '...' : ''}
            </span>
          )}
        </div>

        {/* Brand - Only show on larger screens */}
        {brand && (
          <div className="mb-1 hidden sm:block">
            <span className="text-[10px] xs:text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {brand?.substring(0, 20)}
              {brand?.length > 20 ? '...' : ''}
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link to={`/products-details/${_id}`}>
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900  line-clamp-2 hover:text-amber-600 transition-colors duration-200 leading-tight ">
            {name}
          </h3>
        </Link>

        {/* Specifications Preview - Hidden on mobile */}
        {specifications && specifications.length > 0 && (
          <div className="hidden sm:flex items-center gap-2 text-xs lg:text-sm text-gray-600 ">
            <FaTag className="text-gray-400" size={10} />
            <span className="truncate">
              {specifications[0]?.substring(0, 40)}
              {specifications[0]?.length > 40 ? '...' : ''}
            </span>
          </div>
        )}
        {/* 
    

        {/* Price Section */}
        <div className="mt-auto">
          <div className="flex items-baseline mb-1 sm:mb-2 lg:mb-3">
            {displayDiscountPrice ? (
              <>
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                  ৳{displayDiscountPrice.toLocaleString()}
                </span>
                <span className="text-sm sm:text-base lg:text-lg text-gray-500 line-through ml-1 sm:ml-2">
                  ৳{displayPrice.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                ৳{displayPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-2">
            <Link to={`/products-details/${_id}`} className="flex-1">
              <button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 sm:py-3 rounded-md font-semibold text-sm sm:text-base transition-all duration-200 hover:shadow-lg active:scale-[0.98]">
                অর্ডার করুন
              </button>
            </Link>

            {/* Mobile Quick Actions */}
            <div className="flex sm:hidden items-center justify-between mt-2">
              <button className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-red-500 transition-colors text-xs">
                <FaHeart size={12} />
                <span>Save</span>
              </button>
              <div className="w-px h-4 bg-gray-200"></div>
              <button className="flex-1 flex items-center justify-center gap-1 text-gray-600 hover:text-blue-500 transition-colors text-xs">
                <FaEye size={12} />
                <span>Quick View</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
