import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  updateCategoryAssignments,
  createCategory,
  updateCategory,
  deleteCategory
} from "../models/categories.js";
import { getProjectDetails } from "../models/projects.js";
import { body, validationResult } from "express-validator";

const categoryValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Category name must be between 3 and 100 characters"),
];


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

const showNewCategoryForm = async (req, res) => {
  const title = "Add New Category";
  res.render("new-category", { title });
};

const processNewCategoryForm = async (req, res) => {
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the new category form
    return res.redirect("/new-category");
  }

  const { name } = req.body;

  try {
    await createCategory(name);

    // Set a success flash message
    req.flash("success", "New category created successfully!");
    res.redirect("/categories");
  } catch (error) {
    console.error("Error creating new category:", error);
    req.flash("error", "There was an error creating the category.");
    res.redirect("/new-category");
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const categoryDetails = await getCategoryById(categoryId);

  if (!categoryDetails) {
    req.flash("error", "Category not found");
    return res.redirect("/categories");
  }

  const title = "Edit Category";
  res.render("edit-category", { title, categoryDetails });
};


// POST: Process the Edit Category form submission
const processEditCategoryForm = async (req, res) => {
  // Check for validation errors
  const results = validationResult(req);
  if (!results.isEmpty()) {
    results.array().forEach((error) => {
      req.flash("error", error.msg);
    });

    // Redirect back to the edit form
    return res.redirect("/edit-category/" + req.params.id);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    await updateCategory(categoryId, name);

    // Set a success flash message
    req.flash("success", "Category updated successfully!");
    res.redirect(`/category/${categoryId}`);
  } catch (error) {
    console.error("Error updating category:", error);
    req.flash("error", "There was an error updating the category.");
    res.redirect("/edit-category/" + categoryId);
  }
};

const processDeleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    await deleteCategory(categoryId);

    req.flash("success", "Category deleted successfully!");
    res.redirect("/categories"); 
  } catch (error) {
    console.error("Error deleting category:", error);
    req.flash(
      "error",
      "There was an error deleting the category. Ensure it is not linked to any projects.",
    );
    res.redirect(`/category/${categoryId}`); 
  }
};

export {
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
};
