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
                    break;

                case 'Add a Department':
                    // Go to addDepartment
                    console.log('Add a Department Picked')
                    break;

                case 'Add a Role':
                    // Go to addRole
                    console.log('Add a Role Picked')
                    break;

                case 'Update an Employee Role':
                    // Go to updateEmployee
                    console.log('Update an Employee Role Picked')

                default:
                    // Exit
                    console.log('Exiting Application... bye')
                    break;
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
