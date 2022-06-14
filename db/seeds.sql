-- Testing Data
-- Select DB to use
USE employees_db;

-- Insert TD to Departments Table
INSERT INTO departments (department_name)
VALUES 
    ("Engineering"), 
    ("Human Resources"),
    ("Sales"),
    ("Facilities");

-- Insert TD to Roles Table
INSERT INTO roles (role_id, role_title, role_salary, department_id)
VALUES 
    (2000, "Development Manager", 200000, 1),
    (2001, "Software Engineer", 100000, 1),
    (2002, "Testing Technician", 80000, 1), 
    (3000, "HR Manager", 180000, 2),
    (3001, "Benefits", 80000, 2),
    (3002, "Generals", 75000, 2),
    (4000, "Marketing Manager", 110000, 3),
    (4001, "Marketing", 220000, 3),
    (4002, "Salesperson", 200000, 3),
    (5000, "Facilities Manager", 150000, 3),
    (5001, "Security", 60000, 4), 
    (5002, "Sanitation Engineer", 62000, 4);

-- Insert TD to Employees Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Brian", "Alegre", 2001, null),
    ("Jayson", "De Guzman", 2002, null),
    ("Krizel", "Adupe", 3001, null),
    ("Kalie", "Brwon", 3002, null),
    ("Chad", "Tao", 4001, null),
    ("Nick", "Graffis", 4002, null),
    ("Allec", "Arzadon", 5001, null),
    ("Kevin",  "Lazaro", 5002, null),
    ("Tony",  "Wu", 2000, null),
    ("Matthias",  "Aretz", 3000, null),
    ("Long",  "Nguyen", 4000, null),
    ("Mark",  "Baker", 5000, null);