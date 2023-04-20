import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { deleteProject } from "../services/blockchain";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteProject = ({ project }) => {
  const [deleteModal] = useGlobalState("deleteModal");
  const navigate = useNavigate();

  //Handle Deletion.
  const handleSubmit = async () => {
    await deleteProject(project?.id);
    toast.success("Project deleted successfully, will reflect in 30sec.");
    setGlobalState("deleteModal", "scale-0");
    navigate.push("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${deleteModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{project?.title}</p>
            <button
              type="button"
              onClick={() => setGlobalState("deleteModal", "scale-0")}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className=" rounded-xl overflow-hidden h-20 w-20">
              <img
                src={project?.imageURL}
                alt={project?.title}
                className="rounded-lg h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between items-center  rounded-xl mt-5">
            <p className="">Are you sure?</p>
            <small className="text-red-800">This is irreversible</small>
          </div>

          <button
            onClick={handleSubmit}
            className="py-1 px-6 text-md flex items-center justify-center bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse mt-5"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProject;
