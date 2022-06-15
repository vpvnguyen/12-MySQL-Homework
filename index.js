// Node Application

// Import Modules
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection')
const viewAllDepartments = require('./scripts/viewAllDepartments')
const viewAllEmployees = require('./scripts/viewAllEmployees')
const viewAllRoles = require('./scripts/viewAllRoles')








function addEmployee() {
    // Show Possible Managers
    db.promise().query(`SELECT id, first_name, last_name FROM employees`)
        .then((manager) => {
            console.log('This is the manager choices -----', manager[0]);
            // console.log(manager[0]);

            const managerChoices = manager[0].map(man => {
                return {
                    name: `${man.first_name} ${man.last_name}`,
                    value: man.id
                }
            })
            // Show current Roles
            db.promise().query(`SELECT role_id, role_title FROM roles`)
                .then((results) => {
                    // console.log(results[0]);
                    const choices = results[0].map(role => {
                        return {
                            name: role.role_title,
                            value: role.role_id
                        }
                    })
                    console.table(managerChoices)
                    // console.table(choices)
                    // Ask employee info
                    const addEmployeeQuestions = [
                        {
                            name: "first_name",
                            message: "Enter employee's first name",
                        },
                        {
                            name: "last_name",
                            message: "Enter employee's last name",
                        },
                        {
                            name: "role_id",
                            message: "What is the employee's title?",
                            type: "list",
                            choices
                        },
                        {
                            name: "manager_id",
                            message: "Who's is their manager?",
                            type: "list",
                            choices: [...managerChoices, { name: 'No Manager', value: null }],

                        }
                    ]
                    inquirer.prompt(addEmployeeQuestions)
                        .then(results => {
                            console.log(`RESULTS -----`, results)

                            // Add results to Employee Table
                            db.promise().query('INSERT INTO employees SET ?', results)
                                .then(() =>
                                    userChoice())
                        })
                })
        })
}

// Add Department
function addDepartment() {
    const addDepartmentQuestions = [
        {
            name: "department_name",
            message: "Enter department name",
        }
    ]
    inquirer.prompt(addDepartmentQuestions)
        .then(results => {
            // Add results to Department Table
            db.promise().query('INSERT INTO departments SET ?', results)
                .then(() => {
                    console.log('Department Added');
                    userChoice()
                })
        }
        )
}

// Add a Role
function addRole() {
    // Show current Departments
    db.promise().query(`SELECT * FROM departments`)
        .then((depart) => {
            const departmentChoices = depart[0].map(dep => {
                return {
                    name: dep.department_name,
                    value: dep.department_id
                }
            })

            const addRoleQuestions = [
                {
                    name: "role_title",
                    message: "Enter role title",
                },
                {
                    name: "role_salary",
                    message: "Enter role salary",
                },
                {
                    name: "department_id",
                    message: "Enter role department",
                    type: "list",
                    choices: departmentChoices
                }
            ]
            inquirer.prompt(addRoleQuestions)
                .then(results => {
                    // Add results to Role Table
                    db.promise().query('INSERT INTO roles SET ?', results)
                        .then(() => {
                            console.log('Role Added');
                            userChoice()
                        })
                })
        })
}

// Update Employee Information
function updateEmployee() {
    // Show All Employees
    db.promise().query(`SELECT * FROM employees`)
        .then((results) => {
            const employeeChoices = results[0].map(emp => {
                return {
                    name: `${emp.first_name} ${emp.last_name}`,
                    value: emp.id
                }
            })
            // Show current Roles
            db.promise().query(`SELECT * FROM roles`)
                .then((roles) => {
                    const roleChoices = roles[0].map(role => {
                        return {
                            name: role.role_title,
                            value: role.role_id
                        }
                    })

                    const updateEmployeeQuestions = [
                        {
                            name: "id",
                            message: "Which employee would you like to update?",
                            type: "list",
                            choices: employeeChoices
                        },
                        {
                            name: "role_id",
                            message: "What is the employee's new title?",
                            type: "list",
                            choices: roleChoices
                        }
                    ]
                    inquirer.prompt(updateEmployeeQuestions)
                        .then(results => {
                            // Update Employee Table
                            db.promise().query('UPDATE employees SET ? WHERE ?', [results, { id: results.id }])
                                .then(() => {
                                    console.log('Employee Updated');
                                    userChoice()
                                })
                        })
                })
        })
}



// // First Question
// const startOptions = [
//     {
//         type: 'list',
//         message: 'What would you like to do?',
//         name: 'choice',
//         choices: [
//             'View All Employees',
//             'View All Departments',
//             'View All Roles',
//             'Add an Employee',
//             'Add a Department',
//             'Add a Role',
//             'Update an Employee Role',
//             'Exit'
//         ],
//         default: ['Add a new Engineer']
//     }
// ]

// Refactor to async / await
async function userChoice() {
    const { choice } = await inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add an Employee',
                'Add a Department',
                'Add a Role',
                'Update an Employee Role',
                'Exit'
            ],
            message: 'What would you like to do?',
        }
    ])
    switch (choice) {
        case 'View All Employees':
            // Display All Employees
            console.log(`You picked: `, choice)
            const allEmployees = await viewAllEmployees();
            console.table(allEmployees[0]);
            return userChoice();

        case 'View All Departments':
            // Display All Deparments
            console.log(`You picked: `, choice)
            const allDepartments = await viewAllDepartments();
            console.table(allDepartments[0]);
            return userChoice();

            case 'View All Roles':
                // Display All Roles
                console.log(`You picked: `, choice)
                const allRoles = await viewAllRoles();
                console.table(allRoles[0]);
                return userChoice();
    }
}

// Original
// Present User Choices
// function userChoice() {
//     inquirer
//         .prompt(startOptions)
//         .then((data) => {
//             switch (data.choice) {
//                 case 'View All Employees':
//                     // Dispaly All Employees
//                     console.log(`You picked: `, data.choice)
//                     return viewAllEmployees();

//                 case 'View All Departments':
//                     // Display All Deparments
//                     console.log(`You picked: `, data.choice)
//                     return viewAllDepartments();

//                 case 'View All Roles':
//                     // Display All Roles
//                     console.log(`You picked: `, data.choice)
//                     return viewAllRoles();

//                 case 'Add an Employee':
//                     // Go to addEmployee
//                     console.log('Add an Employee Picked')
//                     return addEmployee();

//                 case 'Add a Department':
//                     // Go to addDepartment
//                     return addDepartment();

//                 case 'Add a Role':
//                     // Go to addRole
//                     return addRole();

//                 case 'Update an Employee Role':
//                     // Go to updateEmployee
//                     return updateEmployee();

//                 default:
//                     // Exit
//                     console.log('Exiting Application... bye')
//                     process.exit(1);
//             }
//         })
// }

// CLI Application Start
function init() {
    // Menu Grpahic
    console.log('**************************************************************')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                       EMPLOYEE MENU                        *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('**************************************************************')

    // Call function
    userChoice();
}
init();
