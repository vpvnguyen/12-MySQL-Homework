-- Testing Data
-- Select DB to use
USE employees_db;

-- Insert TD to Departments Table
INSERT INTO departments (department_id, department_name)
VALUES 
    (1001, "Engineering"), 
    (1002, "Human Resources"),
    (1003, "Sales"),
    (1004, "Facilities");

-- Insert TD to Roles Table
INSERT INTO roles (role_id, role_title, role_salary, department_id)
VALUES 
    (2001, "Software Engineer", 100000, 1001),
    (2002, "Testing Technician", 80000, 1001), 
    (3001, "Benefits", 80000, 1002),
    (3002, "General", 75000, 1002),
    (4001, "Marketing", 110000, 1003),
    (4002, "Salesperson", 200000, 1003),
    (5001, "Security", 60000, 1004), 
    (5002, "Sanitation Engineer", 62000, 1004);

-- Insert TD to Employees Table
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
    ("Brian", "Alegre", 2001, null),
    ("Jayson", "De Guzman", 2002, null),
    ("Krizel", "Adupe", 3001, null),
    ("Kalie", "Brwon", 3002, null),
    ("Chad", "Tao", 4001, null),
    ("Nick", "Graffis", 4002, null),
    ("Allec", "Arzadon" 5001, null),
    ("Kevin",  "Lazaro", 5002, null);