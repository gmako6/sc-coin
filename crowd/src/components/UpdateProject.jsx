import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import { useState } from "react";
import { updateProject } from "../services/blockchain";
import { toast } from "react-toastify";

const UpdateProject = ({ project }) => {
  const [updateModal] = useGlobalState("updateModal");
  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [date, setDate] = useState(project?.date);
  const [imageURL, setImageURL] = useState(project?.imageURL);

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr);
    return dateObj / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date || !imageURL) return;

    const params = {
      id: project?.id,
      title,
      description,
      expiresAt: toTimestamp(date),
      imageURL,
    };

    await updateProject(params);
    toast.success("Project updated successfully, will reflect in 30sec.");
    onClose();
  };

  const onClose = () => {
    setGlobalState("updateModal", "scale-0");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 transform transition-transform duration-300 ${updateModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex justify-between items-center">
            <p className="font-semibold">Update Project</p>
            <button
              type="button"
              onClick={onClose}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className=" rounded-xl overflow-hidden h-20 w-20">
              <img
                src={
                  imageURL || "https://pbs.twimg.com/media/FCR77M9WUB4Kl9y.jpg"
                }
                alt="earth-turkey"
                className="rounded-lg h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              className="block w-full bg-transparent border-0 text-sm text-slate-100 focus:outline-none focus:ring-0"
              name="title"
              placeholder="Title"
              required
            />
          </div>

          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="date"
              className="block w-full bg-transparent border-0 text-sm text-slate-100 focus:outline-none focus:ring-0"
              name="date"
              placeholder="Expires At"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <input
              type="url"
              className="block w-full bg-transparent border-0 text-sm text-slate-100 focus:outline-none focus:ring-0"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>
          <div className="flex justify-between items-center bg-gray-300 rounded-xl mt-5">
            <textarea
              type="text"
              className="block w-full bg-transparent border-0 text-sm text-slate-100 focus:outline-none focus:ring-0"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="py-1 px-6 text-md flex items-center justify-center bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse mt-5"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
