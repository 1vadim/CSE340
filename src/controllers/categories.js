import {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId
} from "../models/categories.js";

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

export { showCategoriesPage, showCategoryDetailsPage };
