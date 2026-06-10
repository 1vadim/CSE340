-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE service_projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    date DATE NOT NULL,
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id) ON DELETE CASCADE
);

INSERT INTO service_projects (organization_id, title, description, location, date) VALUES
-- Org 1
(1, 'Park Cleanup', 'Cleaning local park', 'Vienna Central Park', '2026-06-01'),
(1, 'Tree Planting', 'Planting trees in urban areas', 'Vienna Woods', '2026-06-05'),
(1, 'River Cleanup', 'Cleaning the river bank', 'Danube River', '2026-06-10'),
(1, 'Recycling Workshop', 'Teaching recycling', 'Community Center', '2026-06-12'),
(1, 'Bike Repair Help', 'Helping fix bikes', 'City Square', '2026-06-15'),

-- Org 2
(2, 'Food Drive', 'Collecting food for needy', 'Food Bank Vienna', '2026-06-02'),
(2, 'Soup Kitchen', 'Serving hot meals', 'Downtown Shelter', '2026-06-06'),
(2, 'Clothing Donation', 'Collecting clothes', 'Community Hall', '2026-06-09'),
(2, 'Elderly Support', 'Helping seniors', 'Senior Center', '2026-06-13'),
(2, 'Charity Run', 'Fundraising run', 'City Park', '2026-06-18'),

-- Org 3
(3, 'Tutoring Program', 'Helping students', 'Local School', '2026-06-03'),
(3, 'Coding Workshop', 'Teaching coding', 'Tech Hub', '2026-06-07'),
(3, 'Library Help', 'Organizing books', 'City Library', '2026-06-11'),
(3, 'Language Exchange', 'Practice languages', 'Cafe Vienna', '2026-06-14'),
(3, 'Career Mentoring', 'Helping youth careers', 'University Hall', '2026-06-20');

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO categories (name) VALUES
('Environmental'),
('Educational'),
('Community Service'),
('Health and Wellness');

CREATE TABLE project_categories (
    project_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    PRIMARY KEY (project_id, category_id),
    FOREIGN KEY (project_id) REFERENCES service_projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

INSERT INTO project_categories (project_id, category_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 2),
(5, 2),
(6, 3),
(7, 3),
(8, 3),
(9, 4),
(10, 4),
(11, 4),
(12, 4),
(13, 4),
(14, 1),
(15, 2);

SELECT * FROM categories;
SELECT * FROM project_categories;

CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

INSERT INTO roles (role_name, role_description) VALUES 
    ('user', 'Standard user with basic access'),
    ('admin', 'Administrator with full system access');

SELECT * FROM roles;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INTEGER REFERENCES roles(role_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

-- View all users and roles
SELECT * FROM users;
SELECT * FROM roles;

-- Update the dedicated admin testing account to have admin role
UPDATE users SET role_id = (SELECT role_id FROM roles WHERE role_name = 'admin') WHERE email = 'admin@example.com';

-- Verify the update by listing all users and their roles
SELECT users.user_id, users.email, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id;