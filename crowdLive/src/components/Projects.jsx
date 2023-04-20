import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Identicons from "react-identicons";
import { daysRemaining, truncate } from "../store";
import { SiBinance } from "react-icons/si";

const Projects = ({ projects }) => {
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [collection, setCollection] = useState([]);

  const getCollection = () => projects.slice(0, end);

  useEffect(() => {
    setCollection(getCollection());
  }, [projects, end]);

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
        {collection.map((project, i) => (
          <ProjectCard key={i} project={project} />
        ))}
      </div>

      {projects.length > collection.length ? (
        <div className="container mx-auto flex justify-center items-center pb-5">
          <button
            type="button"
            onClick={() => setEnd(end + count)}
            className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
          >
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + "000");

  return (
    <div
      id="projects"
      className="bg-slate-100 shadow-lg ring-offset-2 ring-2 ring-pink-500/75 rounded md:w-64 m-4 "
    >
      <Link to={"/projects/" + project.id}>
        <img
          src={project?.imageURL}
          alt={project?.title}
          className="rounded h-64 w-full object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={"/projects/" + project.id}>
          <h5 className="font-bold leading">
            {truncate(project.title, 25, 0, 28)}
          </h5>
        </Link>

        {/*Pool Creator Details*/}
        <div className="flex flex-col my-2">
          <div className="flex items-center justify-start space-x-2 mb-3">
            <Identicons
              string={project?.owner}
              size={15}
              className="rounded-full shadow-md"
            />
            <small className="text-gray-700 ">
              {truncate(project?.owner, 4, 4, 11)}
            </small>
          </div>
          <small>
            {expired ? "Expired" : daysRemaining(project?.expiresAt) + " left"}
          </small>
        </div>

        {/*Progress Donation */}
        <div className="w-full bg-gray-300 overflow-hidden ">
          <div
            className="bg-pink-500/75 text-xs font-medium text-pink-300 text-center p-0.5 leading-none rounded-l-full h-1"
            style={{ width: `${(project.raised / project.cost) * 100}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center font-bold mt-1 mb-2 text-gray-700">
          <small>{project?.raised} BNB Raised</small>
          <small className="flex justify-start items-center">
            <SiBinance />
            <span>{project?.cost} BNB</span>
          </small>
        </div>

        <div className="flex justify-between items-center flex-wrap mt-4 mb-2 font-bold">
          <small>
            {project?.donators} Donator{project?.donators == 1 ? "" : "s"}
          </small>
          <div>
            {expired ? (
              <small className="text-red-500">Expired</small>
            ) : project?.status == 0 ? (
              <small className="text-pink-500">Open</small>
            ) : project?.status == 1 ? (
              <small className="text-green-500">Accepted</small>
            ) : project?.status == 2 ? (
              <small className="text-gray-500">Reverted</small>
            ) : project?.status == 3 ? (
              <small className="text-gray-500">Deleted</small>
            ) : (
              <small className="text-orange-500">Paid</small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
