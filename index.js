// Node Application

// Import Modules
const inquirer = require('inquirer');
const mysql = require('mysql2');

// Store Employee Information
const allEmployees = [];
const allIDs = [];

// PORT Info
const PORT = process.env.PORT || 3001;

// Connect to Database
const db = mysql.createConnection(
    {
        // Server Name
        host: 'localhost',
        // MySQL Username
        user: 'root',
        // MySQL Password
        password: 'advetech1',
        // Database Name
        database: 'employees_db'
    }
)

// First Question
const startOptions = [
    {
        type: 'list',
        message: 'What would you like to do?',
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
        default: ['Add a new Engineer']
    }
]

function viewAllEmployees() {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    });
    userChoice();
}

function viewAllDepartments() {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results);
    });
    userChoice();
}

function viewAllRoles() {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    });
    userChoice();
}

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



// Present User Choices
function userChoice() {
    inquirer
        .prompt(startOptions)
        .then((data) => {
            switch (data.choice) {
                case 'View All Employees':
                    // Dispaly All Employees
                    console.log(`You picked: `, data.choice)
                    return viewAllEmployees();

                case 'View All Departments':
                    // Display All Deparments
                    console.log(`You picked: `, data.choice)
                    return viewAllDepartments();

                case 'View All Roles':
                    // Display All Roles
                    console.log(`You picked: `, data.choice)
                    return viewAllRoles();

                case 'Add an Employee':
                    // Go to addEmployee
                    console.log('Add an Employee Picked')
                    return addEmployee();

                case 'Add a Department':
                    // Go to addDepartment
                    return addDepartment();

                case 'Add a Role':
                    // Go to addRole
                    return addRole();

                case 'Update an Employee Role':
                    // Go to updateEmployee
                    console.log('Update an Employee Role Picked')

                default:
                    // Exit
                    console.log('Exiting Application... bye')
                    process.exit(1);
            }
        })
}

// CLI Application Start
function init() {
    // Menu Grpahic
    console.log('**************************************************************')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                       EMPLOYEE MENU                        *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('*                                                            *')
    console.log('**************************************************************')

    // Call function
    userChoice();
}
init();
