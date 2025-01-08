"use client";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Menambahkan ikon untuk dropdown

const NavBar = () => {
  const [showDaily, setShowDaily] = useState(false);
  const [showUtilities, setShowUtilities] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-30 bg-yellow-400 px-6 py-3 shadow-md">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="https://mediaemiten.com/wp-content/uploads/2024/11/wondr.png"
            width={60}
            height={30}
            alt="Logo"
          />
        </Link>

        {/* Menu */}
        <ul className="flex items-center gap-10 text-gray-800 space-x-8">
          {/* Daily Menu */}
          <li
            className="relative group"
            onMouseEnter={() => setShowDaily(true)}
            onMouseLeave={() => setShowDaily(false)}
          >
            <Link href="#" className="flex items-center gap-2 hover:text-gray-700">
              Daily <FaChevronDown size={14} />
            </Link>
            {showDaily && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-sm text-gray-600 transition-all duration-300 ease-in-out opacity-100">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">Daily Recap</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">FDS Eyeballing</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">GTM Report</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">No Pin</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">TNC</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">Zoloz</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Utilities Menu */}
          <li
            className="relative group"
            onMouseEnter={() => setShowUtilities(true)}
            onMouseLeave={() => setShowUtilities(false)}
          >
            <Link href="#" className="flex items-center gap-2 hover:text-gray-700">
              Utilities <FaChevronDown size={14} />
            </Link>
            {showUtilities && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-sm text-gray-600 transition-all duration-300 ease-in-out opacity-100">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">CSV to Excel</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">Merge And Filtering Data</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="#">Multiple Query Generator</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Login Button */}
          <li>
            <Link href="/login" className="text-white bg-blue-500 hover:bg-blue-600 rounded-md py-2 px-4 transition duration-300">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
