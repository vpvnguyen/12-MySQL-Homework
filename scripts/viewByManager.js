// Bonus

// Import Modules
const db = require('../config/connection');
const inquirer = require('inquirer');


// Get Manager IDs
async function viewByManager() {
    // const allManagers = await db.promise().query('SELECT manager_id FROM employees WHERE manager_id IS NOT NULL');
    const allManagers = await db.promise().query('SELECT first_name, last_name, id FROM employees WHERE (id IN (SELECT manager_id FROM employees));');

    const managerIDs = allManagers[0].map((m) => ({
        name: `${m.first_name} ${m.last_name}`,
        value: m.id,
    }));

    const { manager_id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'manager_id',
            message: 'Select Manager:',
            choices: managerIDs,

        }
    ]);
    const viewManEmployees = await db.promise().query(`SELECT * FROM employees WHERE manager_id = ${manager_id}`);
    return viewManEmployees;
}


// View Employees By Manager
// async function viewByManager() {
//     // List Managers
//     const [manager] = await db.promise().query(`SELECT first_name, last_name, manager_id FROM employees WHERE manager_id IS NOT NULL`);
//     const managerChoices = manager.map((man) => {
//         return {
//             name: `${man.first_name} ${man.last_name}`,
//             value: man.manager_id
//         }
//     })
//     const { manager_id } = await inquirer.prompt([
//         {
//             name: "manager_id",
//             message: "Select Manager to View their Employees:",
//             type: "list",
//             choices: managerChoices,
//         },
//     ])
//     // List Employees by Manager
//     const viewManEmployees = await db.promise().query(`SELECT first_name, last_name FROM employees WHERE manager_id = ?`, [manager_id])
//     return viewManEmployees;
// }

// Export
module.exports = viewByManager;