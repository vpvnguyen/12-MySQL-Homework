const db = require("../../config/connection");


// Original
// function viewAllDepartments() {
//     db.query('SELECT * FROM departments', function (err, results) {
//         console.table(results);
//     });
//     userChoice();
// }

// Refactor
const viewAllDepartments = () => {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table('\n', results);
    });
    userChoice();
}

// Export
module.exports = viewAllDepartments;