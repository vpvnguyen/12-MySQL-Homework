// Import Modules
const db = require('../config/connection');


// Refactored for ASYNC AWAIT
async function viewAllRoles() {
    const allRoles = await db.promise().query('SELECT * FROM roles')
    return allRoles
}


// Export
module.exports = viewAllRoles;


// Original
// function viewAllRoles() {
//     db.query('SELECT * FROM roles', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }