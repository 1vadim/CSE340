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

export {
  getAllCategories,
  getCategoryById,
  getProjectsByCategoryId,
  getCategoriesByProjectId,
};
