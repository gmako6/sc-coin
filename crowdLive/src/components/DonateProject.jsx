import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { useState } from "react";
import { toast } from "react-toastify";
import { donateProject } from "../services/blockchain";

const DonateProject = ({ project }) => {
  const [donateModal] = useGlobalState("donateModal");
  const [amount, setAmount] = useState("");

  //handle submit donation.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount) return;

    await donateProject(project?.id, amount);
    toast.success("Project donated successfully, will reflect in 30sec.");
    setGlobalState("donateModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${donateModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded w-11/12 md:w-2/5 h-7/12 p-6">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{project?.title}</p>
            <button
              type="button"
              onClick={() => setGlobalState("donateModal", "scale-0")}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className=" rounded-xl overflow-hidden h-20 w-20">
              <img
                src={project?.imageURL || "https://succorcoin.com/logo.png"}
                alt={project?.title}
                className="rounded-lg h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="number"
              className="block w-full bg-transparent border-0 text-sm text-slate-100 focus:outline-none focus:ring-0"
              step={0.01}
              min={0.01}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
              placeholder="Amount (BNB)"
              required
            />
          </div>

          <button
            type="submit"
            onClick={() => {}}
            className="py-1 px-6 text-md flex items-center justify-center bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse mt-5"
          >
            Donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonateProject;
