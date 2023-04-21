import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { isWallectConnected } from "./services/blockchain";

import Home from "./views/Home";
import Chat from "./views/Chat";
import Project from "./views/Project";
import CreateProject from "./components/CreateProject";
import AddProject from "./components/AddProject";
import { checkAuthState } from "./services/CometChat";
import { useGlobalState } from "./store";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(async () => {
    checkAuthState();

    await isWallectConnected();
    console.log("Blockchain loaded");
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen relative">
      <Header />

      {loaded ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<Project />} />
          <Route path="/chats/:id" element={<Chat />} />
        </Routes>
      ) : null}

      {connectedAccount ? (
        <>
          <AddProject />
          <CreateProject />
        </>
      ) : null}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
