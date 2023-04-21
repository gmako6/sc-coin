import Identicons from "react-identicons";
import { SiBinance } from "react-icons/si";
import { payoutProject } from "../services/blockchain";
import { useNavigate } from "react-router-dom";
import {
  daysRemaining,
  setGlobalState,
  truncate,
  useGlobalState,
} from "../store";

const ProjectDetails = ({ project }) => {
  const expired = new Date().getTime() > Number(project?.expiresAt + "000");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [group] = useGlobalState("group");
  const navigate = useNavigate();

  //Handle chat.
  const handleChat = () => {
    if (group?.hasJoined) {
      navigate(`/chats/` + project.id);
    } else {
      setGlobalState("chatModal", "scale-100");
    }
  };

  return (
    <>
      <div className="">
        <h1 className="text-gray-900 text-2xl font-medium mb-3">
          {project?.title}
        </h1>
        <div className="flex justify-start sm:space-x-4 flex-wrap ">
          <img
            src={project?.imageURL}
            alt={project?.title}
            className="rounded h-64 w-full sm:w-1/3 object-cover border-2 border-pink-500"
          />
          <div className="flex-1 sm:py-0 py-4">
            {/*Title Days Left*/}
            <div className="flex flex-col justify-start flex-wrap">
              <small className="text-pink-500">
                {expired
                  ? "Expired"
                  : daysRemaining(project?.expiresAt) + " left"}
              </small>
            </div>
            {/*Donation Details */}
            <div className="flex justify-between items-center w-full py-3">
              <div className="flex justify-start items-center space-x-2">
                <span>
                  <Identicons
                    string={project?.owner}
                    size={15}
                    className="rounded-full shadow-md"
                  />
                </span>
                {project?.owner ? (
                  <small className="text-gray-700">
                    {truncate(project?.owner, 4, 4, 11)}
                  </small>
                ) : null}

                <small className="text-gray-500 font-bold">
                  {project?.donators} Donator{project?.donators == 1 ? "" : "s"}
                </small>
              </div>
              <div className="font-bold">
                {expired ? (
                  <small className="text-red-500">Expired</small>
                ) : project?.status == 0 ? (
                  <small className="text-pink-500">Open</small>
                ) : project?.status == 1 ? (
                  <small className="text-green-500">Accepted</small>
                ) : project?.status == 2 ? (
                  <small className="text-gray-500">Reverted</small>
                ) : project?.status == 3 ? (
                  <small className="text-red-500">Deleted</small>
                ) : (
                  <small className="text-orange-500">Paid</small>
                )}
              </div>
            </div>
            {/*Progress Donation */}
            <div className="py-2">
              <h5 className="font-bold text-lg">Progress</h5>
              <div className="w-full bg-gray-300 overflow-hidden mt-3">
                <div
                  className="bg-pink-500/75 text-xs font-medium text-pink-300 text-center p-0.5 leading-none rounded-l-full h-1"
                  style={{
                    width: `${(project?.raised / project?.cost) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between  items-center mt-2 font-bold">
                <small className=" flex items-center space-x-2">
                  <SiBinance className="text-orange" />
                  <span className="text-gray-500">
                    {project?.raised} BNB Raised
                  </span>
                </small>
                <small className=" flex items-center space-x-2">
                  <SiBinance className="text-orange" />
                  <span className="text-gray-500">{project?.cost} BNB </span>
                </small>
              </div>
            </div>

            {/*Donate buttons */}
            <div className="flex flex-wrap mt-4 space-x-2 space-y-1">
              {project?.status == 0 ? (
                <button
                  type="button"
                  onClick={() => setGlobalState("donateModal", "scale-100")}
                  className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
                >
                  Donate
                </button>
              ) : null}

              {/*Admin buttons */}
              {connectedAccount == project?.owner ? (
                project?.status != 3 ? (
                  project?.status == 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={() => payoutProject(project?.id)}
                        className="py-1 px-6 text-m md:flex bg-yellow-600 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
                      >
                        Payout
                      </button>
                    </>
                  ) : project?.status != 4 ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setGlobalState("updateModal", "scale-100")
                        }
                        className="py-1 px-6 text-m md:flex bg-gradient-to-r from-gray-900 to-gray-600  hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setGlobalState("deleteModal", "scale-100")
                        }
                        className="py-1 px-6 text-m md:flex bg-gradient-to-r from-red-900 to-red-700 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="py-1 px-6 text-m md:flex bg-gradient-to-r from-red-700 to-fuchsia-800 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
                      >
                        Project Closed
                      </button>
                    </>
                  )
                ) : null
              ) : null}

              <button
                onClick={handleChat}
                type="button"
                className="py-1 px-6 text-m md:flex bg-gradient-to-r from-orange-900 to-orange-500 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
              >
                Chat
              </button>
            </div>
          </div>
        </div>

        {/*Description*/}
        <div className="py-10">
          <h5 className="font-bold text-lg">Description</h5>
          <p className="text-sm font-light mt-4">{project?.description}</p>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
