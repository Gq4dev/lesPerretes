// components/Navbar.js

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 h-16 w-full flex items-center justify-between px-4">
      <div className="flex items-center">
        <img src="/images/logo.jpeg" alt="Icono" className="h-[60px] mr-2" />
      </div>
      <div>
        <h2 className="text-white hover:text-gray-300">Guarderia Les Perretes</h2>
      </div>
      <ul className="flex items-center">
        <li className="mr-4">
          <Link href="/dogs" className="text-white hover:text-gray-300">Dogs</Link>
        </li>
        <li>
          <Link href="/owners" className="text-white hover:text-gray-300">Owners</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
