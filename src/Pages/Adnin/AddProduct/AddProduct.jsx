import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  FaUpload,
  FaPlus,
  FaMinus,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    price: '',
    discountPrice: '',
    stock: '',
    description: '',
    brand: '',
    sku: '',
    warranty: '',
    frameMaterial: '',
    lensType: '',
    lensColor: '',
    frameColor: '',
    gender: '',
    freeDelivery: false,
    specifications: [''],
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [activeTab, setActiveTab] = useState('basic');

  const categories = [
    'Sunglasses',
    'Power Glasses',
    'Frame Collection',
    'Double Poly Sunglasses',
    'Polarized Sunglasses',
    'Ray-Ban Sunglass',
    'Corina Metal',
    'Carbon Fiber',
    'TR90',
    'Lance Clear',
    'Contact Lenses',
    'Fiver Frames',
    'Regular',
  ];

  const brands = [
    'Ray-Ban',
    'Ray-Ban X Polarized',
    'Oakley',
    'Tom Ford',
    'Dior',
    'Gucci',
    'Prada',
    'Versace',
    'Mont Blanc',
    'Nike',
    'Porsche Design',
    'Persol',
    'Maui Jim',
    'Carrera',
  ];

  const frameMaterials = [
    'Acetate',
    'Metal',
    'TR90',
    'Carbon Fiber',
    'Stainless Steel',
    'Titanium',
    'Monel',
    'Aluminum',
    'Beryllium',
    'Biomass',
  ];

  const lensTypes = [
    'Polarized',
    'Photochromic',
    'Mirrored',
    'Gradient',
    'Blue Light Filter',
    'UV Protection',
    'Anti-Reflective',
    'Polycarbonate',
    'High-Index',
    'CR-39',
  ];

  const lensColors = [
    'Grey',
    'Brown',
    'Green',
    'Blue',
    'Yellow',
    'Rose',
    'Mirror Silver',
    'Mirror Gold',
    'Mirror Blue',
    'Clear',
  ];

  const genders = ['Men', 'Women', 'Unisex', 'Kids'];

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setProductData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSpecificationChange = (index, value) => {
    const newSpecifications = [...productData.specifications];
    newSpecifications[index] = value;
    setProductData(prev => ({
      ...prev,
      specifications: newSpecifications,
    }));
  };

  const addSpecification = () => {
    setProductData(prev => ({
      ...prev,
      specifications: [...prev.specifications, ''],
    }));
  };

  const removeSpecification = index => {
    const newSpecifications = productData.specifications.filter(
      (_, i) => i !== index,
    );
    setProductData(prev => ({
      ...prev,
      specifications: newSpecifications,
    }));
  };

  const handleImageUpload = async e => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const uploadedImages = [];
    const uploadedPreviews = [];

    for (const file of files) {
      if (imagePreviews.length + uploadedPreviews.length >= 8) {
        Swal.fire({
          title: 'Maximum Images Reached',
          text: 'You can upload up to 8 images only',
          icon: 'warning',
        });
        break;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=f5da3e17ec149d506523da879404ef26`,
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await res.json();

        if (data.success) {
          uploadedImages.push(data.data.url);
          uploadedPreviews.push(data.data.url);
        }
      } catch (error) {
        console.error('imgBB upload failed', error);
      }
    }

    setProductData(prev => ({
      ...prev,
      images: [...prev.images, ...uploadedImages],
    }));

    setImagePreviews(prev => [...prev, ...uploadedPreviews]);
  };

  const removeImage = index => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newImages = productData.images.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setProductData(prev => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validate discount price
    if (
      productData.discountPrice &&
      parseFloat(productData.discountPrice) > parseFloat(productData.price)
    ) {
      Swal.fire({
        title: 'Invalid Discount Price',
        text: 'Discount price cannot be higher than regular price',
        icon: 'error',
      });
      return;
    }

    const finalData = {
      ...productData,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Product added successfully',
          icon: 'success',
          confirmButtonColor: '#3B82F6',
        });

        // Reset form
        setProductData({
          name: '',
          category: '',
          price: '',
          discountPrice: '',
          stock: '',
          description: '',
          brand: '',
          sku: '',
          warranty: '',
          frameMaterial: '',
          lensType: '',
          lensColor: '',
          frameColor: '',
          gender: '',
          freeDelivery: false,
          specifications: [''],
          images: [],
        });
        setImagePreviews([]);
        setActiveTab('basic');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong. Please try again.',
        icon: 'error',
      });
    }
  };

  const generateSKU = () => {
    const prefix = productData.category
      ? productData.category.substring(0, 3).toUpperCase()
      : 'GLASS';
    const sku = `${prefix}-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substr(2, 3).toUpperCase()}`;
    setProductData(prev => ({ ...prev, sku }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Add New Eyewear Product
              </h1>
              <p className="text-gray-600 mt-2">
                Add premium eyewear to your collection
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm border">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">
                  Online Store
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              {/* Left Column - Always visible on desktop */}
              <div className="lg:col-span-2 p-6 md:p-8">
                {(activeTab === 'basic' || window.innerWidth >= 768) && (
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                        1
                      </span>
                      Basic Information
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Product Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., Ray-Ban Aviator Classic"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Category *
                          </label>
                          <select
                            name="category"
                            value={productData.category}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                            required
                          >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Brand
                          </label>
                          <select
                            name="brand"
                            value={productData.brand}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Brand</option>
                            {brands.map(brand => (
                              <option key={brand} value={brand}>
                                {brand}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              SKU Code
                            </label>
                            <button
                              type="button"
                              onClick={generateSKU}
                              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                            >
                              Generate
                            </button>
                          </div>
                          <input
                            type="text"
                            name="sku"
                            value={productData.sku}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., RB-AV-001"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <span className="flex items-center gap-1">
                              Regular Price *
                              <FaBangladeshiTakaSign className="font-bold text-xs" />
                            </span>
                          </label>
                          <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            <span className="flex items-center gap-1">
                              Discount Price
                              <FaBangladeshiTakaSign className="font-bold text-xs" />
                            </span>
                          </label>
                          <input
                            type="number"
                            name="discountPrice"
                            value={productData.discountPrice}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="Optional"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Stock Quantity *
                          </label>
                          <input
                            type="number"
                            name="stock"
                            value={productData.stock}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={productData.description}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          placeholder="Describe the product features, comfort, and style..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(activeTab === 'details' || window.innerWidth >= 768) && (
                  <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                        2
                      </span>
                      Eyewear Specifications
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Frame Material
                          </label>
                          <select
                            name="frameMaterial"
                            value={productData.frameMaterial}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Material</option>
                            {frameMaterials.map(material => (
                              <option key={material} value={material}>
                                {material}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lens Type
                          </label>
                          <select
                            name="lensType"
                            value={productData.lensType}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Lens Type</option>
                            {lensTypes.map(type => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Lens Color
                          </label>
                          <select
                            name="lensColor"
                            value={productData.lensColor}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Lens Color</option>
                            {lensColors.map(color => (
                              <option key={color} value={color}>
                                {color}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Frame Color
                          </label>
                          <input
                            type="text"
                            name="frameColor"
                            value={productData.frameColor}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., Black, Gold, Tortoise"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Gender
                          </label>
                          <select
                            name="gender"
                            value={productData.gender}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          >
                            <option value="">Select Gender</option>
                            {genders.map(gender => (
                              <option key={gender} value={gender}>
                                {gender}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Warranty
                          </label>
                          <input
                            type="text"
                            name="warranty"
                            value={productData.warranty}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., 1 Year Warranty"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-4">
                          Additional Specifications
                        </label>
                        {productData.specifications.map((spec, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 mb-3"
                          >
                            <input
                              type="text"
                              value={spec}
                              onChange={e =>
                                handleSpecificationChange(index, e.target.value)
                              }
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                              placeholder="e.g., Frame Width: 140mm, Lens Width: 60mm"
                            />
                            <button
                              type="button"
                              onClick={() => removeSpecification(index)}
                              className="p-3 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addSpecification}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                        >
                          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center mr-2">
                            <FaPlus className="w-4 h-4" />
                          </div>
                          Add Specification
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Media & Actions */}
              <div className="bg-gradient-to-b from-gray-50 to-white p-6 md:p-8 border-t lg:border-t-0 lg:border-l border-gray-200">
                {(activeTab === 'media' || window.innerWidth >= 768) && (
                  <>
                    <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm mr-2">
                        3
                      </span>
                      Product Media
                    </h2>

                    {/* Image Upload Section */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Upload Images (Max 8)
                        <span className="text-gray-500 text-xs font-normal ml-2">
                          {imagePreviews.length}/8 images
                        </span>
                      </label>
                      <div className="border-3 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors duration-200 bg-gray-50">
                        <div className="flex flex-col items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                            <FaUpload className="w-8 h-8 text-blue-500" />
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            Drag & drop images here or click to browse
                          </p>
                          <p className="text-xs text-gray-500 mb-4">
                            Supported formats: JPG, PNG, WebP. Max 5MB each
                          </p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={imagePreviews.length >= 8}
                          />
                          <label
                            htmlFor="image-upload"
                            className={`px-6 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 ${imagePreviews.length >= 8 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg'}`}
                          >
                            Browse Images
                          </label>
                        </div>
                      </div>

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="mt-6">
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {imagePreviews.map((preview, index) => (
                              <div key={index} className="relative group">
                                <div className="aspect-square rounded-xl overflow-hidden border border-gray-200">
                                  <img
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                                >
                                  <FaTrash className="w-3 h-3" />
                                </button>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                  <span className="text-xs text-white font-medium">
                                    Image {index + 1}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Image Tips */}
                      <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                        <p className="text-sm text-blue-800 font-medium mb-1">
                          📸 Image Tips for Eyewear:
                        </p>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Show product from multiple angles</li>
                          <li>• Include close-ups of lens quality</li>
                          <li>• Showcase frame details and hinges</li>
                          <li>• Include model wearing the eyewear</li>
                        </ul>
                      </div>
                    </div>

                    {/* Free Delivery Option */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <FaEye className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <label className="text-sm font-semibold text-gray-800 cursor-pointer">
                              Free Delivery
                            </label>
                            <p className="text-xs text-gray-600">
                              Offer free shipping for this product
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="freeDelivery"
                            checked={productData.freeDelivery}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <h3 className="font-semibold text-gray-800 mb-4">
                        Product Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Name</span>
                          <span className="font-medium truncate ml-2 max-w-[150px]">
                            {productData.name || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Category</span>
                          <span className="font-medium">
                            {productData.category || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Price</span>
                          <span className="font-medium flex items-center">
                            {productData.price ? (
                              <>
                                <FaBangladeshiTakaSign className="mr-1" />
                                {productData.price}
                              </>
                            ) : (
                              'Not set'
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Images</span>
                          <span className="font-medium">
                            {imagePreviews.length} uploaded
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Navigation Buttons for Mobile */}
                <div className="md:hidden mt-8">
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === 'details') setActiveTab('basic');
                        else if (activeTab === 'media') setActiveTab('details');
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                      disabled={activeTab === 'basic'}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === 'basic') setActiveTab('details');
                        else if (activeTab === 'details') setActiveTab('media');
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
                      disabled={activeTab === 'media'}
                    >
                      Next
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col space-y-3">
                    <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Save as Draft
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <FaPlus className="w-4 h-4 mr-2" />
                      Publish Product
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Responsive Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            <span className="hidden md:inline">💡</span>
            <span className="md:hidden">📱</span> This form is fully responsive.
            On mobile, use tabs to navigate between sections.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
