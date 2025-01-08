// app/components/navbar.js
"use client";
import { useState } from "react";
import Link from "next/link";

const NavBar = () => {
  const [showDaily, setShowDaily] = useState(false);
  const [showUtilities, setShowUtilities] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-30 shadow-sm bg-yellow-400 px-4 py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img
            src="https://mediaemiten.com/wp-content/uploads/2024/11/wondr.png"
            width={60}
            height={30}
            alt="Logo"
          />
        </Link>

        <ul className="flex items-center gap-8 text-slate-500">
          {/* Daily Menu */}
          <li
            className="relative group"
            onMouseEnter={() => setShowDaily(true)}
            onMouseLeave={() => setShowDaily(false)}
          >
            <Link href="/daily" className="hover:text-gray-700">
              Daily
            </Link>
            {showDaily && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-sm text-gray-600">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/daily-recap">Daily Recap</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/fds-eyeballing">FDS Eyeballing</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/gtm-report">GTM Report</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/no-pinless">No Pinless</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/tnc">TNC</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/daily/zoloz">Zoloz</Link>
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
            <Link href="/utilities" className="hover:text-gray-700">
              Utilities
            </Link>
            {showUtilities && (
              <ul className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 py-2 text-sm text-gray-600">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/utilities/csv-to-excel">CSV to Excel</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/utilities/merge-filter">Merge and Filtering Data</Link>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <Link href="/utilities/multiple-query-generator">Multiple Query Generator</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Optional Link for User/Login */}
          <li>
            <Link href="/login" className="hover:text-gray-700">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
