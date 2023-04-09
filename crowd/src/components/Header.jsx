import React from "react";
import logo from "../assets/logo/brandline.svg";

const Header = () => {
  return (
    <header className=" p-5 bg-white text-gray-500 hover:text-pink-500 shadow-lg fixed top-0 left-0 right-0">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/">
          <img src={logo} alt="logo" className=" origin-left h-8 " />
        </a>
        <button
          type="button"
          onClick={() => {}}
          className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
        >
          Connect
        </button>
      </div>
    </header>
  );
};

export default Header;
