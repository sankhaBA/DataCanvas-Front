import React from "react";
import { useState } from "react";
import { FaBars, FaWindowClose } from "react-icons/fa";

const navigation = [
  { id: 1, name: "Explore Locations", href: "/" },
  { id: 2, name: "Report Issue", href: "/#courses" },
];

function PublicNavbar() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-50 bg-black py-5 px-2 sm:px-20 md:px-30 lg:px-40 xl:px-50">
      <nav className="flex items-center justify-between px-6 lg:px-8">
        <div className="flex items-center">
          {/* <img className="w-12 h-12" src="/img/logo.png" alt="" /> */}
          <span className="text-xl text-gray2 font-bold font-poppins ml-2">
            AirSense Pro
          </span>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <FaBars className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:space-x-6">
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-gray2 hover:text-gray1"
            >
              {item.name}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default PublicNavbar;
