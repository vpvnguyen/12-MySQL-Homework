# 12-MySQL-Homework
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Table of Contents 📑
- [Description](#description)
- [Application Preview](#application-preview)
- [Installation](#installation)
- [Usage](#usage)
- [Links](#links)
- [Criteria](#criteria)
- [Technologies](#technologies)
- [Questions](#questions)
- [License](#license)
- [Notes](#notes)


## Description
Build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Application Preview
<p align="center">
    <img alt="" src="">
</p>

## Installation
- TBD

## Usage
- TBD

## Links
-   Github Repository:
    - https://github.com/brianalegre/12-MySQL-Homework

## Criteria
- CLI Options
    - View All Departments
    - View All Roles
    - View All Employees
    - Add a Department
    - Add a Role
    - Add an Employee
    - Update an Employee Role
- View All Departments
    - Formated Table
    - Department Names
    - Department IDs
- View All Roles
    - lay Job Title
    - Role ID
    - Department Role Belongs To
    - Salary for Role
- View All Employees
    - Formated Table
    - Employee ID
    - First Name
    - Last Name
    - Job Title
    - Department
    - Salary
    - Manager
- Add Department
    - Propmpt to Enter Department Name
    - Adds Department to Database
- Add Role
    - Prompt to Enter Role Name
    - Prompt for Salary
    - Prompt for Deparment Role Belongs To
    - Adds Role to Database
- Add Employee
    - Prompt for First Name
    - Prompt for Last Name
    - Prompt for Role
    - Prompt for Manager
    - Adds Employee to Database
- Update Employee
    - Select an Employee
    - Select New Role
    - Information is Updated in the Database

- Schema
    - Department
        - id: INT PRIMARY KEY
        - name: VARCHAR(30)
    - Role
        - id: INT PRIMARY KEY
        - title: VARCHAR(30)
        - salary: DECIMAL
        - department_id: INT
    - Employee
        - id: INT PRIMARY KEY
        - first_name: VARCHAR(30)
        - last_name: VARCHAR(30)
        - role_id: INT
        - manager_id: INT (NULL IF NO MANAGER)

- Bonus
    - Update Employee Manager
    - View Employee by Manager
    - View Employees by Department
    - Delete Departments, Roles, and Employees
    - View Total Sum of Salaries in a Department

## Technologies
- MySQL2
- Inquierer
- Console.table

## Questions
Questions? Concerns?  Contact Me Below:
- Github Username: brianalegre
- Github Link: https://github.com/brianalegre 
- Email: brialegre@yahoo.com

## License
- Copyright 2022 Brian Alegre
- Licensed under the: [MIT License](https://opensource.org/licenses/MIT) 

## Notes
- Example Video Demo
    - https://2u-20.wistia.com/medias/2lnle7xnpk
