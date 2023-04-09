import DeleteProject from "../components/DeleteProject";
import DonateProject from "../components/DonateProject";
import ProjectDetails from "../components/ProjectDetails";
import ProjectDonators from "../components/ProjectDonators";
import UpdateProject from "../components/UpdateProject";

const Project = () => {
  return (
    <div className="container mx-auto py-24 md:pt-40 px-5">
      <ProjectDetails />
      <ProjectDonators />
      <UpdateProject />
      <DonateProject />
      <DeleteProject />
    </div>
  );
};

export default Project;
