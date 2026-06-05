import db from "./db.js";

const getAllCategories = async () => {
  const query = `
    SELECT category_id, name
    FROM categories
    ORDER BY name ASC;
  `;

  const result = await db.query(query);

  return result.rows;
};

const getCategoryById = async (id) => {
  const query = `
    SELECT
      category_id,
      name
    FROM categories
    WHERE category_id = $1;
  `;

  const result = await db.query(query, [id]);

  return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title
    FROM service_projects sp
    JOIN project_categories pc
      ON sp.project_id = pc.project_id
    WHERE pc.category_id = $1
    ORDER BY sp.title;
  `;

  const result = await db.query(query, [categoryId]);

  return result.rows;
};

const getCategoriesByProjectId = async (projectId) => {
  const query = `
    SELECT
      c.category_id,
      c.name
    FROM categories c
    JOIN project_categories pc
      ON c.category_id = pc.category_id
    WHERE pc.project_id = $1
    ORDER BY c.name;
  `;

  const result = await db.query(query, [projectId]);

  return result.rows;
};

const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_categories (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_categories
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
};

export {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
  updateCategoryAssignments
};
