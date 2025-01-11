"use client";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="sticky top-0 w-full z-30 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img
            src="https://mediaemiten.com/wp-content/uploads/2024/11/wondr.png"
            width={60}
            height={30}
            alt="Logo"
            className="rounded-md"
          />
        </Link>

        <ul className="flex items-center gap-12 text-white font-medium">
          {/* Direct Links */}
          <li>
            <Link href="/daily" className="hover:text-gray-300 transition-colors">
              Daily
            </Link>
          </li>
          <li>
            <Link href="/utilities" className="hover:text-gray-300 transition-colors">
              Utilities
            </Link>
          </li>

          {/* Optional Link for User/Login */}
          <li>
            <Link href="/login" className="hover:text-gray-300 transition-colors">
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
