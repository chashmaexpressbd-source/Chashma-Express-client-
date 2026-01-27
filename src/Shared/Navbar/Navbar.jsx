import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaRegUser,
  FaShoppingCart,
  FaTimes,
  FaBars,
} from 'react-icons/fa';

import ICON from '../../assets/logoIcon.png';
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
      setIsMobileSearchOpen(false); // Mobile search close after submit
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#831010] to-[#B91C1C] shadow-lg py-2 md:top-0 md:z-50 md:sticky">
      <div className="w-full px-2 sm:max-w-7xl mx-auto">
        <NavMarquee />

        {/* Main navbar content */}
        <div className="flex justify-between items-center py-5 md:py-3">
          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 rounded-md hover:bg-red-700 transition duration-200 md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          {/* Logo and brand name */}
          <Link to="/" className="flex items-center space-x-3 text-white">
            <div className="-mr-4 -mt-10 hidden md:block">
              <img className="w-14 h-8" src={ICON} alt="Logo" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-2xl md:text-lg">
                Chashma Express BD
              </span>
              <span className="text-center text-red-200 font-medium">
                চশমার সহজ সমাধান
              </span>
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
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-900 bg-opacity-50 text-white placeholder-red-200"
              />
              <button
                type="submit"
                className="bg-white text-red-700 px-4 py-2 rounded-r-md hover:bg-red-50 transition duration-200 font-medium"
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
              className="text-white p-2 rounded-full hover:bg-red-700 transition duration-200 md:hidden"
              aria-label="Search"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* User account icon */}
            <Link
              to="#"
              className="text-white p-2 rounded-full hover:bg-red-700 transition duration-200 hidden md:block"
              aria-label="User account"
            >
              <FaRegUser className="w-5 h-5" />
            </Link>

            {/* Shopping cart icon */}
            <Link
              to="#"
              className="text-white p-2 rounded-full hover:bg-red-700 transition duration-200 relative hidden md:block"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-white text-red-700 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                3
              </span>
            </Link>
          </div>
        </div>

        {/* Search bar - Mobile */}
        {isMobileSearchOpen && (
          <div className="py-3 border-t border-red-700 md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-900 bg-opacity-50 text-white placeholder-red-200"
                autoFocus
              />
              <button
                type="submit"
                className="bg-white text-red-700 px-4 py-2 rounded-r-md hover:bg-red-50 transition duration-200 font-medium"
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
