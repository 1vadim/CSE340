import { addVolunteer, removeVolunteer } from "../models/volunteers.js";

const volunteerForProject = async (req, res) => {
  const userId = req.session.user.user_id;
  const projectId = req.params.id;

  await addVolunteer(userId, projectId);

  req.flash("success", "You have volunteered for this project.");

  res.redirect(`/project/${projectId}`);
};

const removeVolunteerFromProject = async (req, res) => {
  const userId = req.session.user.user_id;
  const projectId = req.params.id;

  await removeVolunteer(userId, projectId);

  req.flash("success", "Volunteer registration removed.");

  res.redirect(`/project/${projectId}`);
};

export { volunteerForProject, removeVolunteerFromProject };
