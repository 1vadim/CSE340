import { getUpcomingProjects, getProjectDetails } from "../models/projects.js";

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
  const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
  // console.log(projects);
  const title = "Upcoming Service Projects";
  res.render("projects", { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
      const err = new Error("Project Not Found");
      err.status = 404;
      return next(err);
    }

    const title = project.title;

    res.render("project", { title, project });
  } catch (error) {
    next(error);
  }
};

export { showProjectsPage, showProjectDetailsPage };