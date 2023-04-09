import React from "react";
import { setGlobalState } from "../store";

const Hero = () => {
  return (
    <div className="md:py-24  bg-[url('./assets/contentImages/layered-peaks.svg')] bg-no-repeat bg-cover">
      <div className="container mx-auto ">
        <div className="md:pt-24 pt-5"></div>
        <div className=" pl-5 pr-5 md:pl-0 md:pr-0 select-none">
          <div className="md:pt-5 md:pb-5 pt-20 pb-12 grid justify-items-center">
            {/**Headings Here */}
            <h1 className="md:text-md text-black font-bold uppercase">
              Charity on blockchain
            </h1>
            <h1 className="text-center text-3xl mt-5 md:text-6xl font-bold md:pl-20 md:pr-20">
              Welcome to the Future of Giving through blockchain.
            </h1>

            <div className="flex pt-3">
              <button
                type="button"
                onClick={() => setGlobalState("createModal", "scale-100")}
                className=" py-3 px-10 m-2 md:mt-12 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
              >
                Add Project
              </button>
              <button
                type="button"
                onClick={() => {}}
                className="py-3 px-10 m-2 md:mt-12 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
              >
                Pools
              </button>
            </div>
            <div className="grid grid-cols-3 justify-center items-center mt-10 gap-5 ">
              <div className="p-5 flex flex-col justify-center items-center bg-slate-100 h-20 border shadow-md w-full">
                <span className="text-lg font-bold text-pink-500 leading-5">
                  {5}
                </span>
                <span>Pools</span>
              </div>
              <div className="p-5 flex flex-col justify-center items-center bg-slate-100 h-20 border shadow-md w-full">
                <span className="text-lg font-bold text-pink-500 leading-5">
                  {55}
                </span>
                <span>Donators</span>
              </div>
              <div className="p-5 flex flex-col justify-center items-center bg-slate-100 h-20 border shadow-md w-full">
                <span className="text-lg font-bold text-pink-500 leading-5">
                  {26} BNB
                </span>
                <span>Donated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
