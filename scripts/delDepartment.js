// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');
const viewAllDepartments = require('./viewAllDepartments');


// Delete Department
async function delDepartment() {
    const allDepartments = await viewAllDepartments();
    const { department_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'department_id',
            message: 'Select Department To Delete:',
            choices: allDepartments[0].map((d) => ({
                name: d.department_name,
                value: d.department_id,
            })),
        }
    ]);
    // NOTES: You never want to pass in raw values into queries as this opens up for SQL injection attacks.
    // Learn more: https://www.stackhawk.com/blog/node-js-sql-injection-guide-examples-and-prevention/
    // const delDep = await db.promise().query(`DELETE FROM departments WHERE department_id = ${department_id}`);
    const delDep = await db.promise().query(`DELETE FROM departments WHERE department_id = ?`, [department_id]);
    return `Department has been deleted...`;
}


// Export
module.exports = delDepartment;

