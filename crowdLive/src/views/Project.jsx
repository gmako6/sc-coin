import { useState, useEffect } from "react";
import DeleteProject from "../components/DeleteProject";
import DonateProject from "../components/DonateProject";
import ProjectDetails from "../components/ProjectDetails";
import ProjectDonators from "../components/ProjectDonators";
import UpdateProject from "../components/UpdateProject";
import { loadProject } from "../services/blockchain";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../store";
//import { id } from "ethers/lib/utils";

const Project = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [project] = useGlobalState("project");
  const [donators] = useGlobalState("donators");

  useEffect(async () => {
    await loadProject(id);
    setLoaded(true);
  }, []);

  return loaded ? (
    <>
      <div className="container mx-auto py-24 md:pt-40 px-5">
        <ProjectDetails project={project} />
        <UpdateProject project={project} />
        <DeleteProject project={project} />
        <DonateProject project={project} />
        <ProjectDonators donators={donators} />
      </div>
    </>
  ) : null;
};

export default Project;
