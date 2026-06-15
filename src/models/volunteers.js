import db from "./db.js";

const addVolunteer = async (userId, projectId) => {
  const query = `
    INSERT INTO project_volunteers (user_id, project_id)
    VALUES ($1, $2)
    ON CONFLICT DO NOTHING
  `;

  await db.query(query, [userId, projectId]);
};

const removeVolunteer = async (userId, projectId) => {
  const query = `
    DELETE FROM project_volunteers
    WHERE user_id = $1
      AND project_id = $2
  `;

  await db.query(query, [userId, projectId]);
};

const isVolunteer = async (userId, projectId) => {
  const query = `
    SELECT *
    FROM project_volunteers
    WHERE user_id = $1
      AND project_id = $2
  `;

  const result = await db.query(query, [userId, projectId]);

  return result.rows.length > 0;
};

const getVolunteerProjects = async (userId) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.date,
      sp.location
    FROM service_projects sp
    JOIN project_volunteers pv
      ON sp.project_id = pv.project_id
    WHERE pv.user_id = $1
    ORDER BY sp.date
  `;

  const result = await db.query(query, [userId]);

  return result.rows;
};

export { addVolunteer, removeVolunteer, isVolunteer, getVolunteerProjects };
