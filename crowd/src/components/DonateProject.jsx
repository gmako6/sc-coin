import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";

const DonateProject = () => {
  const [donateModal] = useGlobalState("donateModal");

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${donateModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">#Project Title</p>
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
                src="https://s.abcnews.com/images/International/turkey-earth-quake-gty-mz-01-230209_1675955333241_hpMain_16x9_992.jpg"
                alt="earth-turkey"
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
