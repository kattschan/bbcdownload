module.exports = function(req, res, next) {
    const sqlite = require('better-sqlite3');
    const db = new sqlite('bloopertrack.db');
    // Get all rows
    const rows = db.prepare('SELECT * FROM bloopers').all();
    if (rows === '[]' || rows === []) {
        // Return a 400 error if the time or description is missing
        res.status(500).send('Something is fucked up');
        console.log('hi')
    } else {
        console.log(rows)
        // Remove the first and last character from rows variable
        
    }
}