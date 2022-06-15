const db = require('../config/connection');


// Original
// function viewAllDepartments() {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }

// Refactor
// const viewAllDepartments = () => {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table('\n', results);
//     });
//     // userChoice();
// }

// Refactored for ASYNC AWAIT

async function viewAllDepartments() {
    const allDepartments = await db.promise().query('SELECT * FROM departments')
    return allDepartments
}

// Export
module.exports = viewAllDepartments;