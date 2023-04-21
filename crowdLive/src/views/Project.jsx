import { useState, useEffect } from "react";
import DeleteProject from "../components/DeleteProject";
import DonateProject from "../components/DonateProject";
import ProjectDetails from "../components/ProjectDetails";
import ProjectDonators from "../components/ProjectDonators";
import UpdateProject from "../components/UpdateProject";
import ChatAuth from "../components/ChatAuth";
import { loadProject } from "../services/blockchain";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../store";
import { getGroup } from "../services/CometChat";

const Project = () => {
  const { id } = useParams();
  const [loaded, setLoaded] = useState(false);
  const [project] = useGlobalState("project");
  const [donators] = useGlobalState("donators");
  const [group] = useGlobalState("group");
  const [currentUser] = useGlobalState("currentUser");

  useEffect(() => {
    if (currentUser) getGroup("pid_" + id);
    loadProject(id).then(() => setLoaded(true));
  }, [currentUser]);

  return loaded ? (
    <>
      <div className="container mx-auto py-24 md:pt-40 px-5">
        <ProjectDetails group={group} project={project} />

        {donators.length > 0 ? <ProjectDonators donators={donators} /> : null}

        <UpdateProject project={project} />
        <DeleteProject project={project} />
        <DonateProject project={project} />

        <ChatAuth project={project} />
      </div>
    </>
  ) : null;
};

export default Project;
