// Import Modules
// NOTES: It's possible to shorten your db connection promise calls.
// const db = require('../config/connection');
const connection = require('../config/connection');
const inquirer = require('inquirer');

const db = connection.promise();

// Refactored for ASYNC AWAIT
async function addEmployee() {
    // List Possible Managers
    // const [manager] = await db.promise().query("SELECT id, first_name, last_name FROM employees")
    const [employees] = await db.query("SELECT id, first_name, last_name FROM employees")
    
    // Make your constants / variables as explicit as possible. So when you return at any point,
    // it is self documented to the point where you need the least amount of context to
    // understand what is going on. IMO, `man` is difficult to grasp it's context. 
    // Don't be afraid / lazy to spell it completely out if needed.

    // const managerChoices = manager.map(man => {
    //     return {
    //         name: `${man.first_name} ${man.last_name}`,
    //         value: man.id
    //     }
    // })
    const managerChoices = employees.map(employee => {
        return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }
    })

    // NOTES: Feeling adventurous? Heres a shorten way without stating `employee` object each time.
    const exampleManagerChoices = employees.map(({ id, first_name, last_name }) => {
        return {
            name: `${first_name} ${last_name}`,
            value: id
        }
    })

    // NOTES: Feeling even more adventurous? Heres a shorten way to return an entire object after loop
    const anotherExampleManagerChoices = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }))

    // List Possible Roles
    // const [roles] = await db.promise().query(`SELECT role_id, role_title FROM roles`)
    const [roles] = await db.query(`SELECT role_id, role_title FROM roles`)
    const choices = roles.map(role => {
        return {
            name: role.role_title,
            value: role.role_id
        }
    })
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            name: "first_name",
            type: 'input',
            message: "Enter Employee's First Name:",
        },
        {
            name: "last_name",
            message: "Enter Employee's Last Name:",
            type: 'input',
        },
        {
            name: "role_id",
            message: "Select Employee's Title:",
            type: "list",
            choices
        },
        {
            name: "manager_id",
            message: "Select Employee's Manager:",
            type: "list",
            choices: [...managerChoices, { name: 'No Manager', value: null }],

        }
    ])
    // Add Employee
    // await db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [first_name, last_name, role_id, manager_id])
    // Fun shortcut for INSERT using object key:value pairs:
    await db.query(`INSERT INTO employees SET ?`, [{ first_name, last_name, role_id, manager_id }])
    return `${first_name} ${last_name} has been added to the database`
}


// Export
module.exports = addEmployee;

// Original
// function addEmployee() {
//     // Show Possible Managers
//     db.promise().query(`SELECT id, first_name, last_name FROM employees`)
//         .then((manager) => {
//             console.log('This is the manager choices -----', manager[0]);
//             // console.log(manager[0]);

//             const managerChoices = manager[0].map(man => {
//                 return {
//                     name: `${man.first_name} ${man.last_name}`,
//                     value: man.id
//                 }
//             })
//             // Show current Roles
//             db.promise().query(`SELECT role_id, role_title FROM roles`)
//                 .then((results) => {
//                     // console.log(results[0]);
//                     const choices = results[0].map(role => {
//                         return {
//                             name: role.role_title,
//                             value: role.role_id
//                         }
//                     })
//                     console.table(managerChoices)
//                     // console.table(choices)
//                     // Ask employee info
//                     const addEmployeeQuestions = [
//                         {
//                             name: "first_name",
//                             message: "Enter employee's first name",
//                         },
//                         {
//                             name: "last_name",
//                             message: "Enter employee's last name",
//                         },
//                         {
//                             name: "role_id",
//                             message: "What is the employee's title?",
//                             type: "list",
//                             choices
//                         },
//                         {
//                             name: "manager_id",
//                             message: "Who's is their manager?",
//                             type: "list",
//                             choices: [...managerChoices, { name: 'No Manager', value: null }],

//                         }
//                     ]
//                     inquirer.prompt(addEmployeeQuestions)
//                         .then(results => {
//                             console.log(`RESULTS -----`, results)

//                             // Add results to Employee Table
//                             db.promise().query('INSERT INTO employees SET ?', results)
//                                 .then(() =>
//                                     userChoice())
//                         })
//                 })
//         })
// }