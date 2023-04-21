import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { setGlobalState, useGlobalState } from "../store";
import {
  createNewGroup,
  joinGroup,
  loginWithCometChat,
  signInWithCometChat,
} from "../services/CometChat";

const ChatAuth = ({ project }) => {
  const [chatModal] = useGlobalState("chatModal");
  const [currentUser] = useGlobalState("currentUser");

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center
        justify-center bg-black bg-opacity-50 transform
        transition-transform duration-300 ${chatModal}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        {currentUser ? <Actions project={project} /> : <Auth />}
      </div>
    </div>
  );
};

const Auth = () => {
  const handleSignUp = () => {
    signInWithCometChat().then(() => handleLogin());
  };

  const handleLogin = () => {
    loginWithCometChat().then(() => {
      // perform duties...
      if (currentUser) console.log("Current user", currentUser);
    });
  };

  const closeModal = () => {
    setGlobalState("chatModal", "scale-0");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-black">Authenticate Chat</p>
        <button
          type="button"
          onClick={closeModal}
          className="border-0 bg-transparent focus:outline-none"
        >
          <FaTimes className="text-black" />
        </button>
      </div>

      <div className="flex flex-col justify-center items-center mt-5">
        <p>Sign in or up to participate in chat.</p>
      </div>

      <div className="flex flex-row justify-center items-center space-x-2 w-full mt-5">
        <button
          type="button"
          onClick={handleLogin}
          className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
        >
          Login
        </button>
        <button
          type="button"
          onClick={handleSignUp}
          className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

const Actions = ({ project }) => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [group] = useGlobalState("group");

  const closeModal = () => {
    setGlobalState("chatModal", "scale-0");
  };

  const handleGroupCreation = () => {
    createNewGroup(`pid_${project.id}`, project.title);
  };

  const handleGroupJoin = () => {
    joinGroup(`pid_${project.id}`).then(() => navigate(`/chats/` + project.id));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <p className="font-semibold text-black">Authenticate Chat</p>
        <button
          type="button"
          onClick={closeModal}
          className="border-0 bg-transparent focus:outline-none"
        >
          <FaTimes className="text-black" />
        </button>
      </div>

      <div className="flex flex-row justify-center items-center space-x-2 w-full">
        {connectedAccount.toLowerCase() != project.owner.toLowerCase() ? (
          group ? (
            <button
              type="button"
              onClick={handleGroupJoin}
              className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
            >
              Enter Group
            </button>
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p>No group created for this projected</p>
              <button
                type="button"
                onClick={closeModal}
                className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
              >
                Close
              </button>
            </div>
          )
        ) : (
          <button
            type="button"
            onClick={handleGroupCreation}
            className="py-1 px-6 text-m md:flex bg-gradient-to-r from-pink-500 to-fuchsia-400 hover:bg-gradient-to-l  rounded-full shadow-lg text-white font-bold transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-105 duration-800 hover:animate-pulse"
          >
            Create Group
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatAuth;
