// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');

// Get Department IDs
async function viewDepartSalary() {
    const allDepartments = await viewAllDepartments();
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select Department Total Salary:',
            choices: allDepartments[0].map((d) => ({
                name: d.department_name,
                value: d.department_id,
            })),
        }
    ]);

    // Get Department Total Salary
    const departSalary = await db.promise().query(`SELECT SUM(role_salary) AS total_salary FROM roles WHERE department_id = ${department_id}`);
    // const departSalary = await db.promise().query(`SELECT department_id, SUM(role_salary) AS total_salary FROM roles`);


    return departSalary;
}

// Export
module.exports = viewDepartSalary;