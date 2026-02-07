import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaTruck,
  FaShieldAlt,
  FaStar,
  FaCheck,
} from 'react-icons/fa';
import { IoMdArrowRoundBack } from 'react-icons/io';
import axios from 'axios';
import BuyNowModal from '../../Components/Modal/BuyNowModal';
import RelatedProducts from '../../Components/Products/RelatedProducts';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  console.log(product);
  const [activeTab, setActiveTab] = useState('description');
  const [wishlisted, setWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/single-products/${id}`,
        );
        setProduct(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              Back to Home
            </button>
            <button
              onClick={() => navigate('/products')}
              className="flex-1 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const {
    name = 'Product Name',
    price = 0,
    discountPrice = 0,
    description = 'No description available',
    brand = 'Unknown Brand',
    category = '',
    gender = '',
    sku = 'N/A',
    specifications = [],
    images = ['https://via.placeholder.com/500x500?text=No+Image'],
    freeDelivery = false,
    frameColor = '',
    frameMaterial = '',
    lensColor = '',
    lensType = '',
    isNew = false,
    isHot = false,
  } = product;

  const discountPercent =
    discountPrice && price > 0
      ? Math.round(
          ((parseFloat(price) - parseFloat(discountPrice)) /
            parseFloat(price)) *
            100,
        )
      : 0;

  const displayPrice = parseFloat(price) || 0;
  const displayDiscountPrice = discountPrice ? parseFloat(discountPrice) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-red-600 transition-colors">
                Home
              </Link>
            </li>

            <li className="flex items-center">
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {name}
              </span>
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-6">
            {/* Main Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-4 sm:p-6 mb-6">
              <div className="aspect-square relative overflow-hidden rounded-md">
                <img
                  src={images[selectedImage]}
                  alt={name}
                  className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-red-500 shadow-md scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="lg:col-span-6">
            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                {isNew && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                    NEW
                  </span>
                )}
                {isHot && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">
                    HOT
                  </span>
                )}
                <span className="text-sm text-gray-500">{brand}</span>
              </div>

              <h1 className="text-xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
                {name}
              </h1>
            </div>

            {/* Price Section */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                {displayDiscountPrice ? (
                  <>
                    <span className="text-4xl font-bold text-gray-900">
                      ৳{displayDiscountPrice.toLocaleString()}
                    </span>
                    <span className="text-2xl text-gray-400 line-through">
                      ৳{displayPrice.toLocaleString()}
                    </span>
                    {discountPercent > 0 && (
                      <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-bold rounded-full">
                        Save {discountPercent}%
                      </span>
                    )}
                  </>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ৳{displayPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <div className="flex  md:gap-10 ">
              {/* Color & Size Options */}
              {(frameColor || lensColor || category || gender) && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                    Options
                  </h3>

                  <div className="grid grid-cols-4 gap-2">
                    {frameColor && (
                      <div>
                        <p className="text-[12px] text-gray-500 mb-1">
                          Frame Color
                        </p>
                        <span className="inline-block text-[11px] font-medium bg-gray-100 px-2 py-1 rounded-full">
                          {frameColor}
                        </span>
                      </div>
                    )}

                    {lensColor && (
                      <div>
                        <p className="text-[12px] text-gray-500 mb-1">
                          Lens Color
                        </p>
                        <span className="inline-block text-[11px] font-medium bg-gray-100 px-2 py-1 rounded-full">
                          {lensColor}
                        </span>
                      </div>
                    )}

                    {category && (
                      <div>
                        <p className="text-[12px] text-gray-500 mb-1">
                          Category
                        </p>
                        <span className="text-[11px] font-medium">
                          {category}
                        </span>
                      </div>
                    )}

                    {gender && (
                      <div>
                        <p className="text-[12px] text-gray-500 mb-1">Gender</p>
                        <span className="text-[11px] font-medium">
                          {gender}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-6 py-3 text-lg font-semibold min-w-[60px] text-center border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
                {/* Features */}
                <div className="md:flex md:gap-5">
                  {freeDelivery && (
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <FaTruck className="text-green-600" size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Free Delivery
                        </p>
                        <p className="text-xs text-green-600">
                          Within 2-3 days
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <FaCheck size={14} />
                    <span>Cash On Delivery</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-4 px-6 rounded-md font-bold text-lg transition-all duration-200 hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 shadow-lg shadow-red-200"
                >
                  <FaShoppingCart size={20} />
                  অর্ডার করুন
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'details'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 font-medium text-sm uppercase tracking-wider transition-colors relative ${
                    activeTab === tab
                      ? 'text-red-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
                  {description}
                </p>
              </div>
            )}

            {activeTab === 'specifications' && specifications.length > 0 && (
              <div className="space-y-4">
                {specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-red-600" size={12} />
                    </div>
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid md:grid-cols-2 gap-6">
                {frameMaterial && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Frame Material</p>
                    <p className="font-medium">{frameMaterial}</p>
                  </div>
                )}
                {frameColor && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Frame Colors</p>
                    <p className="font-medium">{lensColor}</p>
                  </div>
                )}
                {lensType && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Lens Type</p>
                    <p className="font-medium">{lensType}</p>
                  </div>
                )}
                {lensColor && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Lens Color</p>
                    <p className="font-medium">{lensColor}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts products={products}></RelatedProducts>
      </main>

      <BuyNowModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetails;
