const sqlite = require('better-sqlite3');
const db = new sqlite('bloopertrack.db');

module.exports = function(req, res, next) {
    // Get the time and description from the request body
    const time = req.body.time;
    const description = req.body.description;
    console.log(req);
    // Check for errors(i.e. time and description are empty)
    if (time === '' || description === '' || time === undefined || description === undefined || time === null || description === null || time === 'undefined' || description === 'undefined') {
        // Return 400 error
        res.status(400).send('Error: Time and description cannot be empty');
    } else {
    // Insert the time and description into the bloopers table
    const insert = db.prepare('INSERT INTO bloopers (time, description) VALUES (?, ?)');
    insert.run(time, description);
    // alert the user that the blooper was added
    res.send('alert("Blooper added!")')
    console.log('hi')
    }
}