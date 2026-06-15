import express from "express";

import { showHomePage } from "./controllers/index.js";
import {
  showOrganizationsPage,
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  processNewOrganizationForm,
  organizationValidation,
  showEditOrganizationForm,
  processEditOrganizationForm
} from "./controllers/organizations.js";
import {
  showProjectsPage,
  showProjectDetailsPage,
  showNewProjectForm,
  processNewProjectForm,
  projectValidation,
  showEditProjectForm,
  processEditProjectForm
} from "./controllers/projects.js";
import {
  showCategoriesPage,
  showCategoryDetailsPage,
  showAssignCategoriesForm,
  processAssignCategoriesForm,
  showNewCategoryForm,
  processNewCategoryForm,
  showEditCategoryForm,
  processEditCategoryForm,
  categoryValidation,
  processDeleteCategory
} from "./controllers/categories.js";

import {
  showUserRegistrationForm,
  processUserRegistrationForm,
  showLoginForm,
  processLoginForm,
  processLogout,
  showDashboard,
  requireLogin,
  requireRole,
  showUsersPage
} from "./controllers/users.js";

import {
  volunteerForProject,
  removeVolunteerFromProject,
} from "./controllers/volunteers.js";

import { testErrorPage } from "./controllers/errors.js";


const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);
router.get(
  "/project/:id/assign-categories",
  requireRole("admin"),
  showAssignCategoriesForm,
);
router.post("/project/:id/assign-categories", requireRole("admin"), processAssignCategoriesForm);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get("/new-organization", requireRole("admin"), showNewOrganizationForm);
// Route to handle new organization form submission
router.post(
  "/new-organization",
  requireRole("admin"),
  organizationValidation,
  processNewOrganizationForm,
);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole("admin"), showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post("/edit-organization/:id", requireRole("admin"), organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get("/new-project", requireRole("admin"), showNewProjectForm);
// Route to handle new project form submission
router.post(
  "/new-project",
  requireRole("admin"),
  projectValidation,
  processNewProjectForm,
);
router.get("/edit-project/:id", requireRole("admin"), showEditProjectForm);
router.post("/edit-project/:id", requireRole("admin"), projectValidation, processEditProjectForm);
router.get("/new-category", requireRole("admin"), showNewCategoryForm);
router.post(
  "/new-category",
  requireRole("admin"),
  categoryValidation,
  processNewCategoryForm,
);
router.get("/edit-category/:id", requireRole("admin"), showEditCategoryForm);
router.post("/edit-category/:id", requireRole("admin"), categoryValidation, processEditCategoryForm);
router.post("/delete-category/:id", requireRole("admin"), processDeleteCategory);
// error-handling routes
router.get("/test-error", testErrorPage);
// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);
// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get("/users", requireRole("admin"), showUsersPage);
router.get("/project/:id/volunteer", requireLogin, volunteerForProject);
router.get(  "/project/:id/unvolunteer", requireLogin, removeVolunteerFromProject,);
export default router;
