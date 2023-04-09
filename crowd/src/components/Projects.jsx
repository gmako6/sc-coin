import React from "react";
import { Link } from "react-router-dom";
import Identicons from "react-identicons";

const Projects = () => {
  return (
    <div className="container mx-auto md:py-24 py-10 px-5">
      {/*Heading Section */}
      <div className="flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold ">Welcome to the Future of Giving</h1>
        <p className="mt-5">
          Giving is effortless and people all around the world are rewarded for
          creating positive change.
        </p>
      </div>
      <div className="flex justify-center items-center flex-wrap mt-10">
        {Array(6)
          .fill()
          .map((card, i) => (
            <ProjectCard key={i} id={i} project={card} />
          ))}
      </div>
    </div>
  );
};
const ProjectCard = ({ card, id }) => {
  return (
    <div
      id="projects"
      className="bg-slate-100 shadow-lg ring-offset-2 ring-2 ring-pink-500/75 rounded md:w-64 m-4 "
    >
      <Link to={"/projects/" + id}>
        <img
          src="https://s.abcnews.com/images/International/turkey-earth-quake-gty-mz-01-230209_1675955333241_hpMain_16x9_992.jpg"
          alt="earth-turkey"
          className="rounded h-64 w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={"/projects/" + id}>
          <h5 className="font-bold leading">Turkey Earthquick</h5>
        </Link>

        {/*Pool Creator Details*/}
        <div className="flex flex-col my-2">
          <div className="flex items-center justify-between mb-3">
            <Identicons
              string={"0x15...bu34" + id}
              size={15}
              className="rounded-full shadow-md"
            />
            <small className="text-gray-700 ">0x15...bu34{id}</small>
          </div>
          <small>2 Days left</small>
        </div>

        {/*Progress Donation */}
        <div className="w-full bg-gray-300 ">
          <div
            className="bg-pink-500/75 text-xs font-medium text-pink-300 text-center p-0.5 leading-none rounded-l-full h-1"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-4 mb-2 font-bold">
          <small className="">{14} Donors</small>
          <div>
            <small className="text-pink-500">Open</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
