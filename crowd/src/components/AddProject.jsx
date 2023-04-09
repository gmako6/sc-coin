import { FaPlus } from "react-icons/fa";
import { setGlobalState } from "../store";

const AddProject = () => {
  return (
    <div className="container mx-auto fixed right-10 bottom-10 space-x-2 flex justify-end">
      <button
        type="button"
        onClick={() => setGlobalState("createModal", "scale-100")}
        className="w-9 h-9 text-md flex items-center justify-center bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 "
      >
        <FaPlus className="font-bold" size={20} />
      </button>
    </div>
  );
};

export default AddProject;
