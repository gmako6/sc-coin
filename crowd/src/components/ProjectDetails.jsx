import Identicons from "react-identicons";
import { SiBinance } from "react-icons/si";
import { setGlobalState } from "../store";

const ProjectDetails = () => {
  return (
    <div className="">
      <h1 className="text-gray-900 text-2xl font-medium mb-3">
        Turkey Earthquick
      </h1>
      <div className="flex justify-start sm:space-x-4 flex-wrap">
        <img
          src="https://s.abcnews.com/images/International/turkey-earth-quake-gty-mz-01-230209_1675955333241_hpMain_16x9_992.jpg"
          alt="earth-turkey"
          className="rounded h-64 w-full sm:w-1/3 object-cover"
        />
        <div className="flex-1 sm:py-0 py-4">
          {/*Title Days Left*/}
          <div className="flex flex-col justify-start flex-wrap">
            <small className="text-pink-500">3 days left</small>
          </div>

          {/*Donation Details */}
          <div className="flex justify-between items-center w-full py-3">
            <div className="flex justify-start items-center space-x-2">
              <span>
                <Identicons
                  string="0x9e....487f"
                  size={15}
                  className="rounded-full shadow-md"
                />
              </span>
              <small className="text-gray-700">0x9e....487f</small>
              <small className="text-gray-500 font-bold">{15} Donors</small>
            </div>
            <div className="font-bold">
              <small className="text-pink-500">Open</small>
            </div>
          </div>

          {/*Progress Donation */}
          <div className="py-2">
            <h5 className="font-bold text-lg">Progress</h5>
            <div className="w-full bg-gray-300 mt-3">
              <div
                className="bg-pink-500/75 text-xs font-medium text-pink-300 text-center p-0.5 leading-none rounded-l-full h-1"
                style={{ width: "50%" }}
              ></div>
            </div>
            <div className="flex justify-between  items-center mt-2 font-bold">
              <small className=" flex items-center space-x-2">
                <SiBinance className="text-orange" />
                <span className="text-gray-500">3 BNB Raised</span>
              </small>
              <small className=" flex items-center space-x-2">
                <SiBinance className="text-orange" />
                <span className="text-gray-500">10 BNB </span>
              </small>
            </div>
          </div>

          <div className="flex flex-wrap mt-4 space-x-2 space-y-1">
            <button
              type="button"
              onClick={() => setGlobalState("donateModal", "scale-100")}
              className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
            >
              Donate
            </button>
            <button
              type="button"
              onClick={() => setGlobalState("updateModal", "scale-100")}
              className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-800 to-fuchsia-900 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => setGlobalState("deleteModal", "scale-100")}
              className="py-1 px-6 text-m md:flex bg-gradient-to-r from-red-700 to-fuchsia-800 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => {}}
              className="py-1 px-6 text-m md:flex bg-yellow-600 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
            >
              Payout
            </button>
          </div>
        </div>
      </div>
      {/*Description*/}
      <div className="py-10">
        <h5 className="font-bold text-lg">Description</h5>
        <p className="text-sm font-light mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque
          doloremque iure, doloribus quibusdam, blanditiis aperiam voluptas
          autem reiciendis sed perferendis non officiis esse dolorem maxime
          soluta placeat dolor deleniti ratione!
        </p>
      </div>
    </div>
  );
};

export default ProjectDetails;
