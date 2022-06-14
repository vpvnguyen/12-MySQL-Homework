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
INSERT INTO roles (role_title, role_salary, department_id)
VALUES 
    ("Development Manager", 200000, 1),
    ("Software Engineer", 100000, 1),
    ("Testing Technician", 80000, 1), 
    ("HR Manager", 180000, 2),
    ("Benefits", 80000, 2),
    ("Generals", 75000, 2),
    ("Marketing Manager", 110000, 3),
    ("Marketing", 220000, 3),
    ("Salesperson", 200000, 3),
    ("Facilities Manager", 150000, 3),
    ("Security", 60000, 4), 
    ("Sanitation Engineer", 62000, 4);

-- Insert TD to Employees Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Brian", "Alegre", 1, null),
    ("Jayson", "De Guzman", 2, null),
    ("Krizel", "Adupe", 3, null),
    ("Kalie", "Brwon", 4, null),
    ("Chad", "Tao", 5, null),
    ("Nick", "Graffis", 6, null),
    ("Allec", "Arzadon", 7, null),
    ("Kevin",  "Lazaro", 8, null),
    ("Tony",  "Wu", 9, null),
    ("Matthias",  "Aretz", 10, null),
    ("Long",  "Nguyen", 11, null),
    ("Mark",  "Baker", 12, null);