// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');

// View Employees By Manager
async function viewByManager() {
    // List Possible Managers
    const [manager] = await db.promise().query("SELECT manager_id, first_name, last_name FROM employees")
    const managerChoices = manager.map(man => {
        return {
            name: `${man.first_name} ${man.last_name}`,
            value: man.manager_id
        }
    })
    const { manager_id } = await inquirer.prompt([
        {
            name: "manager_id",
            message: "Select Manager to View their Employees:",
            type: "list",
            choices: managerChoices,
        },
    ])
    // List Employees by Manager
    const viewManEmployees = await db.promise().query(`SELECT first_name, last_name FROM employees WHERE manager_id = ?`, [manager_id])
    return viewManEmployees;
}

// Export
module.exports = viewByManager;