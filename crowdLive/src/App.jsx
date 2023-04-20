import { useEffect, useState } from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Project from "./views/Project";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { isWallectConnected } from "./services/blockchain";

const App = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(async () => {
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
        </Routes>
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
