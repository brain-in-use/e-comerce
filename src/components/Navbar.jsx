import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // For accessing the store state

function Navbar() {

  // Access cart totalItems from the Redux store
  const cartCount = useSelector((state) => state.cart.totalItems);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isOpen, setIsOpen] = useState(false); // For mobile menu
  const [showSearch, setShowSearch] = useState(false); // For toggling search input visibility
  const [searchTerm, setSearchTerm] = useState(""); // For managing search input state
  // const [cartCount, setCartCount] = useState(3); // Example cart count

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
    // Add your search logic here
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">E-Commerce</Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Menu Items */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 mt-3 md:mt-0`}
        >
          <li>
            <Link to="/" className="block py-2 px-3 rounded hover:bg-blue-700">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="block py-2 px-3 rounded hover:bg-blue-700"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block py-2 px-3 rounded hover:bg-blue-700"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block py-2 px-3 rounded hover:bg-blue-700"
            >
              Contact
            </Link>
          </li>
        </ul>

        {/* Search Bar for Desktop */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center relative"
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 rounded-l-lg text-black focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-r-lg text-white"
          >
            Search
          </button>
        </form>

        {/* Search Icon and Input for Mobile */}
        <div className="relative md:hidden">
          <button
            className="focus:outline-none"
            onClick={() => setShowSearch(!showSearch)}
          >
            <svg
              className="w-6 h-6 text-white hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m-1.55-1.55a7 7 0 111.55-1.55l4.35 4.35z"
              />
            </svg>
          </button>
          {showSearch && (
            <form
              onSubmit={handleSearch}
              className="absolute top-8 right-0 bg-white p-2 rounded shadow-lg flex items-center"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded-l-lg text-black focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-r-lg text-white"
              >
                Go
              </button>
            </form>
          )}
        </div>

          {/* Login SignUp */}
          <div >
          <ul className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 md:mt-0">
          {!isLoggedIn&&<li>
            <Link
              to="/login"
              className="block py-2 px-3 rounded bg-green-500 hover:bg-green-600"
            >
              Login
            </Link>
          </li>}
          {isLoggedIn&&<li>
            <Link
              to="/signup"
              className="block py-2 px-3 rounded bg-yellow-500 hover:bg-yellow-600"
            >
              Signup
            </Link>
          </li>}
          </ul>
        </div>


        {/* Shopping Cart */}
        <div className="relative flex items-center ml-4">
          <Link to="/cart" className="flex items-center">
            <svg
              className="w-6 h-6 text-white hover:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13L6 17h12l-1-4M10 21h4m-4 0a2 2 0 01-4 0m4 0a2 2 0 004 0"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
