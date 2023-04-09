import React from "react";

import Hero from "../components/Hero";
import Projects from "../components/Projects";
import CreateProject from "../components/CreateProject";
import AddProject from "../components/AddProject";
import UpdateProject from "../components/UpdateProject";

const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <div className="container mx-auto flex justify-center items-center pb-5">
        <button
          type="button"
          onClick={() => {}}
          className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
        >
          Load More
        </button>
      </div>
      <AddProject />
      <CreateProject />
    </>
  );
};

export default Home;
