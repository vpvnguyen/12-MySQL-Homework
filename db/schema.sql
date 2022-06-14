-- Database \ Table Definition
-- Delete DB if exists
DROP DATABASE IF EXISTS employees_db;

-- Create DB
CREATE DATABASE employees_db;

-- Select DB to use
USE employees_db;


-- Create Departments Table
CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- Create Roles Table
CREATE TABLE roles (
    role_id INT NOT NULL PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary INT NOT NULL,
    department_id VARCHAR(30) NOT NULL
    -- Add FORIEGN and REFERENCE to Departments Table
    
);

-- Create Employees Table
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    -- Add FOREIGN AND REFERNCE to Roles Table
    manager_id INT
);


