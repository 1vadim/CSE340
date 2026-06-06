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

import { testErrorPage } from "./controllers/errors.js";


const router = express.Router();

router.get("/", showHomePage);
router.get("/organizations", showOrganizationsPage);
router.get("/projects", showProjectsPage);
router.get("/project/:id", showProjectDetailsPage);
router.get("/categories", showCategoriesPage);
router.get("/category/:id", showCategoryDetailsPage);
router.get("/project/:id/assign-categories", showAssignCategoriesForm);
router.post("/project/:id/assign-categories", processAssignCategoriesForm);
// Route for organization details page
router.get('/organization/:id', showOrganizationDetailsPage);
// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', showEditOrganizationForm);
// Route to handle the edit organization form submission
router.post("/edit-organization/:id", organizationValidation, processEditOrganizationForm);
// Route for new project page
router.get("/new-project", showNewProjectForm);
// Route to handle new project form submission
router.post("/new-project", projectValidation, processNewProjectForm);
router.get("/edit-project/:id", showEditProjectForm);
router.post("/edit-project/:id", projectValidation, processEditProjectForm);
router.get("/new-category", showNewCategoryForm);
router.post("/new-category", categoryValidation, processNewCategoryForm);
router.get("/edit-category/:id", showEditCategoryForm);
router.post("/edit-category/:id", categoryValidation, processEditCategoryForm);
router.post("/delete-category/:id", processDeleteCategory);
// error-handling routes
router.get("/test-error", testErrorPage);

export default router;
