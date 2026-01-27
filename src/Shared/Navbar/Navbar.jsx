import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaRegUser,
  FaShoppingCart,
  FaTimes,
  FaBars,
} from 'react-icons/fa';

import ICON from '../../assets/logo.png';
import NavMarquee from './NavMarquee';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#eaf4f4] via-[#e9ecef] to-[#ced4da] shadow-xl  top-0 z-50 sticky p-4">
      <div className="w-full px-2 sm:max-w-7xl mx-auto">
        {/* <NavMarquee /> */}

        {/* Main navbar content */}
        <div className="flex justify-between items-center ">
          {/* Mobile menu button - Left side */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className=" text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition duration-200 md:hidden shadow-sm"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          {/* Logo and brand name - Centered on mobile */}
          <Link
            to="/"
            className="flex items-center justify-center md:justify-start"
          >
            <div className="">
              <img className="h-14" src={ICON} alt="Logo" />
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-gray-800 placeholder-gray-500 border border-gray-300 shadow-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-r-md hover:from-red-600 hover:to-red-700 transition duration-200 font-semibold shadow-lg"
              >
                Search
              </button>
            </form>
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            {/* Search icon - Mobile */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition duration-200 md:hidden shadow-sm"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* User account icon */}
            <Link
              to="#"
              className=" text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition duration-200 hidden md:flex shadow-sm"
              aria-label="User account"
            >
              <FaRegUser className="w-5 h-5" />
              <span className="text-sm font-medium hidden lg:inline">
                Account
              </span>
            </Link>

            {/* Shopping cart icon */}
            <Link
              to="#"
              className=" text-gray-700 p-2 rounded-lg hover:bg-gray-200 transition duration-200 md:hidden shadow-sm"
              aria-label="Shopping cart"
            >
              <div className="relative">
                <FaShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-md">
                  3
                </span>
              </div>
              <span className="text-sm font-medium hidden lg:inline">Cart</span>
            </Link>
          </div>
        </div>

        {/* Search bar - Mobile */}
        {isMobileSearchOpen && (
          <div className="py-3 border-t border-gray-300 md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-gray-800 placeholder-gray-500 border border-gray-300"
                autoFocus
              />
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-r-lg transition duration-200 shadow-md"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
