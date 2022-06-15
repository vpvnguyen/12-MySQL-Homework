// Import Modules
const db = require('../config/connection');

// Refactored for ASYNC AWAIT
async function viewAllEmployees() {
    const allEmployees = await db.promise().query('SELECT * FROM employees')
    return allEmployees;
}

// Export
module.exports = viewAllEmployees;


// Original
// function viewAllEmployees() {
//     db.query('SELECT * FROM employees', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }