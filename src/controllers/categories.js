import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  updateCategoryAssignments,
} from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";

const showCategoriesPage = async (req, res) => {
  const categories = await getAllCategories();
  const title = "Service Project Categories";
  // console.log(categories);
  res.render("categories", { title, categories });
};

const showCategoryDetailsPage = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await getCategoryById(categoryId);

    if (!category) {
      const err = new Error("Category Not Found");
      err.status = 404;
      return next(err);
    }

    const projects = await getProjectsByCategoryId(categoryId);

    const title = category.name;

    res.render("category", {
      title,
      category,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.id;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByProjectId(projectId);

  const title = "Assign Categories to Project";

  res.render("assign-categories", {
    title,
    projectId,
    projectDetails,
    categories,
    assignedCategories,
  });
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.id;
  const selectedCategoryIds = req.body.categoryIds || [];

  // Ensure selectedCategoryIds is an array
  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];
  await updateCategoryAssignments(projectId, categoryIdsArray);
  req.flash("success", "Categories updated successfully.");
  res.redirect(`/project/${projectId}`);
};

export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };
